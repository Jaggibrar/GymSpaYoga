import { useState, useEffect } from 'react';
import { useGeolocation, calculateDistance } from '@/hooks/useGeolocation';
import { useStableBusinessData } from '@/hooks/useStableBusinessData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Star, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import FavoriteButton from '@/components/FavoriteButton';

interface BusinessWithDistance {
  id: string;
  business_name: string;
  business_type: string;
  category: string;
  city: string;
  state: string;
  image_urls: string[];
  monthly_price?: number;
  session_price?: number;
  description?: string;
  opening_time: string;
  closing_time: string;
  phone: string;
  email: string;
  amenities: string[];
  address: string;
  pin_code: string;
  latitude?: number;
  longitude?: number;
  distance?: number;
}

export const GeolocationRecommendations = () => {
  const { position, error, loading: geoLoading, getCurrentPosition } = useGeolocation();
  const { businesses, loading: businessLoading, error: businessError } = useStableBusinessData();
  const [nearbyBusinesses, setNearbyBusinesses] = useState<BusinessWithDistance[]>([]);
  const [maxDistance, setMaxDistance] = useState(10); // km

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  useEffect(() => {
    if (position && businesses.length > 0) {
      const businessesWithDistance = businesses
        .map(business => {
          if (business.latitude && business.longitude) {
            const distance = calculateDistance(
              position.latitude,
              position.longitude,
              business.latitude,
              business.longitude
            );
            return { ...business, distance } as BusinessWithDistance;
          }
          return { ...business, distance: undefined } as BusinessWithDistance;
        })
        .filter((business): business is BusinessWithDistance => 
          business.distance !== undefined && business.distance <= maxDistance
        )
        .sort((a, b) => a.distance - b.distance);

      setNearbyBusinesses(businessesWithDistance);
    }
  }, [position, businesses, maxDistance]);

  // Now safe to do conditional returns after all hooks
  if (businessError) {
    console.log('GeolocationRecommendations: Skipping render due to business data error');
    return null;
  }

  const formatDistance = (distance: number) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  const getBusinessUrl = (business: BusinessWithDistance) => {
    const typeRoutes: { [key: string]: string } = {
      'gym': '/gyms',
      'spa': '/spas',
      'yoga_studio': '/yoga'
    };
    
    const baseRoute = typeRoutes[business.business_type] || '/explore';
    return `${baseRoute}/${business.id}`;
  };

  if (!position) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Nearby Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-4">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <p className="text-muted-foreground mb-4">
                Share your location to discover gyms, spas, and studios near you
              </p>
              <Button 
                onClick={getCurrentPosition}
                disabled={geoLoading}
                className="bg-[#005EB8] hover:bg-[#004d96]"
              >
                {geoLoading ? 'Getting Location...' : 'Share Location'}
              </Button>
            </div>
            {error && (
              <p className="text-red-500 text-sm">
                {error.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (businessLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nearby Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse flex space-x-4">
                <div className="h-24 w-24 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Nearby Recommendations
          </span>
          <div className="flex items-center gap-2">
            <label className="text-sm">Within:</label>
            <select
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="text-sm border rounded px-2 py-1"
            >
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={20}>20 km</option>
              <option value={50}>50 km</option>
            </select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {nearbyBusinesses.length === 0 ? (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No businesses found within {maxDistance}km of your location
            </p>
            <Button
              variant="outline"
              onClick={() => setMaxDistance(maxDistance * 2)}
              className="mt-4"
            >
              Expand search to {maxDistance * 2}km
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {nearbyBusinesses.slice(0, 5).map((business) => (
              <Link
                key={business.id}
                to={getBusinessUrl(business)}
                className="block"
              >
                <div className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="relative">
                    <img
                      src={business.image_urls?.[0] || '/placeholder.svg'}
                      alt={business.business_name}
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                    <div className="absolute top-1 right-1">
                      <FavoriteButton businessId={business.id} size="sm" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-sm truncate">
                          {business.business_name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {business.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {business.distance && formatDistance(business.distance)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {business.opening_time} - {business.closing_time}
                      </div>
                      {(business.session_price || business.monthly_price) && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {business.session_price 
                            ? `₹${business.session_price}/session`
                            : `₹${business.monthly_price}/month`
                          }
                        </div>
                      )}
                    </div>
                    
                    {business.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {business.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
            
            {nearbyBusinesses.length > 5 && (
              <div className="text-center pt-4">
                <Link to="/explore">
                  <Button variant="outline">
                    View All {nearbyBusinesses.length} Nearby Results
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};