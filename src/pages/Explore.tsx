
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, DollarSign, Dumbbell, Sparkles, Heart, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { useOptimizedBusinessData } from '@/hooks/useOptimizedBusinessData';
import ImageGallery from '@/components/ImageGallery';
import ViewModeToggle, { ViewMode } from '@/components/ui/ViewModeToggle';
import CommunityBanner from '@/components/CommunityBanner';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const { businesses, loading, error } = useOptimizedBusinessData(
    activeFilter === 'all' ? undefined : activeFilter,
    searchTerm,
    location,
    sortBy
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      gym: 'bg-[#005EB8]/10 text-[#005EB8]',
      spa: 'bg-[#9C27B0]/10 text-[#9C27B0]',
      yoga: 'bg-[#2E7D32]/10 text-[#2E7D32]',
      trainer: 'bg-[#E85D04]/10 text-[#E85D04]'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <>
      <SEOHead
        title="Explore Wellness - GymSpaYoga | Find Gyms, Spas & Yoga Studios"
        description="Discover the best gyms, spas, and yoga studios near you. Book sessions, compare prices, and read reviews on GymSpaYoga platform."
        keywords="explore gyms, find spas, yoga studios, wellness near me, fitness booking"
      />
      
      <div className="min-h-screen bg-white">
        {/* Category Cards */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-black">Browse by Category</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
              {/* Gyms */}
              <Link to="/gyms">
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 cursor-pointer h-full">
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-[#005EB8] flex items-center justify-center mb-3 mx-auto">
                      <Dumbbell className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-black">Gyms</h3>
                    <p className="text-gray-600 text-sm mb-2">Fitness centers</p>
                    <span className="text-sm font-medium text-[#005EB8]">Explore →</span>
                  </CardContent>
                </Card>
              </Link>

              {/* Spas */}
              <Link to="/spas">
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 cursor-pointer h-full">
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-[#9C27B0] flex items-center justify-center mb-3 mx-auto">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-black">Spas</h3>
                    <p className="text-gray-600 text-sm mb-2">Relaxation spots</p>
                    <span className="text-sm font-medium text-[#9C27B0]">Explore →</span>
                  </CardContent>
                </Card>
              </Link>

              {/* Yoga Studios */}
              <Link to="/yoga">
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 cursor-pointer h-full">
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-[#2E7D32] flex items-center justify-center mb-3 mx-auto">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-black">Yoga</h3>
                    <p className="text-gray-600 text-sm mb-2">Studios & classes</p>
                    <span className="text-sm font-medium text-[#2E7D32]">Explore →</span>
                  </CardContent>
                </Card>
              </Link>

              {/* Personal Trainers */}
              <Link to="/trainers">
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 cursor-pointer h-full">
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-[#E85D04] flex items-center justify-center mb-3 mx-auto">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-black">Trainers</h3>
                    <p className="text-gray-600 text-sm mb-2">Personal coaching</p>
                    <span className="text-sm font-medium text-[#E85D04]">Explore →</span>
                  </CardContent>
                </Card>
              </Link>

              {/* Therapists */}
              <Link to="/therapists">
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 cursor-pointer h-full">
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-[#005EB8] flex items-center justify-center mb-3 mx-auto">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-black">Therapists</h3>
                    <p className="text-gray-600 text-sm mb-2">Mental wellness</p>
                    <span className="text-sm font-medium text-[#005EB8]">Explore →</span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-8 sm:py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12 sm:py-20">
                <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-b-2 border-[#005EB8] mx-auto"></div>
                <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading amazing places for you...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 sm:py-20">
                <p className="text-red-600 text-sm sm:text-base">Error loading results: {error}</p>
                <Button onClick={() => window.location.reload()} className="mt-4 min-h-[44px] bg-[#005EB8] hover:bg-[#004a93]">
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-black">
                    {businesses.length} places found
                  </h2>
                  <ViewModeToggle mode={viewMode} onChange={setViewMode} />
                </div>

                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center' : 'grid grid-cols-1 gap-4 sm:gap-6'}>
                  {businesses.map((business) => (
                    <Card key={business.id} className="w-full max-w-sm group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 shadow-md rounded-xl overflow-hidden bg-white">
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        <ImageGallery
                          images={business.image_urls}
                          title={business.business_name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                          <Badge className="bg-white/95 text-gray-800 shadow-lg px-2 sm:px-3 py-1 text-xs sm:text-sm">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                            4.8
                          </Badge>
                        </div>
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                          <Badge className={`${getCategoryColor(business.business_type)} border-0 capitalize font-semibold px-2 sm:px-3 py-1 shadow-lg text-xs sm:text-sm`}>
                            {business.business_type.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
                        <CardTitle className="group-hover:text-[#005EB8] transition-colors text-lg sm:text-xl font-bold leading-tight line-clamp-2 text-black">
                          {business.business_name}
                        </CardTitle>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="text-sm font-medium">{business.city}, {business.state}</span>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
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
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {business.amenities.slice(0, 3).map((amenity) => (
                              <Badge key={amenity} variant="outline" className="text-xs px-2 py-1 border-gray-300">
                                {amenity}
                              </Badge>
                            ))}
                            {business.amenities.length > 3 && (
                              <Badge variant="outline" className="text-xs px-2 py-1 border-gray-300">
                                +{business.amenities.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        <div className="pt-3 sm:pt-4">
                          <Link to={`/business/${business.id}`} className="block">
                            <Button className="w-full bg-[#005EB8] hover:bg-[#004a93] py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 min-h-[44px] text-white">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {businesses.length === 0 && (
                  <div className="text-center py-12 sm:py-20">
                    <div className="text-4xl sm:text-6xl mb-4">🏃‍♀️</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">No results found</h3>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">
                      Try adjusting your search criteria or explore different categories
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button variant="outline" onClick={() => {setActiveFilter('all'); setSearchTerm(''); setLocation('');}} className="min-h-[44px] border-[#005EB8] text-[#005EB8]">
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Community Banner */}
        <CommunityBanner />
      </div>
    </>
  );
};

export default Explore;
