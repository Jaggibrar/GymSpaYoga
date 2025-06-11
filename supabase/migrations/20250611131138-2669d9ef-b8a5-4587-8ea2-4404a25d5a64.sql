
-- Create notifications table for email notifications (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  template TEXT NOT NULL,
  data JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create calendar_events table for calendar integration
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  business_id UUID,
  trainer_id UUID,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  event_type TEXT DEFAULT 'booking' CHECK (event_type IN ('booking', 'session', 'reminder')),
  booking_id BIGINT REFERENCES public.bookings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create search_filters table for advanced search preferences
CREATE TABLE IF NOT EXISTS public.search_filters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  filter_name TEXT NOT NULL,
  business_type TEXT CHECK (business_type IN ('gym', 'spa', 'yoga')),
  filters JSONB NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create chat_rooms table for real-time chat
CREATE TABLE IF NOT EXISTS public.chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  business_id UUID,
  trainer_id UUID,
  room_type TEXT DEFAULT 'business' CHECK (room_type IN ('business', 'trainer')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chat_target_check CHECK (
    (business_id IS NOT NULL AND trainer_id IS NULL) OR 
    (business_id IS NULL AND trainer_id IS NOT NULL)
  )
);

-- Create chat_messages table for storing messages
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for new tables (skip if already enabled)
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_filters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for notifications
DROP POLICY IF EXISTS "System can manage notifications" ON public.notifications;
CREATE POLICY "System can manage notifications" ON public.notifications FOR ALL USING (true);

-- RLS policies for calendar_events
DROP POLICY IF EXISTS "Users can view their own calendar events" ON public.calendar_events;
DROP POLICY IF EXISTS "Users can create their own calendar events" ON public.calendar_events;
DROP POLICY IF EXISTS "Users can update their own calendar events" ON public.calendar_events;
DROP POLICY IF EXISTS "Users can delete their own calendar events" ON public.calendar_events;

CREATE POLICY "Users can view their own calendar events" ON public.calendar_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own calendar events" ON public.calendar_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own calendar events" ON public.calendar_events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own calendar events" ON public.calendar_events FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for search_filters
DROP POLICY IF EXISTS "Users can manage their own search filters" ON public.search_filters;
CREATE POLICY "Users can manage their own search filters" ON public.search_filters FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- RLS policies for chat_rooms
DROP POLICY IF EXISTS "Users can view their own chat rooms" ON public.chat_rooms;
DROP POLICY IF EXISTS "Users can create their own chat rooms" ON public.chat_rooms;
DROP POLICY IF EXISTS "Users can update their own chat rooms" ON public.chat_rooms;

CREATE POLICY "Users can view their own chat rooms" ON public.chat_rooms FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own chat rooms" ON public.chat_rooms FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own chat rooms" ON public.chat_rooms FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for chat_messages
DROP POLICY IF EXISTS "Users can view messages in their chat rooms" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can send messages to their chat rooms" ON public.chat_messages;

CREATE POLICY "Users can view messages in their chat rooms" ON public.chat_messages 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.chat_rooms 
      WHERE chat_rooms.id = chat_messages.chat_room_id 
      AND chat_rooms.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can send messages to their chat rooms" ON public.chat_messages 
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.chat_rooms 
      WHERE chat_rooms.id = chat_room_id 
      AND chat_rooms.user_id = auth.uid()
    )
  );

-- Enable real-time for chat functionality
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_rooms;

-- Create indexes for better performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_calendar_events_user_id ON public.calendar_events(user_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_start_time ON public.calendar_events(start_time);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_user_id ON public.chat_rooms(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_chat_room_id ON public.chat_messages(chat_room_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at);
