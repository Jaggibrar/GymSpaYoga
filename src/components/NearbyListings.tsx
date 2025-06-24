
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Navigation } from 'lucide-react';
import { useGeolocation, calculateDistance } from '@/hooks/useGeolocation';
import { useBusinessData } from '@/hooks/useBusinessData';
import { useNavigate } from 'react-router-dom';

const NearbyListings = () => {
  const { latitude, longitude, error, loading: locationLoading } = useGeolocation();
  const { businesses, loading: businessLoading } = useBusinessData();
  const navigate = useNavigate();

  const nearbyBusinesses = React.useMemo(() => {
    if (!latitude || !longitude || !businesses.length) return [];

    // Mock coordinates for businesses since we don't have real geo data
    // In production, you'd have lat/lng stored in the database
    const businessesWithDistance = businesses.map(business => {
      // Mock coordinates based on city (this would come from your database)
      const mockCoords = getMockCoordinates(business.city);
      const distance = calculateDistance(
        latitude,
        longitude,
        mockCoords.lat,
        mockCoords.lng
      );

      return {
        ...business,
        distance,
        coordinates: mockCoords
      };
    });

    // Filter businesses within 50km and sort by distance
    return businessesWithDistance
      .filter(business => business.distance <= 50)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 6); // Show top 6 nearest
  }, [latitude, longitude, businesses]);

  const handleViewDetails = (businessId: string) => {
    navigate(`/business/${businessId}`);
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  if (locationLoading || businessLoading) {
    return (
      <div className="py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          <span className="ml-2 text-gray-600">Finding nearby businesses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600 mb-4">Unable to access your location</p>
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  if (!nearbyBusinesses.length) {
    return (
      <div className="py-8 text-center">
        <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No businesses found nearby</p>
        <p className="text-sm text-gray-500">Try expanding your search area</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nearby Businesses
          </h2>
          <p className="text-gray-600">
            Discover wellness services close to you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyBusinesses.map((business) => (
            <Card key={business.id} className="hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"}
                  alt={business.business_name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-emerald-500 text-white">
                  {business.distance}km away
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">{business.business_name}</h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{business.city}, {business.state}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {business.description || "Premium wellness services"}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">
                    {business.business_type?.replace('_', ' ').toUpperCase()}
                  </Badge>
                  {business.monthly_price && (
                    <span className="text-lg font-bold text-emerald-600">
                      ₹{business.monthly_price}/month
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleViewDetails(business.id)}
                    className="flex-1"
                    variant="outline"
                  >
                    View Details
                  </Button>
                  <Button 
                    onClick={() => handleCall(business.phone)}
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Mock coordinates for cities (in production, store these in database)
const getMockCoordinates = (city: string): { lat: number; lng: number } => {
  const cityCoords: { [key: string]: { lat: number; lng: number } } = {
    'Mumbai': { lat: 19.0760, lng: 72.8777 },
    'Delhi': { lat: 28.7041, lng: 77.1025 },
    'Bangalore': { lat: 12.9716, lng: 77.5946 },
    'Chennai': { lat: 13.0827, lng: 80.2707 },
    'Pune': { lat: 18.5204, lng: 73.8567 },
    'Hyderabad': { lat: 17.3850, lng: 78.4867 },
    'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
    'Kolkata': { lat: 22.5726, lng: 88.3639 },
  };

  return cityCoords[city] || { lat: 19.0760, lng: 72.8777 }; // Default to Mumbai
};

export default NearbyListings;
