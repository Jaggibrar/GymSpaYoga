
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, X, SlidersHorizontal } from 'lucide-react';
import { MoodFilter } from './filters/MoodFilter';

interface SmartFiltersProps {
  onSearchChange?: (search: string) => void;
  onLocationChange?: (location: string) => void;
  onCategoryChange?: (category: string) => void;
  onSortChange?: (sort: string) => void;
  showMoodFilter?: boolean;
  activeFilter?: string;
  activeSort?: string;
  placeholder?: string;
  category?: string;
}

export const SmartFilters = ({ 
  onSearchChange,
  onLocationChange, 
  onCategoryChange,
  onSortChange,
  showMoodFilter = false, 
  activeFilter, 
  activeSort,
  placeholder = "Search gyms, spas, yoga...",
  category = "all"
}: SmartFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [tier, setTier] = useState('all');
  const [mood, setMood] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    onLocationChange?.(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onCategoryChange?.(value);
  };

  const handleSortChange = (value: string) => {
    onSortChange?.(value);
  };

  const clearFilter = (filterType: string) => {
    switch (filterType) {
      case 'search':
        setSearchTerm('');
        onSearchChange?.('');
        break;
      case 'location':
        setLocation('');
        onLocationChange?.('');
        break;
      case 'category':
        setSelectedCategory('all');
        onCategoryChange?.('all');
        break;
      case 'tier':
        setTier('all');
        break;
      case 'mood':
        setMood(null);
        break;
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setLocation('');
    setSelectedCategory('all');
    setTier('all');
    setMood(null);
    onSearchChange?.('');
    onLocationChange?.('');
    onCategoryChange?.('all');
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
      {/* Premium Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Find Your Perfect Match</h2>
        <p className="text-gray-600">Discover premium wellness experiences tailored for you</p>
      </div>

      {/* Mood Filter */}
      {showMoodFilter && (
        <div className="mb-8">
          <MoodFilter selectedMood={mood} onMoodChange={setMood} />
        </div>
      )}

      {/* Main Search Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Search Input */}
        <div className="relative lg:col-span-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg"
          />
        </div>

        {/* Location Input */}
        <div className="relative lg:col-span-1">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Enter city or area..."
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg"
          />
        </div>

        {/* Advanced Filters Toggle */}
        <div className="lg:col-span-1">
          <Button
            onClick={() => setShowAdvanced(!showAdvanced)}
            variant="outline"
            className="w-full h-14 border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl shadow-lg font-semibold"
          >
            <SlidersHorizontal className="h-5 w-5 mr-3" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-200 shadow-xl rounded-xl">
                <SelectItem value="all" className="text-black font-bold">All Categories</SelectItem>
                <SelectItem value="gym" className="text-black font-medium">Gyms</SelectItem>
                <SelectItem value="spa" className="text-black font-medium">Spas</SelectItem>
                <SelectItem value="yoga" className="text-black font-medium">Yoga Studios</SelectItem>
                <SelectItem value="trainer" className="text-black font-medium">Personal Trainers</SelectItem>
              </SelectContent>
            </Select>

            {/* Tier Filter */}
            <Select value={tier} onValueChange={setTier}>
              <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                <SelectValue placeholder="All Tiers" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-200 shadow-xl rounded-xl">
                <SelectItem value="all" className="text-black font-bold">All Tiers</SelectItem>
                <SelectItem value="budget" className="text-black font-medium">Budget Friendly</SelectItem>
                <SelectItem value="premium" className="text-black font-medium">Premium</SelectItem>
                <SelectItem value="luxury" className="text-black font-medium">Luxury</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select value={activeSort} onValueChange={handleSortChange}>
              <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-200 shadow-xl rounded-xl">
                <SelectItem value="created_at" className="text-black font-medium">Most Recent</SelectItem>
                <SelectItem value="name" className="text-black font-medium">Name A-Z</SelectItem>
                <SelectItem value="price" className="text-black font-medium">Price: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {(searchTerm || location || selectedCategory !== 'all' || tier !== 'all' || mood) && (
            <div className="flex flex-wrap gap-3 mb-4">
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-100 text-emerald-700">
                  Search: {searchTerm}
                  <X className="h-4 w-4 cursor-pointer hover:text-red-500" onClick={() => clearFilter('search')} />
                </Badge>
              )}
              {location && (
                <Badge variant="secondary" className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-100 text-blue-700">
                  Location: {location}
                  <X className="h-4 w-4 cursor-pointer hover:text-red-500" onClick={() => clearFilter('location')} />
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-2 px-3 py-2 rounded-full bg-purple-100 text-purple-700">
                  {selectedCategory}
                  <X className="h-4 w-4 cursor-pointer hover:text-red-500" onClick={() => clearFilter('category')} />
                </Badge>
              )}
              {tier !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-2 px-3 py-2 rounded-full bg-orange-100 text-orange-700">
                  {tier}
                  <X className="h-4 w-4 cursor-pointer hover:text-red-500" onClick={() => clearFilter('tier')} />
                </Badge>
              )}
              {mood && (
                <Badge variant="secondary" className="flex items-center gap-2 px-3 py-2 rounded-full bg-pink-100 text-pink-700">
                  Mood: {mood}
                  <X className="h-4 w-4 cursor-pointer hover:text-red-500" onClick={() => clearFilter('mood')} />
                </Badge>
              )}
            </div>
          )}

          {/* Filter Actions */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={clearAllFilters} className="border-red-300 text-red-600 hover:bg-red-50">
              Clear All Filters
            </Button>
            <Button onClick={() => setShowAdvanced(false)} className="bg-emerald-500 hover:bg-emerald-600">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
