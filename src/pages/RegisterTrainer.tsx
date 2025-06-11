
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Zap, Shield, Award, Dumbbell, Waves, Heart } from "lucide-react";
import { useTrainerRegistration } from "@/hooks/useTrainerRegistration";
import { useAuth } from "@/hooks/useAuth";

// Import new components
import { RegistrationHeader } from "@/components/registration/RegistrationHeader";
import { TrainerStatsHero } from "@/components/registration/TrainerStatsHero";
import { TrainerPersonalInfo } from "@/components/registration/TrainerPersonalInfo";
import { TrainerCategorySelector } from "@/components/registration/TrainerCategorySelector";
import { TrainerTierSelector } from "@/components/registration/TrainerTierSelector";
import { TrainerProfessionalDetails } from "@/components/registration/TrainerProfessionalDetails";
import { TrainerBioAndCertifications } from "@/components/registration/TrainerBioAndCertifications";
import { TrainerSpecializationsSelector } from "@/components/registration/TrainerSpecializationsSelector";
import { TrainerProfileImageUpload } from "@/components/registration/TrainerProfileImageUpload";
import { TrainerPricingSummary } from "@/components/registration/TrainerPricingSummary";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, profileImage: file }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <RegistrationHeader />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <TrainerStatsHero />

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
                <TrainerPersonalInfo
                  name={formData.name}
                  email={formData.email}
                  phone={formData.phone}
                  onNameChange={(name) => setFormData(prev => ({ ...prev, name }))}
                  onEmailChange={(email) => setFormData(prev => ({ ...prev, email }))}
                  onPhoneChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
                />

                {/* Category & Tier Selection */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                    Expertise & Tier
                  </h3>
                  
                  <TrainerCategorySelector
                    categories={categories}
                    selectedCategory={formData.category}
                    onCategorySelect={(category) => setFormData(prev => ({ ...prev, category }))}
                  />

                  <TrainerTierSelector
                    trainerTiers={trainerTiers}
                    selectedTier={formData.trainerTier}
                    onTierSelect={(trainerTier) => setFormData(prev => ({ ...prev, trainerTier }))}
                  />
                </div>

                <TrainerProfessionalDetails
                  experience={formData.experience}
                  hourlyRate={formData.hourlyRate}
                  location={formData.location}
                  onExperienceChange={(experience) => setFormData(prev => ({ ...prev, experience }))}
                  onHourlyRateChange={(hourlyRate) => setFormData(prev => ({ ...prev, hourlyRate }))}
                  onLocationChange={(location) => setFormData(prev => ({ ...prev, location }))}
                />

                <TrainerBioAndCertifications
                  bio={formData.bio}
                  certifications={formData.certifications}
                  onBioChange={(bio) => setFormData(prev => ({ ...prev, bio }))}
                  onCertificationsChange={(certifications) => setFormData(prev => ({ ...prev, certifications }))}
                />

                <TrainerSpecializationsSelector
                  category={formData.category}
                  specializations={specializations}
                  selectedSpecializations={formData.specializations}
                  onSpecializationChange={handleSpecializationChange}
                />

                <TrainerProfileImageUpload onFileChange={handleFileChange} />

                <TrainerPricingSummary
                  selectedTier={formData.trainerTier}
                  trainerTiers={trainerTiers}
                />

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
