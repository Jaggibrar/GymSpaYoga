
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Waves, Heart, MapPin, Star, Clock, Users, TrendingUp, Navigation, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedHeroGrid from "@/components/AnimatedHeroGrid";

import { useAuth } from "@/hooks/useAuth";
import { useGeolocation } from "@/hooks/useGeolocation";

import RecentListings from "@/components/RecentListings";
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
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
            src="/lovable-uploads/f0f905ef-8ae5-4c34-8db3-7a23bedbc1b5.png"
            alt="Wellness lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container-modern">
          <div className="max-w-6xl mx-auto text-center text-white">
            <div className="mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight px-2">
                Transform Your
                <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Wellness Journey
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
                India's premier wellness marketplace connecting you with premium gyms, luxury spas, authentic yoga studios, and certified trainers. Your path to holistic health starts here.
              </p>
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center mb-12 sm:mb-16 px-4">
              <Link to="/gyms" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto btn-primary text-base sm:text-lg px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-105 min-h-[48px]">
                  <Dumbbell className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  Explore Gyms
                </Button>
              </Link>
              <Link to="/spas" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto btn-secondary border-2 border-white/80 text-white hover:bg-white/20 text-base sm:text-lg px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 min-h-[48px]">
                  <Waves className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  Find Spas
                </Button>
              </Link>
              <Link to="/yoga" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto btn-secondary border-2 border-white/80 text-white hover:bg-white/20 text-base sm:text-lg px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 min-h-[48px]">
                  <Heart className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  Yoga Studios
                </Button>
              </Link>
            </div>

            {/* Location Access Card */}
            <Card className="glass-effect max-w-lg mx-auto mx-4">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                    <span className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">Find Wellness Centers Near You</span>
                  </div>
                  {locationGranted && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 self-start sm:self-center">
                      <Navigation className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                
                <Button 
                  onClick={handleGetLocation}
                  disabled={geoLoading}
                  className="w-full btn-primary text-sm sm:text-base min-h-[48px]"
                >
                  {geoLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"></div>
                      Getting Location...
                    </>
                  ) : position ? (
                    <>
                      <Navigation className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                      Location Active - Find Nearby Centers
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
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
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-primary mb-6 sm:mb-8">
              Your Wellness Universe
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover a curated ecosystem of premium wellness destinations. From strength training to spiritual wellness, find your perfect match for a healthier, happier you.
            </p>
          </div>
          
          <AnimatedHeroGrid />
        </div>
      </section>

      {/* Recent Listings Section */}
      <RecentListings />

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
            {[
              { icon: <Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />, number: "50K+", label: "Happy Members" },
              { icon: <MapPin className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />, number: "1000+", label: "Locations" },
              { icon: <Star className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />, number: "4.9", label: "Average Rating" },
              { icon: <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />, number: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-emerald-600 mb-2 sm:mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Transform Your Life?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of people who have already started their wellness journey with us.
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-4 min-h-[48px]">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900 text-base sm:text-lg px-6 sm:px-8 py-4 min-h-[48px]">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/explore">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-4 min-h-[48px]">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Explore Near You
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Quick Setup Panel */}
    </div>
  );
};

export default Index;
