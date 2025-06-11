
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
import { Upload, MapPin, Phone, Mail, Clock, Dumbbell, CreditCard, Wallet, QrCode, Building2 } from "lucide-react";
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

  const gymAmenities = [
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

  const getPriceByCategory = (category: string) => {
    switch (category) {
      case "luxury":
        return "₹7,999";
      case "premium":
        return "₹4,999";
      case "budget":
        return "₹2,999";
      default:
        return "₹4,999";
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "luxury":
        return "bg-purple-500 hover:bg-purple-600";
      case "premium":
        return "bg-blue-500 hover:bg-blue-600";
      case "budget":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
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
      // Redirect to home or success page
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Register Your
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Business </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Join our platform and connect with thousands of potential customers
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
              <Badge className="px-3 sm:px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-sm sm:text-base">✨ Featured Listings</Badge>
              <Badge className="px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-sm sm:text-base">📱 Mobile App Presence</Badge>
              <Badge className="px-3 sm:px-4 py-2 bg-purple-500 hover:bg-purple-600 text-sm sm:text-base">📊 Analytics Dashboard</Badge>
            </div>

            {/* Dynamic Pricing Display */}
            {selectedCategory && (
              <div className={`${getCategoryBadgeColor(selectedCategory)} text-white p-4 sm:p-6 rounded-2xl inline-block mb-6`}>
                <div className="flex items-center justify-center space-x-2">
                  <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xl sm:text-2xl font-bold">Registration Fee: {getPriceByCategory(selectedCategory)}</span>
                </div>
                <p className="text-white/90 mt-2 text-sm sm:text-base">One-time payment • Lifetime listing</p>
              </div>
            )}
          </div>

          {/* Registration Form */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-center">Business Registration Form</CardTitle>
              <CardDescription className="text-center text-base sm:text-lg">
                Fill in your business details to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 sm:space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Type */}
                <div className="space-y-2">
                  <Label htmlFor="businessType" className="text-base sm:text-lg font-semibold">Business Type *</Label>
                  <Select onValueChange={setBusinessType}>
                    <SelectTrigger className="h-10 sm:h-12">
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gym">Gym / Fitness Center</SelectItem>
                      <SelectItem value="spa">Spa / Wellness Center</SelectItem>
                      <SelectItem value="yoga">Yoga Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base sm:text-lg font-semibold">Destination Category *</Label>
                  <Select onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-10 sm:h-12">
                      <SelectValue placeholder="Select destination category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luxury">Luxury Destination</SelectItem>
                      <SelectItem value="premium">Premium Destination</SelectItem>
                      <SelectItem value="budget">Budget Friendly Destination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Basic Information */}
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-base sm:text-lg font-semibold">Business Name *</Label>
                  <Input 
                    id="businessName" 
                    placeholder="Enter your business name" 
                    className="h-10 sm:h-12"
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                    required
                  />
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Email Address *</span>
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="business@example.com" 
                        className="h-10 sm:h-12"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>Phone Number *</span>
                      </Label>
                      <Input 
                        id="phone" 
                        placeholder="+91 98765 43210" 
                        className="h-10 sm:h-12"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Business Address</span>
                  </h3>
                  <div className="space-y-4">
                    <Textarea 
                      placeholder="Complete business address"
                      className="min-h-[80px]"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input 
                        placeholder="City" 
                        className="h-10 sm:h-12"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        required
                      />
                      <Input 
                        placeholder="State" 
                        className="h-10 sm:h-12"
                        value={formData.state}
                        onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                        required
                      />
                      <Input 
                        placeholder="PIN Code" 
                        className="h-10 sm:h-12"
                        value={formData.pinCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, pinCode: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Operating Hours</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Opening Time</Label>
                      <Input 
                        type="time" 
                        className="h-10 sm:h-12"
                        value={formData.openingTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, openingTime: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Closing Time</Label>
                      <Input 
                        type="time" 
                        className="h-10 sm:h-12"
                        value={formData.closingTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, closingTime: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Pricing Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="monthlyPrice">Monthly Membership (₹)</Label>
                      <Input 
                        id="monthlyPrice" 
                        placeholder="2500" 
                        className="h-10 sm:h-12"
                        value={formData.monthlyPrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, monthlyPrice: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sessionPrice">Per Session Price (₹)</Label>
                      <Input 
                        id="sessionPrice" 
                        placeholder="500" 
                        className="h-10 sm:h-12"
                        value={formData.sessionPrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, sessionPrice: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base sm:text-lg font-semibold">Business Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="Describe your business, facilities, and what makes you special..."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                {/* Amenities/Services */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Amenities & Services</h3>
                  <p className="text-gray-600">Select all amenities and services you offer:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {gymAmenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox 
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <Label htmlFor={amenity} className="text-sm cursor-pointer">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Business Images</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-emerald-500 transition-colors">
                    <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-base sm:text-lg text-gray-600 mb-2">Upload business photos</p>
                    <p className="text-sm text-gray-500">Drag and drop files here or click to browse</p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mt-4"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Upload at least 5 high-quality images of your facility (JPG, PNG, max 5MB each)
                  </p>
                </div>

                {/* Terms and Registration */}
                <div className="space-y-6 pt-6 border-t">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the Terms & Conditions and Privacy Policy. I understand that the registration fee is non-refundable and provides lifetime listing on the platform.
                    </Label>
                  </div>

                  <div className="text-center">
                    <Button 
                      type="submit"
                      disabled={loading}
                      size="lg" 
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 w-full sm:w-auto"
                    >
                      {loading ? "Registering..." : "Register Now"}
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">
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
