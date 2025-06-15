
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, ArrowRight, Dumbbell, Waves, Heart, Star, Crown, Diamond, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBusinessData } from "@/hooks/useBusinessData";
import { useTrainerData } from "@/hooks/useTrainerData";
import RecentListings from "@/components/RecentListings";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTier, setSelectedTier] = useState("all");
  const navigate = useNavigate();

  // Fetch featured businesses and trainers for discovery section
  const { businesses: featuredBusinesses } = useBusinessData(undefined, "", "", selectedTier === 'all' ? undefined : selectedTier);
  const { trainers: featuredTrainers } = useTrainerData(undefined, "", "", selectedTier === 'all' ? undefined : selectedTier);

  const handleSearch = () => {
    // Navigate to search results with filters
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (location) params.set('location', location);
    if (selectedTier !== 'all') params.set('tier', selectedTier);
    
    navigate(`/search?${params.toString()}`);
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'luxury': return <Crown className="h-3 w-3" />;
      case 'premium': return <Diamond className="h-3 w-3" />;
      default: return <IndianRupee className="h-3 w-3" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'luxury': return "from-yellow-500 to-yellow-600";
      case 'premium': return "from-blue-500 to-blue-600";
      default: return "from-green-500 to-green-600";
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="GymSpaYoga - Find Premium Gyms, Spas & Yoga Studios"
        description="Discover and book the best gyms, spas, and yoga studios near you. Connect with certified trainers and wellness experts."
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Perfect
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
              Wellness Destination
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Find premium gyms, luxury spas, peaceful yoga studios, and certified trainers all in one place
          </p>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl mb-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search gyms, spas, yoga studios, trainers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-12 h-14 text-lg border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Select value={selectedTier} onValueChange={setSelectedTier}>
                <SelectTrigger className="h-14 text-lg border-0 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Filter by tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="budget">Budget Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleSearch}
              size="lg" 
              className="w-full mt-4 h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Search className="h-5 w-5 mr-2" />
              Find Your Perfect Match
            </Button>
          </div>

          {/* Quick Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge 
              className={`px-4 py-2 cursor-pointer transition-all ${selectedTier === 'luxury' ? 'bg-yellow-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
              onClick={() => setSelectedTier(selectedTier === 'luxury' ? 'all' : 'luxury')}
            >
              <Crown className="h-4 w-4 mr-1" />
              Luxury
            </Badge>
            <Badge 
              className={`px-4 py-2 cursor-pointer transition-all ${selectedTier === 'premium' ? 'bg-blue-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
              onClick={() => setSelectedTier(selectedTier === 'premium' ? 'all' : 'premium')}
            >
              <Diamond className="h-4 w-4 mr-1" />
              Premium
            </Badge>
            <Badge 
              className={`px-4 py-2 cursor-pointer transition-all ${selectedTier === 'budget' ? 'bg-green-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
              onClick={() => setSelectedTier(selectedTier === 'budget' ? 'all' : 'budget')}
            >
              <IndianRupee className="h-4 w-4 mr-1" />
              Budget Friendly
            </Badge>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore Categories</h2>
            <p className="text-xl text-gray-600">Choose your wellness journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/gyms" className="group">
              <Card className="h-full hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    alt="Premium Gyms" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <Dumbbell className="h-8 w-8 mb-2" />
                    <h3 className="text-2xl font-bold">Premium Gyms</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">State-of-the-art fitness centers with modern equipment and expert trainers.</p>
                  <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                    Explore Gyms
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/spas" className="group">
              <Card className="h-full hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    alt="Luxury Spas" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <Waves className="h-8 w-8 mb-2" />
                    <h3 className="text-2xl font-bold">Luxury Spas</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">Indulge in ultimate relaxation with premium spa treatments and wellness services.</p>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    Explore Spas
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/yoga" className="group">
              <Card className="h-full hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    alt="Yoga Studios" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <Heart className="h-8 w-8 mb-2" />
                    <h3 className="text-2xl font-bold">Yoga Studios</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">Find inner peace and strength through yoga practice in serene environments.</p>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Explore Yoga
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Discovery Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Discover Near You</h2>
            <p className="text-xl text-gray-600">Featured wellness destinations {selectedTier !== 'all' && `in ${selectedTier} tier`}</p>
          </div>

          {/* Featured Businesses */}
          {featuredBusinesses.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Featured Businesses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredBusinesses.slice(0, 6).map((business) => (
                  <Card key={business.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"} 
                        alt={business.business_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className={`absolute top-3 right-3 bg-gradient-to-r ${getTierColor(business.tier!)} text-white`}>
                        {getTierIcon(business.tier!)}
                        <span className="ml-1 capitalize">{business.tier}</span>
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                        {business.business_name}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{business.city}, {business.state}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {business.description || "Premium wellness destination"}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">4.7</span>
                        </div>
                        <p className="text-lg font-bold text-blue-600">
                          {business.monthly_price ? `₹${business.monthly_price}/month` : business.session_price ? `₹${business.session_price}/session` : "Contact"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Featured Trainers */}
          {featuredTrainers.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Featured Trainers</h3>
                <Link to="/trainers">
                  <Button variant="outline">
                    View All Trainers
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTrainers.slice(0, 3).map((trainer) => (
                  <Card key={trainer.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={trainer.profile_image_url || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"} 
                        alt={trainer.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-emerald-500 text-white capitalize">
                        {trainer.trainer_tier}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-emerald-600 transition-colors">
                        {trainer.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{trainer.location}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-3 capitalize">
                        {trainer.category} • {trainer.experience} years experience
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">4.8</span>
                        </div>
                        <p className="text-lg font-bold text-emerald-600">
                          ₹{trainer.hourly_rate}/hour
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recent Listings */}
      <RecentListings />

      {/* Pay Per Use Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Pay Per Use</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            No long-term commitments. Book individual sessions or day passes at your favorite wellness destinations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Browse & Select</h3>
              <p className="text-gray-600">Choose from thousands of verified wellness destinations</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Book Instantly</h3>
              <p className="text-gray-600">Secure your spot with instant booking and confirmation</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy & Pay</h3>
              <p className="text-gray-600">Pay only for what you use with transparent pricing</p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Start Exploring
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Wellness Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of wellness enthusiasts who trust GymSpaYoga for their fitness needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started Free
              </Button>
            </Link>
            <Link to="/register-business">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                List Your Business
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
