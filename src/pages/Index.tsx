import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Dumbbell, Waves, Heart, Users, Shield, Award, Clock, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import AnimatedHeroGrid from "@/components/AnimatedHeroGrid";
import TrainersSection from "@/components/TrainersSection";
import LoadingScreen from "@/components/LoadingScreen";
import SEOHead from "@/components/SEOHead";
import { useGyms } from "@/hooks/useGyms";
import { useSpas } from "@/hooks/useSpas";
import { useYogaStudios } from "@/hooks/useYogaStudios";

const Index = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [targetCategory, setTargetCategory] = useState<string>("");
  const navigate = useNavigate();

  // Fetch real data from backend
  const { gyms } = useGyms();
  const { spas } = useSpas();
  const { yogaStudios } = useYogaStudios();

  const handleCategoryClick = (category: string, path: string) => {
    setTargetCategory(category);
    setShowLoadingScreen(true);
    
    setTimeout(() => {
      navigate(path);
      setShowLoadingScreen(false);
    }, 2000);
  };

  // Use real data for featured listings - take first 3 from each category
  const featuredListings = [
    ...(gyms.slice(0, 1).map(gym => ({
      id: gym.id,
      category: "Gym",
      name: gym.business_name,
      rating: 4.8, // This should come from reviews table when implemented
      location: `${gym.city}, ${gym.state}`,
      price: gym.monthly_price ? `₹${gym.monthly_price}/month` : `₹${gym.session_price}/session`,
      image: gym.image_urls[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: `/gyms/${gym.id}`
    }))),
    ...(spas.slice(0, 1).map(spa => ({
      id: spa.id,
      category: "Spa",
      name: spa.business_name,
      rating: 4.9,
      location: `${spa.city}, ${spa.state}`,
      price: spa.session_price ? `₹${spa.session_price}/session` : `₹${spa.monthly_price}/month`,
      image: spa.image_urls[0] || "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: `/spas/${spa.id}`
    }))),
    ...(yogaStudios.slice(0, 1).map(studio => ({
      id: studio.id,
      category: "Yoga",
      name: studio.business_name,
      rating: 4.6,
      location: `${studio.city}, ${studio.state}`,
      price: studio.monthly_price ? `₹${studio.monthly_price}/month` : `₹${studio.session_price}/session`,
      image: studio.image_urls[0] || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: `/yoga/${studio.id}`
    })))
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

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "GymSpaYoga",
    "description": "Find and book the best gyms, spas, and yoga studios across India",
    "url": "https://gymspayoga.com",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "1000",
      "highPrice": "5000",
      "offerCount": `${gyms.length + spas.length + yogaStudios.length}+`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <>
      <SEOHead 
        title="GymSpaYoga - Find Best Gyms, Spas & Yoga Studios Near You | Book Online"
        description="Discover and book the best gyms, luxury spas, and yoga studios in Mumbai, Delhi, Bangalore. Compare prices, read reviews, and find certified trainers. Start your wellness journey today!"
        keywords="gym near me, spa booking, yoga classes, fitness center, wellness, personal trainer, Mumbai gyms, spa treatments, yoga studio, fitness membership, best gym mumbai, luxury spa delhi, yoga classes bangalore"
        url="https://gymspayoga.com/"
        structuredData={homeStructuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
        {/* Hero Section with Animated Grid */}
        <div className="pt-8 px-4">
          <AnimatedHeroGrid />
        </div>

        {/* Category Cards - Mobile Horizontal Layout */}
        <section className="py-8 md:py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Explore Our Categories
              </h1>
              <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover the perfect fitness and wellness experience tailored to your needs
              </p>
            </div>
            
            {/* Mobile: Horizontal Scroll, Desktop: Grid */}
            <div className="md:hidden">
              <div className="mobile-horizontal-cards">
                <Card 
                  className="mobile-card group hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleCategoryClick('gym', '/gyms')}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Modern gym with state-of-the-art equipment"
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-2 right-2 bg-emerald-500 text-xs">
                      {gyms.length} Available
                    </Badge>
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Dumbbell className="h-6 w-6 text-emerald-600" />
                      <CardTitle className="text-lg font-bold text-gray-800">Gyms</CardTitle>
                    </div>
                    <CardDescription className="text-sm text-gray-600">
                      Modern fitness centers with expert trainers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-emerald-600 font-bold">From ₹1,000/month</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">4.5+</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-sm">
                      Explore Gyms
                    </Button>
                  </CardContent>
                </Card>

                <Card 
                  className="mobile-card group hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleCategoryClick('spa', '/spas')}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Luxury spa with relaxing ambiance"
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-2 right-2 bg-purple-500 text-xs">
                      {spas.length} Available
                    </Badge>
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Waves className="h-6 w-6 text-purple-600" />
                      <CardTitle className="text-lg font-bold text-gray-800">Spas</CardTitle>
                    </div>
                    <CardDescription className="text-sm text-gray-600">
                      Premium wellness centers for relaxation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-purple-600 font-bold">From ₹2,500/session</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">4.7+</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm">
                      Explore Spas
                    </Button>
                  </CardContent>
                </Card>

                <Card 
                  className="mobile-card group hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleCategoryClick('yoga', '/yoga')}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Peaceful yoga studio"
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500 text-xs">
                      {yogaStudios.length} Available
                    </Badge>
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="h-6 w-6 text-green-600" />
                      <CardTitle className="text-lg font-bold text-gray-800">Yoga</CardTitle>
                    </div>
                    <CardDescription className="text-sm text-gray-600">
                      Serene studios for mindfulness practice
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-green-600 font-bold">From ₹1,500/month</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">4.6+</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-sm">
                      Explore Yoga
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Desktop Grid Layout */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
                    {gyms.length} Available
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
                    {spas.length} Available
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
                    {yogaStudios.length} Available
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

        {/* Features Section - Mobile Horizontal Scroll */}
        <section className="py-8 md:py-12 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                Why Choose GymSpaYoga?
              </h2>
              <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We provide the best platform to discover and book your ideal fitness and wellness experiences.
              </p>
            </div>
            
            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden">
              <div className="mobile-horizontal-cards">
                <Card className="mobile-card-sm p-4 bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-base font-semibold text-gray-800">Verified Listings</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    All listings are thoroughly verified for quality and authenticity.
                  </p>
                </Card>
                
                <Card className="mobile-card-sm p-4 bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <Award className="h-5 w-5 text-blue-600" />
                    <h3 className="text-base font-semibold text-gray-800">Top-Rated</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Discover the highest-rated gyms, spas, and yoga centers in your city.
                  </p>
                </Card>
                
                <Card className="mobile-card-sm p-4 bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <h3 className="text-base font-semibold text-gray-800">Easy Booking</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Book your sessions with just a few clicks and enjoy hassle-free scheduling.
                  </p>
                </Card>
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
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

        {/* Featured Listings - Mobile Horizontal Scroll */}
        {featuredListings.length > 0 && (
          <section className="py-8 md:py-12 px-4">
            <div className="container mx-auto">
              <div className="text-center mb-6 md:mb-10">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                  Featured Listings
                </h2>
                <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Explore some of our top-rated and most popular fitness and wellness destinations.
                </p>
              </div>
              
              {/* Mobile: Horizontal Scroll */}
              <div className="md:hidden">
                <div className="mobile-horizontal-cards">
                  {featuredListings.map((listing) => (
                    <Card key={listing.id} className="mobile-card group hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="relative overflow-hidden">
                        <img 
                          src={listing.image} 
                          alt={listing.name}
                          className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <Badge className="absolute top-2 right-2 bg-emerald-500 text-xs">
                          {listing.category}
                        </Badge>
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base font-bold text-gray-800 line-clamp-1">
                            {listing.name}
                          </CardTitle>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">{listing.rating}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                            <span className="line-clamp-1">{listing.location}</span>
                          </div>
                          <div className="text-emerald-600 font-bold text-sm">
                            {listing.price}
                          </div>
                        </div>
                        <Link to={listing.link}>
                          <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-sm">
                            View Details
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
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
        )}

        {/* Trainers Section */}
        <TrainersSection />

        {/* Testimonials Section - Mobile Horizontal Scroll */}
        <section className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
                Success Stories
              </h2>
              <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from our community members who have transformed their lives with GymSpaYoga.
              </p>
            </div>
            
            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden">
              <div className="mobile-horizontal-cards">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="mobile-card p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex items-center justify-center mb-2">
                        <h4 className="text-base font-bold text-gray-800">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <Badge className="ml-2 bg-green-500 hover:bg-green-600 text-white text-xs">
                            <CheckCircle className="h-2 w-2 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-500 font-medium text-sm">{testimonial.role}</p>
                    </div>
                    <blockquote className="text-gray-600 italic leading-relaxed text-sm">
                      "{testimonial.content}"
                    </blockquote>
                  </Card>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        {/* Use the consistent AppFooter component */}
        <AppFooter />

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
    </>
  );
};

export default Index;
