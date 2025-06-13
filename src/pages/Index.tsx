import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Clock, Users, Award, Dumbbell, Waves, Heart, Sparkles } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useGyms } from "@/hooks/useGyms";
import { useTrainers } from "@/hooks/useTrainers";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  useScrollToTop();
  const { gyms, loading: gymsLoading } = useGyms();
  const { trainers, loading: trainersLoading } = useTrainers();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const allBusinesses = gyms;
  const loading = gymsLoading || trainersLoading;

  const filteredBusinesses = allBusinesses.filter(business => {
    const matchesSearch = searchTerm === "" || 
      business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === "" ||
      business.city.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  const handleBookNow = (businessName: string) => {
    toast.success(`Booking ${businessName}. Please sign in to complete your booking!`);
  };

  const handleSearch = () => {
    if (searchTerm || locationFilter) {
      toast.info("Searching for businesses...");
    }
  };

  const stats = [
    { icon: "🏋️", label: "Premium Gyms", value: gyms.filter(g => g.business_type === 'gym').length, color: "from-red-400 to-orange-400" },
    { icon: "🧘", label: "Luxury Spas", value: gyms.filter(g => g.business_type === 'spa').length, color: "from-blue-400 to-cyan-400" },
    { icon: "🕉️", label: "Yoga Studios", value: gyms.filter(g => g.business_type === 'yoga').length, color: "from-purple-400 to-pink-400" },
    { icon: "💪", label: "Expert Trainers", value: trainers.length, color: "from-emerald-400 to-teal-400" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GymSpaYoga",
    "description": "Find and book the best gyms, spas, and yoga studios in Mumbai, Delhi, Bangalore. Your wellness journey starts here!",
    "url": "https://gymspayoga.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://gymspayoga.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen w-full">
      <SEOHead
        title="GymSpaYoga - Find Best Gyms, Spas & Yoga Studios | Book Online"
        description="Discover and book the best gyms, spas, and yoga studios in Mumbai, Delhi, Bangalore. Find certified trainers, premium facilities, and start your wellness journey today!"
        keywords="gym, spa, yoga, fitness, wellness, Mumbai, Delhi, Bangalore, booking, trainers, meditation, massage, therapy"
        url="https://gymspayoga.com"
        structuredData={structuredData}
      />

      {/* Enhanced Hero Section with Glassmorphism */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Deep Gradient Background with Blur Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
        
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>

        {/* Floating Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Sparkles
              key={i}
              className={`absolute text-white/20 animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${Math.random() * 8 + 8}px`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          {/* Elegant Typography with Soft Shadows */}
          <div className="mb-12">
            <div className="mb-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-tight">
                <span className="block bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Discover Your
                </span>
                <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                  Wellness Haven
                </span>
              </h1>
            </div>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-8 max-w-5xl mx-auto font-light leading-relaxed drop-shadow-lg">
              Transform your life with 
              <span className="font-semibold text-red-300"> premium fitness centers</span>, 
              <span className="font-semibold text-blue-300"> luxurious wellness spas</span>, and 
              <span className="font-semibold text-purple-300"> peaceful yoga sanctuaries</span>
            </p>
          </div>

          {/* Glassmorphism Search Bar */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="relative">
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 via-purple-400/50 to-pink-400/50 rounded-3xl blur-sm"></div>
              
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                  <div className="relative flex-1 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-2xl blur-sm group-focus-within:blur-none transition-all duration-300"></div>
                    <div className="relative">
                      <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/70 h-6 w-6 group-focus-within:text-white transition-colors" />
                      <Input
                        placeholder="Search gyms, spas, yoga studios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-14 h-16 text-lg border-0 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/30 rounded-2xl font-medium"
                        aria-label="Search for wellness destinations"
                      />
                    </div>
                  </div>
                  
                  <div className="relative flex-1 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl blur-sm group-focus-within:blur-none transition-all duration-300"></div>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/70 h-6 w-6 group-focus-within:text-white transition-colors" />
                      <Input
                        placeholder="Enter your location..."
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="pl-14 h-16 text-lg border-0 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/30 rounded-2xl font-medium"
                        aria-label="Enter your location"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSearch}
                    className="h-16 px-10 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Glassmorphism Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-110"
              >
                {/* Gradient border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-60 rounded-3xl`}></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 m-[1px] border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                    {stat.value}+
                  </div>
                  <div className="text-sm md:text-base text-white/90 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20"
              >
                Start Your Journey
              </Button>
            </Link>
            <Link to="/pricing">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Mobile-optimized Categories Section - full width */}
      <section className="py-16 md:py-20 w-full bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
              Explore Our Categories
            </h2>
            <p className="mobile-text md:text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our wide range of wellness destinations designed to fit your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: "Premium Gyms",
                description: "State-of-the-art fitness centers with modern equipment",
                image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/gyms",
                icon: Dumbbell,
                color: "from-red-500 to-orange-500"
              },
              {
                title: "Luxury Spas",
                description: "Rejuvenating treatments in serene environments",
                image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/spas",
                icon: Waves,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Yoga Studios",
                description: "Find inner peace with expert yoga instructors",
                image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/yoga",
                icon: Heart,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Expert Trainers",
                description: "Connect with certified fitness professionals",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/trainers",
                icon: Users,
                color: "from-emerald-500 to-blue-500"
              }
            ].map((category, index) => (
              <Link key={index} to={category.link} className="group">
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`}></div>
                    <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-white">
                      <category.icon className="h-6 w-6 md:h-8 md:w-8 mb-1 md:mb-2" />
                      <h3 className="text-lg md:text-xl font-bold">{category.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4 md:p-6 flex-1 flex items-center">
                    <p className="text-gray-600 mobile-text text-center">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile-optimized Featured Businesses - full width */}
      <section className="py-16 md:py-20 bg-white w-full">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
              Featured Destinations
            </h2>
            <p className="mobile-text md:text-lg text-gray-600">
              Discover top-rated wellness destinations in your area
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-40 md:h-48 bg-gray-200"></div>
                  <CardContent className="p-4 md:p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredBusinesses.slice(0, 6).map((business) => (
                <Card key={business.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative overflow-hidden h-40 md:h-48">
                    <img 
                      src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                      alt={business.business_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 md:top-4 right-3 md:right-4 bg-emerald-500 hover:bg-emerald-600">
                      {business.category}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                    <CardTitle className="text-base md:text-lg group-hover:text-emerald-600 transition-colors line-clamp-1">
                      {business.business_name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                      <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                      <span className="truncate">{business.city}, {business.state}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 p-4 md:p-6">
                    <p className="text-gray-600 mobile-text mb-3 md:mb-4 line-clamp-2">
                      {business.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current" />
                        <span className="text-xs md:text-sm font-medium">4.8</span>
                        <span className="text-xs md:text-sm text-gray-500">(124)</span>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleBookNow(business.business_name)}
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 touch-target text-xs md:text-sm"
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <div className="text-4xl md:text-6xl mb-3 md:mb-4">🏃‍♂️</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">No businesses found</h3>
              <p className="text-gray-600 mb-4 md:mb-6 mobile-text md:text-base">
                {searchTerm || locationFilter 
                  ? "Try adjusting your search criteria or explore our categories below."
                  : "Be the first! Register your business and start attracting customers."
                }
              </p>
              <div className="flex gap-3 md:gap-4 justify-center flex-col sm:flex-row">
                <Link to="/register-business">
                  <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 touch-target w-full sm:w-auto">
                    Register Your Business
                  </Button>
                </Link>
                <Link to="/register-trainer">
                  <Button variant="outline" className="touch-target w-full sm:w-auto">
                    Register as Trainer
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section - full width */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 w-full relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative w-full px-4 md:px-8 mx-auto max-w-7xl text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Wellness Journey?
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed">
              Join thousands who have discovered their perfect wellness destination
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link to="/register-business">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  List Your Business
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
