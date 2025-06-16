
import { useState } from 'react';
import { useBusinessData } from '@/hooks/useBusinessData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Star, Clock, Phone, Mail, Crown, Diamond, IndianRupee, Search, Filter } from 'lucide-react';
import BookingModal from '@/components/BookingModal';

const BusinessListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  
  const { businesses, loading, error } = useBusinessData(
    categoryFilter === 'all' ? undefined : categoryFilter,
    searchTerm,
    locationFilter,
    'created_at'
  );

  const getTierFromPricing = (business: any) => {
    const price = business.monthly_price || business.session_price || 0;
    if (price >= 5000) return 'luxury';
    if (price >= 3000) return 'premium';
    return 'budget';
  };

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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading businesses: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search businesses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="gym">Gyms</SelectItem>
              <SelectItem value="spa">Spas</SelectItem>
              <SelectItem value="yoga">Yoga Studios</SelectItem>
              <SelectItem value="fitness_center">Fitness Centers</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={tierFilter} onValueChange={setTierFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="budget">Budget</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Business Cards */}
      {businesses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No businesses found</h3>
          <p className="text-gray-500">Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => {
            const tier = getTierFromPricing(business);
            return (
              <Card key={business.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"} 
                    alt={business.business_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-3 right-3 bg-gradient-to-r ${getTierColor(tier)} text-white border-0`}>
                    {getTierIcon(tier)}
                    <span className="ml-1 capitalize">{tier}</span>
                  </Badge>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors line-clamp-1">
                      {business.business_name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-yellow-600">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-medium">4.7</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{business.city}, {business.state}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {business.description || "Premium wellness destination offering excellent services"}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                      {business.business_type?.replace('_', ' ').toUpperCase()}
                    </Badge>
                    {business.amenities?.slice(0, 2).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{business.opening_time} - {business.closing_time}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      {business.monthly_price && (
                        <p className="text-lg font-bold text-blue-600">₹{business.monthly_price}/month</p>
                      )}
                      {business.session_price && (
                        <p className="text-lg font-bold text-blue-600">₹{business.session_price}/session</p>
                      )}
                      {!business.monthly_price && !business.session_price && (
                        <p className="text-lg font-bold text-blue-600">Contact for pricing</p>
                      )}
                    </div>
                    
                    <BookingModal
                      businessName={business.business_name}
                      businessType={business.business_type}
                      businessId={business.id}
                      price={business.monthly_price ? `₹${business.monthly_price}` : business.session_price ? `₹${business.session_price}` : undefined}
                      trigger={
                        <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                          Book Now
                        </Button>
                      }
                    />
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{business.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BusinessListings;
