
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Users, Award, Target, Zap, Search, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import TrainerListings from '@/components/TrainerListings';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import OptimizedImage from '@/components/performance/ImageOptimizer';
import { useGeolocation } from '@/hooks/useGeolocation';

const Trainers = () => {
  const [sortBy, setSortBy] = useState('created_at');
  const [priceFilter, setPriceFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const { position, getCurrentPosition, loading: geoLoading } = useGeolocation();

  const handleSearch = () => {
    console.log('Searching trainers:', { searchTerm, location });
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
        title="Expert Personal Trainers - Find the Best Fitness Coaches"
        description="Connect with certified personal trainers and fitness coaches. Achieve your fitness goals with expert guidance and personalized training programs."
        keywords="personal trainer, fitness coach, strength training, weight loss, fitness guidance"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden h-[250px] md:h-[350px]">
          <div className="absolute inset-0">
            <OptimizedImage 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Professional personal trainer guiding client"
              className="w-full h-full object-cover"
              priority={true}
              width={1920}
              height={350}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white">
                Find Expert Personal Trainers
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                Connect with certified coaches for personalized fitness guidance
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters Section */}
        <section className="container mx-auto px-4 py-6">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search trainers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 pr-10 h-11"
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

        {/* Trainers Listings - First Priority */}
        <TrainerListings 
          searchTerm={searchTerm}
          location={location}
          sortBy={sortBy}
          priceFilter={priceFilter}
        />

        {/* Features Section - Below Listings */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Expert Trainers?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience personalized fitness coaching with certified professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Certified Professionals</h3>
              <p className="text-gray-600">
                All trainers are certified with proven track records in fitness coaching
              </p>
            </div>

            <div className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Personalized Programs</h3>
              <p className="text-gray-600">
                Custom fitness plans tailored to your specific goals and fitness level
              </p>
            </div>

            <div className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Proven Results</h3>
              <p className="text-gray-600">
                Track record of helping clients achieve their fitness transformation goals
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-500 to-indigo-600 py-16">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Fitness Journey?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Connect with expert trainers who will guide you every step of the way to achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Trainers Near Me
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register-trainer">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Become a Trainer
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Trainers;
