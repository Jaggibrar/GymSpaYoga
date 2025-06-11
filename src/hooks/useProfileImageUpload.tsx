
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useProfileImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const uploadProfileImage = async (file: File): Promise<string | null> => {
    if (!user) {
      toast.error('Please login to upload images');
      return null;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return null;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, { upsert: true });
      
      if (uploadError) {
        throw uploadError;
      }
      
      const { data } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);
      
      toast.success('Profile image uploaded successfully!');
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
    uploading
  };
};
