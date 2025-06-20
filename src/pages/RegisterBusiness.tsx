import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBusinessRegistration } from "@/hooks/useBusinessRegistration";
import { useAuth } from "@/hooks/useAuth";

// Import components
import { MultiStepForm } from "@/components/registration/MultiStepForm";
import { BusinessTypeSelector } from "@/components/registration/BusinessTypeSelector";
import { ContactInfoForm } from "@/components/registration/ContactInfoForm";
import { AddressForm } from "@/components/registration/AddressForm";
import { OperatingHoursForm } from "@/components/registration/OperatingHoursForm";
import { PricingForm } from "@/components/registration/PricingForm";
import { AmenitiesSelector } from "@/components/registration/AmenitiesSelector";
import { ImageUpload } from "@/components/registration/ImageUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

const RegisterBusiness = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { registerBusiness, loading } = useBusinessRegistration();
  
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [businessType, setBusinessType] = useState("");
  const [businessImages, setBusinessImages] = useState<File[]>([]);
  const [selectedTier, setSelectedTier] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    openingTime: "",
    closingTime: "",
    monthlyPrice: "",
    sessionPrice: "",
    description: ""
  });

  // Fix: Move redirect logic to useEffect to avoid React Router warning
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Don't render anything if user is not authenticated
  if (!user) {
    return null;
  }

  const businessTypes = [
    { value: "gym", label: "Gym / Fitness Center", icon: "💪" },
    { value: "spa", label: "Spa / Wellness Center", icon: "🧘" },
    { value: "yoga", label: "Yoga Studio", icon: "🕉️" }
  ];

  const amenitiesList = [
    "Air Conditioning", "Parking", "Lockers", "Shower Facilities", "Personal Training",
    "Group Classes", "Swimming Pool", "Sauna", "Steam Room", "Nutrition Counseling",
    "24/7 Access", "WiFi", "Cafe/Juice Bar", "Towel Service", "Equipment Rental"
  ];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setBusinessImages(files);
  };

  const handleSubmit = async () => {
    console.log('Starting submission process...');
    setIsSubmitting(true);
    
    try {
      // Comprehensive validation
      if (!formData.businessName.trim()) {
        toast.error("Business name is required");
        return;
      }
      
      if (!businessType) {
        toast.error("Please select a business type");
        return;
      }
      
      if (!formData.email.trim() || !formData.phone.trim()) {
        toast.error("Email and phone are required");
        return;
      }
      
      if (!formData.address.trim() || !formData.city.trim() || !formData.state.trim() || !formData.pinCode.trim()) {
        toast.error("Complete address information is required");
        return;
      }
      
      if (!formData.openingTime || !formData.closingTime || !selectedTier) {
        toast.error("Operating hours and tier selection are required");
        return;
      }
      
      if (!formData.description.trim() || formData.description.length < 10) {
        toast.error("Please provide a detailed business description (minimum 10 characters)");
        return;
      }
      
      if (businessImages.length === 0) {
        toast.error("Please upload at least one business image");
        return;
      }

      const businessFormData = {
        ...formData,
        businessType,
        category: selectedTier,
        amenities: selectedAmenities,
        images: businessImages
      };

      console.log('Submitting business form with data:', businessFormData);
      const success = await registerBusiness(businessFormData);
      
      if (success) {
        console.log('Registration successful');
        // Reset form
        setFormData({
          businessName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pinCode: "",
          openingTime: "",
          closingTime: "",
          monthlyPrice: "",
          sessionPrice: "",
          description: ""
        });
        setSelectedAmenities([]);
        setBusinessType("");
        setBusinessImages([]);
        setSelectedTier("");
        
        // Navigation is now handled in the hook
      } else {
        console.log('Registration failed');
        toast.error("Registration failed. Please check all fields and try again.");
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fixed validation functions for each step
  const validateBusinessType = () => {
    return businessType.trim() !== "" && formData.businessName.trim() !== "";
  };

  const validateContact = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return formData.email.trim() !== "" && 
           formData.phone.trim() !== "" && 
           emailRegex.test(formData.email) && 
           phoneRegex.test(formData.phone);
  };

  const validateAddress = () => {
    const pinRegex = /^\d{6}$/;
    return formData.address.trim() !== "" && 
           formData.city.trim() !== "" && 
           formData.state.trim() !== "" && 
           formData.pinCode.trim() !== "" && 
           pinRegex.test(formData.pinCode);
  };

  const validateOperations = () => {
    if (!formData.openingTime || !formData.closingTime || !selectedTier) return false;
    const opening = new Date(`2000-01-01T${formData.openingTime}`);
    const closing = new Date(`2000-01-01T${formData.closingTime}`);
    return opening < closing;
  };

  const validateDescription = () => {
    return formData.description.trim().length >= 10;
  };

  const validateImages = () => {
    return businessImages.length >= 1;
  };

  const steps = [
    {
      id: "business-type",
      title: "Business Type",
      description: "What type of business?",
      validate: validateBusinessType,
      component: (
        <div className="space-y-6">
          <BusinessTypeSelector 
            businessTypes={businessTypes}
            selectedType={businessType}
            onTypeSelect={setBusinessType}
          />
          <div className="space-y-3">
            <Label htmlFor="businessName" className="text-lg font-medium text-gray-700">Business Name *</Label>
            <Input 
              id="businessName" 
              placeholder="Enter your business name" 
              className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
              value={formData.businessName}
              onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
              required
            />
          </div>
        </div>
      )
    },
    {
      id: "contact",
      title: "Contact Info",
      description: "How can customers reach you?",
      validate: validateContact,
      component: (
        <ContactInfoForm 
          email={formData.email}
          phone={formData.phone}
          onEmailChange={(email) => setFormData(prev => ({ ...prev, email }))}
          onPhoneChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
        />
      )
    },
    {
      id: "address",
      title: "Location",
      description: "Where is your business?",
      validate: validateAddress,
      component: (
        <AddressForm 
          address={formData.address}
          city={formData.city}
          state={formData.state}
          pinCode={formData.pinCode}
          onAddressChange={(address) => setFormData(prev => ({ ...prev, address }))}
          onCityChange={(city) => setFormData(prev => ({ ...prev, city }))}
          onStateChange={(state) => setFormData(prev => ({ ...prev, state }))}
          onPinCodeChange={(pinCode) => setFormData(prev => ({ ...prev, pinCode }))}
        />
      )
    },
    {
      id: "operations",
      title: "Operations",
      description: "Hours, pricing & tier",
      validate: validateOperations,
      component: (
        <div className="grid grid-cols-1 gap-10">
          <OperatingHoursForm 
            openingTime={formData.openingTime}
            closingTime={formData.closingTime}
            onOpeningTimeChange={(openingTime) => setFormData(prev => ({ ...prev, openingTime }))}
            onClosingTimeChange={(closingTime) => setFormData(prev => ({ ...prev, closingTime }))}
          />
          <PricingForm 
            monthlyPrice={formData.monthlyPrice}
            sessionPrice={formData.sessionPrice}
            tier={selectedTier}
            onMonthlyPriceChange={(monthlyPrice) => setFormData(prev => ({ ...prev, monthlyPrice }))}
            onSessionPriceChange={(sessionPrice) => setFormData(prev => ({ ...prev, sessionPrice }))}
            onTierChange={setSelectedTier}
          />
        </div>
      )
    },
    {
      id: "description",
      title: "Description",
      description: "Tell us about your business",
      validate: validateDescription,
      component: (
        <div className="space-y-3">
          <Label className="text-lg font-medium text-gray-700">Business Description *</Label>
          <Textarea 
            placeholder="Describe your business, facilities, and what makes you special... (minimum 10 characters)"
            className="min-h-[120px] text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
          <p className="text-sm text-gray-500">{formData.description.length}/10 characters minimum</p>
        </div>
      )
    },
    {
      id: "amenities",
      title: "Amenities",
      description: "What do you offer?",
      component: (
        <AmenitiesSelector 
          amenitiesList={amenitiesList}
          selectedAmenities={selectedAmenities}
          onAmenityToggle={toggleAmenity}
        />
      )
    },
    {
      id: "images",
      title: "Images",
      description: "Showcase your business",
      validate: validateImages,
      component: <ImageUpload onFileChange={handleFileChange} />
    }
  ];

  return (
    <MultiStepForm
      steps={steps}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting || loading}
      title="Business Registration"
      description="Join our platform and start attracting customers"
    />
  );
};

export default RegisterBusiness;
