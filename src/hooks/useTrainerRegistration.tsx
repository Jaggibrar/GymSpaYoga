
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from 'sonner';

interface TrainerFormData {
  name: string;
  email: string;
  phone: string;
  category: string;
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
  const { uploadImage } = useImageUpload();

  const validateFormData = (formData: TrainerFormData): string[] => {
    const errors: string[] = [];
    
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.category) errors.push('Category is required');
    if (!formData.experience) errors.push('Experience is required');
    if (!formData.hourlyRate) errors.push('Hourly rate is required');
    if (!formData.location.trim()) errors.push('Location is required');
    if (!formData.bio.trim()) errors.push('Bio is required');
    if (!formData.profileImage) errors.push('Profile image is required');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Phone validation
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.push('Please enter a valid phone number');
    }
    
    // Hourly rate validation
    const rate = parseInt(formData.hourlyRate);
    if (isNaN(rate) || rate <= 0) {
      errors.push('Hourly rate must be a valid positive number');
    }
    
    // Experience validation
    const exp = parseInt(formData.experience);
    if (isNaN(exp) || exp < 0) {
      errors.push('Experience must be a valid number');
    }
    
    return errors;
  };

  const registerTrainer = async (formData: TrainerFormData) => {
    if (!user) {
      toast.error('You must be logged in to register as a trainer');
      return false;
    }

    // Validate form data
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => toast.error(error));
      return false;
    }

    setLoading(true);
    
    try {
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

      // Upload profile image to trainer-images bucket
      let profileImageUrl = null;
      if (formData.profileImage) {
        console.log('Uploading trainer profile image...');
        profileImageUrl = await uploadImage(formData.profileImage, 'trainer-images', 'profiles');
        if (!profileImageUrl) {
          setLoading(false);
          return false;
        }
        console.log('Trainer profile image uploaded:', profileImageUrl);
      }

      // Insert trainer profile with default tier
      const { error } = await supabase
        .from('trainer_profiles')
        .insert({
          user_id: user.id,
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          category: formData.category,
          trainer_tier: 'standard', // Default tier instead of payment tier
          experience: parseInt(formData.experience),
          certifications: formData.certifications.trim(),
          specializations: formData.specializations,
          hourly_rate: parseInt(formData.hourlyRate),
          location: formData.location.trim(),
          bio: formData.bio.trim(),
          profile_image_url: profileImageUrl,
          status: 'approved' // Auto-approve for immediate listing
        });

      if (error) {
        throw error;
      }

      // Update user profile role to business_owner (trainers are also business owners)
      await supabase
        .from('user_profiles')
        .update({ role: 'business_owner' })
        .eq('user_id', user.id);

      toast.success('Trainer registration completed successfully! Your listing is now live.');
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error('Error registering trainer:', error);
      if (error.code === '23505') {
        toast.error('A trainer profile with this email already exists.');
      } else {
        toast.error(error.message || 'Failed to register trainer. Please try again.');
      }
      setLoading(false);
      return false;
    }
  };

  return {
    registerTrainer,
    loading
  };
};
