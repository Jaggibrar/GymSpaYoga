-- Remove overly permissive policies that expose contact info
DROP POLICY IF EXISTS "Anyone can view approved business details" ON public.business_profiles;
DROP POLICY IF EXISTS "Anyone can view approved trainer details" ON public.trainer_profiles;
DROP POLICY IF EXISTS "Anyone can view approved trainers" ON public.trainer_profiles;

-- The security model is now:
-- 1. Anonymous users use the secure views (public_business_listings, public_trainer_listings) with NO contact info
-- 2. Authenticated users can access full tables (business_profiles, trainer_profiles) with contact info
-- 3. The secure functions (get_business_contact_info, get_trainer_contact_info) provide conditional access

-- Views are secure by design (no email/phone) and don't need RLS policies
-- The underlying tables have proper RLS for authenticated users