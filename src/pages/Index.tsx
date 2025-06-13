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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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

  const heroImages = [
    {
      src: "https://img.freepik.com/free-photo/close-up-woman-doing-crossfit-workout_23-2149153072.jpg",
      alt: "Woman doing crossfit workout",
      title: "Premium Gyms",
      category: "Fitness"
    },
    {
      src: "https://img.freepik.com/free-photo/woman-relaxing-spa_23-2148827906.jpg", 
      alt: "Woman relaxing at spa",
      title: "Luxury Spas",
      category: "Wellness"
    },
    {
      src: "https://img.freepik.com/free-photo/woman-digital-disconnecting-home-by-doing-yoga_23-2151067825.jpg",
      alt: "Woman doing yoga at home",
      title: "Yoga Studios", 
      category: "Mindfulness"
    }
  ];

  return (
    <div className="min-h-screen w-full">
      <SEOHead
        title="GymSpaYoga - Find Best Gyms, Spas & Yoga Studios | Book Online"
        description="Discover and book the best gyms, spas, and yoga studios in Mumbai, Delhi, Bangalore. Find certified trainers, premium facilities, and start your wellness journey today!"
        keywords="gym, spa, yoga, fitness, wellness, Mumbai, Delhi, Bangalore, booking, trainers, meditation, massage, therapy"
        url="https://gymspayoga.com"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Spa wellness background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Blue to Mint Gradient Overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #106EBE 0%, #0FFCBE 100%)", opacity: 0.85 }}></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Hero Content */}
            <div className="space-y-6">
              {/* Main Heading */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                  <span className="block drop-shadow-lg">
                    Discover the
                  </span>
                  <span className="block text-[#0FFCBE] drop-shadow-lg">
                    Wonder
                  </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-lg text-white/95 mb-6 font-light leading-relaxed drop-shadow-sm max-w-lg">
                  Experience the tranquility of our unique wellness destinations. Stay at our facilities designed for serenity and complete relaxation.
                </p>
              </div>

              {/* Search Bar */}
              <div className="space-y-4">
                <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30 shadow-2xl">
                  <div className="flex flex-col gap-3 md:flex-row md:gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                      <Input
                        placeholder="Search gyms, spas, yoga studios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-12 border-0 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/70 focus:ring-2 focus:ring-[#0FFCBE]/50 rounded-xl font-medium"
                        aria-label="Search for wellness destinations"
                      />
                    </div>
                    
                    <div className="relative flex-1">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                      <Input
                        placeholder="Enter your location..."
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="pl-10 h-12 border-0 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/70 focus:ring-2 focus:ring-[#0FFCBE]/50 rounded-xl font-medium"
                        aria-label="Enter your location"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSearch}
                      className="h-12 px-8 bg-[#0FFCBE] hover:bg-[#0FFCBE]/90 text-[#106EBE] font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Explore
                    </Button>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-start">
                  <Link to="/signup">
                    <Button 
                      size="lg" 
                      className="bg-[#0FFCBE] hover:bg-[#0FFCBE]/90 text-[#106EBE] font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Start Your Journey
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side - Image Slider */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                  <CarouselContent>
                    {heroImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <Card className="border-0 bg-white/10 backdrop-blur-sm shadow-2xl overflow-hidden">
                          <CardContent className="p-0">
                            <div className="aspect-square relative">
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                              <div className="absolute bottom-4 left-4 text-white">
                                <Badge className="mb-2 bg-[#0FFCBE]/20 text-[#0FFCBE] border-[#0FFCBE]/30">
                                  {image.category}
                                </Badge>
                                <h3 className="text-lg font-bold drop-shadow-lg">
                                  {image.title}
                                </h3>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 bg-white/20 border-white/30 text-white hover:bg-white/30" />
                  <CarouselNext className="right-2 bg-white/20 border-white/30 text-white hover:bg-white/30" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
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

      {/* Featured Businesses */}
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
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 touch-target text-xs md:text-sm"
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

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] w-full relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative w-full px-4 md:px-8 mx-auto max-w-7xl text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              Ready to Transform Your
              <span className="block text-[#0FFCBE] drop-shadow-2xl">
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
                  className="bg-white text-[#106EBE] hover:bg-gray-100 font-bold px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
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
