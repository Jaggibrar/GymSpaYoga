
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Clock, Users, Phone, Mail, ArrowRight, Wifi, Car, Coffee, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface Business {
  id: string;
  business_name: string;
  category: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  description: string;
  image_urls: string[];
  amenities: string[];
  opening_time: string;
  closing_time: string;
  session_price: number;
  monthly_price: number;
  created_at: string;
  status: string;
}

interface CategoryBusinessesProps {
  category: string;
  title: string;
  description: string;
  searchTerm: string;
  location: string;
  sortBy: string;
  priceFilter?: string;
}

const CategoryBusinesses: React.FC<CategoryBusinessesProps> = ({
  category,
  title,
  description,
  searchTerm,
  location,
  sortBy,
  priceFilter = ''
}) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBusinesses();
  }, [category, searchTerm, location, sortBy, priceFilter]);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      console.log('Fetching businesses for category:', category);
      
      let query = supabase
        .from('business_profiles')
        .select('*')
        .eq('category', category)
        .eq('status', 'approved');

      // Apply search filter
      if (searchTerm) {
        query = query.or(`business_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Apply location filter
      if (location) {
        query = query.or(`city.ilike.%${location}%,state.ilike.%${location}%,address.ilike.%${location}%`);
      }

      // Apply price filter
      if (priceFilter) {
        switch (priceFilter) {
          case 'budget':
            query = query.or('session_price.lt.1000,monthly_price.lt.3000');
            break;
          case 'premium':
            query = query.or('session_price.gte.1000.and.session_price.lt.2000,monthly_price.gte.3000.and.monthly_price.lt.5000');
            break;
          case 'luxury':
            query = query.or('session_price.gte.2000,monthly_price.gte.5000');
            break;
        }
      }

      // Apply sorting - Fixed nullsLast to nullsFirst
      if (sortBy === 'session_price' || sortBy === '-session_price') {
        const ascending = sortBy === 'session_price';
        query = query.order('session_price', { ascending, nullsFirst: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query.limit(20);

      if (error) {
        console.error('Error fetching businesses:', error);
        setError(error.message);
        return;
      }

      console.log('Fetched businesses:', data?.length || 0);
      setBusinesses(data || []);
    } catch (err) {
      console.error('Error in fetchBusinesses:', err);
      setError('Failed to fetch businesses');
    } finally {
      setLoading(false);
    }
  };

  const getPriceTier = (sessionPrice: number | null, monthlyPrice: number | null) => {
    const price = sessionPrice || monthlyPrice;
    if (!price) return null;
    
    if (sessionPrice) {
      if (sessionPrice >= 2000) return { tier: 'Luxury', color: 'bg-purple-100 text-purple-800' };
      if (sessionPrice >= 1000) return { tier: 'Premium', color: 'bg-blue-100 text-blue-800' };
      return { tier: 'Budget', color: 'bg-green-100 text-green-800' };
    }
    
    if (monthlyPrice) {
      if (monthlyPrice >= 5000) return { tier: 'Luxury', color: 'bg-purple-100 text-purple-800' };
      if (monthlyPrice >= 3000) return { tier: 'Premium', color: 'bg-blue-100 text-blue-800' };
      return { tier: 'Budget', color: 'bg-green-100 text-green-800' };
    }
    
    return null;
  };

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: any } = {
      'WiFi': Wifi,
      'Parking': Car,
      'Cafe': Coffee,
      'Equipment': Dumbbell,
      'Air Conditioning': Clock,
    };
    return iconMap[amenity] || Users;
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12 bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">Loading {title.toLowerCase()}...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12 bg-white">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Error loading businesses: {error}</p>
          <Button onClick={fetchBusinesses} variant="outline">
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {businesses.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Dumbbell className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">No {title} Found</h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            We're working hard to onboard more {category} businesses in your area. 
            Check back soon or help us grow by recommending your favorite {category}!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register-business">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                List Your {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="outline">
                Explore Other Categories
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((business) => {
            const priceTier = getPriceTier(business.session_price, business.monthly_price);
            
            return (
              <Card key={business.id} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  {business.image_urls && business.image_urls.length > 0 ? (
                    <img 
                      src={business.image_urls[0]} 
                      alt={business.business_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <Dumbbell className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    {priceTier && (
                      <Badge className={priceTier.color}>
                        {priceTier.tier}
                      </Badge>
                    )}
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {business.business_name}
                  </CardTitle>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {business.city}, {business.state}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {business.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {business.opening_time} - {business.closing_time}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      New
                    </div>
                  </div>

                  {business.amenities && business.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {business.amenities.slice(0, 3).map((amenity, index) => {
                        const IconComponent = getAmenityIcon(amenity);
                        return (
                          <div key={index} className="flex items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                            <IconComponent className="h-3 w-3 mr-1" />
                            {amenity}
                          </div>
                        );
                      })}
                      {business.amenities.length > 3 && (
                        <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                          +{business.amenities.length - 3} more
                        </div>
                      )}
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      {business.session_price && (
                        <div className="text-sm">
                          <span className="text-gray-500">Session from</span>
                          <span className="font-bold text-lg text-emerald-600 ml-1">
                            ₹{business.session_price}
                          </span>
                        </div>
                      )}
                      {business.monthly_price && (
                        <div className="text-sm">
                          <span className="text-gray-500">Month from</span>
                          <span className="font-bold text-lg text-blue-600 ml-1">
                            ₹{business.monthly_price}
                          </span>
                        </div>
                      )}
                    </div>

                    <Link to={`/${category}/${business.id}`} className="block">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {businesses.length > 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Showing {businesses.length} {title.toLowerCase()} • Want to see your business here?
          </p>
          <Link to="/register-business">
            <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              List Your Business
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default CategoryBusinesses;
