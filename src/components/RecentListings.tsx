
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star, Crown, Diamond, IndianRupee } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';

interface RecentListing {
  id: string;
  business_name: string;
  business_type: string;
  category: string;
  city: string;
  state: string;
  image_urls: string[];
  monthly_price?: number;
  session_price?: number;
  created_at: string;
}

const RecentListings = () => {
  const [listings, setListings] = useState<RecentListing[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        const { data, error } = await supabase
          .from('business_profiles')
          .select('id, business_name, business_type, category, city, state, image_urls, monthly_price, session_price, created_at')
          .eq('status', 'approved')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        setListings(data || []);
      } catch (error) {
        console.error('Error fetching recent listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentListings();

    // Set up real-time subscription for new listings
    const channel = supabase
      .channel('business-listings')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'business_profiles'
        },
        () => fetchRecentListings()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleCardClick = (listing: RecentListing) => {
    const businessType = listing.business_type.toLowerCase();
    switch (businessType) {
      case 'gym':
        navigate(`/gyms`);
        break;
      case 'spa':
        navigate(`/spas`);
        break;
      case 'yoga':
        navigate(`/yoga`);
        break;
      default:
        navigate(`/explore`);
    }
  };

  const getTierIcon = (price?: number) => {
    if (!price) return <IndianRupee className="h-4 w-4" />;
    if (price >= 5000) return <Crown className="h-4 w-4" />;
    if (price >= 3000) return <Diamond className="h-4 w-4" />;
    return <IndianRupee className="h-4 w-4" />;
  };

  const getTierColor = (price?: number) => {
    if (!price) return "from-green-500 to-green-600";
    if (price >= 5000) return "from-yellow-500 to-yellow-600";
    if (price >= 3000) return "from-blue-500 to-blue-600";
    return "from-green-500 to-green-600";
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recently Listed</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Recently Listed</h2>
          <p className="text-lg text-gray-600">Discover the newest wellness destinations in your area</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card 
              key={listing.id} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer transform hover:scale-105 rounded-xl"
              onClick={() => handleCardClick(listing)}
            >
              <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                <OptimizedImage 
                  src={listing.image_urls[0] || "/placeholder.svg"} 
                  alt={listing.business_name}
                  className="group-hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={200}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={`bg-gradient-to-r ${getTierColor(listing.monthly_price || listing.session_price)} text-white`}>
                    {getTierIcon(listing.monthly_price || listing.session_price)}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">{listing.business_name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{listing.city}, {listing.state}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs capitalize">
                    {listing.business_type}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>
                      {new Date(listing.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentListings;
