
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Upload, MapPin, Phone, Mail, Clock, Dumbbell, Star, Zap, Crown, Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useBusinessRegistration } from "@/hooks/useBusinessRegistration";
import { useAuth } from "@/hooks/useAuth";

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
                  <getSelectedCategoryDetails()?.icon className="h-8 w-8" />
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
                  
                  {/* Business Type */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium text-gray-700">Business Type *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {businessTypes.map((type) => (
                        <div 
                          key={type.value}
                          className={`p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-lg ${
                            businessType === type.value 
                              ? 'border-blue-500 bg-blue-50 shadow-md' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setBusinessType(type.value)}
                        >
                          <div className="text-4xl text-center mb-3">{type.icon}</div>
                          <h4 className="font-bold text-lg text-center text-gray-800">{type.label}</h4>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium text-gray-700">Destination Category *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {categoryTiers.map((tier) => (
                        <div 
                          key={tier.value}
                          className={`p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-lg ${
                            selectedCategory === tier.value 
                              ? 'border-blue-500 bg-blue-50 shadow-md' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedCategory(tier.value)}
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
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-lg font-medium text-gray-700 flex items-center">
                        <Mail className="h-5 w-5 mr-2" />
                        Email Address *
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="business@example.com" 
                        className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-lg font-medium text-gray-700 flex items-center">
                        <Phone className="h-5 w-5 mr-2" />
                        Phone Number *
                      </Label>
                      <Input 
                        id="phone" 
                        placeholder="+91 98765 43210" 
                        className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 flex items-center">
                    <MapPin className="h-6 w-6 mr-2" />
                    Business Address
                  </h3>
                  <div className="space-y-6">
                    <Textarea 
                      placeholder="Complete business address"
                      className="min-h-[100px] text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Input 
                        placeholder="City" 
                        className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        required
                      />
                      <Input 
                        placeholder="State" 
                        className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        value={formData.state}
                        onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                        required
                      />
                      <Input 
                        placeholder="PIN Code" 
                        className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        value={formData.pinCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, pinCode: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Operating Hours & Pricing */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Operating Hours */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 flex items-center">
                      <Clock className="h-6 w-6 mr-2" />
                      Operating Hours
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <Label className="text-lg font-medium text-gray-700">Opening Time *</Label>
                        <Input 
                          type="time" 
                          className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                          value={formData.openingTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, openingTime: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-lg font-medium text-gray-700">Closing Time *</Label>
                        <Input 
                          type="time" 
                          className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                          value={formData.closingTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, closingTime: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                      Pricing Information
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="monthlyPrice" className="text-lg font-medium text-gray-700">Monthly Membership (₹)</Label>
                        <Input 
                          id="monthlyPrice" 
                          placeholder="2500" 
                          className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                          value={formData.monthlyPrice}
                          onChange={(e) => setFormData(prev => ({ ...prev, monthlyPrice: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="sessionPrice" className="text-lg font-medium text-gray-700">Per Session Price (₹)</Label>
                        <Input 
                          id="sessionPrice" 
                          placeholder="500" 
                          className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                          value={formData.sessionPrice}
                          onChange={(e) => setFormData(prev => ({ ...prev, sessionPrice: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
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

                {/* Amenities */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                    Amenities & Services
                  </h3>
                  <p className="text-gray-600 text-lg">Select all amenities and services you offer:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {amenitiesList.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50">
                        <Checkbox 
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                          className="w-5 h-5"
                        />
                        <Label htmlFor={amenity} className="text-lg font-medium cursor-pointer">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images Upload */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                    Business Images
                  </h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                    <p className="text-xl text-gray-600 mb-4">Upload business photos</p>
                    <p className="text-gray-500 mb-6">Upload at least 5 high-quality images (JPG, PNG, max 5MB each)</p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="max-w-xs mx-auto text-lg"
                    />
                  </div>
                </div>

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
