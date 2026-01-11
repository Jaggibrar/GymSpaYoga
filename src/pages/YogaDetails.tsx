
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Flower2, Users, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ListingLayout from "@/components/listing/ListingLayout";
import MediaGallery from "@/components/listing/MediaGallery";
import BookingPanel from "@/components/listing/BookingPanel";
import AboutSection from "@/components/listing/AboutSection";
import AmenitiesGrid from "@/components/listing/AmenitiesGrid";
import PricingBox from "@/components/listing/PricingBox";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Business {
  id: string;
  slug?: string;
  business_name: string;
  business_type: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  opening_time: string;
  closing_time: string;
  amenities?: string[];
  image_urls?: string[];
  session_price?: number;
  monthly_price?: number;
  category: string;
}

const YogaDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [studio, setStudio] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchStudioDetails(slug);
    }
  }, [slug]);

  const fetchStudioDetails = async (slugOrId: string) => {
    try {
      // Try to fetch by slug first, fallback to ID for backward compatibility
      let query = supabase
        .from('business_profiles')
        .select('*')
        .eq('business_type', 'yoga')
        .eq('status', 'approved');

      // Check if it's a UUID (ID) or a slug
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);
      
      if (isUUID) {
        query = query.eq('id', slugOrId);
      } else {
        query = query.eq('slug', slugOrId);
      }

      const { data, error } = await query.maybeSingle();

      if (error) throw error;
      if (!data) {
        toast.error('Yoga studio not found');
        return;
      }
      setStudio(data);
    } catch (error) {
      console.error('Error fetching studio details:', error);
      toast.error('Failed to load studio details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground font-medium">Loading studio details...</p>
        </div>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Heart className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Studio not found</h2>
            <p className="text-muted-foreground mb-6">The yoga studio you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare pricing options
  const pricingOptions = [];
  if (studio.session_price) {
    pricingOptions.push({
      type: 'session' as const,
      price: studio.session_price,
      title: 'Drop-in Class',
      duration: 'Single Session',
      description: 'Perfect for trying our yoga classes',
      features: ['60-75 minute class', 'Mat and props included', 'All levels welcome']
    });
  }
  if (studio.monthly_price) {
    pricingOptions.push({
      type: 'monthly' as const,
      price: studio.monthly_price,
      title: 'Monthly Unlimited',
      duration: 'Unlimited Classes for 1 Month',
      description: 'Best value for dedicated practitioners',
      isPopular: true,
      features: ['Unlimited classes', 'Priority booking', 'Workshop discounts', 'Community events access']
    });
  }

  return (
    <ListingLayout
      backLink="/yoga"
      backText="Back to Yoga"
      brandIcon={<Heart className="h-7 w-7 text-white" />}
      brandGradient="from-[#005EB8] to-[#005EB8]"
    >
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Media & Content */}
        <div className="lg:col-span-2 space-y-8">
          <MediaGallery
            images={studio.image_urls || []}
            name={studio.business_name}
            category={studio.category}
          />

          <AboutSection
            businessName={studio.business_name}
            description={studio.description}
            defaultDescription="Experience authentic yoga practice in a peaceful environment. Our studio offers traditional and modern yoga styles taught by certified instructors, focusing on mind-body harmony and spiritual well-being."
            icon={<Flower2 className="h-5 w-5 text-white" />}
            gradient="from-[#005EB8] to-[#005EB8]"
          />

          {studio.amenities && studio.amenities.length > 0 && (
            <AmenitiesGrid
              amenities={studio.amenities}
              title="Studio Features"
              icon={<Users className="h-5 w-5 text-white" />}
              gradient="from-[#005EB8] to-[#005EB8]"
              defaultAmenities={[
                'Certified Instructors',
                'Natural Lighting',
                'Props & Equipment',
                'Meditation Space',
                'Changing Rooms',
                'Water Station',
                'Peaceful Environment',
                'Air Conditioning'
              ]}
            />
          )}

          {pricingOptions.length > 0 && (
            <PricingBox
              options={pricingOptions}
              title="Membership Options"
              icon={<Heart className="h-5 w-5 text-white" />}
              gradient="from-[#005EB8] to-[#005EB8]"
            />
          )}
        </div>

        {/* Right Column - Booking Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* WhatsApp Button */}
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <WhatsAppButton
                phoneNumber={studio.phone}
                businessName={studio.business_name}
                variant="default"
                size="lg"
                className="w-full bg-[#005EB8] hover:bg-[#004d96]"
              />
            </CardContent>
          </Card>

          <BookingPanel
            businessId={studio.id}
            businessName={studio.business_name}
            businessType="yoga"
            rating={4.7}
            reviewCount={76}
            location={{
              city: studio.city,
              state: studio.state,
              address: studio.address
            }}
            hours={{
              opening: studio.opening_time,
              closing: studio.closing_time
            }}
            phone={studio.phone}
            pricing={{
              session: studio.session_price,
              monthly: studio.monthly_price
            }}
          />
        </div>
      </div>
    </ListingLayout>
  );
};

export default YogaDetails;
