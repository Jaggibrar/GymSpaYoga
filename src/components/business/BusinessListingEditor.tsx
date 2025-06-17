
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useBusinessImageUpload } from '@/hooks/useBusinessImageUpload';
import { toast } from 'sonner';
import { Loader2, Upload, X, Edit, Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

interface BusinessListing {
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
  amenities: string[];
  image_urls: string[];
  session_price: number;
  monthly_price: number;
  status: string;
}

interface BusinessListingEditorProps {
  listingId?: string;
  onSave?: () => void;
  onCancel?: () => void;
}

const BusinessListingEditor = ({ listingId, onSave, onCancel }: BusinessListingEditorProps) => {
  const { user } = useAuth();
  const { uploadMultipleImages, uploading } = useBusinessImageUpload();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [listing, setListing] = useState<BusinessListing>({
    id: '',
    business_name: '',
    business_type: 'gym',
    category: 'budget',
    description: '',
    address: '',
    city: '',
    state: '',
    pin_code: '',
    phone: '',
    email: '',
    opening_time: '09:00',
    closing_time: '21:00',
    amenities: [],
    image_urls: [],
    session_price: 0,
    monthly_price: 0,
    status: 'pending'
  });
  const [newAmenity, setNewAmenity] = useState('');

  useEffect(() => {
    if (listingId) {
      fetchListing();
    }
  }, [listingId]);

  const fetchListing = async () => {
    if (!listingId) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('id', listingId)
        .eq('user_id', user?.id)
        .single();

      if (error) {
        toast.error('Failed to fetch listing');
        return;
      }

      if (data) {
        setListing({
          id: data.id,
          business_name: data.business_name,
          business_type: data.business_type,
          category: data.category,
          description: data.description || '',
          address: data.address,
          city: data.city,
          state: data.state,
          pin_code: data.pin_code,
          phone: data.phone,
          email: data.email,
          opening_time: data.opening_time,
          closing_time: data.closing_time,
          amenities: data.amenities || [],
          image_urls: data.image_urls || [],
          session_price: data.session_price || 0,
          monthly_price: data.monthly_price || 0,
          status: data.status
        });
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
      toast.error('Failed to fetch listing');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (files: File[]) => {
    try {
      const uploadedUrls = await uploadMultipleImages(files);
      if (uploadedUrls.length > 0) {
        setListing(prev => ({
          ...prev,
          image_urls: [...prev.image_urls, ...uploadedUrls]
        }));
        toast.success(`Successfully uploaded ${uploadedUrls.length} image(s)`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images');
    }
  };

  const removeImage = (indexToRemove: number) => {
    setListing(prev => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, index) => index !== indexToRemove)
    }));
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !listing.amenities.includes(newAmenity.trim())) {
      setListing(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const removeAmenity = (amenityToRemove: string) => {
    setListing(prev => ({
      ...prev,
      amenities: prev.amenities.filter(amenity => amenity !== amenityToRemove)
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const listingData = {
        user_id: user.id,
        business_name: listing.business_name,
        business_type: listing.business_type,
        category: listing.category,
        description: listing.description,
        address: listing.address,
        city: listing.city,
        state: listing.state,
        pin_code: listing.pin_code,
        phone: listing.phone,
        email: listing.email,
        opening_time: listing.opening_time,
        closing_time: listing.closing_time,
        amenities: listing.amenities,
        image_urls: listing.image_urls,
        session_price: listing.session_price || null,
        monthly_price: listing.monthly_price || null,
        updated_at: new Date().toISOString()
      };

      let error;
      if (listingId) {
        // Update existing listing
        const { error: updateError } = await supabase
          .from('business_profiles')
          .update(listingData)
          .eq('id', listingId)
          .eq('user_id', user.id);
        error = updateError;
      } else {
        // Create new listing
        const { error: insertError } = await supabase
          .from('business_profiles')
          .insert([listingData]);
        error = insertError;
      }

      if (error) {
        toast.error('Failed to save listing');
        return;
      }

      toast.success(listingId ? 'Listing updated successfully' : 'Listing created successfully');
      onSave?.();
    } catch (error) {
      console.error('Error saving listing:', error);
      toast.error('Failed to save listing');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-white">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Edit className="h-5 w-5" />
          {listingId ? 'Edit Listing' : 'Create New Listing'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="business_name">Business Name *</Label>
            <Input
              id="business_name"
              value={listing.business_name}
              onChange={(e) => setListing(prev => ({ ...prev, business_name: e.target.value }))}
              placeholder="Enter business name"
            />
          </div>
          <div>
            <Label htmlFor="business_type">Business Type *</Label>
            <Select value={listing.business_type} onValueChange={(value) => setListing(prev => ({ ...prev, business_type: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gym">Gym</SelectItem>
                <SelectItem value="spa">Spa</SelectItem>
                <SelectItem value="yoga">Yoga Studio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={listing.category} onValueChange={(value) => setListing(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              value={listing.phone}
              onChange={(e) => setListing(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={listing.description}
            onChange={(e) => setListing(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your business"
            rows={3}
          />
        </div>

        {/* Address Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Address Information</h3>
          <div>
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              value={listing.address}
              onChange={(e) => setListing(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Enter full address"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={listing.city}
                onChange={(e) => setListing(prev => ({ ...prev, city: e.target.value }))}
                placeholder="City"
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={listing.state}
                onChange={(e) => setListing(prev => ({ ...prev, state: e.target.value }))}
                placeholder="State"
              />
            </div>
            <div>
              <Label htmlFor="pin_code">PIN Code *</Label>
              <Input
                id="pin_code"
                value={listing.pin_code}
                onChange={(e) => setListing(prev => ({ ...prev, pin_code: e.target.value }))}
                placeholder="PIN Code"
              />
            </div>
          </div>
        </div>

        {/* Timing and Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Operating Hours</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="opening_time">Opening Time</Label>
                <Input
                  id="opening_time"
                  type="time"
                  value={listing.opening_time}
                  onChange={(e) => setListing(prev => ({ ...prev, opening_time: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="closing_time">Closing Time</Label>
                <Input
                  id="closing_time"
                  type="time"
                  value={listing.closing_time}
                  onChange={(e) => setListing(prev => ({ ...prev, closing_time: e.target.value }))}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pricing</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="session_price">Session Price (₹)</Label>
                <Input
                  id="session_price"
                  type="number"
                  value={listing.session_price}
                  onChange={(e) => setListing(prev => ({ ...prev, session_price: parseInt(e.target.value) || 0 }))}
                  placeholder="Price per session"
                />
              </div>
              <div>
                <Label htmlFor="monthly_price">Monthly Price (₹)</Label>
                <Input
                  id="monthly_price"
                  type="number"
                  value={listing.monthly_price}
                  onChange={(e) => setListing(prev => ({ ...prev, monthly_price: parseInt(e.target.value) || 0 }))}
                  placeholder="Monthly membership price"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Amenities</h3>
          <div className="flex gap-2">
            <Input
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              placeholder="Add amenity"
              onKeyPress={(e) => e.key === 'Enter' && addAmenity()}
            />
            <Button onClick={addAmenity} disabled={!newAmenity.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {listing.amenities.map((amenity) => (
              <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                {amenity}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeAmenity(amenity)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {listing.image_urls.map((url, index) => (
              <div key={index} className="relative group">
                <img 
                  src={url} 
                  alt={`Business image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <label className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors">
              <Upload className="h-6 w-6 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length > 0) {
                    handleImageUpload(files);
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <Button 
            onClick={handleSave}
            disabled={saving || uploading}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 flex-1"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {listingId ? 'Update Listing' : 'Create Listing'}
              </>
            )}
          </Button>
          {onCancel && (
            <Button variant="outline" onClick={onCancel} disabled={saving}>
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessListingEditor;
