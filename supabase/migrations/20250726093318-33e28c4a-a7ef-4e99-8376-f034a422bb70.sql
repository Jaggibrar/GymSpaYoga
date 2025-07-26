-- Grant admin access to jaggibrar001234@gmail.com
SELECT grant_admin_access('jaggibrar001234@gmail.com');

-- Update business_profiles RLS policies to allow admin access
DROP POLICY IF EXISTS "Admins can manage all business profiles" ON public.business_profiles;
CREATE POLICY "Admins can manage all business profiles" 
ON public.business_profiles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_permissions 
    WHERE user_id = auth.uid() 
    AND 'manage_listings' = ANY(permissions)
  )
);

-- Update business_documents RLS policies to allow admin access
DROP POLICY IF EXISTS "Admins can manage all business documents" ON public.business_documents;
CREATE POLICY "Admins can manage all business documents" 
ON public.business_documents 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_permissions 
    WHERE user_id = auth.uid() 
    AND 'manage_listings' = ANY(permissions)
  )
);

-- Ensure admins can view all business stats
DROP POLICY IF EXISTS "Admins can view all business stats" ON public.business_stats;
CREATE POLICY "Admins can view all business stats" 
ON public.business_stats 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_permissions 
    WHERE user_id = auth.uid() 
    AND 'view_analytics' = ANY(permissions)
  )
);

-- Create storage policies for admin access to business images
-- First, check if policies exist and drop them if they do
DROP POLICY IF EXISTS "Admins can manage all business images" ON storage.objects;
CREATE POLICY "Admins can manage all business images" 
ON storage.objects 
FOR ALL 
USING (
  bucket_id = 'business-images' AND
  EXISTS (
    SELECT 1 FROM admin_permissions 
    WHERE user_id = auth.uid() 
    AND 'manage_listings' = ANY(permissions)
  )
);

-- Storage policy for business logos
DROP POLICY IF EXISTS "Admins can manage business logos" ON storage.objects;
CREATE POLICY "Admins can manage business logos" 
ON storage.objects 
FOR ALL 
USING (
  bucket_id = 'business-logos' AND
  EXISTS (
    SELECT 1 FROM admin_permissions 
    WHERE user_id = auth.uid() 
    AND 'manage_listings' = ANY(permissions)
  )
);

-- Allow admins to view all bookings for business management
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
CREATE POLICY "Admins can view all bookings" 
ON public.bookings 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM admin_permissions 
    WHERE user_id = auth.uid() 
    AND 'manage_listings' = ANY(permissions)
  )
);

-- Allow admins to manage booking status
DROP POLICY IF EXISTS "Admins can update booking status" ON public.bookings;
CREATE POLICY "Admins can update booking status" 
ON public.bookings 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM admin_permissions 
    WHERE user_id = auth.uid() 
    AND 'manage_listings' = ANY(permissions)
  )
);