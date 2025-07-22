-- Fix database function security by adding proper search_path settings
-- This addresses the critical security vulnerability where functions lack search_path protection

-- Update existing functions to have proper search_path settings
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_permissions
    WHERE user_id = user_uuid
  );
$function$;

CREATE OR REPLACE FUNCTION public.has_admin_permission(permission_name text, user_uuid uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_permissions
    WHERE user_id = user_uuid AND permission_name = ANY(permissions)
  );
$function$;

CREATE OR REPLACE FUNCTION public.update_user_trainer_status()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  -- When a trainer profile is created, mark the user as a trainer
  UPDATE public.user_profiles 
  SET is_trainer = TRUE
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_user_profile_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_booking_status(booking_id_param bigint, new_status_param text, user_id_param uuid DEFAULT auth.uid(), notes_param text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
DECLARE
  old_status_var TEXT;
BEGIN
  -- Get current status
  SELECT status INTO old_status_var 
  FROM public.bookings 
  WHERE id = booking_id_param;
  
  -- Update booking status
  UPDATE public.bookings 
  SET 
    status = new_status_param,
    updated_at = now(),
    confirmed_at = CASE WHEN new_status_param = 'confirmed' THEN now() ELSE confirmed_at END,
    cancelled_at = CASE WHEN new_status_param = 'cancelled' THEN now() ELSE cancelled_at END
  WHERE id = booking_id_param;
  
  -- Insert history record
  INSERT INTO public.booking_status_history (
    booking_id, old_status, new_status, changed_by, notes
  ) VALUES (
    booking_id_param, old_status_var, new_status_param, user_id_param, notes_param
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.grant_admin_access(user_email text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
DECLARE
    target_user_id UUID;
BEGIN
    -- Find user by email from auth.users
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    -- Check if user exists
    IF target_user_id IS NULL THEN
        RAISE NOTICE 'User with email % not found', user_email;
        RETURN FALSE;
    END IF;
    
    -- Insert admin permissions if not already exists
    INSERT INTO public.admin_permissions (user_id, role, permissions)
    VALUES (
        target_user_id, 
        'super_admin', 
        ARRAY['view_dashboard', 'manage_listings', 'manage_users', 'manage_payments', 'manage_content', 'view_analytics', 'super_admin']
    )
    ON CONFLICT (user_id) DO UPDATE SET
        role = 'super_admin',
        permissions = ARRAY['view_dashboard', 'manage_listings', 'manage_users', 'manage_payments', 'manage_content', 'view_analytics', 'super_admin'],
        updated_at = now();
    
    RETURN TRUE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.create_booking_reminders()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = ''
AS $function$
BEGIN
  -- Only create reminders for pending or confirmed bookings
  IF NEW.status IN ('pending', 'confirmed') AND NEW.booking_date IS NOT NULL AND NEW.booking_time IS NOT NULL THEN
    
    -- Calculate reminder times
    DECLARE
      booking_datetime TIMESTAMPTZ;
      confirmation_reminder TIMESTAMPTZ;
      day_before_reminder TIMESTAMPTZ;
      hour_before_reminder TIMESTAMPTZ;
    BEGIN
      -- Combine booking date and time
      booking_datetime := (NEW.booking_date || ' ' || NEW.booking_time)::TIMESTAMPTZ;
      
      -- Set reminder times
      confirmation_reminder := NOW() + INTERVAL '1 hour'; -- 1 hour after booking is created
      day_before_reminder := booking_datetime - INTERVAL '24 hours';
      hour_before_reminder := booking_datetime - INTERVAL '1 hour';
      
      -- Only create future reminders
      IF confirmation_reminder > NOW() THEN
        INSERT INTO public.booking_reminders (booking_id, reminder_type, scheduled_at)
        VALUES (NEW.id, 'confirmation', confirmation_reminder);
      END IF;
      
      IF day_before_reminder > NOW() THEN
        INSERT INTO public.booking_reminders (booking_id, reminder_type, scheduled_at)
        VALUES (NEW.id, '24h_before', day_before_reminder);
      END IF;
      
      IF hour_before_reminder > NOW() THEN
        INSERT INTO public.booking_reminders (booking_id, reminder_type, scheduled_at)
        VALUES (NEW.id, '1h_before', hour_before_reminder);
      END IF;
      
    EXCEPTION WHEN OTHERS THEN
      -- Log error but don't fail the booking creation
      RAISE WARNING 'Failed to create booking reminders for booking %: %', NEW.id, SQLERRM;
    END;
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.cleanup_booking_reminders()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = ''
AS $function$
BEGIN
  -- If booking is cancelled or rejected, remove pending reminders
  IF NEW.status IN ('cancelled', 'rejected') AND OLD.status != NEW.status THEN
    UPDATE public.booking_reminders 
    SET status = 'cancelled'
    WHERE booking_id = NEW.id AND status = 'pending';
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.notify_business_owner_new_booking()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
DECLARE
  business_owner_id uuid;
  business_name text;
BEGIN
  -- Get business owner and business name
  SELECT bp.user_id, bp.business_name 
  INTO business_owner_id, business_name
  FROM public.business_profiles bp 
  WHERE bp.id = NEW.business_id;
  
  -- Create in-app notification for business owner
  INSERT INTO public.in_app_notifications (
    user_id,
    title,
    message,
    type,
    booking_id
  ) VALUES (
    business_owner_id,
    'New Booking Request',
    'You received a new booking request for ' || business_name || ' on ' || NEW.booking_date::text,
    'new_booking',
    NEW.id
  );
  
  RETURN NEW;
END;
$function$;