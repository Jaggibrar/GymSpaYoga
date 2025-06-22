
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Phone, Mail, Star, Calendar, Eye } from 'lucide-react';
import BookingModal from './BookingModal';
import { getTierFromPricing } from '@/utils/businessUtils';

interface Business {
  id: string;
  business_name: string;
  business_type: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  opening_time: string;
  closing_time: string;
  amenities?: string[];
  image_urls?: string[];
  session_price?: number;
  monthly_price?: number;
}

interface BusinessDetailsModalProps {
  business: Business;
  trigger: React.ReactNode;
}

const BusinessDetailsModal = ({ business, trigger }: BusinessDetailsModalProps) => {
  const tier = getTierFromPricing(business);

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {business.business_name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image Gallery */}
          {business.image_urls && business.image_urls.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {business.image_urls.slice(0, 6).map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`${business.business_name} ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Business Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="capitalize">
                  {business.business_type}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {tier} Tier
                </Badge>
              </div>

              {business.description && (
                <p className="text-gray-600 leading-relaxed">
                  {business.description}
                </p>
              )}

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">
                      {business.address}, {business.city}, {business.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Operating Hours</p>
                    <p className="text-gray-600">
                      {formatTime(business.opening_time)} - {formatTime(business.closing_time)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{business.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{business.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Amenities */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Pricing</h3>
                  <div className="space-y-2">
                    {business.monthly_price && (
                      <div className="flex justify-between">
                        <span>Monthly Membership</span>
                        <span className="font-semibold text-emerald-600">
                          ₹{business.monthly_price}
                        </span>
                      </div>
                    )}
                    {business.session_price && (
                      <div className="flex justify-between">
                        <span>Per Session</span>
                        <span className="font-semibold text-emerald-600">
                          ₹{business.session_price}
                        </span>
                      </div>
                    )}
                    {!business.monthly_price && !business.session_price && (
                      <p className="text-gray-600">Contact for pricing</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {business.amenities && business.amenities.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {business.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.7 (124 reviews)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <BookingModal
              businessName={business.business_name}
              businessType={business.business_type}
              businessId={business.id}
              price={business.monthly_price ? `₹${business.monthly_price}` : business.session_price ? `₹${business.session_price}` : undefined}
              trigger={
                <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
              }
            />
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessDetailsModal;
