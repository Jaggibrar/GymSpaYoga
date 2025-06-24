
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Star, Filter, Search, Phone, Mail, Clock, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Business {
  id: string;
  business_name: string;
  category: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  monthly_price?: number;
  session_price?: number;
  description: string;
  image_urls: string[];
  opening_time: string;
  closing_time: string;
  amenities: string[];
  status: string;
}

interface CategoryBusinessesProps {
  category: string;
  title: string;
  description?: string;
}

const CategoryBusinesses: React.FC<CategoryBusinessesProps> = ({ 
  category, 
  title, 
  description 
}) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    fetchBusinesses();
  }, [category]);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('category', category)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  const getTier = (business: Business) => {
    const price = business.monthly_price || business.session_price || 0;
    if (price >= 5000) return 'luxury';
    if (price >= 3000) return 'premium';
    return 'budget';
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'luxury': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'premium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'budget': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'all' || getTier(business) === tierFilter;
    const matchesLocation = !locationFilter || business.city.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesTier && matchesLocation;
  });

  if (loading) {
    return (
      <section className="py-8 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mr-3"></div>
            <span className="text-gray-600">Loading {title.toLowerCase()}...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 bg-white">
      <div className="container mx-auto">
        {/* Search and Filters */}
        <div className="mb-8 bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={`Search ${title.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Tiers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />

            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setTierFilter('all');
              setLocationFilter('');
            }}>
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Business Listings Grid */}
        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-12 w-12 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No {title} Found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || tierFilter !== 'all' || locationFilter 
                  ? 'Try adjusting your search criteria'
                  : `No ${title.toLowerCase()} available in your area yet`
                }
              </p>
              <Button onClick={() => window.location.href = '/register-business'}>
                List Your {category === 'gym' ? 'Gym' : category === 'spa' ? 'Spa' : 'Studio'}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {filteredBusinesses.length} {title} Found
              </h2>
              <p className="text-gray-600">
                Discover the best {title.toLowerCase()} in your area
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredBusinesses.map((business) => {
                const tier = getTier(business);
                return (
                  <Card key={business.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-md">
                    <div className="relative">
                      {business.image_urls && business.image_urls.length > 0 ? (
                        <img
                          src={business.image_urls[0]}
                          alt={business.business_name}
                          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-t-lg flex items-center justify-center">
                          <MapPin className="h-12 w-12 text-emerald-600" />
                        </div>
                      )}
                      
                      <Badge className={`absolute top-3 right-3 ${getTierColor(tier)} font-semibold`}>
                        {tier.charAt(0).toUpperCase() + tier.slice(1)}
                      </Badge>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-bold group-hover:text-emerald-600 transition-colors">
                        {business.business_name}
                      </CardTitle>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{business.city}, {business.state}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {business.description}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{business.opening_time} - {business.closing_time}</span>
                        </div>
                        
                        {(business.monthly_price || business.session_price) && (
                          <div className="flex items-center text-emerald-600 font-semibold">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span>
                              ₹{business.monthly_price || business.session_price}
                              {business.monthly_price ? '/month' : '/session'}
                            </span>
                          </div>
                        )}
                      </div>

                      {business.amenities && business.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {business.amenities.slice(0, 3).map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
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

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                          View Details
                        </Button>
                        <Button variant="outline" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {/* Description Section - Now Below Listings */}
        {description && (
          <div className="mt-16 max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose Our {title}?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryBusinesses;
