import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Clock, Users, Award, Dumbbell, Waves, Heart, Shield, Zap, Clock3 } from "lucide-react";
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
        title="GymSpaYoga - Find Best Gyms, Spas & Yoga Studios | Book Online"
        description="Discover and book the best gyms, spas, and yoga studios in Mumbai, Delhi, Bangalore. Find certified trainers, premium facilities, and start your wellness journey today!"
        keywords="gym, spa, yoga, fitness, wellness, Mumbai, Delhi, Bangalore, booking, trainers, meditation, massage, therapy"
        url="https://gymspayoga.com"
        structuredData={structuredData}
      />

      {/* Hero Section - Enhanced with emotional appeal and urgency */}
      <section className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden" role="banner">
        {/* Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Spa wellness background showing serene wellness environment"
            className="w-full h-full object-cover"
            priority={true}
            sizes="100vw"
          />
        </div>
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #106EBE 0%, #0FFCBE 100%)", opacity: 0.9 }}></div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 md:space-y-12">
            {/* Enhanced Main Heading with emotional appeal */}
            <header>
              <div className="mb-4 flex items-center justify-center gap-2 text-white/90">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Trusted by 10,000+ Happy Members</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-6 md:mb-8 leading-tight">
                <span className="block drop-shadow-lg">
                  Transform Your Life
                </span>
                <span className="block text-[#0FFCBE] drop-shadow-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">
                  In Just 30 Days
                </span>
              </h1>
              
              {/* Enhanced Subtitle with benefits */}
              <p className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-6 md:mb-8 font-semibold leading-relaxed drop-shadow-sm max-w-4xl mx-auto">
                Find premium gyms, luxury spas & expert trainers near you. 
                <span className="block text-[#0FFCBE] mt-2">Book instantly. Start today.</span>
              </p>

              {/* Urgency Badge */}
              <div className="mb-8 flex items-center justify-center">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 animate-pulse">
                  <Clock3 className="h-4 w-4" />
                  <span className="text-sm font-bold">Limited spots available this week!</span>
                </div>
              </div>
            </header>

            {/* Enhanced Search Bar with urgency */}
            <div className="space-y-6 md:space-y-8">
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl max-w-4xl mx-auto border-2 border-[#0FFCBE]">
                <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" aria-hidden="true" />
                    <Input
                      placeholder="Search gyms, spas, yoga studios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-16 text-lg border-2 border-gray-200 focus:border-[#106EBE] focus:ring-2 focus:ring-[#106EBE]/20 rounded-xl bg-white font-medium"
                      aria-label="Search for wellness destinations"
                    />
                  </div>
                  
                  <div className="relative flex-1">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" aria-hidden="true" />
                    <Input
                      placeholder="Enter your location..."
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="pl-12 h-16 text-lg border-2 border-gray-200 focus:border-[#106EBE] focus:ring-2 focus:ring-[#106EBE]/20 rounded-xl bg-white font-medium"
                      aria-label="Enter your location"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSearch}
                    className="h-16 px-8 md:px-12 bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] hover:from-[#106EBE]/90 hover:to-[#0FFCBE]/90 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
                    aria-label="Search for wellness destinations"
                  >
                    <Search className="h-5 w-5 mr-2" aria-hidden="true" />
                    Find My Perfect Match
                  </Button>
                </div>
                
                {/* Trust indicators */}
                <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Verified Locations</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>Instant Booking</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span>Premium Quality</span>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA Buttons with urgency */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button 
                    size="lg" 
                    className="bg-[#0FFCBE] hover:bg-[#0FFCBE]/90 text-[#106EBE] font-black px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xl w-full sm:w-auto border-2 border-white"
                  >
                    🚀 Start Free Trial Today
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white/50 text-white hover:bg-white/20 backdrop-blur-sm font-bold px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xl w-full sm:w-auto"
                  >
                    View Pricing Plans
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section with stronger visual hierarchy */}
      <section className="py-16 md:py-20 w-full bg-gradient-to-b from-gray-50 to-white relative" aria-labelledby="categories-heading">
        {/* Visual anchor elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] rounded-full"></div>
        
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 id="categories-heading" className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 mb-4 md:mb-6">
              Choose Your Path to
              <span className="block text-transparent bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] bg-clip-text">
                Wellness Success
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
              Join thousands who transformed their lives with our premium wellness destinations
            </p>
          </div>

          {/* ... keep existing code (categories grid) the same ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: "Premium Gyms",
                description: "State-of-the-art fitness centers with modern equipment",
                image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/gyms",
                icon: Dumbbell,
                color: "from-[#B4121B] to-black"
              },
              {
                title: "Luxury Spas",
                description: "Rejuvenating treatments in serene environments",
                image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/spas",
                icon: Waves,
                color: "from-[#96C2DB] to-[#E5EDF1]"
              },
              {
                title: "Yoga Studios",
                description: "Find inner peace with expert yoga instructors",
                image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/yoga",
                icon: Heart,
                color: "from-[#009B4D] to-[#FFCC00]"
              },
              {
                title: "Expert Trainers",
                description: "Connect with certified fitness professionals",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/trainers",
                icon: Users,
                color: "from-[#E9F1FA] to-[#00ABE4]"
              }
            ].map((category, index) => (
              <Link key={index} to={category.link} className="group">
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 h-full flex flex-col border-2 hover:border-[#0FFCBE]">
                  <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0">
                    <OptimizedImage 
                      src={category.image} 
                      alt={`${category.title} - ${category.description}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      width={500}
                      height={300}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-80 transition-opacity`}></div>
                    <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-white">
                      <category.icon className="h-8 w-8 md:h-10 md:w-10 mb-2 md:mb-3" aria-hidden="true" />
                      <h3 className="text-xl md:text-2xl font-black">{category.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 md:p-8 flex-1 flex items-center">
                    <p className="text-gray-600 text-lg text-center font-medium">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Businesses with urgency elements */}
      <section className="py-16 md:py-20 bg-white w-full relative" aria-labelledby="featured-heading">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#0FFCBE] to-[#106EBE] rounded-full"></div>
        
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-8 md:mb-12">
            <div className="mb-4 flex items-center justify-center">
              <Badge className="bg-red-100 text-red-600 px-4 py-2 text-lg font-bold animate-pulse">
                🔥 Trending Now
              </Badge>
            </div>
            <h2 id="featured-heading" className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 mb-4 md:mb-6">
              Featured Destinations
              <span className="block text-transparent bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] bg-clip-text text-2xl sm:text-3xl md:text-4xl mt-2">
                Book Before They're Full!
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-medium">
              Discover top-rated wellness destinations with limited availability
            </p>
          </div>

          {loading ? (
            // ... keep existing code (loading state) the same ...
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" role="status" aria-label="Loading featured destinations">
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
              {filteredBusinesses.slice(0, 6).map((business, index) => (
                <Card key={business.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-2 hover:border-[#0FFCBE]">
                  <div className="relative overflow-hidden h-40 md:h-48">
                    <OptimizedImage 
                      src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                      alt={`${business.business_name} - ${business.category} in ${business.city}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      width={500}
                      height={300}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
                        {business.category}
                      </Badge>
                      {index < 2 && (
                        <Badge className="bg-red-500 text-white font-bold animate-pulse">
                          Only 3 slots left!
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl group-hover:text-emerald-600 transition-colors line-clamp-1 font-bold">
                      {business.business_name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm md:text-base text-gray-600">
                      <MapPin className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" aria-hidden="true" />
                      <span className="truncate font-medium">{business.city}, {business.state}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 p-4 md:p-6">
                    <p className="text-gray-600 text-base mb-4 md:mb-6 line-clamp-2 font-medium">
                      {business.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-current" aria-hidden="true" />
                        <span className="text-sm md:text-base font-bold">4.8</span>
                        <span className="text-sm md:text-base text-gray-500 font-medium">(124)</span>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleBookNow(business)}
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 touch-target text-sm md:text-base font-bold px-6 py-2"
                        aria-label={`Book now at ${business.business_name}`}
                      >
                        Book Now - Free Trial
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // ... keep existing code (no businesses found state) the same ...
            <div className="text-center py-8 md:py-12">
              <div className="text-4xl md:text-6xl mb-3 md:mb-4" role="img" aria-label="Running person emoji">🏃‍♂️</div>
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

      {/* Enhanced Testimonials Section - Now more prominent */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white relative" aria-labelledby="testimonials-heading">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] rounded-full"></div>
        
        <div className="w-full px-4 md:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="mb-6 flex items-center justify-center">
              <Badge className="bg-green-100 text-green-600 px-6 py-3 text-xl font-bold">
                ⭐ 10,000+ Success Stories
              </Badge>
            </div>
            <h2 id="testimonials-heading" className="text-4xl md:text-6xl font-black text-gray-800 mb-6">
              Real People,
              <span className="block text-transparent bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] bg-clip-text">
                Real Results
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
              See how our platform transformed lives across India's top cities
            </p>
          </div>
          <TestimonialsSection />
        </div>
      </section>

      {/* FAQ Section with enhanced styling */}
      <section className="py-20 md:py-24 bg-white relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#0FFCBE] to-[#106EBE] rounded-full"></div>
        <FAQSection />
      </section>

      {/* Pricing Transparency Section */}
      <PricingTransparency />

      {/* Enhanced CTA Section with stronger urgency */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] w-full relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative w-full px-4 md:px-8 mx-auto max-w-7xl text-center">
          <div className="max-w-5xl mx-auto text-white">
            {/* Urgency badge */}
            <div className="mb-8 flex items-center justify-center">
              <div className="bg-red-500 text-white px-6 py-3 rounded-full flex items-center gap-2 animate-pulse text-lg font-bold">
                <Clock3 className="h-5 w-5" />
                <span>Limited time: Free trial ending soon!</span>
              </div>
            </div>
            
            <h2 id="cta-heading" className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 drop-shadow-lg">
              Don't Wait Another Day
              <span className="block text-[#0FFCBE] drop-shadow-2xl text-3xl sm:text-4xl md:text-6xl mt-4">
                Your Best Self Awaits
              </span>
            </h2>
            <p className="text-2xl md:text-3xl mb-12 opacity-90 leading-relaxed font-semibold">
              Join thousands who started their transformation today
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-white text-[#106EBE] hover:bg-gray-100 font-black px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-xl"
                >
                  🚀 Start Your Free Trial Now
                </Button>
              </Link>
              <Link to="/register-business">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/50 text-white hover:bg-white/20 backdrop-blur-sm font-black px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-xl"
                >
                  List Your Business Today
                </Button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="font-medium">100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span className="font-medium">Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span className="font-medium">Premium Quality</span>
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
