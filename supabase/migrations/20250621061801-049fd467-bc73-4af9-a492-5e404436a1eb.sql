
-- First, let's check what constraints exist and remove the problematic one
ALTER TABLE business_profiles DROP CONSTRAINT IF EXISTS business_profiles_category_check;

-- Now update the existing business categories to use proper category names
UPDATE business_profiles 
SET category = 'gym' 
WHERE business_type = 'gym';

UPDATE business_profiles 
SET category = 'spa' 
WHERE business_type = 'spa';

UPDATE business_profiles 
SET category = 'yoga' 
WHERE business_type = 'yoga';

-- Create storage bucket for business images if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('business-images', 'business-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for business images
CREATE POLICY "Anyone can view business images" ON storage.objects
FOR SELECT USING (bucket_id = 'business-images');

CREATE POLICY "Authenticated users can upload business images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'business-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own business images" ON storage.objects
FOR UPDATE USING (bucket_id = 'business-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own business images" ON storage.objects
FOR DELETE USING (bucket_id = 'business-images' AND auth.uid()::text = (storage.foldername(name))[1]);
