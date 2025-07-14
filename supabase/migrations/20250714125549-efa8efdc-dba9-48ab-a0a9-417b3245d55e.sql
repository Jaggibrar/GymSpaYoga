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

-- Enable real-time for bookings table
ALTER TABLE public.bookings REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;

-- Enable real-time for notifications table
ALTER TABLE public.in_app_notifications REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.in_app_notifications;