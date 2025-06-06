
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  const [searchParams] = useSearchParams();
  const [filteredListings, setFilteredListings] = useState(listings);
  const filter = searchParams.get('filter');

  useEffect(() => {
    if (filter) {
      const filtered = listings.filter(listing => {
        const category = listing.category.toLowerCase();
        switch (filter) {
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
      setFilteredListings(filtered);
    } else {
      setFilteredListings(listings);
    }
  }, [filter, listings]);

  const getFilterTitle = () => {
    switch (filter) {
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
    // In real app, this would open booking modal or navigate to booking page
  };

  return (
    <div className="px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {getFilterTitle()} - {pageType.charAt(0).toUpperCase() + pageType.slice(1)}s
        </h2>
        {filter && (
          <Badge className="mb-4 bg-emerald-500">
            Showing {filteredListings.length} results for {getFilterTitle()}
          </Badge>
        )}
      </div>

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
                <Button 
                  onClick={() => handleBookNow(listing.name)}
                  variant="outline" 
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-sm"
                >
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No {pageType}s found for the selected filter.</p>
          <Link to={`/${pageType}s`}>
            <Button className="mt-4">View All {pageType.charAt(0).toUpperCase() + pageType.slice(1)}s</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FilteredListings;
