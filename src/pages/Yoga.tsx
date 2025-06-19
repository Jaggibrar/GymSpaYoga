
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ArrowRight, Heart, Zap, Users, Crown, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import AppFooter from '@/components/AppFooter';
import SEOHead from '@/components/SEOHead';

const Yoga = () => {
  const [sortBy, setSortBy] = useState('created_at');
  const [priceFilter, setPriceFilter] = useState('');

  return (
    <>
      <SEOHead
        title="Premium Yoga Studios - Find Your Perfect Practice"
        description="Discover authentic yoga studios and experienced instructors. From Hatha to Vinyasa, find your perfect yoga practice and transform your life."
        keywords="yoga studio, yoga classes, meditation, mindfulness, hatha yoga, vinyasa yoga"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
        {/* Premium Hero Section */}
        <section className="relative bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/20">
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-green-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                <Heart className="h-20 w-20 mr-6 relative z-10 drop-shadow-2xl" />
              </div>
              <div>
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                  Yoga Studios
                </h1>
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <Crown className="h-6 w-6 text-yellow-300" />
                  <span className="text-xl text-green-100 font-semibold">Mindful Wellness Journey</span>
                  <Crown className="h-6 w-6 text-yellow-300" />
                </div>
              </div>
            </div>
            
            <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
              Discover authentic yoga practices and experienced instructors. 
              Transform your mind, body, and spirit with traditional and modern yoga styles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register-business">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 min-h-[60px]">
                  <Award className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="block">List Your Yoga Studio</span>
                  <ArrowRight className="ml-3 h-5 w-5 flex-shrink-0" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm bg-white/10 transition-all duration-300 transform hover:scale-105 min-h-[60px]">
                  <Heart className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="block">Explore All Categories</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="container mx-auto px-4 py-8 -mt-8 relative z-20">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={priceFilter === '' ? 'default' : 'outline'}
                  onClick={() => setPriceFilter('')}
                  className="rounded-full"
                >
                  All Studios
                </Button>
                <Button
                  variant={priceFilter === 'budget' ? 'default' : 'outline'}
                  onClick={() => setPriceFilter('budget')}
                  className="rounded-full"
                >
                  Budget Friendly
                </Button>
                <Button
                  variant={priceFilter === 'premium' ? 'default' : 'outline'}
                  onClick={() => setPriceFilter('premium')}
                  className="rounded-full"
                >
                  Premium
                </Button>
                <Button
                  variant={priceFilter === 'luxury' ? 'default' : 'outline'}
                  onClick={() => setPriceFilter('luxury')}
                  className="rounded-full"
                >
                  Luxury
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="created_at">Newest First</option>
                  <option value="session_price">Price: Low to High</option>
                  <option value="-session_price">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              Why Choose Premium Yoga Studios?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience authentic yoga practices with certified instructors and serene environments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-2xl transform hover:scale-105 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 rounded-full blur-lg opacity-50"></div>
                  <div className="h-20 w-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center relative z-10">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Authentic Practices</h3>
              <p className="text-gray-600 leading-relaxed">
                Traditional and modern yoga styles taught by certified instructors with deep understanding of ancient practices
              </p>
            </div>

            <div className="text-center p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-2xl transform hover:scale-105 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur-lg opacity-50"></div>
                  <div className="h-20 w-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center relative z-10">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Expert Instructors</h3>
              <p className="text-gray-600 leading-relaxed">
                Experienced yoga teachers with international certifications and years of dedicated practice
              </p>
            </div>

            <div className="text-center p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-2xl transform hover:scale-105 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-full blur-lg opacity-50"></div>
                  <div className="h-20 w-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center relative z-10">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Serene Environment</h3>
              <p className="text-gray-600 leading-relaxed">
                Peaceful studios designed to enhance your practice with proper ventilation and calming ambiance
              </p>
            </div>
          </div>
        </section>

        {/* Category Businesses Component */}
        <CategoryBusinesses 
          category="yoga" 
          title="Premium Yoga Studios"
          description="Discover authentic yoga studios with experienced instructors and serene environments"
          searchTerm=""
          location=""
          sortBy={sortBy}
          priceFilter={priceFilter}
        />

        {/* Premium CTA Section */}
        <section className="relative bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-green-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Begin your yoga journey with authentic practices and experienced instructors. 
              Find your perfect studio and start your path to mindful wellness today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 min-h-[60px]">
                  <MapPin className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="block">Find Yoga Studios Near Me</span>
                  <ArrowRight className="ml-3 h-5 w-5 flex-shrink-0" />
                </Button>
              </Link>
              <Link to="/register-business">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm bg-white/10 transition-all duration-300 transform hover:scale-105 min-h-[60px]">
                  <Crown className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="block">List Your Yoga Studio</span>
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
