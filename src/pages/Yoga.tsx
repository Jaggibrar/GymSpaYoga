
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, Phone, Heart, Search, Filter, Users, Flower } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryTrainers from "@/components/CategoryTrainers";

const Yoga = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const yogaListings = [
    {
      id: 1,
      name: "Zen Yoga Studio",
      category: "Standard",
      rating: 4.7,
      reviews: 124,
      location: "Indiranagar, Bangalore",
      price: "₹1,200/month",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      classes: ["Hatha Yoga", "Vinyasa", "Meditation", "Prenatal Yoga", "Yin Yoga"],
      hours: "6:00 AM - 9:00 PM",
      phone: "+91 98765 43230",
      description: "Traditional yoga studio focusing on mind-body wellness with experienced instructors",
      specialties: ["Meditation Classes", "Beginner Friendly", "Traditional Practices"],
      studentCount: "150+ Active Students"
    },
    {
      id: 2,
      name: "Blissful Yoga Retreat",
      category: "Luxury",
      rating: 4.9,
      reviews: 189,
      location: "Worli, Mumbai",
      price: "₹2,800/month",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      classes: ["Ashtanga", "Hot Yoga", "Aerial Yoga", "Sound Healing", "Workshops"],
      hours: "5:30 AM - 10:00 PM",
      phone: "+91 98765 43231",
      description: "Premium yoga retreat offering advanced practices and holistic wellness programs",
      specialties: ["Advanced Practices", "Wellness Retreats", "Sound Healing"],
      studentCount: "300+ Dedicated Practitioners"
    },
    {
      id: 3,
      name: "Community Yoga Center",
      category: "Budget Friendly",
      rating: 4.4,
      reviews: 87,
      location: "Karol Bagh, Delhi",
      price: "₹800/month",
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      classes: ["Basic Hatha", "Beginner Vinyasa", "Meditation", "Breathing Exercises"],
      hours: "6:30 AM - 8:00 PM",
      phone: "+91 98765 43232",
      description: "Affordable community yoga center making wellness accessible to everyone",
      specialties: ["Community Classes", "Beginner Programs", "Affordable Wellness"],
      studentCount: "80+ Community Members"
    },
    {
      id: 4,
      name: "Sacred Space Yoga",
      category: "Luxury",
      rating: 4.8,
      reviews: 156,
      location: "Koregaon Park, Pune",
      price: "₹2,200/month",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      classes: ["Iyengar Yoga", "Restorative", "Philosophy Classes", "Teacher Training"],
      hours: "6:00 AM - 9:30 PM",
      phone: "+91 98765 43233",
      description: "Sacred space for deeper yoga practice with authentic teachings and philosophy",
      specialties: ["Teacher Training", "Philosophy", "Authentic Practices"],
      studentCount: "200+ Serious Practitioners"
    }
  ];

  const filteredStudios = yogaListings.filter(studio => {
    const matchesSearch = studio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         studio.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || studio.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Futuristic Header */}
      <header className="bg-black/20 backdrop-blur-2xl shadow-2xl sticky top-0 z-50 border-b border-emerald-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 border border-emerald-400/30">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/trainers">
                <Button variant="outline" className="border-emerald-400 text-emerald-400 hover:bg-emerald-400/10 backdrop-blur-sm">
                  Find Instructors
                </Button>
              </Link>
              <Link to="/register-business">
                <Button variant="outline" className="border-emerald-400 text-emerald-400 hover:bg-emerald-400/10 backdrop-blur-sm">
                  List Your Studio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            Find Your Perfect Yoga Practice
          </h2>
          <p className="text-xl text-emerald-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover peaceful yoga studios and experienced instructors for mind, body, and soul wellness
          </p>
        </div>

        {/* Futuristic Filters */}
        <Card className="mb-8 shadow-2xl bg-black/40 backdrop-blur-xl border border-emerald-500/30">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 h-5 w-5" />
                <Input
                  placeholder="Search yoga studios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-black/20 border-emerald-500/30 text-white placeholder:text-emerald-300/70"
                />
              </div>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="h-12 bg-black/20 border-emerald-500/30 text-white">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget (₹500-₹1,200)</SelectItem>
                  <SelectItem value="standard">Standard (₹1,200-₹2,000)</SelectItem>
                  <SelectItem value="luxury">Luxury (₹2,000+)</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="h-12 bg-black/20 border-emerald-500/30 text-white placeholder:text-emerald-300/70"
              />
              <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 h-12 shadow-lg">
                <Filter className="h-5 w-5 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Yoga Studios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredStudios.map((studio) => (
            <Card key={studio.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 bg-black/40 backdrop-blur-xl border border-emerald-500/30">
              <div className="relative overflow-hidden">
                <img 
                  src={studio.image} 
                  alt={studio.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg px-3 py-1">
                  {studio.category}
                </Badge>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{studio.studentCount}</span>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                      {studio.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold text-emerald-200">{studio.rating}</span>
                      <span className="text-gray-400">({studio.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-400">{studio.price}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-2 text-emerald-400" />
                    <span>{studio.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="h-4 w-4 mr-2 text-emerald-400" />
                    <span>{studio.hours}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-4 w-4 mr-2 text-emerald-400" />
                    <span>{studio.phone}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{studio.description}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {studio.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs border-emerald-500/30 text-emerald-300 justify-center">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {studio.classes.slice(0, 4).map((yogaClass) => (
                    <Badge key={yogaClass} variant="outline" className="text-xs border-green-500/30 text-green-300">
                      {yogaClass}
                    </Badge>
                  ))}
                  {studio.classes.length > 4 && (
                    <Badge variant="outline" className="text-xs border-green-500/30 text-green-300">
                      +{studio.classes.length - 4} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <Link to={`/yoga/${studio.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      View Details
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-emerald-400 text-emerald-400 hover:bg-emerald-400/10">
                    Book Class
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Yoga Instructors Section */}
      <CategoryTrainers category="yoga" />
    </div>
  );
};

export default Yoga;
