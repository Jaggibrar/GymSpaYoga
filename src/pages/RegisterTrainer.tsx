import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Waves, Heart } from "lucide-react";
import { useTrainerRegistration } from "@/hooks/useTrainerRegistration";
import { useAuth } from "@/hooks/useAuth";

// Import components
import { MultiStepForm } from "@/components/registration/MultiStepForm";
import { TrainerPersonalInfo } from "@/components/registration/TrainerPersonalInfo";
import { TrainerCategorySelector } from "@/components/registration/TrainerCategorySelector";
import { TrainerProfessionalDetails } from "@/components/registration/TrainerProfessionalDetails";
import { TrainerBioAndCertifications } from "@/components/registration/TrainerBioAndCertifications";
import { TrainerSpecializationsSelector } from "@/components/registration/TrainerSpecializationsSelector";
import { TrainerProfileImageUpload } from "@/components/registration/TrainerProfileImageUpload";

const RegisterTrainer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { registerTrainer, loading } = useTrainerRegistration();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    trainerTier: "basic", // Add default trainer tier
    category: "",
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

  const specializations = {
    gym: ["Weight Training", "Cardio", "Strength Training", "CrossFit", "Bodybuilding", "HIIT"],
    spa: ["Swedish Massage", "Deep Tissue", "Aromatherapy", "Hot Stone", "Reflexology", "Facial"],
    yoga: ["Hatha Yoga", "Vinyasa", "Ashtanga", "Yin Yoga", "Power Yoga", "Meditation"]
  };

  const handleSubmit = async () => {
    // Convert string values to numbers for the API
    const formDataForSubmission = {
      ...formData,
      experience: parseInt(formData.experience),
      hourlyRate: parseInt(formData.hourlyRate)
    };
    
    const success = await registerTrainer(formDataForSubmission);
    if (success) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        trainerTier: "basic",
        category: "",
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

  // Fixed validation functions
  const validatePersonalInfo = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return formData.name.trim() !== "" && 
           formData.email.trim() !== "" && 
           formData.phone.trim() !== "" &&
           emailRegex.test(formData.email) && 
           phoneRegex.test(formData.phone);
  };

  const validateCategory = () => {
    return formData.category !== "";
  };

  const validateProfessionalDetails = () => {
    const experience = parseInt(formData.experience);
    const hourlyRate = parseInt(formData.hourlyRate);
    return formData.experience !== "" && 
           formData.hourlyRate !== "" && 
           formData.location.trim() !== "" &&
           !isNaN(experience) && experience >= 0 &&
           !isNaN(hourlyRate) && hourlyRate > 0;
  };

  const validateBio = () => {
    return formData.bio.trim().length >= 10;
  };

  const validateProfileImage = () => {
    return formData.profileImage !== null;
  };

  const steps = [
    {
      id: "personal",
      title: "Personal Info",
      description: "Basic information",
      validate: validatePersonalInfo,
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
      title: "Category",
      description: "Choose your expertise",
      validate: validateCategory,
      component: (
        <TrainerCategorySelector
          categories={categories}
          selectedCategory={formData.category}
          onCategorySelect={(category) => setFormData(prev => ({ ...prev, category }))}
        />
      )
    },
    {
      id: "professional",
      title: "Professional Details",
      description: "Experience and rates",
      validate: validateProfessionalDetails,
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
      validate: validateBio,
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
      validate: validateProfileImage,
      component: <TrainerProfileImageUpload onFileChange={handleFileChange} />
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
