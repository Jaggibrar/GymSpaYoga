
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Loader2, Plus, Edit, Trash2, Eye, MapPin, Clock, DollarSign, Building } from 'lucide-react';
import BusinessListingEditor from './BusinessListingEditor';

interface BusinessListing {
  id: string;
  business_name: string;
  business_type: string;
  category: string;
  city: string;
  state: string;
  session_price: number;
  monthly_price: number;
  status: string;
  image_urls: string[];
  created_at: string;
}

const BusinessListingsManager = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<BusinessListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (user) {
      fetchListings();
    }
  }, [user]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error: any) {
      console.error('Error fetching listings:', error);
      toast.error('Failed to fetch business listings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (listingId: string) => {
    try {
      const { error } = await supabase
        .from('business_profiles')
        .delete()
        .eq('id', listingId);

      if (error) throw error;
      
      toast.success('Business listing deleted successfully');
      fetchListings();
    } catch (error: any) {
      console.error('Error deleting listing:', error);
      toast.error('Failed to delete listing');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierLabel = (monthlyPrice?: number, sessionPrice?: number) => {
    if (monthlyPrice) {
      if (monthlyPrice >= 5000) return 'Luxury';
      if (monthlyPrice >= 3000) return 'Premium';
      return 'Budget';
    }
    if (sessionPrice) {
      if (sessionPrice >= 2000) return 'Luxury';
      if (sessionPrice >= 1000) return 'Premium';
      return 'Budget';
    }
    return 'Budget';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading your business listings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Business Listings</h2>
        <Button 
          onClick={() => {
            setIsCreating(true);
            setSelectedListing(null);
            setShowEditor(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Business
        </Button>
      </div>

      {listings.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Business Listings Yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first business listing to start receiving bookings
            </p>
            <Button 
              onClick={() => {
                setIsCreating(true);
                setSelectedListing(null);
                setShowEditor(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Listing
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{listing.business_name}</CardTitle>
                  <Badge className={getStatusColor(listing.status)}>
                    {listing.status}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="h-4 w-4 mr-1" />
                  {listing.business_type}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {listing.image_urls && listing.image_urls.length > 0 && (
                  <img 
                    src={listing.image_urls[0]} 
                    alt={listing.business_name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {listing.city}, {listing.state}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <Badge variant="outline">
                    {getTierLabel(listing.monthly_price, listing.session_price)}
                  </Badge>
                  {listing.monthly_price && (
                    <div className="flex items-center text-green-600 font-semibold">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ₹{listing.monthly_price}/month
                    </div>
                  )}
                  {listing.session_price && !listing.monthly_price && (
                    <div className="flex items-center text-green-600 font-semibold">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ₹{listing.session_price}/session
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedListing(listing.id);
                      setIsCreating(false);
                      setShowEditor(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Business Listing</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this business listing? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDelete(listing.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Editor Dialog */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <BusinessListingEditor
            listing={selectedListing ? listings.find(l => l.id === selectedListing) : undefined}
            onSave={() => {
              setShowEditor(false);
              fetchListings();
            }}
            onCancel={() => setShowEditor(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessListingsManager;
