
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, Grid3X3, Map, Star, Clock, DollarSign, Navigation, Verified, List, Dumbbell, Loader2 } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { usePaginatedBusinessData } from '@/hooks/usePaginatedBusinessData';
import OptimizedBusinessGrid from '@/components/OptimizedBusinessGrid';
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
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  // Add geolocation hook
  const { position, getCurrentPosition, loading: geoLoading } = useGeolocation();

  const { businesses, loading, loadingMore, error, hasMore, loadMore } = usePaginatedBusinessData(
    'gym',
    searchTerm,
    location,
    sortBy
  );

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore, loadMore]);

  // Helper to get tier badge
  const getTierBadge = (price: number) => {
    if (price >= 4000) return { label: 'Luxury', color: 'bg-amber-500' };
    if (price >= 2000) return { label: 'Premium', color: 'bg-primary' };
    return { label: 'Budget', color: 'bg-secondary' };
  };

  const handleSearch = () => {
    // Track search analytics
    trackSearch(searchTerm, location, businesses.length);
    trackUserAction('gym_search', { searchTerm, location, resultCount: businesses.length });
    console.log('Searching gyms:', { searchTerm, location });
  };

  const handleGetCurrentLocation = () => {
    getCurrentPosition();
    if (position) {
      setLocation(`${position.latitude}, ${position.longitude}`);
      toast.success('Current location detected!');
    }
  };

  const handleViewDetails = (businessId: string) => {
    navigate(`/gyms/${businessId}`);
  };

  return (
    <>
      <SEOHead
        title="Premium Gyms Near You - GymSpaYoga | Find & Book Top Fitness Centers"
        description="Discover and book the best gyms in India with state-of-the-art equipment, expert trainers, and flexible membership options. Find premium fitness centers near you with verified ratings and real photos."
        keywords="gyms near me, fitness center, premium gym, gym membership, workout facilities, fitness training, best gyms India"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
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
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
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
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search gyms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 text-gray-900"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 pr-10 h-11 text-gray-900"
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
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent h-11 px-6"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Filters and View Toggle */}
        <section className="py-6 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="px-3 py-1">
                  {businesses.length} Gyms Found
                </Badge>
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
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
                >
                  <Grid3X3 className="h-4 w-4 mr-1" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4 mr-1" />
                  List
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  <Map className="h-4 w-4 mr-1" />
                  Map
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content - Tiered Gyms */}
        <section className="py-12">
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
                  <Card key={i} className="animate-pulse">
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
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No gyms found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or explore different locations
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {businesses.map((business) => {
                  const price = business.monthly_price || business.session_price || 0;
                  const tier = getTierBadge(price);
                  return (
                    <Card key={business.id} className="group hover:shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30">
                      <div className="relative h-40 overflow-hidden rounded-t-xl">
                        <OptimizedImage
                          src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
                          alt={`${business.business_name} interior`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={400}
                          height={160}
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/95 text-gray-800 shadow-md px-2 py-1">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400 inline" />
                            {(4.0 + Math.random()).toFixed(1)}
                          </Badge>
                        </div>
                        <div className="absolute top-3 left-3 flex gap-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <Dumbbell className="w-5 h-5 text-white" />
                          </div>
                          <Badge className={`${tier.color} text-white shadow-md px-2 py-1 h-fit`}>
                            {tier.label}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5 space-y-3">
                        <h3 className="text-lg font-bold line-clamp-1">{business.business_name}</h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>{business.city}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>{business.opening_time} - {business.closing_time}</span>
                        </div>
                        <div className="flex items-center text-primary text-sm font-semibold">
                          <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>
                            {business.monthly_price ? `₹${business.monthly_price}/month` : 
                             business.session_price ? `₹${business.session_price}/session` : 'Pricing available'}
                          </span>
                        </div>
                        {business.amenities && business.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {business.amenities.slice(0, 3).map((amenity) => (
                              <Badge key={amenity} variant="outline" className="text-xs px-2 py-0.5">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <Button 
                          onClick={() => handleViewDetails(business.id)}
                          variant="hero"
                          className="w-full mt-4"
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Load More Indicator */}
            <div ref={loadMoreRef} className="flex justify-center py-8">
              {loadingMore && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more gyms...</span>
                </div>
              )}
              {!hasMore && businesses.length > 0 && (
                <p className="text-muted-foreground text-sm">You've seen all gyms</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Gyms;
