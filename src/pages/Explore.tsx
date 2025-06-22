
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, Star, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { useGyms } from '@/hooks/useGyms';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const { gyms, loading, error } = useGyms();

  const categories = [
    { id: 'all', name: 'All', count: 150 },
    { id: 'gym', name: 'Gyms', count: 85 },
    { id: 'spa', name: 'Spas', count: 35 },
    { id: 'yoga', name: 'Yoga Studios', count: 30 }
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchTerm, 'in', location);
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
              <Button variant="outline" className="rounded-full">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
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
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {gyms.length} places found
                  </h2>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Sort by: Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                    <option>Distance</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {gyms.map((gym) => (
                    <Card key={gym.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="relative">
                        <img 
                          src={gym.image_urls[0] || "/placeholder.svg"} 
                          alt={gym.business_name}
                          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/90 text-gray-800">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                            4.8
                          </Badge>
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-emerald-500 text-white capitalize">
                            {gym.business_type}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardHeader>
                        <CardTitle className="group-hover:text-emerald-600 transition-colors">
                          {gym.business_name}
                        </CardTitle>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{gym.city}, {gym.state}</span>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {gym.description || "Premium fitness facility with modern equipment and expert trainers."}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {gym.opening_time} - {gym.closing_time}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {gym.session_price ? `₹${gym.session_price}/session` : 
                             gym.monthly_price ? `₹${gym.monthly_price}/month` : 'Contact for pricing'}
                          </div>
                        </div>

                        {gym.amenities && gym.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {gym.amenities.slice(0, 3).map((amenity) => (
                              <Badge key={amenity} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                            {gym.amenities.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{gym.amenities.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        <div className="flex gap-2 pt-2">
                          <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                            Book Now
                          </Button>
                          <Button variant="outline" className="flex-1">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {gyms.length === 0 && (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">🏃‍♀️</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No results found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search criteria or explore different categories
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Link to="/gyms">
                        <Button variant="outline">Browse Gyms</Button>
                      </Link>
                      <Link to="/spas">
                        <Button variant="outline">Browse Spas</Button>
                      </Link>
                      <Link to="/yoga">
                        <Button variant="outline">Browse Yoga</Button>
                      </Link>
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
