
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Sparkles, Crown, Heart, Calendar, Star, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBusinessData } from '@/hooks/useBusinessData';
import BookingModal from '@/components/BookingModal';
import { getTierFromPricing } from '@/utils/businessUtils';

const Index = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const { businesses, loading, error } = useBusinessData(undefined, '', searchLocation);

  // Filter businesses by tier and mood
  const filteredBusinesses = businesses.filter(business => {
    const tier = getTierFromPricing(business);
    const tierMatch = selectedTier === 'all' || tier === selectedTier;
    
    let moodMatch = true;
    if (selectedMood !== 'all') {
      switch (selectedMood) {
        case 'workout':
          moodMatch = business.business_type === 'gym';
          break;
        case 'relax':
          moodMatch = business.business_type === 'spa';
          break;
        case 'rejuvenate':
          moodMatch = business.business_type === 'yoga';
          break;
      }
    }
    
    return tierMatch && moodMatch;
  });

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'luxury': return <Crown className="h-4 w-4" />;
      case 'premium': return <Sparkles className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'luxury': return 'from-yellow-500 to-orange-500';
      case 'premium': return 'from-purple-500 to-pink-500';
      default: return 'from-green-500 to-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                GymSpaYoga
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              One Platform. All Wellness Needs.
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover and book nearby gyms, spas, yoga studios, and personal trainers. 
              Work out, relax, and rejuvenate - all from one place.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Enter your location (e.g., Mumbai, Delhi, Bangalore)"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-emerald-500 shadow-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Access Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <Link to="/gyms">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                <CardContent className="text-center p-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💪</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Workout</h3>
                  <p className="text-gray-600">Find the perfect gym for your fitness journey</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/spas">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="text-center p-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧘‍♀️</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Relax</h3>
                  <p className="text-gray-600">Unwind with premium spa treatments</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/yoga">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
                <CardContent className="text-center p-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🕉️</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Rejuvenate</h3>
                  <p className="text-gray-600">Find inner peace with yoga sessions</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter by:</span>
            </div>
            
            {/* Tier Filter */}
            <div className="flex gap-2">
              <Button
                variant={selectedTier === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedTier('all')}
                className="rounded-full"
              >
                All Tiers
              </Button>
              <Button
                variant={selectedTier === 'budget' ? 'default' : 'outline'}
                onClick={() => setSelectedTier('budget')}
                className="rounded-full"
              >
                <Heart className="h-4 w-4 mr-1" />
                Budget
              </Button>
              <Button
                variant={selectedTier === 'premium' ? 'default' : 'outline'}
                onClick={() => setSelectedTier('premium')}
                className="rounded-full"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Premium
              </Button>
              <Button
                variant={selectedTier === 'luxury' ? 'default' : 'outline'}
                onClick={() => setSelectedTier('luxury')}
                className="rounded-full"
              >
                <Crown className="h-4 w-4 mr-1" />
                Luxury
              </Button>
            </div>

            {/* Mood Filter */}
            <div className="flex gap-2">
              <Button
                variant={selectedMood === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedMood('all')}
                className="rounded-full"
              >
                All Moods
              </Button>
              <Button
                variant={selectedMood === 'workout' ? 'default' : 'outline'}
                onClick={() => setSelectedMood('workout')}
                className="rounded-full"
              >
                💪 Workout
              </Button>
              <Button
                variant={selectedMood === 'relax' ? 'default' : 'outline'}
                onClick={() => setSelectedMood('relax')}
                className="rounded-full"
              >
                🧘‍♀️ Relax
              </Button>
              <Button
                variant={selectedMood === 'rejuvenate' ? 'default' : 'outline'}
                onClick={() => setSelectedMood('rejuvenate')}
                className="rounded-full"
              >
                🕉️ Rejuvenate
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured Wellness Centers
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <span className="text-4xl">⚠️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Businesses</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : filteredBusinesses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-6">
                <span className="text-6xl">🏢</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {businesses.length === 0 ? "No Businesses Listed Yet" : "No Matching Results"}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {businesses.length === 0 
                  ? "Be the first business to join our platform! Register your gym, spa, or yoga studio today."
                  : "Try adjusting your filters to see more results."
                }
              </p>
              
              {businesses.length === 0 && (
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link to="/register-business">
                    <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 px-8 py-3">
                      <Plus className="h-5 w-5 mr-2" />
                      Register Your Business
                    </Button>
                  </Link>
                  <Link to="/register-trainer">
                    <Button variant="outline" className="px-8 py-3">
                      <Plus className="h-5 w-5 mr-2" />
                      Register as Trainer
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBusinesses.slice(0, 6).map((business) => {
                const tier = getTierFromPricing(business);
                return (
                  <Card key={business.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"} 
                        alt={business.business_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className={`absolute top-3 right-3 bg-gradient-to-r ${getTierColor(tier)} text-white border-0`}>
                        {getTierIcon(tier)}
                        <span className="ml-1 capitalize">{tier}</span>
                      </Badge>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold group-hover:text-emerald-600 transition-colors line-clamp-1">
                          {business.business_name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-yellow-600">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-medium">4.7</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{business.city}, {business.state}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {business.description || "Premium wellness destination offering excellent services"}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          {business.monthly_price && (
                            <p className="text-lg font-bold text-emerald-600">₹{business.monthly_price}/month</p>
                          )}
                          {business.session_price && (
                            <p className="text-lg font-bold text-emerald-600">₹{business.session_price}/session</p>
                          )}
                          {!business.monthly_price && !business.session_price && (
                            <p className="text-lg font-bold text-emerald-600">Contact for pricing</p>
                          )}
                        </div>
                        
                        <BookingModal
                          businessName={business.business_name}
                          businessType={business.business_type}
                          businessId={business.id}
                          price={business.monthly_price ? `₹${business.monthly_price}` : business.session_price ? `₹${business.session_price}` : undefined}
                          trigger={
                            <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              Book Now
                            </Button>
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Business Registration CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Own a Wellness Business?</h2>
          <p className="text-xl mb-8">Join GymSpaYoga and grow your business with our no-commission model</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link to="/register-business">
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                Register Your Business
              </Button>
            </Link>
            <Link to="/register-trainer">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3 text-lg font-semibold">
                Register as Trainer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
