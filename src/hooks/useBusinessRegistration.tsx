
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useBusinessImageUpload } from '@/hooks/useBusinessImageUpload';
import { useBusinessValidation } from '@/hooks/useBusinessValidation';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

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
  const { uploadMultipleImages } = useBusinessImageUpload();
  const { validateFormData, showValidationErrors } = useBusinessValidation();
  const navigate = useNavigate();

  const registerBusiness = async (formData: BusinessFormData) => {
    console.log('Starting business registration process...');
    
    if (!user) {
      console.error('User not authenticated');
      toast.error('You must be logged in to register a business');
      return false;
    }

    // Validate form data
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      console.error('Form validation failed:', validationErrors);
      showValidationErrors(validationErrors);
      return false;
    }

    setLoading(true);
    
    try {
      // Check if business profile already exists
      console.log('Checking for existing business profile...');
      const { data: existingProfile, error: checkError } = await supabase
        .from('business_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing profile:', checkError);
        throw checkError;
      }

      if (existingProfile) {
        console.error('Business profile already exists for user');
        toast.error('You already have a business profile registered.');
        return false;
      }

      // Upload business images
      console.log('Starting image upload process...');
      const imageUrls = await uploadMultipleImages(formData.images);
      console.log(`Successfully uploaded ${imageUrls.length} images`);

      // Insert business profile (status handled by trigger)
      console.log('Inserting business profile to database...');
      const businessData = {
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
        amenities: formData.amenities || [],
        image_urls: imageUrls
      };

      const { error } = await supabase
        .from('business_profiles')
        .insert(businessData);

      if (error) {
        console.error('Database insert error:', error);
        throw error;
      }

      console.log('Business profile inserted successfully');

      // Update user profile role to business_owner
      console.log('Updating user role to business_owner...');
      const { error: roleError } = await supabase
        .from('user_profiles')
        .upsert({ 
          user_id: user.id, 
          role: 'business_owner',
          full_name: user.user_metadata?.full_name || formData.businessName
        });

      if (roleError) {
        console.error('Role update error:', roleError);
        // Don't fail the registration for this
      }

      console.log('Business registration completed successfully');
      toast.success('🎉 Business registered successfully! Redirecting to explore page...');
      
      // Navigate to explore page
      setTimeout(() => {
        navigate('/explore', { replace: true });
      }, 1500);
      
      return true;
    } catch (error: any) {
      console.error('Error registering business:', error);
      if (error.code === '23505') {
        toast.error('A business with this information already exists.');
      } else {
        toast.error(error.message || 'Failed to register business. Please try again.');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerBusiness,
    loading
  };
};
