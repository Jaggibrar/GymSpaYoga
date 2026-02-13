import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ArrowRight, Dumbbell, Flower2, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, Link } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';
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
        // Set sample data if there's an error or no data
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
            image_urls: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
            monthly_price: 1800,
            amenities: ['Hatha Yoga', 'Meditation', 'Pranayama'],
            created_at: new Date().toISOString()
          },
          {
            id: 'sample-4',
            business_name: 'Urban Fitness Club',
            business_type: 'gym',
            category: 'fitness',
            city: 'Pune',
            state: 'Maharashtra',
            image_urls: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
            monthly_price: 2200,
            amenities: ['Free Weights', 'Group Classes', 'Locker Rooms'],
            created_at: new Date().toISOString()
          },
          {
            id: 'sample-5',
            business_name: 'Tranquil Spa Resort',
            business_type: 'spa',
            category: 'wellness',
            city: 'Goa',
            state: 'Goa',
            image_urls: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
            session_price: 2500,
            amenities: ['Hot Stone Massage', 'Ayurvedic Treatment', 'Pool'],
            created_at: new Date().toISOString()
          },
          {
            id: 'sample-6',
            business_name: 'Sunrise Yoga Center',
            business_type: 'yoga',
            category: 'yoga',
            city: 'Rishikesh',
            state: 'Uttarakhand',
            image_urls: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
            monthly_price: 1500,
            amenities: ['Ashtanga Yoga', 'Teacher Training', 'Retreats'],
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentListings();

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

  const getBusinessTypeInfo = (businessType: string) => {
    switch (businessType.toLowerCase()) {
      case 'gym':
        return { color: 'bg-[#005EB8]', icon: Dumbbell, label: 'Gym' };
      case 'spa':
        return { color: 'bg-[#9C27B0]', icon: Flower2, label: 'Spa' };
      case 'yoga':
        return { color: 'bg-[#2E7D32]', icon: Heart, label: 'Yoga' };
      default:
        return { color: 'bg-gray-500', icon: Dumbbell, label: 'Wellness' };
    }
  };

  const getPrice = (listing: RecentListing) => {
    if (listing.monthly_price) return `₹${listing.monthly_price.toLocaleString()}/mo`;
    if (listing.session_price) return `₹${listing.session_price.toLocaleString()}/session`;
    return 'Contact for pricing';
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <div className="bg-muted" style={{ aspectRatio: '16/9' }}></div>
            <CardContent className="p-5 space-y-3">
              <div className="h-5 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="h-10 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
        <p className="text-gray-600 text-lg mb-2">No featured listings available yet.</p>
        <p className="text-gray-500 text-sm">Check back soon for new wellness destinations!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-black">Featured Listings</h2>
          <p className="text-gray-600 mt-1">Discover top-rated wellness destinations near you</p>
        </div>
        <Link to="/explore">
          <Button 
            className="bg-[#005EB8] hover:bg-[#004d96] text-white font-semibold px-6 min-h-[48px]"
          >
            View All
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 snap-x snap-mandatory">
        <div className="flex gap-4">
          {listings.map((listing) => {
            const typeInfo = getBusinessTypeInfo(listing.business_type);
            const TypeIcon = typeInfo.icon;
            
            return (
              <Card 
                key={listing.id}
                className="flex-shrink-0 w-[300px] overflow-hidden cursor-pointer snap-start border-2 border-gray-100 hover:border-[#005EB8]/30 transition-all duration-300 hover:shadow-xl"
                onClick={() => handleCardClick(listing)}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <OptimizedImage 
                    src={listing.image_urls?.[0] || "/placeholder.svg"} 
                    alt={listing.business_name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    width={300}
                    height={176}
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className={`${typeInfo.color} text-white px-3 py-1 text-xs font-semibold`}>
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {typeInfo.label}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white text-[#005EB8] px-2 py-1 text-xs font-bold shadow-lg">
                      Featured
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-bold text-lg text-black leading-tight line-clamp-1">
                    {listing.business_name}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-black">4.8</span>
                      <span className="text-sm text-gray-500">(124)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-[#005EB8]" />
                    <span className="line-clamp-1">{listing.city}, {listing.state}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="font-bold text-[#005EB8] text-lg">{getPrice(listing)}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-[#005EB8] hover:bg-[#004d96] text-white font-semibold min-h-[44px]" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(listing);
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Desktop: 3 Column Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {listings.map((listing) => {
          const typeInfo = getBusinessTypeInfo(listing.business_type);
          const TypeIcon = typeInfo.icon;
          
          return (
            <Card 
              key={listing.id}
              className="group overflow-hidden cursor-pointer border-2 border-gray-100 hover:border-[#005EB8]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              onClick={() => handleCardClick(listing)}
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <OptimizedImage 
                  src={listing.image_urls?.[0] || "/placeholder.svg"} 
                  alt={listing.business_name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={400}
                  height={224}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={`${typeInfo.color} text-white px-3 py-1.5 text-sm font-semibold shadow-lg`}>
                    <TypeIcon className="h-4 w-4 mr-1.5" />
                    {typeInfo.label}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white text-[#005EB8] px-3 py-1.5 text-sm font-bold shadow-lg">
                    ⭐ Featured
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-xl text-black leading-tight line-clamp-1 mb-2">
                    {listing.business_name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-black">4.8</span>
                      <span className="text-gray-500">(124 reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5 flex-shrink-0 text-[#005EB8]" />
                  <span className="line-clamp-1">{listing.city}, {listing.state}</span>
                </div>

                {listing.amenities && listing.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {listing.amenities.slice(0, 3).map((amenity, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-sm text-gray-500">Starting from</span>
                    <p className="font-bold text-[#005EB8] text-xl">{getPrice(listing)}</p>
                  </div>
                  <Button 
                    className="bg-[#005EB8] hover:bg-[#004d96] text-white font-semibold px-6 min-h-[44px]" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(listing);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mobile View All Button */}
      <div className="lg:hidden text-center pt-4">
        <Link to="/explore">
          <Button 
            className="bg-[#005EB8] hover:bg-[#004d96] text-white font-semibold px-8 min-h-[48px]"
          >
            View All Listings
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecentListings;
