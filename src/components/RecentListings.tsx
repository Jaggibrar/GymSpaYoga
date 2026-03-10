import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ArrowRight, Dumbbell, Flower2, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, Link } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';
import { logger } from '@/utils/logger';
import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

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

        if (error) { logger.error('Error fetching recent listings:', error); throw error; }
        logger.debug('Recent listings fetched:', data);
        setListings(data || []);
      } catch (error) {
        logger.error('Error fetching recent listings:', error);
        setListings([
          { id: 'sample-1', business_name: 'FitZone Premium Gym', business_type: 'gym', category: 'fitness', city: 'Mumbai', state: 'Maharashtra', image_urls: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'], monthly_price: 2500, amenities: ['Cardio Equipment', 'Weight Training', 'Personal Trainer'], created_at: new Date().toISOString() },
          { id: 'sample-2', business_name: 'Serenity Spa & Wellness', business_type: 'spa', category: 'wellness', city: 'Bangalore', state: 'Karnataka', image_urls: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'], session_price: 1200, amenities: ['Massage Therapy', 'Facial Treatments', 'Aromatherapy'], created_at: new Date().toISOString() },
          { id: 'sample-3', business_name: 'Mindful Yoga Studio', business_type: 'yoga', category: 'yoga', city: 'Delhi', state: 'Delhi', image_urls: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'], monthly_price: 1800, amenities: ['Hatha Yoga', 'Meditation', 'Pranayama'], created_at: new Date().toISOString() },
          { id: 'sample-4', business_name: 'Urban Fitness Club', business_type: 'gym', category: 'fitness', city: 'Pune', state: 'Maharashtra', image_urls: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'], monthly_price: 2200, amenities: ['Free Weights', 'Group Classes', 'Locker Rooms'], created_at: new Date().toISOString() },
          { id: 'sample-5', business_name: 'Tranquil Spa Resort', business_type: 'spa', category: 'wellness', city: 'Goa', state: 'Goa', image_urls: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'], session_price: 2500, amenities: ['Hot Stone Massage', 'Ayurvedic Treatment', 'Pool'], created_at: new Date().toISOString() },
          { id: 'sample-6', business_name: 'Sunrise Yoga Center', business_type: 'yoga', category: 'yoga', city: 'Rishikesh', state: 'Uttarakhand', image_urls: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'], monthly_price: 1500, amenities: ['Ashtanga Yoga', 'Teacher Training', 'Retreats'], created_at: new Date().toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentListings();

    const channel = supabase
      .channel('business-listings')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'business_profiles' }, () => fetchRecentListings())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleCardClick = (listing: RecentListing) => {
    const businessType = listing.business_type.toLowerCase();
    switch (businessType) {
      case 'gym': navigate(`/gyms`); break;
      case 'spa': navigate(`/spas`); break;
      case 'yoga': navigate(`/yoga`); break;
      default: navigate(`/explore`);
    }
  };

  const getBusinessTypeInfo = (businessType: string) => {
    switch (businessType.toLowerCase()) {
      case 'gym': return { color: 'bg-charcoal-800', icon: Dumbbell, label: 'Gym' };
      case 'spa': return { color: 'bg-warm-700', icon: Flower2, label: 'Spa' };
      case 'yoga': return { color: 'bg-warm-800', icon: Heart, label: 'Yoga' };
      default: return { color: 'bg-muted-foreground', icon: Dumbbell, label: 'Wellness' };
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
          <Card key={i} className="overflow-hidden animate-pulse rounded-2xl">
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
      <div className="text-center py-12 bg-accent rounded-2xl border border-border">
        <p className="text-muted-foreground text-lg mb-2">No featured listings available yet.</p>
        <p className="text-muted-foreground text-sm">Check back soon for new wellness destinations!</p>
      </div>
    );
  }

  const renderCard = (listing: RecentListing) => {
    const typeInfo = getBusinessTypeInfo(listing.business_type);
    const TypeIcon = typeInfo.icon;

    return (
      <motion.div
        key={listing.id}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
      >
        <Card
          className="group overflow-hidden cursor-pointer border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl rounded-2xl bg-card h-full"
          onClick={() => handleCardClick(listing)}
        >
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <OptimizedImage
              src={listing.image_urls?.[0] || "/placeholder.svg"}
              alt={listing.business_name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              width={400}
              height={224}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 left-3">
              <Badge className={`${typeInfo.color} text-white px-3 py-1.5 text-xs font-semibold shadow-lg rounded-lg`}>
                <TypeIcon className="h-3.5 w-3.5 mr-1.5" />
                {typeInfo.label}
              </Badge>
            </div>
            <div className="absolute top-3 right-3">
              <Badge className="bg-primary text-primary-foreground px-2.5 py-1 text-xs font-bold shadow-lg rounded-lg">
                ⭐ Featured
              </Badge>
            </div>
          </div>

          <CardContent className="p-5 space-y-3">
            <h3 className="font-display font-bold text-lg text-foreground leading-tight line-clamp-1 group-hover:text-primary transition-colors">
              {listing.business_name}
            </h3>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-bold text-foreground text-sm">4.8</span>
                <span className="text-muted-foreground text-xs">(124)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
              <span className="line-clamp-1">{listing.city}, {listing.state}</span>
            </div>

            {listing.amenities && listing.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {listing.amenities.slice(0, 3).map((amenity, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-accent text-accent-foreground text-xs rounded-md">
                    {amenity}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div>
                <span className="text-xs text-muted-foreground">Starting from</span>
                <p className="font-bold text-primary text-lg">{getPrice(listing)}</p>
              </div>
              <Button
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-5 min-h-[40px] rounded-xl"
                onClick={(e) => { e.stopPropagation(); handleCardClick(listing); }}
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-3 rounded-lg px-3 py-1">
              Curated For You
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Featured Listings</h2>
            <p className="text-muted-foreground mt-2">Discover top-rated wellness destinations near you</p>
          </div>
          <Link to="/explore">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-6 min-h-[48px] rounded-xl">
                View All
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
        </div>
      </ScrollReveal>

      {/* Mobile: Horizontal Scroll */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 snap-x snap-mandatory">
        <div className="flex gap-4">
          {listings.map((listing) => (
            <div key={listing.id} className="flex-shrink-0 w-[300px] snap-start">
              {renderCard(listing)}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Staggered Grid */}
      <StaggerContainer className="hidden lg:grid lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <StaggerItem key={listing.id}>
            {renderCard(listing)}
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Mobile View All */}
      <div className="lg:hidden text-center pt-4">
        <Link to="/explore">
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 min-h-[48px] rounded-xl">
            View All Listings
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecentListings;
