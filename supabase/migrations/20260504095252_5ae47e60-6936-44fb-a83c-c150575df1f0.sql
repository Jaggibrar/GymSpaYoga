DROP VIEW IF EXISTS public.public_business_listings;

CREATE VIEW public.public_business_listings
WITH (security_invoker = on) AS
SELECT id, slug, business_name, business_type, category, description,
       address, city, state, pin_code, opening_time, closing_time,
       monthly_price, session_price, amenities, image_urls, status,
       created_at, updated_at, user_id,
       NULL::text AS email,
       NULL::text AS phone
FROM public.business_profiles
WHERE status = 'approved';

GRANT SELECT ON public.public_business_listings TO anon, authenticated;