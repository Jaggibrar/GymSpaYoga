import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, Phone, Dumbbell, Waves, Heart, ArrowRight, Quote, Sparkles, Zap, Shield, Facebook, Instagram, Linkedin, X, Search, Filter, Target, Eye, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import TrainersSection from "@/components/TrainersSection";
import AnimatedHeroGrid from "@/components/AnimatedHeroGrid";
import BookingModal from "@/components/BookingModal";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const Index = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  const categories = [
    {
      title: "Gyms",
      description: "State-of-the-art fitness centers",
      icon: <Dumbbell className="h-6 md:h-8 w-6 md:w-8" />,
      color: "from-cyan-500 to-blue-500",
      link: "/gyms",
      count: "500+"
    },
    {
      title: "Spas",
      description: "Luxury wellness & relaxation",
      icon: <Waves className="h-6 md:h-8 w-6 md:w-8" />,
      color: "from-blue-500 to-purple-500",
      link: "/spas",
      count: "300+"
    },
    {
      title: "Yoga Centers",
      description: "Mind, body & soul harmony",
      icon: <Heart className="h-6 md:h-8 w-6 md:w-8" />,
      color: "from-emerald-500 to-green-500",
      link: "/yoga",
      count: "250+"
    }
  ];

  const featuredListings = [
    {
      id: 1,
      name: "Elite Fitness Hub",
      type: "Gym",
      category: "Luxury",
      rating: 4.8,
      location: "Bandra West, Mumbai",
      price: "₹2,500/month",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "Parking", "Locker"],
      link: "/gym/1"
    },
    {
      id: 2,
      name: "Serenity Spa & Wellness",
      type: "Spa",
      category: "Luxury",
      rating: 4.9,
      location: "Koregaon Park, Pune",
      price: "₹3,500/session",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Massage", "Sauna", "Pool"],
      link: "/spa/1"
    },
    {
      id: 3,
      name: "Zen Yoga Studio",
      type: "Yoga",
      category: "Standard",
      rating: 4.7,
      location: "Indiranagar, Bangalore",
      price: "₹1,200/month",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "Props", "Meditation"],
      link: "/yoga/1"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      text: "Amazing platform! Found my perfect gym within minutes. The booking process is seamless and the trainers are incredible.",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      profession: "Software Engineer"
    },
    {
      name: "Arjun Patel",
      rating: 5,
      text: "The spa recommendations are spot on. Loved the detailed information and easy booking. Best wellness platform ever!",
      location: "Pune",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      profession: "Business Analyst"
    },
    {
      name: "Meera Singh",
      rating: 5,
      text: "Found an incredible yoga studio through this app. The reviews helped me choose perfectly! Life-changing experience.",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      profession: "Marketing Manager"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Members", icon: <Heart className="h-4 md:h-6 w-4 md:w-6" /> },
    { number: "1,000+", label: "Partner Venues", icon: <Shield className="h-4 md:h-6 w-4 md:w-6" /> },
    { number: "500+", label: "Expert Trainers", icon: <Zap className="h-4 md:h-6 w-4 md:w-6" /> },
    { number: "50+", label: "Cities", icon: <Sparkles className="h-4 md:h-6 w-4 md:w-6" /> }
  ];

  const handleSearch = () => {
    if (!searchLocation && !searchCategory) {
      toast.error("Please enter a location or select a category");
      return;
    }
    
    console.log("Searching for:", searchCategory, "in", searchLocation);
    toast.success("Search initiated! Redirecting to results...");
    
    // Navigate based on category
    if (searchCategory === "gym") {
      navigate("/gyms");
    } else if (searchCategory === "spa") {
      navigate("/spas");
    } else if (searchCategory === "yoga") {
      navigate("/yoga");
    } else {
      toast.info("Showing all categories");
    }
  };

  const handleBookNow = (listingName: string) => {
    toast.success(`Booking initiated for ${listingName}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header with Animated Logo */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 md:h-10 w-8 md:w-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center group hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none">
                <Dumbbell className="h-4 md:h-6 w-4 md:w-6 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-emerald-600 transition-all duration-500 cursor-pointer">
                GymSpaYoga
              </h1>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center overflow-x-auto space-x-2 md:space-x-4 scrollbar-hide">
              <Link to="/trainers">
                <Button variant="outline" className="text-xs md:text-sm whitespace-nowrap">
                  Trainers
                </Button>
              </Link>
              <Link to="/blogs">
                <Button variant="outline" className="text-xs md:text-sm whitespace-nowrap">
                  Blogs
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="text-xs md:text-sm whitespace-nowrap">
                  Pricing
                </Button>
              </Link>
              <Link to="/register-business">
                <Button variant="outline" className="text-xs md:text-sm whitespace-nowrap">
                  List Business
                </Button>
              </Link>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="text-xs md:text-sm whitespace-nowrap text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-3 w-3 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-900 via-blue-900 to-teal-900">
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          {/* Main Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 leading-tight animate-fade-in">
              Find Your Center Of
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-emerald-400 mb-6 animate-fade-in">
              Wellness
            </h2>
            <p className="text-lg md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed px-4 animate-fade-in">
              Discover Premium Gyms, Relaxing Spas And Peaceful Yoga Studios All In One Place
            </p>
          </div>

          {/* Animated Hero Grid */}
          <AnimatedHeroGrid />

          {/* Glassmorphic Search Bar */}
          <div className="w-full max-w-4xl px-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Search by location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="h-14 text-lg bg-white/90 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                  />
                  <Select onValueChange={setSearchCategory}>
                    <SelectTrigger className="h-14 text-lg bg-white/90 backdrop-blur-sm border-white/30 focus:border-emerald-500">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-lg border border-white/20 shadow-lg">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="gym">Gym</SelectItem>
                      <SelectItem value="spa">Spa</SelectItem>
                      <SelectItem value="yoga">Yoga Center</SelectItem>
                      <SelectItem value="trainer">Personal Trainer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleSearch}
                  className="h-14 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Wellness Destinations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl mb-4 backdrop-blur-sm">
                  <div className="text-emerald-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center text-gray-800 mb-16">
            Explore by Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.map((category) => (
              <Link key={category.title} to={category.link}>
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-6 cursor-pointer transform hover:scale-105">
                  <CardHeader className="text-center pb-6">
                    <div className={`mx-auto w-28 h-28 bg-gradient-to-r ${category.color} rounded-3xl flex items-center justify-center text-white mb-6 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 shadow-xl`}>
                      {category.icon}
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-xl mb-4">
                      {category.description}
                    </CardDescription>
                    <Badge className="bg-emerald-500 hover:bg-emerald-600">
                      {category.count} Available
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                      Explore {category.title}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings with Smart Booking */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center text-gray-800 mb-16">
            Featured Listings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img 
                    src={listing.image} 
                    alt={listing.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <Badge className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600">
                    {listing.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                        {listing.name}
                      </CardTitle>
                      <p className="text-emerald-600 font-semibold text-lg">{listing.type}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold text-gray-800">{listing.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-3 text-emerald-600" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center text-emerald-600 font-bold text-xl">
                      <span>{listing.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {listing.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-sm">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link to={listing.link}>
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                        View Details
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <BookingModal 
                      businessName={listing.name}
                      businessType={listing.type.toLowerCase()}
                      trigger={
                        <Button variant="outline" className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                          Book Now
                        </Button>
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <TrainersSection />

      {/* User Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center text-gray-800 mb-16">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Quote className="h-8 w-8 text-emerald-600 mr-3" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{testimonial.name}</p>
                      <p className="text-sm text-emerald-600">{testimonial.profession}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission with Icons */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">
            <div className="transform hover:scale-105 transition-all duration-500">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold">Our Vision</h3>
                </div>
                <p className="text-xl leading-relaxed">
                  To become the leading platform that connects wellness seekers with the perfect fitness and wellness destinations, making healthy living accessible to everyone across India and beyond.
                </p>
              </div>
            </div>
            <div className="transform hover:scale-105 transition-all duration-500">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold">Our Mission</h3>
                </div>
                <p className="text-xl leading-relaxed">
                  We strive to simplify the wellness journey by providing comprehensive information, seamless booking experiences, and building a community that supports healthy lifestyle choices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Registration CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto text-center">
          <h3 className="text-6xl font-bold text-white mb-8">
            Own a Gym, Spa, or Yoga Center?
          </h3>
          <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join our platform and reach thousands of potential customers. 
            List your business and start growing today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/register-business">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-xl px-12 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300">
                Register Your Business
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link to="/register-trainer">
              <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 backdrop-blur-sm text-xl px-12 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300">
                Become a Trainer
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">GymSpaYoga</h4>
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Your wellness journey starts here. We connect fitness enthusiasts with the best gyms, spas, and yoga centers across India. Transform your health, transform your life.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mb-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <Facebook className="h-5 w-5 text-white" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <X className="h-5 w-5 text-white" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-800 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <Linkedin className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-emerald-400">For Users</h5>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/gyms" className="hover:text-emerald-400 transition-colors duration-300">Find Gyms</Link></li>
                <li><Link to="/spas" className="hover:text-emerald-400 transition-colors duration-300">Find Spas</Link></li>
                <li><Link to="/yoga" className="hover:text-emerald-400 transition-colors duration-300">Find Yoga Centers</Link></li>
                <li><Link to="/trainers" className="hover:text-emerald-400 transition-colors duration-300">Find Trainers</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors duration-300">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-blue-400">For Business</h5>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/register-business" className="hover:text-blue-400 transition-colors duration-300">List Your Business</Link></li>
                <li><Link to="/register-trainer" className="hover:text-blue-400 transition-colors duration-300">Become a Trainer</Link></li>
                <li><Link to="/manage-bookings" className="hover:text-blue-400 transition-colors duration-300">Manage Bookings</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-400 transition-colors duration-300">Pricing Plans</Link></li>
                <li><Link to="/support" className="hover:text-blue-400 transition-colors duration-300">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-purple-400">Contact</h5>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-purple-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-purple-400" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GymSpaYoga. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
