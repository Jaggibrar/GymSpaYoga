
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
        const { data, error} = await supabase
          .from('public_business_listings')
          .select('id, business_name, business_type, category, city, state, image_urls, monthly_price, session_price, amenities, created_at')
          .order('created_at', { ascending: false })
          .limit(4);

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
      <section className="py-12 sm:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="h-8 w-48 bg-muted animate-pulse rounded mb-2"></div>
              <div className="h-4 w-64 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 lg:grid lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i} shadow="elevated" className="flex-shrink-0 w-[280px] lg:w-auto animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <CardContent className="p-4 space-y-3">
                    <div className="h-5 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-10 bg-muted rounded-lg"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Always show the section, even if no listings
  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Near You</h2>
            <p className="text-sm md:text-base text-muted-foreground">Top-rated wellness providers in your area</p>
          </div>
          <Button variant="outline" className="hidden sm:inline-flex">View All</Button>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-8 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground mb-2">No recent listings available at the moment.</p>
            <p className="text-sm text-muted-foreground/70">Check back soon for new wellness destinations!</p>
          </div>
        ) : (
          <>
            {/* Mobile & Tablet: Horizontal Scroll */}
            <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 snap-x snap-mandatory">
              <div className="flex gap-4">
                {listings.map((listing) => (
                  <Card 
                    key={listing.id}
                    shadow="interactive"
                    className="flex-shrink-0 w-[280px] overflow-hidden cursor-pointer snap-start transition-all duration-300 hover:shadow-[var(--shadow-soft)] hover:-translate-y-1"
                    onClick={() => handleCardClick(listing)}
                  >
                    <div className="relative h-44 w-full overflow-hidden rounded-t-lg">
                      <OptimizedImage 
                        src={listing.image_urls[0] || "/placeholder.svg"} 
                        alt={listing.business_name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        width={280}
                        height={176}
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-secondary text-secondary-foreground px-2 py-0.5 text-xs font-semibold shadow-md">
                          Featured
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 space-y-2.5">
                      <h3 className="font-bold text-base leading-tight line-clamp-1">
                        {listing.business_name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                          <span className="font-semibold text-sm">4.8</span>
                          <span className="text-xs text-muted-foreground">(124)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="line-clamp-1">{listing.city}</span>
                      </div>
                      
                      <Button 
                        className="w-full bg-primary hover:shadow-[var(--shadow-glow)] text-white transition-all duration-300" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(listing);
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Desktop: 4 Column Grid */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-6">
              {listings.map((listing) => (
                <Card 
                  key={listing.id}
                  shadow="interactive"
                  className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-soft)] hover:-translate-y-2"
                  onClick={() => handleCardClick(listing)}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <OptimizedImage 
                      src={listing.image_urls[0] || "/placeholder.svg"} 
                      alt={listing.business_name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={350}
                      height={192}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-secondary text-secondary-foreground px-3 py-1 font-semibold shadow-lg">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-bold text-lg leading-tight line-clamp-1">
                      {listing.business_name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold">4.8</span>
                        <span className="text-sm text-muted-foreground">(124)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="line-clamp-1">{listing.city}, {listing.state}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>6 AM - 9 PM</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-primary hover:shadow-[var(--shadow-glow)] text-white transition-all duration-300" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(listing);
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RecentListings;
