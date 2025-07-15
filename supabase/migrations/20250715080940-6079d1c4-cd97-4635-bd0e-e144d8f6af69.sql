-- Fix permission issues with in_app_notifications table
-- Allow system/triggers to insert notifications

-- Drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "System can insert notifications" ON public.in_app_notifications;

-- Create policy to allow triggers and system functions to insert notifications
CREATE POLICY "System can insert notifications" 
ON public.in_app_notifications 
FOR INSERT 
WITH CHECK (true);

-- Ensure the notification trigger functions have proper permissions
-- Grant necessary permissions to the public schema functions
GRANT INSERT ON public.in_app_notifications TO postgres;
GRANT INSERT ON public.in_app_notifications TO service_role;