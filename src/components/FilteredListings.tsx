
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BookingModal from "./BookingModal";
import BusinessDetailsModal from "./business/BusinessDetailsModal";

interface Listing {
  id: number;
  name: string;
  type: string;
  category: string;
  rating: number;
  location: string;
  price: string;
  image: string;
  amenities: string[];
  link: string;
}

interface FilteredListingsProps {
  listings: Listing[];
  pageType: 'gym' | 'spa' | 'yoga';
  searchTerm?: string;
  location?: string;
}

const FilteredListings = ({ listings, pageType, searchTerm = '', location = '' }: FilteredListingsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredListings, setFilteredListings] = useState(listings);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('popular');
  const filter = searchParams.get('filter');

  useEffect(() => {
    let filtered = [...listings];

    // Apply search term filter
    if (searchTerm?.trim()) {
      filtered = filtered.filter(listing => 
        listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.amenities.some(amenity => 
          amenity.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply location filter
    if (location?.trim()) {
      filtered = filtered.filter(listing => 
        listing.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Apply category filters
    if (activeFilter !== 'all') {
      filtered = filtered.filter(listing => {
        const category = listing.category.toLowerCase();
        switch (activeFilter) {
          case 'luxury':
            return category === 'luxury';
          case 'premium':
            return category === 'premium' || category === 'luxury';
          case 'budget':
            return category === 'budget' || category === 'standard';
          default:
            return true;
        }
      });
    }

    // Apply sorting
    switch (activeSort) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        // Keep original order for popularity
        break;
    }

    setFilteredListings(filtered);
  }, [activeFilter, activeSort, listings, searchTerm, location]);

  useEffect(() => {
    if (filter) {
      setActiveFilter(filter);
    }
  }, [filter]);

  const handleFilterChange = (newFilter: string) => {
    setActiveFilter(newFilter);
    localStorage.setItem(`lastFilter_${pageType}`, newFilter);
  };

  const handleSortChange = (newSort: string) => {
    setActiveSort(newSort);
    localStorage.setItem(`lastSort_${pageType}`, newSort);
  };

  // Load saved preferences on mount
  useEffect(() => {
    const savedFilter = localStorage.getItem(`lastFilter_${pageType}`);
    const savedSort = localStorage.getItem(`lastSort_${pageType}`);
    
    if (savedFilter) setActiveFilter(savedFilter);
    if (savedSort) setActiveSort(savedSort);
  }, [pageType]);

  const getFilterTitle = () => {
    switch (activeFilter) {
      case 'luxury':
        return 'Luxury Experience';
      case 'premium':
        return 'Premium Quality';
      case 'budget':
        return 'Best Value';
      default:
        return `All ${pageType.charAt(0).toUpperCase() + pageType.slice(1)}s`;
    }
  };

  // Convert listing to business format for modals
  const convertToBusinessFormat = (listing: Listing) => ({
    id: listing.id.toString(),
    business_name: listing.name,
    business_type: listing.type,
    category: listing.category,
    city: listing.location.split(',')[0] || listing.location,
    state: listing.location.split(',')[1]?.trim() || 'India',
    address: listing.location,
    pin_code: '110001', // Adding default pin_code to fix the error
    phone: '+91 98765 43210',
    email: `info@${listing.name.toLowerCase().replace(/\s+/g, '')}.com`,
    opening_time: '09:00:00',
    closing_time: '21:00:00',
    description: `Premium ${listing.type} facility offering world-class services and amenities.`,
    amenities: listing.amenities,
    image_urls: [listing.image],
    monthly_price: listing.type === 'gym' ? parseInt(listing.price.replace(/[^\d]/g, '')) : undefined,
    session_price: listing.type !== 'gym' ? parseInt(listing.price.replace(/[^\d]/g, '')) : undefined,
    status: 'approved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  return (
    <div className="px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
          {getFilterTitle()} - {pageType.charAt(0).toUpperCase() + pageType.slice(1)}s
        </h2>
        <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30 backdrop-blur-sm text-lg px-4 py-2">
          Showing {filteredListings.length} premium results
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl">
            <div className="relative overflow-hidden">
              <img 
                src={listing.image} 
                alt={listing.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <Badge className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm hover:bg-emerald-600">
                {listing.category}
              </Badge>
            </div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                    {listing.name}
                  </CardTitle>
                  <p className="text-emerald-600 font-semibold text-sm md:text-base">{listing.type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 md:h-5 w-4 md:w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm md:text-base">{listing.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 md:h-5 w-4 md:w-5 mr-3 text-emerald-600" />
                  <span className="text-sm md:text-base">{listing.location}</span>
                </div>
                <div className="flex items-center text-emerald-600 font-bold text-base md:text-lg">
                  <span>{listing.price}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {listing.amenities.slice(0, 3).map((amenity) => (
                  <Badge key={amenity} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {listing.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{listing.amenities.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <BusinessDetailsModal
                  business={convertToBusinessFormat(listing)}
                  trigger={
                    <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-sm px-4 py-2 min-h-[40px]">
                      <span className="block">View Details</span>
                      <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
                    </Button>
                  }
                />
                <BookingModal 
                  businessName={listing.name}
                  businessType={listing.type.toLowerCase()}
                  businessId={listing.id.toString()}
                  price={listing.price}
                  trigger={
                    <Button 
                      variant="outline" 
                      className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-sm px-4 py-2 min-h-[40px]"
                    >
                      <span className="block">Book Now</span>
                    </Button>
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-4">No Results Found</h3>
            <p className="text-gray-300 mb-6">
              No {pageType}s found for the selected filters or search criteria.
            </p>
            <Button 
              className="mt-4 bg-emerald-500 hover:bg-emerald-600"
              onClick={() => {
                setActiveFilter('all');
                setActiveSort('popular');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilteredListings;
