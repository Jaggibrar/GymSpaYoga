
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
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      
      // First, ensure the bucket exists
      const { data: buckets } = await supabase.storage.listBuckets();
      const profileBucket = buckets?.find(bucket => bucket.name === 'profile-images');
      
      if (!profileBucket) {
        // Create the bucket if it doesn't exist
        const { error: bucketError } = await supabase.storage.createBucket('profile-images', {
          public: true,
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
        });
        
        if (bucketError) {
          console.error('Error creating bucket:', bucketError);
          toast.error('Failed to set up image storage. Please try again.');
          return null;
        }
      }
      
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        toast.error('Failed to upload profile image. Please try again.');
        return null;
      }
      
      const { data } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image. Please try again.');
      return null;
    }
  };

  const validateFormData = (formData: TrainerFormData): string[] => {
    const errors: string[] = [];
    
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.category) errors.push('Category is required');
    if (!formData.trainerTier) errors.push('Trainer tier is required');
    if (!formData.experience) errors.push('Experience is required');
    if (!formData.hourlyRate) errors.push('Hourly rate is required');
    if (!formData.location.trim()) errors.push('Location is required');
    if (!formData.bio.trim()) errors.push('Bio is required');
    
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
      let profileImageUrl = null;
      
      // Upload profile image if provided
      if (formData.profileImage) {
        profileImageUrl = await uploadProfileImage(formData.profileImage, user.id);
        if (!profileImageUrl) {
          setLoading(false);
          return false;
        }
      }

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

      // Insert trainer profile
      const { error } = await supabase
        .from('trainer_profiles')
        .insert({
          user_id: user.id,
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          category: formData.category,
          trainer_tier: formData.trainerTier,
          experience: parseInt(formData.experience),
          certifications: formData.certifications.trim(),
          specializations: formData.specializations,
          hourly_rate: parseInt(formData.hourlyRate),
          location: formData.location.trim(),
          bio: formData.bio.trim(),
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
