
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Filter, X } from "lucide-react";

interface AdvancedSearchFiltersProps {
  onPriceRangeChange: (min: number, max: number) => void;
  onAmenityToggle: (amenity: string) => void;
  selectedAmenities: string[];
  availableAmenities: string[];
  businessType: string;
}

const AdvancedSearchFilters = ({
  onPriceRangeChange,
  onAmenityToggle,
  selectedAmenities,
  availableAmenities,
  businessType
}: AdvancedSearchFiltersProps) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    onPriceRangeChange(value[0], value[1]);
  };

  const clearAllFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedRating(null);
    setSelectedDistance(null);
    selectedAmenities.forEach(amenity => onAmenityToggle(amenity));
    onPriceRangeChange(0, 10000);
  };

  const ratingOptions = [4.5, 4.0, 3.5, 3.0];
  const distanceOptions = [1, 5, 10, 25, 50];

  const activeFiltersCount = 
    (priceRange[0] > 0 || priceRange[1] < 10000 ? 1 : 0) +
    (selectedRating ? 1 : 0) +
    (selectedDistance ? 1 : 0) +
    selectedAmenities.length;

  return (
    <Card className="mb-6">
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CardHeader className="pb-3">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex items-center justify-between w-full p-0 h-auto">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <CardTitle className="text-lg">Advanced Filters</CardTitle>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Price Range Filter */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Price Range</Label>
              <div className="px-3">
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  max={10000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Minimum Rating</Label>
              <div className="flex flex-wrap gap-2">
                {ratingOptions.map((rating) => (
                  <Button
                    key={rating}
                    variant={selectedRating === rating ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                    className="flex items-center space-x-1"
                  >
                    <span>{rating}</span>
                    <span className="text-yellow-400">★</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Distance Filter */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Distance (km)</Label>
              <div className="flex flex-wrap gap-2">
                {distanceOptions.map((distance) => (
                  <Button
                    key={distance}
                    variant={selectedDistance === distance ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDistance(selectedDistance === distance ? null : distance)}
                  >
                    {distance} km
                  </Button>
                ))}
              </div>
            </div>

            {/* Amenities Filter */}
            {availableAmenities.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableAmenities.slice(0, 12).map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => onAmenityToggle(amenity)}
                      />
                      <Label htmlFor={amenity} className="text-sm">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
                {availableAmenities.length > 12 && (
                  <p className="text-sm text-gray-500">
                    +{availableAmenities.length - 12} more amenities available
                  </p>
                )}
              </div>
            )}

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <div className="pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={clearAllFilters}
                  className="w-full flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Clear All Filters</span>
                </Button>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default AdvancedSearchFilters;
