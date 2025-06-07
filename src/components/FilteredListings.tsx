import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SmartFilters from "./SmartFilters";
import BookingModal from "./BookingModal";

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
}

const FilteredListings = ({ listings, pageType }: FilteredListingsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredListings, setFilteredListings] = useState(listings);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('popular');
  const filter = searchParams.get('filter');

  useEffect(() => {
    let filtered = [...listings];

    // Apply filters
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
  }, [activeFilter, activeSort, listings]);

  useEffect(() => {
    if (filter) {
      setActiveFilter(filter);
    }
  }, [filter]);

  const handleFilterChange = (newFilter: string) => {
    setActiveFilter(newFilter);
    // Save to localStorage
    localStorage.setItem(`lastFilter_${pageType}`, newFilter);
  };

  const handleSortChange = (newSort: string) => {
    setActiveSort(newSort);
    // Save to localStorage
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

  const handleBookNow = (listingName: string) => {
    toast.success(`Booking initiated for ${listingName}!`);
  };

  return (
    <div className="px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {getFilterTitle()} - {pageType.charAt(0).toUpperCase() + pageType.slice(1)}s
        </h2>
        <Badge className="mb-4 bg-emerald-500">
          Showing {filteredListings.length} results
        </Badge>
      </div>

      <SmartFilters 
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        activeFilter={activeFilter}
        activeSort={activeSort}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105">
            <div className="relative overflow-hidden">
              <img 
                src={listing.image} 
                alt={listing.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <Badge className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600">
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
                <Link to={listing.link} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-sm">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <BookingModal 
                  businessName={listing.name}
                  businessType={listing.type.toLowerCase()}
                  trigger={
                    <Button 
                      variant="outline" 
                      className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-sm"
                    >
                      Book Now
                    </Button>
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No {pageType}s found for the selected filters.</p>
          <Button 
            className="mt-4"
            onClick={() => {
              setActiveFilter('all');
              setActiveSort('popular');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilteredListings;
