-- Fix chat_messages foreign key relationship
-- This allows proper joins between chat_messages and user_profiles

-- First check if the foreign key already exists and drop it if needed
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'chat_messages_sender_id_fkey' 
        AND table_name = 'chat_messages'
    ) THEN
        ALTER TABLE chat_messages DROP CONSTRAINT chat_messages_sender_id_fkey;
    END IF;
END $$;

-- Add foreign key constraint linking sender_id to user_profiles
ALTER TABLE chat_messages 
ADD CONSTRAINT chat_messages_sender_id_fkey 
FOREIGN KEY (sender_id) 
REFERENCES user_profiles(user_id) 
ON DELETE CASCADE;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender_id ON chat_messages(sender_id);

-- Also ensure chat_rooms have proper indexes
CREATE INDEX IF NOT EXISTS idx_chat_rooms_user_id ON chat_rooms(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_business_id ON chat_rooms(business_id);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_trainer_id ON chat_rooms(trainer_id);