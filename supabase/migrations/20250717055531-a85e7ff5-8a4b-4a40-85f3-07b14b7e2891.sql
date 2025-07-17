-- Update user_profiles table to support trainer role
-- First, let's add a custom field to track if someone is a trainer
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS is_trainer BOOLEAN DEFAULT FALSE;

-- Add an index for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_trainer ON public.user_profiles(is_trainer);

-- Create a function to update trainer status when trainer profile is created
CREATE OR REPLACE FUNCTION public.update_user_trainer_status()
RETURNS TRIGGER AS $$
BEGIN
  -- When a trainer profile is created, mark the user as a trainer
  UPDATE public.user_profiles 
  SET is_trainer = TRUE
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically update trainer status
DROP TRIGGER IF EXISTS on_trainer_profile_created ON public.trainer_profiles;
CREATE TRIGGER on_trainer_profile_created
  AFTER INSERT ON public.trainer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_trainer_status();

-- Update existing trainer profiles to mark users as trainers
UPDATE public.user_profiles 
SET is_trainer = TRUE 
WHERE user_id IN (
  SELECT DISTINCT user_id FROM public.trainer_profiles
);