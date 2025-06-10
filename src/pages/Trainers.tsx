import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Phone, Mail, Dumbbell, Waves, Heart, Search, Filter, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const Trainers = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  // Mock trainers data
  const trainers = [
    {
      id: 1,
      name: "Rahul Sharma",
      category: "gym",
      rating: 4.9,
      reviews: 156,
      experience: 8,
      hourlyRate: 1500,
      location: "Mumbai",
      specializations: ["Weight Training", "Bodybuilding", "HIIT"],
      image: "/placeholder.svg",
      bio: "Certified personal trainer with 8 years of experience in bodybuilding and strength training.",
      certifications: ["NASM-CPT", "ACSM", "Nutrition Specialist"]
    },
    {
      id: 2,
      name: "Priya Patel",
      category: "yoga",
      rating: 4.8,
      reviews: 89,
      experience: 6,
      hourlyRate: 1200,
      location: "Pune",
      specializations: ["Hatha Yoga", "Meditation", "Prenatal Yoga"],
      image: "/placeholder.svg",
      bio: "Experienced yoga instructor specializing in traditional Hatha yoga and mindfulness meditation.",
      certifications: ["RYT-500", "Prenatal Yoga Certified"]
    },
    {
      id: 3,
      name: "Meera Singh",
      category: "spa",
      rating: 4.7,
      reviews: 234,
      experience: 10,
      hourlyRate: 2000,
      location: "Bangalore",
      specializations: ["Deep Tissue", "Aromatherapy", "Hot Stone"],
      image: "/placeholder.svg",
      bio: "Master therapist with expertise in various massage techniques and holistic wellness.",
      certifications: ["Licensed Massage Therapist", "Aromatherapy Specialist"]
    },
    {
      id: 4,
      name: "Vikram Rao",
      category: "gym",
      rating: 4.9,
      reviews: 178,
      experience: 12,
      hourlyRate: 1800,
      location: "Delhi",
      specializations: ["CrossFit", "Functional Training", "Sports Conditioning"],
      image: "/placeholder.svg",
      bio: "Former athlete turned fitness coach, specializing in high-intensity functional training.",
      certifications: ["CrossFit Level 3", "NSCA-CSCS"]
    }
  ];

  const categories = [
    { value: "all", label: "All Categories", icon: Dumbbell },
    { value: "gym", label: "Gym Trainers", icon: Dumbbell },
    { value: "spa", label: "Spa Therapists", icon: Waves },
    { value: "yoga", label: "Yoga Instructors", icon: Heart }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "gym": return <Dumbbell className="h-5 w-5" />;
      case "spa": return <Waves className="h-5 w-5" />;
      case "yoga": return <Heart className="h-5 w-5" />;
      default: return <Dumbbell className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "gym": return "from-red-500 to-orange-500";
      case "spa": return "from-blue-500 to-cyan-500";
      case "yoga": return "from-green-500 to-emerald-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainer.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || trainer.category === categoryFilter;
    const matchesLocation = !locationFilter || trainer.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="h-8 md:h-10 w-8 md:w-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-emerald-200">
                <div className="relative">
                  <Heart className="h-4 md:h-6 w-4 md:w-6 text-white animate-pulse group-hover:animate-bounce" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping group-hover:animate-none"></div>
                </div>
              </div>
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent hover:from-emerald-700 hover:to-blue-700 transition-all duration-300">
                GymSpaYoga
              </h1>
            </Link>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link to="/">
                <Button variant="outline" className="text-xs md:text-sm">
                  Home
                </Button>
              </Link>
              <Link to="/register-trainer">
                <Button variant="outline" className="text-xs md:text-sm border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                  Become a Trainer
                </Button>
              </Link>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="text-xs md:text-sm text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-3 w-3 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Find Your Perfect Trainer
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with certified trainers, therapists, and instructors for personalized fitness and wellness guidance
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search trainers or specializations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Category" />
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
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="h-12"
              />
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 h-12">
                <Filter className="h-5 w-5 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrainers.map((trainer) => (
            <Card key={trainer.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 bg-white/90 backdrop-blur-sm">
              <div className="relative">
                <img 
                  src={trainer.image} 
                  alt={trainer.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`bg-gradient-to-r ${getCategoryColor(trainer.category)} text-white shadow-lg`}>
                    <div className="flex items-center space-x-1">
                      {getCategoryIcon(trainer.category)}
                      <span className="capitalize">{trainer.category}</span>
                    </div>
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{trainer.rating}</span>
                      <span className="text-sm text-gray-500">({trainer.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                      {trainer.name}
                    </CardTitle>
                    <p className="text-gray-600">{trainer.experience} years experience</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">₹{trainer.hourlyRate}</p>
                    <p className="text-sm text-gray-500">per hour</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{trainer.location}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2">{trainer.bio}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {trainer.specializations.slice(0, 2).map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {trainer.specializations.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{trainer.specializations.length - 2} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300">
                      Book Session
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-emerald-50">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-blue-50">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTrainers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No trainers found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <div className="h-10 md:h-12 w-10 md:w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Heart className="h-5 md:h-6 w-5 md:w-6 text-white" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold">GymSpaYoga</h4>
              </div>
              <p className="text-gray-300 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
                Your ultimate destination for fitness, wellness, and mindfulness. 
                Discover the best gyms, spas, and yoga studios in your area.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 md:mb-6 text-lg md:text-xl text-emerald-400">Quick Links</h5>
              <ul className="space-y-2 md:space-y-3 text-gray-300">
                <li><Link to="/gyms" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Gyms</Link></li>
                <li><Link to="/spas" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Spas</Link></li>
                <li><Link to="/yoga" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Yoga</Link></li>
                <li><Link to="/trainers" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Trainers</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 md:mb-6 text-lg md:text-xl text-blue-400">For Business</h5>
              <ul className="space-y-2 md:space-y-3 text-gray-300">
                <li><Link to="/register-business" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">List Your Business</Link></li>
                <li><Link to="/register-trainer" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Join as Trainer</Link></li>
                <li><Link to="/manage-bookings" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Manage Bookings</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Pricing</Link></li>
                <li><Link to="/support" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 md:mb-6 text-lg md:text-xl text-purple-400">Contact Info</h5>
              <div className="space-y-2 md:space-y-3 text-gray-300">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm md:text-base">Kolkata, West Bengal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm md:text-base">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm md:text-base">info@gymspayoga.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0 text-sm md:text-base">
                © 2024 GymSpaYoga. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">About</Link>
                <Link to="/blogs" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Blogs</Link>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Support</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Trainers;
