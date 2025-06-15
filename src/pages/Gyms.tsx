
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useOptimizedBusinessData } from "@/hooks/useOptimizedBusinessData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Dumbbell, Filter, Grid, Heart } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import OptimizedBusinessCard from "@/components/OptimizedBusinessCard";

const Gyms = () => {
  useScrollToTop();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  
  // Use optimized hook with debounced values
  const debouncedFilters = useMemo(() => ({
    searchTerm: searchTerm.trim(),
    locationFilter: locationFilter.trim(),
    tierFilter: tierFilter === 'all' ? undefined : tierFilter
  }), [searchTerm, locationFilter, tierFilter]);

  const { businesses: gyms, loading, error } = useOptimizedBusinessData(
    'gym',
    debouncedFilters.searchTerm,
    debouncedFilters.locationFilter,
    debouncedFilters.tierFilter
  );

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
      
      {/* Optimized Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/80 via-orange-500/80 to-yellow-500/80"></div>
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
                <Heart className="h-5 w-5" />
                <span>Trusted by 10K+ Members</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-container py-8 md:py-12">
        {/* Optimized Search Section */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm rounded-3xl mb-8 overflow-hidden">
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

        {/* Optimized Gyms Grid */}
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
              <OptimizedBusinessCard key={gym.id} business={gym} />
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
