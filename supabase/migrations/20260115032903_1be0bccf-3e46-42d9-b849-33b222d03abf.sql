-- ============================================
-- PRODUCTION-GRADE RLS FOR BUSINESS_PROFILES
-- ============================================

-- Step 1: Drop ALL existing policies on business_profiles
DROP POLICY IF EXISTS "Admin manage all" ON business_profiles;
DROP POLICY IF EXISTS "Admin view all" ON business_profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON business_profiles;
DROP POLICY IF EXISTS "Own business create" ON business_profiles;
DROP POLICY IF EXISTS "Own business update" ON business_profiles;
DROP POLICY IF EXISTS "Own business view" ON business_profiles;
DROP POLICY IF EXISTS "Public can view approved businesses" ON business_profiles;

-- Step 2: Ensure RLS is enabled
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;

-- Step 3: Set default value for status column to 'pending'
ALTER TABLE business_profiles ALTER COLUMN status SET DEFAULT 'pending';

-- ============================================
-- CREATE SECURE RLS POLICIES
-- ============================================

-- Policy 1: Public can view APPROVED businesses only (no auth required)
-- This allows anonymous browsing of listings
CREATE POLICY "public_view_approved_businesses"
ON business_profiles
FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- Policy 2: Authenticated users can INSERT their own business
-- Status is forced to 'pending' via default, and user_id must match
CREATE POLICY "authenticated_insert_own_business"
ON business_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy 3: Owners can view their OWN business (any status)
CREATE POLICY "owner_view_own_business"
ON business_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy 4: Owners can UPDATE their own business (but not status field - handled by trigger)
CREATE POLICY "owner_update_own_business"
ON business_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy 5: Admins have FULL access (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "admin_full_access"
ON business_profiles
FOR ALL
TO authenticated
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- ============================================
-- CREATE SECURE PUBLIC VIEW (hides contact info)
-- ============================================

-- Drop existing view if it exists
DROP VIEW IF EXISTS public_business_listings;

-- Create secure view that hides private contact details for non-owners
CREATE OR REPLACE VIEW public_business_listings AS
SELECT 
  id,
  business_name,
  business_type,
  category,
  description,
  address,
  city,
  state,
  pin_code,
  opening_time,
  closing_time,
  monthly_price,
  session_price,
  amenities,
  image_urls,
  status,
  created_at,
  updated_at,
  user_id,
  -- Hide contact details - return NULL for public
  NULL::text AS email,
  NULL::text AS phone
FROM business_profiles
WHERE status = 'approved';

-- Grant SELECT on the view to anon and authenticated roles
GRANT SELECT ON public_business_listings TO anon, authenticated;

-- ============================================
-- CREATE TRIGGER TO PREVENT STATUS TAMPERING
-- ============================================

-- Function to force pending status on new inserts and prevent owners from changing status
CREATE OR REPLACE FUNCTION enforce_business_status()
RETURNS TRIGGER AS $$
BEGIN
  -- On INSERT: Always set status to pending
  IF TG_OP = 'INSERT' THEN
    NEW.status := 'pending';
    RETURN NEW;
  END IF;
  
  -- On UPDATE: Only admins can change status
  IF TG_OP = 'UPDATE' THEN
    -- If status is being changed, check if user is admin
    IF OLD.status IS DISTINCT FROM NEW.status THEN
      IF NOT is_super_admin() THEN
        -- Non-admins cannot change status, revert to old value
        NEW.status := OLD.status;
      END IF;
    END IF;
    RETURN NEW;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS enforce_business_status_trigger ON business_profiles;

-- Create trigger
CREATE TRIGGER enforce_business_status_trigger
BEFORE INSERT OR UPDATE ON business_profiles
FOR EACH ROW
EXECUTE FUNCTION enforce_business_status();

-- ============================================
-- SECURE FUNCTION TO GET CONTACT INFO (for booking flows)
-- ============================================

-- Function for authenticated users with active bookings to get contact info
CREATE OR REPLACE FUNCTION get_business_contact_info_secure(business_id_param uuid)
RETURNS TABLE(email text, phone text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only return contact info if:
  -- 1. User is the business owner, OR
  -- 2. User is an admin, OR
  -- 3. User has an active/confirmed booking with this business
  RETURN QUERY
  SELECT bp.email, bp.phone
  FROM business_profiles bp
  WHERE bp.id = business_id_param
    AND (
      bp.user_id = auth.uid()
      OR is_super_admin()
      OR EXISTS (
        SELECT 1 FROM bookings b
        WHERE b.business_id = business_id_param
          AND b.user_id = auth.uid()
          AND b.status IN ('confirmed', 'pending')
      )
    );
END;
$$;