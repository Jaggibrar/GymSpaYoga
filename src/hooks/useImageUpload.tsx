
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const validateFile = (file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB for business images

    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, GIF, WebP)';
    }

    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }

    return null;
  };

  const uploadImage = async (file: File, bucket: string = 'business-images', folder: string = 'general'): Promise<string | null> => {
    if (!user) {
      toast.error('You must be logged in to upload images');
      return null;
    }

    const validationError = validateFile(file);
    if (validationError) {
      toast.error(validationError);
      return null;
    }

    setUploading(true);
    try {
      // Check if the bucket exists
      console.log(`Checking if ${bucket} bucket exists...`);
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Error listing buckets:', bucketsError);
        toast.error('Failed to check storage availability');
        return null;
      }
      
      const targetBucket = buckets?.find(b => b.id === bucket);
      if (!targetBucket) {
        console.error(`${bucket} bucket not found. Available buckets:`, buckets?.map(b => b.id));
        toast.error(`Storage bucket '${bucket}' not found. Please contact support.`);
        return null;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${folder}/${Date.now()}.${fileExt}`;
      
      console.log(`Uploading to bucket: ${bucket}, path: ${fileName}`);
      
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast.error(`Upload failed: ${uploadError.message}`);
        return null;
      }
      
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);
      
      toast.success('Image uploaded successfully!');
      console.log('Upload successful, public URL:', data.publicUrl);
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleImages = async (files: File[], bucket: string = 'business-images', folder: string = 'general'): Promise<string[]> => {
    if (!user) {
      toast.error('You must be logged in to upload images');
      return [];
    }

    if (files.length === 0) {
      return [];
    }

    setUploading(true);
    const results: string[] = [];
    
    try {
      for (const file of files) {
        const url = await uploadImage(file, bucket, folder);
        if (url) {
          results.push(url);
        }
      }
      return results;
    } catch (error) {
      console.error('Error uploading multiple images:', error);
      return results;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadImage,
    uploadMultipleImages,
    uploading,
    validateFile
  };
};
