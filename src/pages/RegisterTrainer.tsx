import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Upload, User, Award, Clock, MapPin, Phone, Mail, Heart, Star, Dumbbell, Calendar } from 'lucide-react';
import { useTrainerRegistration } from '@/hooks/useTrainerRegistration';
import { TrainerProfileImageUpload } from '@/components/registration/TrainerProfileImageUpload';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import SEOHead from '@/components/SEOHead';

const RegisterTrainer = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });
  const [professionalDetails, setProfessionalDetails] = useState({
    category: '',
    trainerTier: '',
    hourlyRate: '',
    experience: '',
    specializations: [] as string[]
  });
  const [bioData, setBioData] = useState({
    bio: '',
    certifications: ''
  });
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [newSpecialization, setNewSpecialization] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { submitTrainerRegistration } = useTrainerRegistration();

  const addSpecialization = () => {
    const trimmed = newSpecialization.trim();
    if (trimmed && !professionalDetails.specializations.includes(trimmed)) {
      setProfessionalDetails({
        ...professionalDetails,
        specializations: [...professionalDetails.specializations, trimmed]
      });
      setNewSpecialization('');
    }
  };

  const removeSpecialization = (spec: string) => {
    setProfessionalDetails({
      ...professionalDetails,
      specializations: professionalDetails.specializations.filter(s => s !== spec)
    });
  };

  const validateForm = () => {
    if (!personalInfo.name.trim()) {
      alert('Please enter your full name.');
      return false;
    }
    if (!personalInfo.email.trim()) {
      alert('Please enter your email address.');
      return false;
    }
    if (!personalInfo.phone.trim()) {
      alert('Please enter your phone number.');
      return false;
    }
    if (!personalInfo.location.trim()) {
      alert('Please enter your location.');
      return false;
    }
    if (!professionalDetails.category) {
      alert('Please select your category.');
      return false;
    }
    if (!professionalDetails.trainerTier) {
      alert('Please select your experience level.');
      return false;
    }
    if (!professionalDetails.hourlyRate || isNaN(Number(professionalDetails.hourlyRate))) {
      alert('Please enter a valid hourly rate.');
      return false;
    }
    if (!professionalDetails.experience || isNaN(Number(professionalDetails.experience))) {
      alert('Please enter your years of experience.');
      return false;
    }
    if (!bioData.bio.trim()) {
      alert('Please enter your professional bio.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = {
        name: personalInfo.name,
        email: personalInfo.email,
        phone: personalInfo.phone,
        category: professionalDetails.category,
        trainer_tier: professionalDetails.trainerTier,
        hourly_rate: parseInt(professionalDetails.hourlyRate),
        specializations: professionalDetails.specializations,
        location: personalInfo.location,
        bio: bioData.bio,
        certifications: bioData.certifications,
        experience: parseInt(professionalDetails.experience),
        profile_image_url: profileImageUrl
      };

      const success = await submitTrainerRegistration(formData);
      
      if (success) {
        setShowSuccessMessage(true);
        // Reset form
        setPersonalInfo({ name: '', email: '', phone: '', location: '' });
        setProfessionalDetails({ 
          category: '', 
          trainerTier: '', 
          hourlyRate: '', 
          experience: '', 
          specializations: [] 
        });
        setBioData({ bio: '', certifications: '' });
        setProfileImageUrl('');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccessMessage) {
    return (
      <>
        <SEOHead 
          title="Trainer Registration Successful - GymSpaYoga"
          description="Thank you for registering as a trainer with GymSpaYoga. Your application is being reviewed."
        />
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
          <AppHeader />
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for registering as a trainer with GymSpaYoga. Your application is being reviewed 
                and you'll be notified once it's approved.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => window.location.href = '/'} className="bg-emerald-600 hover:bg-emerald-700">
                  Go to Homepage
                </Button>
                <Button onClick={() => setShowSuccessMessage(false)} variant="outline">
                  Register Another Trainer
                </Button>
              </div>
            </div>
          </div>
          <AppFooter />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Become a Certified Trainer - Join GymSpaYoga"
        description="Register as a professional trainer with GymSpaYoga. Connect with clients and grow your fitness career with our platform."
        keywords="personal trainer registration, fitness trainer, yoga instructor, gym trainer"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        <AppHeader />
        
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="h-16 w-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Become a Trainer
                </h1>
                <p className="text-xl text-gray-600 mt-2">Join India's fastest-growing wellness platform</p>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <User className="h-6 w-6 text-emerald-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <TrainerProfileImageUpload 
                    onImageUploaded={setProfileImageUrl}
                    currentImageUrl={profileImageUrl}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={personalInfo.name}
                        onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                        placeholder="Enter your full name"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        placeholder="your.email@example.com"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                        placeholder="City, State"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Details */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Award className="h-6 w-6 text-blue-600" />
                    Professional Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={professionalDetails.category} onValueChange={(value) => setProfessionalDetails({...professionalDetails, category: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select your specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gym">Gym Trainer</SelectItem>
                          <SelectItem value="yoga">Yoga Instructor</SelectItem>
                          <SelectItem value="spa">Spa Therapist</SelectItem>
                          <SelectItem value="fitness">Fitness Coach</SelectItem>
                          <SelectItem value="nutrition">Nutrition Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="trainerTier">Experience Level *</Label>
                      <Select value={professionalDetails.trainerTier} onValueChange={(value) => setProfessionalDetails({...professionalDetails, trainerTier: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                          <SelectItem value="expert">Expert (5+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={professionalDetails.experience}
                        onChange={(e) => setProfessionalDetails({...professionalDetails, experience: e.target.value})}
                        placeholder="5"
                        className="mt-1"
                        min="0"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate (₹) *</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={professionalDetails.hourlyRate}
                        onChange={(e) => setProfessionalDetails({...professionalDetails, hourlyRate: e.target.value})}
                        placeholder="1000"
                        className="mt-1"
                        min="100"
                        required
                      />
                    </div>
                  </div>

                  {/* Specializations */}
                  <div>
                    <Label>Specializations</Label>
                    <div className="flex flex-wrap gap-2 mt-2 mb-4">
                      {professionalDetails.specializations.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {spec}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeSpecialization(spec)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newSpecialization}
                        onChange={(e) => setNewSpecialization(e.target.value)}
                        placeholder="Add a specialization"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())}
                      />
                      <Button type="button" onClick={addSpecialization} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bio and Certifications */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Heart className="h-6 w-6 text-purple-600" />
                    Bio & Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="bio">Professional Bio *</Label>
                    <Textarea
                      id="bio"
                      value={bioData.bio}
                      onChange={(e) => setBioData({...bioData, bio: e.target.value})}
                      placeholder="Tell us about your fitness journey, training philosophy, and what makes you unique..."
                      className="mt-1 min-h-[120px]"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="certifications">Certifications & Qualifications</Label>
                    <Textarea
                      id="certifications"
                      value={bioData.certifications}
                      onChange={(e) => setBioData({...bioData, certifications: e.target.value})}
                      placeholder="List your certifications, courses, and qualifications..."
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="text-center">
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 px-12 py-4 text-lg font-semibold"
                >
                  {isSubmitting ? 'Submitting...' : 'Register as Trainer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <AppFooter />
      </div>
    </>
  );
};

export default RegisterTrainer;
