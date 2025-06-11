
import { useState } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useGyms } from "@/hooks/useGyms";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Filter, Star, Clock, Users, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import CategoryBusinesses from "@/components/CategoryBusinesses";

const Gyms = () => {
  useScrollToTop();
  const { gyms, loading, error } = useGyms();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // Filter only gym businesses
  const gymBusinesses = gyms.filter(business => business.business_type === 'gym');

  const filteredGyms = gymBusinesses.filter(gym => {
    const matchesSearch = searchTerm === "" || 
      gym.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gym.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === "" ||
      gym.city.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesCategory = categoryFilter === "" || gym.category.toLowerCase() === categoryFilter.toLowerCase();
    
    const matchesPrice = priceFilter === "" || 
      (priceFilter === "budget" && gym.monthly_price && gym.monthly_price <= 2000) ||
      (priceFilter === "premium" && gym.monthly_price && gym.monthly_price > 2000 && gym.monthly_price <= 4000) ||
      (priceFilter === "luxury" && gym.monthly_price && gym.monthly_price > 4000);

    return matchesSearch && matchesLocation && matchesCategory && matchesPrice;
  });

  if (error) {
    toast.error(error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-50">
      <PageHero
        title="Premium Fitness"
        subtitle="Centers"
        description="Discover state-of-the-art gyms with modern equipment and expert trainers."
        backgroundImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      />

      <CategoryBusinesses category="gym" />

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Filter Gyms</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search gyms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="budget">Budget Friendly</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Prices</SelectItem>
                <SelectItem value="budget">Under ₹2,000</SelectItem>
                <SelectItem value="premium">₹2,000 - ₹4,000</SelectItem>
                <SelectItem value="luxury">Above ₹4,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Dumbbell className="h-6 w-6 text-red-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Available Gyms
            </h2>
          </div>
          <Badge className="mb-4 bg-red-500">
            Showing {filteredGyms.length} results
          </Badge>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredGyms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGyms.map((gym) => (
              <Card key={gym.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={gym.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                    alt={gym.business_name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600">
                    {gym.category}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                    {gym.business_name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {gym.city}, {gym.state}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {gym.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{gym.opening_time} - {gym.closing_time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>4.8</span>
                      </div>
                    </div>

                    {gym.monthly_price && (
                      <div className="text-lg font-bold text-red-600">
                        ₹{gym.monthly_price}/month
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 mb-3">
                      {gym.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {gym.amenities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{gym.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                      onClick={() => toast.success(`Booking ${gym.business_name}. Please sign in to complete your booking!`)}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏋️‍♂️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No gyms found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || locationFilter || categoryFilter || priceFilter 
                ? "Try adjusting your filters or search criteria."
                : "Be the first gym to join our platform!"
              }
            </p>
            <Link to="/register-business">
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                Register Your Gym
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gyms;
