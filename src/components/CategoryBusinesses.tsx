
import React, { useState, useEffect } from 'react';
import { useBusinessData } from '@/hooks/useBusinessData';
import { useTrainers } from '@/hooks/useTrainers';
import OptimizedBusinessCard from './OptimizedBusinessCard';
import TrainerCard from './TrainerCard';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Search, MapPin, Filter, Star, RefreshCw } from 'lucide-react';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { MoodFilter } from './filters/MoodFilter';

interface CategoryBusinessesProps {
  category: string;
}

// Type guard functions
const isTrainer = (item: any): item is Trainer => {
  return 'trainer_tier' in item && 'experience' in item;
};

const isBusiness = (item: any): item is Business => {
  return 'business_type' in item && 'business_name' in item;
};

interface Trainer {
  id: string;
  name: string;
  category: string;
  trainer_tier: string;
  experience: number;
  specializations: string[];
  hourly_rate: number;
  location: string;
  bio: string;
  profile_image_url?: string;
}

interface Business {
  id: string;
  business_name: string;
  business_type: string;
  city: string;
  state: string;
  tier: string;
  pricing_tier: string;
  description: string;
  images: string[];
}

const CategoryBusinesses = ({ category }: CategoryBusinessesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  const isTrainerCategory = category === 'trainer';
  
  // Use appropriate hook based on category
  const businessData = useBusinessData(
    isTrainerCategory ? undefined : category,
    searchTerm,
    locationFilter,
    tierFilter
  );
  
  const trainerData = useTrainers(
    searchTerm,
    locationFilter,
    tierFilter,
    category
  );
  
  const data = isTrainerCategory ? trainerData : businessData;
  const { loading, error, refetch } = data;
  const items = isTrainerCategory ? trainerData.trainers : businessData.businesses;
  const totalCount = isTrainerCategory ? trainerData.totalCount : businessData.totalCount;
  const filteredCount = isTrainerCategory ? trainerData.trainers.length : businessData.filteredCount;

  // Filter items based on mood selection for non-trainer categories
  const moodFilteredItems = React.useMemo(() => {
    if (isTrainerCategory || !selectedMood) return items;
    
    const moodMapping = {
      'relax': ['spa', 'yoga'],
      'fitness': ['gym'],
      'rejuvenate': ['spa', 'yoga']
    };
    
    const allowedCategories = moodMapping[selectedMood as keyof typeof moodMapping] || [];
    return items.filter(item => {
      if (isBusiness(item)) {
        return allowedCategories.includes(item.business_type);
      }
      return false;
    });
  }, [items, selectedMood, isTrainerCategory]);

  // Debug logging with more detail
  useEffect(() => {
    console.log(`CategoryBusinesses [${category}] - Loading: ${loading}, Total: ${totalCount}, Filtered: ${filteredCount}, Mood: ${selectedMood}, Error: ${error}`);
    if (moodFilteredItems.length > 0) {
      console.log(`Sample item:`, moodFilteredItems[0]);
    }
  }, [category, loading, totalCount, filteredCount, error, moodFilteredItems, selectedMood]);

  const handleRefresh = async () => {
    console.log(`Manually refreshing ${category} data...`);
    toast.info(`Refreshing ${category} listings...`);
    await refetch();
  };

  const handleMoodChange = (mood: string | null) => {
    setSelectedMood(mood);
    if (mood) {
      toast.success(`Filtering by mood: ${mood}`);
    } else {
      toast.info('Mood filter cleared');
    }
  };

  const categoryDisplayName = isTrainerCategory ? 'Personal Trainers' : `${category.charAt(0).toUpperCase() + category.slice(1)}s`;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Loading {categoryDisplayName}...
          </h2>
          <div className="flex justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading {categoryDisplayName}</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="flex gap-2 justify-center">
              <Button 
                onClick={handleRefresh} 
                className="bg-red-600 hover:bg-red-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                Reload Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header with Stats and Refresh */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Featured {categoryDisplayName}
          </h2>
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
        <div className="flex justify-center gap-4 mb-6">
          <Badge variant="outline" className="text-sm">
            {totalCount} Total Listings
          </Badge>
          <Badge className="bg-emerald-500 text-sm">
            {selectedMood && !isTrainerCategory ? moodFilteredItems.length : filteredCount} Showing
          </Badge>
          {totalCount === 0 && (
            <Badge variant="destructive" className="text-sm">
              No Data Found
            </Badge>
          )}
        </div>
      </div>

      {/* Mood Filter (only for non-trainer categories) */}
      {!isTrainerCategory && (
        <MoodFilter selectedMood={selectedMood} onMoodChange={handleMoodChange} />
      )}

      {/* Filters */}
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={`Search ${categoryDisplayName.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Tiers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                {isTrainerCategory ? (
                  <>
                    <SelectItem value="elite">Elite</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="budget">Budget Friendly</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('');
                setTierFilter('all');
                setSelectedMood(null);
                toast.success('All filters cleared');
              }}
              variant="outline"
            >
              Clear All Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Listings */}
      {moodFilteredItems.length === 0 ? (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-8 text-center">
            <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">
              No {categoryDisplayName.toLowerCase()} found
            </h3>
            <p className="text-yellow-700 mb-4">
              {totalCount === 0 
                ? `No ${categoryDisplayName.toLowerCase()} have been registered yet. Be the first to list your business!`
                : selectedMood && !isTrainerCategory
                  ? `No ${categoryDisplayName.toLowerCase()} match your current mood and filters. Try adjusting your selection.`
                  : `No ${categoryDisplayName.toLowerCase()} match your current filters. Try adjusting your search criteria.`
              }
            </p>
            <div className="flex gap-2 justify-center">
              {totalCount === 0 && (
                <Button className="bg-yellow-600 hover:bg-yellow-700">
                  List Your {isTrainerCategory ? 'Profile' : 'Business'}
                </Button>
              )}
              <Button 
                onClick={handleRefresh}
                variant="outline"
                className="border-yellow-600 text-yellow-600 hover:bg-yellow-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Check Again
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {moodFilteredItems.map((item) => {
            if (isTrainerCategory && isTrainer(item)) {
              return <TrainerCard key={item.id} trainer={item} />;
            } else if (!isTrainerCategory && isBusiness(item)) {
              return <OptimizedBusinessCard key={item.id} business={item as Business} />;
            }
            return null;
          })}
        </div>
      )}

      {/* Debug Information (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="mt-8 bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-gray-700 mb-2">Debug Info:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Category: {category}</div>
              <div>Is Trainer: {isTrainerCategory ? 'Yes' : 'No'}</div>
              <div>Total items: {totalCount}</div>
              <div>Filtered count: {filteredCount}</div>
              <div>Mood filtered count: {moodFilteredItems.length}</div>
              <div>Selected mood: {selectedMood || 'None'}</div>
              <div>Loading: {loading ? 'Yes' : 'No'}</div>
              <div>Error: {error || 'None'}</div>
              <div>Search term: {searchTerm || 'None'}</div>
              <div>Location filter: {locationFilter || 'None'}</div>
              <div>Tier filter: {tierFilter}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CategoryBusinesses;
