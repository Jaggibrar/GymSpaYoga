-- Add missing foreign key constraints for data integrity

-- Add foreign key constraint between bookings and business_profiles
ALTER TABLE public.bookings 
ADD CONSTRAINT fk_bookings_business_id 
FOREIGN KEY (business_id) REFERENCES public.business_profiles(id) 
ON DELETE CASCADE;

-- Add foreign key constraint between bookings and trainer_profiles
ALTER TABLE public.bookings 
ADD CONSTRAINT fk_bookings_trainer_id 
FOREIGN KEY (trainer_id) REFERENCES public.trainer_profiles(id) 
ON DELETE SET NULL;

-- Add foreign key constraint between bookings and auth.users for user_id
-- Note: We cannot directly reference auth.users, so we'll ensure user_id validation through RLS

-- Add foreign key constraint between business_profiles and auth.users
-- Note: We cannot directly reference auth.users, so this is handled through RLS

-- Add foreign key constraint between in_app_notifications and bookings
ALTER TABLE public.in_app_notifications 
ADD CONSTRAINT fk_notifications_booking_id 
FOREIGN KEY (booking_id) REFERENCES public.bookings(id) 
ON DELETE CASCADE;

-- Add foreign key constraint between calendar_events and bookings
ALTER TABLE public.calendar_events 
ADD CONSTRAINT fk_calendar_events_booking_id 
FOREIGN KEY (booking_id) REFERENCES public.bookings(id) 
ON DELETE CASCADE;

-- Add foreign key constraint between user_wishlist and business_profiles
ALTER TABLE public.user_wishlist 
ADD CONSTRAINT fk_wishlist_business_id 
FOREIGN KEY (business_id) REFERENCES public.business_profiles(id) 
ON DELETE CASCADE;

-- Add foreign key constraint between business_stats and business_profiles
ALTER TABLE public.business_stats 
ADD CONSTRAINT fk_business_stats_business_id 
FOREIGN KEY (business_id) REFERENCES public.business_profiles(id) 
ON DELETE CASCADE;

-- Add foreign key constraint between business_documents and business_profiles
ALTER TABLE public.business_documents 
ADD CONSTRAINT fk_business_documents_business_id 
FOREIGN KEY (business_id) REFERENCES public.business_profiles(id) 
ON DELETE CASCADE;