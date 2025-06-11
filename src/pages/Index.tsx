import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Dumbbell, Waves, Heart, Users, Search, Shield, Award, Clock, User, LogOut, CheckCircle, Phone, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import MainNavigation from "@/components/MainNavigation";
import AnimatedHeroGrid from "@/components/AnimatedHeroGrid";
import TrainersSection from "@/components/TrainersSection";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [targetCategory, setTargetCategory] = useState<string>("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState<'gym' | 'spa' | 'yoga' | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  const handleCategoryClick = (category: string, path: string) => {
    setTargetCategory(category);
    setShowLoadingScreen(true);
    
    setTimeout(() => {
      navigate(path);
      setShowLoadingScreen(false);
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
      name: "Priya Sharma",
      role: "Fitness Enthusiast",
      content: "I found the perfect gym through this platform! The filters helped me find a gym with all the amenities I needed.",
      verified: true
    },
    {
      name: "Amit Patel",
      role: "Wellness Seeker",
      content: "The spa listings are fantastic. I booked a relaxing session at a top-rated spa and felt completely rejuvenated.",
      verified: true
    },
    {
      name: "Anjali Kapoor",
      role: "Yoga Practitioner",
      content: "Found an amazing yoga studio nearby. The instructors are certified and the environment is so peaceful.",
      verified: true
    },
    {
      name: "Rohit Singh",
      role: "Business Owner",
      content: "As a gym owner, this platform helped me reach more customers. The registration process was smooth and effective.",
      verified: true
    }
  ];

  if (isLoading && loadingCategory) {
    return <LoadingScreen category={loadingCategory} onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <MainNavigation />

      {/* Hero Section with Animated Grid - Added top padding */}
      <div className="pt-8 px-4">
        <AnimatedHeroGrid />
      </div>

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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our community members who have transformed their lives with GymSpaYoga.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-gray-50">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <h4 className="text-xl font-bold text-gray-800">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <Badge className="ml-2 bg-green-500 hover:bg-green-600 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-500 font-medium">{testimonial.role}</p>
                </div>
                <blockquote className="text-gray-600 italic leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Dumbbell className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold">GymSpaYoga</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your ultimate destination for fitness, wellness, and mindfulness. 
                Discover the best gyms, spas, and yoga studios in your area.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/gyms" className="text-gray-400 hover:text-white transition-colors">Find Gyms</Link></li>
                <li><Link to="/spas" className="text-gray-400 hover:text-white transition-colors">Find Spas</Link></li>
                <li><Link to="/yoga" className="text-gray-400 hover:text-white transition-colors">Find Yoga</Link></li>
                <li><Link to="/trainers" className="text-gray-400 hover:text-white transition-colors">Find Trainers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">For Business</h4>
              <ul className="space-y-2">
                <li><Link to="/register-business" className="text-gray-400 hover:text-white transition-colors">List Your Business</Link></li>
                <li><Link to="/register-trainer" className="text-gray-400 hover:text-white transition-colors">Join as Trainer</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/manage-bookings" className="text-gray-400 hover:text-white transition-colors">Manage Bookings</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">Kolkata, West Bengal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">info@gymspayoga.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2024 GymSpaYoga. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
                <Link to="/blogs" className="text-gray-400 hover:text-white transition-colors">Blogs</Link>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Loading Screen */}
      {showLoadingScreen && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-white/20 rounded-full animate-spin">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-white rounded-full animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce flex items-center justify-center">
                  {targetCategory === "gym" && <Dumbbell className="h-6 w-6 text-white" />}
                  {targetCategory === "spa" && <Waves className="h-6 w-6 text-white" />}
                  {targetCategory === "yoga" && <Heart className="h-6 w-6 text-white" />}
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Loading {targetCategory}...</h2>
            <p className="text-white/70">Finding the best options for you</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
