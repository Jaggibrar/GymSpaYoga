
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Upload, X, MapPin, Clock, Phone, Mail, Building, Star } from 'lucide-react';

const BusinessListingForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    business_name: '',
    business_type: '',
    category: '',
    description: '',
    address: '',
    city: '',
    state: '',
    pin_code: '',
    phone: '',
    email: '',
    opening_time: '',
    closing_time: '',
    monthly_price: '',
    session_price: '',
    amenities: [] as string[],
    category_level: ''
  });

  const businessTypes = [
    'gym',
    'spa', 
    'yoga',
    'fitness_center',
    'wellness_center'
  ];

  const categories = [
    'Fitness & Gym',
    'Spa & Wellness',
    'Yoga & Meditation',
    'Personal Training',
    'Sports & Recreation'
  ];

  const categoryLevels = [
    { value: 'budget', label: 'Budget Friendly', icon: '💰', desc: 'Affordable options for everyone' },
    { value: 'premium', label: 'Premium', icon: '⭐', desc: 'Quality services with great value' },
    { value: 'luxury', label: 'Luxury', icon: '👑', desc: 'Premium experience with top amenities' }
  ];

  const amenitiesList = [
    'Air Conditioning', 'Parking', 'Locker Rooms', 'Shower Facilities',
    'WiFi', 'Music System', 'Personal Training', 'Group Classes',
    'Equipment Rental', 'Nutritional Guidance', 'Massage Therapy',
    'Sauna', 'Steam Room', 'Swimming Pool', 'Yoga Mats Provided'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const uploadImages = async () => {
    const imageUrls: string[] = [];
    
    for (const image of images) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${user?.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('business-images')
        .upload(fileName, image);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        continue;
      }

      const { data } = supabase.storage
        .from('business-images')
        .getPublicUrl(fileName);

      imageUrls.push(data.publicUrl);
    }
    
    return imageUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to create a listing');
      return;
    }

    setLoading(true);
    try {
      // Upload images first
      const imageUrls = await uploadImages();

      // Create business listing
      const { error } = await supabase
        .from('business_profiles')
        .insert({
          user_id: user.id,
          business_name: formData.business_name,
          business_type: formData.business_type,
          category: formData.category,
          description: formData.description,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pin_code: formData.pin_code,
          phone: formData.phone,
          email: formData.email,
          opening_time: formData.opening_time,
          closing_time: formData.closing_time,
          monthly_price: formData.monthly_price ? parseInt(formData.monthly_price) : null,
          session_price: formData.session_price ? parseInt(formData.session_price) : null,
          amenities: formData.amenities,
          image_urls: imageUrls,
          status: 'pending'
        });

      if (error) throw error;

      toast.success('Business listing submitted successfully! It will be reviewed and approved soon.');
      
      // Reset form
      setFormData({
        business_name: '',
        business_type: '',
        category: '',
        description: '',
        address: '',
        city: '',
        state: '',
        pin_code: '',
        phone: '',
        email: '',
        opening_time: '',
        closing_time: '',
        monthly_price: '',
        session_price: '',
        amenities: [],
        category_level: ''
      });
      setImages([]);
    } catch (error: any) {
      console.error('Error creating listing:', error);
      toast.error('Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            Create Your Business Listing
          </CardTitle>
          <p className="text-gray-600">
            List your gym, spa, or yoga studio to connect with customers
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="business_name">Business Name *</Label>
                <Input
                  id="business_name"
                  value={formData.business_name}
                  onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                  placeholder="Enter your business name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="business_type">Business Type *</Label>
                <Select value={formData.business_type} onValueChange={(value) => setFormData({...formData, business_type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.replace('_', ' ').toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="business@example.com"
                  required
                />
              </div>
            </div>

            {/* Category Level Selection */}
            <div>
              <Label>Category Level *</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {categoryLevels.map(level => (
                  <Card 
                    key={level.value}
                    className={`cursor-pointer transition-all ${
                      formData.category_level === level.value 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setFormData({...formData, category_level: level.value})}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{level.icon}</div>
                      <h3 className="font-semibold">{level.label}</h3>
                      <p className="text-sm text-gray-600">{level.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe your business, services, and what makes you special..."
                rows={4}
              />
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Street address"
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  placeholder="State"
                  required
                />
              </div>
              <div>
                <Label htmlFor="pin_code">PIN Code *</Label>
                <Input
                  id="pin_code"
                  value={formData.pin_code}
                  onChange={(e) => setFormData({...formData, pin_code: e.target.value})}
                  placeholder="123456"
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
                  onChange={(e) => setFormData({...formData, opening_time: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="closing_time">Closing Time *</Label>
                <Input
                  id="closing_time"
                  type="time"
                  value={formData.closing_time}
                  onChange={(e) => setFormData({...formData, closing_time: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, monthly_price: e.target.value})}
                  placeholder="5000"
                />
              </div>
              <div>
                <Label htmlFor="session_price">Per Session Price (₹)</Label>
                <Input
                  id="session_price"
                  type="number"
                  value={formData.session_price}
                  onChange={(e) => setFormData({...formData, session_price: e.target.value})}
                  placeholder="500"
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {amenitiesList.map(amenity => (
                  <Badge
                    key={amenity}
                    variant={formData.amenities.includes(amenity) ? "default" : "outline"}
                    className="cursor-pointer justify-center p-2"
                    onClick={() => toggleAmenity(amenity)}
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label>Business Images (Max 5)</Label>
              <div className="mt-2">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 2MB each)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading || !formData.business_name || !formData.business_type || !formData.category_level}
              className="w-full"
            >
              {loading ? 'Creating Listing...' : 'Create Business Listing'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessListingForm;
