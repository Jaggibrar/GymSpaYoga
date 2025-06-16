
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Heart, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import { SmartFilters } from '@/components/SmartFilters';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import { useAuth } from '@/hooks/useAuth';
import SEOHead from '@/components/SEOHead';

const Spas = () => {
  const { signOut } = useAuth();

  return (
    <>
      <SEOHead
        title="Luxury Spas - Premium Wellness & Relaxation Experiences"
        description="Discover luxury spas offering premium treatments, massages, and wellness services. Book your relaxation experience today!"
        keywords="spa, massage, wellness, relaxation, luxury spa, treatments, beauty"
      />
      
      <AppHeader onLogout={signOut} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-16 w-16 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Luxury Spas
              </h1>
            </div>
            <p className="text-xl mb-8 text-cyan-100 max-w-2xl mx-auto">
              Indulge in ultimate relaxation with premium spa treatments and wellness services. 
              Experience rejuvenation like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register-business">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                  List Your Spa
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
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
              Why Choose Luxury Spas?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the ultimate in relaxation and wellness with our premium spa partners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Premium Treatments</h3>
              <p className="text-gray-600">
                Luxurious spa treatments using the finest products and techniques for ultimate relaxation
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Expert Therapists</h3>
              <p className="text-gray-600">
                Skilled and certified therapists dedicated to providing personalized wellness experiences
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Holistic Wellness</h3>
              <p className="text-gray-600">
                Complete wellness packages that rejuvenate your mind, body, and spirit naturally
              </p>
            </Card>
          </div>
        </section>

        {/* Category Businesses Component */}
        <CategoryBusinesses category="spa" />

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Relax and Rejuvenate?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover the perfect spa experience and treat yourself to the luxury you deserve
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                  Find Spas Near Me
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register-business">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
                  List Your Spa
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

export default Spas;
