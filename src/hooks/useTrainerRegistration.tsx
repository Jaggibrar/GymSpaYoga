
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface TrainerFormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  trainerTier: string;
  experience: string;
  certifications: string;
  specializations: string[];
  hourlyRate: string;
  location: string;
  bio: string;
  profileImage: File | null;
}

export const useTrainerRegistration = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const uploadProfileImage = async (file: File, userId: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file);
    
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }
    
    const { data } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName);
    
    return data.publicUrl;
  };

  const registerTrainer = async (formData: TrainerFormData) => {
    if (!user) {
      toast.error('You must be logged in to register as a trainer');
      return false;
    }

    setLoading(true);
    
    try {
      let profileImageUrl = null;
      
      // Upload profile image if provided
      if (formData.profileImage) {
        profileImageUrl = await uploadProfileImage(formData.profileImage, user.id);
        if (!profileImageUrl) {
          toast.error('Failed to upload profile image');
          setLoading(false);
          return false;
        }
      }

      // Insert trainer profile
      const { error } = await supabase
        .from('trainer_profiles')
        .insert({
          user_id: user.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          category: formData.category,
          trainer_tier: formData.trainerTier,
          experience: parseInt(formData.experience),
          certifications: formData.certifications,
          specializations: formData.specializations,
          hourly_rate: parseInt(formData.hourlyRate),
          location: formData.location,
          bio: formData.bio,
          profile_image_url: profileImageUrl,
          status: 'pending'
        });

      if (error) {
        throw error;
      }

      toast.success('Trainer registration submitted successfully! We will review your application and get back to you soon.');
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error('Error registering trainer:', error);
      toast.error(error.message || 'Failed to register trainer');
      setLoading(false);
      return false;
    }
  };

  return {
    registerTrainer,
    loading
  };
};
