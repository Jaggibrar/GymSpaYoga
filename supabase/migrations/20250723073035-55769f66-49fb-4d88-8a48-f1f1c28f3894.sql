-- Fix remaining database functions with proper search_path settings

CREATE OR REPLACE FUNCTION public.mark_old_notifications_read()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE public.in_app_notifications 
  SET is_read = true 
  WHERE is_read = false 
    AND created_at < (NOW() - INTERVAL '7 days');
  
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  
  RETURN updated_count;
END;
$function$;

CREATE OR REPLACE FUNCTION public.cleanup_old_notifications()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.in_app_notifications 
  WHERE created_at < (NOW() - INTERVAL '30 days')
    AND is_read = true;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RETURN deleted_count;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_pricing_tier(monthly_price integer, session_price integer)
 RETURNS text
 LANGUAGE plpgsql
 SET search_path = ''
AS $function$
BEGIN
  IF monthly_price IS NOT NULL THEN
    IF monthly_price >= 5000 THEN
      RETURN 'luxury';
    ELSIF monthly_price >= 3000 THEN
      RETURN 'premium';
    ELSE
      RETURN 'budget';
    END IF;
  ELSIF session_price IS NOT NULL THEN
    IF session_price >= 2000 THEN
      RETURN 'luxury';
    ELSIF session_price >= 1000 THEN
      RETURN 'premium';
    ELSE
      RETURN 'budget';
    END IF;
  ELSE
    RETURN 'budget';
  END IF;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_business_owner_from_booking(booking_id_param bigint)
 RETURNS uuid
 LANGUAGE plpgsql
 SET search_path = ''
AS $function$
DECLARE
    owner_id uuid;
BEGIN
    SELECT bp.user_id
    INTO owner_id
    FROM public.bookings b
    JOIN public.business_profiles bp ON b.business_id = bp.id
    WHERE b.id = booking_id_param;

    RETURN owner_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.notify_user_booking_status_change()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
DECLARE
    message_text text;
BEGIN
    -- Only proceed if status has changed
    IF NEW.status IS DISTINCT FROM OLD.status THEN

        -- Construct a message based on the new status
        CASE NEW.status
            WHEN 'confirmed' THEN
                message_text := 'Your booking has been confirmed!';
            WHEN 'cancelled' THEN
                message_text := 'Your booking has been cancelled.';
            WHEN 'rejected' THEN
                message_text := 'Your booking has been rejected.';
            ELSE
                message_text := 'Your booking status changed to: ' || NEW.status;
        END CASE;

        -- Insert notification using the correct table structure (in_app_notifications)
        INSERT INTO public.in_app_notifications(user_id, title, message, type, booking_id)
        VALUES (NEW.user_id, 'Booking Status Update', message_text, 'booking_status', NEW.id);

        -- Optional: Debug notice
        RAISE NOTICE 'Notification created for user_id %: %', NEW.user_id, message_text;
    END IF;

    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_business_profile_visit(business_profile_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SET search_path = ''
AS $function$
BEGIN
    INSERT INTO public.business_stats (business_id, profile_visits)
    VALUES (business_profile_id, 1)
    ON CONFLICT (business_id) 
    DO UPDATE SET 
        profile_visits = public.business_stats.profile_visits + 1,
        updated_at = NOW();
END;
$function$;