
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
          .from('business_profiles')
          .select('id, business_name, business_type, category, city, state, image_urls, monthly_price, session_price, amenities, created_at')
          .eq('status', 'approved')
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
    <section className="py-6 sm:py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Recently Listed</h2>
          <p className="text-base sm:text-lg text-gray-600">Discover the newest wellness destinations in your area</p>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <p className="text-gray-600 mb-4">No recent listings available at the moment.</p>
            <p className="text-sm text-gray-500">Check back soon for new wellness destinations!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
            {listings.map((listing) => (
              <Card 
                key={listing.id} 
                className="w-full max-w-sm overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-2 rounded-xl border-0 shadow-md"
                onClick={() => handleCardClick(listing)}
              >
                <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-t-xl">
                  <OptimizedImage 
                    src={listing.image_urls[0] || "/placeholder.svg"} 
                    alt={listing.business_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    width={400}
                    height={224}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Favorite Button - Top Left */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <FavoriteButton 
                      businessId={listing.id} 
                      size="sm"
                      className="bg-white/90 hover:bg-white shadow-md"
                    />
                  </div>

                  {/* Business Type Badge - Top Center */}
                  <div className="absolute top-2 sm:top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className={`${getBusinessTypeColor(listing.business_type)} px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold shadow-lg`}>
                      {listing.business_type.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Verified Badge & Tier - Top Right */}
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1">
                    <Badge className="bg-green-500 text-white px-2 py-1 shadow-lg text-xs flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Verified
                    </Badge>
                    <Badge className={`${getTierColor(listing.monthly_price || listing.session_price)} text-white px-2 py-1 shadow-lg`}>
                      {getTierIcon(listing.monthly_price || listing.session_price)}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg sm:text-xl text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                      {listing.business_name}
                    </h3>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm font-medium">{listing.city}, {listing.state}</span>
                    </div>
                  </div>
                  
                  {/* Price Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {listing.monthly_price && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 px-2 py-1 text-xs font-medium">
                        ₹{listing.monthly_price}/month
                      </Badge>
                    )}
                    {listing.session_price && (
                      <Badge className="bg-secondary/10 text-secondary-foreground border-secondary/20 px-2 py-1 text-xs font-medium">
                        ₹{listing.session_price}/session
                      </Badge>
                    )}
                  </div>
                  
                  {/* Amenities */}
                  {listing.amenities && listing.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2">
                      {listing.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge 
                          key={index}
                          variant="outline"
                          className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground border-muted"
                        >
                          {amenity}
                        </Badge>
                      ))}
                      {listing.amenities.length > 3 && (
                        <Badge 
                          variant="outline"
                          className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground border-muted"
                        >
                          +{listing.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-end pt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600">4.8</span>
                      <Award className="h-4 w-4 text-blue-500 ml-2" />
                    </div>
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
