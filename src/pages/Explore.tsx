
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Dumbbell, Sparkles, Heart } from 'lucide-react';
import BusinessListings from '@/components/business/BusinessListings';
import { SmartFilters } from '@/components/SmartFilters';
import AppFooter from '@/components/AppFooter';
import { useAuth } from '@/hooks/useAuth';

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('popular');
  const { signOut } = useAuth();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Discover Your Perfect <span className="text-emerald-600">Wellness Destination</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Find the best gyms, spas, and yoga studios near you. Book instantly and start your wellness journey today.
            </p>
          </div>

          {/* Smart Filters */}
          <SmartFilters
            onCategoryChange={setActiveFilter}
            onSortChange={setActiveSort}
            activeFilter={activeFilter}
            activeSort={activeSort}
          />

          {/* Category Tabs */}
          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                All
              </TabsTrigger>
              <TabsTrigger value="gym" className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                Gyms
              </TabsTrigger>
              <TabsTrigger value="spa" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Spas
              </TabsTrigger>
              <TabsTrigger value="yoga" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Yoga
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <BusinessListings />
            </TabsContent>

            <TabsContent value="gym">
              <BusinessListings />
            </TabsContent>

            <TabsContent value="spa">
              <BusinessListings />
            </TabsContent>

            <TabsContent value="yoga">
              <BusinessListings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default Explore;
