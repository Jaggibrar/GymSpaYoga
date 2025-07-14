
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, Clock, Phone, Waves, Users, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import BookingForm from "@/components/booking/BookingForm";

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading spa details...</p>
        </div>
      </div>
    );
  }

  if (!spa) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Waves className="h-12 w-12 text-blue-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Spa not found</h2>
            <p className="text-gray-600 mb-6">The spa you're looking for doesn't exist.</p>
            <Link to="/spas">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Spas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/spas" className="flex items-center space-x-2 hover:text-blue-600 transition-colors duration-300">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Spas</span>
            </Link>
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                <Waves className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="relative h-96 rounded-2xl overflow-hidden mb-6">
              <img src={spa.image_urls?.[0] || "/placeholder.svg"} alt={spa.business_name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-500 hover:bg-yellow-600 capitalize">
                  {spa.category}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {spa.image_urls?.slice(1, 3).map((image, index) => (
                <div key={index} className="relative h-48 rounded-xl overflow-hidden">
                  <img src={image} alt={`${spa.business_name} ${index + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{spa.business_name}</h1>
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold">4.8</span>
                    <span className="text-gray-500">(89 reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  {spa.session_price && (
                    <p className="text-3xl font-bold text-blue-600">₹{spa.session_price}</p>
                  )}
                  <p className="text-sm text-gray-500">Starting from</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{spa.city}, {spa.state}</p>
                    <p className="text-sm text-gray-600">{spa.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span>{spa.opening_time} - {spa.closing_time}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>{spa.phone}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <BookingForm
                  businessId={spa.id}
                  businessType="spa"
                  businessName={spa.business_name}
                />
                <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 text-lg py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Call Now
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">About {spa.business_name}</h2>
              <p className="text-gray-600 leading-relaxed">
                {spa.description || "Experience ultimate relaxation and rejuvenation at our luxury spa. We offer a comprehensive range of wellness treatments designed to restore your mind, body, and spirit."}
              </p>
            </Card>

            {/* Amenities */}
            {spa.amenities && spa.amenities.length > 0 && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-1 gap-3">
                  {spa.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Pricing Section */}
          <div>
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Pricing</h2>
              <div className="space-y-4">
                {spa.session_price && (
                  <div className="border rounded-lg p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold">Per Session</h3>
                      <span className="text-xl font-bold text-blue-600">₹{spa.session_price}</span>
                    </div>
                    <p className="text-sm text-gray-600">Single treatment session</p>
                  </div>
                )}
                {spa.monthly_price && (
                  <div className="border rounded-lg p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold">Monthly Package</h3>
                      <span className="text-xl font-bold text-blue-600">₹{spa.monthly_price}</span>
                    </div>
                    <p className="text-sm text-gray-600">Unlimited treatments for one month</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaDetails;
