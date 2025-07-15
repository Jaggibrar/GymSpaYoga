
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Waves, Heart, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ListingLayout from "@/components/listing/ListingLayout";
import MediaGallery from "@/components/listing/MediaGallery";
import BookingPanel from "@/components/listing/BookingPanel";
import AboutSection from "@/components/listing/AboutSection";
import AmenitiesGrid from "@/components/listing/AmenitiesGrid";
import PricingBox from "@/components/listing/PricingBox";

interface Business {
  id: string;
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

const SpaDetails = () => {
  const { id } = useParams();
  const [spa, setSpa] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchSpaDetails(id);
    }
  }, [id]);

  const fetchSpaDetails = async (spaId: string) => {
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('id', spaId)
        .eq('business_type', 'spa')
        .eq('status', 'approved')
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast.error('Spa not found');
        return;
      }
      setSpa(data);
    } catch (error) {
      console.error('Error fetching spa details:', error);
      toast.error('Failed to load spa details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground font-medium">Loading spa details...</p>
        </div>
      </div>
    );
  }

  if (!spa) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Waves className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Spa not found</h2>
            <p className="text-muted-foreground mb-6">The spa you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare pricing options
  const pricingOptions = [];
  if (spa.session_price) {
    pricingOptions.push({
      type: 'session' as const,
      price: spa.session_price,
      title: 'Per Session',
      duration: 'Single Session',
      description: 'Perfect for trying out our services',
      features: ['60-90 minute session', 'Expert therapists', 'Premium products']
    });
  }
  if (spa.monthly_price) {
    pricingOptions.push({
      type: 'monthly' as const,
      price: spa.monthly_price,
      title: 'Monthly Package',
      duration: 'Unlimited for 1 Month',
      description: 'Best value for regular spa visitors',
      isPopular: true,
      features: ['Unlimited treatments', 'Priority booking', 'Complimentary add-ons', '10% off retail products']
    });
  }

  return (
    <ListingLayout
      backLink="/spas"
      backText="Back to Spas"
      brandIcon={<Waves className="h-7 w-7 text-white" />}
      brandGradient="from-blue-500 to-cyan-500"
    >
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Media & Content */}
        <div className="lg:col-span-2 space-y-8">
          <MediaGallery
            images={spa.image_urls || []}
            name={spa.business_name}
            category={spa.category}
          />

          <AboutSection
            businessName={spa.business_name}
            description={spa.description}
            defaultDescription="Experience ultimate relaxation and rejuvenation at our luxury spa. We offer a comprehensive range of wellness treatments designed to restore your mind, body, and spirit using premium products and expert techniques."
            icon={<Heart className="h-5 w-5 text-white" />}
            gradient="from-blue-500 to-cyan-500"
          />

          {spa.amenities && spa.amenities.length > 0 && (
            <AmenitiesGrid
              amenities={spa.amenities}
              title="Spa Amenities"
              icon={<Sparkles className="h-5 w-5 text-white" />}
              gradient="from-blue-500 to-cyan-500"
              defaultAmenities={[
                'Relaxation Lounge',
                'Steam Room',
                'Sauna',
                'Jacuzzi',
                'Private Treatment Rooms',
                'Changing Rooms',
                'Complimentary Refreshments',
                'Parking'
              ]}
            />
          )}

          {pricingOptions.length > 0 && (
            <PricingBox
              options={pricingOptions}
              title="Treatment Packages"
              icon={<Waves className="h-5 w-5 text-white" />}
              gradient="from-blue-500 to-cyan-500"
            />
          )}
        </div>

        {/* Right Column - Booking Panel */}
        <div className="lg:col-span-1">
          <BookingPanel
            businessId={spa.id}
            businessName={spa.business_name}
            businessType="spa"
            location={{
              city: spa.city,
              state: spa.state,
              address: spa.address
            }}
            hours={{
              opening: spa.opening_time,
              closing: spa.closing_time
            }}
            phone={spa.phone}
            pricing={{
              session: spa.session_price,
              monthly: spa.monthly_price
            }}
          />
        </div>
      </div>
    </ListingLayout>
  );
};

export default SpaDetails;
