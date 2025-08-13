-- Extend RLS for chat access to business/trainer owners and allow read receipts

-- Chat rooms: owners can view and update rooms for their businesses/trainers
CREATE POLICY "Owners can view business chat rooms" ON chat_rooms
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM business_profiles bp
    WHERE bp.user_id = auth.uid() AND bp.id = chat_rooms.business_id
  )
);

CREATE POLICY "Owners can view trainer chat rooms" ON chat_rooms
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM trainer_profiles tp
    WHERE tp.user_id = auth.uid() AND tp.id = chat_rooms.trainer_id
  )
);

CREATE POLICY "Owners can update business chat rooms" ON chat_rooms
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM business_profiles bp
    WHERE bp.user_id = auth.uid() AND bp.id = chat_rooms.business_id
  )
);

CREATE POLICY "Owners can update trainer chat rooms" ON chat_rooms
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM trainer_profiles tp
    WHERE tp.user_id = auth.uid() AND tp.id = chat_rooms.trainer_id
  )
);

-- Chat messages: owners can view and send messages in their rooms
CREATE POLICY "Owners can view messages in business rooms" ON chat_messages
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM chat_rooms cr
    JOIN business_profiles bp ON bp.id = cr.business_id
    WHERE cr.id = chat_messages.chat_room_id AND bp.user_id = auth.uid()
  )
);

CREATE POLICY "Owners can view messages in trainer rooms" ON chat_messages
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM chat_rooms cr
    JOIN trainer_profiles tp ON tp.id = cr.trainer_id
    WHERE cr.id = chat_messages.chat_room_id AND tp.user_id = auth.uid()
  )
);

CREATE POLICY "Owners can send messages in business rooms" ON chat_messages
FOR INSERT WITH CHECK (
  (auth.uid() = sender_id) AND EXISTS (
    SELECT 1 FROM chat_rooms cr
    JOIN business_profiles bp ON bp.id = cr.business_id
    WHERE cr.id = chat_messages.chat_room_id AND bp.user_id = auth.uid()
  )
);

CREATE POLICY "Owners can send messages in trainer rooms" ON chat_messages
FOR INSERT WITH CHECK (
  (auth.uid() = sender_id) AND EXISTS (
    SELECT 1 FROM chat_rooms cr
    JOIN trainer_profiles tp ON tp.id = cr.trainer_id
    WHERE cr.id = chat_messages.chat_room_id AND tp.user_id = auth.uid()
  )
);

-- Allow participants to mark messages as read
CREATE POLICY "Participants can mark messages read" ON chat_messages
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM chat_rooms cr
    WHERE cr.id = chat_messages.chat_room_id AND (
      cr.user_id = auth.uid() OR
      EXISTS (SELECT 1 FROM business_profiles bp WHERE bp.id = cr.business_id AND bp.user_id = auth.uid()) OR
      EXISTS (SELECT 1 FROM trainer_profiles tp WHERE tp.id = cr.trainer_id AND tp.user_id = auth.uid())
    )
  )
) WITH CHECK (
  TRUE
);

-- Fix security linter warnings by setting search_path on functions
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
  INSERT INTO chat_bookings (
    chat_room_id, customer_id, business_id, trainer_id, 
    message_id, service_details, price_amount
  ) VALUES (
    p_chat_room_id, p_customer_id, p_business_id, p_trainer_id,
    p_message_id, p_service_details, p_price_amount
  ) RETURNING id INTO booking_id;
  
  IF p_business_id IS NOT NULL THEN
    SELECT user_id INTO owner_id FROM business_profiles WHERE id = p_business_id;
  ELSIF p_trainer_id IS NOT NULL THEN
    SELECT user_id INTO owner_id FROM trainer_profiles WHERE id = p_trainer_id;
  END IF;
  
  IF owner_id IS NOT NULL THEN
    INSERT INTO platform_billing (business_owner_id, booking_id, fee_amount)
    VALUES (owner_id, booking_id, 2000);
  END IF;
  
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO '';

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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO '';
