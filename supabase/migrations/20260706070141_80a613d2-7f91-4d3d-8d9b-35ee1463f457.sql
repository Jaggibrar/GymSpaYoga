
-- =====================================================================
-- Community feature schema
-- =====================================================================

-- ---------- community_posts ----------
CREATE TABLE public.community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_type text NOT NULL DEFAULT 'user' CHECK (author_type IN ('user','business','trainer')),
  business_id uuid REFERENCES public.business_profiles(id) ON DELETE SET NULL,
  trainer_id uuid REFERENCES public.trainer_profiles(id) ON DELETE SET NULL,
  content text NOT NULL DEFAULT '',
  hashtags text[] NOT NULL DEFAULT '{}',
  location text,
  visibility text NOT NULL DEFAULT 'public' CHECK (visibility IN ('public','followers')),
  like_count integer NOT NULL DEFAULT 0,
  comment_count integer NOT NULL DEFAULT 0,
  share_count integer NOT NULL DEFAULT 0,
  save_count integer NOT NULL DEFAULT 0,
  is_pinned boolean NOT NULL DEFAULT false,
  moderation_status text NOT NULL DEFAULT 'active' CHECK (moderation_status IN ('active','hidden','removed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.community_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.community_posts TO authenticated;
GRANT ALL ON public.community_posts TO service_role;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active posts"
  ON public.community_posts FOR SELECT
  USING (moderation_status = 'active' OR author_id = auth.uid() OR public.is_super_admin());

CREATE POLICY "Users create own posts"
  ON public.community_posts FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users update own posts"
  ON public.community_posts FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid() OR public.is_super_admin())
  WITH CHECK (author_id = auth.uid() OR public.is_super_admin());

CREATE POLICY "Users delete own posts"
  ON public.community_posts FOR DELETE
  TO authenticated
  USING (author_id = auth.uid() OR public.is_super_admin());

CREATE INDEX idx_community_posts_created ON public.community_posts (created_at DESC);
CREATE INDEX idx_community_posts_author ON public.community_posts (author_id);
CREATE INDEX idx_community_posts_business ON public.community_posts (business_id);
CREATE INDEX idx_community_posts_trainer ON public.community_posts (trainer_id);
CREATE INDEX idx_community_posts_hashtags ON public.community_posts USING GIN (hashtags);

-- ---------- community_post_media ----------
CREATE TABLE public.community_post_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  media_type text NOT NULL CHECK (media_type IN ('image','video')),
  url text NOT NULL,
  thumbnail_url text,
  width integer,
  height integer,
  duration_seconds integer,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.community_post_media TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.community_post_media TO authenticated;
GRANT ALL ON public.community_post_media TO service_role;
ALTER TABLE public.community_post_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view media"
  ON public.community_post_media FOR SELECT USING (true);

CREATE POLICY "Authors manage own media"
  ON public.community_post_media FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.community_posts p WHERE p.id = post_id AND (p.author_id = auth.uid() OR public.is_super_admin())))
  WITH CHECK (EXISTS (SELECT 1 FROM public.community_posts p WHERE p.id = post_id AND (p.author_id = auth.uid() OR public.is_super_admin())));

CREATE INDEX idx_community_media_post ON public.community_post_media (post_id, sort_order);

-- ---------- community_comments ----------
CREATE TABLE public.community_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  parent_comment_id uuid REFERENCES public.community_comments(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  like_count integer NOT NULL DEFAULT 0,
  moderation_status text NOT NULL DEFAULT 'active' CHECK (moderation_status IN ('active','hidden','removed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.community_comments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.community_comments TO authenticated;
GRANT ALL ON public.community_comments TO service_role;
ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active comments"
  ON public.community_comments FOR SELECT
  USING (moderation_status = 'active' OR author_id = auth.uid() OR public.is_super_admin());

CREATE POLICY "Users create own comments"
  ON public.community_comments FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users update own comments"
  ON public.community_comments FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid() OR public.is_super_admin())
  WITH CHECK (author_id = auth.uid() OR public.is_super_admin());

CREATE POLICY "Users delete own comments"
  ON public.community_comments FOR DELETE
  TO authenticated
  USING (author_id = auth.uid() OR public.is_super_admin());

CREATE INDEX idx_community_comments_post ON public.community_comments (post_id, created_at);
CREATE INDEX idx_community_comments_parent ON public.community_comments (parent_comment_id);

-- ---------- community_likes ----------
CREATE TABLE public.community_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_type text NOT NULL CHECK (target_type IN ('post','comment')),
  target_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, target_type, target_id)
);

