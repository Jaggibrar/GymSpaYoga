
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Phone, Mail, Dumbbell, Waves, Heart, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Trainers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");

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
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                <Dumbbell className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/register-trainer">
                <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                  Become a Trainer
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
    </div>
  );
};

export default Trainers;
