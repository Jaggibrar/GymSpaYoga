
-- Create storage bucket for trainer profile images only (profile-images already exists)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'trainer-images',
  'trainer-images',
  true,
  2097152, -- 2MB limit for trainer profile images
  ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']
);

-- Create storage policies for trainer images
CREATE POLICY "Anyone can view trainer images" ON storage.objects
  FOR SELECT USING (bucket_id = 'trainer-images');

CREATE POLICY "Authenticated users can upload trainer images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'trainer-images' 
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can update their own trainer images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'trainer-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own trainer images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'trainer-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
