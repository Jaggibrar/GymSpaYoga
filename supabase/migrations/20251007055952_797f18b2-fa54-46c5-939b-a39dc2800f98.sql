-- Fix remaining security issues

-- 1. Enable RLS on the public_business_listings view
ALTER VIEW public.public_business_listings SET (security_barrier = true);

-- 2. Create secure view for trainer profiles (similar to business profiles)
CREATE OR REPLACE VIEW public.public_trainer_listings AS
SELECT 
  id,
  user_id,
  name,
  category,
  trainer_tier,
  certifications,
  specializations,
  location,
  bio,
  profile_image_url,
  hourly_rate,
  experience,
  status,
  created_at,
  updated_at,
  -- Mask contact info for privacy
  NULL::text as email,
  NULL::text as phone
FROM public.trainer_profiles
WHERE status = 'approved';

-- Grant public access to trainer view
GRANT SELECT ON public.public_trainer_listings TO anon;
GRANT SELECT ON public.public_trainer_listings TO authenticated;

-- 3. Create secure function to get trainer contact info
CREATE OR REPLACE FUNCTION public.get_trainer_contact_info(trainer_id_param uuid)
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
  -- 1. Is the trainer
  -- 2. Has an active booking with this trainer
  -- 3. Has an active chat with this trainer
  IF auth.uid() IS NOT NULL AND (
    EXISTS (
      SELECT 1 FROM trainer_profiles 
      WHERE id = trainer_id_param AND user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM bookings 
      WHERE trainer_id = trainer_id_param 
      AND user_id = auth.uid()
      AND status IN ('pending', 'confirmed')
    )
    OR EXISTS (
      SELECT 1 FROM chat_rooms
      WHERE trainer_id = trainer_id_param
      AND user_id = auth.uid()
    )
  ) THEN
    RETURN QUERY
    SELECT tp.email, tp.phone
    FROM trainer_profiles tp
    WHERE tp.id = trainer_id_param;
  ELSE
    RETURN QUERY SELECT NULL::text, NULL::text;
  END IF;
END;
$$;

-- 4. Add policy for anonymous users to view trainer details
CREATE POLICY "Anyone can view approved trainer details"
ON public.trainer_profiles
FOR SELECT
TO anon
USING (status = 'approved');