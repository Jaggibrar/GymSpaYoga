
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, Phone, Waves, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Spas = () => {
  const spaListings = [
    {
      id: 1,
      name: "Serenity Spa & Wellness",
      category: "Luxury",
      rating: 4.9,
      location: "Koregaon Park, Pune",
      price: "₹3,500/session",
      image: "/placeholder.svg",
      services: ["Swedish Massage", "Aromatherapy", "Facial", "Body Wrap", "Sauna", "Steam Bath"],
      hours: "9:00 AM - 9:00 PM",
      phone: "+91 98765 43220"
    },
    {
      id: 2,
      name: "Bliss Wellness Center",
      category: "Standard",
      rating: 4.6,
      location: "Bandra West, Mumbai",
      price: "₹2,200/session",
      image: "/placeholder.svg",
      services: ["Deep Tissue Massage", "Hot Stone", "Facial", "Manicure"],
      hours: "10:00 AM - 8:00 PM",
      phone: "+91 98765 43221"
    },
    {
      id: 3,
      name: "Relax Spa Studio",
      category: "Budget Friendly",
      rating: 4.3,
      location: "Indiranagar, Bangalore",
      price: "₹1,200/session",
      image: "/placeholder.svg",
      services: ["Thai Massage", "Foot Massage", "Basic Facial"],
      hours: "10:00 AM - 7:00 PM",
      phone: "+91 98765 43222"
    },
    {
      id: 4,
      name: "Royal Spa Retreat",
      category: "Luxury",
      rating: 4.8,
      location: "Vasant Vihar, Delhi",
      price: "₹4,200/session",
      image: "/placeholder.svg",
      services: ["Ayurvedic Massage", "Couples Massage", "Body Scrub", "Jacuzzi", "Pool Access"],
      hours: "8:00 AM - 10:00 PM",
      phone: "+91 98765 43223"
    },
    {
      id: 5,
      name: "Harmony Day Spa",
      category: "Standard",
      rating: 4.5,
      location: "Cyber City, Gurgaon",
      price: "₹1,800/session",
      image: "/placeholder.svg",
      services: ["Relaxation Massage", "Anti-aging Facial", "Pedicure"],
      hours: "9:00 AM - 8:00 PM",
      phone: "+91 98765 43224"
    },
    {
      id: 6,
      name: "Zen Wellness Spa",
      category: "Budget Friendly",
      rating: 4.2,
      location: "Andheri East, Mumbai",
      price: "₹999/session",
      image: "/placeholder.svg",
      services: ["Express Massage", "Basic Facial", "Head Massage"],
      hours: "11:00 AM - 7:00 PM",
      phone: "+91 98765 43225"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/register-business">
                <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                  List Your Business
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
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
              Discover Luxury 
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Spas </span>
              & Wellness Centers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Indulge in premium wellness treatments and rejuvenating experiences
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Search spas..." 
                  className="pl-10 border-gray-200 focus:border-blue-500"
                />
              </div>
              <Select>
                <SelectTrigger className="border-gray-200 focus:border-blue-500">
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
                <SelectTrigger className="border-gray-200 focus:border-blue-500">
                  <SelectValue placeholder="Treatment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="massage">Massage</SelectItem>
                  <SelectItem value="facial">Facial</SelectItem>
                  <SelectItem value="body-treatment">Body Treatment</SelectItem>
                  <SelectItem value="couples">Couples Treatment</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
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

      {/* Spa Listings */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {spaListings.length} Spas Found
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
            {spaListings.map((spa) => (
              <Card key={spa.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="flex">
                  <div className="relative w-1/3">
                    <img 
                      src={spa.image} 
                      alt={spa.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className={`absolute top-4 right-4 ${getCategoryColor(spa.category)}`}>
                      {spa.category}
                    </Badge>
                  </div>
                  <div className="w-2/3 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-1">{spa.name}</h4>
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{spa.rating}</span>
                          <span className="text-sm text-gray-500">(89 reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">{spa.price}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{spa.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">{spa.hours}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span className="text-sm">{spa.phone}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {spa.services.slice(0, 4).map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {spa.services.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{spa.services.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                        Book Treatment
                      </Button>
                      <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
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
            <Button variant="outline" size="lg" className="border-blue-500 text-blue-600 hover:bg-blue-50">
              Load More Spas
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Spas;
