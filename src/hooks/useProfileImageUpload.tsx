
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useProfileImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const validateFile = (file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    const maxSize = 2 * 1024 * 1024; // 2MB for profile images

    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, GIF, WebP)';
    }

    if (file.size > maxSize) {
      return 'File size must be less than 2MB';
    }

    return null;
  };

  const uploadProfileImage = async (file: File): Promise<string | null> => {
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
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile.${fileExt}`;
      
      console.log(`Uploading profile image to: profile-images/${fileName}`);
      
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, { 
          upsert: true,
          cacheControl: '3600'
        });
      
      if (uploadError) {
        console.error('Profile image upload error:', uploadError);
        toast.error(`Upload failed: ${uploadError.message}`);
        return null;
      }
      
      const { data } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);
      
      toast.success('Profile image uploaded successfully!');
      console.log('Profile upload successful, public URL:', data.publicUrl);
      return data.publicUrl;
    } catch (err) {
      console.error('Error uploading profile image:', err);
      toast.error('Failed to upload profile image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadProfileImage,
    uploading,
    validateFile
  };
};
