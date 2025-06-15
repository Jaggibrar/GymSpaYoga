
-- First, let's ensure proper RLS policies and real-time functionality for bookings
ALTER TABLE public.bookings REPLICA IDENTITY FULL;

-- Add bookings table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Business owners can view bookings for their business" ON public.bookings;
DROP POLICY IF EXISTS "Business owners can update bookings for their business" ON public.bookings;

-- Create RLS policies for bookings table
CREATE POLICY "Users can view their own bookings" 
  ON public.bookings 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookings" 
  ON public.bookings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Business owners can view bookings for their business" 
  ON public.bookings 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.business_profiles 
      WHERE id = bookings.business_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Business owners can update bookings for their business" 
  ON public.bookings 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.business_profiles 
      WHERE id = bookings.business_id 
      AND user_id = auth.uid()
    )
  );

-- Enable RLS on bookings table
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create a function to get business owner from booking
CREATE OR REPLACE FUNCTION public.get_business_owner_from_booking(booking_id_param bigint)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT bp.user_id
  FROM public.bookings b
  JOIN public.business_profiles bp ON b.business_id = bp.id
  WHERE b.id = booking_id_param;
$$;

-- Create notifications table for in-app notifications
CREATE TABLE IF NOT EXISTS public.in_app_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'booking',
  booking_id bigint REFERENCES public.bookings(id) ON DELETE CASCADE,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE public.in_app_notifications ENABLE ROW LEVEL SECURITY;

-- Add to realtime
ALTER TABLE public.in_app_notifications REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.in_app_notifications;

-- Drop existing notification policies if they exist
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.in_app_notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.in_app_notifications;

-- RLS policies for notifications
CREATE POLICY "Users can view their own notifications" 
  ON public.in_app_notifications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
  ON public.in_app_notifications 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Function to create notification when booking is created
CREATE OR REPLACE FUNCTION public.notify_business_owner_new_booking()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Create trigger for new bookings
DROP TRIGGER IF EXISTS notify_business_owner_trigger ON public.bookings;
CREATE TRIGGER notify_business_owner_trigger
  AFTER INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_business_owner_new_booking();

-- Function to notify user when booking status changes
CREATE OR REPLACE FUNCTION public.notify_user_booking_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  status_message text;
BEGIN
  -- Only notify if status actually changed
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    -- Create appropriate message based on status
    CASE NEW.status
      WHEN 'confirmed' THEN
        status_message := 'Your booking has been confirmed!';
      WHEN 'cancelled' THEN
        status_message := 'Your booking has been cancelled.';
      WHEN 'rejected' THEN
        status_message := 'Your booking has been rejected.';
      ELSE
        status_message := 'Your booking status has been updated to ' || NEW.status;
    END CASE;
    
    -- Create notification for user
    INSERT INTO public.in_app_notifications (
      user_id,
      title,
      message,
      type,
      booking_id
    ) VALUES (
      NEW.user_id,
      'Booking Status Update',
      status_message,
      'status_update',
      NEW.id
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for booking status changes
DROP TRIGGER IF EXISTS notify_user_status_change_trigger ON public.bookings;
CREATE TRIGGER notify_user_status_change_trigger
  AFTER UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_user_booking_status_change();
