
import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useBusinessData } from "@/hooks/useBusinessData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Clock, Waves, IndianRupee, Crown, Diamond, Filter, Grid, Heart } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";
import SEOHead from "@/components/SEOHead";

const Spas = () => {
  useScrollToTop();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  
  const { businesses: spas, loading, error } = useBusinessData('spa', searchTerm, locationFilter, tierFilter);

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'luxury': return <Crown className="h-4 w-4" />;
      case 'premium': return <Diamond className="h-4 w-4" />;
      default: return <IndianRupee className="h-4 w-4" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'luxury': return "from-yellow-500 to-yellow-600";
      case 'premium': return "from-blue-500 to-blue-600";
      default: return "from-green-500 to-green-600";
    }
  };

  const handleBookNow = (spaName: string) => {
    toast.success(`Booking ${spaName}. Please sign in to complete your booking!`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <SEOHead
          title="Spas - GymSpaYoga"
          description="Find the best spas and wellness centers near you"
        />
        <div className="mobile-container py-8 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Error loading spas</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link to="/">
              <Button className="touch-target bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <SEOHead
        title="Premium Spas - GymSpaYoga"
        description="Discover luxurious spas and wellness centers for ultimate relaxation. Find luxury, premium, and budget-friendly spas near you."
      />
      
      {/* Modern Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative mobile-container py-16 md:py-24">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Waves className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">Luxury Spas</h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Indulge in ultimate relaxation with premium spa treatments and wellness services
            </p>
            <div className="flex items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Grid className="h-5 w-5" />
                <span>{spas.length} Luxury Locations</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-current" />
                <span>Premium Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span>Wellness Focused</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-container py-8 md:py-12">
        {/* Modern Search Section */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm rounded-3xl mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
          <CardContent className="relative p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Filter className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Find Your Perfect Spa</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search spas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-xl"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Enter location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-12 h-14 text-lg border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-xl"
                />
              </div>
              <Select value={tierFilter} onValueChange={setTierFilter}>
                <SelectTrigger className="h-14 text-lg border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-xl">
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
          </CardContent>
        </Card>

        {/* Spas Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse border-0 rounded-3xl">
                <div className="h-48 bg-gray-200 rounded-t-3xl"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : spas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spas.map((spa) => (
              <Card key={spa.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 rounded-3xl overflow-hidden bg-white">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={spa.image_urls?.[0] || "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                    alt={spa.business_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${getTierColor(spa.tier!)} text-white border-0 px-3 py-2 rounded-full`}>
                    {getTierIcon(spa.tier!)}
                    <span className="ml-1 capitalize font-semibold">{spa.tier}</span>
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="font-medium">4.8</span>
                      <span className="text-sm opacity-90">(89 reviews)</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">
                      {spa.business_name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm truncate">{spa.city}, {spa.state}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {spa.description || "Luxurious spa offering premium wellness treatments and relaxation services."}
                  </p>
                  
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <Clock className="h-4 w-4" />
                    <span>{spa.opening_time} - {spa.closing_time}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {spa.monthly_price ? `₹${spa.monthly_price}` : spa.session_price ? `₹${spa.session_price}` : "Contact"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {spa.monthly_price ? "/month" : spa.session_price ? "/session" : "for pricing"}
                      </p>
                    </div>
                    <Link to={`/spa/${spa.id}`}>
                      <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl px-6 py-3 font-semibold transform hover:scale-105 transition-all duration-300">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Waves className="h-12 w-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No spas found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm || locationFilter || tierFilter !== 'all'
                ? "Try adjusting your search criteria or explore other locations."
                : "Be the first! Register your spa and start attracting clients."
              }
            </p>
            <div className="flex gap-4 justify-center flex-col sm:flex-row">
              <Link to="/register-business">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl px-8 py-3 font-semibold w-full sm:w-auto">
                  Register Your Spa
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="rounded-xl px-8 py-3 font-semibold w-full sm:w-auto border-2 hover:border-blue-500 hover:text-blue-600">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Spas;
