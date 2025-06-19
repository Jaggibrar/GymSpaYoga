
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ArrowRight, Sparkles, Zap, Users, Crown, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import AppFooter from '@/components/AppFooter';
import SEOHead from '@/components/SEOHead';

const Spas = () => {
  const [sortBy, setSortBy] = useState('created_at');
  const [priceFilter, setPriceFilter] = useState('');

  return (
    <>
      <SEOHead
        title="Luxury Spas - Premium Wellness & Relaxation Centers"
        description="Discover the finest spas and wellness centers. Professional treatments, luxurious facilities, and expert therapists. Book your relaxation session today!"
        keywords="spa, wellness center, massage, relaxation, luxury spa, beauty treatments"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900">
        {/* Premium Hero Section */}
        <section className="relative bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/20">
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                <Sparkles className="h-20 w-20 mr-6 relative z-10 drop-shadow-2xl" />
              </div>
              <div>
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                  Luxury Spas
                </h1>
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <Crown className="h-6 w-6 text-yellow-300" />
                  <span className="text-xl text-pink-100 font-semibold">Premium Wellness Experience</span>
                  <Crown className="h-6 w-6 text-yellow-300" />
                </div>
              </div>
            </div>
            
            <p className="text-xl mb-8 text-pink-100 max-w-3xl mx-auto leading-relaxed">
              Indulge in world-class spa treatments and wellness experiences. 
              Discover rejuvenating therapies designed to restore your mind, body, and soul.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register-business">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 min-h-[60px]">
                  <Award className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="block">List Your Luxury Spa</span>
                  <ArrowRight className="ml-3 h-5 w-5 flex-shrink-0" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-pink-600 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm bg-white/10 transition-all duration-300 transform hover:scale-105 min-h-[60px]">
                  <Sparkles className="mr-3 h-5 w-5 flex-shrink-0" />
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
                  All Spas
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
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
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
              Why Choose Premium Spas?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the ultimate in luxury and wellness with our carefully selected spa partners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-2xl transform hover:scale-105 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-50"></div>
                  <div className="h-20 w-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center relative z-10">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Luxury Treatments</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience world-class spa treatments with premium products and techniques for ultimate relaxation
              </p>
            </div>

            <div className="text-center p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-2xl transform hover:scale-105 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-lg opacity-50"></div>
                  <div className="h-20 w-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center relative z-10">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Expert Therapists</h3>
              <p className="text-gray-600 leading-relaxed">
                Certified wellness professionals with years of experience in various therapeutic techniques
              </p>
            </div>

            <div className="text-center p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-2xl transform hover:scale-105 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full blur-lg opacity-50"></div>
                  <div className="h-20 w-20 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center relative z-10">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Premium Facilities</h3>
              <p className="text-gray-600 leading-relaxed">
                State-of-the-art spa facilities with luxury amenities for a complete wellness experience
              </p>
            </div>
          </div>
        </section>

        {/* Category Businesses Component */}
        <CategoryBusinesses 
          category="spa" 
          title="Premium Spas"
          description="Discover luxury spas and wellness centers with expert therapists and premium facilities"
          searchTerm=""
          location=""
          sortBy={sortBy}
          priceFilter={priceFilter}
        />

        {/* Premium CTA Section */}
        <section className="relative bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Rejuvenate Your Soul?
            </h2>
            <p className="text-xl text-pink-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover the perfect spa experience tailored to your wellness needs. 
              Book your luxury treatment today and embark on a journey of relaxation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 min-h-[60px]">
                  <MapPin className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="block">Find Luxury Spas Near Me</span>
                  <ArrowRight className="ml-3 h-5 w-5 flex-shrink-0" />
                </Button>
              </Link>
              <Link to="/register-business">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-pink-600 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm bg-white/10 transition-all duration-300 transform hover:scale-105 min-h-[60px]">
                  <Crown className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="block">List Your Luxury Spa</span>
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
