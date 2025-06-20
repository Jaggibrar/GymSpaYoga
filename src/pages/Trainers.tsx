
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, User, Award, ArrowRight, Dumbbell, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import SEOHead from '@/components/SEOHead';

interface Trainer {
  id: string;
  name: string;
  category: string;
  trainer_tier: string;
  hourly_rate: number;
  location: string;
  bio: string;
  specializations: string[];
  experience: number;
  profile_image_url?: string;
  status: string;
}

const Trainers = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setS­ortBy] = useState('created_at');
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchTrainers();
  }, [sortBy, priceFilter, categoryFilter]);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('trainer_profiles')
        .select('*')
        .eq('status', 'approved');

      // Apply price filter
      if (priceFilter) {
        switch (priceFilter) {
          case 'budget':
            query = query.lt('hourly_rate', 1000);
            break;
          case 'premium':
            query = query.gte('hourly_rate', 1000).lt('hourly_rate', 2000);
            break;
          case 'luxury':
            query = query.gte('hourly_rate', 2000);
            break;
        }
      }

      // Apply category filter
      if (categoryFilter) {
        query = query.eq('category', categoryFilter);
      }

      // Apply sorting
      if (sortBy === '-hourly_rate') {
        query = query.order('hourly_rate', { ascending: false });
      } else if (sortBy === 'hourly_rate') {
        query = query.order('hourly_rate', { ascending: true });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query.limit(20);

      if (error) {
        console.error('Error fetching trainers:', error);
        return;
      }

      setTrainers(data || []);
    } catch (err) {
      console.error('Error in fetchTrainers:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPriceTier = (hourlyRate: number) => {
    if (hourlyRate >= 2000) return { tier: 'Luxury', color: 'bg-purple-100 text-purple-800' };
    if (hourlyRate >= 1000) return { tier: 'Premium', color: 'bg-blue-100 text-blue-800' };
    return { tier: 'Budget', color: 'bg-green-100 text-green-800' };
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'expert': return '⭐⭐⭐';
      case 'intermediate': return '⭐⭐';
      default: return '⭐';
    }
  };

  return (
    <>
      <SEOHead
        title="Personal Trainers - Find Expert Fitness Coaches"
        description="Connect with certified personal trainers and fitness coaches. Customized workout plans, nutrition guidance, and expert support for your fitness goals."
        keywords="personal trainer, fitness coach, workout plans, nutrition coaching, certified trainer"
      />
      
      <div className="min-h-screen bg-white">
        <AppHeader />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-6">
              <User className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Personal Trainers
              </h1>
            </div>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Connect with certified personal trainers who will guide you towards achieving your fitness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register-trainer">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Award className="mr-2 h-5 w-5" />
                  Become a Trainer
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Explore All Categories
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
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
                  Luxury
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="gym">Gym Trainer</option>
                  <option value="yoga">Yoga Instructor</option>
                  <option value="fitness">Fitness Coach</option>
                  <option value="nutrition">Nutrition Expert</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="created_at">Newest First</option>
                  <option value="hourly_rate">Price: Low to High</option>
                  <option value="-hourly_rate">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Trainers?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Work with certified professionals who are passionate about helping you achieve your fitness goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Personalized Training</h3>
              <p className="text-gray-600">
                Customized workout plans tailored to your specific goals and fitness level
              </p>
            </div>

            <div className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Expert Guidance</h3>
              <p className="text-gray-600">
                Certified trainers with years of experience and proven track records
              </p>
            </div>

            <div className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Training sessions that fit your schedule and lifestyle preferences
              </p>
            </div>
          </div>
        </section>

        {/* Trainers Listing */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Personal Trainers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with certified trainers who will guide you towards your fitness goals
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600">Loading trainers...</p>
            </div>
          ) : trainers.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Trainers Found</h3>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                We're working hard to onboard more certified trainers in your area. 
                Check back soon or become a trainer yourself!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register-trainer">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Become a Trainer
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button size="lg" variant="outline">
                    Explore Other Categories
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainers.map((trainer) => {
                const priceTier = getPriceTier(trainer.hourly_rate);
                
                return (
                  <Card key={trainer.id} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white overflow-hidden">
                    <div className="relative">
                      <div className="h-48 overflow-hidden">
                        {trainer.profile_image_url ? (
                          <img 
                            src={trainer.profile_image_url} 
                            alt={trainer.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <User className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Badge className={priceTier.color}>
                          {priceTier.tier}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                        {trainer.name}
                      </CardTitle>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {trainer.location}
                        </div>
                        <div className="text-sm text-gray-500">
                          {getTierIcon(trainer.trainer_tier)} {trainer.trainer_tier}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="capitalize">
                          {trainer.category}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {trainer.experience} years exp
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2">
                        {trainer.bio}
                      </p>

                      {trainer.specializations && trainer.specializations.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {trainer.specializations.slice(0, 3).map((spec, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                          {trainer.specializations.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{trainer.specializations.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <span className="text-gray-500 text-sm">Hourly Rate</span>
                            <div className="font-bold text-lg text-blue-600">
                              ₹{trainer.hourly_rate}
                            </div>
                          </div>
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-sm text-gray-600">New</span>
                          </div>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          View Profile
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {trainers.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Showing {trainers.length} certified trainers • Ready to start your fitness journey?
              </p>
              <Link to="/register-trainer">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Become a Trainer
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 py-16">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Fitness?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Connect with certified personal trainers who will create customized plans for your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Trainers Near Me
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register-trainer">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Become a Trainer
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

export default Trainers;
