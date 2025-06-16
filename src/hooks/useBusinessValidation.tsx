
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

export const useBusinessValidation = () => {
  const validateFormData = (formData: BusinessFormData): string[] => {
    console.log('Validating form data:', formData);
    const errors: string[] = [];
    
    // Required field validation
    if (!formData.businessName?.trim()) errors.push('Business name is required');
    if (!formData.businessType) errors.push('Business type is required');
    if (!formData.category) errors.push('Business tier is required');
    if (!formData.email?.trim()) errors.push('Email is required');
    if (!formData.phone?.trim()) errors.push('Phone number is required');
    if (!formData.address?.trim()) errors.push('Address is required');
    if (!formData.city?.trim()) errors.push('City is required');
    if (!formData.state?.trim()) errors.push('State is required');
    if (!formData.pinCode?.trim()) errors.push('PIN code is required');
    if (!formData.openingTime) errors.push('Opening time is required');
    if (!formData.closingTime) errors.push('Closing time is required');
    if (!formData.description?.trim()) errors.push('Description is required');
    
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
    if (!formData.images || formData.images.length < 1) {
      errors.push('Please upload at least 1 business image');
    }
    
    console.log('Validation errors:', errors);
    return errors;
  };

  const showValidationErrors = (errors: string[]) => {
    errors.forEach(error => toast.error(error));
  };

  return {
    validateFormData,
    showValidationErrors
  };
};
