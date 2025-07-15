import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { supabase } from "@/integrations/supabase/client";
import { Dumbbell, Crown, Diamond, IndianRupee, Award, Zap } from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import ListingLayout from "@/components/listing/ListingLayout";
import MediaGallery from "@/components/listing/MediaGallery";
import BookingPanel from "@/components/listing/BookingPanel";
import AboutSection from "@/components/listing/AboutSection";
import AmenitiesGrid from "@/components/listing/AmenitiesGrid";
import PricingBox from "@/components/listing/PricingBox";

interface Gym {
  id: string;
  business_name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  phone: string;
  email: string;
  opening_time: string;
  closing_time: string;
  monthly_price?: number;
  session_price?: number;
  amenities: string[];
  image_urls: string[];
  tier?: string;
}

const GymDetails = () => {
  useScrollToTop();
  const { id } = useParams();
  const [gym, setGym] = useState<Gym | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  useEffect(() => {
    if (id) {
      fetchGymDetails(id);
    }
  }, [id]);

  const fetchGymDetails = async (gymId: string) => {
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('id', gymId)
        .eq('business_type', 'gym')
        .eq('status', 'approved')
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast.error('Gym not found');
        return;
      }
      setGym(data);
    } catch (error) {
      console.error('Error fetching gym details:', error);
      toast.error('Failed to load gym details');
    } finally {
      setLoading(false);
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'luxury': return <Crown className="h-5 w-5" />;
      case 'premium': return <Diamond className="h-5 w-5" />;
      default: return <IndianRupee className="h-5 w-5" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'luxury': return "from-yellow-500 to-yellow-600";
      case 'premium': return "from-blue-500 to-blue-600";
      default: return "from-green-500 to-green-600";
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground font-medium">Loading gym details...</p>
        </div>
      </div>
    );
  }

  if (!gym) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Dumbbell className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Gym not found</h2>
            <p className="text-muted-foreground mb-6">The gym you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare pricing options
  const pricingOptions = [];
  if (gym.session_price) {
    pricingOptions.push({
      type: 'session' as const,
      price: gym.session_price,
      title: 'Day Pass',
      duration: 'Single Session',
      description: 'Perfect for trying out our facilities',
      features: ['Full gym access', 'All equipment included', 'Beginner-friendly']
    });
  }
  if (gym.monthly_price) {
    pricingOptions.push({
      type: 'monthly' as const,
      price: gym.monthly_price,
      title: 'Monthly Membership',
      duration: 'Unlimited Access for 1 Month',
      description: 'Best value for serious fitness enthusiasts',
      isPopular: true,
      features: ['Unlimited gym access', 'Personal trainer consultation', 'Group class discounts', 'Locker privileges']
    });
  }

  return (
    <>
      <SEOHead
        title={`${gym.business_name} - Premium Gym Details`}
        description={gym.description || `Discover ${gym.business_name} - Premium fitness center with state-of-the-art equipment and professional trainers.`}
      />
      
      <ListingLayout
        backLink="/gyms"
        backText="Back to Gyms"
        brandIcon={<Dumbbell className="h-7 w-7 text-white" />}
        brandGradient="from-red-500 to-orange-500"
      >
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Media & Content */}
          <div className="lg:col-span-2 space-y-8">
            <MediaGallery
              images={gym.image_urls || []}
              name={gym.business_name}
              category={gym.tier || 'Premium'}
            />

            <AboutSection
              businessName={gym.business_name}
              description={gym.description}
              defaultDescription="Experience premium fitness at its finest with state-of-the-art equipment, expert trainers, and a motivating environment designed to help you achieve your fitness goals."
              icon={<Award className="h-5 w-5 text-white" />}
              gradient="from-red-500 to-orange-500"
            />

            <AmenitiesGrid
              amenities={gym.amenities || []}
              title="Gym Features & Equipment"
              icon={<Zap className="h-5 w-5 text-white" />}
              gradient="from-red-500 to-orange-500"
              defaultAmenities={[
                'State-of-the-art Equipment',
                'Personal Training',
                'Group Classes',
                'Locker Rooms',
                'Shower Facilities',
                'Air Conditioning',
                'Parking',
                'Free Wi-Fi'
              ]}
            />

            {pricingOptions.length > 0 && (
              <PricingBox
                options={pricingOptions}
                title="Membership Plans"
                icon={<Dumbbell className="h-5 w-5 text-white" />}
                gradient="from-red-500 to-orange-500"
              />
            )}
          </div>

          {/* Right Column - Booking Panel */}
          <div className="lg:col-span-1">
            <BookingPanel
              businessId={gym.id}
              businessName={gym.business_name}
              businessType="gym"
              rating={4.8}
              reviewCount={128}
              location={{
                city: gym.city,
                state: gym.state,
                address: gym.address
              }}
              hours={{
                opening: gym.opening_time,
                closing: gym.closing_time
              }}
              phone={gym.phone}
              pricing={{
                session: gym.session_price,
                monthly: gym.monthly_price
              }}
            />
          </div>
        </div>
      </ListingLayout>
    </>
  );
};

export default GymDetails;
