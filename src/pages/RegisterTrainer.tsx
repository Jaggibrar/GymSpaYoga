import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Star, Heart, Dumbbell, Waves, ArrowLeft, Upload, CheckCircle, CreditCard, Wallet, QrCode, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const RegisterTrainer = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
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
    profileImage: null as File | null
  });

  const categories = [
    { value: "gym", label: "Gym Trainer", icon: Dumbbell },
    { value: "spa", label: "Spa Therapist", icon: Waves },
    { value: "yoga", label: "Yoga Instructor", icon: Heart }
  ];

  const trainerTiers = [
    { value: "elite", label: "Elite", price: "₹4,999", color: "from-purple-500 to-pink-500" },
    { value: "pro", label: "Pro", price: "₹3,999", color: "from-blue-500 to-indigo-500" },
    { value: "intermediate", label: "Intermediate", price: "₹2,999", color: "from-green-500 to-emerald-500" },
    { value: "basic", label: "Basic", price: "₹1,700", color: "from-orange-500 to-red-500" }
  ];

  const specializations = {
    gym: ["Weight Training", "Cardio", "Strength Training", "CrossFit", "Bodybuilding", "HIIT"],
    spa: ["Swedish Massage", "Deep Tissue", "Aromatherapy", "Hot Stone", "Reflexology", "Facial"],
    yoga: ["Hatha Yoga", "Vinyasa", "Ashtanga", "Yin Yoga", "Power Yoga", "Meditation"]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate payment processing
    toast({
      title: "Registration Successful!",
      description: "Your trainer profile has been submitted for review. You will be notified once it's approved.",
    });
    
    // Reset form
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
  };

  const handleSpecializationChange = (specialization: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specializations: checked 
        ? [...prev.specializations, specialization]
        : prev.specializations.filter(s => s !== specialization)
    }));
  };

  const getSelectedTierDetails = () => {
    return trainerTiers.find(tier => tier.value === formData.trainerTier);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 hover:text-emerald-600 transition-colors duration-300">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                <Dumbbell className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Join Our Expert Trainers
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Share your expertise and grow your fitness business with us
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">500+</div>
                <div className="text-gray-600">Active Trainers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-gray-600">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">₹50K+</div>
                <div className="text-gray-600">Avg Monthly Earnings</div>
              </div>
            </div>
          </div>

          <Card className="shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-800">
                Trainer Registration
              </CardTitle>
              <p className="text-gray-600">Choose your trainer tier and register</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            <div className="flex items-center space-x-2">
                              <cat.icon className="h-4 w-4" />
                              <span>{cat.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Trainer Tier Selection */}
                <div className="space-y-4">
                  <Label>Trainer Tier *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trainerTiers.map((tier) => (
                      <div 
                        key={tier.value}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.trainerTier === tier.value 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, trainerTier: tier.value }))}
                      >
                        <div className={`w-full h-3 bg-gradient-to-r ${tier.color} rounded-full mb-3`}></div>
                        <h3 className="font-bold text-lg">{tier.label}</h3>
                        <p className="text-2xl font-bold text-gray-800">{tier.price}</p>
                        <p className="text-sm text-gray-600">One-time registration</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={formData.experience}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate (₹) *</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, State"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications</Label>
                  <Textarea
                    id="certifications"
                    value={formData.certifications}
                    onChange={(e) => setFormData(prev => ({ ...prev, certifications: e.target.value }))}
                    placeholder="List your certifications, separated by commas"
                    className="min-h-[100px]"
                  />
                </div>

                {formData.category && (
                  <div className="space-y-4">
                    <Label>Specializations</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {specializations[formData.category as keyof typeof specializations]?.map((spec) => (
                        <div key={spec} className="flex items-center space-x-2">
                          <Checkbox
                            id={spec}
                            checked={formData.specializations.includes(spec)}
                            onCheckedChange={(checked) => handleSpecializationChange(spec, checked as boolean)}
                          />
                          <Label htmlFor={spec} className="text-sm">{spec}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio *</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about your experience, training philosophy, and what makes you unique..."
                    required
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profileImage">Profile Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Upload your professional photo</p>
                    <Input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData(prev => ({ ...prev, profileImage: e.target.files?.[0] || null }))}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                </div>

                {/* Pricing Display */}
                {formData.trainerTier && (
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl border border-emerald-200">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <Star className="h-6 w-6 mr-2 text-emerald-600" />
                      Registration Pricing
                    </h4>
                    <div className={`bg-gradient-to-r ${getSelectedTierDetails()?.color} text-white p-4 rounded-lg`}>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{getSelectedTierDetails()?.label} Tier</div>
                        <div className="text-2xl font-bold">{getSelectedTierDetails()?.price}</div>
                        <div className="text-sm opacity-90">One-time registration fee</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Methods */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <CreditCard className="h-6 w-6 mr-2 text-blue-600" />
                    Payment Methods
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <Wallet className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <h5 className="font-semibold">Digital Wallet</h5>
                      <p className="text-sm text-gray-600">PayTM, PhonePe, GPay</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <Building2 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h5 className="font-semibold">Bank Transfer</h5>
                      <p className="text-sm text-gray-600">Direct bank account</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <QrCode className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <h5 className="font-semibold">QR Code</h5>
                      <p className="text-sm text-gray-600">Scan & Pay</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <CheckCircle className="h-6 w-6 text-emerald-600 mr-2" />
                    What You Get:
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Professional trainer profile on our platform</li>
                    <li>• Direct client bookings and inquiries</li>
                    <li>• Featured in relevant category sections</li>
                    <li>• Marketing support and promotion</li>
                    <li>• Secure payment processing</li>
                    <li>• 24/7 customer support</li>
                  </ul>
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-lg px-12 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Register Now
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterTrainer;
