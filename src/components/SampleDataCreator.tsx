
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Database } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const SampleDataCreator = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const createSampleData = async () => {
    setLoading(true);
    try {
      // First, check if data already exists
      const { data: existingData } = await supabase
        .from('business_profiles')
        .select('id')
        .limit(1);

      if (existingData && existingData.length > 0) {
        toast.info('Sample data already exists!');
        setLoading(false);
        return;
      }

      // Get current user ID or use a default
      const userId = user?.id || '00000000-0000-0000-0000-000000000000';

      const sampleBusinesses = [
        {
          business_name: "FitZone Premium Gym",
          business_type: "gym",
          category: "premium",
          email: "contact@fitzone.com",
          phone: "+91 9876543210",
          address: "123 Fitness Street",
          city: "Mumbai",
          state: "Maharashtra",
          pin_code: "400001",
          opening_time: "05:00",
          closing_time: "23:00",
          monthly_price: 3500,
          session_price: 200,
          description: "State-of-the-art gym with modern equipment, personal trainers, and group fitness classes. Perfect for serious fitness enthusiasts.",
          amenities: ["Air Conditioning", "Personal Training", "Group Classes", "Lockers", "Shower Facilities", "Parking"],
          image_urls: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800"],
          status: "approved",
          user_id: userId
        },
        {
          business_name: "Serenity Spa & Wellness",
          business_type: "spa",
          category: "luxury",
          email: "info@serenityspa.com",
          phone: "+91 9876543211",
          address: "456 Wellness Avenue",
          city: "Delhi",
          state: "Delhi",
          pin_code: "110001",
          opening_time: "09:00",
          closing_time: "21:00",
          monthly_price: 5000,
          session_price: 800,
          description: "Luxury spa offering premium treatments, massages, and holistic wellness services in a tranquil environment.",
          amenities: ["Sauna", "Steam Room", "Massage Therapy", "Facial Treatments", "Aromatherapy", "Meditation Room"],
          image_urls: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800"],
          status: "approved",
          user_id: userId
        },
        {
          business_name: "Inner Peace Yoga Studio",
          business_type: "yoga",
          category: "standard",
          email: "hello@innerpeace.com",
          phone: "+91 9876543212",
          address: "789 Zen Garden",
          city: "Bangalore",
          state: "Karnataka",
          pin_code: "560001",
          opening_time: "06:00",
          closing_time: "20:00",
          monthly_price: 2500,
          session_price: 150,
          description: "Peaceful yoga studio offering various styles of yoga practice with experienced instructors in a serene setting.",
          amenities: ["Yoga Mats", "Meditation Area", "Changing Rooms", "Air Conditioning", "Sound System", "Props Available"],
          image_urls: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800"],
          status: "approved",
          user_id: userId
        },
        {
          business_name: "PowerHouse Gym",
          business_type: "gym",
          category: "standard",
          email: "info@powerhouse.com",
          phone: "+91 9876543213",
          address: "321 Strength Street",
          city: "Pune",
          state: "Maharashtra",
          pin_code: "411001",
          opening_time: "05:30",
          closing_time: "22:30",
          monthly_price: 2000,
          session_price: 100,
          description: "Community-focused gym with quality equipment and affordable pricing. Great for beginners and experienced fitness enthusiasts.",
          amenities: ["Free Weights", "Cardio Equipment", "Lockers", "Parking", "Group Classes"],
          image_urls: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"],
          status: "approved",
          user_id: userId
        },
        {
          business_name: "Bliss Day Spa",
          business_type: "spa",
          category: "standard",
          email: "bookings@blissspa.com",
          phone: "+91 9876543214",
          address: "654 Relaxation Road",
          city: "Chennai",
          state: "Tamil Nadu",
          pin_code: "600001",
          opening_time: "10:00",
          closing_time: "20:00",
          monthly_price: 3000,
          session_price: 500,
          description: "Rejuvenating day spa with professional therapists offering a range of beauty and wellness treatments.",
          amenities: ["Facial Treatments", "Body Massage", "Manicure", "Pedicure", "Hair Spa", "Relaxation Lounge"],
          image_urls: ["https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800"],
          status: "approved",
          user_id: userId
        },
        {
          business_name: "Mindful Yoga Center",
          business_type: "yoga",
          category: "premium",
          email: "contact@mindfulyoga.com",
          phone: "+91 9876543215",
          address: "987 Harmony Lane",
          city: "Hyderabad",
          state: "Telangana",
          pin_code: "500001",
          opening_time: "05:30",
          closing_time: "21:30",
          monthly_price: 4000,
          session_price: 250,
          description: "Premium yoga center with expert instructors, multiple yoga styles, and a focus on mindfulness and meditation.",
          amenities: ["Multiple Studios", "Meditation Hall", "Workshop Rooms", "Retail Shop", "Café", "Library"],
          image_urls: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"],
          status: "approved",
          user_id: userId
        }
      ];

      // Insert sample data
      const { error } = await supabase
        .from('business_profiles')
        .insert(sampleBusinesses);

      if (error) {
        console.error('Error creating sample data:', error);
        toast.error('Failed to create sample data: ' + error.message);
      } else {
        toast.success('Sample data created successfully!');
        // Refresh the page to show the new data
        window.location.reload();
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Sample Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Create sample businesses to test the application functionality.
        </p>
        <Button 
          onClick={createSampleData} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Sample Data'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SampleDataCreator;
