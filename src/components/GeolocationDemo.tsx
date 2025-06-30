
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Loader2, AlertCircle, Navigation } from 'lucide-react';
import { useGeolocation, reverseGeocode } from '@/hooks/useGeolocation';
import { toast } from 'sonner';

const GeolocationDemo = () => {
  const { position, error, loading, getCurrentPosition, isSupported } = useGeolocation();
  const [address, setAddress] = useState<string>('');
  const [loadingAddress, setLoadingAddress] = useState(false);

  const handleGetLocation = () => {
    getCurrentPosition();
    setAddress('');
  };

  const handleGetAddress = async () => {
    if (!position) {
      toast.error('Please get your location first');
      return;
    }

    setLoadingAddress(true);
    try {
      const addr = await reverseGeocode(position.latitude, position.longitude);
      setAddress(addr);
      toast.success('Address retrieved successfully');
    } catch (error) {
      toast.error('Failed to get address');
    } finally {
      setLoadingAddress(false);
    }
  };

  if (!isSupported) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Geolocation Not Supported
          </CardTitle>
          <CardDescription>
            Your browser does not support geolocation services.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-blue-500" />
          Location Services
        </CardTitle>
        <CardDescription>
          Get your current location and find nearby businesses
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={handleGetLocation} 
            disabled={loading}
            className="flex-1"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Getting Location...
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-2" />
                Get My Location
              </>
            )}
          </Button>
          
          {position && (
            <Button 
              onClick={handleGetAddress} 
              disabled={loadingAddress}
              variant="outline"
            >
              {loadingAddress ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Get Address'
              )}
            </Button>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-medium">Error: {error.message}</p>
            <p className="text-red-600 text-xs">Code: {error.code}</p>
          </div>
        )}

        {position && (
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Location Found!</h4>
              <div className="space-y-1 text-sm text-green-700">
                <p><strong>Latitude:</strong> {position.latitude.toFixed(6)}</p>
                <p><strong>Longitude:</strong> {position.longitude.toFixed(6)}</p>
                <p><strong>Accuracy:</strong> ±{Math.round(position.accuracy)}m</p>
                <p><strong>Time:</strong> {new Date(position.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>

            {address && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Address</h4>
                <p className="text-sm text-blue-700">{address}</p>
              </div>
            )}

            <Badge variant="secondary" className="w-full justify-center">
              Location services active
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeolocationDemo;
