
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Star, ArrowLeft, MessageCircle, Calendar, Heart } from 'lucide-react';
import { toast } from 'sonner';
import SEOHead from '@/components/SEOHead';

interface BusinessProfile {
  id: string;
  business_name: string;
  business_type: string;
  category: string;
  description: string;
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
  status: string;
  created_at: string;
}

const BusinessDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchBusinessDetails();
    }
  }, [id]);

  const fetchBusinessDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('id', id)
        .eq('status', 'approved')
        .single();

      if (error) throw error;
      setBusiness(data);
    } catch (error) {
      console.error('Error fetching business details:', error);
      toast.error('Failed to load business details');
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    if (business?.phone) {
      window.location.href = `tel:${business.phone}`;
    }
  };

  const handleBookNow = () => {
    if (business?.phone) {
      const message = `Hi, I'm interested in booking your services at ${business.business_name}. Could you please provide more details?`;
      const whatsappUrl = `https://wa.me/${business.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      toast.info('Please call the business directly to make a booking');
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getTierColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'luxury': return 'bg-purple-100 text-purple-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'budget': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Business Not Found</h1>
          <p className="text-gray-600 mb-6">The business you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${business.business_name} - ${business.business_type} | GymSpaYoga`}
        description={business.description || `Book ${business.business_name} - ${business.business_type} in ${business.city}`}
        keywords={`${business.business_name}, ${business.business_type}, ${business.city}, booking, fitness, wellness`}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Images */}
              {business.image_urls && business.image_urls.length > 0 && (
                <Card>
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={business.image_urls[currentImageIndex]}
                        alt={business.business_name}
                        className="w-full h-96 object-cover rounded-t-lg"
                      />
                      {business.image_urls.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {business.image_urls.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-3 h-3 rounded-full ${
                                currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Business Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{business.business_name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getTierColor(business.category)}>
                          {business.category?.charAt(0).toUpperCase() + business.category?.slice(1)}
                        </Badge>
                        <Badge variant="outline">{business.business_type}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">4.8</span>
                      <span className="text-gray-600">(124)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>{business.address}, {business.city}, {business.state} - {business.pin_code}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>
                      {formatTime(business.opening_time)} - {formatTime(business.closing_time)}
                    </span>
                    <Badge className="bg-green-100 text-green-800 ml-2">Open Now</Badge>
                  </div>

                  {business.description && (
                    <div>
                      <h3 className="font-semibold mb-2">About</h3>
                      <p className="text-gray-700 leading-relaxed">{business.description}</p>
                    </div>
                  )}

                  {business.amenities && business.amenities.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {business.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline">{amenity}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {business.monthly_price && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monthly</span>
                      <span className="text-2xl font-bold text-green-600">₹{business.monthly_price}</span>
                    </div>
                  )}
                  {business.session_price && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Per Session</span>
                      <span className="text-2xl font-bold text-green-600">₹{business.session_price}</span>
                    </div>
                  )}
                  {!business.monthly_price && !business.session_price && (
                    <p className="text-gray-600">Contact for pricing details</p>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <Button 
                    onClick={handleBookNow}
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCall}
                    className="w-full"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => toast.info('Message feature coming soon!')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{business.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-gray-500" />
                    <span>{business.email}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessDetails;
