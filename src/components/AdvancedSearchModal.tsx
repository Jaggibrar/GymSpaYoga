
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Save, Star, MapPin, IndianRupee, X } from "lucide-react";
import { useAdvancedSearch } from '@/hooks/useAdvancedSearch';
import { toast } from 'sonner';

interface AdvancedSearchModalProps {
  businessType: 'gym' | 'spa' | 'yoga';
  onApplyFilters: (filters: any) => void;
  availableAmenities: string[];
}

const AdvancedSearchModal = ({ businessType, onApplyFilters, availableAmenities }: AdvancedSearchModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { savedFilters, saveFilter, deleteFilter, setDefaultFilter } = useAdvancedSearch();
  
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    selectedAmenities: [] as string[],
    location: '',
    minRating: 0,
    category: '',
    availability: [] as string[]
  });
  
  const [saveFilterName, setSaveFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const businessTypeFilters = savedFilters.filter(f => f.business_type === businessType);

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter(a => a !== amenity)
        : [...prev.selectedAmenities, amenity]
    }));
  };

  const handleApplyFilters = () => {
    const filterData = {
      priceRange: { min: filters.priceRange[0], max: filters.priceRange[1] },
      amenities: filters.selectedAmenities,
      location: filters.location,
      rating: filters.minRating,
      category: filters.category
    };
    
    onApplyFilters(filterData);
    setIsOpen(false);
    toast.success('Filters applied successfully');
  };

  const handleSaveFilter = async () => {
    if (!saveFilterName.trim()) {
      toast.error('Please enter a filter name');
      return;
    }

    try {
      await saveFilter({
        filter_name: saveFilterName,
        business_type: businessType,
        filters: {
          priceRange: { min: filters.priceRange[0], max: filters.priceRange[1] },
          amenities: filters.selectedAmenities,
          location: filters.location,
          rating: filters.minRating,
          category: filters.category
        },
        is_default: false
      });
      
      setSaveFilterName('');
      setShowSaveDialog(false);
    } catch (error) {
      console.error('Error saving filter:', error);
    }
  };

  const handleLoadFilter = (filter: any) => {
    setFilters({
      priceRange: [filter.filters.priceRange?.min || 0, filter.filters.priceRange?.max || 10000],
      selectedAmenities: filter.filters.amenities || [],
      location: filter.filters.location || '',
      minRating: filter.filters.rating || 0,
      category: filter.filters.category || '',
      availability: []
    });
    toast.success('Filter loaded');
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      selectedAmenities: [],
      location: '',
      minRating: 0,
      category: '',
      availability: []
    });
    toast.info('Filters cleared');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Advanced Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Search Filters - {businessType.toUpperCase()}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Saved Filters */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Save className="h-4 w-4" />
                Saved Filters
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {businessTypeFilters.map(filter => (
                  <div key={filter.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{filter.filter_name}</p>
                      {filter.is_default && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleLoadFilter(filter)}
                      >
                        Load
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDefaultFilter(filter.id)}
                      >
                        <Star className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteFilter(filter.id)}
                        className="text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                {businessTypeFilters.length === 0 && (
                  <p className="text-sm text-gray-500">No saved filters</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Filter Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Range */}
            <div>
              <Label className="flex items-center gap-2 mb-4">
                <IndianRupee className="h-4 w-4" />
                Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              </Label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                max={10000}
                min={0}
                step={100}
                className="w-full"
              />
            </div>

            {/* Location */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                placeholder="Enter city or area..."
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            {/* Minimum Rating */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4" />
                Minimum Rating: {filters.minRating} stars
              </Label>
              <Slider
                value={[filters.minRating]}
                onValueChange={(value) => setFilters(prev => ({ ...prev, minRating: value[0] }))}
                max={5}
                min={0}
                step={0.5}
                className="w-full"
              />
            </div>

            {/* Category */}
            <div>
              <Label className="mb-2 block">Category</Label>
              <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amenities */}
            <div>
              <Label className="mb-4 block">Amenities & Features</Label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {availableAmenities.map(amenity => (
                  <Badge
                    key={amenity}
                    variant={filters.selectedAmenities.includes(amenity) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-emerald-500 hover:text-white transition-colors justify-center"
                    onClick={() => handleAmenityToggle(amenity)}
                  >
                    {amenity}
                    {filters.selectedAmenities.includes(amenity) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Button onClick={clearAllFilters} variant="outline">
            Clear All
          </Button>
          
          {showSaveDialog ? (
            <div className="flex gap-2 flex-1">
              <Input
                placeholder="Filter name..."
                value={saveFilterName}
                onChange={(e) => setSaveFilterName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSaveFilter}>Save</Button>
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={() => setShowSaveDialog(true)} variant="outline">
              <Save className="h-4 w-4 mr-1" />
              Save Filter
            </Button>
          )}
          
          <Button onClick={handleApplyFilters} className="bg-gradient-to-r from-emerald-500 to-blue-500">
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedSearchModal;
