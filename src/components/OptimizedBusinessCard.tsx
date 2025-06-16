
import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Clock, Crown, Diamond, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  // Determine tier based on pricing
  const getTier = () => {
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
    return business.category || 'budget';
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

  // Fix the link based on business type
  const getDetailLink = () => {
    switch (business.business_type) {
      case 'gym': return `/gyms/${business.id}`;
      case 'spa': return `/spas/${business.id}`;
      case 'yoga': return `/yoga/${business.id}`;
      default: return `/gyms/${business.id}`;
    }
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 rounded-3xl overflow-hidden bg-white">
      <div className="relative overflow-hidden h-48">
        <img 
          src={imageUrl}
          alt={business.business_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${getTierColor(tier)} text-white border-0 px-3 py-2 rounded-full`}>
          {getTierIcon(tier)}
          <span className="ml-1 capitalize font-semibold">{tier}</span>
        </Badge>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 text-white">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="font-medium">4.7</span>
            <span className="text-sm opacity-90">(New listing)</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold group-hover:text-red-600 transition-colors mb-2 line-clamp-1">
            {business.business_name}
          </h3>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm truncate">{business.city}, {business.state}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {business.description || "Modern fitness center with state-of-the-art equipment and professional trainers."}
        </p>
        
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <Clock className="h-4 w-4" />
          <span>{business.opening_time} - {business.closing_time}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-red-600">
              {business.monthly_price ? `₹${business.monthly_price}` : business.session_price ? `₹${business.session_price}` : "Contact"}
            </p>
            <p className="text-sm text-gray-500">
              {business.monthly_price ? "/month" : business.session_price ? "/session" : "for pricing"}
            </p>
          </div>
          <Link to={getDetailLink()}>
            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl px-6 py-3 font-semibold transform hover:scale-105 transition-all duration-300">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
});

OptimizedBusinessCard.displayName = 'OptimizedBusinessCard';

export default OptimizedBusinessCard;
