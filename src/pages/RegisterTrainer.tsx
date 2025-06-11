
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Star, Heart, Dumbbell, Waves, ArrowLeft, Upload, CheckCircle, Crown, Zap, Shield, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useTrainerRegistration } from "@/hooks/useTrainerRegistration";
import { useAuth } from "@/hooks/useAuth";

const RegisterTrainer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { registerTrainer, loading } = useTrainerRegistration();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    trainerTier: "",
    experience: "",
    certifications: "",
    specializations: [] as string[],
    hourlyRate: "",
    location: "",
    bio: "",
    profileImage: null as File | null
  });

  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  const categories = [
    { value: "gym", label: "Gym Trainer", icon: Dumbbell, color: "from-red-500 to-orange-500" },
    { value: "spa", label: "Spa Therapist", icon: Waves, color: "from-blue-500 to-cyan-500" },
    { value: "yoga", label: "Yoga Instructor", icon: Heart, color: "from-purple-500 to-pink-500" }
  ];

  const trainerTiers = [
    { 
      value: "elite", 
      label: "Elite", 
      price: "₹4,999", 
      color: "from-purple-600 to-purple-700",
      icon: Crown,
      features: ["Premium Profile Badge", "Priority Listings", "Marketing Support", "24/7 Support"]
    },
    { 
      value: "pro", 
      label: "Pro", 
      price: "₹3,999", 
      color: "from-blue-600 to-blue-700",
      icon: Award,
      features: ["Pro Profile Badge", "Featured Listings", "Basic Marketing", "Email Support"]
    },
    { 
      value: "intermediate", 
      label: "Intermediate", 
      price: "₹2,999", 
      color: "from-emerald-600 to-emerald-700",
      icon: Zap,
      features: ["Standard Profile", "Regular Listings", "Community Support"]
    },
    { 
      value: "basic", 
      label: "Basic", 
      price: "₹1,700", 
      color: "from-orange-600 to-orange-700",
      icon: Shield,
      features: ["Basic Profile", "Standard Listings", "Email Support"]
    }
  ];

  const specializations = {
    gym: ["Weight Training", "Cardio", "Strength Training", "CrossFit", "Bodybuilding", "HIIT"],
    spa: ["Swedish Massage", "Deep Tissue", "Aromatherapy", "Hot Stone", "Reflexology", "Facial"],
    yoga: ["Hatha Yoga", "Vinyasa", "Ashtanga", "Yin Yoga", "Power Yoga", "Meditation"]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.category || 
        !formData.trainerTier || !formData.experience || !formData.hourlyRate || 
        !formData.location || !formData.bio) {
      alert("Please fill in all required fields");
      return;
    }

    const success = await registerTrainer(formData);
    if (success) {
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
        trainerTier: "",
        experience: "",
        certifications: "",
        specializations: [],
        hourlyRate: "",
        location: "",
        bio: "",
        profileImage: null
      });
      navigate('/');
    }
  };

  const handleSpecializationChange = (specialization: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specializations: checked 
        ? [...prev.specializations, specialization]
        : prev.specializations.filter(s => s !== specialization)
    }));
  };

  const getSelectedTierDetails = () => {
    return trainerTiers.find(tier => tier.value === formData.trainerTier);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, profileImage: file }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Back to Home</span>
            </Link>
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Dumbbell className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Join Our Elite 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Trainer Network</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your passion into profit. Connect with thousands of clients and build your fitness empire with our premium platform.
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Active Trainers</div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-gray-600 font-medium">Students Trained</div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold text-emerald-600 mb-2">₹50K+</div>
                <div className="text-gray-600 font-medium">Avg Monthly Earnings</div>
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 px-12 py-10">
              <CardTitle className="text-3xl font-bold text-center text-gray-900">
                Trainer Registration
              </CardTitle>
              <p className="text-center text-gray-600 text-lg mt-2">Choose your tier and complete your profile</p>
            </CardHeader>
            
            <CardContent className="px-12 py-10">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-lg font-medium text-gray-700">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-lg font-medium text-gray-700">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Category & Tier Selection */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                    Expertise & Tier
                  </h3>
                  
                  {/* Category Selection */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium text-gray-700">Choose Your Category *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {categories.map((cat) => (
                        <div 
                          key={cat.value}
                          className={`p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-lg ${
                            formData.category === cat.value 
                              ? 'border-blue-500 bg-blue-50 shadow-md' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                        >
                          <div className={`w-16 h-16 bg-gradient-to-r ${cat.color} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                            <cat.icon className="h-8 w-8 text-white" />
                          </div>
                          <h4 className="font-bold text-lg text-center text-gray-800">{cat.label}</h4>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tier Selection */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium text-gray-700">Select Your Tier *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {trainerTiers.map((tier) => (
                        <div 
                          key={tier.value}
                          className={`p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-lg ${
                            formData.trainerTier === tier.value 
                              ? 'border-blue-500 bg-blue-50 shadow-md' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, trainerTier: tier.value }))}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${tier.color} rounded-xl flex items-center justify-center`}>
                              <tier.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-800">{tier.price}</div>
                              <div className="text-sm text-gray-500">One-time</div>
                            </div>
                          </div>
                          <h4 className="font-bold text-xl mb-3 text-gray-800">{tier.label}</h4>
                          <ul className="space-y-1">
                            {tier.features.map((feature, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Professional Details */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                    Professional Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-lg font-medium text-gray-700">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                        className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="experience" className="text-lg font-medium text-gray-700">Years of Experience *</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={formData.experience}
                        onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                        required
                        className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        placeholder="5"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="hourlyRate" className="text-lg font-medium text-gray-700">Hourly Rate (₹) *</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                        required
                        className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        placeholder="1500"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="location" className="text-lg font-medium text-gray-700">Location *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Mumbai, Maharashtra"
                        required
                        className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio & Certifications */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="bio" className="text-lg font-medium text-gray-700">Professional Bio *</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about your experience, training philosophy, and what makes you unique..."
                      required
                      className="min-h-[120px] text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="certifications" className="text-lg font-medium text-gray-700">Certifications</Label>
                    <Textarea
                      id="certifications"
                      value={formData.certifications}
                      onChange={(e) => setFormData(prev => ({ ...prev, certifications: e.target.value }))}
                      placeholder="List your certifications, separated by commas"
                      className="min-h-[100px] text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Specializations */}
                {formData.category && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                      Specializations
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {specializations[formData.category as keyof typeof specializations]?.map((spec) => (
                        <div key={spec} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50">
                          <Checkbox
                            id={spec}
                            checked={formData.specializations.includes(spec)}
                            onCheckedChange={(checked) => handleSpecializationChange(spec, checked as boolean)}
                            className="w-5 h-5"
                          />
                          <Label htmlFor={spec} className="text-lg font-medium cursor-pointer">{spec}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Profile Image Upload */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                    Profile Photo
                  </h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-16 w-16 mx-auto text-gray-400 mb-6" />
                    <p className="text-xl text-gray-600 mb-4">Upload your professional photo</p>
                    <p className="text-gray-500 mb-6">JPG, PNG up to 5MB</p>
                    <Input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="max-w-xs mx-auto text-lg"
                    />
                  </div>
                </div>

                {/* Pricing Summary */}
                {formData.trainerTier && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200">
                    <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <Star className="h-7 w-7 mr-3 text-blue-600" />
                      Registration Summary
                    </h4>
                    <div className={`bg-gradient-to-r ${getSelectedTierDetails()?.color} text-white p-6 rounded-xl`}>
                      <div className="text-center">
                        <div className="text-2xl font-semibold mb-2">{getSelectedTierDetails()?.label} Tier</div>
                        <div className="text-4xl font-bold mb-2">{getSelectedTierDetails()?.price}</div>
                        <div className="text-blue-100">One-time registration fee</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="text-center pt-8">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl px-16 py-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    {loading ? "Registering..." : "Complete Registration"}
                  </Button>
                  <p className="text-gray-500 mt-4 text-lg">Secure payment • SSL encrypted</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterTrainer;
