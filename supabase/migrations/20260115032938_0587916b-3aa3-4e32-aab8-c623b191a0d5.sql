-- Fix the view to use security_invoker (recommended pattern)
DROP VIEW IF EXISTS public_business_listings;

CREATE VIEW public_business_listings 
WITH (security_invoker = on) AS
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
  -- Contact info hidden - always NULL in public view
  NULL::text AS email,
  NULL::text AS phone
FROM business_profiles
WHERE status = 'approved';

-- Ensure proper grants
GRANT SELECT ON public_business_listings TO anon, authenticated;