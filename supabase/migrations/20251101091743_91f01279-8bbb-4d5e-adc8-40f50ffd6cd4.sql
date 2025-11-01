-- Grant SELECT permission to anonymous and authenticated users on public views
GRANT SELECT ON public.public_business_listings TO anon;
GRANT SELECT ON public.public_business_listings TO authenticated;

GRANT SELECT ON public.public_trainer_listings TO anon;
GRANT SELECT ON public.public_trainer_listings TO authenticated;

-- Add comments explaining the security model
COMMENT ON VIEW public.public_business_listings IS 
'Public view of approved business listings with contact info hidden. Safe for anonymous access.';

COMMENT ON VIEW public.public_trainer_listings IS 
'Public view of approved trainer listings with contact info hidden. Safe for anonymous access.';