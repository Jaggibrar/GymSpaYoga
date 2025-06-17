
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
    fetchListings();
  }, [user]);

  const fetchListings = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to fetch listings');
        return;
      }

      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  const deleteListing = async (listingId: string) => {
    try {
      const { error } = await supabase
        .from('business_profiles')
        .delete()
        .eq('id', listingId)
        .eq('user_id', user?.id);

      if (error) {
        toast.error('Failed to delete listing');
        return;
      }

      toast.success('Listing deleted successfully');
      fetchListings();
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast.error('Failed to delete listing');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateNew = () => {
    setSelectedListing(null);
    setIsCreating(true);
    setShowEditor(true);
  };

  const handleEdit = (listingId: string) => {
    setSelectedListing(listingId);
    setIsCreating(false);
    setShowEditor(true);
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setSelectedListing(null);
    setIsCreating(false);
    fetchListings();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Listings</h2>
          <p className="text-gray-600">Manage your business listings and track their status</p>
        </div>
        <Button 
          onClick={handleCreateNew}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Listing
        </Button>
      </div>

      {listings.length === 0 ? (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No listings yet</h3>
            <p className="text-gray-500 mb-6">Create your first business listing to get started</p>
            <Button 
              onClick={handleCreateNew}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Listing
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative">
                {listing.image_urls.length > 0 ? (
                  <img 
                    src={listing.image_urls[0]} 
                    alt={listing.business_name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-t-lg flex items-center justify-center">
                    <Building className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <Badge className={`absolute top-3 right-3 ${getStatusColor(listing.status)}`}>
                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{listing.business_name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Badge variant="outline" className="capitalize">
                    {listing.business_type}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {listing.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {listing.city}, {listing.state}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  {listing.session_price > 0 && `₹${listing.session_price}/session`}
                  {listing.session_price > 0 && listing.monthly_price > 0 && ' • '}
                  {listing.monthly_price > 0 && `₹${listing.monthly_price}/month`}
                </div>

                <div className="flex gap-2 pt-3">
                  <Button 
                    size="sm" 
                    onClick={() => handleEdit(listing.id)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Listing</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{listing.business_name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => deleteListing(listing.id)}
                          className="bg-red-500 hover:bg-red-600"
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
            listingId={selectedListing || undefined}
            onSave={handleEditorClose}
            onCancel={handleEditorClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessListingsManager;
