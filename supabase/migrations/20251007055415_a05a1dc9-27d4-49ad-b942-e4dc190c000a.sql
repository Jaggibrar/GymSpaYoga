-- Fix business_profiles email/phone exposure
-- Step 1: Remove the overly permissive public policy
DROP POLICY IF EXISTS "Anyone can view approved businesses" ON public.business_profiles;

-- Step 2: Create a secure view for public business listings (without contact info)
CREATE OR REPLACE VIEW public.public_business_listings AS
SELECT 
  id,
  user_id,
  business_name,
  business_type,
  category,
  address,
  city,
  state,
  pin_code,
  opening_time,
  closing_time,
  monthly_price,
  session_price,
  description,
  amenities,
  image_urls,
  status,
  created_at,
  updated_at,
  -- Mask contact info for privacy
  NULL::text as email,
  NULL::text as phone
FROM public.business_profiles
WHERE status = 'approved';

-- Step 3: Grant public access to the view
GRANT SELECT ON public.public_business_listings TO anon;
GRANT SELECT ON public.public_business_listings TO authenticated;

-- Step 4: Create a secure function to get business details with contact info (for authenticated users with legitimate need)
CREATE OR REPLACE FUNCTION public.get_business_contact_info(business_id_param uuid)
RETURNS TABLE (
  email text,
  phone text
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only return contact info if user is authenticated and either:
  -- 1. Is the business owner
  -- 2. Has an active booking with this business
  -- 3. Has an active chat with this business
  IF auth.uid() IS NOT NULL AND (
    EXISTS (
      SELECT 1 FROM business_profiles 
      WHERE id = business_id_param AND user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM bookings 
      WHERE business_id = business_id_param 
      AND user_id = auth.uid()
      AND status IN ('pending', 'confirmed')
    )
    OR EXISTS (
      SELECT 1 FROM chat_rooms
      WHERE business_id = business_id_param
      AND user_id = auth.uid()
    )
  ) THEN
    RETURN QUERY
    SELECT bp.email, bp.phone
    FROM business_profiles bp
    WHERE bp.id = business_id_param;
  ELSE
    -- Return null if user doesn't have permission
    RETURN QUERY SELECT NULL::text, NULL::text;
  END IF;
END;
$$;

-- Step 5: Add policy for authenticated users to view approved businesses (with contact info)
CREATE POLICY "Authenticated users can view approved businesses"
ON public.business_profiles
FOR SELECT
TO authenticated
USING (status = 'approved');

-- Step 6: Ensure admin policies remain intact
-- (These already exist, just documenting they're still in place)
-- "Admins can manage all business profiles" - already exists
-- "Users can view their own business profile" - already exists