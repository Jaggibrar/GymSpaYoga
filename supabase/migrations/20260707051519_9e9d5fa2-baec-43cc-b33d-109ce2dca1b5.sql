
-- 1. Extend in_app_notifications with community linking fields
ALTER TABLE public.in_app_notifications
  ADD COLUMN IF NOT EXISTS link_url text,
  ADD COLUMN IF NOT EXISTS actor_id uuid;

-- 2. community_reports
CREATE TABLE IF NOT EXISTS public.community_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id uuid NOT NULL,
  target_type text NOT NULL CHECK (target_type IN ('post','comment','user')),
  target_id uuid NOT NULL,
  reason text NOT NULL,
  details text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','reviewed','dismissed','actioned')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.community_reports TO authenticated;
GRANT ALL ON public.community_reports TO service_role;
ALTER TABLE public.community_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reporters can view their own reports"
  ON public.community_reports FOR SELECT TO authenticated
  USING (reporter_id = auth.uid() OR public.is_super_admin());
CREATE POLICY "Auth users can create reports"
  ON public.community_reports FOR INSERT TO authenticated
  WITH CHECK (reporter_id = auth.uid());
CREATE POLICY "Admins can update reports"
  ON public.community_reports FOR UPDATE TO authenticated
  USING (public.is_super_admin());

-- 3. community_blocks
CREATE TABLE IF NOT EXISTS public.community_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id uuid NOT NULL,
  blocked_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (blocker_id, blocked_id),
  CHECK (blocker_id <> blocked_id)
);
GRANT SELECT, INSERT, DELETE ON public.community_blocks TO authenticated;
GRANT ALL ON public.community_blocks TO service_role;
ALTER TABLE public.community_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own blocks"
  ON public.community_blocks FOR ALL TO authenticated
  USING (blocker_id = auth.uid())
  WITH CHECK (blocker_id = auth.uid());

-- 4. Trigger: notify post author on like
CREATE OR REPLACE FUNCTION public.community_notify_like()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_author uuid;
  v_actor_name text;
BEGIN
  IF NEW.target_type <> 'post' THEN RETURN NEW; END IF;
  SELECT author_id INTO v_author FROM public.community_posts WHERE id = NEW.target_id;
  IF v_author IS NULL OR v_author = NEW.user_id THEN RETURN NEW; END IF;
  SELECT COALESCE(full_name, 'Someone') INTO v_actor_name FROM public.user_profiles WHERE user_id = NEW.user_id;
  INSERT INTO public.in_app_notifications (user_id, actor_id, title, message, type, link_url)
  VALUES (v_author, NEW.user_id, 'New like on your post',
    COALESCE(v_actor_name, 'Someone') || ' liked your post',
    'community_like', '/community?post=' || NEW.target_id);
  RETURN NEW;
END; $$;
DROP TRIGGER IF EXISTS trg_community_notify_like ON public.community_likes;
CREATE TRIGGER trg_community_notify_like
AFTER INSERT ON public.community_likes
FOR EACH ROW EXECUTE FUNCTION public.community_notify_like();

-- 5. Trigger: notify on comment (post author + parent commenter)
CREATE OR REPLACE FUNCTION public.community_notify_comment()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_post_author uuid;
  v_parent_author uuid;
  v_actor_name text;
  v_snippet text;
BEGIN
  SELECT author_id INTO v_post_author FROM public.community_posts WHERE id = NEW.post_id;
  SELECT COALESCE(full_name, 'Someone') INTO v_actor_name FROM public.user_profiles WHERE user_id = NEW.author_id;
  v_snippet := substr(COALESCE(NEW.content,''), 1, 80);

  IF v_post_author IS NOT NULL AND v_post_author <> NEW.author_id THEN
    INSERT INTO public.in_app_notifications (user_id, actor_id, title, message, type, link_url)
    VALUES (v_post_author, NEW.author_id, 'New comment on your post',
      COALESCE(v_actor_name,'Someone') || ': ' || v_snippet,
      'community_comment', '/community?post=' || NEW.post_id);
  END IF;

  IF NEW.parent_comment_id IS NOT NULL THEN
    SELECT author_id INTO v_parent_author FROM public.community_comments WHERE id = NEW.parent_comment_id;
    IF v_parent_author IS NOT NULL AND v_parent_author <> NEW.author_id AND v_parent_author <> v_post_author THEN
      INSERT INTO public.in_app_notifications (user_id, actor_id, title, message, type, link_url)
      VALUES (v_parent_author, NEW.author_id, 'New reply to your comment',
        COALESCE(v_actor_name,'Someone') || ': ' || v_snippet,
        'community_reply', '/community?post=' || NEW.post_id);
    END IF;
  END IF;
  RETURN NEW;
END; $$;
DROP TRIGGER IF EXISTS trg_community_notify_comment ON public.community_comments;
CREATE TRIGGER trg_community_notify_comment
AFTER INSERT ON public.community_comments
FOR EACH ROW EXECUTE FUNCTION public.community_notify_comment();

-- 6. Trigger: notify on follow (only when following a user)
CREATE OR REPLACE FUNCTION public.community_notify_follow()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_actor_name text;
BEGIN
  IF NEW.target_type <> 'user' OR NEW.target_id = NEW.follower_id THEN RETURN NEW; END IF;
  SELECT COALESCE(full_name, 'Someone') INTO v_actor_name FROM public.user_profiles WHERE user_id = NEW.follower_id;
  INSERT INTO public.in_app_notifications (user_id, actor_id, title, message, type, link_url)
  VALUES (NEW.target_id, NEW.follower_id, 'New follower',
    COALESCE(v_actor_name,'Someone') || ' started following you',
    'community_follow', '/community/user/' || NEW.follower_id);
  RETURN NEW;
END; $$;
DROP TRIGGER IF EXISTS trg_community_notify_follow ON public.community_follows;
CREATE TRIGGER trg_community_notify_follow
AFTER INSERT ON public.community_follows
FOR EACH ROW EXECUTE FUNCTION public.community_notify_follow();

-- 7. Trending hashtags view (last 14 days)
CREATE OR REPLACE VIEW public.community_trending_hashtags
WITH (security_invoker = on) AS
SELECT lower(tag) AS tag, COUNT(*)::int AS post_count
FROM public.community_posts p, unnest(p.hashtags) AS tag
WHERE p.moderation_status = 'active'
  AND p.created_at > now() - interval '14 days'
GROUP BY lower(tag)
ORDER BY post_count DESC
LIMIT 20;
GRANT SELECT ON public.community_trending_hashtags TO anon, authenticated;
