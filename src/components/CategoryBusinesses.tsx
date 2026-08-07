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
import LuxuryListingCard from '@/components/home/LuxuryListingCard';

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
          <p className="mt-4 text-muted-foreground">Loading {title.toLowerCase()}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-destructive">Error loading {title.toLowerCase()}: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="section-padding bg-background">
      <div className="container-modern">
        <div className="max-w-2xl">
          <span className="eyebrow">Curated selection</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-foreground leading-[1.08]">{title}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {/* Sticky glass filter bar */}
        {showFilters && (
          <div className="sticky top-20 z-20 mt-10 glass-card p-4 md:p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={`Search ${title.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 h-12 rounded-full bg-card border-border"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="City or area..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-11 h-12 rounded-full bg-card border-border"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 rounded-full bg-card border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at">Newest First</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Listings */}
        {businesses.length === 0 ? (
          <div className="text-center py-16 mt-10 glass-card max-w-xl mx-auto">
            <Search className="h-14 w-14 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold text-foreground">No {title.toLowerCase()} found</h3>
            <p className="mt-1 text-muted-foreground">Try adjusting your filters or check back soon</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {businesses.map((business: any) => {
              const type = business.business_type?.toLowerCase() || category;
              const identifier = business.slug || business.id;
              const href =
                type === 'spa'
                  ? `/spas/${identifier}`
                  : type === 'yoga'
                  ? `/yoga/${identifier}`
                  : type === 'chiropractor'
                  ? `/chiropractors/${identifier}`
                  : `/gyms/${identifier}`;

              return (
                <LuxuryListingCard
                  key={business.id}
                  href={href}
                  listing={{
                    id: business.id,
                    business_name: business.business_name,
                    business_type: type,
                    city: business.city,
                    state: business.state,
                    address: business.address,
                    slug: business.slug,
                    image_urls: business.image_urls,
                    monthly_price: business.monthly_price,
                    session_price: business.session_price,
                    description: business.description,
                  } as any}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryBusinesses;

