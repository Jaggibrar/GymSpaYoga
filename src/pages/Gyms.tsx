
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, Grid3X3, Map } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { useOptimizedBusinessData } from '@/hooks/useOptimizedBusinessData';
import OptimizedBusinessGrid from '@/components/OptimizedBusinessGrid';
import GoogleMapView from '@/components/GoogleMapView';

const Gyms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedBusiness, setSelectedBusiness] = useState(null);

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

  return (
    <>
      <SEOHead
        title="Premium Gyms Near You - GymSpaYoga | Find & Book Top Fitness Centers"
        description="Discover and book the best gyms in your city. Premium fitness centers with state-of-the-art equipment, expert trainers, and flexible membership options."
        keywords="gyms near me, fitness center, premium gym, gym membership, workout facilities, fitness training"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 text-white py-20 lg:py-32">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-200/20 rounded-full blur-3xl"></div>
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
                        className="pl-10 py-3 text-gray-900"
                      />
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
                  <OptimizedBusinessGrid
                    businesses={businesses}
                    loading={loading}
                    onBusinessSelect={setSelectedBusiness}
                    selectedBusiness={selectedBusiness}
                  />
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
