
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Zap, Shield, Award, Dumbbell, Waves, Heart } from "lucide-react";
import { useTrainerRegistration } from "@/hooks/useTrainerRegistration";
import { useAuth } from "@/hooks/useAuth";

// Import components
import { MultiStepForm } from "@/components/registration/MultiStepForm";
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

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.category || 
        !formData.trainerTier || !formData.experience || !formData.hourlyRate || 
        !formData.location || !formData.bio) {
      alert("Please fill in all required fields");
      return;
    }

    const success = await registerTrainer(formData);
    if (success) {
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

  const steps = [
    {
      id: "personal",
      title: "Personal Info",
      description: "Basic information",
      component: (
        <TrainerPersonalInfo
          name={formData.name}
          email={formData.email}
          phone={formData.phone}
          onNameChange={(name) => setFormData(prev => ({ ...prev, name }))}
          onEmailChange={(email) => setFormData(prev => ({ ...prev, email }))}
          onPhoneChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
        />
      )
    },
    {
      id: "category",
      title: "Category & Tier",
      description: "Choose your expertise",
      component: (
        <div className="space-y-8">
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
      )
    },
    {
      id: "professional",
      title: "Professional Details",
      description: "Experience and rates",
      component: (
        <TrainerProfessionalDetails
          experience={formData.experience}
          hourlyRate={formData.hourlyRate}
          location={formData.location}
          onExperienceChange={(experience) => setFormData(prev => ({ ...prev, experience }))}
          onHourlyRateChange={(hourlyRate) => setFormData(prev => ({ ...prev, hourlyRate }))}
          onLocationChange={(location) => setFormData(prev => ({ ...prev, location }))}
        />
      )
    },
    {
      id: "bio",
      title: "Bio & Certifications",
      description: "Tell us about yourself",
      component: (
        <TrainerBioAndCertifications
          bio={formData.bio}
          certifications={formData.certifications}
          onBioChange={(bio) => setFormData(prev => ({ ...prev, bio }))}
          onCertificationsChange={(certifications) => setFormData(prev => ({ ...prev, certifications }))}
        />
      )
    },
    {
      id: "specializations",
      title: "Specializations",
      description: "Your areas of expertise",
      component: (
        <TrainerSpecializationsSelector
          category={formData.category}
          specializations={specializations}
          selectedSpecializations={formData.specializations}
          onSpecializationChange={handleSpecializationChange}
        />
      )
    },
    {
      id: "profile",
      title: "Profile Image",
      description: "Upload your photo",
      component: <TrainerProfileImageUpload onFileChange={handleFileChange} />
    },
    {
      id: "summary",
      title: "Review & Payment",
      description: "Confirm your details",
      component: (
        <TrainerPricingSummary
          selectedTier={formData.trainerTier}
          trainerTiers={trainerTiers}
        />
      )
    }
  ];

  return (
    <MultiStepForm
      steps={steps}
      onSubmit={handleSubmit}
      isSubmitting={loading}
      title="Trainer Registration"
      description="Join our platform and start connecting with clients"
    />
  );
};

export default RegisterTrainer;
