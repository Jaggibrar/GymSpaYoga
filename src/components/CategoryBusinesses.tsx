import React, { useState } from 'react';
import { useOptimizedBusinessData } from '@/hooks/useOptimizedBusinessData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getTierFromPricing } from '@/utils/businessUtils';
import { ViewMode } from '@/components/ui/ViewModeToggle';
import PremiumListingCard from '@/components/PremiumListingCard';

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

  const handleViewDetails = (business: any) => {
    const type = business.business_type?.toLowerCase();
    const identifier = business.slug || business.id;
    switch (type) {
      case 'spa':
        navigate(`/spas/${identifier}`);
        break;
      case 'yoga':
        navigate(`/yoga/${identifier}`);
        break;
       case 'chiropractor':
         navigate(`/chiropractors/${identifier}`);
         break;
       case 'gym':
       default:
         navigate(`/gyms/${identifier}`);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {businesses.map((business, idx) => {
              const tier = getTierFromPricing(business);
              const imageUrl = business.image_urls?.[0];
              const type = business.business_type?.toLowerCase();
              const identifier = (business as any).slug || business.id;
              const href =
                type === 'spa'
                  ? `/spas/${identifier}`
                  : type === 'yoga'
                  ? `/yoga/${identifier}`
                  : type === 'chiropractor'
                  ? `/chiropractors/${identifier}`
                  : `/gyms/${identifier}`;
              const price = business.monthly_price
                ? `₹${business.monthly_price}`
                : business.session_price
                ? `₹${business.session_price}`
                : undefined;
              const unit = business.monthly_price
                ? '/month'
                : business.session_price
                ? '/session'
                : undefined;

              return (
                <PremiumListingCard
                  key={business.id}
                  index={idx}
                  href={href}
                  title={business.business_name}
                  category={business.business_type?.replace('_', ' ') || category}
                  location={`${business.city}, ${business.state}`}
                  description={
                    business.description ||
                    'Premium wellness destination offering excellent services.'
                  }
                  image={imageUrl}
                  rating={4.8}
                  price={price}
                  unit={unit}
                  phone={business.phone}
                  tier={tier}
                  status="Verified"
                />
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
