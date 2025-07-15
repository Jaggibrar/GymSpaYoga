-- Create triggers to automatically create booking reminders
-- This will help reduce cancellation rates by sending timely reminders

-- Function to automatically create booking reminders when a booking is created
CREATE OR REPLACE FUNCTION public.create_booking_reminders()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- Create trigger for new bookings
DROP TRIGGER IF EXISTS trigger_create_booking_reminders ON public.bookings;
CREATE TRIGGER trigger_create_booking_reminders
  AFTER INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.create_booking_reminders();

-- Function to clean up reminders when booking is cancelled
CREATE OR REPLACE FUNCTION public.cleanup_booking_reminders()
RETURNS TRIGGER AS $$
BEGIN
  -- If booking is cancelled or rejected, remove pending reminders
  IF NEW.status IN ('cancelled', 'rejected') AND OLD.status != NEW.status THEN
    UPDATE public.booking_reminders 
    SET status = 'cancelled'
    WHERE booking_id = NEW.id AND status = 'pending';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for booking status updates
DROP TRIGGER IF EXISTS trigger_cleanup_booking_reminders ON public.bookings;
CREATE TRIGGER trigger_cleanup_booking_reminders
  AFTER UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.cleanup_booking_reminders();