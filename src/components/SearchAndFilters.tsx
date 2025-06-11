
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, MapPin, DollarSign, Star } from "lucide-react";

interface SearchAndFiltersProps {
  onSearchChange: (search: string) => void;
  onLocationChange: (location: string) => void;
  onPriceRangeChange: (min: number, max: number) => void;
  onAmenityToggle: (amenity: string) => void;
  selectedAmenities: string[];
  availableAmenities: string[];
  businessType: 'gym' | 'spa' | 'yoga';
}

const SearchAndFilters = ({
  onSearchChange,
  onLocationChange,
  onPriceRangeChange,
  onAmenityToggle,
  selectedAmenities,
  availableAmenities,
  businessType
}: SearchAndFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    onLocationChange(value);
  };

  const handlePriceChange = () => {
    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : 999999;
    onPriceRangeChange(min, max);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder={`Search ${businessType}s...`}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Location (city, area)..."
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Price Range</span>
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Min price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  type="number"
                  className="flex-1"
                />
                <Input
                  placeholder="Max price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  type="number"
                  className="flex-1"
                />
                <Button onClick={handlePriceChange} variant="outline">
                  Apply
                </Button>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>Amenities</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableAmenities.map((amenity) => (
                  <Badge
                    key={amenity}
                    variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => onAmenityToggle(amenity)}
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchAndFilters;
