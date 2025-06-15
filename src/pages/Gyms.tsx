
import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useBusinessData } from "@/hooks/useBusinessData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Clock, Dumbbell, IndianRupee, Crown, Diamond, Filter, Grid, Heart } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";
import SEOHead from "@/components/SEOHead";

const Gyms = () => {
  useScrollToTop();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  
  const { businesses: gyms, loading, error } = useBusinessData('gym', searchTerm, locationFilter, tierFilter);

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

  const handleBookNow = (gymName: string) => {
    toast.success(`Booking ${gymName}. Please sign in to complete your booking!`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <SEOHead
          title="Gyms - GymSpaYoga"
          description="Find the best gyms and fitness centers near you"
        />
        <div className="mobile-container py-8 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Error loading gyms</h2>
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
        title="Premium Gyms - GymSpaYoga"
        description="Discover state-of-the-art fitness centers with modern equipment and expert trainers. Find luxury, premium, and budget-friendly gyms near you."
      />
      
      {/* Modern Hero Section with Background Image */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/80 via-orange-500/80 to-yellow-500/80"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent"></div>
        <div className="relative mobile-container py-16 md:py-24">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">Premium Gyms</h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Discover state-of-the-art fitness centers with modern equipment and expert trainers
            </p>
            <div className="flex items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Grid className="h-5 w-5" />
                <span>{gyms.length} Premium Locations</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-current" />
                <span>Top Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span>Trusted by 10K+ Members</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-container py-8 md:py-12">
        {/* Modern Search Section */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm rounded-3xl mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-100/50 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
          <CardContent className="relative p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Filter className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Find Your Perfect Gym</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search gyms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 rounded-xl"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Enter location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-12 h-14 text-lg border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 rounded-xl"
                />
              </div>
              <Select value={tierFilter} onValueChange={setTierFilter}>
                <SelectTrigger className="h-14 text-lg border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 rounded-xl">
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

        {/* Gyms Grid */}
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
        ) : gyms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gyms.map((gym) => (
              <Card key={gym.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 rounded-3xl overflow-hidden bg-white">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={gym.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                    alt={gym.business_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${getTierColor(gym.tier!)} text-white border-0 px-3 py-2 rounded-full`}>
                    {getTierIcon(gym.tier!)}
                    <span className="ml-1 capitalize font-semibold">{gym.tier}</span>
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="font-medium">4.7</span>
                      <span className="text-sm opacity-90">(142 reviews)</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold group-hover:text-red-600 transition-colors mb-2 line-clamp-1">
                      {gym.business_name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm truncate">{gym.city}, {gym.state}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {gym.description || "Modern fitness center with state-of-the-art equipment and professional trainers."}
                  </p>
                  
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <Clock className="h-4 w-4" />
                    <span>{gym.opening_time} - {gym.closing_time}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-red-600">
                        {gym.monthly_price ? `₹${gym.monthly_price}` : gym.session_price ? `₹${gym.session_price}` : "Contact"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {gym.monthly_price ? "/month" : gym.session_price ? "/session" : "for pricing"}
                      </p>
                    </div>
                    <Link to={`/gyms/${gym.id}`}>
                      <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl px-6 py-3 font-semibold transform hover:scale-105 transition-all duration-300">
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
            <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Dumbbell className="h-12 w-12 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No gyms found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm || locationFilter || tierFilter !== 'all'
                ? "Try adjusting your search criteria or explore other locations."
                : "Be the first! Register your gym and start attracting members."
              }
            </p>
            <div className="flex gap-4 justify-center flex-col sm:flex-row">
              <Link to="/register-business">
                <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl px-8 py-3 font-semibold w-full sm:w-auto">
                  Register Your Gym
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="rounded-xl px-8 py-3 font-semibold w-full sm:w-auto border-2 hover:border-red-500 hover:text-red-600">
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

export default Gyms;
