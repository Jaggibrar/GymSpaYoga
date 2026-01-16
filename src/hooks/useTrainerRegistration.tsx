import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface TrainerFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  category: string;
  trainer_tier: string;
  bio: string;
  experience: number;
  hourly_rate: number;
  specializations: string[];
  certifications: string;
  profile_image?: File;
}

export interface TrainerRegistrationResult {
  success: boolean;
  trainerId?: string;
  status?: string;
  error?: string;
}

export const useTrainerRegistration = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const registerTrainer = async (formData: TrainerFormData): Promise<TrainerRegistrationResult> => {
    if (!user) {
      toast.error('Please login to register as a trainer');
      return { success: false, error: 'AUTH_REQUIRED' };
    }

    try {
      setLoading(true);
      console.log('Starting trainer registration process...', formData);

      // Check if trainer profile already exists
      const { data: existingProfile } = await supabase
        .from('trainer_profiles')
        .select('id, status')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingProfile) {
        toast.error('You already have a trainer profile. Please contact support if you need to update it.');
        setLoading(false);
        return { success: false, error: 'ALREADY_REGISTERED' };
      }

      // Upload profile image if provided
      let profile_image_url: string | null = null;
      if (formData.profile_image) {
        const fileExt = formData.profile_image.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('trainer-images')
          .upload(fileName, formData.profile_image);

        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          toast.error('Failed to upload profile image');
          setLoading(false);
          return { success: false, error: uploadError.message };
        }

        const { data: { publicUrl } } = supabase.storage
          .from('trainer-images')
          .getPublicUrl(fileName);

        profile_image_url = publicUrl;
      }

      // Insert trainer profile (status handled by trigger)
      const { data: created, error } = await supabase
        .from('trainer_profiles')
        .insert({
          user_id: user.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          category: formData.category,
          trainer_tier: formData.trainer_tier,
          bio: formData.bio,
          experience: formData.experience,
          hourly_rate: formData.hourly_rate,
          specializations: formData.specializations,
          certifications: formData.certifications,
          profile_image_url
        })
        .select('id, status')
        .single();

      if (error) {
        console.error('Error registering trainer:', error);
        toast.error('Failed to register trainer: ' + error.message);
        setLoading(false);
        return { success: false, error: error.message };
      }

      // Legacy profile upsert (non-blocking) - update is_trainer flag
      try {
        const { error: roleError } = await supabase
          .from('user_profiles')
          .upsert({
            user_id: user.id,
            role: 'business_owner',
            full_name: formData.name,
            is_trainer: true
          }, { onConflict: 'user_id' });

        if (roleError) {
          console.warn('Role update warning (non-critical):', roleError);
        }
      } catch (profileError) {
        console.warn('Profile update failed (non-critical):', profileError);
      }

      toast.success('🎉 Registration complete! Your trainer profile is now live.');
      setLoading(false);

      return {
        success: true,
        trainerId: created.id,
        status: created.status || 'pending'
      };
    } catch (error) {
      console.error('Error in trainer registration:', error);
      toast.error('Failed to register trainer');
      setLoading(false);
      return { success: false, error: 'UNKNOWN_ERROR' };
    }
  };

  return { registerTrainer, loading };
};
