import React from 'react';
import { MessageCircle, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileStickyActionBarProps {
  phoneNumber?: string;
  businessName?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
}

const MobileStickyActionBar: React.FC<MobileStickyActionBarProps> = ({
  phoneNumber,
  businessName = '',
  latitude,
  longitude,
  address,
}) => {
  const handleWhatsApp = () => {
    const cleanPhone = phoneNumber?.replace(/\D/g, '') || '';
    const message = `Hi! I found ${businessName} on GymSpaYoga.com and I'm interested in your services.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDirections = () => {
    if (latitude && longitude) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank');
    } else if (address) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border shadow-lg safe-area-bottom">
      <div className="flex gap-2 p-3 max-w-screen-sm mx-auto">
        {phoneNumber && (
          <Button
            onClick={handleWhatsApp}
            className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold min-h-[48px] text-base"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            WhatsApp
          </Button>
        )}
        {(latitude || address) && (
          <Button
            onClick={handleDirections}
            variant="outline"
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold min-h-[48px] text-base"
          >
            <Navigation className="h-5 w-5 mr-2" />
            Directions
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileStickyActionBar;
