import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Clock, Users, Award, Dumbbell, Waves, Heart, Shield, Zap, Clock3, TrendingUp, Target, CheckCircle, ArrowRight, Play } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useGyms } from "@/hooks/useGyms";
import { useTrainers } from "@/hooks/useTrainers";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEOHead from "@/components/SEOHead";
import OptimizedImage from "@/components/OptimizedImage";
import TestimonialsSection from "@/components/TestimonialsSection";
import GuestBookingModal from "@/components/GuestBookingModal";
import PricingTransparency from "@/components/PricingTransparency";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  useScrollToTop();
  const { gyms, loading: gymsLoading } = useGyms();
  const { trainers, loading: trainersLoading } = useTrainers();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [guestBookingModal, setGuestBookingModal] = useState<{
    isOpen: boolean;
    businessName: string;
    businessType: string;
    location: string;
  }>({
    isOpen: false,
    businessName: "",
    businessType: "",
    location: ""
  });

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

  const handleBookNow = (business: any) => {
    setGuestBookingModal({
      isOpen: true,
      businessName: business.business_name,
      businessType: business.business_type,
      location: `${business.city}, ${business.state}`
    });
  };

  const handleSearch = () => {
    if (searchTerm || locationFilter) {
      toast.info("Searching for businesses...");
    }
  };

  const stats = [
    { label: "Premium Gyms", value: gyms.filter(g => g.business_type === 'gym').length },
    { label: "Luxury Spas", value: gyms.filter(g => g.business_type === 'spa').length },
    { label: "Yoga Studios", value: gyms.filter(g => g.business_type === 'yoga').length },
    { label: "Expert Trainers", value: trainers.length }
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
        title="GymSpaYoga - Transform Your Life in 30 Days | Premium Wellness Platform"
        description="Join 25,000+ success stories! Find verified gyms, luxury spas & expert trainers in Mumbai, Delhi, Bangalore. Start your free trial today and transform your life."
        keywords="gym, spa, yoga, fitness, wellness, transformation, Mumbai, Delhi, Bangalore, booking, trainers, weight loss, muscle gain"
        url="https://gymspayoga.com"
        structuredData={structuredData}
      />

      {/* Enhanced Hero Section with Emotional Connection */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" role="banner">
        {/* Background Image with better contrast */}
        <div className="absolute inset-0">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Transform your life with premium wellness destinations"
            className="w-full h-full object-cover"
            priority={true}
            sizes="100vw"
          />
        </div>
        
        {/* Enhanced Gradient Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-[#106EBE]/70 to-[#0FFCBE]/60"></div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 md:space-y-12">
            {/* Trust Indicators */}
            <header>
              <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-white/90">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-bold">25,000+ Success Stories</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-sm font-bold">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-bold">99% Goal Achievement</span>
                </div>
              </div>
              
              {/* Main Headline - More Benefit-Focused */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                <span className="block drop-shadow-xl animate-fade-in">
                  Stop Dreaming.
                </span>
                <span className="block text-[#0FFCBE] drop-shadow-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 animate-fade-in animation-delay-500">
                  Start Transforming.
                </span>
                <span className="block text-xl sm:text-2xl md:text-3xl text-white/90 mt-4 font-semibold animate-fade-in animation-delay-1000">
                  In Just 30 Days
                </span>
              </h1>
              
              {/* Enhanced Subtitle with Clear Benefits */}
              <div className="space-y-4 mb-8">
                <p className="text-xl sm:text-2xl md:text-3xl text-white/95 font-bold leading-relaxed drop-shadow-sm max-w-4xl mx-auto">
                  India's #1 Platform for Premium Gyms, Luxury Spas & Expert Trainers
                </p>
                
                {/* Key Benefits */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="font-semibold">Instant Booking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="font-semibold">Verified Partners</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="font-semibold">Money-Back Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Urgency Element */}
              <div className="mb-8 flex items-center justify-center animate-pulse">
                <div className="bg-red-500 text-white px-6 py-3 rounded-full flex items-center gap-2 font-black text-lg shadow-2xl">
                  <Clock3 className="h-5 w-5" />
                  <span>⚡ FREE Trial Ends in 48 Hours!</span>
                </div>
              </div>
            </header>

            {/* Enhanced Search Bar */}
            <div className="space-y-6 md:space-y-8">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl max-w-5xl mx-auto border-2 border-[#0FFCBE]/50">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">
                    Find Your Perfect Wellness Match
                  </h2>
                  <p className="text-gray-600 font-medium">
                    Join 25K+ members who found their ideal fitness destination
                  </p>
                </div>
                
                <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" aria-hidden="true" />
                    <Input
                      placeholder="Search gyms, spas, yoga studios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-14 h-16 text-lg border-2 border-gray-200 focus:border-[#106EBE] focus:ring-4 focus:ring-[#106EBE]/20 rounded-xl bg-white font-medium shadow-sm"
                      aria-label="Search for wellness destinations"
                    />
                  </div>
                  
                  <div className="relative flex-1">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" aria-hidden="true" />
                    <Input
                      placeholder="Mumbai, Delhi, Bangalore..."
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="pl-14 h-16 text-lg border-2 border-gray-200 focus:border-[#106EBE] focus:ring-4 focus:ring-[#106EBE]/20 rounded-xl bg-white font-medium shadow-sm"
                      aria-label="Enter your location"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSearch}
                    size="lg"
                    className="h-16 px-10 md:px-12 bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] hover:from-[#106EBE]/90 hover:to-[#0FFCBE]/90 text-white font-black rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg"
                    aria-label="Search for wellness destinations"
                  >
                    <Search className="h-6 w-6 mr-3" aria-hidden="true" />
                    Find My Match
                  </Button>
                </div>
                
                {/* Enhanced Trust Indicators */}
                <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">100% Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">Instant Booking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold">Premium Quality</span>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button 
                    size="xl" 
                    className="bg-[#0FFCBE] hover:bg-[#0FFCBE]/90 text-[#106EBE] font-black px-12 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-xl w-full sm:w-auto border-4 border-white/50"
                  >
                    🚀 Start FREE Trial - 50% OFF
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button 
                    size="xl" 
                    variant="outline" 
                    className="border-3 border-white/70 text-white hover:bg-white/20 backdrop-blur-sm font-black px-12 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-xl w-full sm:w-auto bg-white/10"
                  >
                    <Play className="h-6 w-6 mr-3" />
                    Watch Success Stories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-20 md:py-24 w-full bg-gradient-to-b from-gray-50 to-white relative" aria-labelledby="categories-heading">
        {/* Visual Anchor */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] rounded-full"></div>
        
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-16 md:mb-20">
            <div className="mb-6">
              <Badge className="bg-emerald-100 text-emerald-700 px-6 py-3 text-lg font-bold">
                🎯 Choose Your Transformation Path
              </Badge>
            </div>
            <h2 id="categories-heading" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-800 mb-6">
              Your Journey to
              <span className="block text-transparent bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] bg-clip-text mt-2">
                Extraordinary Results
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
              Join 25,000+ success stories across India's premium wellness destinations. 
              <span className="block text-emerald-600 font-bold mt-2">Your transformation starts with one click.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: "Premium Gyms",
                description: "State-of-the-art fitness centers with cutting-edge equipment and expert guidance",
                image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/gyms",
                icon: Dumbbell,
                color: "from-red-600 to-red-800",
                stats: "200+ Locations",
                benefit: "Build Strength & Muscle"
              },
              {
                title: "Luxury Spas",
                description: "Rejuvenating treatments in serene environments for complete wellness",
                image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/spas",
                icon: Waves,
                color: "from-blue-400 to-blue-600",
                stats: "150+ Spas",
                benefit: "Stress Relief & Relaxation"
              },
              {
                title: "Yoga Studios",
                description: "Find inner peace and flexibility with certified yoga instructors",
                image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/yoga",
                icon: Heart,
                color: "from-green-500 to-emerald-600",
                stats: "300+ Studios",
                benefit: "Mind-Body Balance"
              },
              {
                title: "Expert Trainers",
                description: "Certified fitness professionals for personalized transformation journeys",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/trainers",
                icon: Users,
                color: "from-purple-500 to-indigo-600",
                stats: "500+ Trainers",
                benefit: "Personal Coaching"
              }
            ].map((category, index) => (
              <Link key={index} to={category.link} className="group">
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 h-full flex flex-col border-2 hover:border-[#0FFCBE] relative bg-white group-hover:bg-gray-50">
                  {/* Image Section */}
                  <div className="relative h-56 sm:h-64 overflow-hidden flex-shrink-0">
                    <OptimizedImage 
                      src={category.image} 
                      alt={`${category.title} - ${category.description}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      width={500}
                      height={300}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80 group-hover:opacity-90 transition-opacity`}></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-800 font-bold px-3 py-1">
                        {category.stats}
                      </Badge>
                    </div>
                    
                    {/* Icon and Title Overlay */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <category.icon className="h-10 w-10 md:h-12 md:w-12 mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <h3 className="text-2xl md:text-3xl font-black">{category.title}</h3>
                      <p className="text-lg font-bold opacity-90">{category.benefit}</p>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <CardContent className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <p className="text-gray-600 text-lg font-medium leading-relaxed mb-4">{category.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-600 font-bold text-lg">Explore Options</span>
                      <ArrowRight className="h-5 w-5 text-emerald-600 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Businesses Section */}
      <section className="py-20 md:py-24 bg-white w-full relative" aria-labelledby="featured-heading">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-[#0FFCBE] to-[#106EBE] rounded-full"></div>
        
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <div className="mb-6 flex items-center justify-center">
              <Badge className="bg-red-100 text-red-600 px-6 py-3 text-xl font-bold animate-pulse">
                🔥 Trending Now - Limited Spots!
              </Badge>
            </div>
            <h2 id="featured-heading" className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-800 mb-6">
              Most Booked This Week
              <span className="block text-transparent bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] bg-clip-text text-3xl sm:text-4xl md:text-5xl mt-3">
                Book Before They're Full!
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-3xl mx-auto">
              These premium destinations are in high demand. Secure your spot today with our 
              <span className="text-emerald-600 font-bold"> risk-free booking guarantee.</span>
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" role="status" aria-label="Loading featured destinations">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 md:h-56 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6 md:p-8">
                    <div className="h-5 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredBusinesses.slice(0, 6).map((business, index) => (
                <Card key={business.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-2 hover:border-[#0FFCBE] bg-white">
                  <div className="relative overflow-hidden h-48 md:h-56">
                    <OptimizedImage 
                      src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                      alt={`${business.business_name} - ${business.category} in ${business.city}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      width={500}
                      height={300}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
                        {business.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {index < 3 && (
                        <Badge className="bg-red-500 text-white font-bold animate-pulse">
                          Only {3 - index} slots left!
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-bold">4.8</span>
                          </div>
                          <span className="text-xs text-gray-600 font-medium">124 reviews</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3 p-6 md:p-8">
                    <CardTitle className="text-xl md:text-2xl group-hover:text-emerald-600 transition-colors line-clamp-1 font-black">
                      {business.business_name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      <span className="truncate font-semibold">{business.city}, {business.state}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 p-6 md:p-8">
                    <p className="text-gray-600 text-base mb-6 line-clamp-2 font-medium leading-relaxed">
                      {business.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-800">Starting from</span>
                        <span className="text-2xl font-black text-emerald-600">₹999/mo</span>
                      </div>
                      
                      <Button 
                        onClick={() => handleBookNow(business)}
                        className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 font-black py-3 text-lg transition-all duration-300 transform hover:scale-105"
                        aria-label={`Book now at ${business.business_name}`}
                      >
                        Book FREE Trial - Save 50%
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // ... keep existing code (no businesses found state) the same ...
            <div className="text-center py-12 md:py-16">
              <div className="text-6xl md:text-8xl mb-4" role="img" aria-label="Running person emoji">🏃‍♂️</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">No businesses found</h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {searchTerm || locationFilter 
                  ? "Try adjusting your search criteria or explore our categories above."
                  : "Be the first! Register your business and start attracting customers today."
                }
              </p>
              <div className="flex gap-4 justify-center flex-col sm:flex-row">
                <Link to="/register-business">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 font-bold w-full sm:w-auto">
                    Register Your Business
                  </Button>
                </Link>
                <Link to="/register-trainer">
                  <Button variant="outline" size="lg" className="font-bold w-full sm:w-auto">
                    Register as Trainer
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-24 md:py-28 bg-gradient-to-b from-gray-50 to-white relative" aria-labelledby="testimonials-heading">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] rounded-full"></div>
        
        <div className="w-full px-4 md:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="mb-8 flex items-center justify-center">
              <Badge className="bg-green-100 text-green-700 px-8 py-4 text-2xl font-black">
                ⭐ 25,000+ Life Transformations
              </Badge>
            </div>
            <h2 id="testimonials-heading" className="text-5xl md:text-7xl font-black text-gray-800 mb-8">
              Real Stories,
              <span className="block text-transparent bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] bg-clip-text">
                Real Results
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto font-semibold leading-relaxed">
              See how our platform transformed lives across India's top cities. 
              <span className="block text-emerald-600 mt-2">Your success story starts today.</span>
            </p>
          </div>
          <TestimonialsSection />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-28 bg-white relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-[#0FFCBE] to-[#106EBE] rounded-full"></div>
        <FAQSection />
      </section>

      {/* Pricing Transparency Section */}
      <PricingTransparency />

      {/* Enhanced Final CTA Section */}
      <section className="py-24 md:py-28 bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] w-full relative overflow-hidden" aria-labelledby="final-cta-heading">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/15 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        </div>
        
        <div className="relative w-full px-4 md:px-8 mx-auto max-w-7xl text-center">
          <div className="max-w-6xl mx-auto text-white">
            {/* Super Urgency */}
            <div className="mb-8 flex items-center justify-center">
              <div className="bg-red-500 text-white px-8 py-4 rounded-full flex items-center gap-3 animate-urgent text-xl font-black shadow-2xl">
                <Clock3 className="h-6 w-6" />
                <span>⚡ Last 48 Hours: FREE Trial + 50% OFF!</span>
              </div>
            </div>
            
            <h2 id="final-cta-heading" className="text-5xl sm:text-6xl md:text-8xl font-black mb-8 drop-shadow-2xl">
              Stop Waiting.
              <span className="block text-[#0FFCBE] drop-shadow-2xl text-4xl sm:text-5xl md:text-7xl mt-4">
                Start Living.
              </span>
            </h2>
            
            <p className="text-2xl md:text-4xl mb-12 opacity-95 leading-relaxed font-bold max-w-4xl mx-auto">
              Join the 25,000+ people who chose transformation over regret.
              <span className="block text-[#0FFCBE] mt-2">Your future self will thank you.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
              <Link to="/signup">
                <Button 
                  size="xl" 
                  className="bg-white text-[#106EBE] hover:bg-gray-100 font-black px-16 py-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-2xl border-4 border-white/20"
                >
                  🚀 Claim Your FREE Trial Now
                  <Badge className="ml-3 bg-red-500 text-white px-3 py-1 text-base animate-pulse">
                    50% OFF
                  </Badge>
                </Button>
              </Link>
              <Link to="/register-business">
                <Button 
                  size="xl" 
                  variant="outline" 
                  className="border-4 border-white/70 text-white hover:bg-white/20 backdrop-blur-sm font-black px-16 py-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-2xl bg-white/10"
                >
                  Partner with Us Today
                </Button>
              </Link>
            </div>
            
            {/* Enhanced Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white/90 max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-2">
                <Shield className="h-8 w-8" />
                <span className="font-bold text-lg">100% Secure</span>
                <span className="text-sm opacity-80">SSL Protected</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Zap className="h-8 w-8" />
                <span className="font-bold text-lg">Instant Access</span>
                <span className="text-sm opacity-80">Start Today</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Award className="h-8 w-8" />
                <span className="font-bold text-lg">Premium Quality</span>
                <span className="text-sm opacity-80">Verified Partners</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Target className="h-8 w-8" />
                <span className="font-bold text-lg">Results Guaranteed</span>
                <span className="text-sm opacity-80">Money Back</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Booking Modal */}
      <GuestBookingModal
        isOpen={guestBookingModal.isOpen}
        onClose={() => setGuestBookingModal({ ...guestBookingModal, isOpen: false })}
        businessName={guestBookingModal.businessName}
        businessType={guestBookingModal.businessType}
        location={guestBookingModal.location}
      />
    </div>
  );
};

export default Index;
