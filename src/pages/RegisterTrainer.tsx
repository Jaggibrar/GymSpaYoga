import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Waves, Heart, UploadCloud } from "lucide-react";
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

      {successMessage && (
        <div className="bg-green-50 text-green-700 border border-green-200 rounded px-4 py-3 mb-4 text-center">
          {successMessage}
        </div>
      )}

      {/* Name */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Name</label>
        <input className="input w-full" value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })} />
      </div>
      {/* Expertise */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Area of Expertise</label>
        <select className="input w-full" value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })}>
          <option value="">Select...</option>
          {categories.map(cat =>
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          )}
        </select>
      </div>
      {/* Phone/Email */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Phone</label>
        <input className="input w-full" value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })} />
      </div>
      <div className="mb-2">
        <label className="block font-medium mb-1">Email</label>
        <input className="input w-full" value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })} />
      </div>
      {/* City & Location */}
      <div className="mb-2">
        <label className="block font-medium mb-1">City</label>
        <input className="input w-full" value={formData.city}
          onChange={e => setFormData({ ...formData, city: e.target.value })} />
      </div>
      <div className="mb-2">
        <label className="block font-medium mb-1">Location</label>
        <input className="input w-full" value={formData.location}
          onChange={e => setFormData({ ...formData, location: e.target.value })} />
      </div>
      {/* Experience, hourly rate */}
      <div className="flex gap-2 mb-2">
        <div className="flex-1">
          <label className="block font-medium mb-1">Experience (years)</label>
          <input className="input w-full" type="number" min={0} value={formData.experience}
            onChange={e => setFormData({ ...formData, experience: e.target.value })} />
        </div>
        <div className="flex-1">
          <label className="block font-medium mb-1">Hourly Rate (₹)</label>
          <input className="input w-full" type="number" min={0} value={formData.hourlyRate}
            onChange={e => setFormData({ ...formData, hourlyRate: e.target.value })} />
        </div>
      </div>
      {/* Specializations */}
      <div className="mb-3">
        <label className="block font-medium mb-1">Specializations</label>
        <div className="flex flex-wrap gap-2">
          {(specializations[formData.category as keyof typeof specializations] || []).map(spec =>
            <label key={spec} className="flex items-center gap-1 text-xs border rounded px-2 py-1">
              <input
                type="checkbox"
                checked={formData.specializations.includes(spec)}
                onChange={e => handleSpecializationChange(spec, e.target.checked)}
              />
              {spec}
            </label>
          )}
        </div>
      </div>
      {/* Bio */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Short Bio</label>
        <textarea className="input w-full min-h-[60px]" value={formData.bio}
          onChange={e => setFormData({ ...formData, bio: e.target.value })} />
      </div>
      {/* Profile Image */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Profile Image</label>
        <input type="file" accept="image/*"
          onChange={e => handleFileChange('profileImage', e.target.files && e.target.files[0] || null)}
        />
        {formData.profileImage && (
          <div className="mt-2"><img src={URL.createObjectURL(formData.profileImage)} alt="Preview" className="h-16 rounded" /></div>
        )}
      </div>
      {/* Certification Upload */}
      <div className="mb-3">
        <label className="block font-medium mb-1">Certification Document</label>
        <input type="file" accept=".pdf,image/*"
          onChange={e => handleFileChange('certificationFile', e.target.files && e.target.files[0] || null)}
        />
        {formData.certificationFile && (
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-700">
            <UploadCloud className="w-4 h-4" /> {formData.certificationFile.name}
          </div>
        )}
      </div>
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
