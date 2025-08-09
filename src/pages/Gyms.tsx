
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, Grid3X3, Map, Star, Clock, DollarSign, Navigation, Verified, List } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { useOptimizedBusinessData } from '@/hooks/useOptimizedBusinessData';
import OptimizedBusinessGrid from '@/components/OptimizedBusinessGrid';
import GoogleMapView from '@/components/GoogleMapView';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Gyms = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  
  // Add geolocation hook
  const { position, getCurrentPosition, loading: geoLoading } = useGeolocation();

  const { businesses, loading, error } = useOptimizedBusinessData(
    'gym',
    searchTerm,
    location,
    sortBy
  );

  const handleSearch = () => {
    // Search is handled automatically by the hook
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
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 text-white py-20 lg:py-32">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Modern gym equipment"
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/85 via-red-500/85 to-orange-600/85"></div>
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-200/15 rounded-full blur-3xl"></div>
          </div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                  Premium <span className="text-orange-200">Gyms</span>
                </h1>
                <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                  Discover state-of-the-art fitness centers equipped with cutting-edge equipment, expert personal trainers, and comprehensive wellness programs designed to transform your fitness journey.
                </p>
              </div>
              
              {/* Search Bar */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        placeholder="Search gyms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 py-3 text-gray-900"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10 pr-12 py-3 text-gray-900"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={handleGetCurrentLocation}
                        disabled={geoLoading}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                      >
                        <Navigation className={`h-4 w-4 ${geoLoading ? 'animate-spin' : ''}`} />
                      </Button>
                    </div>
                    <Button 
                      onClick={handleSearch}
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 py-3"
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Search Gyms
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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

        {/* Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
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
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className={viewMode === 'map' ? 'lg:col-span-2' : 'lg:col-span-3'}>
                  {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                      {[...Array(6)].map((_, i) => (
                        <Card key={i} className="w-full max-w-sm animate-pulse">
                          <div className="h-56 bg-gray-200 rounded-t-xl"></div>
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
                    <div className={viewMode === 'list' ? 'grid grid-cols-1 gap-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center'}>
                      {businesses.map((business) => (
                        <Card 
                          key={business.id} 
                          className={`w-full max-w-sm group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md rounded-xl overflow-hidden cursor-pointer ${
                            selectedBusiness?.id === business.id ? 'ring-2 ring-orange-500' : ''
                          }`}
                          onClick={() => setSelectedBusiness(business)}
                        >
                          <div className="relative h-56 overflow-hidden">
                            <img
                              src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
                              alt={business.business_name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                              <Badge className="bg-red-500 text-white border-0 capitalize font-semibold px-3 py-1 shadow-lg text-sm">
                                GYM
                              </Badge>
                              <Badge className="bg-blue-500 text-white font-bold text-xs flex items-center gap-1 shadow-md">
                                <Verified className="h-3 w-3" />
                                Verified
                              </Badge>
                            </div>
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-white/95 text-gray-800 shadow-lg px-3 py-1">
                                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                4.8
                              </Badge>
                            </div>
                          </div>
                          
                          <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                              <h3 className="text-xl font-bold group-hover:text-orange-600 transition-colors leading-tight line-clamp-2">
                                {business.business_name}
                              </h3>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="text-sm font-medium">{business.city}, {business.state}</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                              {business.description || "Premium fitness facility with modern equipment and expert trainers."}
                            </p>
                            
                            <div className="grid grid-cols-1 gap-2 text-sm">
                              <div className="flex items-center text-gray-500">
                                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span>{business.opening_time} - {business.closing_time}</span>
                              </div>
                              <div className="flex items-center text-gray-500">
                                <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="font-medium">
                                  {business.session_price ? `₹${business.session_price}/session` : 
                                   business.monthly_price ? `₹${business.monthly_price}/month` : 'Contact for pricing'}
                                </span>
                              </div>
                            </div>

                            {business.amenities && business.amenities.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {business.amenities.slice(0, 3).map((amenity) => (
                                  <Badge key={amenity} variant="outline" className="text-xs px-2 py-1">
                                    {amenity}
                                  </Badge>
                                ))}
                                {business.amenities.length > 3 && (
                                  <Badge variant="outline" className="text-xs px-2 py-1">
                                    +{business.amenities.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            )}
                            
                            <div className="pt-4">
                              <Button 
                                onClick={() => handleViewDetails(business.id)}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                              >
                                View Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
                
                {viewMode === 'map' && (
                  <div className="lg:col-span-1">
                    <div className="sticky top-4">
                      <GoogleMapView
                        businesses={businesses}
                        selectedBusiness={selectedBusiness}
                        onBusinessSelect={setSelectedBusiness}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Gyms;
