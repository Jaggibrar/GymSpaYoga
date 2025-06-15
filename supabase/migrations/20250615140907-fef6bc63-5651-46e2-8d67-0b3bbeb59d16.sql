
-- Create storage bucket for website media assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'website-media',
  'website-media',
  true,
  10485760, -- 10 MB
  ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
);

-- Anyone can view files in website-media
CREATE POLICY "Anyone can view website media" ON storage.objects
  FOR SELECT USING (bucket_id = 'website-media');

-- Authenticated users can upload website media
CREATE POLICY "Authenticated users can upload website media" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'website-media' 
    AND auth.uid() IS NOT NULL
  );

-- Authenticated users can update their own uploaded website media
CREATE POLICY "Users can update their own website media" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'website-media' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Authenticated users can delete their own website media
CREATE POLICY "Users can delete their own website media" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'website-media'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
