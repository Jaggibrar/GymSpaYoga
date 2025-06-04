
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, Phone, Yoga as YogaIcon, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Yoga = () => {
  const yogaListings = [
    {
      id: 1,
      name: "Zen Yoga Studio",
      category: "Standard",
      rating: 4.7,
      location: "Indiranagar, Bangalore",
      price: "₹1,200/month",
      image: "/placeholder.svg",
      classes: ["Hatha Yoga", "Vinyasa", "Meditation", "Prenatal Yoga", "Yin Yoga"],
      hours: "6:00 AM - 9:00 PM",
      phone: "+91 98765 43230"
    },
    {
      id: 2,
      name: "Blissful Yoga Retreat",
      category: "Luxury",
      rating: 4.9,
      location: "Worli, Mumbai",
      price: "₹2,800/month",
      image: "/placeholder.svg",
      classes: ["Ashtanga", "Hot Yoga", "Aerial Yoga", "Sound Healing", "Workshops"],
      hours: "5:30 AM - 10:00 PM",
      phone: "+91 98765 43231"
    },
    {
      id: 3,
      name: "Community Yoga Center",
      category: "Budget Friendly",
      rating: 4.4,
      location: "Karol Bagh, Delhi",
      price: "₹800/month",
      image: "/placeholder.svg",
      classes: ["Basic Hatha", "Beginner Vinyasa", "Meditation"],
      hours: "6:30 AM - 8:00 PM",
      phone: "+91 98765 43232"
    },
    {
      id: 4,
      name: "Sacred Space Yoga",
      category: "Luxury",
      rating: 4.8,
      location: "Koregaon Park, Pune",
      price: "₹2,200/month",
      image: "/placeholder.svg",
      classes: ["Iyengar Yoga", "Restorative", "Philosophy Classes", "Teacher Training"],
      hours: "6:00 AM - 9:30 PM",
      phone: "+91 98765 43233"
    },
    {
      id: 5,
      name: "Mindful Movement Studio",
      category: "Standard",
      rating: 4.6,
      location: "HSR Layout, Bangalore",
      price: "₹1,500/month",
      image: "/placeholder.svg",
      classes: ["Power Yoga", "Gentle Flow", "Kids Yoga", "Senior Yoga"],
      hours: "6:00 AM - 8:30 PM",
      phone: "+91 98765 43234"
    },
    {
      id: 6,
      name: "Simple Yoga Space",
      category: "Budget Friendly",
      rating: 4.3,
      location: "Thane West, Mumbai",
      price: "₹600/month",
      image: "/placeholder.svg",
      classes: ["Basic Yoga", "Breathing Exercises", "Simple Meditation"],
      hours: "7:00 AM - 7:00 PM",
      phone: "+91 98765 43235"
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <YogaIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/register-business">
                <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                  List Your Business
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
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
              Find Your Perfect 
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Yoga </span>
              Practice
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover peaceful yoga studios and experienced instructors for mind, body, and soul wellness
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Search yoga studios..." 
                  className="pl-10 border-gray-200 focus:border-green-500"
                />
              </div>
              <Select>
                <SelectTrigger className="border-gray-200 focus:border-green-500">
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
                <SelectTrigger className="border-gray-200 focus:border-green-500">
                  <SelectValue placeholder="Yoga Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hatha">Hatha Yoga</SelectItem>
                  <SelectItem value="vinyasa">Vinyasa</SelectItem>
                  <SelectItem value="ashtanga">Ashtanga</SelectItem>
                  <SelectItem value="iyengar">Iyengar</SelectItem>
                  <SelectItem value="hot">Hot Yoga</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
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

      {/* Yoga Listings */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {yogaListings.length} Yoga Studios Found
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
            {yogaListings.map((studio) => (
              <Card key={studio.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="flex">
                  <div className="relative w-1/3">
                    <img 
                      src={studio.image} 
                      alt={studio.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className={`absolute top-4 right-4 ${getCategoryColor(studio.category)}`}>
                      {studio.category}
                    </Badge>
                  </div>
                  <div className="w-2/3 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-1">{studio.name}</h4>
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{studio.rating}</span>
                          <span className="text-sm text-gray-500">(76 reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">{studio.price}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{studio.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">{studio.hours}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span className="text-sm">{studio.phone}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {studio.classes.slice(0, 4).map((yogaClass) => (
                        <Badge key={yogaClass} variant="outline" className="text-xs">
                          {yogaClass}
                        </Badge>
                      ))}
                      {studio.classes.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{studio.classes.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                        Book Class
                      </Button>
                      <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
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
            <Button variant="outline" size="lg" className="border-green-500 text-green-600 hover:bg-green-50">
              Load More Studios
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Yoga;
