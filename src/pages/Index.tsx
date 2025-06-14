
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Users, Award, Dumbbell, Waves, Heart, Shield, Zap, Target, CheckCircle, ArrowRight, Play, UserPlus, Building2, Diamond, IndianRupee, Crown } from "lucide-react";
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
import GuestBookingModal from "@/components/GuestBookingModal";

const Index = () => {
  useScrollToTop();
  const { gyms, loading: gymsLoading } = useGyms();
  const { trainers, loading: trainersLoading } = useTrainers();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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

    const matchesTier = selectedTier === "" || business.category_tier === selectedTier;

    return matchesSearch && matchesLocation && matchesTier;
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
      toast.info("Searching for wellness centers...");
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode this
          setLocationFilter("Current Location");
          toast.success("Location detected!");
        },
        () => {
          toast.error("Unable to detect location");
        }
      );
    } else {
      toast.error("Geolocation not supported");
    }
  };

  const tiers = [
    {
      id: 'luxury',
      label: 'Luxury',
      icon: <Crown className="h-8 w-8" />,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Premium experiences'
    },
    {
      id: 'premium',
      label: 'Premium',
      icon: <Diamond className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      description: 'Quality services'
    },
    {
      id: 'budget',
      label: 'Budget-friendly',
      icon: <IndianRupee className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      description: 'Affordable options'
    }
  ];

  const categories = [
    {
      id: 'gym',
      name: 'Gyms',
      icon: <Dumbbell className="h-12 w-12" />,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: 'from-red-500 to-red-600',
      link: '/gyms'
    },
    {
      id: 'spa',
      name: 'Spas',
      icon: <Waves className="h-12 w-12" />,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: 'from-blue-500 to-blue-600',
      link: '/spas'
    },
    {
      id: 'yoga',
      name: 'Yoga Studios',
      icon: <Heart className="h-12 w-12" />,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: 'from-green-500 to-emerald-600',
      link: '/yoga'
    },
    {
      id: 'trainer',
      name: 'Personal Trainers',
      icon: <Users className="h-12 w-12" />,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: 'from-purple-500 to-indigo-600',
      link: '/trainers'
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GymSpaYoga",
    "description": "Discover and book the best gyms, spas, yoga studios, and personal trainers near you. Your wellness journey starts here!",
    "url": "https://gymspayoga.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://gymspayoga.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <SEOHead
        title="GymSpaYoga - Discover Wellness Centers Near You"
        description="Find and book the best gyms, spas, yoga studios, and personal trainers in your area. Discover luxury, premium, and budget-friendly wellness options."
        keywords="gym, spa, yoga, fitness, wellness, trainers, Mumbai, Delhi, Bangalore, booking, health"
        url="https://gymspayoga.com"
        structuredData={structuredData}
      />

      {/* Hero Search Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="absolute inset-0">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Wellness and health discovery platform"
            className="w-full h-full object-cover opacity-30"
            priority={true}
            sizes="100vw"
          />
        </div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Discover Your Perfect
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text">
              Wellness Destination
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto font-medium">
            Find gyms, spas, yoga studios, and personal trainers near you
          </p>

          {/* Main Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-5xl mx-auto border border-gray-200 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <Input
                  placeholder="Search gyms, spas, yoga, or trainers near you..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 h-16 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <Input
                  placeholder="Enter your location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-14 h-16 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
                <Button
                  onClick={detectLocation}
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700"
                >
                  Detect
                </Button>
              </div>
              
              <Button 
                onClick={handleSearch}
                className="h-16 px-12 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 font-bold text-lg rounded-xl"
              >
                <Search className="h-6 w-6 mr-2" />
                Search
              </Button>
            </div>

            {/* Category Filters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`h-16 flex flex-col items-center justify-center gap-2 ${
                    selectedCategory === category.id 
                      ? `bg-gradient-to-r ${category.color} text-white` 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {category.icon}
                  <span className="text-sm font-medium">{category.name}</span>
                </Button>
              ))}
            </div>

            {/* Tier Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tiers.map((tier) => (
                <Button
                  key={tier.id}
                  onClick={() => setSelectedTier(selectedTier === tier.id ? "" : tier.id)}
                  variant={selectedTier === tier.id ? "default" : "outline"}
                  className={`h-20 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                    selectedTier === tier.id 
                      ? `bg-gradient-to-r ${tier.color} text-white shadow-lg scale-105` 
                      : 'hover:bg-gray-50 hover:scale-102'
                  }`}
                >
                  {tier.icon}
                  <div className="text-center">
                    <div className="font-bold">{tier.label}</div>
                    <div className="text-xs opacity-90">{tier.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore different wellness categories to find exactly what you're looking for
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link key={category.id} to={category.link}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      width={500}
                      height={300}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                    
                    <div className="absolute bottom-4 left-4 text-white">
                      {category.icon}
                      <h3 className="text-xl font-bold mt-2">{category.name}</h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 text-center">
                    <Button className="w-full" variant="outline">
                      Explore {category.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use GymSpaYoga Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">Why Choose GymSpaYoga?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy Search",
                description: "Find wellness centers near you with our powerful search and filters",
                icon: <Search className="h-12 w-12 text-blue-600" />
              },
              {
                title: "Verified Listings",
                description: "All businesses are verified to ensure quality and authenticity",
                icon: <Shield className="h-12 w-12 text-green-600" />
              },
              {
                title: "Direct Contact",
                description: "Connect directly with businesses - no middleman, no extra fees",
                icon: <Zap className="h-12 w-12 text-purple-600" />
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action for Business Owners */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Building2 className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black mb-6">Own a Wellness Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of gyms, spas, yoga studios, and trainers already on our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register-business">
              <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 font-black px-12 py-4 text-xl">
                List Your Business
              </Button>
            </Link>
            <Link to="/business">
              <Button size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-black px-12 py-4 text-xl">
                Learn More
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
