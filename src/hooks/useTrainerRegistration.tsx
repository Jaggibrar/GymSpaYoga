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

  const uploadCertification = async (file: File) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Certification must be PDF or image.');
      return null;
    }
    if (!user) {
      toast.error('Login required for certification upload');
      return null;
    }
    setLoading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${user.id}/certification-${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from('trainer-certifications')
        .upload(fileName, file, { upsert: true });

      if (error) {
        toast.error('Failed to upload certification.');
        return null;
      }
      const { data } = supabase.storage
        .from('trainer-certifications')
        .getPublicUrl(fileName);
      return data.publicUrl;
    } finally {
      setLoading(false);
    }
  };

  const registerTrainer = async (formData: any) => {
    if (!user) {
      toast.error("You must be logged in to register as a trainer");
      return false;
    }
    // strict validation
    const validationErrors = [];
    if (!formData.name) validationErrors.push('Name is required');
    if (!formData.category) validationErrors.push('Expertise is required');
    if (!formData.phone) validationErrors.push('Phone is required');
    if (!formData.email) validationErrors.push('Email is required');
    if (!formData.city) validationErrors.push('City is required');
    if (!formData.profileImage) validationErrors.push('Profile image required');
    if (!formData.certificationFile) validationErrors.push('Certification required');
    if (validationErrors.length > 0) {
      validationErrors.forEach(e => toast.error(e));
      return false;
    }

    setLoading(true);

    try {
      // upload files
      let profileImageUrl = null;
      if (formData.profileImage) {
        profileImageUrl = await uploadTrainerProfileImage(formData.profileImage);
        if (!profileImageUrl) {
          setLoading(false); return false;
        }
      }
      let certificationUrl = null;
      if (formData.certificationFile) {
        certificationUrl = await uploadCertification(formData.certificationFile);
        if (!certificationUrl) {
          setLoading(false); return false;
        }
      }

      // Insert row in DB with status "pending"
      const { error } = await supabase.from('trainer_profiles').insert([{
        user_id: user.id,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        trainer_tier: formData.trainerTier || "basic",
        city: formData.city.trim(),
        location: formData.location?.trim?.() ?? "",
        category: formData.category,
        experience: formData.experience,
        certifications: formData.certifications?.trim() ?? "",
        specializations: formData.specializations,
        bio: formData.bio.trim(),
        hourly_rate: formData.hourlyRate,
        profile_image_url: profileImageUrl,
        certification_url: certificationUrl,
        status: "pending"
      }]);
      if (error) {
        toast.error("Registration failed: " + error.message);
        setLoading(false);
        return false;
      }
      toast.success("Registration complete! Your listing will appear after verification.");
      setLoading(false);
      return true;
    } catch (error: any) {
      toast.error("Error: " + error.message);
      setLoading(false);
      return false;
    }
  };

  return { registerTrainer, loading };
};
