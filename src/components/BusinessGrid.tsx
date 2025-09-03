
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Star, Users, Verified } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Business } from '@/hooks/useBusinessData';
import ImageGallery from './ImageGallery';
import ChatNowButton from './chat/ChatNowButton';

interface BusinessGridProps {
  businesses: Business[];
  loading?: boolean;
  category?: string;
}

const BusinessGrid: React.FC<BusinessGridProps> = ({ businesses, loading, category }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-t-lg"></div>
            <div className="bg-white rounded-b-lg p-6 space-y-3">
              <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              <div className="bg-gray-200 h-3 rounded w-full"></div>
              <div className="bg-gray-200 h-3 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">
            {category === 'gym' ? '🏋️‍♂️' : 
             category === 'spa' ? '🧘‍♀️' : 
             category === 'yoga' ? '🕉️' : 
             category === 'trainer' ? '💪' : '🌟'}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No {category || 'businesses'} found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or check back later for new listings.
          </p>
        </div>
      </div>
    );
  }

  const getCategoryColor = (businessType: string) => {
    const colors = {
      gym: 'bg-orange-100 text-orange-700',
      spa: 'bg-pink-100 text-pink-700',
      yoga: 'bg-purple-100 text-purple-700',
      trainer: 'bg-blue-100 text-blue-700'
    };
    return colors[businessType as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business) => (
        <Card 
          key={business.id} 
          className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-0 shadow-md bg-white/90 backdrop-blur-sm"
        >
          <div className="relative">
            <ImageGallery
              images={business.image_urls}
              title={business.business_name}
              className="h-48 w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute top-3 right-3">
              <Badge className="bg-white/95 text-gray-800 shadow-md backdrop-blur-sm">
                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                4.8
              </Badge>
            </div>
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <Badge className={`${getCategoryColor(business.business_type)} border-0 font-medium capitalize shadow-md`}>
                {business.business_type}
              </Badge>
              <Badge className="bg-blue-500 text-white font-bold text-xs flex items-center gap-1 shadow-md">
                <Verified className="h-3 w-3" />
                Verified
              </Badge>
            </div>
          </div>
          
          <CardHeader className="pb-4 px-6">
            <CardTitle className="text-xl font-semibold group-hover:text-emerald-600 transition-colors line-clamp-1 mb-2">
              {business.business_name}
            </CardTitle>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="line-clamp-1">{business.city}, {business.state}</span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 px-6 pb-6 space-y-4">
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {business.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{business.opening_time} - {business.closing_time}</span>
              </div>
              <div className="flex items-center font-semibold text-emerald-600 text-base">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>
                  {business.session_price ? `₹${business.session_price}/session` : 
                   business.monthly_price ? `₹${business.monthly_price}/month` : 'Contact'}
                </span>
              </div>
            </div>

            {business.amenities && business.amenities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {business.amenities.slice(0, 3).map((amenity) => (
                  <Badge key={amenity} variant="outline" className="text-xs px-3 py-1 bg-gray-50 rounded-full">
                    {amenity}
                  </Badge>
                ))}
                {business.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs px-3 py-1 bg-gray-50 rounded-full">
                    +{business.amenities.length - 3} more
                  </Badge>
                )}
              </div>
            )}
            
            <div className="flex gap-2 pt-3">
              <Link to={`/business/${business.id}`} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-sm py-2.5">
                  View Details
                </Button>
              </Link>
            </div>
            
            <div className="flex gap-2 mt-2">
              <ChatNowButton businessId={business.id} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BusinessGrid;
