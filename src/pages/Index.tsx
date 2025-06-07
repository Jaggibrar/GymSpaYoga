import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Dumbbell, Waves, Heart, Users, Search, Shield, Award, Clock, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import AnimatedHeroGrid from "@/components/AnimatedHeroGrid";
import TrainersSection from "@/components/TrainersSection";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState<'gym' | 'spa' | 'yoga' | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  const handleCategoryClick = (category: 'gym' | 'spa' | 'yoga', path: string) => {
    setIsLoading(true);
    setLoadingCategory(category);
    
    setTimeout(() => {
      setIsLoading(false);
      setLoadingCategory(null);
      navigate(path);
    }, 2000);
  };

  const featuredListings = [
    {
      id: 101,
      category: "Gym",
      name: "Elite Fitness Hub",
      rating: 4.8,
      location: "Bandra West, Mumbai",
      price: "₹2,500/month",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "/gym/1"
    },
    {
      id: 102,
      category: "Spa",
      name: "Serenity Wellness Spa",
      rating: 4.9,
      location: "Juhu, Mumbai",
      price: "₹4,500/session",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: "/spa/1"
    },
    {
      id: 103,
      category: "Yoga",
      name: "Mindful Movement Studio",
      rating: 4.9,
      location: "Bandra West, Mumbai",
      price: "₹2,000/month",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: "/yoga/1"
    }
  ];

  const testimonials = [
    {
      id: 201,
      name: "Priya Sharma",
      role: "Fitness Enthusiast",
      comment: "I found the perfect gym through this platform! The filters helped me find a gym with all the amenities I needed.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b8d21c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 202,
      name: "Amit Patel",
      role: "Wellness Seeker",
      comment: "The spa listings are fantastic. I booked a relaxing session at a top-rated spa and felt completely rejuvenated.",
      avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 203,
      name: "Anjali Kapoor",
      role: "Yoga Practitioner",
      comment: "I discovered an amazing yoga studio that perfectly matches my preferences. The variety of options is impressive!",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }
  ];

  if (isLoading && loadingCategory) {
    return <LoadingScreen category={loadingCategory} onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="h-8 md:h-10 w-8 md:w-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-200">
                <Dumbbell className="h-4 md:h-6 w-4 md:w-6 text-white animate-pulse group-hover:animate-none" />
              </div>
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent hover:from-emerald-700 hover:to-blue-700 transition-all duration-300">
                GymSpaYoga
              </h1>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/gyms" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300">
                Gyms
              </Link>
              <Link to="/spas" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300">
                Spas
              </Link>
              <Link to="/yoga" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300">
                Yoga
              </Link>
              <Link to="/trainers" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300">
                Trainers
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300">
                About
              </Link>
            </nav>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link to="/register-business">
                <Button variant="outline" className="text-xs md:text-sm hover:bg-emerald-50 hover:border-emerald-300">
                  List Business
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

      {/* Hero Section with Animated Grid */}
      <AnimatedHeroGrid />

      {/* Category Cards */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
              Explore Our Categories
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the perfect fitness and wellness experience tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <Card 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 cursor-pointer"
              onClick={() => handleCategoryClick('gym', '/gyms')}
            >
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern gym with state-of-the-art equipment"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600">
                  Popular
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <Dumbbell className="h-8 w-8 text-emerald-600" />
                  <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                    Gyms
                  </CardTitle>
                </div>
                <CardDescription className="text-base md:text-lg text-gray-600 leading-relaxed">
                  State-of-the-art fitness centers with modern equipment and expert trainers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-emerald-600 font-bold text-lg">From ₹1,000/month</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.5+</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick('gym', '/gyms');
                  }}
                >
                  Explore Gyms
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 cursor-pointer"
              onClick={() => handleCategoryClick('spa', '/spas')}
            >
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Luxury spa with relaxing ambiance and premium treatments"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-purple-500 hover:bg-purple-600">
                  Luxury
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <Waves className="h-8 w-8 text-purple-600" />
                  <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                    Spas
                  </CardTitle>
                </div>
                <CardDescription className="text-base md:text-lg text-gray-600 leading-relaxed">
                  Premium wellness centers offering rejuvenating treatments and relaxation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-purple-600 font-bold text-lg">From ₹2,500/session</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.7+</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick('spa', '/spas');
                  }}
                >
                  Explore Spas
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 cursor-pointer"
              onClick={() => handleCategoryClick('yoga', '/yoga')}
            >
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Peaceful yoga studio with natural lighting and serene atmosphere"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">
                  Trending
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <Heart className="h-8 w-8 text-green-600" />
                  <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                    Yoga
                  </CardTitle>
                </div>
                <CardDescription className="text-base md:text-lg text-gray-600 leading-relaxed">
                  Serene studios for mindfulness, flexibility, and inner peace practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-green-600 font-bold text-lg">From ₹1,500/month</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.6+</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick('yoga', '/yoga');
                  }}
                >
                  Explore Yoga
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-5">
              Why Choose GymSpaYoga?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We provide the best platform to discover and book your ideal fitness and wellness experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <Shield className="h-6 w-6 text-emerald-600" />
                <h3 className="text-xl font-semibold text-gray-800">Verified Listings</h3>
              </div>
              <p className="text-gray-600 text-base leading-relaxed">
                We ensure all listings are thoroughly verified for quality and authenticity.
              </p>
            </Card>
            
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <Award className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">Top-Rated Experiences</h3>
              </div>
              <p className="text-gray-600 text-base leading-relaxed">
                Discover the highest-rated gyms, spas, and yoga centers in your city.
              </p>
            </Card>
            
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <Clock className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-800">Easy Booking</h3>
              </div>
              <p className="text-gray-600 text-base leading-relaxed">
                Seamlessly book your sessions with just a few clicks and enjoy hassle-free scheduling.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-5">
              Featured Listings
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore some of our top-rated and most popular fitness and wellness destinations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
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
                  <Link to={listing.link}>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <TrainersSection />

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-5">
              What Our Users Say
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Read inspiring stories from individuals who have transformed their lives with GymSpaYoga.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-base leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <div className="h-10 md:h-12 w-10 md:w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Dumbbell className="h-5 md:h-6 w-5 md:w-6 text-white" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">GymSpaYoga</h4>
              </div>
              <p className="text-gray-300 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
                Your wellness journey starts here. We connect fitness enthusiasts with the best gyms, spas, and yoga centers across India. Transform your health, transform your life.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 md:mb-6 text-lg md:text-xl text-emerald-400">For Users</h5>
              <ul className="space-y-2 md:space-y-3 text-gray-300">
                <li><Link to="/gyms" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Gyms</Link></li>
                <li><Link to="/spas" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Spas</Link></li>
                <li><Link to="/yoga" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Yoga Centers</Link></li>
                <li><Link to="/trainers" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Trainers</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 md:mb-6 text-lg md:text-xl text-blue-400">For Business</h5>
              <ul className="space-y-2 md:space-y-3 text-gray-300">
                <li><Link to="/register-business" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">List Your Business</Link></li>
                <li><Link to="/register-trainer" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Become a Trainer</Link></li>
                <li><Link to="/manage-bookings" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Manage Bookings</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Pricing Plans</Link></li>
                <li><Link to="/support" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 md:mb-6 text-lg md:text-xl text-purple-400">Contact</h5>
              <div className="space-y-2 md:space-y-3 text-gray-300">
                <div className="flex items-center">
                  <MapPin className="h-4 md:h-5 w-4 md:w-5 mr-2 md:mr-3 text-purple-400" />
                  <span className="text-sm md:text-base">Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400">
            <p className="text-sm md:text-base">&copy; 2024 GymSpaYoga. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
