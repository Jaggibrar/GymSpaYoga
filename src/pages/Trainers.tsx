import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Users, Award, Target, Zap, Search, Navigation, MessageCircle } from 'lucide-react';
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
        title="Best Personal Trainers in India - Certified Fitness Coaches Mumbai, Delhi, Bangalore | GymSpaYoga"
        description="Connect with certified personal trainers in Mumbai, Delhi, Bangalore & across India. Achieve your fitness goals with expert guidance and personalized programs. Book now!"
        keywords="personal trainer near me, best fitness coach Mumbai, certified trainer Delhi, personal training Bangalore, weight loss trainer India"
      />
      
      <div className="min-h-screen bg-white">
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
            <div className="absolute inset-0 bg-black/50"></div>
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
          <Card className="border-2 border-gray-100 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search trainers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 border-gray-200"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 pr-10 h-11 border-gray-200"
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
                  className="bg-[#005EB8] hover:bg-[#004d96] text-white h-11 px-6"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Trainers Listings */}
        <TrainerListings 
          searchTerm={searchTerm}
          location={location}
          sortBy={sortBy}
          priceFilter={priceFilter}
        />

        {/* Features Section */}
        <section className="container mx-auto px-4 py-12 bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Why Choose Our Expert Trainers?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience personalized fitness coaching with certified professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#005EB8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#005EB8]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">Certified Professionals</h3>
              <p className="text-gray-600">
                All trainers are certified with proven track records in fitness coaching
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#005EB8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-[#005EB8]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">Personalized Programs</h3>
              <p className="text-gray-600">
                Custom fitness plans tailored to your specific goals and fitness level
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#005EB8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-[#005EB8]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">Proven Results</h3>
              <p className="text-gray-600">
                Track record of helping clients achieve their fitness transformation goals
              </p>
            </div>
          </div>
        </section>

        {/* GymSpaYoga Branding Banner with Real People */}
        <section className="bg-[#005EB8] py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left: Real People Images */}
              <div className="flex items-center">
                <div className="flex -space-x-4">
                  {[
                    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=face',
                  ].map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Community member ${index + 1}`}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border-3 border-white object-cover shadow-md"
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="ml-4 md:ml-6">
                  <p className="text-2xl md:text-3xl font-bold text-white">10,000+</p>
                  <p className="text-white/80 text-sm md:text-base">Active Members</p>
                </div>
              </div>

              {/* Center: Message */}
              <div className="text-center lg:text-left flex-1 max-w-md">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  GymSpaYoga.com
                </h3>
                <p className="text-white/90 text-sm md:text-base">
                  Your Complete Wellness Destination. Transform your fitness journey!
                </p>
              </div>

              {/* Right: CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/explore">
                  <Button size="lg" className="bg-white text-[#005EB8] font-bold hover:bg-gray-100">
                    Explore More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20know%20more%20about%20GymSpaYoga" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-[#005EB8] font-bold hover:bg-gray-100">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Trainers;