GRANT SELECT ON public.community_likes TO anon;
GRANT SELECT, INSERT, DELETE ON public.community_likes TO authenticated;
GRANT ALL ON public.community_likes TO service_role;
ALTER TABLE public.community_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view likes"
  ON public.community_likes FOR SELECT USING (true);
CREATE POLICY "Users like as self"
  ON public.community_likes FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users unlike own"
  ON public.community_likes FOR DELETE TO authenticated
  USING (user_id = auth.uid());

CREATE INDEX idx_community_likes_target ON public.community_likes (target_type, target_id);

-- ---------- community_follows ----------
CREATE TABLE public.community_follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_type text NOT NULL CHECK (target_type IN ('user','business','trainer')),
  target_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (follower_id, target_type, target_id)
);

GRANT SELECT ON public.community_follows TO anon;
GRANT SELECT, INSERT, DELETE ON public.community_follows TO authenticated;
GRANT ALL ON public.community_follows TO service_role;
ALTER TABLE public.community_follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public view follows"
  ON public.community_follows FOR SELECT USING (true);
CREATE POLICY "Users follow as self"
  ON public.community_follows FOR INSERT TO authenticated
  WITH CHECK (follower_id = auth.uid());
CREATE POLICY "Users unfollow own"
  ON public.community_follows FOR DELETE TO authenticated
  USING (follower_id = auth.uid());

CREATE INDEX idx_community_follows_target ON public.community_follows (target_type, target_id);
CREATE INDEX idx_community_follows_follower ON public.community_follows (follower_id);

-- ---------- community_saves ----------
CREATE TABLE public.community_saves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, post_id)
);

GRANT SELECT, INSERT, DELETE ON public.community_saves TO authenticated;
GRANT ALL ON public.community_saves TO service_role;
ALTER TABLE public.community_saves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own saves"
  ON public.community_saves FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY "Users save as self"
  ON public.community_saves FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users unsave own"
  ON public.community_saves FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- =====================================================================
-- Counters via triggers
-- =====================================================================

CREATE OR REPLACE FUNCTION public.community_update_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_community_posts_updated
  BEFORE UPDATE ON public.community_posts
  FOR EACH ROW EXECUTE FUNCTION public.community_update_updated_at();

CREATE TRIGGER trg_community_comments_updated
  BEFORE UPDATE ON public.community_comments
  FOR EACH ROW EXECUTE FUNCTION public.community_update_updated_at();

-- Likes counter
CREATE OR REPLACE FUNCTION public.community_likes_counter()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.target_type = 'post' THEN
      UPDATE public.community_posts SET like_count = like_count + 1 WHERE id = NEW.target_id;
    ELSE
      UPDATE public.community_comments SET like_count = like_count + 1 WHERE id = NEW.target_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.target_type = 'post' THEN
      UPDATE public.community_posts SET like_count = GREATEST(like_count - 1, 0) WHERE id = OLD.target_id;
    ELSE
      UPDATE public.community_comments SET like_count = GREATEST(like_count - 1, 0) WHERE id = OLD.target_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END; $$;

CREATE TRIGGER trg_community_likes_counter
  AFTER INSERT OR DELETE ON public.community_likes
  FOR EACH ROW EXECUTE FUNCTION public.community_likes_counter();

-- Comments counter
CREATE OR REPLACE FUNCTION public.community_comments_counter()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts SET comment_count = GREATEST(comment_count - 1, 0) WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END; $$;

CREATE TRIGGER trg_community_comments_counter
  AFTER INSERT OR DELETE ON public.community_comments
  FOR EACH ROW EXECUTE FUNCTION public.community_comments_counter();

-- Saves counter
CREATE OR REPLACE FUNCTION public.community_saves_counter()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts SET save_count = save_count + 1 WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts SET save_count = GREATEST(save_count - 1, 0) WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END; $$;

CREATE TRIGGER trg_community_saves_counter
  AFTER INSERT OR DELETE ON public.community_saves
  FOR EACH ROW EXECUTE FUNCTION public.community_saves_counter();
