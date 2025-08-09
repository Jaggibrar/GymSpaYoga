import { useState } from 'react';
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

export const useTrainerValidation = () => {
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const validateField = (field: string, value: any, formData: TrainerFormData): string | null => {
    switch (field) {
      case 'name':
        if (!value || value.trim().length < 2) {
          return 'Name must be at least 2 characters long';
        }
        if (value.trim().length > 100) {
          return 'Name must be less than 100 characters';
        }
        break;

      case 'email':
        if (!value || !value.trim()) {
          return 'Email is required';
        }
        if (!validateEmail(value)) {
          return 'Please enter a valid email address';
        }
        break;

      case 'phone':
        if (!value || !value.trim()) {
          return 'Phone number is required';
        }
        if (!validatePhone(value)) {
          return 'Please enter a valid Indian phone number';
        }
        break;

      case 'location':
        if (!value || value.trim().length < 3) {
          return 'Location must be at least 3 characters long';
        }
        break;

      case 'category':
        if (!value) {
          return 'Please select a category';
        }
        break;

      case 'bio':
        if (!value || value.trim().length < 50) {
          return 'Bio must be at least 50 characters long';
        }
        if (value.trim().length > 1000) {
          return 'Bio must be less than 1000 characters';
        }
        break;

      case 'experience':
        if (!value || value < 1) {
          return 'Experience must be at least 1 year';
        }
        if (value > 50) {
          return 'Experience cannot exceed 50 years';
        }
        break;

      case 'hourly_rate':
        if (!value || value < 100) {
          return 'Hourly rate must be at least ₹100';
        }
        if (value > 10000) {
          return 'Hourly rate cannot exceed ₹10,000';
        }
        break;

      case 'profile_image':
        if (value) {
          if (value.size > 5 * 1024 * 1024) { // 5MB limit
            return 'Image size must be less than 5MB';
          }
          if (!value.type.startsWith('image/')) {
            return 'Please select a valid image file';
          }
        }
        break;

      default:
        break;
    }
    return null;
  };

  const validateForm = (formData: TrainerFormData): boolean => {
    const errors: { [key: string]: string } = {};
    
    // Validate all fields
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof TrainerFormData], formData);
      if (error) {
        errors[field] = error;
      }
    });

    // Additional validations
    if (formData.specializations.length === 0) {
      errors.specializations = 'Please add at least one specialization';
    }

    setValidationErrors(errors);

    // Show errors if any
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors);
      toast.error(`Please fix the following errors:\n${errorMessages.slice(0, 3).join('\n')}${errorMessages.length > 3 ? `\n...and ${errorMessages.length - 3} more` : ''}`);
      return false;
    }

    return true;
  };

  const clearValidationError = (field: string) => {
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const getFieldError = (field: string): string | undefined => {
    return validationErrors[field];
  };

  return {
    validateForm,
    validateField,
    clearValidationError,
    getFieldError,
    validationErrors
  };
};