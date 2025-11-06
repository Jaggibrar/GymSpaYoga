import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Phone, Mail, Star, Calendar, ArrowLeft, MessageCircle } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from 'sonner';
import SEOHead from '@/components/SEOHead';
import BookingForm from '@/components/booking/BookingForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { BusinessStructuredData } from '@/components/SEO/BusinessStructuredData';
import { generateImageAlt, getImageLoadingStrategy, getImageFetchPriority } from '@/utils/imageOptimization';

interface Business {
  id: string;
  business_name: string;
  business_type: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
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

const BusinessDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchBusinessDetails();
    }
  }, [id]);

  const fetchBusinessDetails = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('id', id)
        .eq('status', 'approved')
        .maybeSingle();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Business not found');
        } else {
          throw error;
        }
        return;
      }

      setBusiness(data);
    } catch (err: any) {
      console.error('Error fetching business details:', err);
      setError('Failed to load business details');
      toast.error('Failed to load business details');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleCall = () => {
    if (business?.phone) {
      window.location.href = `tel:${business.phone}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Business not found'}
          </h1>
          <Link to="/explore">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Explore
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${business.business_name} - ${business.business_type} | GymSpaYoga`}
        description={business.description || `Book ${business.business_name} - Professional ${business.business_type} services in ${business.city}, ${business.state}`}
        keywords={`${business.business_type}, ${business.city}, fitness, wellness, booking`}
      />
      <BusinessStructuredData business={business} />
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link to="/explore">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Explore
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {business.business_name}
                      </h1>
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="secondary" className="capitalize">
                          {business.business_type}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {business.category} Tier
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.7 (124 reviews)</span>
                    </div>
                  </div>

                  {business.description && (
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {business.description}
                    </p>
                  )}

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-gray-600">
                          {business.address}, {business.city}, {business.state}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Operating Hours</p>
                        <p className="text-gray-600">
                          {formatTime(business.opening_time)} - {formatTime(business.closing_time)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-600">{business.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">{business.email}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Images Gallery */}
              {business.image_urls && business.image_urls.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {business.image_urls.slice(0, 6).map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={generateImageAlt(business.business_name, business.business_type, business.category, `${business.city}, ${business.state}`)}
                          loading={getImageLoadingStrategy(index)}
                          fetchPriority={getImageFetchPriority(index)}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Amenities */}
              {business.amenities && business.amenities.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                    <div className="flex flex-wrap gap-2">
                      {business.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Pricing</h3>
                  <div className="space-y-3">
                    {business.monthly_price && (
                      <div className="flex justify-between items-center">
                        <span>Monthly Membership</span>
                        <span className="font-semibold text-emerald-600 text-lg">
                          ₹{business.monthly_price.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {business.session_price && (
                      <div className="flex justify-between items-center">
                        <span>Per Session</span>
                        <span className="font-semibold text-emerald-600 text-lg">
                          ₹{business.session_price.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {!business.monthly_price && !business.session_price && (
                      <p className="text-gray-600">Contact for pricing</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Booking Section */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-center">Book Your Session</h3>
                  <BookingForm
                    businessId={business.id}
                    businessType={business.business_type as 'gym' | 'spa' | 'yoga' | 'trainer'}
                    businessName={business.business_name}
                  />
                </CardContent>
              </Card>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <WhatsAppButton
                  phoneNumber={business.phone}
                  businessName={business.business_name}
                  variant="default"
                  size="lg"
                  className="w-full"
                />
                
                <Button 
                  onClick={handleCall}
                  variant="outline" 
                  className="w-full"
                  size="lg"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessDetails;
