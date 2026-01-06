-- Add slug column if it doesn't exist
ALTER TABLE public.business_profiles 
ADD COLUMN IF NOT EXISTS slug text UNIQUE;

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_business_profiles_slug ON public.business_profiles(slug);