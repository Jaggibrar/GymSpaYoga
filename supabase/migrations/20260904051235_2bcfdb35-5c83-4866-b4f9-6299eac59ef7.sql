ALTER TABLE public.business_profiles DROP CONSTRAINT business_profiles_business_type_check;
ALTER TABLE public.business_profiles ADD CONSTRAINT business_profiles_business_type_check
CHECK (business_type = ANY (ARRAY['gym','spa','yoga','trainer','therapist','chiropractor']));