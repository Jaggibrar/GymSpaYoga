
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Dumbbell, Trophy, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SmartFilters } from '@/components/SmartFilters';
import AppFooter from '@/components/AppFooter';
import { useAuth } from '@/hooks/useAuth';
import SEOHead from '@/components/SEOHead';

const Trainers = () => {
  const { signOut } = useAuth();

  // Dummy trainer listings
  const dummyTrainers = [
    {
      id: 1,
      business_name: "FitMax Personal Training",
      business_type: "trainer",
      category: "premium",
      city: "Gurgaon",
      state: "Haryana",
      address: "Sector 29, Gurgaon",
      pin_code: "122001",
      phone: "+91 98765 43214",
      email: "info@fitmax.com",
      opening_time: "06:00:00",
      closing_time: "22:00:00",
      description: "Certified personal trainer with 8+ years experience in strength training and fitness coaching.",
      amenities: ["Weight Training", "Cardio Coaching", "Nutrition Planning", "Fitness Assessment"],
      image_urls: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"],
      session_price: 1500,
      status: "approved",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      business_name: "Elite Fitness Coaching",
      business_type: "trainer",
      category: "luxury",
      city: "Chennai",
      state: "Tamil Nadu",
      address: "T Nagar, Chennai",
      pin_code: "600017",
      phone: "+91 98765 43215",
      email: "info@elitecoaching.com",
      opening_time: "05:00:00",
      closing_time: "21:00:00",
      description: "Professional fitness coach specializing in functional training and athletic performance.",
      amenities: ["Functional Training", "HIIT Sessions", "Sports Conditioning", "Recovery Programs"],
      image_urls: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500"],
      session_price: 2000,
      status: "approved",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  return (
    <>
      <SEOHead
        title="Personal Trainers - Expert Fitness Coaching"
        description="Find certified personal trainers for customized fitness coaching and achieve your fitness goals effectively!"
        keywords="personal trainer, fitness coach, strength training, cardio, nutrition"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white py-32 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-8">
              <Dumbbell className="h-20 w-20 mr-6 text-orange-200" />
              <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                Personal <span className="text-orange-200">Trainers</span>
              </h1>
            </div>
            <p className="text-2xl mb-12 text-orange-100 max-w-4xl mx-auto font-medium leading-relaxed">
              Transform your fitness journey with expert personal trainers. 
              Get customized coaching and achieve your goals faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register-trainer">
                <Button size="xl" className="bg-white text-orange-600 hover:bg-gray-100 font-black text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300">
                  Join as Trainer
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-black text-lg shadow-2xl">
                  Find Trainers
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
              Featured <span className="text-orange-600">Personal Trainers</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Connect with certified trainers who will help you achieve your fitness goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {dummyTrainers.map((trainer) => (
              <Card key={trainer.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden border-0 bg-white shadow-xl">
                <div className="relative overflow-hidden">
                  <img 
                    src={trainer.image_urls[0]} 
                    alt={trainer.business_name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {trainer.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{trainer.business_name}</h3>
                  <p className="text-orange-600 font-bold mb-3">{trainer.city}, {trainer.state}</p>
                  <p className="text-gray-700 mb-4 font-medium">{trainer.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trainer.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-orange-600">₹{trainer.session_price}/session</span>
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold">
                      Book Session
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
              Why Choose Our <span className="text-orange-600">Personal Trainers</span>?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Dumbbell className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Expert Coaching</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Certified trainers with proven track records in helping clients achieve their fitness goals
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Proven Results</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Customized training programs designed to deliver measurable results and lasting transformations
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Target className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Personalized Approach</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Individual attention and customized workout plans tailored to your specific needs and goals
              </p>
            </Card>
          </div>
        </section>
      </div>
      
      <AppFooter />
    </>
  );
};

export default Trainers;
