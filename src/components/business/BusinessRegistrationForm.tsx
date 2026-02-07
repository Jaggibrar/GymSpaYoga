
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useBusinessRegistration } from '@/hooks/useBusinessRegistration';
import { Loader2, Building2 } from 'lucide-react';
import ImageUploadSection from './ImageUploadSection';

const BusinessRegistrationForm = () => {
  const { registerBusiness, loading } = useBusinessRegistration();
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'gym',
    category: 'budget',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    openingTime: '06:00',
    closingTime: '22:00',
    monthlyPrice: '',
    sessionPrice: '',
    description: '',
    amenities: [] as string[]
  });

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
    const success = await registerBusiness({
      ...formData,
      images
    });
    
    if (success) {
      // Reset form
      setFormData({
        businessName: '',
        businessType: 'gym',
        category: 'budget',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pinCode: '',
        openingTime: '06:00',
        closingTime: '22:00',
        monthlyPrice: '',
        sessionPrice: '',
        description: '',
        amenities: []
      });
      setImages([]);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          Register Your Business
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="businessType">Business Type *</Label>
              <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gym">Gym</SelectItem>
                  <SelectItem value="spa">Spa</SelectItem>
                  <SelectItem value="yoga">Yoga Studio</SelectItem>
                  <SelectItem value="therapist">Wellness Therapist</SelectItem>
                  <SelectItem value="chiropractor">Chiropractor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Business Tier *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
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
              <Label htmlFor="pinCode">PIN Code *</Label>
              <Input
                id="pinCode"
                value={formData.pinCode}
                onChange={(e) => handleInputChange('pinCode', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Timing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="openingTime">Opening Time *</Label>
              <Input
                id="openingTime"
                type="time"
                value={formData.openingTime}
                onChange={(e) => handleInputChange('openingTime', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="closingTime">Closing Time *</Label>
              <Input
                id="closingTime"
                type="time"
                value={formData.closingTime}
                onChange={(e) => handleInputChange('closingTime', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="monthlyPrice">Monthly Price (₹)</Label>
              <Input
                id="monthlyPrice"
                type="number"
                value={formData.monthlyPrice}
                onChange={(e) => handleInputChange('monthlyPrice', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="sessionPrice">Session Price (₹)</Label>
              <Input
                id="sessionPrice"
                type="number"
                value={formData.sessionPrice}
                onChange={(e) => handleInputChange('sessionPrice', e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              required
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

          {/* Image Upload */}
          <div>
            <ImageUploadSection
              images={images}
              onImagesChange={setImages}
              maxImages={5}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Register Business
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessRegistrationForm;
