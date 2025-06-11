
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Phone, ArrowRight, Dumbbell, Waves, Heart, Users, CheckCircle, Calendar, Award } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useGyms } from "@/hooks/useGyms";
import { useSpas } from "@/hooks/useSpas";
import { useYogaStudios } from "@/hooks/useYogaStudios";
import { useTrainers } from "@/hooks/useTrainers";
import { toast } from "sonner";
import TrainersSection from "@/components/TrainersSection";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { gyms, loading: gymsLoading } = useGyms();
  const { spas, loading: spasLoading } = useSpas();
  const { yogaStudios, loading: yogaLoading } = useYogaStudios();
  const { trainers, loading: trainersLoading } = useTrainers();
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const isLoading = gymsLoading || spasLoading || yogaLoading || trainersLoading;

  // Sample data for demonstration when database is empty
  const sampleGyms = [
    {
      id: "1",
      business_name: "PowerFit Gym",
      category: "Premium",
      city: "Mumbai",
      monthly_price: 2500,
      image_urls: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"],
      amenities: ["Modern Equipment", "Personal Training", "Cardio Zone"]
    },
    {
      id: "2", 
      business_name: "Elite Fitness Center",
      category: "Premium",
      city: "Delhi",
      monthly_price: 3000,
      image_urls: ["https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"],
      amenities: ["Swimming Pool", "Yoga Classes", "Nutrition Counseling"]
    }
  ];

  const sampleSpas = [
    {
      id: "1",
      business_name: "Serenity Spa & Wellness",
      category: "Luxury",
      city: "Bangalore",
      session_price: 1500,
      image_urls: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"],
      amenities: ["Aromatherapy", "Hot Stone Massage", "Facial Treatments"]
    }
  ];

  const sampleYoga = [
    {
      id: "1",
      business_name: "Peaceful Mind Yoga",
      category: "Traditional",
      city: "Pune",
      session_price: 800,
      image_urls: ["https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"],
      amenities: ["Hatha Yoga", "Meditation", "Pranayama"]
    }
  ];

  const displayGyms = gyms.length > 0 ? gyms.slice(0, 3) : sampleGyms;
  const displaySpas = spas.length > 0 ? spas.slice(0, 3) : sampleSpas;
  const displayYoga = yogaStudios.length > 0 ? yogaStudios.slice(0, 3) : sampleYoga;

  if (showLoadingScreen) {
    return <LoadingScreen category="gym" onComplete={() => setShowLoadingScreen(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Your Wellness Journey
              <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Discover the best gyms, spas, and yoga centers across India. 
              Book sessions, find trainers, and transform your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-lg px-8 py-4"
                onClick={() => navigate('/gyms')}
              >
                Find Gyms
                <Dumbbell className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-4"
                onClick={() => navigate('/spas')}
              >
                Explore Spas
                <Waves className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">{displayGyms.length + 50}+</div>
                <div className="text-gray-600">Gyms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{displaySpas.length + 30}+</div>
                <div className="text-gray-600">Spas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{displayYoga.length + 40}+</div>
                <div className="text-gray-600">Yoga Centers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{trainers.length + 100}+</div>
                <div className="text-gray-600">Trainers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gyms */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Top Gyms
            </h2>
            <p className="text-lg text-gray-600">
              Premium fitness centers with modern equipment and expert trainers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {displayGyms.map((gym) => (
              <Card key={gym.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                <div className="relative">
                  <img 
                    src={gym.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                    alt={gym.business_name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-emerald-500">
                    {gym.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                    {gym.business_name}
                  </CardTitle>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{gym.city}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-emerald-600">
                      ₹{gym.monthly_price}/month
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {gym.amenities?.slice(0, 2).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/gyms">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                View All Gyms
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Spas */}
      <section className="py-16 px-4 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Luxury Spas
            </h2>
            <p className="text-lg text-gray-600">
              Rejuvenate your mind and body with premium spa treatments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {displaySpas.map((spa) => (
              <Card key={spa.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                <div className="relative">
                  <img 
                    src={spa.image_urls?.[0] || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                    alt={spa.business_name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-blue-500">
                    {spa.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {spa.business_name}
                  </CardTitle>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{spa.city}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{spa.session_price}/session
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {spa.amenities?.slice(0, 2).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                      Book Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/spas">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                View All Spas
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Yoga */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Yoga Studios
            </h2>
            <p className="text-lg text-gray-600">
              Find your inner peace with experienced yoga instructors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {displayYoga.map((yoga) => (
              <Card key={yoga.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                <div className="relative">
                  <img 
                    src={yoga.image_urls?.[0] || "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                    alt={yoga.business_name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-purple-500">
                    {yoga.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {yoga.business_name}
                  </CardTitle>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{yoga.city}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-purple-600">
                      ₹{yoga.session_price}/session
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {yoga.amenities?.slice(0, 2).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Join Classes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/yoga">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                View All Yoga Studios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <TrainersSection />

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose GymSpaYoga?
            </h2>
            <p className="text-lg text-gray-600">
              Your trusted partner in wellness and fitness journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Verified Partners</h3>
              <p className="text-gray-600">All our partners are verified and certified for quality assurance.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book sessions instantly with our user-friendly platform.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Best Prices</h3>
              <p className="text-gray-600">Get the best deals and competitive pricing across all services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of satisfied customers who have transformed their lives with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-lg px-8 py-4"
                    onClick={() => navigate('/signup')}
                  >
                    Get Started Today
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-4"
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </Button>
                </>
              ) : (
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-lg px-8 py-4"
                  onClick={() => navigate('/profile')}
                >
                  View My Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
