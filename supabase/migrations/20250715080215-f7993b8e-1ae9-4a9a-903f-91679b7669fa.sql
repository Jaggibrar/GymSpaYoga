-- Add booking improvement features to reduce cancellation rate
-- Add fields to track booking issues and preferences

-- Add cancellation tracking and user preferences
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS cancellation_reason_category TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS auto_confirm BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS preferred_contact_method TEXT DEFAULT 'email',
ADD COLUMN IF NOT EXISTS booking_source TEXT DEFAULT 'website';

-- Add booking preferences table for better matching
CREATE TABLE IF NOT EXISTS public.booking_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_time_slots TEXT[] DEFAULT '{}',
  preferred_business_types TEXT[] DEFAULT '{}',
  max_travel_distance INTEGER DEFAULT 10,
  auto_confirm_bookings BOOLEAN DEFAULT FALSE,
  notification_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on booking preferences
ALTER TABLE public.booking_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for booking preferences
CREATE POLICY "Users can manage their own booking preferences" 
ON public.booking_preferences FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Add booking reminders table
CREATE TABLE IF NOT EXISTS public.booking_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id BIGINT REFERENCES public.bookings(id) ON DELETE CASCADE,
  reminder_type TEXT NOT NULL, -- 'confirmation', '24h_before', '1h_before'
  scheduled_at TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on booking reminders
ALTER TABLE public.booking_reminders ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for booking reminders
CREATE POLICY "Users can view reminders for their bookings" 
ON public.booking_reminders FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.bookings b 
  WHERE b.id = booking_reminders.booking_id 
  AND b.user_id = auth.uid()
));