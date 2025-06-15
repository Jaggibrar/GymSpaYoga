import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Waves, Heart, UploadCloud } from "lucide-react";
import { useTrainerRegistration } from "@/hooks/useTrainerRegistration";
import { useAuth } from "@/hooks/useAuth";
import TrainerPersonalInfo from "@/components/registration/TrainerPersonalInfo";
import TrainerProfessionalDetails from "@/components/registration/TrainerProfessionalDetails";
import TrainerUploads from "@/components/registration/TrainerUploads";
import TrainerSuccessMessage from "@/components/registration/TrainerSuccessMessage";

const RegisterTrainer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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

  if (!user) {
    navigate('/login');
    return null;
  }

  const categories = [
    { value: "gym", label: "Gym Trainer", icon: Dumbbell, color: "from-red-500 to-orange-500" },
    { value: "spa", label: "Spa Therapist", icon: Waves, color: "from-blue-500 to-cyan-500" },
    { value: "yoga", label: "Yoga Instructor", icon: Heart, color: "from-purple-500 to-pink-500" }
  ];

  // Frontend validation
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
    if (!formData.certificationFile) return false; // certification attachment required
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
    if (!isFormValid()) return;
    const exp = parseInt(formData.experience);
    const rate = parseInt(formData.hourlyRate);

    setSuccessMessage(null); // Reset message

    // Submit, trigger callback in hook
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

      // Show success instructions
      setSuccessMessage(
        "Registration successful! Your listing will appear after admin verification. You will receive an email when your profile is approved. Thank you for registering!"
      );

      // Optionally: delay before navigating away, or let user click a button.
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/");
      }, 6000);
    }
  };

  const specializations = {
    gym: ["Weight Training", "Cardio", "Strength Training", "CrossFit", "Bodybuilding", "HIIT"],
    spa: ["Swedish Massage", "Deep Tissue", "Aromatherapy", "Hot Stone", "Reflexology", "Facial"],
    yoga: ["Hatha Yoga", "Vinyasa", "Ashtanga", "Yin Yoga", "Power Yoga", "Meditation"]
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Trainer Registration</h1>
      <TrainerSuccessMessage successMessage={successMessage} />

      <TrainerPersonalInfo formData={formData} setFormData={setFormData} />
      <TrainerProfessionalDetails
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        specializations={specializations}
        onSpecializationChange={handleSpecializationChange}
      />
      <TrainerUploads formData={formData} handleFileChange={handleFileChange} />

      <button
        className={`w-full mt-4 py-2 rounded bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition ${loading || !isFormValid() ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading || !isFormValid()}
        onClick={handleSubmit}
        type="button"
      >
        {loading ? "Submitting..." : "Submit Registration"}
      </button>
    </div>
  );
};

export default RegisterTrainer;
