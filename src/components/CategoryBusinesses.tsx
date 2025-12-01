import React, { useState } from 'react';
import { useOptimizedBusinessData } from '@/hooks/useOptimizedBusinessData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Star, Clock, Phone, Mail, Search, MessageCircle, Eye, Verified } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingModal from '@/components/BookingModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getTierFromPricing, getTierColor } from '@/utils/businessUtils';
import ViewModeToggle, { ViewMode } from '@/components/ui/ViewModeToggle';

interface CategoryBusinessesProps {
  category: string;
  title: string;
  description: string;
  showFilters?: boolean;
}

const CategoryBusinesses: React.FC<CategoryBusinessesProps> = ({
  category,
  title,
  description,
  showFilters = true,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  const { businesses, loading, error } = useOptimizedBusinessData(
    category,
    searchTerm,
    locationFilter,
    sortBy
  );

  const handleViewDetails = (businessId: string, businessType: string) => {
    const type = businessType.toLowerCase();
    switch (type) {
      case 'spa':
        navigate(`/spas/${businessId}`);
        break;
      case 'yoga':
        navigate(`/yoga/${businessId}`);
        break;
      case 'gym':
      default:
        navigate(`/gyms/${businessId}`);
        break;
    }
  };

  const handleCall = (phone: string) => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleBookNow = (phone: string, businessName: string) => {
    if (phone) {
      const message = `Hi, I'm interested in booking your services at ${businessName}. Could you please provide more details?`;
      const whatsappUrl = `https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading {title.toLowerCase()}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600">Error loading {title.toLowerCase()}: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
        </div>

        {/* Search and Filter Controls (optional per category) */}
        {showFilters && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={`Search ${title.toLowerCase()}...`}
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
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created_at">Newest First</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Business Cards */}
        {businesses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No {title.toLowerCase()} found</h3>
            <p className="text-gray-500">Try adjusting your search filters or check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {businesses.map((business) => {
              const tier = getTierFromPricing(business);
              const imageUrl = business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48";
              
              return (
                <Card key={business.id} className="w-full max-w-sm group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md rounded-xl overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt={business.business_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${getTierColor(tier)} text-white border-0 capitalize px-3 py-1 shadow-lg`}>
                      {tier}
                    </Badge>
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge className="bg-black/70 text-white border-0 capitalize font-semibold px-3 py-1 shadow-lg text-sm">
                        {business.business_type?.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge className="bg-blue-500 text-white font-bold text-xs flex items-center gap-1 shadow-md">
                        <Verified className="h-3 w-3" />
                        Verified
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight flex-1 mr-2">
                          {business.business_name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-yellow-600 flex-shrink-0">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-medium">4.7</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm font-medium">{business.city}, {business.state}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                      {business.description || "Premium wellness destination offering excellent services"}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {business.amenities?.slice(0, 2).map((amenity, index) => (
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
                        {business.monthly_price && (
                          <p className="text-lg font-bold text-blue-600">₹{business.monthly_price}/month</p>
                        )}
                        {business.session_price && (
                          <p className="text-lg font-bold text-blue-600">₹{business.session_price}/session</p>
                        )}
                        {!business.monthly_price && !business.session_price && (
                          <p className="text-lg font-bold text-blue-600">Contact for pricing</p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 font-semibold"
                        onClick={() => handleViewDetails(business.id, business.business_type)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button 
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => handleBookNow(business.phone, business.business_name)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Book Now
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-4 border-t text-sm text-gray-500">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto text-gray-500 hover:text-blue-600 flex-1"
                        onClick={() => handleCall(business.phone)}
                      >
                        <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{business.phone}</span>
                      </Button>
                      <div className="flex items-center gap-1 flex-1">
                        <Mail className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate text-xs">{business.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Description Section - Moved Below Listings */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategoryBusinesses;
