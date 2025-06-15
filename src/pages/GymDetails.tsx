
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, Clock, Phone, Dumbbell, Users, ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import BookingModal from "@/components/BookingModal";
import { useGyms } from "@/hooks/useGyms";

const GymDetails = () => {
  const { id } = useParams();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const { gyms, loading } = useGyms();
  const [gym, setGym] = useState<any>(null);

  useEffect(() => {
    if (gyms && id) {
      const foundGym = gyms.find(g => g.id === id);
      setGym(foundGym);
    }
  }, [gyms, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!gym) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center mobile-container">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Gym not found</h2>
          <Link to="/gyms">
            <Button className="touch-target bg-orange-500 hover:bg-orange-600">Back to Gyms</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleCallNow = () => {
    window.open(`tel:${gym.phone}`, '_self');
    toast.success("Opening phone dialer...");
  };

  const handleBooking = (planName: string) => {
    setSelectedPlan(planName);
    setIsBookingOpen(true);
  };

  const membershipPlans = [
    { 
      name: "Day Pass", 
      price: gym.session_price ? `₹${gym.session_price}` : "₹300", 
      duration: "1 Day", 
      savings: null,
      popular: false
    },
    { 
      name: "Monthly", 
      price: gym.monthly_price ? `₹${gym.monthly_price}` : "₹1200", 
      duration: "1 Month", 
      savings: null,
      popular: true
    },
    { 
      name: "Quarterly", 
      price: gym.monthly_price ? `₹${Math.round(gym.monthly_price * 3 * 0.9)}` : "₹3240", 
      duration: "3 Months", 
      savings: gym.monthly_price ? `₹${Math.round(gym.monthly_price * 3 * 0.1)}` : "₹360",
      popular: false
    },
    { 
      name: "Annual", 
      price: gym.monthly_price ? `₹${Math.round(gym.monthly_price * 12 * 0.8)}` : "₹11520", 
      duration: "12 Months", 
      savings: gym.monthly_price ? `₹${Math.round(gym.monthly_price * 12 * 0.2)}` : "₹2880",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Modern Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="mobile-container py-4">
          <div className="flex items-center justify-between">
            <Link to="/gyms" className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors duration-300 touch-target">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </Link>
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="mobile-container py-6">
        {/* Hero Section with Image and Basic Info */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="relative h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={gym.image_urls[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"} 
                alt={gym.business_name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute top-6 right-6">
                <Badge className="bg-yellow-500 text-yellow-900 px-4 py-2 text-sm font-semibold shadow-lg">
                  {gym.category || "Premium"}
                </Badge>
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-bold">4.8</span>
                  <span className="text-sm opacity-90">(128 reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <div>
            <Card className="p-6 h-fit shadow-xl bg-white border-0">
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">{gym.business_name}</h1>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-orange-500">
                      {gym.monthly_price ? `₹${gym.monthly_price}` : `₹${gym.session_price}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {gym.monthly_price ? "/month" : "/session"}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">{gym.city}, {gym.state}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{gym.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <span className="text-gray-700">{gym.opening_time} - {gym.closing_time}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-orange-500" />
                    <span className="text-gray-700">{gym.phone}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button 
                    onClick={() => handleBooking("Monthly")}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Book Membership Now
                  </Button>
                  <Button 
                    onClick={handleCallNow}
                    variant="outline" 
                    className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold py-3 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Call Now
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - About & Amenities */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card className="p-8 shadow-lg bg-white border-0">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">About {gym.business_name}</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {gym.description || "Experience state-of-the-art fitness facilities with premium equipment and expert trainers. Our modern gym offers a complete wellness experience with personalized training programs designed to help you achieve your fitness goals."}
              </p>
            </Card>

            {/* Amenities Section */}
            {gym.amenities && gym.amenities.length > 0 && (
              <Card className="p-8 shadow-lg bg-white border-0">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Amenities & Features</h2>
                <div className="grid grid-cols-2 gap-4">
                  {gym.amenities.map((amenity: string) => (
                    <div key={amenity} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Membership Plans */}
          <div>
            <Card className="p-8 shadow-lg bg-white border-0">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Membership Plans</h2>
              <div className="space-y-6">
                {membershipPlans.map((plan) => (
                  <div key={plan.name} className={`relative border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${plan.popular ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-orange-500 text-white px-4 py-1 text-sm font-bold">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{plan.name}</h3>
                      <div className="flex items-baseline justify-center space-x-1">
                        <span className="text-3xl font-bold text-orange-500">{plan.price}</span>
                      </div>
                      <p className="text-gray-600 mt-1">{plan.duration}</p>
                    </div>
                    
                    {plan.savings && (
                      <div className="text-center mb-4">
                        <Badge className="bg-green-500 text-white text-sm px-3 py-1">
                          Save {plan.savings}
                        </Badge>
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => handleBooking(plan.name)}
                      className={`w-full font-bold py-3 text-lg transition-all duration-300 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                          : 'bg-gray-100 hover:bg-orange-500 text-gray-700 hover:text-white border-2 border-gray-200 hover:border-orange-500'
                      }`}
                    >
                      Book {plan.name}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        businessId={gym.id}
        businessName={gym.business_name}
        businessType={`Gym ${selectedPlan}`}
        price={membershipPlans.find(p => p.name === selectedPlan)?.price || (gym.monthly_price ? `₹${gym.monthly_price}` : `₹${gym.session_price}`)}
      />
    </div>
  );
};

export default GymDetails;
