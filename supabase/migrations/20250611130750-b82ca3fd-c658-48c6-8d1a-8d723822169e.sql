
-- Fix the search_path security issue for update_booking_status function
CREATE OR REPLACE FUNCTION public.update_booking_status(
  booking_id_param BIGINT,
  new_status_param TEXT,
  user_id_param UUID DEFAULT auth.uid(),
  notes_param TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
