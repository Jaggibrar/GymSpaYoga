
import React from 'react';
import { useBusinessData } from '@/hooks/useBusinessData';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Phone, Clock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingModal from '@/components/BookingModal';
import BusinessDetailsModal from '@/components/business/BusinessDetailsModal';

interface CategoryBusinessesProps {
  category: string;
  title: string;
  description: string;
  searchTerm?: string;
  location?: string;
  sortBy?: string;
}

const CategoryBusinesses = ({ 
  category, 
  title, 
  description, 
  searchTerm = '', 
  location = '', 
  sortBy = 'created_at' 
}: CategoryBusinessesProps) => {
  const { businesses, loading, error } = useBusinessData(category, searchTerm, location, sortBy);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Error loading businesses: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  const getDetailPath = (business: any) => {
    switch (business.business_type) {
      case 'gym':
        return `/gym/${business.id}`;
      case 'spa':
        return `/spa/${business.id}`;
      case 'yoga':
        return `/yoga/${business.id}`;
      default:
        return '#';
    }
  };

  const formatPrice = (business: any) => {
    if (business.monthly_price) return `₹${business.monthly_price}/month`;
    if (business.session_price) return `₹${business.session_price}/session`;
    return 'Contact for pricing';
  };

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
          {title}
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
          {description}
        </p>
        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 backdrop-blur-sm text-lg px-4 py-2">
          {businesses.length} Premium {category === 'all' ? 'Businesses' : title} Available
        </Badge>
      </div>

      {/* Business Grid */}
      {businesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((business) => (
            <Card 
              key={business.id} 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={business.image_urls?.[0] || "/placeholder.svg"} 
                  alt={business.business_name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm hover:bg-emerald-600">
                  {business.category || 'Premium'}
                </Badge>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center text-white text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">4.8</span>
                    <span className="ml-1 opacity-90">(127 reviews)</span>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-1">
                      {business.business_name}
                    </CardTitle>
                    <p className="text-emerald-600 font-semibold text-sm capitalize">
                      {business.business_type}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-3 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm line-clamp-1">{business.city}, {business.state}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-3 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm">
                      {business.opening_time?.slice(0, 5)} - {business.closing_time?.slice(0, 5)}
                    </span>
                  </div>
                  <div className="flex items-center text-emerald-600 font-bold text-lg">
                    <span>{formatPrice(business)}</span>
                  </div>
                </div>

                {/* Amenities */}
                {business.amenities && business.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {business.amenities.slice(0, 3).map((amenity: string) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {business.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{business.amenities.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <BusinessDetailsModal
                    business={business}
                    trigger={
                      <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-sm shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-3 min-h-[48px]">
                        <span className="block mr-2">View Details</span>
                        <ArrowRight className="h-4 w-4 flex-shrink-0" />
                      </Button>
                    }
                  />
                  
                  <BookingModal 
                    businessName={business.business_name}
                    businessType={business.business_type}
                    businessId={business.id}
                    price={formatPrice(business)}
                    trigger={
                      <Button 
                        variant="outline" 
                        className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-sm shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-3 min-h-[48px]"
                      >
                        <span className="block">Book Now</span>
                      </Button>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-4">No Results Found</h3>
            <p className="text-gray-300 mb-6">
              No {category === 'all' ? 'businesses' : title.toLowerCase()} found for your search criteria. 
              Try adjusting your filters or search terms.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Clear Filters & Retry
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoryBusinesses;
