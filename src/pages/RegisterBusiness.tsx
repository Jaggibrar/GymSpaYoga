
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Star, Zap } from "lucide-react";
import { useBusinessRegistration } from "@/hooks/useBusinessRegistration";
import { useAuth } from "@/hooks/useAuth";

// Import components
import { MultiStepForm } from "@/components/registration/MultiStepForm";
import { BusinessTypeSelector } from "@/components/registration/BusinessTypeSelector";
import { CategoryTierSelector } from "@/components/registration/CategoryTierSelector";
import { ContactInfoForm } from "@/components/registration/ContactInfoForm";
import { AddressForm } from "@/components/registration/AddressForm";
import { OperatingHoursForm } from "@/components/registration/OperatingHoursForm";
import { PricingForm } from "@/components/registration/PricingForm";
import { AmenitiesSelector } from "@/components/registration/AmenitiesSelector";
import { ImageUpload } from "@/components/registration/ImageUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const RegisterBusiness = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { registerBusiness, loading } = useBusinessRegistration();
  
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessImages, setBusinessImages] = useState<File[]>([]);
  
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

  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  const categoryTiers = [
    {
      value: "luxury",
      label: "Luxury Destination",
      price: "₹7,999",
      color: "from-purple-600 to-purple-700",
      icon: Crown,
      features: ["Premium Profile Badge", "Top Search Rankings", "Marketing Campaign", "Priority Support", "Analytics Dashboard"]
    },
    {
      value: "premium",
      label: "Premium Destination",
      price: "₹4,999",
      color: "from-blue-600 to-blue-700",
      icon: Star,
      features: ["Premium Badge", "Featured Listings", "Social Media Promotion", "Email Support", "Basic Analytics"]
    },
    {
      value: "budget",
      label: "Budget Friendly",
      price: "₹2,999",
      color: "from-emerald-600 to-emerald-700",
      icon: Zap,
      features: ["Standard Profile", "Regular Listings", "Community Support", "Basic Promotion"]
    }
  ];

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
    // Basic validation
    if (!formData.businessName || !businessType || !selectedCategory || 
        !formData.email || !formData.phone || !formData.address || 
        !formData.city || !formData.state || !formData.pinCode ||
        !formData.openingTime || !formData.closingTime) {
      alert("Please fill in all required fields");
      return;
    }

    const businessFormData = {
      ...formData,
      businessType,
      category: selectedCategory,
      amenities: selectedAmenities,
      images: businessImages
    };

    const success = await registerBusiness(businessFormData);
    if (success) {
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
      setSelectedCategory("");
      setBusinessType("");
      setBusinessImages([]);
      navigate('/');
    }
  };

  const steps = [
    {
      id: "business-type",
      title: "Business Type",
      description: "What type of business?",
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
      id: "category",
      title: "Category & Tier",
      description: "Choose your category",
      component: (
        <CategoryTierSelector 
          categoryTiers={categoryTiers}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      )
    },
    {
      id: "contact",
      title: "Contact Info",
      description: "How can customers reach you?",
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
      description: "Hours and pricing",
      component: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <OperatingHoursForm 
            openingTime={formData.openingTime}
            closingTime={formData.closingTime}
            onOpeningTimeChange={(openingTime) => setFormData(prev => ({ ...prev, openingTime }))}
            onClosingTimeChange={(closingTime) => setFormData(prev => ({ ...prev, closingTime }))}
          />
          <PricingForm 
            monthlyPrice={formData.monthlyPrice}
            sessionPrice={formData.sessionPrice}
            onMonthlyPriceChange={(monthlyPrice) => setFormData(prev => ({ ...prev, monthlyPrice }))}
            onSessionPriceChange={(sessionPrice) => setFormData(prev => ({ ...prev, sessionPrice }))}
          />
        </div>
      )
    },
    {
      id: "description",
      title: "Description",
      description: "Tell us about your business",
      component: (
        <div className="space-y-3">
          <Label className="text-lg font-medium text-gray-700">Business Description</Label>
          <Textarea 
            placeholder="Describe your business, facilities, and what makes you special..."
            className="min-h-[120px] text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
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
      component: <ImageUpload onFileChange={handleFileChange} />
    }
  ];

  return (
    <MultiStepForm
      steps={steps}
      onSubmit={handleSubmit}
      isSubmitting={loading}
      title="Business Registration"
      description="Join our platform and start attracting customers"
    />
  );
};

export default RegisterBusiness;
