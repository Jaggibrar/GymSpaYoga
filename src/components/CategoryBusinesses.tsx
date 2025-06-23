
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Star, Clock, DollarSign, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface Business {
  id: string;
  business_name: string;
  business_type: string;
  city: string;
  state: string;
  address: string;
  monthly_price?: number;
  session_price?: number;
  description: string;
  image_urls: string[];
  opening_time: string;
  closing_time: string;
  amenities: string[];
}

interface CategoryBusinessesProps {
  category: 'gym' | 'spa' | 'yoga';
  title: string;
  description: string;
}

const CategoryBusinesses: React.FC<CategoryBusinessesProps> = ({ category, title, description }) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTier, setSelectedTier] = useState('');
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    fetchBusinesses();
  }, [category]);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('business_type', category)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBusinesses(data || []);
      
      // Extract unique cities
      const uniqueCities = Array.from(new Set(data?.map(b => b.city) || []));
      setCities(uniqueCities);
    } catch (error: any) {
      console.error('Error fetching businesses:', error);
      toast.error('Failed to load businesses');
    } finally {
      setLoading(false);
    }
  };

  const getTierLabel = (monthlyPrice?: number, sessionPrice?: number) => {
    const price = monthlyPrice || sessionPrice || 0;
    if (monthlyPrice) {
      if (monthlyPrice >= 5000) return 'Luxury';
      if (monthlyPrice >= 3000) return 'Premium';
      return 'Budget';
    }
    if (sessionPrice) {
      if (sessionPrice >= 2000) return 'Luxury';
      if (sessionPrice >= 1000) return 'Premium';
      return 'Budget';
    }
    return 'Budget';
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Luxury': return 'bg-purple-100 text-purple-800';
      case 'Premium': return 'bg-blue-100 text-blue-800';
      case 'Budget': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || business.city === selectedCity;
    const businessTier = getTierLabel(business.monthly_price, business.session_price);
    const matchesTier = !selectedTier || businessTier === selectedTier;
    
    return matchesSearch && matchesCity && matchesTier;
  });

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            <span className="ml-2 text-gray-600">Loading {category} listings...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={`Search ${category}s...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Cities</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTier} onValueChange={setSelectedTier}>
                <SelectTrigger>
                  <SelectValue placeholder="All Tiers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Tiers</SelectItem>
                  <SelectItem value="Budget">Budget</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center text-sm text-gray-600">
                <Filter className="h-4 w-4 mr-2" />
                {filteredBusinesses.length} results
              </div>
            </div>
          </div>
        </div>

        {/* Business Listings */}
        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No {title} Found</h3>
            <p className="text-gray-600">Try adjusting your search filters or check back later for new listings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBusinesses.map((business) => {
              const tier = getTierLabel(business.monthly_price, business.session_price);
              
              return (
                <Card key={business.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                  <div className="relative">
                    {business.image_urls && business.image_urls.length > 0 ? (
                      <img
                        src={business.image_urls[0]}
                        alt={business.business_name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-r from-emerald-100 to-blue-100 flex items-center justify-center">
                        <span className="text-gray-500 text-lg">{business.business_name[0]}</span>
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4">
                      <Badge className={getTierColor(tier)}>
                        {tier}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                        {business.business_name}
                      </CardTitle>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">4.5</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{business.address}, {business.city}</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {business.opening_time} - {business.closing_time}
                        </span>
                      </div>

                      {(business.monthly_price || business.session_price) && (
                        <div className="flex items-center text-emerald-600 font-semibold">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {business.monthly_price ? (
                            <span>₹{business.monthly_price}/month</span>
                          ) : (
                            <span>₹{business.session_price}/session</span>
                          )}
                        </div>
                      )}

                      <p className="text-gray-600 text-sm line-clamp-2">
                        {business.description}
                      </p>

                      {business.amenities && business.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {business.amenities.slice(0, 3).map((amenity) => (
                            <Badge key={amenity} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {business.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{business.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Description Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {title}</h2>
              <p className="text-gray-600 leading-relaxed">
                {description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryBusinesses;
