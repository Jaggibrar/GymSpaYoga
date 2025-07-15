-- Create function to mark old notifications as read (admin function)
CREATE OR REPLACE FUNCTION public.mark_old_notifications_read()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE public.in_app_notifications 
  SET is_read = true 
  WHERE is_read = false 
    AND created_at < (NOW() - INTERVAL '7 days');
  
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  
  RETURN updated_count;
END;
$$;

-- Create function to clean up old notifications (older than 30 days)
CREATE OR REPLACE FUNCTION public.cleanup_old_notifications()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.in_app_notifications 
  WHERE created_at < (NOW() - INTERVAL '30 days')
    AND is_read = true;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RETURN deleted_count;
END;
$$;