-- 1. Fix mutable search_path
ALTER FUNCTION public.get_auth_uid() SET search_path = public;
ALTER FUNCTION public.insert_trainer_profile(jsonb) SET search_path = public;
ALTER FUNCTION public.trainer_profiles_before_insert() SET search_path = public;
ALTER FUNCTION public.trainer_profiles_broadcast_trigger() SET search_path = public;

-- 2. Owner status: authenticated only
DROP POLICY IF EXISTS "Anyone can view owner status" ON public.owner_status;
CREATE POLICY "Authenticated can view owner status"
  ON public.owner_status FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Users can manage their own status" ON public.owner_status;
CREATE POLICY "Users can manage their own status"
  ON public.owner_status FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- 3. security_audit_log: only service_role may insert
DROP POLICY IF EXISTS "System insert logs" ON public.security_audit_log;
CREATE POLICY "Service role can insert logs"
  ON public.security_audit_log FOR INSERT TO service_role WITH CHECK (true);
REVOKE INSERT ON public.security_audit_log FROM anon, authenticated;
DROP POLICY IF EXISTS "Admin view logs" ON public.security_audit_log;
CREATE POLICY "Admin view logs"
  ON public.security_audit_log FOR SELECT TO authenticated USING (public.is_super_admin(auth.uid()));

-- 4. chat_messages permissive WITH CHECK (true)
DROP POLICY IF EXISTS "Participants can mark messages read" ON public.chat_messages;
CREATE POLICY "Participants can mark messages read"
  ON public.chat_messages FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.chat_rooms cr
    WHERE cr.id = chat_messages.chat_room_id
      AND (cr.user_id = auth.uid()
        OR EXISTS (SELECT 1 FROM public.business_profiles bp WHERE bp.id = cr.business_id AND bp.user_id = auth.uid())
        OR EXISTS (SELECT 1 FROM public.trainer_profiles tp WHERE tp.id = cr.trainer_id AND tp.user_id = auth.uid()))
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.chat_rooms cr
    WHERE cr.id = chat_messages.chat_room_id
      AND (cr.user_id = auth.uid()
        OR EXISTS (SELECT 1 FROM public.business_profiles bp WHERE bp.id = cr.business_id AND bp.user_id = auth.uid())
        OR EXISTS (SELECT 1 FROM public.trainer_profiles tp WHERE tp.id = cr.trainer_id AND tp.user_id = auth.uid()))
  ));

-- 5. Storage: stop allowing clients to list bucket contents (public URLs still work)
DROP POLICY IF EXISTS "Anyone can view business images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view business logos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view profile images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view trainer images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view website media" ON storage.objects;
DROP POLICY IF EXISTS "Public read gymspayogaimages" ON storage.objects;
DROP POLICY IF EXISTS "Public read profilepictures" ON storage.objects;
DROP POLICY IF EXISTS "Public read trainersimages" ON storage.objects;

-- 6. PII column-level protection on business_profiles / trainer_profiles
REVOKE SELECT ON public.business_profiles FROM anon, authenticated;
GRANT SELECT (
  id, user_id, business_name, business_type, category, address, city, state, pin_code,
  opening_time, closing_time, monthly_price, session_price, description, amenities,
  image_urls, status, created_at, updated_at, slug
) ON public.business_profiles TO anon, authenticated;

REVOKE SELECT ON public.trainer_profiles FROM anon, authenticated;
GRANT SELECT (
  id, user_id, name, category, trainer_tier, experience, certifications, specializations,
  hourly_rate, location, bio, profile_image_url, status, created_at, updated_at
) ON public.trainer_profiles TO anon, authenticated;

GRANT SELECT ON public.public_business_listings TO anon, authenticated;
GRANT SELECT ON public.public_trainer_listings TO anon, authenticated;

-- Owner/admin access to full rows (including PII) via guarded functions
CREATE OR REPLACE FUNCTION public.get_business_profiles_full(p_id uuid DEFAULT NULL)
RETURNS SETOF public.business_profiles
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT b.* FROM public.business_profiles b
  WHERE (p_id IS NULL OR b.id = p_id)
    AND (b.user_id = auth.uid() OR public.is_super_admin(auth.uid()));
$$;

CREATE OR REPLACE FUNCTION public.get_trainer_profiles_full(p_id uuid DEFAULT NULL)
RETURNS SETOF public.trainer_profiles
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT t.* FROM public.trainer_profiles t
  WHERE (p_id IS NULL OR t.id = p_id)
    AND (t.user_id = auth.uid() OR public.is_super_admin(auth.uid()));
$$;

REVOKE ALL ON FUNCTION public.get_business_profiles_full(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_trainer_profiles_full(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_business_profiles_full(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_trainer_profiles_full(uuid) TO authenticated, service_role;

-- 7. Lock down SECURITY DEFINER functions that clients must not call directly
REVOKE ALL ON FUNCTION public.approve_trainer(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.cleanup_old_notifications() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.mark_old_notifications_read() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.create_chat_booking(uuid, uuid, uuid, uuid, uuid, jsonb, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.save_trainer_profile(jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_trainer_profile(jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.insert_trainer_profile(jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_admin_action(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.grant_admin_access(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_auth_uid() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user_signup() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_business_status() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_trainer_status() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.trainer_profiles_before_insert() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.trainer_profiles_broadcast_trigger() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_user_trainer_status() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.notify_business_owner_new_booking() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.notify_user_booking_status_change() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.community_comments_counter() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.community_likes_counter() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.community_saves_counter() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.community_notify_comment() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.community_notify_follow() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.community_notify_like() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_business_contact_info(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_trainer_contact_info(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_business_contact_info_secure(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_trainer_contact_info_secure(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.update_booking_status(bigint, text, uuid, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.update_owner_status(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_business_contact_info(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_trainer_contact_info(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_business_contact_info_secure(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_trainer_contact_info_secure(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_booking_status(bigint, text, uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_owner_status(uuid, boolean) TO authenticated;