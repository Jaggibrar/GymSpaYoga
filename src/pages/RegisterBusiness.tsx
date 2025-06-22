
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Users, TrendingUp, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const RegisterBusiness = () => {
  const benefits = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Reach More Customers",
      description: "Connect with thousands of fitness enthusiasts looking for quality services in your area."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Grow Your Revenue",
      description: "Increase bookings and revenue with our powerful marketing and booking management tools."
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Build Your Reputation",
      description: "Showcase your services, collect reviews, and build a strong online presence."
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Easy Management",
      description: "Manage bookings, schedules, and customer communications from one simple dashboard."
    }
  ];

  const features = [
    "Professional business profile",
    "Advanced booking management",
    "Customer communication tools",
    "Marketing and promotion features",
    "Analytics and insights",
    "Mobile-optimized interface",
    "24/7 customer support",
    "Flexible pricing options"
  ];

  const steps = [
    {
      step: "1",
      title: "Create Your Profile",
      description: "Add your business details, photos, and services offered."
    },
    {
      step: "2",
      title: "Get Verified",
      description: "Our team will review and verify your business within 24 hours."
    },
    {
      step: "3",
      title: "Start Receiving Bookings",
      description: "Go live and start accepting bookings from customers in your area."
    }
  ];

  return (
    <>
      <SEOHead
        title="Register Your Business - GymSpaYoga | Join Our Platform"
        description="List your gym, spa, or yoga studio on GymSpaYoga. Reach more customers, manage bookings easily, and grow your wellness business with our platform."
        keywords="register business, list gym, spa registration, yoga studio, business partner"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Partner With GymSpaYoga</h1>
              <p className="text-xl mb-8">
                Join India's fastest-growing wellness platform and take your business to the next level. 
                Connect with more customers and grow your revenue effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/business-dashboard">
                  <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                    <Building2 className="mr-2 h-5 w-5" />
                    Start Registration
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                    View Pricing Plans
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Why Choose GymSpaYoga?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-emerald-600">{benefit.icon}</div>
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

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              How It Works
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
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
                    alt="Business dashboard"
                    className="rounded-2xl shadow-2xl mb-8"
                  />
                </div>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                      <span className="text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of successful wellness businesses already growing with GymSpaYoga. 
              Start your registration today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/business-dashboard">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                  <Building2 className="mr-2 h-5 w-5" />
                  Register Your Business
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/support">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                  Contact Sales Team
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RegisterBusiness;
