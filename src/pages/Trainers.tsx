
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Users, Award, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import TrainerListings from '@/components/TrainerListings';
import SEOHead from '@/components/SEOHead';

const Trainers = () => {
  const [sortBy, setSortBy] = useState('created_at');
  const [priceFilter, setPriceFilter] = useState('');

  return (
    <>
      <SEOHead
        title="Expert Personal Trainers - Find the Best Fitness Coaches"
        description="Connect with certified personal trainers and fitness coaches. Achieve your fitness goals with expert guidance and personalized training programs."
        keywords="personal trainer, fitness coach, strength training, weight loss, fitness guidance"
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-20 lg:py-32">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Personal trainer"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/80 to-indigo-600/80"></div>
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-6">
              <Users className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Expert Personal Trainers
              </h1>
            </div>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Connect with certified fitness coaches who will guide you to achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register-trainer">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Award className="mr-2 h-5 w-5" />
                  Become a Trainer
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
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
                  All Trainers
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
                  Elite Trainers
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="created_at">Newest First</option>
                  <option value="session_price">Price: Low to High</option>
                  <option value="-session_price">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Trainers Listings - First Priority */}
        <TrainerListings 
          searchTerm=""
          location=""
          sortBy={sortBy}
          priceFilter={priceFilter}
        />

        {/* Features Section - Below Listings */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Expert Trainers?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience personalized fitness coaching with certified professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Certified Professionals</h3>
              <p className="text-gray-600">
                All trainers are certified with proven track records in fitness coaching
              </p>
            </div>

            <div className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Personalized Programs</h3>
              <p className="text-gray-600">
                Custom fitness plans tailored to your specific goals and fitness level
              </p>
            </div>

            <div className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Proven Results</h3>
              <p className="text-gray-600">
                Track record of helping clients achieve their fitness transformation goals
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-500 to-indigo-600 py-16">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Fitness Journey?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Connect with expert trainers who will guide you every step of the way to achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Trainers Near Me
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register-trainer">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Become a Trainer
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Trainers;
