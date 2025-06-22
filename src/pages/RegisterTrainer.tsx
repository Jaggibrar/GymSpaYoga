
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Trophy, DollarSign, Calendar, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const RegisterTrainer = () => {
  const benefits = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Find More Clients",
      description: "Connect with clients actively looking for personal training services in your area."
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Increase Your Income",
      description: "Set your own rates and build a steady stream of income with consistent bookings."
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Flexible Scheduling",
      description: "Manage your availability and bookings on your own terms with our easy scheduling tools."
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Build Your Brand",
      description: "Showcase your expertise, collect reviews, and build a strong professional reputation."
    }
  ];

  const features = [
    "Professional trainer profile",
    "Client booking management",
    "Flexible pricing options",
    "Calendar integration",
    "Client communication tools",
    "Review and rating system",
    "Marketing support",
    "Mobile app access"
  ];

  const tiers = [
    {
      name: "Certified Trainer",
      price: "₹500/session",
      description: "Perfect for certified fitness professionals starting their journey"
    },
    {
      name: "Expert Trainer", 
      price: "₹1000/session",
      description: "For experienced trainers with specialized skills and certifications"
    },
    {
      name: "Elite Trainer",
      price: "₹2000/session", 
      description: "Top-tier trainers with extensive experience and proven results"
    }
  ];

  return (
    <>
      <SEOHead
        title="Become a Personal Trainer - GymSpaYoga | Join Our Platform"
        description="Join GymSpaYoga as a personal trainer. Find more clients, set your own rates, and build your fitness coaching business with our platform."
        keywords="personal trainer registration, fitness coach, trainer platform, become trainer"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Become a Personal Trainer</h1>
              <p className="text-xl mb-8">
                Turn your passion for fitness into a thriving career. Join GymSpaYoga and connect 
                with clients who are serious about achieving their fitness goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Users className="mr-2 h-5 w-5" />
                  Start Registration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Why Train With GymSpaYoga?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-purple-600">{benefit.icon}</div>
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Trainer Tiers & Earnings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {tiers.map((tier, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {[...Array(index + 1)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold text-purple-600 mt-2">{tier.price}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{tier.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                Everything You Need to Succeed
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src="/placeholder.svg" 
                    alt="Trainer dashboard"
                    className="rounded-2xl shadow-2xl mb-8"
                  />
                </div>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-purple-500 flex-shrink-0" />
                      <span className="text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Requirements to Join
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Basic Requirements</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Valid fitness certification</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Minimum 1 year experience</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Professional liability insurance</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Background verification</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">What We Provide</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>Marketing and promotion</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>Secure payment processing</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>Client management tools</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>24/7 support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of successful trainers already building their careers with GymSpaYoga. 
              Your next client is waiting for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Users className="mr-2 h-5 w-5" />
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/support">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RegisterTrainer;
