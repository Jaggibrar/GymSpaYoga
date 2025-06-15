
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useBusinessImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const validateFile = (file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, WebP only)';
    }

    if (file.size > maxSize) {
      return 'File size must be less than 2MB';
    }

    return null;
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!user) {
      console.error('User not authenticated for image upload');
      toast.error('You must be logged in to upload images');
      return null;
    }

    const validationError = validateFile(file);
    if (validationError) {
      console.error('File validation failed:', validationError);
      toast.error(validationError);
      return null;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/business-logo-${Date.now()}.${fileExt}`;
      
      console.log(`Uploading business image to: business-logos/${fileName}`);
      
      const { error: uploadError } = await supabase.storage
        .from('business-logos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) {
        console.error('Business image upload error:', uploadError);
        if (uploadError.message?.includes('not found') || uploadError.message?.includes('does not exist')) {
          toast.error('Storage bucket configuration issue. Please refresh the page and try again.');
        } else {
          toast.error(`Upload failed: ${uploadError.message}`);
        }
        return null;
      }
      
      const { data } = supabase.storage
        .from('business-logos')
        .getPublicUrl(fileName);
      
      console.log('Business image upload successful, public URL:', data.publicUrl);
      toast.success('Image uploaded successfully!');
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading business image:', error);
      toast.error('Failed to upload image. Please try again.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
    if (!user) {
      console.error('User not authenticated for multiple image upload');
      toast.error('You must be logged in to upload images');
      return [];
    }

    if (files.length === 0) {
      return [];
    }

    console.log(`Starting upload of ${files.length} images`);
    setUploading(true);
    const results: string[] = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`Uploading image ${i + 1}/${files.length}: ${file.name}`);
        const url = await uploadImage(file);
        if (url) {
          results.push(url);
        } else {
          console.error(`Failed to upload image ${i + 1}: ${file.name}`);
        }
      }
      
      console.log(`Successfully uploaded ${results.length}/${files.length} images`);
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
