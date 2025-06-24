
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Star, 
  Calendar,
  DollarSign,
  Building
} from 'lucide-react';
import { toast } from 'sonner';
import BookingModal from '@/components/BookingModal';

interface Business {
  id: string;
  business_name: string;
  business_type: string;
  category: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  opening_time: string;
  closing_time: string;
  monthly_price?: number;
  session_price?: number;
  description: string;
  amenities: string[];
  image_urls: string[];
  status: string;
  created_at: string;
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
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Business not found');
        } else {
          throw error;
        }
        return;
      }

      setBusiness(data);
      
      // Update visit count
      await supabase.rpc('update_business_profile_visit', {
        business_profile_id: id
      });
      
    } catch (err: any) {
      console.error('Error fetching business details:', err);
      setError('Failed to load business details');
    } finally {
      setLoading(false);
    }
  };

  const getTier = (business: Business) => {
    const price = business.monthly_price || business.session_price || 0;
    if (price >= 5000) return 'Luxury';
    if (price >= 3000) return 'Premium';
    return 'Budget';
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
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
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate(-1)} 
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-900">
                      {business.business_name}
                    </CardTitle>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="secondary" className="capitalize">
                        {business.business_type}
                      </Badge>
                      <Badge variant="outline">
                        {getTier(business)} Tier
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 text-gray-600">4.8 (124)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {business.image_urls && business.image_urls.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {business.image_urls.slice(0, 6).map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`${business.business_name} ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400';
                        }}
                      />
                    ))}
                  </div>
                )}

                {business.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {business.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Amenities */}
            {business.amenities && business.amenities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Amenities & Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {business.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact & Booking */}
            <Card>
              <CardHeader>
                <CardTitle>Book Now</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(business.monthly_price || business.session_price) && (
                  <div className="text-center py-4 bg-emerald-50 rounded-lg">
                    {business.monthly_price && (
                      <div className="flex items-center justify-center text-2xl font-bold text-emerald-600">
                        <DollarSign className="h-6 w-6 mr-1" />
                        ₹{business.monthly_price}/month
                      </div>
                    )}
                    {business.session_price && !business.monthly_price && (
                      <div className="flex items-center justify-center text-2xl font-bold text-emerald-600">
                        <DollarSign className="h-6 w-6 mr-1" />
                        ₹{business.session_price}/session
                      </div>
                    )}
                  </div>
                )}

                <BookingModal
                  businessName={business.business_name}
                  businessType={business.business_type}
                  businessId={business.id}
                  price={business.monthly_price ? `₹${business.monthly_price}` : business.session_price ? `₹${business.session_price}` : undefined}
                  trigger={
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                  }
                />

                <a 
                  href={`tel:${business.phone}`}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Business Info */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600 text-sm">
                      {business.address}<br />
                      {business.city}, {business.state} {business.pin_code}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-gray-600 text-sm">
                      {formatTime(business.opening_time)} - {formatTime(business.closing_time)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600 text-sm">{business.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600 text-sm">{business.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
