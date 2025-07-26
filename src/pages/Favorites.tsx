import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock, DollarSign, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFavorites } from '@/components/FavoritesProvider';
import { supabase } from '@/integrations/supabase/client';
import FavoriteButton from '@/components/FavoriteButton';
import { useAuth } from '@/hooks/useAuth';
import SEOHead from '@/components/SEOHead';

interface FavoriteBusiness {
  id: string;
  business_name: string;
  business_type: string;
  category: string;
  city: string;
  state: string;
  image_urls: string[];
  monthly_price?: number;
  session_price?: number;
  description?: string;
  opening_time: string;
  closing_time: string;
  amenities: string[];
  address: string;
  created_at: string;
}

export default function Favorites() {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const [favoriteBusinesses, setFavoriteBusinesses] = useState<FavoriteBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    fetchFavoriteBusinesses();
  }, [favorites, user]);

  const fetchFavoriteBusinesses = async () => {
    if (!user || favorites.length === 0) {
      setFavoriteBusinesses([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const businessIds = favorites.map(fav => fav.business_id);
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .in('id', businessIds)
        .eq('status', 'approved');

      if (error) throw error;

      setFavoriteBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching favorite businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedBusinesses = favoriteBusinesses
    .filter(business => {
      const matchesSearch = business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           business.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || business.business_type === filterType;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.business_name.localeCompare(b.business_name);
        case 'price_low':
          return (a.session_price || a.monthly_price || 0) - (b.session_price || b.monthly_price || 0);
        case 'price_high':
          return (b.session_price || b.monthly_price || 0) - (a.session_price || a.monthly_price || 0);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const getBusinessUrl = (business: FavoriteBusiness) => {
    const typeRoutes: { [key: string]: string } = {
      'gym': '/gyms',
      'spa': '/spas',
      'yoga_studio': '/yoga'
    };
    
    const baseRoute = typeRoutes[business.business_type] || '/explore';
    return `${baseRoute}/${business.id}`;
  };

  const getBusinessTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'gym': 'Gym',
      'spa': 'Spa',
      'yoga_studio': 'Yoga Studio'
    };
    return labels[type] || type;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <SEOHead 
          title="Favorites - GymspaYoga"
          description="Save and manage your favorite gyms, spas, and yoga studios"
        />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center p-8">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Sign in to view favorites</h2>
              <p className="text-muted-foreground mb-4">
                Create an account to save your favorite places
              </p>
              <Link to="/login">
                <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                  Sign In
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <SEOHead 
        title="My Favorites - GymspaYoga"
        description="Your saved gyms, spas, and yoga studios"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">My Favorites</h1>
          <p className="text-center text-muted-foreground">
            Your saved gyms, spas, and yoga studios
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="gym">Gyms</SelectItem>
                    <SelectItem value="spa">Spas</SelectItem>
                    <SelectItem value="yoga_studio">Yoga Studios</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredAndSortedBusinesses.length === 0 ? (
          <Card>
            <CardContent className="text-center p-12">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              {favorites.length === 0 ? (
                <>
                  <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start exploring and save your favorite places
                  </p>
                  <Link to="/explore">
                    <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                      Explore Places
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">No matches found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setFilterType('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedBusinesses.map((business) => (
              <Card key={business.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={business.image_urls?.[0] || '/placeholder.svg'}
                    alt={business.business_name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <FavoriteButton businessId={business.id} />
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-black/70 text-white">
                      {getBusinessTypeLabel(business.business_type)}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <Link to={getBusinessUrl(business)} className="block">
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                      {business.business_name}
                    </h3>
                  </Link>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {business.city}, {business.state}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {business.opening_time} - {business.closing_time}
                    </div>
                    
                    {(business.session_price || business.monthly_price) && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {business.session_price 
                          ? `₹${business.session_price}/session`
                          : `₹${business.monthly_price}/month`
                        }
                      </div>
                    )}
                  </div>
                  
                  {business.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {business.description}
                    </p>
                  )}
                  
                  <div className="mt-4">
                    <Link to={getBusinessUrl(business)}>
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredAndSortedBusinesses.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Showing {filteredAndSortedBusinesses.length} of {favoriteBusinesses.length} favorites
            </p>
          </div>
        )}
      </div>
    </div>
  );
}