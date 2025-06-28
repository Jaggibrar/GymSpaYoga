
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

interface TrainerRegistrationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const TrainerRegistrationForm: React.FC<TrainerRegistrationFormProps> = ({ 
  onSuccess, 
  onCancel 
}) => {
  const { registerTrainer, loading } = useTrainerRegistration();
  
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
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      return;
    }

    const success = await registerTrainer(formData);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Register as a Trainer
        </CardTitle>
        <p className="text-gray-600">
          Join our platform and connect with fitness enthusiasts looking for expert guidance
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-base font-medium">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-base font-medium">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-base font-medium">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 9876543210"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-base font-medium">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, State"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-base font-medium">Category *</Label>
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
                <Label htmlFor="trainer_tier" className="text-base font-medium">Trainer Tier</Label>
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
                <Label htmlFor="experience" className="text-base font-medium">Experience (Years) *</Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="hourly_rate" className="text-base font-medium">Hourly Rate (₹) *</Label>
                <Input
                  id="hourly_rate"
                  type="number"
                  min="100"
                  value={formData.hourly_rate}
                  onChange={(e) => handleInputChange('hourly_rate', parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-base font-medium">Specializations</Label>
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
                  <Button type="button" onClick={handleAddSpecialization} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.specializations.map(spec => (
                    <Badge key={spec} variant="secondary" className="flex items-center gap-1">
                      {spec}
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecialization(spec)}
                        className="ml-1 hover:bg-red-100 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="profile_image" className="text-base font-medium">Profile Image</Label>
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
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Profile Image
                  </Button>
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-24 h-24 object-cover rounded-full mx-auto"
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
              <Label htmlFor="bio" className="text-base font-medium">Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself, your training philosophy, and what makes you unique..."
                required
                className="mt-1 min-h-[120px]"
              />
            </div>

            <div>
              <Label htmlFor="certifications" className="text-base font-medium">Certifications</Label>
              <Textarea
                id="certifications"
                value={formData.certifications}
                onChange={(e) => handleInputChange('certifications', e.target.value)}
                placeholder="List your certifications, degrees, and qualifications..."
                className="mt-1 min-h-[80px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={loading || !formData.name.trim() || !formData.email.trim() || !formData.phone.trim()}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
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
