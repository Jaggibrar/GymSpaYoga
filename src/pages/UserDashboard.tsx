
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Heart, 
  History, 
  MapPin, 
  Star, 
  Calendar,
  Filter,
  Bookmark,
  User,
  Camera
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import EnhancedBusinessCard from "@/components/EnhancedBusinessCard";

const UserDashboard = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [visitHistory, setVisitHistory] = useState<any[]>([]);
  const [nearbyBusinesses, setNearbyBusinesses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      setUserProfile(profile);

      // Fetch wishlist
      const { data: wishlistData } = await supabase
        .from('user_wishlist')
        .select(`
          *,
          business_profiles (
            id,
            business_name,
            business_type,
            description,
            city,
            state,
            image_urls,
            monthly_price,
            category,
            status
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      setWishlist(wishlistData || []);

      // Fetch nearby businesses (sample data for now)
      const { data: businesses } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('status', 'approved')
        .limit(6);

      setNearbyBusinesses(businesses || []);

    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (businessId: string) => {
    try {
      const isInWishlist = wishlist.some(item => item.business_id === businessId);
      
      if (isInWishlist) {
        const { error } = await supabase
          .from('user_wishlist')
          .delete()
          .eq('user_id', user?.id)
          .eq('business_id', businessId);

        if (error) throw error;

        setWishlist(prev => prev.filter(item => item.business_id !== businessId));
        toast.success('Removed from wishlist');
      } else {
        const { error } = await supabase
          .from('user_wishlist')
          .insert({
            user_id: user?.id,
            business_id: businessId
          });

        if (error) throw error;

        // Refetch wishlist to get complete data
        fetchUserData();
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  const handleBookNow = (business: any) => {
    toast.info('Booking feature coming soon!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const filteredBusinesses = nearbyBusinesses.filter(business => {
    const matchesSearch = searchTerm === "" || 
      business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === "" ||
      business.city.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="My Dashboard - GymSpaYoga"
        description="Discover gyms, spas, and yoga studios. Manage your wellness journey."
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {userProfile?.full_name || 'User'}!
              </h1>
              <p className="text-gray-600 mt-1">Discover your next wellness destination</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Wishlist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wishlist.length}</div>
              <p className="text-xs text-gray-500 mt-1">Saved businesses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <History className="h-4 w-4" />
                Visited
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{visitHistory.length}</div>
              <p className="text-xs text-gray-500 mt-1">Profiles viewed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Star className="h-4 w-4" />
                Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-500 mt-1">Reviews written</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="discover" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist ({wishlist.length})</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Search Section */}
            <Card>
              <CardHeader>
                <CardTitle>Find Your Perfect Wellness Destination</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search gyms, spas, yoga studios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12"
                    />
                  </div>
                  
                  <div className="relative flex-1">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Location..."
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="pl-12"
                    />
                  </div>
                  
                  <Button>
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>

                {/* Quick Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-100">
                    Gyms
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-100">
                    Spas
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-100">
                    Yoga Studios
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-100">
                    Premium
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-100">
                    Budget Friendly
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-100">
                    Verified
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Businesses */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Discover Near You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <EnhancedBusinessCard
                    key={business.id}
                    id={business.id}
                    name={business.business_name}
                    description={business.description || 'Premium wellness destination'}
                    image={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
                    category={business.category}
                    location={`${business.city}, ${business.state}`}
                    price={`₹${business.monthly_price}/month`}
                    onBookNow={() => handleBookNow(business)}
                    verified={business.status === 'approved'}
                    trending={false}
                    featured={true}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Your Wishlist
                </CardTitle>
                <p className="text-sm text-gray-600">Businesses you've saved for later</p>
              </CardHeader>
              <CardContent>
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                      <EnhancedBusinessCard
                        key={item.business_profiles.id}
                        id={item.business_profiles.id}
                        name={item.business_profiles.business_name}
                        description={item.business_profiles.description || 'Premium wellness destination'}
                        image={item.business_profiles.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
                        category={item.business_profiles.category}
                        location={`${item.business_profiles.city}, ${item.business_profiles.state}`}
                        price={`₹${item.business_profiles.monthly_price}/month`}
                        onBookNow={() => handleBookNow(item.business_profiles)}
                        verified={item.business_profiles.status === 'approved'}
                        trending={false}
                        featured={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No saved businesses yet</h3>
                    <p className="text-gray-500 mb-6">Start exploring and save your favorite wellness destinations</p>
                    <Button>
                      <Search className="h-4 w-4 mr-2" />
                      Discover Businesses
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Your Activity
                </CardTitle>
                <p className="text-sm text-gray-600">Businesses you've recently viewed</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <History className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
                  <p className="text-gray-500 mb-6">Your viewing history will appear here as you explore</p>
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Start Exploring
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Your Reviews
                </CardTitle>
                <p className="text-sm text-gray-600">Share your experiences and help others discover great places</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-500 mb-6">Visit some businesses and share your experiences</p>
                  <Button>
                    <Camera className="h-4 w-4 mr-2" />
                    Write Your First Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
