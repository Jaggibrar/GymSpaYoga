
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Crown, Star, Zap } from "lucide-react";
import { useBusinessRegistration } from "@/hooks/useBusinessRegistration";
import { useAuth } from "@/hooks/useAuth";

// Import new components
import { RegistrationHeader } from "@/components/registration/RegistrationHeader";
import { BusinessTypeSelector } from "@/components/registration/BusinessTypeSelector";
import { CategoryTierSelector } from "@/components/registration/CategoryTierSelector";
import { ContactInfoForm } from "@/components/registration/ContactInfoForm";
import { AddressForm } from "@/components/registration/AddressForm";
import { OperatingHoursForm } from "@/components/registration/OperatingHoursForm";
import { PricingForm } from "@/components/registration/PricingForm";
import { AmenitiesSelector } from "@/components/registration/AmenitiesSelector";
import { ImageUpload } from "@/components/registration/ImageUpload";

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

  const getSelectedCategoryDetails = () => {
    return categoryTiers.find(tier => tier.value === selectedCategory);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setBusinessImages(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

  const SelectedCategoryIcon = getSelectedCategoryDetails()?.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <RegistrationHeader />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Register Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Business </span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful businesses on our platform. Boost your visibility, attract more customers, and grow your revenue.
            </p>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Mobile App Presence</h3>
                <p className="text-gray-600">Get featured in our mobile app with millions of downloads</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600">Track your performance with detailed insights and reports</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Marketing Support</h3>
                <p className="text-gray-600">Benefit from our marketing campaigns and promotions</p>
              </div>
            </div>

            {/* Dynamic Pricing Display */}
            {selectedCategory && (
              <div className={`bg-gradient-to-r ${getSelectedCategoryDetails()?.color} text-white p-8 rounded-2xl inline-block mb-8 shadow-lg`}>
                <div className="flex items-center justify-center space-x-3">
                  {SelectedCategoryIcon && <SelectedCategoryIcon className="h-8 w-8" />}
                  <span className="text-3xl font-bold">Registration Fee: {getSelectedCategoryDetails()?.price}</span>
                </div>
                <p className="text-white/90 mt-2 text-lg">One-time payment • Lifetime listing</p>
              </div>
            )}
          </div>

          {/* Main Form Card */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 px-12 py-10">
              <CardTitle className="text-3xl font-bold text-center text-gray-900">Business Registration</CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg mt-2">
                Complete your business profile to get started
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-12 py-10">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Business Type & Category */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                    Business Information
                  </h3>
                  
                  <BusinessTypeSelector 
                    businessTypes={businessTypes}
                    selectedType={businessType}
                    onTypeSelect={setBusinessType}
                  />

                  <CategoryTierSelector 
                    categoryTiers={categoryTiers}
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                  />

                  {/* Business Name */}
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

                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                    Contact Information
                  </h3>
                  <ContactInfoForm 
                    email={formData.email}
                    phone={formData.phone}
                    onEmailChange={(email) => setFormData(prev => ({ ...prev, email }))}
                    onPhoneChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
                  />
                </div>

                {/* Address Information */}
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

                {/* Operating Hours & Pricing */}
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

                {/* Description */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                    Business Description
                  </h3>
                  <Textarea 
                    placeholder="Describe your business, facilities, and what makes you special..."
                    className="min-h-[120px] text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <AmenitiesSelector 
                  amenitiesList={amenitiesList}
                  selectedAmenities={selectedAmenities}
                  onAmenityToggle={toggleAmenity}
                />

                <ImageUpload onFileChange={handleFileChange} />

                {/* Terms and Submit */}
                <div className="space-y-8 pt-8 border-t border-gray-200">
                  <div className="flex items-start space-x-4">
                    <Checkbox id="terms" className="w-5 h-5 mt-1" />
                    <Label htmlFor="terms" className="text-lg leading-relaxed text-gray-700">
                      I agree to the Terms & Conditions and Privacy Policy. I understand that the registration fee is non-refundable and provides lifetime listing on the platform.
                    </Label>
                  </div>

                  <div className="text-center">
                    <Button 
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl px-16 py-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      {loading ? "Registering..." : "Complete Registration"}
                    </Button>
                    <p className="text-gray-500 mt-4 text-lg">
                      Secure payment • SSL encrypted
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterBusiness;
