
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Waves, Heart, UploadCloud, Star, MapPin, Phone, Mail, User, Award, FileText, Camera } from "lucide-react";
import { useTrainerRegistration } from "@/hooks/useTrainerRegistration";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

const RegisterTrainer = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { registerTrainer, loading } = useTrainerRegistration();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    trainerTier: "basic",
    category: "",
    experience: "",
    certifications: "",
    certificationFile: null as File | null,
    certificationUrl: "",
    specializations: [] as string[],
    hourlyRate: "",
    location: "",
    city: "",
    bio: "",
    profileImage: null as File | null
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Show loading spinner only briefly while checking auth
  if (authLoading) {
    return (
      <>
        <AppHeader onLogout={signOut} />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading..." />
        </div>
        <AppFooter />
      </>
    );
  }

  // If no user after auth check, return null (will redirect)
  if (!user) {
    return null;
  }

  const categories = [
    { value: "gym", label: "Gym Trainer", icon: Dumbbell, color: "from-red-500 to-orange-500" },
    { value: "spa", label: "Spa Therapist", icon: Waves, color: "from-blue-500 to-cyan-500" },
    { value: "yoga", label: "Yoga Instructor", icon: Heart, color: "from-purple-500 to-pink-500" }
  ];

  const specializations = {
    gym: ["Weight Training", "Cardio", "Strength Training", "CrossFit", "Bodybuilding", "HIIT"],
    spa: ["Swedish Massage", "Deep Tissue", "Aromatherapy", "Hot Stone", "Reflexology", "Facial"],
    yoga: ["Hatha Yoga", "Vinyasa", "Ashtanga", "Yin Yoga", "Power Yoga", "Meditation"]
  };

  const isFormValid = () => {
    if (!formData.name.trim()) return false;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
    if (!formData.phone.trim() || !/^[+]?[\d\s\-\(\)]{10,}$/.test(formData.phone)) return false;
    if (!formData.category) return false;
    if (formData.experience === "" || parseInt(formData.experience) < 0) return false;
    if (formData.hourlyRate === "" || parseInt(formData.hourlyRate) <= 0) return false;
    if (!formData.location.trim()) return false;
    if (!formData.city.trim()) return false;
    if (!formData.bio.trim() || formData.bio.length < 10) return false;
    if (!formData.profileImage) return false;
    if (!formData.certificationFile) return false;
    return true;
  };

  const handleFileChange = (field: "profileImage" | "certificationFile", file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSpecializationChange = (spec: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specializations: checked
        ? [...prev.specializations, spec]
        : prev.specializations.filter(s => s !== spec)
    }));
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    
    const exp = parseInt(formData.experience);
    const rate = parseInt(formData.hourlyRate);

    setSuccessMessage(null);

    const submissionData = {
      ...formData,
      experience: exp,
      hourlyRate: rate,
    };
    
    const success = await registerTrainer(submissionData);
    if (success) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        trainerTier: "basic",
        category: "",
        experience: "",
        certifications: "",
        certificationFile: null,
        certificationUrl: "",
        specializations: [],
        hourlyRate: "",
        location: "",
        city: "",
        bio: "",
        profileImage: null
      });

      setSuccessMessage(
        "Registration successful! Your listing will appear after admin verification. You will receive an email when your profile is approved. Thank you for registering!"
      );

      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/");
      }, 6000);
    }
  };

  return (
    <>
      <AppHeader onLogout={signOut} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Become a Trainer</h1>
              <p className="text-lg text-gray-600">Join our network of professional wellness experts</p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <Card className="mb-8 border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">Registration Successful!</h3>
                      <p className="text-green-700">{successMessage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Form */}
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">Trainer Registration Form</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-1 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="mt-1 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className="mt-1 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="Enter your city"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Details */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Professional Details
                  </h3>
                  <div className="space-y-6">
                    {/* Category Selection */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">Trainer Category *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {categories.map((cat) => (
                          <div
                            key={cat.value}
                            onClick={() => setFormData(prev => ({ ...prev, category: cat.value, specializations: [] }))}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                              formData.category === cat.value 
                                ? 'border-emerald-500 bg-emerald-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${cat.color} flex items-center justify-center mx-auto mb-3`}>
                              <cat.icon className="h-6 w-6 text-white" />
                            </div>
                            <h4 className="font-semibold text-center text-gray-800">{cat.label}</h4>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Experience and Rate */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="experience" className="text-sm font-medium text-gray-700">Years of Experience *</Label>
                        <Input
                          id="experience"
                          type="number"
                          min="0"
                          value={formData.experience}
                          onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                          className="mt-1 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                          placeholder="Years of experience"
                        />
                      </div>
                      <div>
                        <Label htmlFor="hourlyRate" className="text-sm font-medium text-gray-700">Hourly Rate (₹) *</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          min="1"
                          value={formData.hourlyRate}
                          onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                          className="mt-1 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                          placeholder="Rate per hour"
                        />
                      </div>
                    </div>

                    {/* Specializations */}
                    {formData.category && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Specializations</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {specializations[formData.category as keyof typeof specializations]?.map((spec) => (
                            <div key={spec} className="flex items-center space-x-2">
                              <Checkbox
                                id={spec}
                                checked={formData.specializations.includes(spec)}
                                onCheckedChange={(checked) => handleSpecializationChange(spec, checked as boolean)}
                              />
                              <Label htmlFor={spec} className="text-sm text-gray-700">{spec}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Location and Bio */}
                    <div>
                      <Label htmlFor="location" className="text-sm font-medium text-gray-700">Service Location *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="mt-1 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="Where do you provide services?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-sm font-medium text-gray-700">Professional Bio *</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        className="mt-1 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                        rows={4}
                        placeholder="Tell us about your experience, qualifications, and training philosophy (minimum 10 characters)"
                      />
                      <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/10 minimum characters</p>
                    </div>
                  </div>
                </div>

                {/* File Uploads */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents & Photos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Image */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">Profile Image *</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors">
                        <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Upload your professional photo</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange('profileImage', e.target.files?.[0] || null)}
                          className="hidden"
                          id="profileImage"
                        />
                        <Label htmlFor="profileImage" className="cursor-pointer text-emerald-600 hover:text-emerald-700 font-medium">
                          Choose File
                        </Label>
                        {formData.profileImage && (
                          <p className="text-xs text-green-600 mt-2">✓ {formData.profileImage.name}</p>
                        )}
                      </div>
                    </div>

                    {/* Certification */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">Certification Document *</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors">
                        <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Upload your certification</p>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange('certificationFile', e.target.files?.[0] || null)}
                          className="hidden"
                          id="certificationFile"
                        />
                        <Label htmlFor="certificationFile" className="cursor-pointer text-emerald-600 hover:text-emerald-700 font-medium">
                          Choose File
                        </Label>
                        {formData.certificationFile && (
                          <p className="text-xs text-green-600 mt-2">✓ {formData.certificationFile.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !isFormValid()}
                    className={`w-full h-12 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all ${
                      loading || !isFormValid() ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Award className="h-5 w-5 mr-2" />
                        Submit Registration
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    By submitting, you agree to our terms and conditions. Your profile will be reviewed within 24-48 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default RegisterTrainer;
