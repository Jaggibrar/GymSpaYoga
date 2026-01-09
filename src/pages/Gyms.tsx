import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Grid3X3, Map, Star, Clock, DollarSign, Navigation, List, Dumbbell, MessageCircle, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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

  const handleBookNow = (phone: string, businessName: string) => {
    if (phone) {
      const message = `Hi, I'm interested in joining ${businessName}. Could you please provide more details about membership options?`;
      const whatsappUrl = `https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const renderGymCard = (business: any, tierColor: string) => (
    <Card key={business.id} className="w-full max-w-sm group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md rounded-xl overflow-hidden">
      <div className="relative h-56 overflow-hidden">
        <OptimizedImage
          src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
          alt={`${business.business_name} - Premium Gym in ${business.city}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          width={400}
          height={224}
        />
        <Badge className={`absolute top-4 right-4 ${tierColor} text-white border-0 capitalize px-3 py-1 shadow-lg`}>
          <Star className="h-3 w-3 mr-1 fill-white inline" />
          {(4.0 + Math.random()).toFixed(1)}
        </Badge>
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className={`w-10 h-10 rounded-lg ${tierColor} flex items-center justify-center shadow-lg`}>
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold group-hover:text-[#005EB8] transition-colors line-clamp-2 leading-tight flex-1 mr-2">
              {business.business_name}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm font-medium">{business.city}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {business.amenities?.slice(0, 2).map((amenity: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-1">
              {amenity}
            </Badge>
          ))}
          {business.amenities && business.amenities.length > 2 && (
            <Badge variant="outline" className="text-xs px-2 py-1">
              +{business.amenities.length - 2} more
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{business.opening_time} - {business.closing_time}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 flex-shrink-0 text-[#005EB8]" />
            <p className="text-lg font-bold text-[#005EB8]">
              {business.monthly_price ? `₹${business.monthly_price}/month` : 
               business.session_price ? `₹${business.session_price}/session` : 'Contact for pricing'}
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline"
            onClick={() => handleViewDetails(business)}
            className="flex-1 min-h-[48px] font-semibold"
            aria-label={`View details for ${business.business_name}`}
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
          <Button 
            onClick={() => handleBookNow(business.phone, business.business_name)}
            className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] min-h-[48px] font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label={`Book now at ${business.business_name}`}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Book Now
          </Button>
        </div>
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
                  className="bg-[#005EB8] hover:bg-[#004d96] text-white h-11 px-6"
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
                <Badge className="bg-[#005EB8] text-white px-3 py-1">
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
                  className={viewMode === 'grid' ? 'bg-[#005EB8]' : 'border-gray-200'}
                >
                  <Grid3X3 className="h-4 w-4 mr-1" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-[#005EB8]' : 'border-gray-200'}
                >
                  <List className="h-4 w-4 mr-1" />
                  List
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className={viewMode === 'map' ? 'bg-[#005EB8]' : 'border-gray-200'}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                      {budgetGyms.map((business) => renderGymCard(business, 'bg-green-600'))}
                    </div>
                  </div>
                )}

                {/* Premium Tier */}
                {premiumGyms.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-3xl font-bold text-black">Premium Tier</h2>
                      <Badge className="bg-[#005EB8] text-white">{premiumGyms.length} Gyms</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                      {premiumGyms.map((business) => renderGymCard(business, 'bg-[#005EB8]'))}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                      {luxuryGyms.map((business) => renderGymCard(business, 'bg-yellow-500'))}
                    </div>
                  </div>
                )}
              </>
            )}
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
                  Your Complete Wellness Destination. Start your fitness journey today!
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

export default Gyms;
