
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, Phone, Dumbbell, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Gyms = () => {
  const gymListings = [
    {
      id: 1,
      name: "Elite Fitness Hub",
      category: "Luxury",
      rating: 4.8,
      location: "Bandra West, Mumbai",
      price: "₹2,500/month",
      image: "/placeholder.svg",
      amenities: ["AC", "Parking", "Locker", "Personal Trainer", "Sauna", "Swimming Pool"],
      hours: "5:00 AM - 11:00 PM",
      phone: "+91 98765 43210"
    },
    {
      id: 2,
      name: "PowerZone Fitness",
      category: "Standard",
      rating: 4.5,
      location: "Koregaon Park, Pune",
      price: "₹1,800/month",
      image: "/placeholder.svg",
      amenities: ["AC", "Parking", "Locker", "Group Classes"],
      hours: "6:00 AM - 10:00 PM",
      phone: "+91 98765 43211"
    },
    {
      id: 3,
      name: "Budget Fitness Center",
      category: "Budget Friendly",
      rating: 4.2,
      location: "Whitefield, Bangalore",
      price: "₹999/month",
      image: "/placeholder.svg",
      amenities: ["Locker", "Basic Equipment"],
      hours: "6:00 AM - 9:00 PM",
      phone: "+91 98765 43212"
    },
    {
      id: 4,
      name: "Iron Paradise Gym",
      category: "Luxury",
      rating: 4.9,
      location: "Sector 18, Gurgaon",
      price: "₹3,200/month",
      image: "/placeholder.svg",
      amenities: ["AC", "Parking", "Locker", "Personal Trainer", "Nutrition Counseling", "Spa"],
      hours: "24/7",
      phone: "+91 98765 43213"
    },
    {
      id: 5,
      name: "FitZone Express",
      category: "Standard",
      rating: 4.4,
      location: "Kalyani Nagar, Pune",
      price: "₹1,500/month",
      image: "/placeholder.svg",
      amenities: ["AC", "Parking", "Group Classes", "Yoga Classes"],
      hours: "5:30 AM - 10:30 PM",
      phone: "+91 98765 43214"
    },
    {
      id: 6,
      name: "Community Fitness Hub",
      category: "Budget Friendly",
      rating: 4.1,
      location: "Malviya Nagar, Delhi",
      price: "₹800/month",
      image: "/placeholder.svg",
      amenities: ["Basic Equipment", "Group Classes"],
      hours: "6:00 AM - 9:00 PM",
      phone: "+91 98765 43215"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Luxury": return "bg-yellow-500 hover:bg-yellow-600";
      case "Standard": return "bg-blue-500 hover:bg-blue-600";
      case "Budget Friendly": return "bg-green-500 hover:bg-green-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/register-business">
                <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                  List Your Business
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Find the Perfect 
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"> Gym </span>
              for You
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover top-rated fitness centers with state-of-the-art equipment and expert trainers
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Search gyms..." 
                  className="pl-10 border-gray-200 focus:border-red-500"
                />
              </div>
              <Select>
                <SelectTrigger className="border-gray-200 focus:border-red-500">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="border-gray-200 focus:border-red-500">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="budget">Budget Friendly</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="px-4 py-2 text-sm bg-yellow-500 hover:bg-yellow-600 cursor-pointer">💎 Luxury</Badge>
            <Badge className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 cursor-pointer">⭐ Standard</Badge>
            <Badge className="px-4 py-2 text-sm bg-green-500 hover:bg-green-600 cursor-pointer">💰 Budget Friendly</Badge>
            <Badge className="px-4 py-2 text-sm bg-purple-500 hover:bg-purple-600 cursor-pointer">📍 Nearby</Badge>
          </div>
        </div>
      </section>

      {/* Gym Listings */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {gymListings.length} Gyms Found
            </h3>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {gymListings.map((gym) => (
              <Card key={gym.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="flex">
                  <div className="relative w-1/3">
                    <img 
                      src={gym.image} 
                      alt={gym.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className={`absolute top-4 right-4 ${getCategoryColor(gym.category)}`}>
                      {gym.category}
                    </Badge>
                  </div>
                  <div className="w-2/3 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-1">{gym.name}</h4>
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{gym.rating}</span>
                          <span className="text-sm text-gray-500">(128 reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-red-600">{gym.price}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{gym.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">{gym.hours}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span className="text-sm">{gym.phone}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {gym.amenities.slice(0, 4).map((amenity) => (
                        <Badge key={amenity} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {gym.amenities.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{gym.amenities.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                        Book Now
                      </Button>
                      <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-red-500 text-red-600 hover:bg-red-50">
              Load More Gyms
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gyms;
