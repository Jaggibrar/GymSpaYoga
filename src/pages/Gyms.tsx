
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ArrowRight, Dumbbell, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import { SmartFilters } from '@/components/SmartFilters';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import { useAuth } from '@/hooks/useAuth';
import SEOHead from '@/components/SEOHead';

const Gyms = () => {
  const { signOut } = useAuth();

  return (
    <>
      <SEOHead
        title="Premium Gyms - Find the Best Fitness Centers Near You"
        description="Discover top-rated gyms and fitness centers. Modern equipment, expert trainers, and flexible memberships. Start your fitness journey today!"
        keywords="gym, fitness center, workout, personal trainer, strength training, cardio"
      />
      
      <AppHeader onLogout={signOut} />
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 via-orange-600 to-amber-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-6">
              <Dumbbell className="h-16 w-16 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Premium Gyms
              </h1>
            </div>
            <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
              Discover state-of-the-art fitness centers with modern equipment and expert trainers. 
              Transform your fitness journey with premium gym experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register-business">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg">
                  List Your Gym
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 text-lg">
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
              Why Choose Premium Gyms?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our carefully selected fitness centers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Dumbbell className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Modern Equipment</h3>
              <p className="text-gray-600">
                State-of-the-art fitness equipment maintained to the highest standards for optimal performance
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Expert Trainers</h3>
              <p className="text-gray-600">
                Certified personal trainers ready to help you achieve your fitness goals safely and effectively
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Flexible Plans</h3>
              <p className="text-gray-600">
                Choose from various membership options that fit your schedule and budget perfectly
              </p>
            </Card>
          </div>
        </section>

        {/* Category Businesses Component */}
        <CategoryBusinesses 
          category="gym" 
          title="Premium Gyms"
          description="Discover state-of-the-art fitness centers with modern equipment and expert trainers"
        />

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-red-600 to-orange-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Join thousands of fitness enthusiasts who have transformed their lives with our premium gym partners
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg">
                  Find Gyms Near Me
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register-business">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 text-lg">
                  List Your Gym
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

export default Gyms;
