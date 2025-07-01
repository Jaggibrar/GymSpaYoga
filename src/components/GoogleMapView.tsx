
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation } from 'lucide-react';
import { toast } from 'sonner';

interface Business {
  id: string;
  business_name: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  latitude?: number;
  longitude?: number;
}

interface GoogleMapViewProps {
  businesses: Business[];
  selectedBusiness?: Business | null;
  onBusinessSelect?: (business: Business) => void;
}

const GoogleMapView: React.FC<GoogleMapViewProps> = ({ 
  businesses, 
  selectedBusiness, 
  onBusinessSelect 
}) => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const generateMapUrl = (business: Business) => {
    const address = encodeURIComponent(`${business.address}, ${business.city}, ${business.state} ${business.pin_code}`);
    return `https://www.google.com/maps/search/?api=1&query=${address}`;
  };

  const handleGetDirections = (business: Business) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const destination = encodeURIComponent(`${business.address}, ${business.city}, ${business.state}`);
          const directionsUrl = `https://www.google.com/maps/dir/${latitude},${longitude}/${destination}`;
          window.open(directionsUrl, '_blank');
        },
        () => {
          // Fallback to simple search
          window.open(generateMapUrl(business), '_blank');
        }
      );
    } else {
      window.open(generateMapUrl(business), '_blank');
    }
  };

  const handleSetupMapbox = () => {
    if (!mapboxToken) {
      toast.error('Please enter your Mapbox token');
      return;
    }
    
    localStorage.setItem('mapbox_token', mapboxToken);
    setShowTokenInput(false);
    toast.success('Mapbox token saved! Map functionality enabled.');
  };

  React.useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
      setShowTokenInput(false);
    }
  }, []);

  if (showTokenInput) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="text-center mb-6">
          <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Enable Map View</h3>
          <p className="text-gray-600 mb-4">
            To show interactive maps, please add your Mapbox public token.
            <br />
            Get your free token at{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
        
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your Mapbox public token (pk.xxx...)"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="w-full"
          />
          <div className="flex gap-2">
            <Button onClick={handleSetupMapbox} className="flex-1">
              Enable Maps
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowTokenInput(false)}
              className="flex-1"
            >
              Skip for now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h3 className="text-lg font-semibold flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Business Locations ({businesses.length})
        </h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {businesses.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No businesses to show on map</p>
          </div>
        ) : (
          <div className="divide-y">
            {businesses.map((business) => (
              <div 
                key={business.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedBusiness?.id === business.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => onBusinessSelect?.(business)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {business.business_name}
                    </h4>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {business.address}, {business.city}, {business.state} {business.pin_code}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetDirections(business);
                    }}
                    className="ml-2"
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Directions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Click on any business to view details</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowTokenInput(true)}
            className="text-xs"
          >
            Configure Maps
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapView;
