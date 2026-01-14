-- Clean up duplicate RLS policies on trainer_profiles
DROP POLICY IF EXISTS "Owner select" ON trainer_profiles;
DROP POLICY IF EXISTS "Owner insert" ON trainer_profiles;
DROP POLICY IF EXISTS "Owner update" ON trainer_profiles;
DROP POLICY IF EXISTS "Owner delete" ON trainer_profiles;

-- Add public SELECT policy for approved trainers (essential for listing page)
DROP POLICY IF EXISTS "Public can view approved trainers" ON trainer_profiles;
CREATE POLICY "Public can view approved trainers" 
ON trainer_profiles 
FOR SELECT 
USING (status = 'approved');

-- Add public SELECT for business_profiles for RecentListings
DROP POLICY IF EXISTS "Public can view approved businesses" ON business_profiles;
CREATE POLICY "Public can view approved businesses"
ON business_profiles
FOR SELECT
USING (status = 'approved');