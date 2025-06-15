import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Star, 
  Dumbbell, 
  Crown, 
  Diamond, 
  IndianRupee,
  Check,
  ArrowLeft,
  Calendar,
  Users,
  Award,
  Zap,
  Shield,
  Heart
} from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PaymentModal from "@/components/PaymentModal";

interface Gym {
  id: string;
  business_name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  phone: string;
  email: string;
  opening_time: string;
  closing_time: string;
  monthly_price?: number;
  session_price?: number;
  amenities: string[];
  image_urls: string[];
  tier?: string;
}

const GymDetails = () => {
  useScrollToTop();
  const { id } = useParams();
  const [gym, setGym] = useState<Gym | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ price: number; type: 'monthly' | 'session' } | null>(null);

  useEffect(() => {
    if (id) {
      fetchGymDetails(id);
    }
  }, [id]);

  const fetchGymDetails = async (gymId: string) => {
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('id', gymId)
        .eq('business_type', 'gym')
        .single();

      if (error) throw error;
      setGym(data);
    } catch (error) {
      console.error('Error fetching gym details:', error);
      toast.error('Failed to load gym details');
    } finally {
      setLoading(false);
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'luxury': return <Crown className="h-5 w-5" />;
      case 'premium': return <Diamond className="h-5 w-5" />;
      default: return <IndianRupee className="h-5 w-5" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'luxury': return "from-yellow-500 to-yellow-600";
      case 'premium': return "from-blue-500 to-blue-600";
      default: return "from-green-500 to-green-600";
    }
  };

  const handleBookNow = (price: number, type: 'monthly' | 'session') => {
    setSelectedPlan({ price, type });
    setIsBookingModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading gym details...</p>
        </div>
      </div>
    );
  }

  if (!gym) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Dumbbell className="h-12 w-12 text-red-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Gym not found</h2>
            <p className="text-gray-600 mb-6">The gym you're looking for doesn't exist.</p>
            <Link to="/gyms">
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Gyms
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <SEOHead
          title={`${gym.business_name} - Premium Gym Details`}
          description={gym.description || `Discover ${gym.business_name} - Premium fitness center with state-of-the-art equipment and professional trainers.`}
        />

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 opacity-90"></div>
          <div className="relative h-[60vh] flex items-center">
            {gym.image_urls && gym.image_urls.length > 0 && (
              <img 
                src={gym.image_urls[selectedImage] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                alt={gym.business_name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/40"></div>
            
            <div className="relative mobile-container z-10 text-white">
              <div className="max-w-4xl">
                <Link to="/gyms" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="font-medium">Back to Gyms</span>
                </Link>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Dumbbell className="h-8 w-8 text-white" />
                  </div>
                  {gym.tier && (
                    <Badge className={`bg-gradient-to-r ${getTierColor(gym.tier)} text-white border-0 px-4 py-2 text-lg font-bold`}>
                      {getTierIcon(gym.tier)}
                      <span className="ml-2 capitalize">{gym.tier}</span>
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">{gym.business_name}</h1>
                <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-3xl">
                  {gym.description || "Premium fitness center with state-of-the-art equipment and professional trainers"}
                </p>
                
                <div className="flex items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{gym.city}, {gym.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-current text-yellow-400" />
                    <span className="font-medium">4.8 Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span className="font-medium">1000+ Members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery Dots */}
          {gym.image_urls && gym.image_urls.length > 1 && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {gym.image_urls.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === selectedImage ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mobile-container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    About {gym.business_name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {gym.description || "Experience premium fitness at its finest with state-of-the-art equipment, expert trainers, and a motivating environment designed to help you achieve your fitness goals."}
                  </p>
                </CardContent>
              </Card>

              {/* Amenities Section */}
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    Amenities & Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {gym.amenities && gym.amenities.length > 0 ? (
                      gym.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-700 capitalize">{amenity}</span>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Air Conditioning', 'Locker Room', 'Parking', 'Shower Facilities', 'Personal Training', 'Group Classes'].map((amenity, index) => (
                          <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium text-gray-700">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    Location & Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                      <p className="text-gray-600">{gym.address}, {gym.city}, {gym.state} - {gym.pin_code}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Phone className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                      <p className="text-gray-600">{gym.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                      <p className="text-gray-600">{gym.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Operating Hours</h4>
                      <p className="text-gray-600">{gym.opening_time} - {gym.closing_time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Membership Plans */}
              <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden sticky top-8">
                <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white pb-8">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <Shield className="h-6 w-6" />
                    Membership Plans
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  {/* Monthly Plan */}
                  {gym.monthly_price && (
                    <div className="relative p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-orange-500 text-white px-4 py-1 font-bold">Most Popular</Badge>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Monthly</h3>
                        <div className="mb-4">
                          <span className="text-4xl font-black text-orange-600">₹{gym.monthly_price}</span>
                          <span className="text-gray-500 ml-2">/month</span>
                        </div>
                        <Button 
                          onClick={() => handleBookNow(gym.monthly_price, 'monthly')}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 font-bold py-3 text-lg rounded-xl transform hover:scale-105 transition-all duration-300"
                        >
                          <Calendar className="h-5 w-5 mr-2" />
                          Book Monthly
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Session Plan */}
                  {gym.session_price && (
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Per Session</h3>
                        <div className="mb-4">
                          <span className="text-3xl font-black text-blue-600">₹{gym.session_price}</span>
                          <span className="text-gray-500 ml-2">/session</span>
                        </div>
                        <Button 
                          onClick={() => handleBookNow(gym.session_price, 'session')}
                          variant="outline"
                          className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-bold py-3 text-lg rounded-xl transition-all duration-300"
                        >
                          <Heart className="h-5 w-5 mr-2" />
                          Book Session
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Contact for Pricing */}
                  {!gym.monthly_price && !gym.session_price && (
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border border-gray-200">
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Custom Plans</h3>
                        <p className="text-gray-600 mb-4">Contact us for personalized pricing</p>
                        <Button 
                          onClick={() => toast.info("Please contact the gym directly for pricing information")}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-bold py-3 text-lg rounded-xl"
                        >
                          Get Quote
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Trust Indicators */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Verified Business</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Professional Trainers</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Modern Equipment</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Flexible Memberships</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedPlan(null);
          }}
          businessId={gym.id}
          serviceType="gym"
          serviceName={gym.business_name}
          price={selectedPlan.price}
          priceType={selectedPlan.type}
        />
      )}
    </>
  );
};

export default GymDetails;
