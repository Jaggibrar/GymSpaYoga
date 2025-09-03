import React, { memo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Clock, Crown, Diamond, IndianRupee } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ChatNowButton from '@/components/chat/ChatNowButton';

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
}

interface OptimizedBusinessCardProps {
  business: Business;
}

const OptimizedBusinessCard = memo(({ business }: OptimizedBusinessCardProps) => {
  const navigate = useNavigate();
  // Determine tier based on pricing
  const getTier = () => {
    // First check if category is already a tier
    if (business.category && ['luxury', 'premium', 'budget'].includes(business.category.toLowerCase())) {
      return business.category.toLowerCase();
    }
    
    // Otherwise determine from pricing
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

  const getTierColor = (tierType: string) => {
    switch (tierType) {
      case 'luxury': return "from-yellow-500 to-yellow-600";
      case 'premium': return "from-blue-500 to-blue-600";
      default: return "from-green-500 to-green-600";
    }
  };

  const imageUrl = business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  // Fixed the link generation based on business type
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
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 rounded-3xl overflow-hidden bg-white">
      <div className="relative overflow-hidden h-48">
        <img 
          src={imageUrl}
          alt={business.business_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${getTierColor(tier)} text-white border-0 px-3 py-2 rounded-full shadow-lg`}>
          {getTierIcon(tier)}
          <span className="ml-1 capitalize font-semibold">{tier}</span>
        </Badge>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 text-white bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="font-medium">4.7</span>
            <span className="text-sm opacity-90">(New listing)</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold group-hover:text-red-600 transition-colors mb-3 line-clamp-1">
            {business.business_name}
          </h3>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="text-base truncate">{business.city}, {business.state}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-base mb-6 line-clamp-3 leading-relaxed">
          {business.description || "Modern fitness center with state-of-the-art equipment and professional trainers."}
        </p>
        
        <div className="flex items-center gap-3 text-gray-500 text-base mb-6">
          <Clock className="h-5 w-5" />
          <span>{business.opening_time} - {business.closing_time}</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-red-600">
                {formatPrice()}
              </p>
              <p className="text-base text-gray-500 mt-1">
                {getPriceSubtext()}
              </p>
            </div>
            <Link to={getDetailLink()}>
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl px-8 py-4 text-base font-semibold transform hover:scale-105 transition-all duration-300">
                View Details
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            <ChatNowButton 
              businessId={business.id} 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

OptimizedBusinessCard.displayName = 'OptimizedBusinessCard';

export default OptimizedBusinessCard;
