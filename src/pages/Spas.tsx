
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, Phone, Waves, Search, Filter, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryTrainers from "@/components/CategoryTrainers";

const Spas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const spaListings = [
    {
      id: 1,
      name: "Serenity Spa & Wellness",
      category: "Luxury",
      rating: 4.9,
      reviews: 156,
      location: "Koregaon Park, Pune",
      price: "₹3,500/session",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: ["Swedish Massage", "Aromatherapy", "Facial", "Body Wrap", "Sauna", "Steam Bath"],
      hours: "9:00 AM - 9:00 PM",
      phone: "+91 98765 43220",
      description: "Luxury wellness retreat offering premium spa treatments in a tranquil environment",
      specialties: ["Hot Stone Therapy", "Couples Massage", "Detox Programs"],
      clientCount: "200+ Happy Clients"
    },
    {
      id: 2,
      name: "Bliss Wellness Center",
      category: "Standard",
      rating: 4.6,
      reviews: 89,
      location: "Bandra West, Mumbai",
      price: "₹2,200/session",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: ["Deep Tissue Massage", "Hot Stone", "Facial", "Manicure", "Pedicure"],
      hours: "10:00 AM - 8:00 PM",
      phone: "+91 98765 43221",
      description: "Complete wellness center with therapeutic treatments and beauty services",
      specialties: ["Therapeutic Massage", "Anti-Aging Treatments", "Wellness Packages"],
      clientCount: "150+ Regular Clients"
    },
    {
      id: 3,
      name: "Relax Spa Studio",
      category: "Budget Friendly",
      rating: 4.3,
      reviews: 67,
      location: "Indiranagar, Bangalore",
      price: "₹1,200/session",
      image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: ["Thai Massage", "Foot Massage", "Basic Facial", "Head Massage"],
      hours: "10:00 AM - 7:00 PM",
      phone: "+91 98765 43222",
      description: "Affordable spa services with traditional massage techniques and relaxation therapies",
      specialties: ["Traditional Thai", "Reflexology", "Express Treatments"],
      clientCount: "100+ Satisfied Clients"
    },
    {
      id: 4,
      name: "Royal Spa Retreat",
      category: "Luxury",
      rating: 4.8,
      reviews: 234,
      location: "Vasant Vihar, Delhi",
      price: "₹4,200/session",
      image: "https://images.unsplash.com/photo-1596178060810-7d7fdb88b4b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: ["Ayurvedic Massage", "Couples Massage", "Body Scrub", "Jacuzzi", "Pool Access"],
      hours: "8:00 AM - 10:00 PM",
      phone: "+91 98765 43223",
      description: "Ultimate luxury spa experience with royal treatments and premium amenities",
      specialties: ["Ayurvedic Treatments", "Royal Packages", "Holistic Wellness"],
      clientCount: "500+ Elite Clients"
    }
  ];

  const filteredSpas = spaListings.filter(spa => {
    const matchesSearch = spa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spa.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || spa.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Futuristic Header */}
      <header className="bg-black/20 backdrop-blur-2xl shadow-2xl sticky top-0 z-50 border-b border-blue-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 border border-blue-400/30">
                <Waves className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/trainers">
                <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400/10 backdrop-blur-sm">
                  Find Therapists
                </Button>
              </Link>
              <Link to="/register-business">
                <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400/10 backdrop-blur-sm">
                  List Your Spa
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
            Luxury Spa Experience
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Indulge in premium wellness treatments and rejuvenating experiences at world-class spas
          </p>
        </div>

        {/* Futuristic Filters */}
        <Card className="mb-8 shadow-2xl bg-black/40 backdrop-blur-xl border border-blue-500/30">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                <Input
                  placeholder="Search spas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-black/20 border-blue-500/30 text-white placeholder:text-blue-300/70"
                />
              </div>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="h-12 bg-black/20 border-blue-500/30 text-white">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget (₹1,000-₹2,000)</SelectItem>
                  <SelectItem value="standard">Standard (₹2,000-₹3,500)</SelectItem>
                  <SelectItem value="luxury">Luxury (₹3,500+)</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="h-12 bg-black/20 border-blue-500/30 text-white placeholder:text-blue-300/70"
              />
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 h-12 shadow-lg">
                <Filter className="h-5 w-5 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Spas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredSpas.map((spa) => (
            <Card key={spa.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 bg-black/40 backdrop-blur-xl border border-blue-500/30">
              <div className="relative overflow-hidden">
                <img 
                  src={spa.image} 
                  alt={spa.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg px-3 py-1">
                  {spa.category}
                </Badge>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{spa.clientCount}</span>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {spa.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold text-blue-200">{spa.rating}</span>
                      <span className="text-gray-400">({spa.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-400">{spa.price}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                    <span>{spa.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="h-4 w-4 mr-2 text-blue-400" />
                    <span>{spa.hours}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-4 w-4 mr-2 text-blue-400" />
                    <span>{spa.phone}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{spa.description}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {spa.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs border-blue-500/30 text-blue-300 justify-center">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {spa.services.slice(0, 4).map((service) => (
                    <Badge key={service} variant="outline" className="text-xs border-cyan-500/30 text-cyan-300">
                      {service}
                    </Badge>
                  ))}
                  {spa.services.length > 4 && (
                    <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-300">
                      +{spa.services.length - 4} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <Link to={`/spa/${spa.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      View Details
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400/10">
                    Book Treatment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Spa Therapists Section */}
      <CategoryTrainers category="spa" />
    </div>
  );
};

export default Spas;
