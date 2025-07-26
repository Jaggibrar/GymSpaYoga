
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Clock, Building2, Edit, Eye, Upload, X, Plus, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBusinessImageUpload } from '@/hooks/useBusinessImageUpload';

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
  pin_code?: string;
  description?: string;
  image_urls?: string[];
  status: string;
  created_at: string;
}

export const AdminBusinessList = () => {
  const [businesses, setBusinesses] = useState<BusinessProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [editingBusiness, setEditingBusiness] = useState<BusinessProfile | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<BusinessProfile>>({});
  const { uploadMultipleImages, uploading } = useBusinessImageUpload();

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

  const handleEditBusiness = (business: BusinessProfile) => {
    setEditingBusiness(business);
    setEditFormData(business);
  };

  const handleSaveEdit = async () => {
    if (!editingBusiness) return;
    
    setUpdating(editingBusiness.id);
    try {
      const { error } = await supabase
        .from('business_profiles')
        .update({
          ...editFormData,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingBusiness.id);

      if (error) throw error;

      setBusinesses(prev => 
        prev.map(business => 
          business.id === editingBusiness.id ? { ...business, ...editFormData } : business
        )
      );

      toast.success('Business updated successfully');
      setEditingBusiness(null);
    } catch (error) {
      console.error('Error updating business:', error);
      toast.error('Failed to update business');
    } finally {
      setUpdating(null);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!editingBusiness) return;
    
    try {
      const uploadedUrls = await uploadMultipleImages([file]);
      if (uploadedUrls.length > 0) {
        const currentImages = editFormData.image_urls || [];
        setEditFormData(prev => ({
          ...prev,
          image_urls: [...currentImages, ...uploadedUrls]
        }));
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const currentImages = editFormData.image_urls || [];
    setEditFormData(prev => ({
      ...prev,
      image_urls: currentImages.filter((_, index) => index !== indexToRemove)
    }));
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
                    <p><strong>Type:</strong> {business.business_type}</p>
                  </div>
                  <div>
                    <p><strong>Location:</strong> {business.city}, {business.state}</p>
                    <p><strong>Applied:</strong> {new Date(business.created_at).toLocaleDateString()}</p>
                    <p><strong>Images:</strong> {business.image_urls?.length || 0} uploaded</p>
                  </div>
                </div>

                {/* Show business images if available */}
                {business.image_urls && business.image_urls.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Current Images:</p>
                    <div className="flex gap-2 overflow-x-auto">
                      {business.image_urls.slice(0, 4).map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`${business.business_name} ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-lg border flex-shrink-0"
                        />
                      ))}
                      {business.image_urls.length > 4 && (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg border flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-gray-600">+{business.image_urls.length - 4}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {/* Always show View Details button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // You can implement a view-only modal here
                      toast.info('View details functionality can be added');
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>

                  {/* Edit button for all businesses */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditBusiness(business)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Business - {business.business_name}</DialogTitle>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Business Name</label>
                            <Input
                              value={editFormData.business_name || ''}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, business_name: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email</label>
                            <Input
                              value={editFormData.email || ''}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, email: e.target.value }))}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Phone</label>
                            <Input
                              value={editFormData.phone || ''}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, phone: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Status</label>
                            <Select
                              value={editFormData.status || ''}
                              onValueChange={(value) => setEditFormData(prev => ({ ...prev, status: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Address</label>
                          <Input
                            value={editFormData.address || ''}
                            onChange={(e) => setEditFormData(prev => ({ ...prev, address: e.target.value }))}
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium">City</label>
                            <Input
                              value={editFormData.city || ''}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, city: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">State</label>
                            <Input
                              value={editFormData.state || ''}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, state: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Pin Code</label>
                            <Input
                              value={editFormData.pin_code || ''}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, pin_code: e.target.value }))}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Description</label>
                          <Textarea
                            value={editFormData.description || ''}
                            onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={3}
                          />
                        </div>

                        {/* Image Management Section */}
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Business Images</label>
                            
                            {/* Current Images */}
                            {editFormData.image_urls && editFormData.image_urls.length > 0 && (
                              <div className="grid grid-cols-3 gap-2 mb-4">
                                {editFormData.image_urls.map((url, index) => (
                                  <div key={index} className="relative group">
                                    <img
                                      src={url}
                                      alt={`Business ${index + 1}`}
                                      className="w-full h-24 object-cover rounded-lg border"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveImage(index)}
                                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Upload New Image */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageUpload(file);
                                }}
                                className="hidden"
                                id="image-upload"
                                disabled={uploading}
                              />
                              <label
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center cursor-pointer"
                              >
                                {uploading ? (
                                  <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                    <span className="text-sm text-gray-600">Uploading...</span>
                                  </div>
                                ) : (
                                  <>
                                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-600">Click to upload image</span>
                                    <span className="text-xs text-gray-400">PNG, JPG up to 10MB</span>
                                  </>
                                )}
                              </label>
                            </div>
                          </div>
                         </div>

                         <div className="flex justify-end gap-2 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setEditingBusiness(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSaveEdit}
                            disabled={updating === editingBusiness?.id}
                          >
                            {updating === editingBusiness?.id ? 'Saving...' : 'Save Changes'}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Approve/Reject buttons only for pending */}
                  {business.status === 'pending' && (
                    <>
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
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
