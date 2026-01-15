-- Fix Postgres privileges (GRANTs) for trainer_profiles
-- RLS policies do NOT apply if the role lacks base table privileges.

-- Ensure authenticated users can create/update their own trainer profile
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.trainer_profiles TO authenticated;

-- Keep anon from directly selecting the base table (PII lives here).
REVOKE ALL ON TABLE public.trainer_profiles FROM anon;