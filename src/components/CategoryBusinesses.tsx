
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Star, Calendar, Search, Filter, Crown, Sparkles, Heart, Eye } from 'lucide-react';
import { useBusinessData } from '@/hooks/useBusinessData';
import BookingModal from '@/components/BookingModal';
import BusinessDetailsModal from '@/components/business/BusinessDetailsModal';
import { getTierFromPricing } from '@/utils/businessUtils';

interface CategoryBusinessesProps {
  category: string;
  title: string;
  description: string;
}

const CategoryBusinesses = ({ category, title, description }: CategoryBusinessesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  
  const { businesses, loading, error } = useBusinessData(category, searchTerm, locationFilter, sortBy);

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
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={`Search ${category === 'trainer' ? 'trainers' : title.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Newest First</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price">Price Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Business Listings */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      ) : businesses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-6">
            <span className="text-6xl">🏢</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            No {category === 'trainer' ? 'Trainers' : title} Found
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Try adjusting your search filters or check back later for new listings.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => {
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
                  
                  <div className="flex items-center justify-between mb-4">
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
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mb-4">
                    <BusinessDetailsModal 
                      business={business}
                      trigger={
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      }
                    />
                    <BookingModal
                      businessName={business.business_name}
                      businessType={business.business_type}
                      businessId={business.id}
                      price={business.monthly_price ? `₹${business.monthly_price}` : business.session_price ? `₹${business.session_price}` : undefined}
                      trigger={
                        <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book
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
  );
};

export default CategoryBusinesses;
