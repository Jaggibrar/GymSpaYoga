
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Star, Dumbbell, Sparkles, Heart } from 'lucide-react';
import BusinessListings from '@/components/business/BusinessListings';
import { SmartFilters } from '@/components/SmartFilters';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import { useAuth } from '@/hooks/useAuth';

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('popular');
  const { signOut } = useAuth();

  return (
    <>
      <AppHeader onLogout={signOut} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Explore Wellness
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Discover Your Perfect Wellness Destination
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the best gyms, spas, and yoga studios near you. Book instantly and start your wellness journey today.
            </p>
          </div>

          {/* Smart Filters */}
          <SmartFilters
            onFilterChange={setActiveFilter}
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

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
                <p className="text-gray-600">Verified Businesses</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <p className="text-gray-600">Happy Customers</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <p className="text-gray-600">Cities Covered</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default Explore;

