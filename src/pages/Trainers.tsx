
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
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted/50 text-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Perfect Personal Trainer
              </h1>
              <p className="text-lg text-muted-foreground">
                Browse trainers across all price ranges - from budget-friendly options to elite fitness coaches
              </p>
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
