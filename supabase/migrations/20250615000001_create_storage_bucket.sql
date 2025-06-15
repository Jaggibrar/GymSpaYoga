
-- Create storage bucket for business images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'business-images',
  'business-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']
);

-- Create storage policies for business images
CREATE POLICY "Anyone can view business images" ON storage.objects
  FOR SELECT USING (bucket_id = 'business-images');

CREATE POLICY "Authenticated users can upload business images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'business-images' 
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can update their own business images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'business-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own business images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'business-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
