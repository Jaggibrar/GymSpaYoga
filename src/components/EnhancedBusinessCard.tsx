
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Star, Heart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import PaymentModal from "./PaymentModal";
import { toast } from "sonner";

interface Business {
  id: string;
  business_name: string;
  city: string;
  state: string;
  category: string;
  opening_time: string;
  closing_time: string;
  phone: string;
  monthly_price?: number;
  session_price?: number;
  description?: string;
  amenities?: string[];
  image_urls?: string[];
  business_type: string;
}

interface EnhancedBusinessCardProps {
  business: Business;
  serviceType: 'gym' | 'spa' | 'yoga';
}

const EnhancedBusinessCard = ({ business, serviceType }: EnhancedBusinessCardProps) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleBookNow = () => {
    setIsPaymentModalOpen(true);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: business.business_name,
        text: `Check out ${business.business_name} in ${business.city}`,
        url: window.location.href
      });
    } catch (err) {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const price = business.monthly_price || business.session_price || 0;
  const priceType = business.monthly_price ? 'monthly' : 'session';

  const gradientMap = {
    gym: 'from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600',
    spa: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    yoga: 'from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
  };

  return (
    <>
      <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105">
        <div className="relative overflow-hidden">
          <img 
            src={business.image_urls && business.image_urls.length > 0 
              ? business.image_urls[0] 
              : `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`
            } 
            alt={business.business_name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <Badge className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600">
            {business.category}
          </Badge>
          <div className="absolute top-4 left-4 flex space-x-2">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
              onClick={handleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
            {business.business_name}
          </CardTitle>
          <div className="flex items-center space-x-2 text-emerald-600 font-semibold text-sm md:text-base">
            <MapPin className="h-4 w-4" />
            <span>{business.city}, {business.state}</span>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <Clock className="h-4 w-4" />
              <span>{business.opening_time} - {business.closing_time}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <Phone className="h-4 w-4" />
              <span>{business.phone}</span>
            </div>
            
            {business.monthly_price && (
              <div className="text-emerald-600 font-bold">
                ₹{business.monthly_price}/month
              </div>
            )}
            {business.session_price && (
              <div className="text-emerald-600 font-bold">
                ₹{business.session_price}/session
              </div>
            )}
            
            {business.description && (
              <p className="text-gray-600 text-sm line-clamp-2">
                {business.description}
              </p>
            )}
            
            {business.amenities && business.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {business.amenities.slice(0, 3).map((amenity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {business.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{business.amenities.length - 3} more
                  </Badge>
                )}
              </div>
            )}
            
            <div className="flex space-x-2 mt-4">
              <Link to={`/${serviceType}/${business.id}`} className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  View Details
                </Button>
              </Link>
              <Button 
                onClick={handleBookNow}
                className={`flex-1 bg-gradient-to-r ${gradientMap[serviceType]}`}
              >
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        businessId={business.id}
        serviceType={serviceType}
        serviceName={business.business_name}
        price={price}
        priceType={priceType}
      />
    </>
  );
};

export default EnhancedBusinessCard;
