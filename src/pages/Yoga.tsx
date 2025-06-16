
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Flower, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import { SmartFilters } from '@/components/SmartFilters';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import { useAuth } from '@/hooks/useAuth';
import SEOHead from '@/components/SEOHead';

const Yoga = () => {
  const { signOut } = useAuth();

  return (
    <>
      <SEOHead
        title="Yoga Studios - Find Inner Peace & Strength"
        description="Discover premium yoga studios with expert instructors. Practice yoga in serene environments and find your inner peace today!"
        keywords="yoga, meditation, mindfulness, yoga studio, hatha yoga, vinyasa, peace"
      />
      
      <AppHeader onLogout={signOut} />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-6">
              <Heart className="h-16 w-16 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Yoga Studios
              </h1>
            </div>
            <p className="text-xl mb-8 text-pink-100 max-w-2xl mx-auto">
              Find inner peace and strength through yoga practice in serene environments. 
              Connect with your mind, body, and spirit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register-business">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg">
                  List Your Studio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg">
                  Explore All
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Search Filters */}
        <section className="container mx-auto px-4 -mt-10 relative z-10">
          <SmartFilters />
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Premium Yoga Studios?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience authentic yoga practice with our carefully selected studio partners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Mindful Practice</h3>
              <p className="text-gray-600">
                Authentic yoga practices that connect your mind, body, and spirit in peaceful environments
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                  <Flower className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Expert Instructors</h3>
              <p className="text-gray-600">
                Certified yoga instructors with years of experience guiding students of all levels
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Sun className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Serene Spaces</h3>
              <p className="text-gray-600">
                Beautiful, peaceful studios designed to enhance your yoga practice and meditation
              </p>
            </Card>
          </div>
        </section>

        {/* Category Businesses Component */}
        <CategoryBusinesses 
          category="yoga" 
          title="Yoga Studios"
          description="Find inner peace and strength through yoga practice in serene environments"
        />

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Begin Your Yoga Journey?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Find the perfect yoga studio and start your path to inner peace and physical wellness
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg">
                  Find Studios Near Me
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register-business">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg">
                  List Your Studio
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <AppFooter />
    </>
  );
};

export default Yoga;
