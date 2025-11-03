
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star, Crown, Diamond, IndianRupee, Shield, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';
import FavoriteButton from '@/components/FavoriteButton';
import { logger } from '@/utils/logger';

interface RecentListing {
  id: string;
  business_name: string;
  business_type: string;
  category: string;
  city: string;
  state: string;
  image_urls: string[];
  monthly_price?: number;
  session_price?: number;
  amenities?: string[];
  created_at: string;
}

const RecentListings = () => {
  const [listings, setListings] = useState<RecentListing[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        logger.debug('Fetching recent listings...');
        const { data, error } = await supabase
          .from('public_business_listings')
          .select('id, business_name, business_type, category, city, state, image_urls, monthly_price, session_price, amenities, created_at')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) {
          logger.error('Error fetching recent listings:', error);
          throw error;
        }
        
        logger.debug('Recent listings fetched:', data);
        setListings(data || []);
      } catch (error) {
        logger.error('Error fetching recent listings:', error);
        // Set some sample data if there's an error or no data
        setListings([
          {
            id: 'sample-1',
            business_name: 'FitZone Premium Gym',
            business_type: 'gym',
            category: 'fitness',
            city: 'Mumbai',
            state: 'Maharashtra',
            image_urls: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
            monthly_price: 2500,
            amenities: ['Cardio Equipment', 'Weight Training', 'Personal Trainer'],
            created_at: new Date().toISOString()
          },
          {
            id: 'sample-2',
            business_name: 'Serenity Spa & Wellness',
            business_type: 'spa',
            category: 'wellness',
            city: 'Bangalore',
            state: 'Karnataka',
            image_urls: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
            session_price: 1200,
            amenities: ['Massage Therapy', 'Facial Treatments', 'Aromatherapy'],
            created_at: new Date().toISOString()
          },
          {
            id: 'sample-3',
            business_name: 'Mindful Yoga Studio',
            business_type: 'yoga',
            category: 'yoga',
            city: 'Delhi',
            state: 'Delhi',
            image_urls: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
            monthly_price: 1800,
            amenities: ['Hatha Yoga', 'Meditation', 'Pranayama'],
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentListings();

    // Set up real-time subscription for new listings
    const channel = supabase
      .channel('business-listings')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'business_profiles'
        },
        () => fetchRecentListings()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleCardClick = (listing: RecentListing) => {
    const businessType = listing.business_type.toLowerCase();
    switch (businessType) {
      case 'gym':
        navigate(`/gyms`);
        break;
      case 'spa':
        navigate(`/spas`);
        break;
      case 'yoga':
        navigate(`/yoga`);
        break;
      default:
        navigate(`/explore`);
    }
  };

  const getTierIcon = (price?: number) => {
    if (!price) return <IndianRupee className="h-4 w-4" />;
    if (price >= 5000) return <Crown className="h-4 w-4" />;
    if (price >= 3000) return <Diamond className="h-4 w-4" />;
    return <IndianRupee className="h-4 w-4" />;
  };

  const getTierColor = (price?: number) => {
    if (!price) return "bg-gradient-to-r from-emerald-500 to-emerald-600";
    if (price >= 5000) return "bg-gradient-to-r from-amber-500 to-amber-600";
    if (price >= 3000) return "bg-gradient-to-r from-blue-500 to-blue-600";
    return "bg-gradient-to-r from-emerald-500 to-emerald-600";
  };

  const getBusinessTypeColor = (businessType: string) => {
    switch (businessType.toLowerCase()) {
      case 'gym':
        return "bg-red-500 text-white";
      case 'spa':
        return "bg-purple-500 text-white";
      case 'yoga':
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recently Listed</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Always show the section, even if no listings
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Featured Near You</h2>
            <p className="text-base text-gray-600">Top-rated wellness providers in your area</p>
          </div>
          <Button variant="outline" className="hidden sm:inline-flex">View All</Button>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <p className="text-gray-600 mb-4">No recent listings available at the moment.</p>
            <p className="text-sm text-gray-500">Check back soon for new wellness destinations!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.slice(0, 4).map((listing) => (
              <Card 
                key={listing.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer rounded-2xl border border-gray-200"
                onClick={() => handleCardClick(listing)}
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <OptimizedImage 
                    src={listing.image_urls[0] || "/placeholder.svg"} 
                    alt={listing.business_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={400}
                    height={208}
                  />
                  
                  {/* Featured Badge - Top Right */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-orange-500 text-white px-3 py-1 text-sm font-bold rounded-full">
                      Featured
                    </Badge>
                  </div>

                  {/* Favorite Button - Bottom Left */}
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-white rounded-full p-2 shadow-lg">
                      <FavoriteButton 
                        businessId={listing.id} 
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1">
                      {listing.business_name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-orange-500 fill-orange-500" />
                        <span className="text-sm font-semibold text-gray-900 ml-1">4.9</span>
                        <span className="text-sm text-gray-500 ml-1">(89)</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{listing.city}, {listing.state}</span>
                    </div>

                    {/* Hours */}
                    <div className="flex items-center text-gray-600 mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">6 AM - 9 PM</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-800 font-semibold text-lg">
                        {listing.monthly_price ? '$$$$' : listing.session_price && listing.session_price > 1500 ? '$$$' : '$$'}
                      </span>
                    </div>

                    {/* View Details Button */}
                    <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentListings;
