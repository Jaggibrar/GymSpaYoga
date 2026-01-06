-- Trigger slug generation for all existing records by updating a non-slug field
-- This will activate the trigger function
UPDATE public.business_profiles 
SET updated_at = now()
WHERE slug IS NULL;