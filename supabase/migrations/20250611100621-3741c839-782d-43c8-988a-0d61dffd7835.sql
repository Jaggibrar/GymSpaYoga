
-- Allow users to view approved trainer profiles
CREATE POLICY "Anyone can view approved trainers" 
ON public.trainer_profiles 
FOR SELECT 
USING (status = 'approved');

-- Allow users to view approved business profiles  
CREATE POLICY "Anyone can view approved businesses"
ON public.business_profiles 
FOR SELECT 
USING (status = 'approved');

-- Update some sample trainer profiles to approved status for testing
UPDATE public.trainer_profiles 
SET status = 'approved' 
WHERE status = 'pending' 
AND id IN (
  SELECT id FROM public.trainer_profiles 
  WHERE status = 'pending' 
  LIMIT 3
);

-- Update some sample business profiles to approved status for testing
UPDATE public.business_profiles 
SET status = 'approved' 
WHERE status = 'pending' 
AND id IN (
  SELECT id FROM public.business_profiles 
  WHERE status = 'pending' 
  LIMIT 3
);
