
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Filter, X } from "lucide-react";

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
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    onLocationChange(value);
  };

  const handlePriceRangeSubmit = () => {
    const min = priceRange.min ? parseInt(priceRange.min) : 0;
    const max = priceRange.max ? parseInt(priceRange.max) : 999999;
    onPriceRangeChange(min, max);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setLocation("");
    setPriceRange({ min: "", max: "" });
    onSearchChange("");
    onLocationChange("");
    onPriceRangeChange(0, 999999);
    selectedAmenities.forEach(amenity => onAmenityToggle(amenity));
  };

  const getPlaceholder = () => {
    switch (businessType) {
      case 'gym':
        return "Search gyms by name or equipment...";
      case 'spa':
        return "Search spas by name or treatments...";
      case 'yoga':
        return "Search yoga studios by name or style...";
      default:
        return "Search...";
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
      {/* Main Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder={getPlaceholder()}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
        
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Enter city or area..."
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>

        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="h-12 px-6 border-2"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card className="border-2 border-gray-100">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Price Range (₹)
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    type="number"
                  />
                  <Input
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    type="number"
                  />
                  <Button onClick={handlePriceRangeSubmit} size="sm">
                    Apply
                  </Button>
                </div>
              </div>

              {/* Amenities */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Amenities & Features
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableAmenities.slice(0, 8).map((amenity) => (
                    <Badge
                      key={amenity}
                      variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-emerald-500 hover:text-white transition-colors"
                      onClick={() => onAmenityToggle(amenity)}
                    >
                      {amenity}
                      {selectedAmenities.includes(amenity) && (
                        <X className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                  {availableAmenities.length > 8 && (
                    <Badge variant="outline" className="text-gray-500">
                      +{availableAmenities.length - 8} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <div className="text-sm text-gray-600">
                {selectedAmenities.length > 0 && (
                  <span>{selectedAmenities.length} filter(s) applied</span>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button onClick={() => setShowFilters(false)}>
                  Done
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchAndFilters;
