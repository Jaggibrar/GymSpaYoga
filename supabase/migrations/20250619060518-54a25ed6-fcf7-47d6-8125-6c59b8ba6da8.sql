
-- Fix the notification trigger function to use the correct table structure
CREATE OR REPLACE FUNCTION public.notify_user_booking_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = 'public'
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

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_booking_status_change ON public.bookings;
CREATE TRIGGER on_booking_status_change
    AFTER UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.notify_user_booking_status_change();
