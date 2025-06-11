
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Clock, Building2 } from 'lucide-react';

interface BusinessProfile {
  id: string;
  business_name: string;
  business_type: string;
  category: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  status: string;
  created_at: string;
}

export const AdminBusinessList = () => {
  const [businesses, setBusinesses] = useState<BusinessProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      toast.error('Failed to load businesses');
    } finally {
      setLoading(false);
    }
  };

  const updateBusinessStatus = async (businessId: string, status: 'approved' | 'rejected') => {
    setUpdating(businessId);
    try {
      const { error } = await supabase
        .from('business_profiles')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', businessId);

      if (error) throw error;

      setBusinesses(prev => 
        prev.map(business => 
          business.id === businessId ? { ...business, status } : business
        )
      );

      toast.success(`Business ${status} successfully`);
    } catch (error) {
      console.error('Error updating business status:', error);
      toast.error('Failed to update business status');
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading businesses...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Building2 className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Business Applications</h3>
      </div>
      
      {businesses.length === 0 ? (
        <p className="text-gray-500">No business applications found.</p>
      ) : (
        <div className="grid gap-4">
          {businesses.map((business) => (
            <Card key={business.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{business.business_name}</CardTitle>
                    <p className="text-sm text-gray-600 capitalize">
                      {business.business_type} • {business.category}
                    </p>
                  </div>
                  <Badge className={getStatusColor(business.status)}>
                    {business.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Email:</strong> {business.email}</p>
                    <p><strong>Phone:</strong> {business.phone}</p>
                  </div>
                  <div>
                    <p><strong>Location:</strong> {business.city}, {business.state}</p>
                    <p><strong>Applied:</strong> {new Date(business.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {business.status === 'pending' && (
                  <div className="flex space-x-2 mt-4">
                    <Button
                      onClick={() => updateBusinessStatus(business.id, 'approved')}
                      disabled={updating === business.id}
                      className="bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => updateBusinessStatus(business.id, 'rejected')}
                      disabled={updating === business.id}
                      variant="destructive"
                      size="sm"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
