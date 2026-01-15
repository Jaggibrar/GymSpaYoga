-- =====================================================
-- FIX TRAINER_PROFILES RLS - COMPLETE PRODUCTION SETUP
-- =====================================================

-- Step 1: Drop ALL existing policies on trainer_profiles
DROP POLICY IF EXISTS "Trainers can insert own profile" ON trainer_profiles;
DROP POLICY IF EXISTS "Trainers can view own profile" ON trainer_profiles;
DROP POLICY IF EXISTS "Trainers can update own profile" ON trainer_profiles;
DROP POLICY IF EXISTS "Public can view approved trainers" ON trainer_profiles;
DROP POLICY IF EXISTS "Admin full access trainers" ON trainer_profiles;
DROP POLICY IF EXISTS "authenticated_insert_own_trainer" ON trainer_profiles;
DROP POLICY IF EXISTS "owner_view_own_trainer" ON trainer_profiles;
DROP POLICY IF EXISTS "owner_update_own_trainer" ON trainer_profiles;
DROP POLICY IF EXISTS "public_view_approved_trainers" ON trainer_profiles;
DROP POLICY IF EXISTS "admin_full_access_trainers" ON trainer_profiles;
DROP POLICY IF EXISTS "Users can insert their own trainer profile" ON trainer_profiles;
DROP POLICY IF EXISTS "Users can view their own trainer profile" ON trainer_profiles;
DROP POLICY IF EXISTS "Users can update their own trainer profile" ON trainer_profiles;
DROP POLICY IF EXISTS "Admins have full access to trainer profiles" ON trainer_profiles;

-- Step 2: Ensure RLS is enabled
ALTER TABLE trainer_profiles ENABLE ROW LEVEL SECURITY;

-- Step 3: Set default status to pending
ALTER TABLE trainer_profiles ALTER COLUMN status SET DEFAULT 'pending';

-- Step 4: CREATE NEW POLICIES

-- 4a: Allow authenticated users to INSERT their own trainer profile
CREATE POLICY "authenticated_insert_own_trainer"
ON trainer_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 4b: Allow trainers to view their own profile (any status)
CREATE POLICY "owner_view_own_trainer"
ON trainer_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 4c: Allow trainers to update their own profile (except status field - handled by trigger)
CREATE POLICY "owner_update_own_trainer"
ON trainer_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 4d: Allow public/anon to view APPROVED trainers only
CREATE POLICY "public_view_approved_trainers"
ON trainer_profiles
FOR SELECT
TO anon
USING (status = 'approved');

-- 4e: Admin full access (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "admin_full_access_trainers"
ON trainer_profiles
FOR ALL
TO authenticated
USING (is_super_admin(auth.uid()))
WITH CHECK (is_super_admin(auth.uid()));

-- Step 5: Create trigger to enforce status rules for trainers
CREATE OR REPLACE FUNCTION public.enforce_trainer_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- On INSERT: Always set status to pending
  IF TG_OP = 'INSERT' THEN
    NEW.status := 'pending';
    RETURN NEW;
  END IF;
  
  -- On UPDATE: Only admins can change status
  IF TG_OP = 'UPDATE' THEN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
      IF NOT is_super_admin() THEN
        NEW.status := OLD.status;
      END IF;
    END IF;
    RETURN NEW;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Drop existing trigger if exists and create new one
DROP TRIGGER IF EXISTS enforce_trainer_status_trigger ON trainer_profiles;
CREATE TRIGGER enforce_trainer_status_trigger
  BEFORE INSERT OR UPDATE ON trainer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION enforce_trainer_status();

-- Step 6: Update the public_trainer_listings view with security_invoker
DROP VIEW IF EXISTS public_trainer_listings;

CREATE VIEW public_trainer_listings 
WITH (security_invoker = on) AS
SELECT 
  id,
  user_id,
  name,
  category,
  trainer_tier,
  bio,
  experience,
  hourly_rate,
  specializations,
  certifications,
  profile_image_url,
  location,
  status,
  created_at,
  updated_at,
  -- Contact info hidden in public view
  NULL::text AS email,
  NULL::text AS phone
FROM trainer_profiles
WHERE status = 'approved';

-- Grant access to the view
GRANT SELECT ON public_trainer_listings TO anon, authenticated;