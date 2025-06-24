
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Save, Upload, X, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

interface BusinessListingEditorProps {
  listing?: BusinessListing;
  onSave?: () => void;
  onCancel?: () => void;
}

const BusinessListingEditor: React.FC<BusinessListingEditorProps> = ({ 
  listing, 
  onSave, 
  onCancel 
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [formData, setFormData] = useState({
    business_name: listing?.business_name || '',
    business_type: listing?.business_type || '',
    category: listing?.category || '',
    email: listing?.email || '',
    phone: listing?.phone || '',
    address: listing?.address || '',
    city: listing?.city || '',
    state: listing?.state || '',
    pin_code: listing?.pin_code || '',
    opening_time: listing?.opening_time || '09:00',
    closing_time: listing?.closing_time || '21:00',
    monthly_price: listing?.monthly_price || '',
    session_price: listing?.session_price || '',
    description: listing?.description || '',
    amenities: listing?.amenities?.join(', ') || '',
    image_urls: listing?.image_urls || []
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`File ${file.name} is too large. Maximum size is 5MB.`);
          continue;
        }

        if (!file.type.startsWith('image/')) {
          toast.error(`File ${file.name} is not a valid image.`);
          continue;
        }

        // For demo purposes, we'll create a mock URL
        // In production, you would upload to your storage service
        const mockUrl = `https://images.unsplash.com/photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}?w=800&h=600&fit=crop`;
        uploadedUrls.push(mockUrl);
      }

      if (uploadedUrls.length > 0) {
        setFormData(prev => ({
          ...prev,
          image_urls: [...prev.image_urls, ...uploadedUrls]
        }));
        toast.success(`Successfully uploaded ${uploadedUrls.length} image(s)`);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, index) => index !== indexToRemove)
    }));
    toast.success('Image removed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        ...formData,
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean),
        monthly_price: formData.monthly_price ? parseInt(formData.monthly_price.toString()) : null,
        session_price: formData.session_price ? parseInt(formData.session_price.toString()) : null,
        updated_at: new Date().toISOString()
      };

      if (listing?.id) {
        const { error } = await supabase
          .from('business_profiles')
          .update(updateData)
          .eq('id', listing.id);

        if (error) throw error;
        
        toast.success('Business listing updated successfully!');
        onSave?.();
      }
    } catch (error: any) {
      console.error('Error updating listing:', error);
      toast.error('Failed to update listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {listing ? 'Edit Business Listing' : 'Create Business Listing'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business_name">Business Name *</Label>
              <Input
                id="business_name"
                value={formData.business_name}
                onChange={(e) => handleInputChange('business_name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="business_type">Business Type *</Label>
              <Select value={formData.business_type} onValueChange={(value) => handleInputChange('business_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gym">Gym</SelectItem>
                  <SelectItem value="spa">Spa</SelectItem>
                  <SelectItem value="yoga">Yoga Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="pin_code">PIN Code *</Label>
              <Input
                id="pin_code"
                value={formData.pin_code}
                onChange={(e) => handleInputChange('pin_code', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Operating Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="opening_time">Opening Time *</Label>
              <Input
                id="opening_time"
                type="time"
                value={formData.opening_time}
                onChange={(e) => handleInputChange('opening_time', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="closing_time">Closing Time *</Label>
              <Input
                id="closing_time"
                type="time"
                value={formData.closing_time}
                onChange={(e) => handleInputChange('closing_time', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="monthly_price">Monthly Price (₹)</Label>
              <Input
                id="monthly_price"
                type="number"
                value={formData.monthly_price}
                onChange={(e) => handleInputChange('monthly_price', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="session_price">Session Price (₹)</Label>
              <Input
                id="session_price"
                type="number"
                value={formData.session_price}
                onChange={(e) => handleInputChange('session_price', e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
            />
          </div>

          {/* Amenities */}
          <div>
            <Label htmlFor="amenities">Amenities (comma separated)</Label>
            <Input
              id="amenities"
              value={formData.amenities}
              onChange={(e) => handleInputChange('amenities', e.target.value)}
              placeholder="WiFi, Parking, AC, Locker Room"
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <Label>Business Images</Label>
            <div className="mt-2 space-y-4">
              {/* Upload Button */}
              <div>
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  disabled={uploadingImages}
                  className="w-full"
                >
                  {uploadingImages ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Images
                    </>
                  )}
                </Button>
              </div>

              {/* Image Preview Grid */}
              {formData.image_urls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.image_urls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Business image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="mr-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(url, '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              <Save className="h-4 w-4 mr-2" />
              {listing ? 'Update Listing' : 'Create Listing'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessListingEditor;
