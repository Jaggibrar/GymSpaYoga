
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, Clock, Phone, Dumbbell, Users, Wifi, Car, Shield, Camera, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const GymDetails = () => {
  const { id } = useParams();

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
        { name: "Monthly", price: "₹2,500", duration: "1 Month" },
        { name: "Quarterly", price: "₹6,500", duration: "3 Months", savings: "₹1,000" },
        { name: "Annual", price: "₹24,000", duration: "12 Months", savings: "₹6,000" }
      ]
    }
  };

  const gym = gymData[id as keyof typeof gymData] || gymData[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/gyms" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Gyms</span>
            </Link>
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="relative h-96 rounded-2xl overflow-hidden mb-6">
              <img src={gym.images[0]} alt={gym.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-500 hover:bg-yellow-600">
                  {gym.category}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {gym.images.slice(1).map((image, index) => (
                <div key={index} className="relative h-48 rounded-xl overflow-hidden">
                  <img src={image} alt={`${gym.name} ${index + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{gym.name}</h1>
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold">{gym.rating}</span>
                    <span className="text-gray-500">({gym.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-red-600">{gym.price}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{gym.location}</p>
                    <p className="text-sm text-gray-600">{gym.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span>{gym.hours}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>{gym.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span>{gym.trainers} Expert Trainers</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-lg py-3">
                  Book Now
                </Button>
                <Button variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-50">
                  Call Now
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">About {gym.name}</h2>
              <p className="text-gray-600 leading-relaxed">{gym.description}</p>
            </Card>

            {/* Equipment */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Equipment & Facilities</h2>
              <div className="grid grid-cols-2 gap-3">
                {gym.equipment.map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Amenities */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {gym.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline" className="px-3 py-1">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Membership Plans */}
          <div>
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Membership Plans</h2>
              <div className="space-y-4">
                {gym.membershipPlans.map((plan) => (
                  <div key={plan.name} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{plan.name}</h3>
                      <span className="text-xl font-bold text-red-600">{plan.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{plan.duration}</p>
                    {plan.savings && (
                      <Badge className="bg-green-500 hover:bg-green-600 text-xs">
                        Save {plan.savings}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymDetails;
