
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ArrowRight, Dumbbell, Zap, Users, Sparkles, Crown, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import { SmartFilters } from '@/components/SmartFilters';
import AppFooter from '@/components/AppFooter';
import { useAuth } from '@/hooks/useAuth';
import SEOHead from '@/components/SEOHead';

const Gyms = () => {
  const { signOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('created_at');

  return (
    <>
      <SEOHead
        title="Premium Gyms - Find the Best Fitness Centers Near You"
        description="Discover top-rated gyms and fitness centers. Modern equipment, expert trainers, and flexible memberships. Start your fitness journey today!"
        keywords="gym, fitness center, workout, personal trainer, strength training, cardio"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Premium Hero Section */}
        <section className="relative bg-gradient-to-br from-red-600 via-orange-600 to-amber-600 text-white py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/20">
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                <Dumbbell className="h-20 w-20 mr-6 relative z-10 drop-shadow-2xl" />
              </div>
              <div>
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                  Premium Gyms
                </h1>
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <Crown className="h-6 w-6 text-yellow-300" />
                  <span className="text-xl text-orange-100 font-semibold">Elite Fitness Experience</span>
                  <Crown className="h-6 w-6 text-yellow-300" />
                </div>
              </div>
            </div>
            
            <p className="text-xl mb-8 text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Discover state-of-the-art fitness centers with modern equipment and expert trainers. 
              Transform your fitness journey with premium gym experiences designed for champions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register-business">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 min-h-[60px]">
                  <Award className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="block">List Your Premium Gym</span>
                  <ArrowRight className="ml-3 h-5 w-5 flex-shrink-0" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm bg-white/10 transition-all duration-300 transform hover:scale-105 min-h-[60px]">
                  <Sparkles className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="block">Explore All Categories</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Search Filters */}
        <section className="container mx-auto px-4 -mt-16 relative z-20">
          <SmartFilters 
            onSearchChange={setSearchTerm}
            onLocationChange={setLocation}
            onSortChange={setSortBy}
            placeholder="Search premium gyms, equipment, trainers..."
            category="gym"
          />
        </section>

        {/* Premium Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              Why Choose Premium Gyms?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the difference with our carefully curated fitness centers that redefine excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl transform hover:scale-105 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-lg opacity-50"></div>
                  <div className="h-20 w-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center relative z-10">
                    <Dumbbell className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">State-of-the-Art Equipment</h3>
              <p className="text-gray-600 leading-relaxed">
                Latest fitness technology and premium equipment maintained to perfection for optimal performance and safety
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl transform hover:scale-105 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-lg opacity-50"></div>
                  <div className="h-20 w-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center relative z-10">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Elite Certified Trainers</h3>
              <p className="text-gray-600 leading-relaxed">
                World-class personal trainers with international certifications ready to guide your transformation journey
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl transform hover:scale-105 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full blur-lg opacity-50"></div>
                  <div className="h-20 w-20 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center relative z-10">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Flexible Premium Plans</h3>
              <p className="text-gray-600 leading-relaxed">
                Tailored membership options with exclusive benefits that adapt to your lifestyle and fitness goals
              </p>
            </Card>
          </div>
        </section>

        {/* Category Businesses Component */}
        <CategoryBusinesses 
          category="gym" 
          title="Premium Gyms"
          description="Discover state-of-the-art fitness centers with modern equipment and expert trainers"
          searchTerm={searchTerm}
          location={location}
          sortBy={sortBy}
        />

        {/* Premium CTA Section */}
        <section className="relative bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-orange-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl text-red-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of fitness enthusiasts who have achieved their goals with our premium gym partners. 
              Your transformation journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 min-h-[60px]">
                  <MapPin className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="block">Find Premium Gyms Near Me</span>
                  <ArrowRight className="ml-3 h-5 w-5 flex-shrink-0" />
                </Button>
              </Link>
              <Link to="/register-business">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm bg-white/10 transition-all duration-300 transform hover:scale-105 min-h-[60px]">
                  <Crown className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="block">List Your Premium Gym</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Gyms;
