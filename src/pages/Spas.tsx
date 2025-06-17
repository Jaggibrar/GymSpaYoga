
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Heart, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SmartFilters } from '@/components/SmartFilters';
import AppFooter from '@/components/AppFooter';
import { useAuth } from '@/hooks/useAuth';
import SEOHead from '@/components/SEOHead';

const Spas = () => {
  const { signOut } = useAuth();

  // Dummy spa listings
  const dummySpas = [
    {
      id: 1,
      business_name: "Serenity Wellness Spa",
      business_type: "spa",
      category: "luxury",
      city: "Mumbai",
      state: "Maharashtra",
      address: "Bandra West, Mumbai",
      pin_code: "400050",
      phone: "+91 98765 43210",
      email: "info@serenityspa.com",
      opening_time: "09:00:00",
      closing_time: "21:00:00",
      description: "Premium wellness spa offering rejuvenating treatments and holistic wellness experiences.",
      amenities: ["Massage Therapy", "Steam Room", "Aromatherapy", "Facial Treatments"],
      image_urls: ["https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500"],
      session_price: 2500,
      status: "approved",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      business_name: "Bliss Spa & Wellness",
      business_type: "spa",
      category: "premium",
      city: "Delhi",
      state: "Delhi",
      address: "Connaught Place, New Delhi",
      pin_code: "110001",
      phone: "+91 98765 43211",
      email: "info@blissspa.com",
      opening_time: "10:00:00",
      closing_time: "20:00:00",
      description: "Modern spa facility with expert therapists and premium wellness services.",
      amenities: ["Hot Stone Massage", "Sauna", "Body Wraps", "Reflexology"],
      image_urls: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"],
      session_price: 1800,
      status: "approved",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  return (
    <>
      <SEOHead
        title="Luxury Spas - Premium Wellness & Relaxation Experiences"
        description="Discover luxury spas offering premium treatments, massages, and wellness services. Book your relaxation experience today!"
        keywords="spa, massage, wellness, relaxation, luxury spa, treatments, beauty"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white py-32 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-8">
              <Sparkles className="h-20 w-20 mr-6 text-cyan-200" />
              <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                Luxury <span className="text-cyan-200">Spas</span>
              </h1>
            </div>
            <p className="text-2xl mb-12 text-cyan-100 max-w-4xl mx-auto font-medium leading-relaxed">
              Indulge in ultimate relaxation with premium spa treatments and wellness services. 
              Experience rejuvenation like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register-business">
                <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 font-black text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300">
                  List Your Spa
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-black text-lg shadow-2xl">
                  Explore All Spas
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
              Featured <span className="text-cyan-600">Spas</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Discover premium spa experiences with expert therapists and luxury facilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {dummySpas.map((spa) => (
              <Card key={spa.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden border-0 bg-white shadow-xl">
                <div className="relative overflow-hidden">
                  <img 
                    src={spa.image_urls[0]} 
                    alt={spa.business_name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {spa.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{spa.business_name}</h3>
                  <p className="text-cyan-600 font-bold mb-3">{spa.city}, {spa.state}</p>
                  <p className="text-gray-700 mb-4 font-medium">{spa.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {spa.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-cyan-600">₹{spa.session_price}/session</span>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold">
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
              Why Choose Our <span className="text-cyan-600">Premium Spas</span>?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Premium Treatments</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Luxurious spa treatments using the finest products and techniques for ultimate relaxation
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Heart className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Expert Therapists</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Skilled and certified therapists dedicated to providing personalized wellness experiences
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Leaf className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Holistic Wellness</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Complete wellness packages that rejuvenate your mind, body, and spirit naturally
              </p>
            </Card>
          </div>
        </section>
      </div>
      
      <AppFooter />
    </>
  );
};

export default Spas;
