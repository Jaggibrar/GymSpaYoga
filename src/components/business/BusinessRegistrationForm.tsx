
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBusinessRegistration } from '@/hooks/useBusinessRegistration';
import { BusinessTypeSelector } from '@/components/registration/BusinessTypeSelector';
import { ContactInfoForm } from '@/components/registration/ContactInfoForm';
import { AddressForm } from '@/components/registration/AddressForm';
import { AmenitiesSelector } from '@/components/registration/AmenitiesSelector';
import ImageUploadSection from './ImageUploadSection';
import { Building, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const BusinessRegistrationForm = () => {
  const { registerBusiness, loading } = useBusinessRegistration();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
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
    amenities: [] as string[],
    images: [] as File[]
  });

  const businessTypes = [
    { value: 'gym', label: 'Gym & Fitness Center', icon: '🏋️' },
    { value: 'spa', label: 'Spa & Wellness', icon: '🧘' },
    { value: 'yoga', label: 'Yoga Studio', icon: '🕉️' }
  ];

  const amenitiesList = [
    'Air Conditioning', 'Parking', 'Locker Rooms', 'Shower Facilities',
    'WiFi', 'Music System', 'Personal Training', 'Group Classes',
    'Equipment Rental', 'Nutritional Guidance', 'Massage Therapy',
    'Sauna', 'Steam Room', 'Swimming Pool', 'Yoga Mats Provided'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.businessName.trim()) {
      toast.error('Business name is required');
      return;
    }
    if (!formData.businessType) {
      toast.error('Please select a business type');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Phone number is required');
      return;
    }
    if (!formData.address.trim()) {
      toast.error('Address is required');
      return;
    }
    if (formData.images.length === 0) {
      toast.error('Please upload at least one business image');
      return;
    }

    const success = await registerBusiness(formData);
    if (success) {
      // Reset form
      setFormData({
        businessName: '',
        businessType: '',
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
        amenities: [],
        images: []
      });
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            Register Your Business
          </CardTitle>
          <p className="text-gray-600">
            Join our platform and start connecting with customers today
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Basic Information</h3>
              
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  placeholder="Enter your business name"
                  required
                />
              </div>

              <BusinessTypeSelector
                businessTypes={businessTypes}
                selectedType={formData.businessType}
                onTypeSelect={(type) => setFormData({...formData, businessType: type})}
              />

              <div>
                <Label htmlFor="category">Business Tier *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget Friendly</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <ContactInfoForm
                email={formData.email}
                phone={formData.phone}
                onEmailChange={(email) => setFormData({...formData, email})}
                onPhoneChange={(phone) => setFormData({...formData, phone})}
              />
            </div>

            {/* Address */}
            <div className="space-y-6">
              <AddressForm
                address={formData.address}
                city={formData.city}
                state={formData.state}
                pinCode={formData.pinCode}
                onAddressChange={(address) => setFormData({...formData, address})}
                onCityChange={(city) => setFormData({...formData, city})}
                onStateChange={(state) => setFormData({...formData, state})}
                onPinCodeChange={(pinCode) => setFormData({...formData, pinCode})}
              />
            </div>

            {/* Business Hours */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Business Hours</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="openingTime">Opening Time *</Label>
                  <Input
                    id="openingTime"
                    type="time"
                    value={formData.openingTime}
                    onChange={(e) => setFormData({...formData, openingTime: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="closingTime">Closing Time *</Label>
                  <Input
                    id="closingTime"
                    type="time"
                    value={formData.closingTime}
                    onChange={(e) => setFormData({...formData, closingTime: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Pricing (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyPrice">Monthly Price (₹)</Label>
                  <Input
                    id="monthlyPrice"
                    type="number"
                    value={formData.monthlyPrice}
                    onChange={(e) => setFormData({...formData, monthlyPrice: e.target.value})}
                    placeholder="3000"
                  />
                </div>
                <div>
                  <Label htmlFor="sessionPrice">Per Session Price (₹)</Label>
                  <Input
                    id="sessionPrice"
                    type="number"
                    value={formData.sessionPrice}
                    onChange={(e) => setFormData({...formData, sessionPrice: e.target.value})}
                    placeholder="500"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Description</h3>
              <div>
                <Label htmlFor="description">Tell us about your business</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your business, services, and what makes you special..."
                  rows={4}
                />
              </div>
            </div>

            {/* Amenities */}
            <AmenitiesSelector
              amenitiesList={amenitiesList}
              selectedAmenities={formData.amenities}
              onAmenityToggle={handleAmenityToggle}
            />

            {/* Images */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Business Images *</h3>
              <ImageUploadSection
                images={formData.images}
                onImagesChange={(images) => setFormData({...formData, images})}
                maxImages={5}
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 text-lg"
            >
              {loading && <Loader2 className="h-5 w-5 mr-2 animate-spin" />}
              Register My Business
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessRegistrationForm;
