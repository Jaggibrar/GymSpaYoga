
-- =========================================================
-- 1. PII exposure: business_profiles & trainer_profiles
-- Replace public-readable policies with PII-masked column subsets
-- =========================================================

-- BUSINESS PROFILES: drop the broad public SELECT policies
DROP POLICY IF EXISTS "Anyone can view approved business profiles" ON public.business_profiles;
DROP POLICY IF EXISTS "public_view_approved_businesses" ON public.business_profiles;

-- Re-create a public SELECT policy but revoke email/phone column privileges
-- so they cannot be selected by anon/authenticated guests directly.
CREATE POLICY "public_view_approved_businesses_no_pii"
ON public.business_profiles
FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- Revoke column-level access to PII for anon & non-owner authenticated users.
REVOKE SELECT (email, phone) ON public.business_profiles FROM anon;
REVOKE SELECT (email, phone) ON public.business_profiles FROM authenticated;

-- Grant column-level access on non-PII columns to anon & authenticated
GRANT SELECT (
  id, user_id, business_name, business_type, category, address, city, state,
  pin_code, opening_time, closing_time, monthly_price, session_price,
  description, amenities, image_urls, status, slug, created_at, updated_at
) ON public.business_profiles TO anon, authenticated;

-- TRAINER PROFILES: drop public PII-exposing policies
DROP POLICY IF EXISTS "Anyone can view approved trainer profiles" ON public.trainer_profiles;
DROP POLICY IF EXISTS "anon_view_approved_trainers" ON public.trainer_profiles;
DROP POLICY IF EXISTS "public_view_approved_trainers" ON public.trainer_profiles;

CREATE POLICY "public_view_approved_trainers_no_pii"
ON public.trainer_profiles
FOR SELECT
TO anon, authenticated
USING (status = 'approved');

REVOKE SELECT (email, phone) ON public.trainer_profiles FROM anon;
REVOKE SELECT (email, phone) ON public.trainer_profiles FROM authenticated;

GRANT SELECT (
  id, user_id, name, category, trainer_tier, experience, certifications,
  specializations, hourly_rate, location, bio, profile_image_url, status,
  created_at, updated_at
) ON public.trainer_profiles TO anon, authenticated;

-- =========================================================
-- 2. in_app_notifications: restrict INSERT to service role
-- =========================================================
DROP POLICY IF EXISTS "System can insert notifications" ON public.in_app_notifications;

CREATE POLICY "Service role can insert notifications"
ON public.in_app_notifications
FOR INSERT
TO public
WITH CHECK ((auth.jwt() ->> 'role') = 'service_role');

-- =========================================================
-- 3. booking_status_history: restrict INSERT to service role
-- =========================================================
DROP POLICY IF EXISTS "System can insert booking history" ON public.booking_status_history;

CREATE POLICY "Service role can insert booking history"
ON public.booking_status_history
FOR INSERT
TO public
WITH CHECK ((auth.jwt() ->> 'role') = 'service_role');

-- =========================================================
-- 4. chat_bookings: restrict INSERT to service role
-- =========================================================
DROP POLICY IF EXISTS "System can create bookings" ON public.chat_bookings;

CREATE POLICY "Service role can create chat bookings"
ON public.chat_bookings
FOR INSERT
TO public
WITH CHECK ((auth.jwt() ->> 'role') = 'service_role');

-- =========================================================
-- 5. customer_inquiries: require authenticated user_id
-- =========================================================
DROP POLICY IF EXISTS "Users can create inquiries" ON public.customer_inquiries;

CREATE POLICY "Authenticated users can create inquiries"
ON public.customer_inquiries
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id AND user_id IS NOT NULL);

-- =========================================================
-- 6. Storage policies: profile-images DELETE
-- =========================================================
DROP POLICY IF EXISTS "Users can delete their own profile images" ON storage.objects;
CREATE POLICY "Users can delete their own profile images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-images'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- =========================================================
-- 7. Storage policies for trainersimages, gymspayogaimages, profilepictures
-- Public read (buckets are public for SEO), authenticated owner write/update/delete
-- =========================================================

-- trainersimages
DROP POLICY IF EXISTS "Public read trainersimages" ON storage.objects;
CREATE POLICY "Public read trainersimages"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'trainersimages');

DROP POLICY IF EXISTS "Owners insert trainersimages" ON storage.objects;
CREATE POLICY "Owners insert trainersimages"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'trainersimages'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Owners update trainersimages" ON storage.objects;
CREATE POLICY "Owners update trainersimages"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'trainersimages'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Owners delete trainersimages" ON storage.objects;
CREATE POLICY "Owners delete trainersimages"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'trainersimages'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- gymspayogaimages
DROP POLICY IF EXISTS "Public read gymspayogaimages" ON storage.objects;
CREATE POLICY "Public read gymspayogaimages"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'gymspayogaimages');

DROP POLICY IF EXISTS "Owners insert gymspayogaimages" ON storage.objects;
CREATE POLICY "Owners insert gymspayogaimages"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'gymspayogaimages'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Owners update gymspayogaimages" ON storage.objects;
CREATE POLICY "Owners update gymspayogaimages"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'gymspayogaimages'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Owners delete gymspayogaimages" ON storage.objects;
CREATE POLICY "Owners delete gymspayogaimages"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'gymspayogaimages'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- profilepictures
DROP POLICY IF EXISTS "Public read profilepictures" ON storage.objects;
CREATE POLICY "Public read profilepictures"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'profilepictures');

DROP POLICY IF EXISTS "Owners insert profilepictures" ON storage.objects;
CREATE POLICY "Owners insert profilepictures"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'profilepictures'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Owners update profilepictures" ON storage.objects;
CREATE POLICY "Owners update profilepictures"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'profilepictures'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Owners delete profilepictures" ON storage.objects;
CREATE POLICY "Owners delete profilepictures"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'profilepictures'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);
