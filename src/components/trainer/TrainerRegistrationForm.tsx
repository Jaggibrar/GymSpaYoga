
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, Upload } from 'lucide-react';
import { useTrainerRegistration } from '@/hooks/useTrainerRegistration';
import { useTrainerValidation } from '@/hooks/useTrainerValidation';

interface TrainerRegistrationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const TrainerRegistrationForm: React.FC<TrainerRegistrationFormProps> = ({ 
  onSuccess, 
  onCancel 
}) => {
  const { registerTrainer, loading } = useTrainerRegistration();
  const { validateForm, getFieldError, clearValidationError } = useTrainerValidation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    category: 'fitness',
    trainer_tier: 'standard',
    bio: '',
    experience: 1,
    hourly_rate: 500,
    specializations: [] as string[],
    certifications: '',
    profile_image: null as File | null
  });
  
  const [currentSpecialization, setCurrentSpecialization] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories = [
    { value: 'fitness', label: 'Fitness Training' },
    { value: 'yoga', label: 'Yoga Instruction' },
    { value: 'pilates', label: 'Pilates' },
    { value: 'crossfit', label: 'CrossFit' },
    { value: 'martial_arts', label: 'Martial Arts' },
    { value: 'dance', label: 'Dance' },
    { value: 'swimming', label: 'Swimming' },
    { value: 'nutrition', label: 'Nutrition Coaching' }
  ];

  const tiers = [
    { value: 'standard', label: 'Standard Trainer' },
    { value: 'premium', label: 'Premium Trainer' },
    { value: 'elite', label: 'Elite Trainer' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    clearValidationError(field);
  };

  const handleAddSpecialization = () => {
    if (currentSpecialization.trim() && !formData.specializations.includes(currentSpecialization.trim())) {
      setFormData(prev => ({
        ...prev,
        specializations: [...prev.specializations, currentSpecialization.trim()]
      }));
      setCurrentSpecialization('');
    }
  };

  const handleRemoveSpecialization = (specializationToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.filter(spec => spec !== specializationToRemove)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Storage bucket limit is 2MB
      if (file.size > 2 * 1024 * 1024) {
        alert('Image file size must be less than 2MB');
        return;
      }
      setFormData(prev => ({ ...prev, profile_image: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      return;
    }

    const success = await registerTrainer(formData);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <Card className="max-w-4xl mx-auto bg-white border border-border shadow-medium">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-2xl font-bold text-foreground">
          Register as a Trainer
        </CardTitle>
        <p className="text-muted-foreground">
          Join our platform and connect with fitness enthusiasts
        </p>
      </CardHeader>
      
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-semibold text-foreground">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className={`mt-1 ${getFieldError('name') ? 'border-destructive' : 'border-input'}`}
                />
                {getFieldError('name') && (
                  <p className="text-destructive text-sm mt-1">{getFieldError('name')}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                  className={`mt-1 ${getFieldError('email') ? 'border-destructive' : 'border-input'}`}
                />
                {getFieldError('email') && (
                  <p className="text-destructive text-sm mt-1">{getFieldError('email')}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-semibold text-foreground">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 9876543210"
                  required
                  className={`mt-1 ${getFieldError('phone') ? 'border-destructive' : 'border-input'}`}
                />
                {getFieldError('phone') && (
                  <p className="text-destructive text-sm mt-1">{getFieldError('phone')}</p>
                )}
              </div>

              <div>
                <Label htmlFor="location" className="text-sm font-semibold text-foreground">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, State"
                  required
                  className={`mt-1 ${getFieldError('location') ? 'border-destructive' : 'border-input'}`}
                />
                {getFieldError('location') && (
                  <p className="text-destructive text-sm mt-1">{getFieldError('location')}</p>
                )}
              </div>

              <div>
                <Label htmlFor="category" className="text-sm font-semibold text-foreground">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="trainer_tier" className="text-sm font-semibold text-foreground">Trainer Tier</Label>
                <Select value={formData.trainer_tier} onValueChange={(value) => handleInputChange('trainer_tier', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your tier" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiers.map(tier => (
                      <SelectItem key={tier.value} value={tier.value}>
                        {tier.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="experience" className="text-sm font-semibold text-foreground">Experience (Years) *</Label>
                <Input
                  id="experience"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', parseInt(e.target.value) || 1)}
                  className={`mt-1 ${getFieldError('experience') ? 'border-destructive' : 'border-input'}`}
                />
                {getFieldError('experience') && (
                  <p className="text-destructive text-sm mt-1">{getFieldError('experience')}</p>
                )}
              </div>

              <div>
                <Label htmlFor="hourly_rate" className="text-sm font-semibold text-foreground">Hourly Rate (₹) *</Label>
                <Input
                  id="hourly_rate"
                  type="number"
                  min="100"
                  max="10000"
                  value={formData.hourly_rate}
                  onChange={(e) => handleInputChange('hourly_rate', parseInt(e.target.value) || 100)}
                  className={`mt-1 ${getFieldError('hourly_rate') ? 'border-destructive' : 'border-input'}`}
                />
                {getFieldError('hourly_rate') && (
                  <p className="text-destructive text-sm mt-1">{getFieldError('hourly_rate')}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-semibold text-foreground">Specializations *</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={currentSpecialization}
                    onChange={(e) => setCurrentSpecialization(e.target.value)}
                    placeholder="Add a specialization..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSpecialization();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddSpecialization} size="sm" className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.specializations.map(spec => (
                    <Badge key={spec} variant="secondary" className="flex items-center gap-1 bg-muted text-foreground">
                      {spec}
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecialization(spec)}
                        className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                {getFieldError('specializations') && (
                  <p className="text-destructive text-sm mt-1">{getFieldError('specializations')}</p>
                )}
                {formData.specializations.length === 0 && (
                  <p className="text-muted-foreground text-sm mt-1">Add at least one specialization</p>
                )}
              </div>

              <div>
                <Label htmlFor="profile_image" className="text-sm font-semibold text-foreground">Profile Image</Label>
                <div className="mt-1">
                  <input
                    id="profile_image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('profile_image')?.click()}
                    className="w-full border-input hover:bg-muted"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Profile Image
                  </Button>
                  {imagePreview && (
                    <div className="mt-3 flex justify-center">
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-24 h-24 object-cover rounded-full border-2 border-border"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Full width fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="bio" className="text-sm font-semibold text-foreground">Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself, your training philosophy, and what makes you unique... (minimum 50 characters)"
                required
                className={`mt-1 min-h-[120px] ${getFieldError('bio') ? 'border-destructive' : 'border-input'}`}
              />
              {getFieldError('bio') && (
                <p className="text-destructive text-sm mt-1">{getFieldError('bio')}</p>
              )}
              <p className="text-muted-foreground text-sm mt-1">{formData.bio.length}/1000 characters</p>
            </div>

            <div>
              <Label htmlFor="certifications" className="text-sm font-semibold text-foreground">Certifications</Label>
              <Textarea
                id="certifications"
                value={formData.certifications}
                onChange={(e) => handleInputChange('certifications', e.target.value)}
                placeholder="List your certifications, degrees, and qualifications..."
                className="mt-1 min-h-[80px] border-input"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-border">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} className="border-input hover:bg-muted">
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={loading || !formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.location.trim() || !formData.bio.trim() || formData.specializations.length === 0}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Registering...
                </>
              ) : (
                'Complete Registration'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TrainerRegistrationForm;
