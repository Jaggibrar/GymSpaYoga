import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Clock, Users, Award, Dumbbell, Waves, Heart } from "lucide-react";
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
    { icon: Dumbbell, label: "Gyms", value: gyms.filter(g => g.business_type === 'gym').length, color: "text-red-400" },
    { icon: Waves, label: "Spas", value: gyms.filter(g => g.business_type === 'spa').length, color: "text-blue-400" },
    { icon: Heart, label: "Yoga Studios", value: gyms.filter(g => g.business_type === 'yoga').length, color: "text-purple-400" },
    { icon: Users, label: "Trainers", value: trainers.length, color: "text-emerald-400" }
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

      {/* Modern Hero Section with Gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              <span className="block">Find Your Perfect</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                Wellness Destination
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto font-medium leading-relaxed">
              Discover <span className="text-red-300 font-bold">premium gyms</span>, 
              <span className="text-blue-300 font-bold"> luxurious spas</span>, and 
              <span className="text-purple-300 font-bold"> peaceful yoga studios</span> near you.
              <span className="block mt-2 text-yellow-300 font-bold">Start your wellness journey today.</span>
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20">
              <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search gyms, spas, yoga studios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 text-lg border-0 focus:ring-2 focus:ring-emerald-500 rounded-2xl bg-gray-50"
                    aria-label="Search for wellness destinations"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Enter location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-12 h-14 text-lg border-0 focus:ring-2 focus:ring-emerald-500 rounded-2xl bg-gray-50"
                    aria-label="Enter your location"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Mobile-optimized Categories Section - full width */}
      <section className="py-12 md:py-16 w-full">
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
      <section className="py-12 md:py-16 bg-white/50 w-full">
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

      {/* Mobile-optimized CTA Section - full width */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-emerald-500 to-blue-500 w-full">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 mx-auto max-w-7xl text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">
              Join thousands of users who have found their perfect wellness destination
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-emerald-500 hover:bg-gray-100 px-6 md:px-8 py-3 touch-target w-full sm:w-auto">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/register-business">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-500 px-6 md:px-8 py-3 touch-target w-full sm:w-auto">
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
