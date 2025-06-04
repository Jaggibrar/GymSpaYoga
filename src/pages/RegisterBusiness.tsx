
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Upload, MapPin, Phone, Mail, Clock, Dumbbell, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterBusiness = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const gymAmenities = [
    "Air Conditioning", "Parking", "Lockers", "Shower Facilities", "Personal Training",
    "Group Classes", "Swimming Pool", "Sauna", "Steam Room", "Nutrition Counseling",
    "24/7 Access", "WiFi", "Cafe/Juice Bar", "Towel Service", "Equipment Rental"
  ];

  const spaServices = [
    "Swedish Massage", "Deep Tissue Massage", "Hot Stone Massage", "Aromatherapy",
    "Facial Treatments", "Body Wraps", "Manicure", "Pedicure", "Sauna", "Steam Bath",
    "Jacuzzi", "Couples Treatment", "Ayurvedic Treatments", "Thai Massage"
  ];

  const yogaClasses = [
    "Hatha Yoga", "Vinyasa", "Ashtanga", "Iyengar", "Hot Yoga", "Yin Yoga",
    "Restorative Yoga", "Prenatal Yoga", "Kids Yoga", "Meditation Classes",
    "Breathing Workshops", "Philosophy Classes", "Teacher Training", "Private Sessions"
  ];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
            <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Register Your
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Business </span>
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Join our platform and connect with thousands of potential customers
            </p>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Badge className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600">✨ Featured Listings</Badge>
              <Badge className="px-4 py-2 bg-blue-500 hover:bg-blue-600">📱 Mobile App Presence</Badge>
              <Badge className="px-4 py-2 bg-purple-500 hover:bg-purple-600">📊 Analytics Dashboard</Badge>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-6 rounded-2xl inline-block">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-6 w-6" />
                <span className="text-2xl font-bold">Registration Fee: ₹4,999</span>
              </div>
              <p className="text-emerald-100 mt-2">One-time payment • Lifetime listing</p>
            </div>
          </div>

          {/* Registration Form */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Business Registration Form</CardTitle>
              <CardDescription className="text-center text-lg">
                Fill in your business details to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Business Type */}
              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-lg font-semibold">Business Type *</Label>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gym">Gym / Fitness Center</SelectItem>
                    <SelectItem value="spa">Spa / Wellness Center</SelectItem>
                    <SelectItem value="yoga">Yoga Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-lg font-semibold">Business Name *</Label>
                  <Input id="businessName" placeholder="Enter your business name" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-lg font-semibold">Category *</Label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="budget">Budget Friendly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email Address *</span>
                    </Label>
                    <Input id="email" type="email" placeholder="business@example.com" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Phone Number *</span>
                    </Label>
                    <Input id="phone" placeholder="+91 98765 43210" className="h-12" />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Business Address</span>
                </h3>
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Complete business address" 
                    className="min-h-[80px]"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input placeholder="City" className="h-12" />
                    <Input placeholder="State" className="h-12" />
                    <Input placeholder="PIN Code" className="h-12" />
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Operating Hours</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Opening Time</Label>
                    <Input type="time" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label>Closing Time</Label>
                    <Input type="time" className="h-12" />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Pricing Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyPrice">Monthly Membership (₹)</Label>
                    <Input id="monthlyPrice" placeholder="2500" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionPrice">Per Session Price (₹)</Label>
                    <Input id="sessionPrice" placeholder="500" className="h-12" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-lg font-semibold">Business Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe your business, facilities, and what makes you special..."
                  className="min-h-[120px]"
                />
              </div>

              {/* Amenities/Services */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Amenities & Services</h3>
                <p className="text-gray-600">Select all amenities and services you offer:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                <h3 className="text-xl font-semibold text-gray-800">Business Images</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600 mb-2">Upload business photos</p>
                  <p className="text-sm text-gray-500">Drag and drop files here or click to browse</p>
                  <Button variant="outline" className="mt-4">
                    Choose Files
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Upload at least 5 high-quality images of your facility (JPG, PNG, max 5MB each)
                </p>
              </div>

              {/* Terms and Payment */}
              <div className="space-y-6 pt-6 border-t">
                <div className="flex items-start space-x-3">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the Terms & Conditions and Privacy Policy. I understand that the registration fee of ₹4,999 is non-refundable and provides lifetime listing on the platform.
                  </Label>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-lg mb-2">What you get:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ Lifetime business listing on our platform</li>
                    <li>✅ Featured placement in search results</li>
                    <li>✅ Customer booking management system</li>
                    <li>✅ Analytics dashboard to track performance</li>
                    <li>✅ Direct customer communication tools</li>
                    <li>✅ Mobile app presence</li>
                  </ul>
                </div>

                <div className="text-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-lg px-12 py-4"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pay ₹4,999 & Register Business
                  </Button>
                  <p className="text-sm text-gray-500 mt-4">
                    Secure payment powered by Stripe • SSL encrypted
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterBusiness;
