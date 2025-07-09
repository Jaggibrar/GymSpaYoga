
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Waves, Heart, MapPin, Star, Clock, Users, TrendingUp, Navigation, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { useGeolocation } from "@/hooks/useGeolocation";
import BrandedLoadingScreen from "@/components/BrandedLoadingScreen";
import RecentListings from "@/components/RecentListings";
import QuickSetupPanel from "@/components/QuickSetupPanel";
import { toast } from "sonner";

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { position, getCurrentPosition, loading: geoLoading } = useGeolocation();
  const [locationGranted, setLocationGranted] = useState(false);

  const handleGetLocation = () => {
    getCurrentPosition();
    if (position) {
      setLocationGranted(true);
      toast.success("Location access granted successfully!");
    }
  };

  if (authLoading) {
    return <BrandedLoadingScreen onComplete={() => {}} />;
  }

  const categories = [
    {
      title: "Premium Gyms",
      description: "State-of-the-art fitness centers with expert trainers",
      icon: <Dumbbell className="h-8 w-8" />,
      color: "from-orange-500 to-red-500",
      href: "/gyms",
      stats: "500+ Gyms"
    },
    {
      title: "Luxury Spas",
      description: "Rejuvenating wellness experiences for mind and body",
      icon: <Waves className="h-8 w-8" />,
      color: "from-blue-500 to-purple-500",
      href: "/spas",
      stats: "200+ Spas"
    },
    {
      title: "Yoga Studios",
      description: "Find your inner peace with certified yoga instructors",
      icon: <Heart className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500",
      href: "/yoga",
      stats: "300+ Studios"
    }
  ];

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/24f407c0-1878-496c-9cc1-9406daf962fe.png"
            alt="Wellness lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container-modern">
          <div className="max-w-6xl mx-auto text-center text-white">
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                Transform Your
                <span className="block text-gradient-warm bg-gradient-to-r from-wellness-gold to-wellness-terracotta bg-clip-text text-transparent">
                  Wellness Journey
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
                India's premier wellness marketplace connecting you with premium gyms, luxury spas, authentic yoga studios, and certified trainers. Your path to holistic health starts here.
              </p>
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/gyms">
                <Button size="lg" className="btn-primary text-lg px-12 py-6 text-white bg-gradient-to-r from-wellness-terracotta to-wellness-gold hover:scale-105">
                  <Dumbbell className="mr-3 h-6 w-6" />
                  Explore Gyms
                </Button>
              </Link>
              <Link to="/spas">
                <Button size="lg" className="btn-secondary border-2 border-white/80 text-white hover:bg-white/20 text-lg px-12 py-6">
                  <Waves className="mr-3 h-6 w-6" />
                  Find Spas
                </Button>
              </Link>
              <Link to="/yoga">
                <Button size="lg" className="btn-secondary border-2 border-white/80 text-white hover:bg-white/20 text-lg px-12 py-6">
                  <Heart className="mr-3 h-6 w-6" />
                  Yoga Studios
                </Button>
              </Link>
            </div>

            {/* Location Access Card */}
            <Card className="glass-effect max-w-lg mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-6 w-6 text-primary" />
                    <span className="font-semibold text-foreground text-lg">Find Wellness Centers Near You</span>
                  </div>
                  {locationGranted && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <Navigation className="h-4 w-4 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                
                <Button 
                  onClick={handleGetLocation}
                  disabled={geoLoading}
                  className="w-full btn-primary"
                >
                  {geoLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Getting Location...
                    </>
                  ) : position ? (
                    <>
                      <Navigation className="h-5 w-5 mr-3" />
                      Location Active - Find Nearby Centers
                    </>
                  ) : (
                    <>
                      <MapPin className="h-5 w-5 mr-3" />
                      Enable Location Access
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-background">
        <div className="container-modern">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gradient-primary mb-8">
              Your Wellness Universe
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover a curated ecosystem of premium wellness destinations. From strength training to spiritual wellness, find your perfect match for a healthier, happier you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {/* Gyms Card */}
            <Link to="/gyms" className="category-card block">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-gym"></div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative h-full p-8 flex flex-col justify-end text-white">
                  <div className="mb-4">
                    <Dumbbell className="h-12 w-12 mb-4" />
                    <Badge className="bg-white/20 text-white border-0 mb-4">500+ Gyms</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Premium Gyms</h3>
                  <p className="text-white/90 mb-4 leading-relaxed">
                    State-of-the-art fitness centers with expert trainers and modern equipment.
                  </p>
                  <div className="flex items-center font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Explore Gyms</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Spas Card */}
            <Link to="/spas" className="category-card block">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-spa"></div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative h-full p-8 flex flex-col justify-end text-white">
                  <div className="mb-4">
                    <Waves className="h-12 w-12 mb-4" />
                    <Badge className="bg-white/20 text-white border-0 mb-4">200+ Spas</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Luxury Spas</h3>
                  <p className="text-white/90 mb-4 leading-relaxed">
                    Rejuvenating wellness sanctuaries for therapeutic treatments and relaxation.
                  </p>
                  <div className="flex items-center font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Find Spas</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Yoga Card */}
            <Link to="/yoga" className="category-card block">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-yoga"></div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative h-full p-8 flex flex-col justify-end text-white">
                  <div className="mb-4">
                    <Heart className="h-12 w-12 mb-4" />
                    <Badge className="bg-white/20 text-white border-0 mb-4">300+ Studios</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Yoga Studios</h3>
                  <p className="text-white/90 mb-4 leading-relaxed">
                    Authentic environments with certified instructors for mind-body balance.
                  </p>
                  <div className="flex items-center font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Discover Yoga</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Trainers Card */}
            <Link to="/trainers" className="category-card block">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-trainer"></div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative h-full p-8 flex flex-col justify-end text-white">
                  <div className="mb-4">
                    <Users className="h-12 w-12 mb-4" />
                    <Badge className="bg-white/20 text-white border-0 mb-4">150+ Trainers</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Expert Trainers</h3>
                  <p className="text-white/90 mb-4 leading-relaxed">
                    Certified professionals for personalized fitness and wellness coaching.
                  </p>
                  <div className="flex items-center font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Find Trainers</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Listings Section */}
      <RecentListings />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Users className="h-8 w-8" />, number: "50K+", label: "Happy Members" },
              { icon: <MapPin className="h-8 w-8" />, number: "1000+", label: "Locations" },
              { icon: <Star className="h-8 w-8" />, number: "4.9", label: "Average Rating" },
              { icon: <TrendingUp className="h-8 w-8" />, number: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-emerald-600 mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Life?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of people who have already started their wellness journey with us.
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/explore">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4">
                <MapPin className="h-5 w-5 mr-2" />
                Explore Near You
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Quick Setup Panel */}
      <QuickSetupPanel />
    </div>
  );
};

export default Index;
