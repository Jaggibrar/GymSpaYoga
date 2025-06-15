
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from 'sonner';

interface BusinessFormData {
  businessName: string;
  businessType: string;
  category: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  openingTime: string;
  closingTime: string;
  monthlyPrice: string;
  sessionPrice: string;
  description: string;
  amenities: string[];
  images: File[];
}

export const useBusinessRegistration = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { uploadMultipleImages } = useImageUpload();

  const validateFormData = (formData: BusinessFormData): string[] => {
    const errors: string[] = [];
    
    if (!formData.businessName.trim()) errors.push('Business name is required');
    if (!formData.businessType) errors.push('Business type is required');
    if (!formData.category) errors.push('Category is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.address.trim()) errors.push('Address is required');
    if (!formData.city.trim()) errors.push('City is required');
    if (!formData.state.trim()) errors.push('State is required');
    if (!formData.pinCode.trim()) errors.push('PIN code is required');
    if (!formData.openingTime) errors.push('Opening time is required');
    if (!formData.closingTime) errors.push('Closing time is required');
    if (!formData.description.trim()) errors.push('Description is required');
    
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
    
    // PIN code validation
    const pinRegex = /^\d{6}$/;
    if (formData.pinCode && !pinRegex.test(formData.pinCode)) {
      errors.push('PIN code must be exactly 6 digits');
    }
    
    // Time validation
    if (formData.openingTime && formData.closingTime) {
      const opening = new Date(`2000-01-01T${formData.openingTime}`);
      const closing = new Date(`2000-01-01T${formData.closingTime}`);
      if (opening >= closing) {
        errors.push('Opening time must be before closing time');
      }
    }
    
    // Price validation
    if (formData.monthlyPrice && (isNaN(parseInt(formData.monthlyPrice)) || parseInt(formData.monthlyPrice) <= 0)) {
      errors.push('Monthly price must be a valid positive number');
    }
    
    if (formData.sessionPrice && (isNaN(parseInt(formData.sessionPrice)) || parseInt(formData.sessionPrice) <= 0)) {
      errors.push('Session price must be a valid positive number');
    }
    
    // Image validation
    if (formData.images.length < 1) {
      errors.push('Please upload at least 1 business image');
    }
    
    return errors;
  };

  const registerBusiness = async (formData: BusinessFormData) => {
    if (!user) {
      toast.error('You must be logged in to register a business');
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
      // Check if business profile already exists
      const { data: existingProfile } = await supabase
        .from('business_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (existingProfile) {
        toast.error('You already have a business profile. Please contact support if you need to update it.');
        setLoading(false);
        return false;
      }

      // Upload business images
      const imageUrls = await uploadMultipleImages(formData.images, 'business');
      if (imageUrls.length === 0 && formData.images.length > 0) {
        toast.error('Failed to upload images. Please try again.');
        setLoading(false);
        return false;
      }

      // Insert business profile
      const { error } = await supabase
        .from('business_profiles')
        .insert({
          user_id: user.id,
          business_name: formData.businessName.trim(),
          business_type: formData.businessType,
          category: formData.category,
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pin_code: formData.pinCode.trim(),
          opening_time: formData.openingTime,
          closing_time: formData.closingTime,
          monthly_price: formData.monthlyPrice ? parseInt(formData.monthlyPrice) : null,
          session_price: formData.sessionPrice ? parseInt(formData.sessionPrice) : null,
          description: formData.description.trim(),
          amenities: formData.amenities,
          image_urls: imageUrls,
          status: 'approved' // Auto-approve for now, can be changed to 'pending' for manual approval
        });

      if (error) {
        throw error;
      }

      // Update user profile role to business_owner
      await supabase
        .from('user_profiles')
        .update({ role: 'business_owner' })
        .eq('user_id', user.id);

      toast.success('Business registered successfully! Your listing is now live.');
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error('Error registering business:', error);
      if (error.code === '23505') {
        toast.error('A business profile with this email already exists.');
      } else {
        toast.error(error.message || 'Failed to register business. Please try again.');
      }
      setLoading(false);
      return false;
    }
  };

  return {
    registerBusiness,
    loading
  };
};
