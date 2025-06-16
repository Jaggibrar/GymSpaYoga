
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Clock, Star, Heart, Phone, Mail, Calendar, DollarSign } from 'lucide-react';
import { useBusinessData } from '@/hooks/useBusinessData';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import BookingModal from '@/components/BookingModal';
import SampleDataCreator from '@/components/SampleDataCreator';
import type { Business } from '@/hooks/useBusinessData';

interface CategoryBusinessesProps {
  category: string;
  title?: string;
  description?: string;
}

const CategoryBusinesses = ({ category, title, description }: CategoryBusinessesProps) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const { 
    businesses = [], 
    loading, 
    error 
  } = useBusinessData(category, searchTerm, selectedLocation, sortBy);

  // Load user wishlist
  useEffect(() => {
    if (user) {
      loadWishlist();
    }
  }, [user]);

  const loadWishlist = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_wishlist')
        .select('business_id')
        .eq('user_id', user.id);

      if (error) throw error;

      const wishlistIds = new Set(data.map(item => item.business_id));
      setWishlist(wishlistIds);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  };

  const toggleWishlist = async (businessId: string) => {
    if (!user) {
      toast.error('Please login to add to wishlist');
      return;
    }

    const isInWishlist = wishlist.has(businessId);
    
    try {
      if (isInWishlist) {
        const { error } = await supabase
          .from('user_wishlist')
          .delete()
          .eq('user_id', user.id)
          .eq('business_id', businessId);

        if (error) throw error;

        setWishlist(prev => {
          const newSet = new Set(prev);
          newSet.delete(businessId);
          return newSet;
        });
        toast.success('Removed from wishlist');
      } else {
        const { error } = await supabase
          .from('user_wishlist')
          .insert({
            user_id: user.id,
            business_id: businessId
          });

        if (error) throw error;

        setWishlist(prev => new Set(prev).add(businessId));
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = !selectedLocation || 
                           business.city.toLowerCase().includes(selectedLocation.toLowerCase()) ||
                           business.state.toLowerCase().includes(selectedLocation.toLowerCase());
    
    const matchesPrice = !priceRange || (() => {
      const price = business.monthly_price || business.session_price || 0;
      switch (priceRange) {
        case 'budget': return price < 2000;
        case 'mid': return price >= 2000 && price < 5000;
        case 'premium': return price >= 5000;
        default: return true;
      }
    })();

    return matchesSearch && matchesLocation && matchesPrice;
  });

  const handleBookNow = (business: Business) => {
    if (!user) {
      toast.error('Please login to book');
      return;
    }
    setSelectedBusiness(business);
    setShowBookingModal(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading businesses: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 py-12">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>}
            {description && <p className="text-xl text-gray-600">{description}</p>}
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Location..."
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Price Ranges</option>
              <option value="budget">Budget (Under ₹2,000)</option>
              <option value="mid">Mid-range (₹2,000-₹5,000)</option>
              <option value="premium">Premium (₹5,000+)</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="created_at">Sort by Newest</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-gray-600">
            Found {filteredBusinesses.length} {category} businesses
          </p>
        </div>

        {/* Show sample data creator if no businesses */}
        {filteredBusinesses.length === 0 && businesses.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">No businesses found</h3>
            <p className="text-gray-600 mb-8">Create some sample data to get started</p>
            <SampleDataCreator />
          </div>
        )}

        {/* Business Grid */}
        {filteredBusinesses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBusinesses.map((business) => (
              <Card key={business.id} className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
                <div className="relative">
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    {business.image_urls && business.image_urls.length > 0 ? (
                      <img
                        src={business.image_urls[0]}
                        alt={business.business_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800';
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-100">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-3 right-3 h-9 w-9 p-0 bg-white/80 hover:bg-white"
                    onClick={() => toggleWishlist(business.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${wishlist.has(business.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                    />
                  </Button>
                  <Badge className="absolute top-3 left-3 capitalize bg-blue-600">
                    {business.category}
                  </Badge>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
                    {business.business_name}
                  </CardTitle>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{business.city}, {business.state}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-2">{business.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {business.opening_time} - {business.closing_time}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">4.5</span>
                    </div>
                  </div>

                  {(business.monthly_price || business.session_price) && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600 font-semibold">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>
                          ₹{business.monthly_price || business.session_price}
                          {business.monthly_price ? '/month' : '/session'}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mb-4">
                    {business.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {business.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{business.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(`tel:${business.phone}`, '_self')}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleBookNow(business)}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredBusinesses.length === 0 && businesses.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No businesses found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search filters.</p>
          </div>
        )}

        {/* Booking Modal */}
        {selectedBusiness && (
          <BookingModal
            businessName={selectedBusiness.business_name}
            businessType={selectedBusiness.business_type}
            businessId={selectedBusiness.id}
            isOpen={showBookingModal}
            onClose={() => {
              setShowBookingModal(false);
              setSelectedBusiness(null);
            }}
            price={selectedBusiness.monthly_price ? `₹${selectedBusiness.monthly_price}` : selectedBusiness.session_price ? `₹${selectedBusiness.session_price}` : undefined}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryBusinesses;
