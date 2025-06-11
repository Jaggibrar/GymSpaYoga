
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
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

  const uploadBusinessImages = async (files: File[], userId: string): Promise<string[]> => {
    const uploadPromises = files.map(async (file, index) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/business/${Date.now()}_${index}.${fileExt}`;
      
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
    });

    const urls = await Promise.all(uploadPromises);
    return urls.filter(url => url !== null) as string[];
  };

  const registerBusiness = async (formData: BusinessFormData) => {
    if (!user) {
      toast.error('You must be logged in to register a business');
      return false;
    }

    setLoading(true);
    
    try {
      let imageUrls: string[] = [];
      
      // Upload business images if provided
      if (formData.images && formData.images.length > 0) {
        imageUrls = await uploadBusinessImages(formData.images, user.id);
      }

      // Insert business profile
      const { error } = await supabase
        .from('business_profiles')
        .insert({
          user_id: user.id,
          business_name: formData.businessName,
          business_type: formData.businessType,
          category: formData.category,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pin_code: formData.pinCode,
          opening_time: formData.openingTime,
          closing_time: formData.closingTime,
          monthly_price: formData.monthlyPrice ? parseInt(formData.monthlyPrice) : null,
          session_price: formData.sessionPrice ? parseInt(formData.sessionPrice) : null,
          description: formData.description,
          amenities: formData.amenities,
          image_urls: imageUrls,
          status: 'pending'
        });

      if (error) {
        throw error;
      }

      toast.success('Business registration submitted successfully! We will review your application and get back to you soon.');
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error('Error registering business:', error);
      toast.error(error.message || 'Failed to register business');
      setLoading(false);
      return false;
    }
  };

  return {
    registerBusiness,
    loading
  };
};
