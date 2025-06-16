
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Filter, SlidersHorizontal } from 'lucide-react';
import MoodFilter from '@/components/filters/MoodFilter';

interface SmartFiltersProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
  activeFilter: string;
  activeSort: string;
}

const SmartFilters = ({ onFilterChange, onSortChange, activeFilter, activeSort }: SmartFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleMoodChange = (mood: string | null) => {
    setSelectedMood(mood);
    
    // Map mood to business categories and tiers
    const moodMapping = {
      'relax': { categories: ['spa', 'yoga'], tiers: ['luxury', 'premium'] },
      'energize': { categories: ['gym', 'fitness_center'], tiers: ['premium', 'budget'] },
      'rejuvenate': { categories: ['spa', 'yoga', 'gym'], tiers: ['luxury', 'premium'] },
      'strengthen': { categories: ['gym', 'fitness_center'], tiers: ['premium', 'budget'] }
    };
    
    if (mood && moodMapping[mood as keyof typeof moodMapping]) {
      const mapping = moodMapping[mood as keyof typeof moodMapping];
      // Apply the first category as filter for now
      onFilterChange(mapping.categories[0]);
    } else {
      onFilterChange('all');
    }
  };

  return (
    <div className="space-y-6">
      {/* Mood Filter */}
      <MoodFilter selectedMood={selectedMood} onMoodChange={handleMoodChange} />

      {/* Main Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={activeFilter} onValueChange={onFilterChange}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="gym">Gyms</SelectItem>
                <SelectItem value="spa">Spas</SelectItem>
                <SelectItem value="yoga">Yoga Studios</SelectItem>
                <SelectItem value="fitness_center">Fitness Centers</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={activeSort} onValueChange={onSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Advanced Filters
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant={activeFilter === 'luxury' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onFilterChange(activeFilter === 'luxury' ? 'all' : 'luxury')}
              >
                💎 Luxury
              </Button>
              <Button
                variant={activeFilter === 'premium' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onFilterChange(activeFilter === 'premium' ? 'all' : 'premium')}
              >
                ⭐ Premium
              </Button>
              <Button
                variant={activeFilter === 'budget' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onFilterChange(activeFilter === 'budget' ? 'all' : 'budget')}
              >
                💰 Budget
              </Button>
            </div>
          </div>

          {showAdvanced && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <Input placeholder="Min" type="number" />
                    <Input placeholder="Max" type="number" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Distance</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Within..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 km</SelectItem>
                      <SelectItem value="5">5 km</SelectItem>
                      <SelectItem value="10">10 km</SelectItem>
                      <SelectItem value="25">25 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Amenities</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Must have..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parking">Parking</SelectItem>
                      <SelectItem value="ac">Air Conditioning</SelectItem>
                      <SelectItem value="shower">Shower Facilities</SelectItem>
                      <SelectItem value="wifi">WiFi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartFilters;
