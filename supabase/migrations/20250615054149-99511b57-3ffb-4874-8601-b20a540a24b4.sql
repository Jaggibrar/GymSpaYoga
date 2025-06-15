
-- Create storage bucket for business logos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'business-logos',
  'business-logos',
  true,
  2097152, -- 2MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Create storage policies for business logos
CREATE POLICY "Anyone can view business logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'business-logos');

CREATE POLICY "Authenticated users can upload business logos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'business-logos' 
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can update their own business logos" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'business-logos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own business logos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'business-logos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Update business_profiles table to show all listings (remove approval requirement temporarily)
-- This will be handled in the code by removing status filters
