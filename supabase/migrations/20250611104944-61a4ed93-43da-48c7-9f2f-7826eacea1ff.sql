
-- Add booking confirmation fields to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS confirmation_code TEXT UNIQUE DEFAULT gen_random_uuid()::text,
ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT,
ADD COLUMN IF NOT EXISTS business_response TEXT,
ADD COLUMN IF NOT EXISTS response_at TIMESTAMPTZ;

-- Create booking_status_history table to track status changes
CREATE TABLE IF NOT EXISTS public.booking_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id BIGINT REFERENCES public.bookings(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT,
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes TEXT
);

-- Enable RLS for booking_status_history
ALTER TABLE public.booking_status_history ENABLE ROW LEVEL SECURITY;

-- Allow users to view history for their bookings
CREATE POLICY "Users can view booking history for their bookings" ON public.booking_status_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.bookings 
      WHERE bookings.id = booking_status_history.booking_id 
      AND bookings.user_id = auth.uid()
    )
  );

-- Allow system to insert history records
CREATE POLICY "System can insert booking history" ON public.booking_status_history
  FOR INSERT WITH CHECK (true);

-- Create notification preferences table
CREATE TABLE IF NOT EXISTS public.notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email_bookings BOOLEAN DEFAULT true,
  email_confirmations BOOLEAN DEFAULT true,
  email_reminders BOOLEAN DEFAULT true,
  sms_bookings BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for notification_preferences
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- Users can manage their own notification preferences
CREATE POLICY "Users can manage their notification preferences" ON public.notification_preferences
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Create function to update booking status and track history
CREATE OR REPLACE FUNCTION update_booking_status(
  booking_id_param BIGINT,
  new_status_param TEXT,
  user_id_param UUID DEFAULT auth.uid(),
  notes_param TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;
