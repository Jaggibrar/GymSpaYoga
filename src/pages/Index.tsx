
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Waves, Heart, MapPin, Star, Clock, Users, TrendingUp, Navigation } from "lucide-react";
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
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 py-20 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                Transform Your
                <span className="block text-slate-800">
                  Wellness Journey
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                India's premier wellness marketplace connecting you with premium gyms, luxury spas, authentic yoga studios, and certified trainers. Your path to holistic health starts here.
              </p>
            </div>
            
            {/* Location Access Card */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl mb-8 max-w-md mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    <span className="font-semibold text-gray-800">Current Location</span>
                  </div>
                  {locationGranted && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <Navigation className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                
                {position ? (
                  <div className="text-sm text-gray-600 mb-3">
                    <p>Latitude: {position.latitude.toFixed(6)}</p>
                    <p>Longitude: {position.longitude.toFixed(6)}</p>
                    <p>Accuracy: ±{Math.round(position.accuracy)}m</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 mb-3">
                    Enable location to find wellness centers near you
                  </p>
                )}
                
                <Button 
                  onClick={handleGetLocation}
                  disabled={geoLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                >
                  {geoLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Getting Location...
                    </>
                  ) : position ? (
                    <>
                      <Navigation className="h-4 w-4 mr-2" />
                      Location Active
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 mr-2" />
                      Enable Location
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
              <Link to="/gyms">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Dumbbell className="mr-2 h-5 w-5" />
                  Explore Gyms
                </Button>
              </Link>
              <Link to="/spas">
                <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-105">
                  <Waves className="mr-2 h-5 w-5" />
                  Find Spas
                </Button>
              </Link>
              <Link to="/yoga">
                <Button size="lg" variant="outline" className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50 text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-105">
                  <Heart className="mr-2 h-5 w-5" />
                  Yoga Studios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              Your Wellness Universe
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover a curated ecosystem of premium wellness destinations. From strength training to spiritual wellness, find your perfect match for a healthier, happier you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gyms Card */}
            <Link to="/gyms">
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 group-hover:from-orange-500/20 group-hover:to-red-500/20 transition-all duration-500"></div>
                <CardContent className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                      <Dumbbell className="h-8 w-8" />
                    </div>
                    <Badge className="bg-orange-100 text-orange-700 border-0">500+ Gyms</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-orange-600 transition-colors">
                    Premium Gyms
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    State-of-the-art fitness centers equipped with modern machinery, expert trainers, and personalized workout programs.
                  </p>
                  <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Explore Gyms</span>
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Spas Card */}
            <Link to="/spas">
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
                <CardContent className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                      <Waves className="h-8 w-8" />
                    </div>
                    <Badge className="bg-purple-100 text-purple-700 border-0">200+ Spas</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-purple-600 transition-colors">
                    Luxury Spas
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Rejuvenating wellness sanctuaries offering therapeutic treatments, aromatherapy, and holistic healing experiences.
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Find Spas</span>
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Yoga Card */}
            <Link to="/yoga">
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 group-hover:from-emerald-500/20 group-hover:to-teal-500/20 transition-all duration-500"></div>
                <CardContent className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                      <Heart className="h-8 w-8" />
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 border-0">300+ Studios</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
                    Yoga Studios
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Authentic yoga environments with certified instructors offering traditional and modern practices for mind-body balance.
                  </p>
                  <div className="flex items-center text-emerald-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Discover Yoga</span>
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
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
