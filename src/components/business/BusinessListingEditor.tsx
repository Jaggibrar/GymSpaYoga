
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useBusinessImageUpload } from '@/hooks/useBusinessImageUpload';
import { toast } from 'sonner';
import { Loader2, Save, X } from 'lucide-react';
import ImageUploadSection from './ImageUploadSection';

interface BusinessListing {
  id?: string;
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
  status?: string;
}

interface BusinessListingEditorProps {
  listing?: BusinessListing;
  onSave: () => void;
  onCancel: () => void;
}

const BusinessListingEditor: React.FC<BusinessListingEditorProps> = ({
  listing,
  onSave,
  onCancel
}) => {
  const { user } = useAuth();
  const { uploadMultipleImages } = useBusinessImageUpload();
  const [loading, setLoading] = useState(false);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState<BusinessListing>({
    business_name: '',
    business_type: 'gym',
    category: 'fitness',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pin_code: '',
    opening_time: '06:00',
    closing_time: '22:00',
    monthly_price: undefined,
    session_price: undefined,
    description: '',
    amenities: [],
    image_urls: [],
    ...listing
  });

  useEffect(() => {
    if (listing?.image_urls) {
      setExistingImageUrls(listing.image_urls);
    }
  }, [listing]);

  const amenitiesList = [
    'AC', 'Parking', 'Locker Room', 'Shower', 'WiFi', 'Towel Service',
    'Personal Training', 'Group Classes', 'Nutrition Counseling', 'Steam Room',
    'Sauna', 'Swimming Pool', 'Cardio Equipment', 'Weight Training', 'Yoga Classes'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in');
      return;
    }

    setLoading(true);
    try {
      // Upload new images if any
      let newImageUrls: string[] = [];
      if (newImages.length > 0) {
        newImageUrls = await uploadMultipleImages(newImages);
      }

      // Combine existing and new image URLs
      const allImageUrls = [...existingImageUrls, ...newImageUrls];

      const businessData = {
        ...formData,
        user_id: user.id,
        image_urls: allImageUrls,
        status: 'approved'
      };

      if (listing?.id) {
        // Update existing listing
        const { error } = await supabase
          .from('business_profiles')
          .update(businessData)
          .eq('id', listing.id);

        if (error) throw error;
        toast.success('Business profile updated successfully!');
      } else {
        // Create new listing
        const { error } = await supabase
          .from('business_profiles')
          .insert(businessData);

        if (error) throw error;
        toast.success('Business profile created successfully!');
      }

      // Clear new images after successful save
      setNewImages([]);
      onSave();
    } catch (error: any) {
      console.error('Error saving business:', error);
      toast.error(error.message || 'Failed to save business profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {listing ? 'Edit Business Profile' : 'Create New Business Profile'}
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
            <Input
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

          {/* Timing */}
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
                value={formData.monthly_price || ''}
                onChange={(e) => handleInputChange('monthly_price', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
            <div>
              <Label htmlFor="session_price">Session Price (₹)</Label>
              <Input
                id="session_price"
                type="number"
                value={formData.session_price || ''}
                onChange={(e) => handleInputChange('session_price', e.target.value ? parseInt(e.target.value) : undefined)}
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
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityToggle(amenity)}
                  />
                  <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <ImageUploadSection
              images={newImages}
              onImagesChange={setNewImages}
              maxImages={5}
              existingImageUrls={existingImageUrls}
              onExistingImagesChange={setExistingImageUrls}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              <Save className="h-4 w-4 mr-2" />
              {listing ? 'Update Business' : 'Create Business'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessListingEditor;
