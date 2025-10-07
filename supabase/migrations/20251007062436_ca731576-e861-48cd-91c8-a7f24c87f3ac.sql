-- Comprehensive security fix - simplified approach
-- Remove all remaining public access to contact info

-- Revoke any table-level grants that bypass RLS
REVOKE ALL ON public.business_profiles FROM anon, public;
REVOKE ALL ON public.trainer_profiles FROM anon, public;

-- Ensure the secure views are accessible
GRANT SELECT ON public.public_business_listings TO anon, authenticated;
GRANT SELECT ON public.public_trainer_listings TO anon, authenticated;

-- Force RLS to be checked for all users (including table owner)
ALTER TABLE public.business_profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE public.trainer_profiles FORCE ROW LEVEL SECURITY;

-- Verify that the existing policies are correct:
-- ✓ business_profiles: Only "Authenticated users can view approved businesses", "Users can view their own", "Admins can manage"  
-- ✓ trainer_profiles: Only authenticated/owner/admin policies remain
-- ✓ Anonymous users MUST use the views which mask contact info