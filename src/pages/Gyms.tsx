
import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useBusinessData } from "@/hooks/useBusinessData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Clock, Dumbbell, IndianRupee, Crown, Diamond } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <SEOHead
          title="Gyms - GymSpaYoga"
          description="Find the best gyms and fitness centers near you"
        />
        <div className="mobile-container py-8 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Error loading gyms</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link to="/">
              <Button className="touch-target">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <SEOHead
        title="Premium Gyms - GymSpaYoga"
        description="Discover state-of-the-art fitness centers with modern equipment and expert trainers. Find luxury, premium, and budget-friendly gyms near you."
      />
      
      <PageHero
        title="Premium Gyms"
        subtitle="Fitness & Strength"
        description="Discover state-of-the-art fitness centers with modern equipment and expert trainers."
        backgroundImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      />

      <div className="mobile-container py-4 md:py-8">
        {/* Search Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl mb-6 md:mb-8">
          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
              <Input
                placeholder="Search gyms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 md:pl-12 h-12 md:h-14 mobile-text md:text-lg border-0 focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
              <Input
                placeholder="Enter location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10 md:pl-12 h-12 md:h-14 mobile-text md:text-lg border-0 focus:ring-2 focus:ring-red-500"
              />
            </div>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="h-12 md:h-14 mobile-text md:text-lg border-0 focus:ring-2 focus:ring-red-500">
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
        </div>

        {/* Gyms Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-40 md:h-48 bg-gray-200"></div>
                <CardContent className="p-4 md:p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : gyms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {gyms.map((gym) => (
              <Card key={gym.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden h-40 md:h-48">
                  <img 
                    src={gym.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                    alt={gym.business_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className={`absolute top-3 md:top-4 right-3 md:right-4 bg-gradient-to-r ${getTierColor(gym.tier!)} text-white`}>
                    {getTierIcon(gym.tier!)}
                    <span className="ml-1 capitalize">{gym.tier}</span>
                  </Badge>
                </div>
                <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                  <CardTitle className="text-base md:text-lg group-hover:text-red-600 transition-colors line-clamp-1">
                    {gym.business_name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                    <span className="truncate">{gym.city}, {gym.state}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 p-4 md:p-6">
                  <p className="text-gray-600 mobile-text mb-3 md:mb-4 line-clamp-2">
                    {gym.description || "Modern fitness center with state-of-the-art equipment and professional trainers."}
                  </p>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current" />
                      <span className="text-xs md:text-sm font-medium">4.7</span>
                      <span className="text-xs md:text-sm text-gray-500">(142)</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs md:text-sm text-gray-600">
                      <Clock className="h-3 w-3 md:h-4 md:w-4" />
                      <span>{gym.opening_time} - {gym.closing_time}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <p className="text-lg md:text-xl font-bold text-red-600">
                        {gym.monthly_price ? `₹${gym.monthly_price}/month` : gym.session_price ? `₹${gym.session_price}/session` : "Contact for pricing"}
                      </p>
                    </div>
                    <Link to={`/gyms/${gym.id}`}>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 touch-target text-xs md:text-sm"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 md:py-12">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">
              <Dumbbell className="h-16 w-16 md:h-24 md:w-24 mx-auto text-red-400" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">No gyms found</h3>
            <p className="text-gray-600 mb-4 md:mb-6 mobile-text md:text-base">
              {searchTerm || locationFilter || tierFilter !== 'all'
                ? "Try adjusting your search criteria or explore other locations."
                : "Be the first! Register your gym and start attracting members."
              }
            </p>
            <div className="flex gap-3 md:gap-4 justify-center flex-col sm:flex-row">
              <Link to="/register-business">
                <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 touch-target w-full sm:w-auto">
                  Register Your Gym
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="touch-target w-full sm:w-auto">
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
