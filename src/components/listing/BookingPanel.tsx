import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Phone, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import BookingForm from '@/components/booking/BookingForm';

 interface BookingPanelProps {
   businessId: string;
   businessName: string;
   businessType: "gym" | "spa" | "yoga" | "trainer" | "chiropractor";
  rating?: number;
  reviewCount?: number;
  location: {
    city: string;
    state: string;
    address: string;
  };
  hours: {
    opening: string;
    closing: string;
  };
  phone: string;
  pricing?: {
    session?: number;
    monthly?: number;
    hourly?: number;
  };
  onCallClick?: () => void;
}

const BookingPanel: React.FC<BookingPanelProps> = ({
  businessId,
  businessName,
  businessType,
  rating = 4.8,
  reviewCount = 89,
  location,
  hours,
  phone,
  pricing,
  onCallClick
}) => {
  const formatTime = (time: string) => {
    try {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  };

  const handleCall = () => {
    if (onCallClick) {
      onCallClick();
    } else {
      window.open(`tel:${phone}`, '_self');
    }
  };

  return (
    <Card className="sticky top-8 shadow-xl border-0">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold mb-2">{businessName}</CardTitle>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-semibold">{rating}</span>
              <span className="text-muted-foreground">({reviewCount} reviews)</span>
            </div>
          </div>
          {pricing && (
            <div className="text-right">
              {pricing.session && (
                <p className="text-3xl font-bold text-primary">₹{pricing.session}</p>
              )}
              {pricing.monthly && (
                <p className="text-3xl font-bold text-primary">₹{pricing.monthly}</p>
              )}
              {pricing.hourly && (
                <p className="text-3xl font-bold text-primary">₹{pricing.hourly}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {pricing.session && "per session"}
                {pricing.monthly && "per month"}
                {pricing.hourly && "per hour"}
              </p>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Location & Contact Info */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">{location.city}, {location.state}</p>
              <p className="text-sm text-muted-foreground">{location.address}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <span className="text-sm">{formatTime(hours.opening)} - {formatTime(hours.closing)}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <span className="text-sm">{phone}</span>
          </div>
        </div>

        <Separator />

        {/* Booking Form */}
        <div className="space-y-4">
          <BookingForm
            businessId={businessId}
            businessType={businessType}
            businessName={businessName}
          />
          
          <Button 
            variant="outline" 
            className="w-full text-lg py-3 hover:bg-primary/5 transition-all duration-300"
            onClick={handleCall}
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>
        </div>

        <Separator />

        {/* Trust Indicators */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Verified Business</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Instant Confirmation</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Secure Booking</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingPanel;