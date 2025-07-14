-- Create triggers for automatic booking notifications

-- Trigger for new booking notifications (already exists in function)
CREATE OR REPLACE TRIGGER trigger_new_booking_notification
  AFTER INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION notify_business_owner_new_booking();

-- Trigger for booking status change notifications  
CREATE OR REPLACE TRIGGER trigger_booking_status_notification
  AFTER UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION notify_user_booking_status_change();

-- Enable real-time for notifications table (bookings already enabled)
ALTER TABLE public.in_app_notifications REPLICA IDENTITY FULL;

-- Add notifications table to realtime only if not already added
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'in_app_notifications'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.in_app_notifications;
  END IF;
END $$;