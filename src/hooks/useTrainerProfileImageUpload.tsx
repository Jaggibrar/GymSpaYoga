
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useTrainerProfileImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const validateFile = (file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    const maxSize = 2 * 1024 * 1024; // 2MB for trainer profile images

    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, GIF, WebP)';
    }

    if (file.size > maxSize) {
      return 'File size must be less than 2MB';
    }

    return null;
  };

  const uploadTrainerProfileImage = async (file: File): Promise<string | null> => {
    if (!user) {
      toast.error('Please login to upload images');
      return null;
    }

    const validationError = validateFile(file);
    if (validationError) {
      toast.error(validationError);
      return null;
    }

    setUploading(true);
    try {
      // First, let's check if the bucket exists
      console.log('Checking if trainer-images bucket exists...');
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Error listing buckets:', bucketsError);
        toast.error('Failed to check storage availability');
        return null;
      }
      
      const trainerBucket = buckets?.find(bucket => bucket.id === 'trainer-images');
      if (!trainerBucket) {
        console.error('trainer-images bucket not found. Available buckets:', buckets?.map(b => b.id));
        toast.error('Trainer images storage bucket not found. Please contact support.');
        return null;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile.${fileExt}`;
      
      console.log(`Uploading trainer profile image to: trainer-images/${fileName}`);
      
      const { error: uploadError } = await supabase.storage
        .from('trainer-images')
        .upload(fileName, file, { 
          upsert: true,
          cacheControl: '3600'
        });
      
      if (uploadError) {
        console.error('Trainer profile image upload error:', uploadError);
        toast.error(`Upload failed: ${uploadError.message}`);
        return null;
      }
      
      const { data } = supabase.storage
        .from('trainer-images')
        .getPublicUrl(fileName);
      
      toast.success('Trainer profile image uploaded successfully!');
      console.log('Trainer profile upload successful, public URL:', data.publicUrl);
      return data.publicUrl;
    } catch (err) {
      console.error('Error uploading trainer profile image:', err);
      toast.error('Failed to upload trainer profile image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadTrainerProfileImage,
    uploading,
    validateFile
  };
};
