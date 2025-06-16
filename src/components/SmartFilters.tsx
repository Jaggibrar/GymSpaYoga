
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { MoodFilter } from './filters/MoodFilter';

interface SmartFiltersProps {
  onFilterChange?: (filters: any) => void;
  showMoodFilter?: boolean;
  activeFilter?: string;
  activeSort?: string;
}

export const SmartFilters = ({ onFilterChange, showMoodFilter = true, activeFilter, activeSort }: SmartFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState(activeFilter || 'all');
  const [tier, setTier] = useState('all');
  const [mood, setMood] = useState('all');

  const handleFilterChange = () => {
    const filters = {
      searchTerm,
      location,
      category: category === 'all' ? undefined : category,
      tier: tier === 'all' ? undefined : tier,
      mood: mood === 'all' ? undefined : mood
    };
    onFilterChange?.(filters);
  };

  React.useEffect(() => {
    handleFilterChange();
  }, [searchTerm, location, category, tier, mood]);

  const clearFilter = (filterType: string) => {
    switch (filterType) {
      case 'search':
        setSearchTerm('');
        break;
      case 'location':
        setLocation('');
        break;
      case 'category':
        setCategory('all');
        break;
      case 'tier':
        setTier('all');
        break;
      case 'mood':
        setMood('all');
        break;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search gyms, spas, yoga..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        {/* Location Input */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        {/* Category Filter */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            <SelectItem value="all" className="text-black font-bold">All Categories</SelectItem>
            <SelectItem value="gym" className="text-black font-medium">Gyms</SelectItem>
            <SelectItem value="spa" className="text-black font-medium">Spas</SelectItem>
            <SelectItem value="yoga" className="text-black font-medium">Yoga Studios</SelectItem>
          </SelectContent>
        </Select>

        {/* Tier Filter */}
        <Select value={tier} onValueChange={setTier}>
          <SelectTrigger className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500">
            <SelectValue placeholder="All Tiers" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            <SelectItem value="all" className="text-black font-bold">All Tiers</SelectItem>
            <SelectItem value="budget" className="text-black font-medium">Budget Friendly</SelectItem>
            <SelectItem value="premium" className="text-black font-medium">Premium</SelectItem>
            <SelectItem value="luxury" className="text-black font-medium">Luxury</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mood Filter */}
      {showMoodFilter && (
        <div className="mb-4">
          <MoodFilter selectedMood={mood} onMoodChange={setMood} />
        </div>
      )}

      {/* Active Filters */}
      {(searchTerm || location || category !== 'all' || tier !== 'all' || mood !== 'all') && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {searchTerm}
              <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter('search')} />
            </Badge>
          )}
          {location && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Location: {location}
              <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter('location')} />
            </Badge>
          )}
          {category !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {category}
              <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter('category')} />
            </Badge>
          )}
          {tier !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {tier}
              <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter('tier')} />
            </Badge>
          )}
          {mood !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Mood: {mood}
              <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter('mood')} />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
