
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BusinessListingEditor from '@/components/business/BusinessListingEditor';

interface BusinessListing {
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
}

const EditListing = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [listing, setListing] = useState<BusinessListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (id) {
      fetchListing();
    }
  }, [id, user]);

  const fetchListing = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('id', id)
        .eq('user_id', user?.id) // Ensure user can only edit their own listings
        .maybeSingle();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Listing not found or you do not have permission to edit it.');
        } else {
          throw error;
        }
        return;
      }

      setListing(data);
    } catch (err: any) {
      console.error('Error fetching listing:', err);
      setError('Failed to load listing details');
      toast.error('Failed to load listing details');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    toast.success('Listing updated successfully!');
    navigate('/business-dashboard');
  };

  const handleCancel = () => {
    navigate('/business-dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
          <span className="text-gray-600">Loading listing details...</span>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Listing not found'}
          </h1>
          <Button onClick={() => navigate('/business-dashboard')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/business-dashboard')} 
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Business Listing</h1>
          <p className="text-gray-600 mt-2">Update your business information and details</p>
        </div>

        <BusinessListingEditor
          listing={listing}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default EditListing;
