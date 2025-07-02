
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Waves, Heart, MapPin, Star, Clock, Users, TrendingUp, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { useAuth } from "@/hooks/useAuth";
import { useGeolocation } from "@/hooks/useGeolocation";
import BrandedLoadingScreen from "@/components/BrandedLoadingScreen";
import { toast } from "sonner";

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { position, getCurrentPosition, loading: geoLoading } = useGeolocation();
  const [showLoading, setShowLoading] = useState(true);
  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleGetLocation = () => {
    getCurrentPosition();
    if (position) {
      setLocationGranted(true);
      toast.success("Location access granted successfully!");
    }
  };

  if (authLoading || showLoading) {
    return <BrandedLoadingScreen onComplete={() => setShowLoading(false)} />;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AppHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Wellness Journey
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Discover premium gyms, luxury spas, and yoga studios. Book instantly, train with experts, transform your life.
            </p>
            
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/gyms">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4">
                  Explore Gyms
                </Button>
              </Link>
              <Link to="/spas">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4">
                  Find Spas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Wellness Path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're looking to build strength, find peace, or rejuvenate your spirit, we've got you covered.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={index} to={category.href}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-r ${category.color} text-white w-fit group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <CardTitle className="text-2xl mb-2 group-hover:text-emerald-600 transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="secondary" className="mb-4">
                      {category.stats}
                    </Badge>
                    <Button className="w-full group-hover:bg-emerald-600 transition-colors">
                      Explore Now
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Index;
