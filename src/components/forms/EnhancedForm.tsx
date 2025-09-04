import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { announceToScreenReader } from '@/components/accessibility/AccessibilityEnhancer';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'url';
  required?: boolean;
  placeholder?: string;
  validation?: (value: string) => string | null;
  'aria-describedby'?: string;
}

interface EnhancedFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
  success?: string;
  error?: string;
  className?: string;
}

const EnhancedForm: React.FC<EnhancedFormProps> = ({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  loading = false,
  success,
  error,
  className = ''
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Initialize form data
  useEffect(() => {
    const initialData: Record<string, string> = {};
    fields.forEach(field => {
      initialData[field.name] = '';
    });
    setFormData(initialData);
  }, [fields]);

  // Announce status changes to screen readers
  useEffect(() => {
    if (success) {
      announceToScreenReader(success, 'assertive');
    }
    if (error) {
      announceToScreenReader(`Form error: ${error}`, 'assertive');
    }
  }, [success, error]);

  const validateField = (field: FormField, value: string): string | null => {
    if (field.required && !value.trim()) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      return field.validation(value);
    }

    // Built-in validations
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
      if (!phoneRegex.test(value)) {
        return 'Please enter a valid phone number';
      }
    }

    if (field.type === 'url' && value) {
      try {
        new URL(value);
      } catch {
        return 'Please enter a valid URL';
      }
    }

    return null;
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    if (touched[fieldName]) {
      const field = fields.find(f => f.name === fieldName);
      if (field) {
        const error = validateField(field, value);
        setFieldErrors(prev => ({ ...prev, [fieldName]: error || '' }));
      }
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    const field = fields.find(f => f.name === fieldName);
    if (field) {
      const error = validateField(field, formData[fieldName] || '');
      setFieldErrors(prev => ({ ...prev, [fieldName]: error || '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const errors: Record<string, string> = {};
    fields.forEach(field => {
      const error = validateField(field, formData[field.name] || '');
      if (error) {
        errors[field.name] = error;
      }
    });

    setFieldErrors(errors);
    setTouched(fields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {}));

    if (Object.keys(errors).length === 0) {
      try {
        await onSubmit(formData);
      } catch (err) {
        console.error('Form submission error:', err);
        announceToScreenReader('Form submission failed. Please try again.', 'assertive');
      }
    } else {
      // Focus on first error field
      const firstErrorField = fields.find(field => errors[field.name]);
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField.name);
        if (element) {
          element.focus();
          announceToScreenReader(`Form has errors. ${Object.keys(errors).length} fields need attention.`, 'assertive');
        }
      }
    }
  };

  const hasErrors = Object.values(fieldErrors).some(error => error);

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`} noValidate>
      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="border-red-200 bg-red-50" role="alert">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {fields.map(field => {
        const fieldError = fieldErrors[field.name];
        const hasFieldError = touched[field.name] && fieldError;
        
        return (
          <div key={field.name} className="space-y-2">
            <Label 
              htmlFor={field.name}
              className={hasFieldError ? 'text-red-600' : ''}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
            </Label>
            
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
              placeholder={field.placeholder}
              className={`${
                hasFieldError 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-primary focus:ring-primary'
              } transition-colors`}
              aria-invalid={hasFieldError ? 'true' : 'false'}
              aria-describedby={hasFieldError ? `${field.name}-error` : field['aria-describedby']}
              required={field.required}
            />
            
            {hasFieldError && (
              <div 
                id={`${field.name}-error`}
                className="text-sm text-red-600 flex items-center gap-1"
                role="alert"
                aria-live="polite"
              >
                <AlertCircle className="h-3 w-3 flex-shrink-0" />
                {fieldError}
              </div>
            )}
          </div>
        );
      })}

      <Button
        type="submit"
        disabled={loading || hasErrors}
        className="w-full bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-describedby={hasErrors ? 'form-errors' : undefined}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          submitLabel
        )}
      </Button>

      {hasErrors && (
        <div 
          id="form-errors" 
          className="sr-only" 
          aria-live="polite"
        >
          {Object.keys(fieldErrors).length} form fields have errors. Please review and correct them.
        </div>
      )}
    </form>
  );
};

export default EnhancedForm;