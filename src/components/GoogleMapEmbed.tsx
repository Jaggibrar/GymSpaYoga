import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Business {
  id: string;
  business_name: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
}

interface GoogleMapEmbedProps {
  businesses: Business[];
  selectedBusiness?: Business | null;
  onBusinessSelect?: (business: Business) => void;
  className?: string;
}

const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  businesses,
  selectedBusiness,
  onBusinessSelect,
  className = '',
}) => {
  const target = selectedBusiness || businesses[0];

  const getEmbedUrl = (business: Business) => {
    const q = encodeURIComponent(`${business.business_name}, ${business.address}, ${business.city}, ${business.state} ${business.pin_code}`);
    return `https://www.google.com/maps?q=${q}&output=embed`;
  };

  const getDirectionsUrl = (business: Business) => {
    const dest = encodeURIComponent(`${business.address}, ${business.city}, ${business.state}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
  };

  const getMapsUrl = (business: Business) => {
    const q = encodeURIComponent(`${business.business_name}, ${business.address}, ${business.city}`);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  };

  if (!target) {
    return (
      <div className={`bg-muted rounded-lg p-8 text-center ${className}`}>
        <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">No locations to display</p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl overflow-hidden border shadow-sm ${className}`}>
      {/* Map iframe */}
      <div className="relative aspect-video bg-muted">
        <iframe
          title={`Map — ${target.business_name}`}
          src={getEmbedUrl(target)}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      {/* Business list below map */}
      {businesses.length > 1 && (
        <div className="max-h-64 overflow-y-auto divide-y">
          {businesses.map((b) => (
            <button
              key={b.id}
              onClick={() => onBusinessSelect?.(b)}
              className={`w-full text-left p-4 hover:bg-muted/50 transition-colors flex items-start justify-between gap-3 ${
                selectedBusiness?.id === b.id ? 'bg-primary/5 border-l-4 border-primary' : ''
              }`}
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{b.business_name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  {b.city}, {b.state}
                </p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <a
                  href={getDirectionsUrl(b)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center justify-center h-8 w-8 rounded-md border hover:bg-muted"
                  aria-label={`Get directions to ${b.business_name}`}
                >
                  <Navigation className="h-3.5 w-3.5" />
                </a>
                <a
                  href={getMapsUrl(b)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center justify-center h-8 w-8 rounded-md border hover:bg-muted"
                  aria-label={`Open ${b.business_name} in Google Maps`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Single business actions */}
      {businesses.length === 1 && (
        <div className="p-4 flex gap-2">
          <Button asChild variant="outline" className="flex-1 min-h-[44px]">
            <a href={getDirectionsUrl(target)} target="_blank" rel="noopener noreferrer">
              <Navigation className="h-4 w-4 mr-2" /> Get Directions
            </a>
          </Button>
          <Button asChild className="flex-1 min-h-[44px]">
            <a href={getMapsUrl(target)} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" /> Open in Maps
            </a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoogleMapEmbed;
