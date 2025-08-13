-- Add price quote support to chat messages
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS price_quote JSONB;
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS message_subtype TEXT DEFAULT 'normal';

-- Create bookings confirmation table
CREATE TABLE IF NOT EXISTS chat_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_room_id UUID NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL,
  business_id UUID,
  trainer_id UUID,
  message_id UUID REFERENCES chat_messages(id),
  service_details JSONB NOT NULL,
  price_amount INTEGER NOT NULL,
  booking_status TEXT DEFAULT 'confirmed',
  platform_fee INTEGER DEFAULT 2000, -- ₹20 in paisa
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on chat_bookings
ALTER TABLE chat_bookings ENABLE ROW LEVEL SECURITY;

-- RLS policies for chat_bookings
CREATE POLICY "Users can view their bookings" ON chat_bookings
FOR SELECT USING (
  customer_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM business_profiles bp 
    WHERE bp.id = business_id AND bp.user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM trainer_profiles tp 
    WHERE tp.id = trainer_id AND tp.user_id = auth.uid()
  )
);

CREATE POLICY "System can create bookings" ON chat_bookings
FOR INSERT WITH CHECK (true);

-- Create billing tracking table
CREATE TABLE IF NOT EXISTS platform_billing (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_owner_id UUID NOT NULL,
  booking_id UUID NOT NULL REFERENCES chat_bookings(id),
  fee_amount INTEGER NOT NULL DEFAULT 2000,
  billing_month DATE NOT NULL DEFAULT date_trunc('month', now()),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on platform_billing
ALTER TABLE platform_billing ENABLE ROW LEVEL SECURITY;

-- Business owners can view their billing
CREATE POLICY "Business owners can view their billing" ON platform_billing
FOR SELECT USING (business_owner_id = auth.uid());

-- Admins can view all billing
CREATE POLICY "Admins can view all billing" ON platform_billing
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM admin_permissions 
    WHERE user_id = auth.uid() AND 'view_analytics' = ANY(permissions)
  )
);

-- Add business owner status tracking
CREATE TABLE IF NOT EXISTS owner_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  is_online BOOLEAN DEFAULT false,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT now(),
  auto_reply_message TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on owner_status
ALTER TABLE owner_status ENABLE ROW LEVEL SECURITY;

-- Users can manage their own status
CREATE POLICY "Users can manage their own status" ON owner_status
FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Anyone can view owner status
CREATE POLICY "Anyone can view owner status" ON owner_status
FOR SELECT USING (true);

-- Function to create booking and billing record
CREATE OR REPLACE FUNCTION create_chat_booking(
  p_chat_room_id UUID,
  p_customer_id UUID,
  p_business_id UUID,
  p_trainer_id UUID,
  p_message_id UUID,
  p_service_details JSONB,
  p_price_amount INTEGER
) RETURNS UUID AS $$
DECLARE
  booking_id UUID;
  owner_id UUID;
BEGIN
  -- Insert booking
  INSERT INTO chat_bookings (
    chat_room_id, customer_id, business_id, trainer_id, 
    message_id, service_details, price_amount
  ) VALUES (
    p_chat_room_id, p_customer_id, p_business_id, p_trainer_id,
    p_message_id, p_service_details, p_price_amount
  ) RETURNING id INTO booking_id;
  
  -- Determine owner ID
  IF p_business_id IS NOT NULL THEN
    SELECT user_id INTO owner_id FROM business_profiles WHERE id = p_business_id;
  ELSIF p_trainer_id IS NOT NULL THEN
    SELECT user_id INTO owner_id FROM trainer_profiles WHERE id = p_trainer_id;
  END IF;
  
  -- Create billing record
  IF owner_id IS NOT NULL THEN
    INSERT INTO platform_billing (business_owner_id, booking_id, fee_amount)
    VALUES (owner_id, booking_id, 2000);
  END IF;
  
  -- Create notification
  INSERT INTO in_app_notifications (
    user_id, title, message, type
  ) VALUES (
    owner_id,
    'New Booking Confirmed',
    'A customer has confirmed a booking through chat',
    'booking_confirmed'
  );
  
  RETURN booking_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update owner online status
CREATE OR REPLACE FUNCTION update_owner_status(
  p_user_id UUID,
  p_is_online BOOLEAN DEFAULT true
) RETURNS VOID AS $$
BEGIN
  INSERT INTO owner_status (user_id, is_online, last_seen)
  VALUES (p_user_id, p_is_online, now())
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    is_online = p_is_online,
    last_seen = now(),
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;