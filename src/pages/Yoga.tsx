
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Flower, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SmartFilters } from '@/components/SmartFilters';
import AppFooter from '@/components/AppFooter';
import { useAuth } from '@/hooks/useAuth';
import SEOHead from '@/components/SEOHead';

const Yoga = () => {
  const { signOut } = useAuth();

  // Dummy yoga listings
  const dummyYogaStudios = [
    {
      id: 1,
      business_name: "Zen Yoga Studio",
      business_type: "yoga",
      category: "premium",
      city: "Bangalore",
      state: "Karnataka",
      address: "Koramangala, Bangalore",
      pin_code: "560034",
      phone: "+91 98765 43212",
      email: "info@zenyoga.com",
      opening_time: "06:00:00",
      closing_time: "22:00:00",
      description: "Traditional yoga studio offering authentic practices in a serene environment.",
      amenities: ["Hatha Yoga", "Vinyasa Flow", "Meditation", "Pranayama"],
      image_urls: ["https://images.unsplash.com/photo-1506126613408-eca07ce68e71?w=500"],
      session_price: 800,
      status: "approved",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      business_name: "Harmony Yoga Center",
      business_type: "yoga",
      category: "luxury",
      city: "Pune",
      state: "Maharashtra",
      address: "Koregaon Park, Pune",
      pin_code: "411001",
      phone: "+91 98765 43213",
      email: "info@harmonyyoga.com",
      opening_time: "05:30:00",
      closing_time: "21:00:00",
      description: "Modern yoga center with expert instructors and comprehensive wellness programs.",
      amenities: ["Power Yoga", "Yin Yoga", "Mindfulness", "Yoga Therapy"],
      image_urls: ["https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500"],
      session_price: 1200,
      status: "approved",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  return (
    <>
      <SEOHead
        title="Yoga Studios - Find Inner Peace & Strength"
        description="Discover premium yoga studios with expert instructors. Practice yoga in serene environments and find your inner peace today!"
        keywords="yoga, meditation, mindfulness, yoga studio, hatha yoga, vinyasa, peace"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white py-32 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-8">
              <Heart className="h-20 w-20 mr-6 text-pink-200" />
              <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                Yoga <span className="text-pink-200">Studios</span>
              </h1>
            </div>
            <p className="text-2xl mb-12 text-pink-100 max-w-4xl mx-auto font-medium leading-relaxed">
              Find inner peace and strength through yoga practice in serene environments. 
              Connect with your mind, body, and spirit.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register-business">
                <Button size="xl" className="bg-white text-purple-600 hover:bg-gray-100 font-black text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-300">
                  List Your Studio
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-black text-lg shadow-2xl">
                  Explore All Studios
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Search Filters */}
        <section className="container mx-auto px-4 -mt-16 relative z-10">
          <SmartFilters 
            onCategoryChange={() => {}}
            onSortChange={() => {}}
            activeFilter="all"
            activeSort="popular"
          />
        </section>

        {/* Dummy Listings Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Featured <span className="text-purple-600">Yoga Studios</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Discover authentic yoga practice with expert instructors in peaceful environments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {dummyYogaStudios.map((studio) => (
              <Card key={studio.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden border-0 bg-white shadow-xl">
                <div className="relative overflow-hidden">
                  <img 
                    src={studio.image_urls[0]} 
                    alt={studio.business_name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {studio.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{studio.business_name}</h3>
                  <p className="text-purple-600 font-bold mb-3">{studio.city}, {studio.state}</p>
                  <p className="text-gray-700 mb-4 font-medium">{studio.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {studio.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-purple-600">₹{studio.session_price}/session</span>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="container mx-auto px-4 py-20 bg-white/50 backdrop-blur-sm">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Why Choose Our <span className="text-purple-600">Yoga Studios</span>?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Heart className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Mindful Practice</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Authentic yoga practices that connect your mind, body, and spirit in peaceful environments
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Flower className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Expert Instructors</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Certified yoga instructors with years of experience guiding students of all levels
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-gradient-to-r from-rose-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Sun className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Serene Spaces</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Beautiful, peaceful studios designed to enhance your yoga practice and meditation
              </p>
            </Card>
          </div>
        </section>
      </div>
      
      <AppFooter />
    </>
  );
};

export default Yoga;
