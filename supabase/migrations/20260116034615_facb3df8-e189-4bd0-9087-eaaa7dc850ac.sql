-- Fix all registration-related privileges for business and trainer profiles

-- Grant full CRUD privileges on business_profiles to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.business_profiles TO authenticated;

-- Grant SELECT on public views to anon for unauthenticated browsing
GRANT SELECT ON public.public_business_listings TO anon;
GRANT SELECT ON public.public_business_listings TO authenticated;
GRANT SELECT ON public.public_trainer_listings TO anon;
GRANT SELECT ON public.public_trainer_listings TO authenticated;

-- Grant SELECT on the base tables to authenticated for their own data
-- RLS will filter what they can actually see
GRANT SELECT ON TABLE public.business_profiles TO authenticated;
GRANT SELECT ON TABLE public.trainer_profiles TO authenticated;