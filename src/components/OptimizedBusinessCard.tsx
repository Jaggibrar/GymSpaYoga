import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Clock, Crown, Diamond, IndianRupee } from 'lucide-react';
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

  const getTierIcon = (tierType: string) => {
    switch (tierType) {
      case 'luxury': return <Crown className="h-4 w-4" />;
      case 'premium': return <Diamond className="h-4 w-4" />;
      default: return <IndianRupee className="h-4 w-4" />;
    }
  };

  const getTierStyles = (tierType: string) => {
    switch (tierType) {
      case 'luxury': return "bg-yellow-500 text-white";
      case 'premium': return "bg-primary text-white";
      default: return "bg-green-600 text-white";
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
    if (business.monthly_price) {
      return `₹${business.monthly_price.toLocaleString()}`;
    } else if (business.session_price) {
      return `₹${business.session_price.toLocaleString()}`;
    }
    return "Contact";
  };

  const getPriceSubtext = () => {
    if (business.monthly_price) return "/month";
    if (business.session_price) return "/session";
    return "for pricing";
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 border border-border rounded-lg overflow-hidden bg-white">
      <div className="relative overflow-hidden h-48">
        <img 
          src={imageUrl}
          alt={business.business_name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
          }}
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <Badge className={`absolute top-3 right-3 ${getTierStyles(tier)} border-0 px-2.5 py-1 rounded-md shadow-sm`}>
          {getTierIcon(tier)}
          <span className="ml-1 capitalize font-semibold text-sm">{tier}</span>
        </Badge>
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1.5 text-white bg-black/50 rounded px-2 py-1">
            <Star className="h-3.5 w-3.5 fill-current text-yellow-400" />
            <span className="font-medium text-sm">4.7</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-1">
            {business.business_name}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm truncate">{business.city}, {business.state}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
          {business.description || "Modern fitness center with state-of-the-art equipment."}
        </p>
        
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <Clock className="h-4 w-4" />
          <span>{business.opening_time} - {business.closing_time}</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-primary">
                {formatPrice()}
              </p>
              <p className="text-sm text-muted-foreground">
                {getPriceSubtext()}
              </p>
            </div>
            <Link to={getDetailLink()}>
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-2">
                View Details
              </Button>
            </Link>
          </div>
          
          <WhatsAppButton 
            phoneNumber={business.phone}
            businessName={business.business_name}
            variant="outline" 
            className="w-full border-primary text-primary hover:bg-primary hover:text-white"
          />
        </div>
      </CardContent>
    </Card>
  );
});

OptimizedBusinessCard.displayName = 'OptimizedBusinessCard';

export default OptimizedBusinessCard;
