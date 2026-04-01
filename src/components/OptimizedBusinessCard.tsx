import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Clock, Crown, Diamond, IndianRupee, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppButton from '@/components/WhatsAppButton';

interface Business {
  id: string;
  business_name: string;
  business_type: string;
  city: string;
  state: string;
  image_urls: string[];
  monthly_price?: number;
  session_price?: number;
  description?: string;
  opening_time: string;
  closing_time: string;
  category?: string;
  phone: string;
}

interface OptimizedBusinessCardProps {
  business: Business;
}

const OptimizedBusinessCard = memo(({ business }: OptimizedBusinessCardProps) => {
  const getTier = () => {
    if (business.category && ['luxury', 'premium', 'budget'].includes(business.category.toLowerCase())) {
      return business.category.toLowerCase();
    }
    const price = business.monthly_price || business.session_price || 0;
    if (business.monthly_price) {
      if (price >= 5000) return 'luxury';
      if (price >= 3000) return 'premium';
      return 'budget';
    } else if (business.session_price) {
      if (price >= 2000) return 'luxury';
      if (price >= 1000) return 'premium';
      return 'budget';
    }
    return 'budget';
  };

  const tier = getTier();

  const getTierStyles = (t: string) => {
    switch (t) {
      case 'luxury': return "bg-charcoal-900 text-white";
      case 'premium': return "bg-primary text-white";
      default: return "bg-brand-600 text-white";
    }
  };

  const imageUrl = business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  const getDetailLink = () => {
    const businessType = business.business_type.toLowerCase();
    switch (businessType) {
      case 'gym': return `/gyms/${business.id}`;
      case 'spa': return `/spas/${business.id}`;
      case 'yoga': return `/yoga/${business.id}`;
      default: return `/gyms/${business.id}`;
    }
  };

  const formatPrice = () => {
    if (business.monthly_price) return `₹${business.monthly_price.toLocaleString()}`;
    if (business.session_price) return `₹${business.session_price.toLocaleString()}`;
    return "Contact";
  };

  const getPriceSubtext = () => {
    if (business.monthly_price) return "/month";
    if (business.session_price) return "/session";
    return "for pricing";
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/20 rounded-2xl overflow-hidden bg-card hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={imageUrl}
          alt={`${business.business_name} - ${business.business_type} in ${business.city}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
          }}
        />
        <Badge className={`absolute top-3 right-3 ${getTierStyles(tier)} border-0 px-2.5 py-1 text-xs font-semibold shadow-sm`}>
          <span className="capitalize">{tier}</span>
        </Badge>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1">
          <Star className="h-3.5 w-3.5 fill-current text-yellow-400" />
          <span className="font-semibold text-white text-sm">4.7</span>
        </div>
      </div>
      
      <CardContent className="p-4 md:p-5">
        <h3 className="text-base font-display font-bold text-foreground group-hover:text-primary transition-colors mb-1.5 line-clamp-1">
          {business.business_name}
        </h3>
        <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="text-xs truncate">{business.city}, {business.state}</span>
        </div>
        
        <p className="text-muted-foreground text-xs mb-3 line-clamp-2 leading-relaxed">
          {business.description || "Modern fitness center with state-of-the-art equipment."}
        </p>
        
        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-4">
          <Clock className="h-3.5 w-3.5" />
          <span>{business.opening_time} - {business.closing_time}</span>
        </div>
        
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
          <div>
            <p className="text-lg font-bold text-primary">{formatPrice()}</p>
            <p className="text-xs text-muted-foreground">{getPriceSubtext()}</p>
          </div>
          <Link to={getDetailLink()}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold min-h-[44px] px-5 rounded-xl text-sm shadow-sm">
              View Details
            </Button>
          </Link>
        </div>
        
        <div className="mt-3">
          <WhatsAppButton 
            phoneNumber={business.phone}
            businessName={business.business_name}
            variant="outline" 
            className="w-full border-border text-foreground hover:bg-accent min-h-[44px] rounded-xl text-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
});

OptimizedBusinessCard.displayName = 'OptimizedBusinessCard';

export default OptimizedBusinessCard;
