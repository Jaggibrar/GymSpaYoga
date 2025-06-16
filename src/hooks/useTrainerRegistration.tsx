
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

export const useTrainerRegistration = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const registerTrainer = async (formData: TrainerFormData): Promise<boolean> => {
    if (!user) {
      toast.error('Please login to register as a trainer');
      return false;
    }

    try {
      setLoading(true);
      console.log('Starting trainer registration process...', formData);

      // Check if trainer profile already exists
      const { data: existingProfile } = await supabase
        .from('trainer_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (existingProfile) {
        toast.error('You already have a trainer profile. Please contact support if you need to update it.');
        setLoading(false);
        return false;
      }

      // Upload profile image if provided
      let profile_image_url = null;
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
          return false;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('trainer-images')
          .getPublicUrl(fileName);
        
        profile_image_url = publicUrl;
      }

      // Insert trainer profile
      const { error } = await supabase
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
          profile_image_url,
          status: 'approved' // Auto-approve for immediate listing
        });

      if (error) {
        console.error('Error registering trainer:', error);
        toast.error('Failed to register trainer: ' + error.message);
        setLoading(false);
        return false;
      }

      // Update user profile role to trainer - use the proper enum value
      const { error: roleError } = await supabase
        .from('user_profiles')
        .upsert({ 
          user_id: user.id, 
          role: 'end_user', // Use valid enum value instead of 'trainer'
          full_name: formData.name
        });

      if (roleError) {
        console.error('Role update error:', roleError);
        // Don't fail the registration for this
      }

      console.log('Trainer registration completed successfully');
      toast.success('🎉 Trainer registration successful! Your profile is now live and ready to receive bookings.');
      
      // Add a small delay to show the success message
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Error in trainer registration:', error);
      toast.error('Failed to register trainer');
      setLoading(false);
      return false;
    }
  };

  return { registerTrainer, loading };
};
