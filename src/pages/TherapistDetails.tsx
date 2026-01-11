import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Sparkles } from "lucide-react";
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

const TherapistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTherapistDetails(id);
    }
  }, [id]);

  const fetchTherapistDetails = async (therapistId: string) => {
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('id', therapistId)
        .eq('business_type', 'therapist')
        .eq('status', 'approved')
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast.error('Therapist not found');
        return;
      }
      setTherapist(data);
    } catch (error) {
      console.error('Error fetching therapist details:', error);
      toast.error('Failed to load therapist details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground font-medium">Loading therapist details...</p>
        </div>
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Heart className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Therapist not found</h2>
            <p className="text-muted-foreground mb-6">The therapist you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare pricing options
  const pricingOptions = [];
  if (therapist.session_price) {
    pricingOptions.push({
      type: 'session' as const,
      price: therapist.session_price,
      title: 'Single Session',
      duration: 'Per Session',
      description: 'Perfect for trying therapy services',
      features: ['60-90 minute session', 'Professional therapist', 'Personalized treatment']
    });
  }
  if (therapist.monthly_price) {
    pricingOptions.push({
      type: 'monthly' as const,
      price: therapist.monthly_price,
      title: 'Monthly Package',
      duration: 'Unlimited for 1 Month',
      description: 'Best value for ongoing therapy',
      isPopular: true,
      features: ['Unlimited sessions', 'Priority booking', 'Progress tracking', 'Wellness consultation']
    });
  }

  return (
    <ListingLayout
      backLink="/therapists"
      backText="Back to Therapists"
      brandIcon={<Heart className="h-7 w-7 text-white" />}
      brandGradient="from-pink-500 to-rose-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <MediaGallery
            images={therapist.image_urls || []}
            name={therapist.business_name}
            category={therapist.category}
          />

          <AboutSection
            businessName={therapist.business_name}
            description={therapist.description || `Professional ${therapist.category} therapy services with experienced and certified therapists.`}
            icon={<Sparkles className="h-5 w-5 text-white" />}
            gradient="from-pink-500 to-rose-600"
          />

          {therapist.amenities && therapist.amenities.length > 0 && (
            <AmenitiesGrid amenities={therapist.amenities} />
          )}

          {pricingOptions.length > 0 && (
            <PricingBox
              options={pricingOptions}
              title="Therapy Packages"
              icon={<Heart className="h-5 w-5 text-white" />}
              gradient="from-pink-500 to-rose-600"
            />
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* WhatsApp Button */}
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <WhatsAppButton
                phoneNumber={therapist.phone}
                businessName={therapist.business_name}
                variant="default"
                size="lg"
                className="w-full bg-[#005EB8] hover:bg-[#004d96]"
              />
            </CardContent>
          </Card>

          <BookingPanel
            businessId={therapist.id}
            businessName={therapist.business_name}
            businessType="gym"
            rating={4.7}
            reviewCount={89}
            location={{
              city: therapist.city,
              state: therapist.state,
              address: therapist.address
            }}
            hours={{
              opening: therapist.opening_time,
              closing: therapist.closing_time
            }}
            phone={therapist.phone}
            pricing={{
              session: therapist.session_price,
              monthly: therapist.monthly_price
            }}
          />
        </div>
      </div>
    </ListingLayout>
  );
};

export default TherapistDetails;
