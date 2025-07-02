
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, Star, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { useOptimizedBusinessData } from '@/hooks/useOptimizedBusinessData';
import ImageGallery from '@/components/ImageGallery';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');

  const { businesses, loading, error } = useOptimizedBusinessData(
    activeFilter === 'all' ? undefined : activeFilter,
    searchTerm,
    location,
    sortBy
  );

  const categories = [
    { id: 'all', name: 'All', count: businesses.length },
    { id: 'gym', name: 'Gyms', count: businesses.filter(b => b.business_type === 'gym').length },
    { id: 'spa', name: 'Spas', count: businesses.filter(b => b.business_type === 'spa').length },
    { id: 'yoga', name: 'Yoga Studios', count: businesses.filter(b => b.business_type === 'yoga').length },
    { id: 'trainer', name: 'Trainers', count: businesses.filter(b => b.business_type === 'trainer').length }
  ];

  const handleSearch = () => {
    // Search is handled by the hook automatically when searchTerm or location changes
    console.log('Searching for:', searchTerm, 'in', location);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      gym: 'bg-orange-100 text-orange-700',
      spa: 'bg-pink-100 text-pink-700',
      yoga: 'bg-purple-100 text-purple-700',
      trainer: 'bg-blue-100 text-blue-700'
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
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Search Section */}
        <section className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Explore Wellness Near You</h1>
              <p className="text-xl mb-8">
                Discover amazing gyms, relaxing spas, and peaceful yoga studios in your area
              </p>
              
              {/* Search Bar */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="What are you looking for?"
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
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeFilter === category.id ? 'default' : 'outline'}
                    onClick={() => setActiveFilter(category.id)}
                    className="rounded-full"
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="created_at">Sort by: Latest</option>
                  <option value="name">Sort by: Name</option>
                  <option value="price">Sort by: Price</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading amazing places for you...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-600">Error loading results: {error}</p>
                <Button onClick={() => window.location.reload()} className="mt-4">
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {businesses.length} places found
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {businesses.map((business) => (
                    <Card key={business.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="relative">
                        <ImageGallery
                          images={business.image_urls}
                          title={business.business_name}
                          className="h-48 w-full"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/90 text-gray-800">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                            4.8
                          </Badge>
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge className={`${getCategoryColor(business.business_type)} border-0 capitalize`}>
                            {business.business_type}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardHeader>
                        <CardTitle className="group-hover:text-emerald-600 transition-colors">
                          {business.business_name}
                        </CardTitle>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{business.city}, {business.state}</span>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {business.description || "Premium fitness facility with modern equipment and expert trainers."}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {business.opening_time} - {business.closing_time}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {business.session_price ? `₹${business.session_price}/session` : 
                             business.monthly_price ? `₹${business.monthly_price}/month` : 'Contact for pricing'}
                          </div>
                        </div>

                        {business.amenities && business.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {business.amenities.slice(0, 3).map((amenity) => (
                              <Badge key={amenity} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                            {business.amenities.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{business.amenities.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        <div className="flex gap-2 pt-2">
                          <Link to={`/business/${business.id}`} className="flex-1">
                            <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {businesses.length === 0 && (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">🏃‍♀️</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No results found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search criteria or explore different categories
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button variant="outline" onClick={() => {setActiveFilter('all'); setSearchTerm(''); setLocation('');}}>
                        Clear Filters
                      </Button>
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

export default Explore;
