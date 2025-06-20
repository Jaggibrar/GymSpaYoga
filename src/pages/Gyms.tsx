
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Dumbbell, Zap, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import SEOHead from '@/components/SEOHead';

const Gyms = () => {
  const [sortBy, setSortBy] = useState('created_at');
  const [priceFilter, setPriceFilter] = useState('');

  return (
    <>
      <SEOHead
        title="Premium Gyms - Find the Best Fitness Centers Near You"
        description="Discover top-rated gyms and fitness centers. Modern equipment, expert trainers, and flexible memberships. Start your fitness journey today!"
        keywords="gym, fitness center, workout, personal trainer, strength training, cardio"
      />
      
      <div className="min-h-screen bg-white">
        <AppHeader />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-6">
              <Dumbbell className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Premium Gyms
              </h1>
            </div>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover state-of-the-art fitness centers with modern equipment and expert trainers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register-business">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  <Award className="mr-2 h-5 w-5" />
                  List Your Gym
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  Explore All Categories
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={priceFilter === '' ? 'default' : 'outline'}
                  onClick={() => setPriceFilter('')}
                  className="rounded-full"
                >
                  All Gyms
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
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="created_at">Newest First</option>
                  <option value="session_price">Price: Low to High</option>
                  <option value="-session_price">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Premium Gyms?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our carefully curated fitness centers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Modern Equipment</h3>
              <p className="text-gray-600">
                Latest fitness technology and premium equipment maintained to perfection
              </p>
            </div>

            <div className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Expert Trainers</h3>
              <p className="text-gray-600">
                Certified personal trainers ready to guide your transformation journey
              </p>
            </div>

            <div className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Flexible Plans</h3>
              <p className="text-gray-600">
                Membership options that adapt to your lifestyle and fitness goals
              </p>
            </div>
          </div>
        </section>

        {/* Category Businesses Component */}
        <CategoryBusinesses 
          category="gym" 
          title="Premium Gyms"
          description="Discover state-of-the-art fitness centers with modern equipment and expert trainers"
          searchTerm=""
          location=""
          sortBy={sortBy}
          priceFilter={priceFilter}
        />

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-orange-500 to-red-600 py-16">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Life?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of fitness enthusiasts who have achieved their goals with our premium gym partners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Gyms Near Me
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register-business">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  List Your Gym
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <AppFooter />
      </div>
    </>
  );
};

export default Gyms;
