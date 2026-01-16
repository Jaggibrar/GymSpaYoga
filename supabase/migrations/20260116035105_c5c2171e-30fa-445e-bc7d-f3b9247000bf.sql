-- Allow anonymous users to view public listings (views filter for approved only)
-- The views already mask PII (email/phone set to NULL)

-- Grant SELECT on public views to anon role
GRANT SELECT ON public.public_business_listings TO anon;
GRANT SELECT ON public.public_trainer_listings TO anon;

-- Since views use security_invoker, we need SELECT on base tables for view access
-- RLS policies on base tables will still apply
GRANT SELECT ON public.business_profiles TO anon;
GRANT SELECT ON public.trainer_profiles TO anon;

-- Create RLS policies to allow anonymous SELECT on approved listings only
-- First drop any conflicting policies
DROP POLICY IF EXISTS "Anyone can view approved business profiles" ON public.business_profiles;
DROP POLICY IF EXISTS "Anyone can view approved trainer profiles" ON public.trainer_profiles;

-- Create policies for anonymous viewing of approved listings
CREATE POLICY "Anyone can view approved business profiles" 
ON public.business_profiles 
FOR SELECT 
USING (status = 'approved');

CREATE POLICY "Anyone can view approved trainer profiles" 
ON public.trainer_profiles 
FOR SELECT 
USING (status = 'approved');