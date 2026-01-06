import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Grid3X3, Map, Star, Clock, DollarSign, Navigation, List, Dumbbell } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { useOptimizedBusinessData } from '@/hooks/useOptimizedBusinessData';
import GoogleMapView from '@/components/GoogleMapView';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAnalytics } from '@/components/analytics/AnalyticsProvider';
import OptimizedImage from '@/components/performance/ImageOptimizer';

const Gyms = () => {
  const navigate = useNavigate();
  const { trackSearch, trackUserAction } = useAnalytics();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  
  const { position, getCurrentPosition, loading: geoLoading } = useGeolocation();

  const { businesses, loading, error } = useOptimizedBusinessData(
    'gym',
    searchTerm,
    location,
    sortBy
  );

  // Group businesses by pricing tier
  const budgetGyms = businesses.filter(b => {
    const price = b.monthly_price || b.session_price || 0;
    return price < 2000;
  });

  const premiumGyms = businesses.filter(b => {
    const price = b.monthly_price || b.session_price || 0;
    return price >= 2000 && price < 4000;
  });

  const luxuryGyms = businesses.filter(b => {
    const price = b.monthly_price || b.session_price || 0;
    return price >= 4000;
  });

  const handleSearch = () => {
    trackSearch(searchTerm, location, businesses.length);
    trackUserAction('gym_search', { searchTerm, location, resultCount: businesses.length });
  };

  const handleGetCurrentLocation = () => {
    getCurrentPosition();
    if (position) {
      setLocation(`${position.latitude}, ${position.longitude}`);
      toast.success('Current location detected!');
    }
  };

  const handleViewDetails = (business: any) => {
    // Use slug if available, fallback to ID
    navigate(`/gyms/${business.slug || business.id}`);
  };

  const renderGymCard = (business: any, tierColor: string) => (
    <Card key={business.id} className="group border-2 border-gray-100 hover:border-[#0A45FF] transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
        <OptimizedImage
          src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
          alt={`${business.business_name} - Premium Gym in ${business.city}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          width={400}
          height={160}
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-white text-gray-800 shadow-md px-2 py-1">
            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400 inline" />
            {(4.0 + Math.random()).toFixed(1)}
          </Badge>
        </div>
        <div className="absolute top-3 left-3">
          <div className={`w-10 h-10 rounded-lg ${tierColor} flex items-center justify-center`}>
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
      <CardContent className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-black line-clamp-1">{business.business_name}</h3>
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{business.city}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{business.opening_time} - {business.closing_time}</span>
        </div>
        <div className="flex items-center text-[#0A45FF] text-sm font-semibold">
          <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>
            {business.monthly_price ? `₹${business.monthly_price}/month` : 
             business.session_price ? `₹${business.session_price}/session` : 'Pricing available'}
          </span>
        </div>
        {business.amenities && business.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {business.amenities.slice(0, 3).map((amenity: string) => (
              <Badge key={amenity} variant="outline" className="text-xs px-2 py-0.5 border-gray-200">
                {amenity}
              </Badge>
            ))}
          </div>
        )}
        <Button 
          onClick={() => handleViewDetails(business)}
          className="w-full mt-4 bg-[#0A45FF] hover:bg-[#083ACC] text-white min-h-[48px] text-base font-semibold"
          aria-label={`View details for ${business.business_name}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <>
      <SEOHead
        title="Best Gyms in India - Find Premium Fitness Centers Near You | GymSpaYoga"
        description="Discover and book the best gyms in Mumbai, Delhi, Bangalore & across India. State-of-the-art equipment, expert trainers, and flexible membership options. Book now!"
        keywords="gyms near me, best gym Mumbai, premium gym Delhi, fitness center Bangalore, gym membership India, workout facilities"
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden h-[250px] md:h-[350px]">
          <div className="absolute inset-0">
            <OptimizedImage 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Modern gym equipment and fitness facility interior"
              className="w-full h-full object-cover"
              priority={true}
              width={1920}
              height={350}
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white">
                Explore Premium Gyms
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                Discover state-of-the-art fitness centers with expert trainers
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="container mx-auto px-4 py-6">
          <Card className="border-2 border-gray-100 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search gyms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 text-black border-gray-200"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 pr-10 h-11 text-black border-gray-200"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleGetCurrentLocation}
                    disabled={geoLoading}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  >
                    <Navigation className={`h-4 w-4 ${geoLoading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
                <Button 
                  onClick={handleSearch}
                  className="bg-[#0A45FF] hover:bg-[#083ACC] text-white h-11 px-6"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Filters and View Toggle */}
        <section className="py-6 bg-gray-50 border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className="bg-[#0A45FF] text-white px-3 py-1">
                  {businesses.length} Gyms Found
                </Badge>
                <select 
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="created_at">Sort by: Latest</option>
                  <option value="business_name">Sort by: Name</option>
                  <option value="monthly_price">Sort by: Price</option>
                </select>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-[#0A45FF]' : 'border-gray-200'}
                >
                  <Grid3X3 className="h-4 w-4 mr-1" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-[#0A45FF]' : 'border-gray-200'}
                >
                  <List className="h-4 w-4 mr-1" />
                  List
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className={viewMode === 'map' ? 'bg-[#0A45FF]' : 'border-gray-200'}
                >
                  <Map className="h-4 w-4 mr-1" />
                  Map
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content - Tiered Gyms */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 space-y-16">
            {error ? (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-600 mb-4">Failed to load gyms: {error}</p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse border-gray-100">
                    <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : businesses.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🏋️‍♀️</div>
                <h3 className="text-2xl font-bold text-black mb-2">No gyms found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or explore different locations
                </p>
              </div>
            ) : (
              <>
                {/* Budget Tier */}
                {budgetGyms.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-3xl font-bold text-black">Budget Tier</h2>
                      <Badge className="bg-green-600 text-white">{budgetGyms.length} Gyms</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {budgetGyms.map((business) => renderGymCard(business, 'bg-green-600'))}
                    </div>
                  </div>
                )}

                {/* Premium Tier */}
                {premiumGyms.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-3xl font-bold text-black">Premium Tier</h2>
                      <Badge className="bg-[#0A45FF] text-white">{premiumGyms.length} Gyms</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {premiumGyms.map((business) => renderGymCard(business, 'bg-[#0A45FF]'))}
                    </div>
                  </div>
                )}

                {/* Luxury Tier */}
                {luxuryGyms.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-3xl font-bold text-black">Luxury Tier</h2>
                      <Badge className="bg-yellow-500 text-white">{luxuryGyms.length} Gyms</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {luxuryGyms.map((business) => renderGymCard(business, 'bg-yellow-500'))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Gyms;
