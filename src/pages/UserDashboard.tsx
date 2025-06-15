import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useBusinessData } from "@/hooks/useBusinessData";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Camera,
  Crown,
  Diamond,
  IndianRupee
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
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const { businesses: nearbyBusinesses } = useBusinessData(undefined, searchTerm, locationFilter, tierFilter === 'all' ? undefined : tierFilter);

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'luxury': return <Crown className="h-3 w-3" />;
      case 'premium': return <Diamond className="h-3 w-3" />;
      default: return <IndianRupee className="h-3 w-3" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'luxury': return "from-yellow-500 to-yellow-600";
      case 'premium': return "from-blue-500 to-blue-600";
      default: return "from-green-500 to-green-600";
    }
  };

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
            session_price,
            category,
            status
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      setWishlist(wishlistData || []);

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
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search gyms, spas, yoga studios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12"
                    />
                  </div>
                  
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Location..."
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="pl-12"
                    />
                  </div>
                  
                  <Select value={tierFilter} onValueChange={setTierFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tiers</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="budget">Budget Friendly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quick Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Link to="/gyms">
                    <Badge variant="outline" className="cursor-pointer hover:bg-red-100">
                      Gyms
                    </Badge>
                  </Link>
                  <Link to="/spas">
                    <Badge variant="outline" className="cursor-pointer hover:bg-blue-100">
                      Spas
                    </Badge>
                  </Link>
                  <Link to="/yoga">
                    <Badge variant="outline" className="cursor-pointer hover:bg-purple-100">
                      Yoga Studios
                    </Badge>
                  </Link>
                  <Link to="/trainers">
                    <Badge variant="outline" className="cursor-pointer hover:bg-emerald-100">
                      Trainers
                    </Badge>
                  </Link>
                  <Badge 
                    variant="outline" 
                    className={`cursor-pointer ${tierFilter === 'luxury' ? 'bg-yellow-100' : 'hover:bg-yellow-100'}`}
                    onClick={() => setTierFilter(tierFilter === 'luxury' ? 'all' : 'luxury')}
                  >
                    <Crown className="h-3 w-3 mr-1" />
                    Luxury
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`cursor-pointer ${tierFilter === 'premium' ? 'bg-blue-100' : 'hover:bg-blue-100'}`}
                    onClick={() => setTierFilter(tierFilter === 'premium' ? 'all' : 'premium')}
                  >
                    <Diamond className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`cursor-pointer ${tierFilter === 'budget' ? 'bg-green-100' : 'hover:bg-green-100'}`}
                    onClick={() => setTierFilter(tierFilter === 'budget' ? 'all' : 'budget')}
                  >
                    <IndianRupee className="h-3 w-3 mr-1" />
                    Budget
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Businesses */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Discover Near You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbyBusinesses.slice(0, 6).map((business) => {
                  const tier = business.tier || 'budget';
                  return (
                    <Card key={business.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"} 
                          alt={business.business_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className={`absolute top-3 right-3 bg-gradient-to-r ${getTierColor(tier)} text-white`}>
                          {getTierIcon(tier)}
                          <span className="ml-1 capitalize">{tier}</span>
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-3 left-3 text-white hover:bg-white/20"
                          onClick={() => toggleWishlist(business.id)}
                        >
                          <Heart className={`h-4 w-4 ${wishlist.some(item => item.business_id === business.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                          {business.business_name}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{business.city}, {business.state}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {business.description || "Premium wellness destination"}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">4.7</span>
                            <span className="text-sm text-gray-500">(142)</span>
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">
                            {business.business_type}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold text-blue-600">
                            {business.monthly_price ? `₹${business.monthly_price}/month` : business.session_price ? `₹${business.session_price}/session` : "Contact"}
                          </p>
                          <Button 
                            size="sm" 
                            onClick={() => handleBookNow(business)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
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
                    {wishlist.map((item) => {
                      const business = item.business_profiles;
                      const tier = business.monthly_price >= 5000 || business.session_price >= 2000 ? 'luxury' :
                                  business.monthly_price >= 3000 || business.session_price >= 1000 ? 'premium' : 'budget';
                      
                      return (
                        <Card key={business.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"} 
                              alt={business.business_name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <Badge className={`absolute top-3 right-3 bg-gradient-to-r ${getTierColor(tier)} text-white`}>
                              {getTierIcon(tier)}
                              <span className="ml-1 capitalize">{tier}</span>
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-3 left-3 text-white hover:bg-white/20"
                              onClick={() => toggleWishlist(business.id)}
                            >
                              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                            </Button>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                              {business.business_name}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{business.city}, {business.state}</span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {business.description || "Premium wellness destination"}
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-lg font-bold text-blue-600">
                                {business.monthly_price ? `₹${business.monthly_price}/month` : business.session_price ? `₹${business.session_price}/session` : "Contact"}
                              </p>
                              <Button 
                                size="sm" 
                                onClick={() => handleBookNow(business)}
                              >
                                Book Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
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
