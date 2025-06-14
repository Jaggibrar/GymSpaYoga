
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Users, Award, Dumbbell, Waves, Heart, Shield, Zap, Target, CheckCircle, ArrowRight, Play, UserPlus, Building2 } from "lucide-react";
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
import TrustSignals from "@/components/TrustSignals";
import ReviewsSystem from "@/components/ReviewsSystem";

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
        title="GymSpaYoga - Find Your Perfect Fitness Partner | Coming Soon"
        description="India's next big fitness platform launching soon! Join our beta program as a user or partner business. Revolutionary wellness discovery awaits."
        keywords="gym, spa, yoga, fitness, wellness, beta launch, Mumbai, Delhi, Bangalore, booking, trainers"
        url="https://gymspayoga.com"
        structuredData={structuredData}
      />

      {/* Clean Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="absolute inset-0">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Transform your life with premium wellness destinations"
            className="w-full h-full object-cover opacity-20"
            priority={true}
            sizes="100vw"
          />
        </div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
          {/* Beta Badge */}
          <Badge className="bg-orange-500 text-white px-6 py-2 text-lg font-bold mb-8 animate-pulse">
            🚀 Coming Soon - Beta Access Available
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            India's Next Big
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text">
              Fitness Platform
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto font-medium">
            We're building something amazing for fitness enthusiasts and businesses. 
            <span className="block text-emerald-600 font-bold mt-2">Be part of the revolution!</span>
          </p>

          {/* Dual CTA Section */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* For Users */}
            <Card className="p-8 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl">
              <div className="text-center">
                <UserPlus className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">For Fitness Enthusiasts</h3>
                <p className="text-gray-600 mb-6">
                  Get early access to discover premium gyms, spas, and yoga studios near you.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Beta access to premium locations</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Special launch pricing</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>First to experience new features</span>
                  </div>
                </div>
                <Link to="/signup">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-bold py-3 text-lg">
                    Join Beta Waitlist
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* For Businesses */}
            <Card className="p-8 border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl">
              <div className="text-center">
                <Building2 className="h-16 w-16 mx-auto mb-4 text-emerald-600" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">For Business Owners</h3>
                <p className="text-gray-600 mb-6">
                  Partner with us and be among the first businesses on our platform.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Only ₹20 per qualified lead</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>No setup fees during beta</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Founding partner benefits</span>
                  </div>
                </div>
                <Link to="/business">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 font-bold py-3 text-lg">
                    Become a Partner
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Search Preview */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-4xl mx-auto border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Get a preview of what's coming</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search gyms, spas, yoga studios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                />
              </div>
              
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Mumbai, Delhi, Bangalore..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                />
              </div>
              
              <Button 
                onClick={handleSearch}
                className="h-14 px-8 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 font-bold text-lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Building Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">What We're Building</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A revolutionary platform that connects fitness enthusiasts with premium wellness destinations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Premium Gyms",
                description: "State-of-the-art fitness centers with cutting-edge equipment",
                image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                icon: Dumbbell,
                color: "from-red-500 to-red-600"
              },
              {
                title: "Luxury Spas",
                description: "Rejuvenating treatments in serene environments",
                image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                icon: Waves,
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Yoga Studios",
                description: "Find inner peace with certified instructors",
                image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                icon: Heart,
                color: "from-green-500 to-emerald-600"
              },
              {
                title: "Expert Trainers",
                description: "Certified professionals for personalized coaching",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                icon: Users,
                color: "from-purple-500 to-indigo-600"
              }
            ].map((category, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    width={500}
                    height={300}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                  
                  <div className="absolute bottom-4 left-4 text-white">
                    <category.icon className="h-8 w-8 mb-2" />
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-gray-600">{category.description}</p>
                  <Badge className="mt-3 bg-gray-100 text-gray-700">Coming Soon</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals and Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <ReviewsSystem />
            </div>
            <div className="lg:sticky lg:top-8">
              <TrustSignals />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">What People Are Saying</h2>
            <p className="text-xl text-gray-600">Early feedback from our beta community</p>
          </div>
          <TestimonialsSection />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <FAQSection />
      </section>

      {/* Pricing Transparency */}
      <PricingTransparency />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Join the Revolution?</h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of India's next big fitness platform from day one
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 font-black px-12 py-4 text-xl">
                Join as User
              </Button>
            </Link>
            <Link to="/business">
              <Button size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-black px-12 py-4 text-xl">
                Become a Partner
              </Button>
            </Link>
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
