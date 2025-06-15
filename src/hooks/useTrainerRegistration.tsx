
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useTrainerProfileImageUpload } from '@/hooks/useTrainerProfileImageUpload';
import { toast } from 'sonner';

interface TrainerFormData {
  name: string;
  email: string;
  phone: string;
  trainerTier: string;
  category: string;
  experience: number;
  certifications: string;
  specializations: string[];
  location: string;
  bio: string;
  hourlyRate: number;
  profileImage?: File;
}

export const useTrainerRegistration = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { uploadTrainerProfileImage } = useTrainerProfileImageUpload();

  const validateFormData = (formData: TrainerFormData): string[] => {
    console.log('Validating trainer form data:', formData);
    const errors: string[] = [];
    
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.trainerTier) errors.push('Trainer tier is required');
    if (!formData.category) errors.push('Category is required');
    if (!formData.experience || formData.experience < 0) errors.push('Experience must be a positive number');
    if (!formData.location.trim()) errors.push('Location is required');
    if (!formData.bio.trim()) errors.push('Bio is required');
    if (!formData.hourlyRate || formData.hourlyRate <= 0) errors.push('Hourly rate must be a positive number');
    
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
    
    // Bio length validation
    if (formData.bio && formData.bio.length < 10) {
      errors.push('Bio must be at least 10 characters long');
    }
    
    console.log('Trainer validation errors:', errors);
    return errors;
  };

  const registerTrainer = async (formData: TrainerFormData) => {
    console.log('Starting trainer registration process...');
    console.log('Trainer form data received:', {
      ...formData,
      profileImage: formData.profileImage ? 'File provided' : 'No file'
    });

    if (!user) {
      console.error('User not authenticated');
      toast.error('You must be logged in to register as a trainer');
      return false;
    }

    // Validate form data
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      console.error('Trainer form validation failed:', validationErrors);
      validationErrors.forEach(error => toast.error(error));
      return false;
    }

    setLoading(true);
    
    try {
      // Check if trainer profile already exists
      console.log('Checking for existing trainer profile...');
      const { data: existingProfile } = await supabase
        .from('trainer_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (existingProfile) {
        console.error('Trainer profile already exists for user');
        toast.error('You already have a trainer profile. Please contact support if you need to update it.');
        setLoading(false);
        return false;
      }

      // Upload profile image if provided
      let profileImageUrl: string | null = null;
      if (formData.profileImage) {
        console.log('Uploading trainer profile image...');
        profileImageUrl = await uploadTrainerProfileImage(formData.profileImage);
        if (!profileImageUrl) {
          console.error('Profile image upload failed');
          toast.error('Failed to upload profile image. Please try again.');
          setLoading(false);
          return false;
        }
        console.log('Profile image uploaded successfully:', profileImageUrl);
      }

      // Insert trainer profile
      console.log('Inserting trainer profile to database...');
      const trainerData = {
        user_id: user.id,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        trainer_tier: formData.trainerTier,
        category: formData.category,
        experience: formData.experience,
        certifications: formData.certifications.trim(),
        specializations: formData.specializations,
        location: formData.location.trim(),
        bio: formData.bio.trim(),
        hourly_rate: formData.hourlyRate,
        profile_image_url: profileImageUrl,
        status: 'approved' // Auto-approve for immediate listing
      };

      console.log('Trainer data to insert:', trainerData);

      const { error } = await supabase
        .from('trainer_profiles')
        .insert(trainerData);

      if (error) {
        console.error('Database insert error:', error);
        throw error;
      }

      console.log('Trainer profile inserted successfully');
      console.log('Trainer registration completed successfully');
      toast.success('Trainer profile registered successfully! Your listing is now live.');
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error('Error registering trainer:', error);
      if (error.code === '23505') {
        toast.error('A trainer profile with this email already exists.');
      } else if (error.message?.includes('trainer_tier_check')) {
        toast.error('Invalid trainer tier selected. Please choose from: basic, premium, luxury.');
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
