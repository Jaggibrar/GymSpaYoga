
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Phone, Mail, Star, Wifi, Car, Coffee, Dumbbell, Eye } from 'lucide-react';
import { Business } from '@/hooks/useBusinessData';
import BookingModal from '@/components/BookingModal';
import { getTierFromPricing, getTierColor } from '@/utils/businessUtils';

interface BusinessDetailsModalProps {
  business: Business;
  trigger?: React.ReactNode;
}

const BusinessDetailsModal = ({ business, trigger }: BusinessDetailsModalProps) => {
  const tier = getTierFromPricing(business);
  
  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi') || lower.includes('internet')) return <Wifi className="h-4 w-4" />;
    if (lower.includes('parking') || lower.includes('car')) return <Car className="h-4 w-4" />;
    if (lower.includes('cafe') || lower.includes('coffee')) return <Coffee className="h-4 w-4" />;
    if (lower.includes('equipment') || lower.includes('gym')) return <Dumbbell className="h-4 w-4" />;
    return <Star className="h-4 w-4" />;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{business.business_name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img 
                src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"} 
                alt={business.business_name}
                className="w-full h-full object-cover"
              />
              <Badge className={`absolute top-3 right-3 bg-gradient-to-r ${getTierColor(tier)} text-white border-0`}>
                {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </Badge>
            </div>
            
            {business.image_urls && business.image_urls.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {business.image_urls.slice(1, 4).map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${business.business_name} ${index + 2}`}
                    className="h-20 w-full object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Business Info */}
          <div className="space-y-4">
            <div>
              <Badge variant="outline" className="mb-2">
                {business.business_type?.replace('_', ' ').toUpperCase()}
              </Badge>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="h-4 w-4" />
                <span>{business.address}, {business.city}, {business.state} - {business.pin_code}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Clock className="h-4 w-4" />
                <span>{business.opening_time} - {business.closing_time}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-600">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-medium">4.7 (128 reviews)</span>
              </div>
            </div>

            {/* Pricing */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Pricing</h4>
                {business.monthly_price && (
                  <p className="text-2xl font-bold text-emerald-600">₹{business.monthly_price}/month</p>
                )}
                {business.session_price && (
                  <p className="text-2xl font-bold text-emerald-600">₹{business.session_price}/session</p>
                )}
                {!business.monthly_price && !business.session_price && (
                  <p className="text-lg text-gray-600">Contact for pricing</p>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{business.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{business.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-semibold mb-2">About</h4>
          <p className="text-gray-600 leading-relaxed">
            {business.description || "This premium wellness destination offers exceptional services in a comfortable and professional environment."}
          </p>
        </div>

        {/* Amenities */}
        {business.amenities && business.amenities.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Amenities & Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {business.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  {getAmenityIcon(amenity)}
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking Section */}
        <div className="flex gap-3 pt-4 border-t">
          <BookingModal
            businessName={business.business_name}
            businessType={business.business_type}
            businessId={business.id}
            price={business.monthly_price ? `₹${business.monthly_price}` : business.session_price ? `₹${business.session_price}` : undefined}
            trigger={
              <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                Book Now
              </Button>
            }
          />
          <Button variant="outline" className="flex-1">
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessDetailsModal;
