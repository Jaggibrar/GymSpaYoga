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
        const { data, error } = await supabase
          .from('public_business_listings')
          .select('id, business_name, business_type, category, city, state, image_urls, monthly_price, session_price, amenities, created_at')
          .order('created_at', { ascending: false })
          .limit(6);
        if (error) throw error;
        setListings(data || []);
      } catch (error) {
        logger.error('Error fetching listings:', error);
        setListings([
          { id: 'sample-1', business_name: 'FitZone Premium Gym', business_type: 'gym', category: 'fitness', city: 'Mumbai', state: 'Maharashtra', image_urls: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80'], monthly_price: 2500, amenities: ['Cardio', 'Weight Training', 'Personal Trainer'], created_at: new Date().toISOString() },
          { id: 'sample-2', business_name: 'Serenity Spa & Wellness', business_type: 'spa', category: 'wellness', city: 'Bangalore', state: 'Karnataka', image_urls: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=500&q=80'], session_price: 1200, amenities: ['Massage', 'Facial', 'Aromatherapy'], created_at: new Date().toISOString() },
          { id: 'sample-3', business_name: 'Mindful Yoga Studio', business_type: 'yoga', category: 'yoga', city: 'Delhi', state: 'Delhi', image_urls: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80'], monthly_price: 1800, amenities: ['Hatha Yoga', 'Meditation', 'Pranayama'], created_at: new Date().toISOString() },
          { id: 'sample-4', business_name: 'Urban Fitness Club', business_type: 'gym', category: 'fitness', city: 'Pune', state: 'Maharashtra', image_urls: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=80'], monthly_price: 2200, amenities: ['Free Weights', 'Group Classes', 'Locker Rooms'], created_at: new Date().toISOString() },
          { id: 'sample-5', business_name: 'Tranquil Spa Resort', business_type: 'spa', category: 'wellness', city: 'Goa', state: 'Goa', image_urls: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80'], session_price: 2500, amenities: ['Hot Stone', 'Ayurvedic', 'Pool'], created_at: new Date().toISOString() },
          { id: 'sample-6', business_name: 'Sunrise Yoga Center', business_type: 'yoga', category: 'yoga', city: 'Rishikesh', state: 'Uttarakhand', image_urls: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80'], monthly_price: 1500, amenities: ['Ashtanga', 'Teacher Training', 'Retreats'], created_at: new Date().toISOString() },
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
    const t = listing.business_type.toLowerCase();
    navigate(t === 'gym' ? '/gyms' : t === 'spa' ? '/spas' : t === 'yoga' ? '/yoga' : '/explore');
  };

  const getTypeInfo = (type: string) => {
    switch (type.toLowerCase()) {
      case 'gym': return { color: 'bg-primary', icon: Dumbbell, label: 'Gym' };
      case 'spa': return { color: 'bg-brand-600', icon: Flower2, label: 'Spa' };
      case 'yoga': return { color: 'bg-brand-700', icon: Heart, label: 'Yoga' };
      default: return { color: 'bg-muted-foreground', icon: Dumbbell, label: 'Wellness' };
    }
  };

  const getPrice = (l: RecentListing) => {
    if (l.monthly_price) return `₹${l.monthly_price.toLocaleString()}/mo`;
    if (l.session_price) return `₹${l.session_price.toLocaleString()}/session`;
    return 'Contact';
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden animate-pulse rounded-2xl border-border">
            <div className="bg-muted aspect-video" />
            <CardContent className="p-5 space-y-3">
              <div className="h-5 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-10 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12 bg-accent rounded-2xl border border-border">
        <p className="text-muted-foreground text-lg mb-1">No listings yet.</p>
        <p className="text-muted-foreground text-sm">Check back soon!</p>
      </div>
    );
  }

  const renderCard = (listing: RecentListing) => {
    const info = getTypeInfo(listing.business_type);
    const Icon = info.icon;

    return (
      <Card
        key={listing.id}
        className="group overflow-hidden cursor-pointer border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg rounded-2xl bg-card h-full hover:-translate-y-1"
        onClick={() => handleCardClick(listing)}
      >
        <div className="relative w-full overflow-hidden aspect-video">
          <OptimizedImage
            src={listing.image_urls?.[0] || "/placeholder.svg"}
            alt={listing.business_name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={400}
            height={224}
          />
          <div className="absolute top-3 left-3">
            <Badge className={`${info.color} text-white px-2.5 py-1 text-xs font-semibold shadow-sm`}>
              <Icon className="h-3 w-3 mr-1" />
              {info.label}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5 space-y-3">
          <h3 className="font-display font-bold text-base text-foreground leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {listing.business_name}
          </h3>
          
          <div className="flex items-center gap-2">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="font-bold text-foreground text-sm">4.8</span>
            <span className="text-muted-foreground text-xs">(124)</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
            <span className="line-clamp-1">{listing.city}, {listing.state}</span>
          </div>

          {listing.amenities && listing.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {listing.amenities.slice(0, 3).map((amenity, idx) => (
                <Badge key={idx} variant="secondary" className="bg-accent text-accent-foreground text-[10px] px-2 py-0.5">
                  {amenity}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <p className="font-bold text-primary text-base">{getPrice(listing)}</p>
            </div>
            <Button
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-4 min-h-[36px] rounded-xl text-sm shadow-sm"
              onClick={(e) => { e.stopPropagation(); handleCardClick(listing); }}
            >
              View <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-1">Curated For You</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Featured Listings</h2>
            <p className="text-muted-foreground text-sm mt-1">Top-rated wellness destinations near you</p>
          </div>
          <Link to="/explore">
            <Button variant="outline" className="border-border text-foreground hover:text-primary rounded-xl px-5 text-sm">
              View All <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </ScrollReveal>

      {/* Mobile: Horizontal Scroll */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 snap-x snap-mandatory">
        <div className="flex gap-4">
          {listings.map((listing) => (
            <div key={listing.id} className="flex-shrink-0 w-[280px] snap-start">
              {renderCard(listing)}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Grid */}
      <StaggerContainer className="hidden lg:grid lg:grid-cols-3 gap-5">
        {listings.map((listing) => (
          <StaggerItem key={listing.id}>
            {renderCard(listing)}
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="lg:hidden text-center pt-4">
        <Link to="/explore">
          <Button variant="outline" className="border-border text-foreground hover:text-primary rounded-xl px-6 text-sm">
            View All Listings <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecentListings;
