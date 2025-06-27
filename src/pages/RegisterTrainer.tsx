
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrainerCategorySelector } from '@/components/registration/TrainerCategorySelector';
import { TrainerSpecializationsSelector } from '@/components/registration/TrainerSpecializationsSelector';
import { TrainerProfileImageUpload } from '@/components/registration/TrainerProfileImageUpload';
import { useTrainerRegistration } from '@/hooks/useTrainerRegistration';
import { useAuth } from '@/hooks/useAuth';
import { Heart, Dumbbell, Waves } from 'lucide-react';
import { toast } from 'sonner';
import SEOHead from '@/components/SEOHead';

const RegisterTrainer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { registerTrainer, loading } = useTrainerRegistration();

  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    phone: '',
    location: '',
    category: '',
    trainer_tier: 'certified',
    bio: '',
    experience: 1,
    hourly_rate: 500,
    specializations: [] as string[],
    certifications: '',
    profile_image: null as File | null
  });

  const categories = [
    { value: 'fitness', label: 'Fitness Trainer', icon: Dumbbell, color: 'from-orange-400 to-red-500' },
    { value: 'yoga', label: 'Yoga Instructor', icon: Heart, color: 'from-purple-400 to-pink-500' },
    { value: 'wellness', label: 'Wellness Coach', icon: Waves, color: 'from-blue-400 to-teal-500' }
  ];

  const specializations = {
    fitness: ['Weight Training', 'Cardio', 'HIIT', 'CrossFit', 'Bodybuilding', 'Functional Training'],
    yoga: ['Hatha Yoga', 'Vinyasa', 'Ashtanga', 'Yin Yoga', 'Power Yoga', 'Restorative Yoga'],
    wellness: ['Nutrition Coaching', 'Meditation', 'Stress Management', 'Life Coaching', 'Mindfulness', 'Breathing Techniques']
  };

  const tiers = [
    { value: 'certified', label: 'Certified Trainer', rate: 500 },
    { value: 'expert', label: 'Expert Trainer', rate: 1000 },
    { value: 'elite', label: 'Elite Trainer', rate: 2000 }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category: string) => {
    setFormData(prev => ({ 
      ...prev, 
      category,
      specializations: [] // Reset specializations when category changes
    }));
  };

  const handleSpecializationChange = (specialization: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specializations: checked 
        ? [...prev.specializations, specialization]
        : prev.specializations.filter(s => s !== specialization)
    }));
  };

  const handleTierChange = (tier: string) => {
    const selectedTier = tiers.find(t => t.value === tier);
    setFormData(prev => ({
      ...prev,
      trainer_tier: tier,
      hourly_rate: selectedTier?.rate || 500
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, profile_image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to register as a trainer');
      navigate('/login');
      return;
    }

    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }

    if (formData.specializations.length === 0) {
      toast.error('Please select at least one specialization');
      return;
    }

    const success = await registerTrainer(formData);
    if (success) {
      navigate('/trainers');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">Please login to register as a trainer</p>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Register as Trainer - GymSpaYoga"
        description="Join our platform as a professional trainer and start building your client base"
        keywords="trainer registration, fitness coach, yoga instructor"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl">
              <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-3xl font-bold">Become a Professional Trainer</CardTitle>
                <p className="text-lg opacity-90">Join our platform and start building your client base</p>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-lg font-medium text-gray-700">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-lg font-medium text-gray-700">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-lg font-medium text-gray-700">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location" className="text-lg font-medium text-gray-700">Location *</Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                          placeholder="City, State"
                          className="text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Profile Image Upload */}
                  <TrainerProfileImageUpload onFileChange={handleFileChange} />

                  {/* Category Selection */}
                  <TrainerCategorySelector
                    categories={categories}
                    selectedCategory={formData.category}
                    onCategorySelect={handleCategorySelect}
                  />

                  {/* Specializations */}
                  <TrainerSpecializationsSelector
                    category={formData.category}
                    specializations={specializations}
                    selectedSpecializations={formData.specializations}
                    onSpecializationChange={handleSpecializationChange}
                  />

                  {/* Professional Details */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                      Professional Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="experience" className="text-lg font-medium text-gray-700">Experience (Years) *</Label>
                        <Input
                          id="experience"
                          name="experience"
                          type="number"
                          min="1"
                          value={formData.experience}
                          onChange={handleInputChange}
                          required
                          className="text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <Label className="text-lg font-medium text-gray-700">Trainer Tier *</Label>
                        <Select value={formData.trainer_tier} onValueChange={handleTierChange}>
                          <SelectTrigger className="text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors">
                            <SelectValue placeholder="Select your tier" />
                          </SelectTrigger>
                          <SelectContent>
                            {tiers.map(tier => (
                              <SelectItem key={tier.value} value={tier.value}>
                                {tier.label} (₹{tier.rate}/session)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="hourly_rate" className="text-lg font-medium text-gray-700">Hourly Rate (₹) *</Label>
                      <Input
                        id="hourly_rate"
                        name="hourly_rate"
                        type="number"
                        min="100"
                        value={formData.hourly_rate}
                        onChange={handleInputChange}
                        required
                        className="text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Bio and Certifications */}
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="bio" className="text-lg font-medium text-gray-700">Professional Bio *</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        required
                        placeholder="Tell potential clients about your experience, training philosophy, and what makes you unique..."
                        className="min-h-[120px] text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <Label htmlFor="certifications" className="text-lg font-medium text-gray-700">Certifications</Label>
                      <Textarea
                        id="certifications"
                        name="certifications"
                        value={formData.certifications}
                        onChange={handleInputChange}
                        placeholder="List your certifications, separated by commas"
                        className="min-h-[100px] text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-6">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {loading ? 'Registering...' : 'Complete Registration'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterTrainer;
