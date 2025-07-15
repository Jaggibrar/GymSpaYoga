-- Add missing foreign key constraints for data integrity
-- This will ensure referential integrity and prevent orphaned records

-- Add foreign key constraint for bookings -> business_profiles
ALTER TABLE public.bookings 
ADD CONSTRAINT fk_bookings_business_id 
FOREIGN KEY (business_id) REFERENCES public.business_profiles(id) 
ON DELETE CASCADE;

-- Add foreign key constraint for bookings -> trainer_profiles  
ALTER TABLE public.bookings 
ADD CONSTRAINT fk_bookings_trainer_id 
FOREIGN KEY (trainer_id) REFERENCES public.trainer_profiles(id) 
ON DELETE CASCADE;

-- Add foreign key constraint for bookings -> user_profiles (user_id)
ALTER TABLE public.bookings 
ADD CONSTRAINT fk_bookings_user_id 
FOREIGN KEY (user_id) REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Add foreign key constraint for business_profiles -> user_profiles
ALTER TABLE public.business_profiles 
ADD CONSTRAINT fk_business_profiles_user_id 
FOREIGN KEY (user_id) REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Add foreign key constraint for trainer_profiles -> user_profiles
ALTER TABLE public.trainer_profiles 
ADD CONSTRAINT fk_trainer_profiles_user_id 
FOREIGN KEY (user_id) REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Add foreign key constraint for user_profiles -> auth.users
ALTER TABLE public.user_profiles 
ADD CONSTRAINT fk_user_profiles_user_id 
FOREIGN KEY (user_id) REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Add foreign key constraint for booking_status_history -> bookings
ALTER TABLE public.booking_status_history 
ADD CONSTRAINT fk_booking_status_history_booking_id 
FOREIGN KEY (booking_id) REFERENCES public.bookings(id) 
ON DELETE CASCADE;

-- Add foreign key constraint for in_app_notifications -> bookings
ALTER TABLE public.in_app_notifications 
ADD CONSTRAINT fk_notifications_booking_id 
FOREIGN KEY (booking_id) REFERENCES public.bookings(id) 
ON DELETE CASCADE;

-- Add foreign key constraint for in_app_notifications -> auth.users
ALTER TABLE public.in_app_notifications 
ADD CONSTRAINT fk_notifications_user_id 
FOREIGN KEY (user_id) REFERENCES auth.users(id) 
ON DELETE CASCADE;