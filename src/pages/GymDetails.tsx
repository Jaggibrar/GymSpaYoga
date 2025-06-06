
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, Clock, Phone, Dumbbell, Users, Wifi, Car, Shield, Camera, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import BookingModal from "@/components/BookingModal";

const GymDetails = () => {
  const { id } = useParams();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  // Mock data - in real app this would come from API
  const gymData = {
    1: {
      id: 1,
      name: "Elite Fitness Hub",
      category: "Luxury",
      rating: 4.8,
      reviews: 128,
      location: "Bandra West, Mumbai",
      address: "123 Linking Road, Bandra West, Mumbai 400050",
      price: "₹2,500/month",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      amenities: ["AC", "Parking", "Locker", "Personal Trainer", "Sauna", "Swimming Pool", "Steam Room", "Nutrition Counseling"],
      hours: "5:00 AM - 11:00 PM",
      phone: "+91 98765 43210",
      email: "info@elitefitnesshub.com",
      description: "State-of-the-art fitness facility with premium equipment and expert trainers. Our luxury gym offers a complete wellness experience with modern amenities and personalized training programs.",
      equipment: ["Cardio Machines", "Free Weights", "Functional Training Area", "Cross Training", "Yoga Studio"],
      trainers: 15,
      membershipPlans: [
        { name: "Day Pass", price: "₹500", duration: "1 Day", savings: null },
        { name: "Monthly", price: "₹2,500", duration: "1 Month", savings: null },
        { name: "Quarterly", price: "₹6,500", duration: "3 Months", savings: "₹1,000" },
        { name: "Annual", price: "₹24,000", duration: "12 Months", savings: "₹6,000" }
      ]
    }
  };

  const gymId = Number(id) || 1;
  const gym = gymData[gymId as keyof typeof gymData] || gymData[1];

  const handleCallNow = () => {
    window.open(`tel:${gym.phone}`, '_self');
    toast.success("Opening phone dialer...");
  };

  const handleBooking = (planName: string) => {
    setSelectedPlan(planName);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/gyms" className="flex items-center space-x-2 hover:text-red-600 transition-colors duration-300">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Gyms</span>
            </Link>
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                <Dumbbell className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section - Mobile Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-6 shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img src={gym.images[0]} alt={gym.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute top-6 right-6">
                <Badge className="bg-yellow-500 hover:bg-yellow-600 shadow-lg px-4 py-2 text-lg">
                  {gym.category}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {gym.images.slice(1).map((image, index) => (
                <div key={index} className="relative h-32 md:h-48 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300">
                  <img src={image} alt={`${gym.name} ${index + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-4 md:p-6 shadow-2xl bg-white/90 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{gym.name}</h1>
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="h-5 md:h-6 w-5 md:w-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg md:text-xl font-semibold">{gym.rating}</span>
                    <span className="text-gray-500 text-sm md:text-base">({gym.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl md:text-3xl font-bold text-red-600">{gym.price}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 md:h-6 w-5 md:w-6 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-base md:text-lg">{gym.location}</p>
                    <p className="text-gray-600 text-sm md:text-base">{gym.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 md:h-6 w-5 md:w-6 text-gray-400" />
                  <span className="text-base md:text-lg">{gym.hours}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 md:h-6 w-5 md:w-6 text-gray-400" />
                  <span className="text-base md:text-lg">{gym.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 md:h-6 w-5 md:w-6 text-gray-400" />
                  <span className="text-base md:text-lg">{gym.trainers} Expert Trainers</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <Button 
                  onClick={() => handleBooking("Monthly")}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-lg py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Book Membership Now
                </Button>
                <Button 
                  onClick={handleCallNow}
                  variant="outline" 
                  className="w-full border-red-500 text-red-600 hover:bg-red-50 text-lg py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Call Now
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Details Section - Mobile Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card className="p-6 md:p-8 shadow-xl bg-white/90 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">About {gym.name}</h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">{gym.description}</p>
            </Card>

            {/* Equipment */}
            <Card className="p-6 md:p-8 shadow-xl bg-white/90 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Equipment & Facilities</h2>
              <div className="grid grid-cols-1 gap-4">
                {gym.equipment.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-base md:text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Amenities */}
            <Card className="p-6 md:p-8 shadow-xl bg-white/90 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {gym.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline" className="px-3 md:px-4 py-2 text-sm md:text-lg border-red-500 text-red-600 hover:bg-red-50">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Membership Plans */}
          <div>
            <Card className="p-6 md:p-8 shadow-xl bg-white/90 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Membership Plans</h2>
              <div className="space-y-6">
                {gym.membershipPlans.map((plan) => (
                  <div key={plan.name} className="border-2 rounded-2xl p-4 md:p-6 hover:border-red-500 transition-all duration-300 hover:shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg md:text-xl">{plan.name}</h3>
                      <span className="text-xl md:text-2xl font-bold text-red-600">{plan.price}</span>
                    </div>
                    <p className="text-gray-600 mb-3 text-base md:text-lg">{plan.duration}</p>
                    {plan.savings && (
                      <Badge className="bg-green-500 hover:bg-green-600 mb-3">
                        Save {plan.savings}
                      </Badge>
                    )}
                    <Button 
                      onClick={() => handleBooking(plan.name)}
                      className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 mt-3"
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
        businessName={gym.name}
        businessType={`Gym ${selectedPlan}`}
        price={gym.membershipPlans.find(p => p.name === selectedPlan)?.price || gym.price}
      />
    </div>
  );
};

export default GymDetails;
