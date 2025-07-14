
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, Clock, Phone, Heart, Users, ArrowLeft } from "lucide-react";
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

const YogaDetails = () => {
  const { id } = useParams();
  const [studio, setStudio] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchStudioDetails(id);
    }
  }, [id]);

  const fetchStudioDetails = async (studioId: string) => {
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('id', studioId)
        .eq('business_type', 'yoga')
        .eq('status', 'approved')
        .maybeSingle();

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading studio details...</p>
        </div>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Heart className="h-12 w-12 text-green-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Studio not found</h2>
            <p className="text-gray-600 mb-6">The yoga studio you're looking for doesn't exist.</p>
            <Link to="/yoga">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Yoga
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/yoga" className="flex items-center space-x-2 hover:text-green-600 transition-colors duration-300">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Yoga</span>
              </Link>
              <Link to="/" className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
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
              <img src={studio.image_urls?.[0] || "/placeholder.svg"} alt={studio.business_name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4">
                <Badge className="bg-blue-500 hover:bg-blue-600 capitalize">
                  {studio.category}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {studio.image_urls?.slice(1, 3).map((image, index) => (
                <div key={index} className="relative h-48 rounded-xl overflow-hidden">
                  <img src={image} alt={`${studio.business_name} ${index + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{studio.business_name}</h1>
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold">4.7</span>
                    <span className="text-gray-500">(76 reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  {studio.monthly_price && (
                    <p className="text-3xl font-bold text-green-600">₹{studio.monthly_price}</p>
                  )}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{studio.city}, {studio.state}</p>
                    <p className="text-sm text-gray-600">{studio.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span>{studio.opening_time} - {studio.closing_time}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>{studio.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span>8 Certified Instructors</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <BookingForm
                  businessId={studio.id}
                  businessType="yoga"
                  businessName={studio.business_name}
                />
                <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50 text-lg py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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
              <h2 className="text-2xl font-bold mb-4">About {studio.business_name}</h2>
              <p className="text-gray-600 leading-relaxed">
                {studio.description || "Experience authentic yoga practice in a peaceful environment. Our studio offers traditional and modern yoga styles taught by certified instructors, focusing on mind-body harmony and spiritual well-being."}
              </p>
            </Card>

            {/* Amenities */}
            {studio.amenities && studio.amenities.length > 0 && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Studio Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  {studio.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Pricing Options */}
          <div>
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Membership Options</h2>
              <div className="space-y-4">
                {studio.monthly_price && (
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Monthly</h3>
                      <span className="text-xl font-bold text-green-600">₹{studio.monthly_price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">1 Month</p>
                    <p className="text-sm text-gray-500">Unlimited classes</p>
                  </div>
                )}
                {studio.session_price && (
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Drop-in</h3>
                      <span className="text-xl font-bold text-green-600">₹{studio.session_price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Single Class</p>
                    <p className="text-sm text-gray-500">1 Class</p>
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

export default YogaDetails;
