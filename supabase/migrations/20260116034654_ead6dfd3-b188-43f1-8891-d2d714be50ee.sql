-- Modify triggers to auto-approve new registrations for easier onboarding
-- This can be reverted to 'pending' for production moderation

-- Drop existing triggers first
DROP TRIGGER IF EXISTS enforce_business_status_trigger ON public.business_profiles;
DROP TRIGGER IF EXISTS enforce_trainer_status_trigger ON public.trainer_profiles;

-- Create updated function that sets status to 'approved' on insert
CREATE OR REPLACE FUNCTION public.enforce_business_status()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- On INSERT: Auto-approve for easier onboarding (change to 'pending' for moderation)
  IF TG_OP = 'INSERT' THEN
    NEW.status := 'approved';
    RETURN NEW;
  END IF;
  
  -- On UPDATE: Only admins can change status
  IF TG_OP = 'UPDATE' THEN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
      IF NOT is_super_admin() THEN
        NEW.status := OLD.status;
      END IF;
    END IF;
    RETURN NEW;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create updated function for trainers
CREATE OR REPLACE FUNCTION public.enforce_trainer_status()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- On INSERT: Auto-approve for easier onboarding (change to 'pending' for moderation)
  IF TG_OP = 'INSERT' THEN
    NEW.status := 'approved';
    RETURN NEW;
  END IF;
  
  -- On UPDATE: Only admins can change status
  IF TG_OP = 'UPDATE' THEN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
      IF NOT is_super_admin() THEN
        NEW.status := OLD.status;
      END IF;
    END IF;
    RETURN NEW;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Recreate triggers
CREATE TRIGGER enforce_business_status_trigger
  BEFORE INSERT OR UPDATE ON public.business_profiles
  FOR EACH ROW EXECUTE FUNCTION public.enforce_business_status();

CREATE TRIGGER enforce_trainer_status_trigger
  BEFORE INSERT OR UPDATE ON public.trainer_profiles
  FOR EACH ROW EXECUTE FUNCTION public.enforce_trainer_status();