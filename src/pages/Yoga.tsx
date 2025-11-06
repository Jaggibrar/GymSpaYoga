
import React, { useState } from 'react';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import CategoryTrainers from '@/components/CategoryTrainers';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Navigation } from 'lucide-react';
import OptimizedImage from '@/components/performance/ImageOptimizer';
import { useGeolocation } from '@/hooks/useGeolocation';

const Yoga = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const { position, getCurrentPosition, loading: geoLoading } = useGeolocation();

  const handleSearch = () => {
    console.log('Searching yoga studios:', { searchTerm, location });
  };

  const handleGetCurrentLocation = () => {
    getCurrentPosition();
    if (position) {
      setLocation(`${position.latitude}, ${position.longitude}`);
    }
  };

  return (
    <>
      <SEOHead
        title="Yoga Studios & Classes Near You - GymSpaYoga | Find Inner Peace"
        description="Discover authentic yoga studios and certified instructors across India. From Hatha to Vinyasa, book your perfect yoga practice for mind, body, and soul with verified reviews and real photos."
        keywords="yoga classes near me, yoga studio, meditation, hatha yoga, vinyasa, yoga instructor, mindfulness, spiritual wellness, best yoga classes India"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden h-[250px] md:h-[350px]">
          <div className="absolute inset-0">
            <OptimizedImage 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Peaceful yoga studio with natural lighting"
              className="w-full h-full object-cover"
              priority={true}
              width={1920}
              height={350}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-4xl mx-auto text-center mb-6">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white">
                Explore Yoga Studios
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                Find your inner peace with authentic yoga and meditation
              </p>
            </div>
            
            {/* Search Bar */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl max-w-4xl mx-auto">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search yoga studios..."
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
          </div>
        </section>

        {/* Business Listings - First Priority */}
        <CategoryBusinesses
          category="yoga"
          title="Authentic Yoga Studios & Classes"
          description="Embark on a transformative yoga journey with our network of authentic yoga studios and certified instructors."
        />

        {/* Expert Instructors */}
        <CategoryTrainers category="yoga" />
      </div>
    </>
  );
};

export default Yoga;
