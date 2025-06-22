
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useBusinessImageUpload = () => {
  const [uploading, setUploading] = useState(false);

  const validateFile = (file: File): string | null => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return `Invalid file type: ${file.name}. Only image files are allowed.`;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return `File too large: ${file.name}. Maximum size is 5MB.`;
    }

    return null; // No errors
  };

  const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
    if (!files || files.length === 0) {
      console.log('No files to upload');
      return [];
    }

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      console.log(`Starting upload of ${files.length} files...`);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`Uploading file ${i + 1}/${files.length}:`, file.name);

        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
          console.error('Validation error:', validationError);
          toast.error(validationError);
          continue;
        }

        // Generate unique filename with user ID folder structure
        const { data: { user } } = await supabase.auth.getUser();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = user ? `${user.id}/${fileName}` : fileName;

        console.log('Uploading to path:', filePath);

        const { data, error } = await supabase.storage
          .from('business-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          console.error('Upload error for file:', file.name, error);
          toast.error(`Failed to upload ${file.name}: ${error.message}`);
          continue;
        }

        console.log('Upload successful:', data);

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('business-images')
          .getPublicUrl(filePath);

        if (urlData?.publicUrl) {
          uploadedUrls.push(urlData.publicUrl);
          console.log('Generated public URL:', urlData.publicUrl);
        } else {
          console.error('Failed to get public URL for:', filePath);
          toast.error(`Failed to get URL for ${file.name}`);
        }
      }

      console.log(`Upload completed. ${uploadedUrls.length}/${files.length} files uploaded successfully`);
      
      if (uploadedUrls.length > 0) {
        toast.success(`Successfully uploaded ${uploadedUrls.length} image(s)`);
      }

      return uploadedUrls;

    } catch (error) {
      console.error('Unexpected upload error:', error);
      toast.error('Failed to upload images');
      return [];
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (imageUrl: string): Promise<boolean> => {
    try {
      // Extract the file path from the URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const userId = urlParts[urlParts.length - 2];
      const filePath = `${userId}/${fileName}`;

      const { error } = await supabase.storage
        .from('business-images')
        .remove([filePath]);

      if (error) {
        console.error('Delete error:', error);
        toast.error(`Failed to delete image: ${error.message}`);
        return false;
      }

      toast.success('Image deleted successfully');
      return true;
    } catch (error) {
      console.error('Unexpected delete error:', error);
      toast.error('Failed to delete image');
      return false;
    }
  };

  return {
    uploadMultipleImages,
    deleteImage,
    uploading,
    validateFile
  };
};
