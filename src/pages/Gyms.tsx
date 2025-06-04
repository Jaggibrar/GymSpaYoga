
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, Dumbbell, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryTrainers from "@/components/CategoryTrainers";

const Gyms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Mock gym data
  const gyms = [
    {
      id: 1,
      name: "Elite Fitness Hub",
      category: "Luxury",
      rating: 4.8,
      reviews: 128,
      location: "Bandra West, Mumbai",
      price: "₹2,500/month",
      image: "/placeholder.svg",
      amenities: ["AC", "Parking", "Locker", "Personal Trainer"],
      hours: "5:00 AM - 11:00 PM"
    },
    {
      id: 2,
      name: "PowerHouse Gym",
      category: "Standard",
      rating: 4.5,
      reviews: 89,
      location: "Koregaon Park, Pune",
      price: "₹1,800/month",
      image: "/placeholder.svg",
      amenities: ["AC", "Locker", "Steam Room"],
      hours: "6:00 AM - 10:00 PM"
    },
    {
      id: 3,
      name: "FitZone Express",
      category: "Budget",
      rating: 4.2,
      reviews: 156,
      location: "Indiranagar, Bangalore",
      price: "₹1,200/month",
      image: "/placeholder.svg",
      amenities: ["Basic Equipment", "Locker"],
      hours: "6:00 AM - 9:00 PM"
    },
    {
      id: 4,
      name: "Muscle Factory",
      category: "Luxury",
      rating: 4.9,
      reviews: 203,
      location: "CP, New Delhi",
      price: "₹3,000/month",
      image: "/placeholder.svg",
      amenities: ["AC", "Parking", "Locker", "Pool", "Sauna"],
      hours: "5:00 AM - 11:00 PM"
    }
  ];

  const filteredGyms = gyms.filter(gym => {
    const matchesSearch = gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gym.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || gym.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                <Dumbbell className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/trainers">
                <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                  Find Trainers
                </Button>
              </Link>
              <Link to="/register-business">
                <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                  List Your Gym
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Find the Perfect Gym
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover state-of-the-art fitness centers near you with top-notch equipment and expert trainers
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search gyms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget (₹1,000-₹1,500)</SelectItem>
                  <SelectItem value="standard">Standard (₹1,500-₹2,500)</SelectItem>
                  <SelectItem value="luxury">Luxury (₹2,500+)</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="h-12"
              />
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 h-12">
                <Filter className="h-5 w-5 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Gyms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredGyms.map((gym) => (
            <Card key={gym.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 bg-white/90 backdrop-blur-sm">
              <div className="relative overflow-hidden">
                <img 
                  src={gym.image} 
                  alt={gym.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 shadow-lg">
                  {gym.category}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">{gym.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">{gym.rating}</span>
                      <span className="text-gray-500">({gym.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">{gym.price}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3" />
                    <span>{gym.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-3" />
                    <span>{gym.hours}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {gym.amenities.map((amenity) => (
                    <Badge key={amenity} variant="outline" className="text-sm">
                      {amenity}
                    </Badge>
                  ))}
                </div>
                <Link to={`/gym/${gym.id}`}>
                  <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Gym Trainers Section */}
      <CategoryTrainers category="gym" />
    </div>
  );
};

export default Gyms;
