
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, Clock, Phone, Dumbbell, Users, ArrowLeft } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!gym) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center mobile-container">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Gym not found</h2>
          <Link to="/gyms">
            <Button className="touch-target">Back to Gyms</Button>
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
      price: gym.session_price ? `₹${gym.session_price}` : "₹500", 
      duration: "1 Day", 
      savings: null 
    },
    { 
      name: "Monthly", 
      price: gym.monthly_price ? `₹${gym.monthly_price}` : "₹2,500", 
      duration: "1 Month", 
      savings: null 
    },
    { 
      name: "Quarterly", 
      price: gym.monthly_price ? `₹${gym.monthly_price * 3 * 0.9}` : "₹6,500", 
      duration: "3 Months", 
      savings: gym.monthly_price ? `₹${gym.monthly_price * 3 * 0.1}` : "₹1,000"
    },
    { 
      name: "Annual", 
      price: gym.monthly_price ? `₹${gym.monthly_price * 12 * 0.8}` : "₹24,000", 
      duration: "12 Months", 
      savings: gym.monthly_price ? `₹${gym.monthly_price * 12 * 0.2}` : "₹6,000"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Mobile-optimized Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
        <div className="mobile-container py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link to="/gyms" className="flex items-center space-x-2 hover:text-red-600 transition-colors duration-300 touch-target">
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-sm md:text-base">Back</span>
            </Link>
            <Link to="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="h-8 w-8 md:h-12 md:w-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                <Dumbbell className="h-4 w-4 md:h-7 md:w-7 text-white" />
              </div>
              <h1 className="text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="mobile-container py-4 md:py-8">
        {/* Mobile-first Hero Section */}
        <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={gym.image_urls[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"} 
                alt={gym.business_name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <Badge className="bg-yellow-500 hover:bg-yellow-600 shadow-lg px-3 py-2 text-sm md:text-base">
                  {gym.category}
                </Badge>
              </div>
            </div>
            
            {gym.image_urls.length > 1 && (
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                {gym.image_urls.slice(1, 3).map((image: string, index: number) => (
                  <div key={index} className="relative h-24 sm:h-32 md:h-48 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
                    <img src={image} alt={`${gym.business_name} ${index + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile-optimized Info Card */}
          <div className="space-y-4 md:space-y-6">
            <Card className="p-4 md:p-6 shadow-2xl bg-white/90 backdrop-blur-sm">
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 line-clamp-2">{gym.business_name}</h1>
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-base md:text-lg font-semibold">4.8</span>
                    <span className="text-gray-500 text-sm md:text-base">(128 reviews)</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-red-600">
                      {gym.monthly_price ? `₹${gym.monthly_price}/month` : `₹${gym.session_price}/session`}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm md:text-base lg:text-lg">{gym.city}, {gym.state}</p>
                      <p className="text-gray-600 text-xs md:text-sm lg:text-base line-clamp-2">{gym.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-gray-400 flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">{gym.opening_time} - {gym.closing_time}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 md:h-5 md:w-5 text-gray-400 flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">{gym.phone}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3 md:space-y-4">
                  <Button 
                    onClick={() => handleBooking("Monthly")}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-sm md:text-base lg:text-lg py-3 md:py-4 shadow-lg hover:shadow-xl touch-target"
                  >
                    Book Membership Now
                  </Button>
                  <Button 
                    onClick={handleCallNow}
                    variant="outline" 
                    className="w-full border-red-500 text-red-600 hover:bg-red-50 text-sm md:text-base lg:text-lg py-3 shadow-lg hover:shadow-xl touch-target"
                  >
                    Call Now
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Mobile-optimized Details Section */}
        <div className="mt-6 md:mt-8 space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* About */}
            <Card className="p-4 md:p-6 lg:p-8 shadow-xl bg-white/90 backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-gray-800">About {gym.business_name}</h2>
              <p className="text-gray-600 leading-relaxed mobile-text md:text-base lg:text-lg">
                {gym.description || "State-of-the-art fitness facility with premium equipment and expert trainers. Our luxury gym offers a complete wellness experience with modern amenities and personalized training programs."}
              </p>
            </Card>

            {/* Amenities */}
            {gym.amenities && gym.amenities.length > 0 && (
              <Card className="p-4 md:p-6 lg:p-8 shadow-xl bg-white/90 backdrop-blur-sm">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Amenities</h2>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {gym.amenities.map((amenity: string) => (
                    <Badge key={amenity} variant="outline" className="px-2 md:px-3 lg:px-4 py-1 md:py-2 text-xs md:text-sm lg:text-base border-red-500 text-red-600 hover:bg-red-50">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Mobile-optimized Membership Plans */}
          <div>
            <Card className="p-4 md:p-6 lg:p-8 shadow-xl bg-white/90 backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Membership Plans</h2>
              <div className="space-y-4 md:space-y-6">
                {membershipPlans.map((plan) => (
                  <div key={plan.name} className="border-2 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 hover:border-red-500 transition-all duration-300 hover:shadow-lg">
                    <div className="flex justify-between items-start mb-2 md:mb-3">
                      <h3 className="font-bold text-base md:text-lg lg:text-xl">{plan.name}</h3>
                      <span className="text-lg md:text-xl lg:text-2xl font-bold text-red-600">{plan.price}</span>
                    </div>
                    <p className="text-gray-600 mb-2 md:mb-3 text-sm md:text-base lg:text-lg">{plan.duration}</p>
                    {plan.savings && (
                      <Badge className="bg-green-500 hover:bg-green-600 mb-2 md:mb-3 text-xs md:text-sm">
                        Save {plan.savings}
                      </Badge>
                    )}
                    <Button 
                      onClick={() => handleBooking(plan.name)}
                      className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 mt-2 md:mt-3 touch-target text-sm md:text-base"
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
