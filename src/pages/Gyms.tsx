
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, Dumbbell, Search, Filter, Users, Wifi, Car, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import CategoryTrainers from "@/components/CategoryTrainers";

const Gyms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Enhanced gym data with complete information
  const gyms = [
    {
      id: 1,
      name: "Elite Fitness Hub",
      category: "Luxury",
      rating: 4.8,
      reviews: 128,
      location: "Bandra West, Mumbai",
      price: "₹2,500/month",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "Parking", "Locker", "Personal Trainer", "Sauna", "Pool"],
      hours: "5:00 AM - 11:00 PM",
      description: "Premium fitness center with state-of-the-art equipment and expert trainers",
      memberCount: "500+ Active Members",
      features: ["24/7 Access", "Group Classes", "Nutrition Counseling"]
    },
    {
      id: 2,
      name: "PowerHouse Gym",
      category: "Standard",
      rating: 4.5,
      reviews: 89,
      location: "Koregaon Park, Pune",
      price: "₹1,800/month",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "Locker", "Steam Room", "Yoga Studio"],
      hours: "6:00 AM - 10:00 PM",
      description: "Complete fitness solution with modern equipment and group classes",
      memberCount: "300+ Active Members",
      features: ["Group Classes", "Diet Plans", "Progress Tracking"]
    },
    {
      id: 3,
      name: "FitZone Express",
      category: "Budget",
      rating: 4.2,
      reviews: 156,
      location: "Indiranagar, Bangalore",
      price: "₹1,200/month",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Basic Equipment", "Locker", "Changing Room"],
      hours: "6:00 AM - 9:00 PM",
      description: "Affordable fitness center with essential equipment for all fitness levels",
      memberCount: "200+ Active Members",
      features: ["Basic Training", "Flexible Timing", "Student Discounts"]
    },
    {
      id: 4,
      name: "Muscle Factory",
      category: "Luxury",
      rating: 4.9,
      reviews: 203,
      location: "CP, New Delhi",
      price: "₹3,000/month",
      image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "Parking", "Locker", "Pool", "Sauna", "Spa"],
      hours: "5:00 AM - 11:00 PM",
      description: "Ultimate luxury fitness experience with premium amenities and services",
      memberCount: "800+ Active Members",
      features: ["VIP Training", "Wellness Programs", "Recovery Center"]
    }
  ];

  const filteredGyms = gyms.filter(gym => {
    const matchesSearch = gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gym.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || gym.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesPrice = !priceFilter || 
      (priceFilter === 'budget' && gym.category.toLowerCase() === 'budget') ||
      (priceFilter === 'standard' && gym.category.toLowerCase() === 'standard') ||
      (priceFilter === 'luxury' && gym.category.toLowerCase() === 'luxury');
    
    return matchesSearch && matchesLocation && matchesPrice;
  });

  const handleBookNow = (gymName: string) => {
    toast.success(`Booking initiated for ${gymName}!`);
    // In real app, this would open booking modal
  };

  const handleApplyFilters = () => {
    toast.success("Filters applied successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Mobile Responsive Header */}
      <header className="bg-black/20 backdrop-blur-2xl shadow-2xl sticky top-0 z-50 border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-10 md:h-12 w-10 md:w-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 border border-cyan-400/30">
                <Dumbbell className="h-5 md:h-7 w-5 md:w-7 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link to="/trainers">
                <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 backdrop-blur-sm text-xs md:text-sm">
                  Find Trainers
                </Button>
              </Link>
              <Link to="/register-business">
                <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 backdrop-blur-sm text-xs md:text-sm">
                  List Your Gym
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section - Mobile Responsive */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl">
            Find the Perfect Gym
          </h2>
          <p className="text-lg md:text-xl text-cyan-200 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover state-of-the-art fitness centers with cutting-edge equipment and expert trainers
          </p>
        </div>

        {/* Mobile Responsive Filters */}
        <Card className="mb-6 md:mb-8 shadow-2xl bg-black/40 backdrop-blur-xl border border-cyan-500/30">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-4 md:h-5 w-4 md:w-5" />
                <Input
                  placeholder="Search gyms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 md:pl-10 h-10 md:h-12 bg-black/20 border-cyan-500/30 text-white placeholder:text-cyan-300/70 text-sm md:text-base"
                />
              </div>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="h-10 md:h-12 bg-black/20 border-cyan-500/30 text-white text-sm md:text-base">
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
                className="h-10 md:h-12 bg-black/20 border-cyan-500/30 text-white placeholder:text-cyan-300/70 text-sm md:text-base"
              />
              <Button 
                onClick={handleApplyFilters}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 h-10 md:h-12 shadow-lg text-sm md:text-base"
              >
                <Filter className="h-4 md:h-5 w-4 md:w-5 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Gyms Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {filteredGyms.map((gym) => (
            <Card key={gym.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 bg-black/40 backdrop-blur-xl border border-cyan-500/30">
              <div className="relative overflow-hidden">
                <img 
                  src={gym.image} 
                  alt={gym.name}
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg px-2 md:px-3 py-1 text-xs md:text-sm">
                  {gym.category}
                </Badge>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2">
                    <Users className="h-3 md:h-4 w-3 md:w-4" />
                    <span className="text-xs md:text-sm">{gym.memberCount}</span>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {gym.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Star className="h-4 md:h-5 w-4 md:w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-base md:text-lg font-semibold text-cyan-200">{gym.rating}</span>
                      <span className="text-gray-400 text-sm md:text-base">({gym.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg md:text-2xl font-bold text-cyan-400">{gym.price}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-3 md:h-4 w-3 md:w-4 mr-2 text-cyan-400" />
                    <span className="text-sm md:text-base">{gym.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="h-3 md:h-4 w-3 md:w-4 mr-2 text-cyan-400" />
                    <span className="text-sm md:text-base">{gym.hours}</span>
                  </div>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{gym.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                  {gym.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs border-cyan-500/30 text-cyan-300 justify-center">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
                  {gym.amenities.slice(0, 4).map((amenity) => (
                    <Badge key={amenity} variant="outline" className="text-xs border-blue-500/30 text-blue-300">
                      {amenity}
                    </Badge>
                  ))}
                  {gym.amenities.length > 4 && (
                    <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-300">
                      +{gym.amenities.length - 4} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
                  <Link to={`/gym/${gym.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm md:text-base">
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => handleBookNow(gym.name)}
                    variant="outline" 
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 text-sm md:text-base"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredGyms.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-white mb-4">No gyms found</h3>
            <p className="text-cyan-200 mb-6">Try adjusting your search criteria or filters.</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("");
                setLocationFilter("");
                toast.success("Filters cleared!");
              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Gym Trainers Section */}
      <CategoryTrainers category="gym" />
    </div>
  );
};

export default Gyms;
