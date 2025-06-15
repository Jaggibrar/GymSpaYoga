
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const validateFile = (file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, GIF, WebP)';
    }

    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }

    return null;
  };

  const uploadImage = async (file: File, folder: string = 'general'): Promise<string | null> => {
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
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${folder}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('business-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) {
        throw uploadError;
      }
      
      const { data } = supabase.storage
        .from('business-images')
        .getPublicUrl(fileName);
      
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleImages = async (files: File[], folder: string = 'general'): Promise<string[]> => {
    if (!user) {
      toast.error('You must be logged in to upload images');
      return [];
    }

    setUploading(true);
    const uploadPromises = files.map(file => uploadImage(file, folder));
    
    try {
      const results = await Promise.all(uploadPromises);
      return results.filter(url => url !== null) as string[];
    } catch (error) {
      console.error('Error uploading multiple images:', error);
      return [];
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
