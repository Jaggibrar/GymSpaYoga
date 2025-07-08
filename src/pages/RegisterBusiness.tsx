
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Users, TrendingUp, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BusinessRegistrationForm from '@/components/business/BusinessRegistrationForm';
import SEOHead from '@/components/SEOHead';

const RegisterBusiness = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = React.useState(false);

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

  if (showForm) {
    return (
      <>
        <SEOHead
          title="Register Your Business - GymSpaYoga | Join Our Platform"
          description="List your gym, spa, or yoga studio on GymSpaYoga. Reach more customers, manage bookings easily, and grow your wellness business with our platform."
          keywords="register business, list gym, spa registration, yoga studio, business partner"
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setShowForm(false)}
                className="mb-4"
              >
                ← Back to Information
              </Button>
            </div>
            <BusinessRegistrationForm />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Register Your Business - GymSpaYoga | Join Our Platform"
        description="List your gym, spa, or yoga studio on GymSpaYoga. Reach more customers, manage bookings easily, and grow your wellness business with our platform."
        keywords="register business, list gym, spa registration, yoga studio, business partner"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-600 text-white py-20 lg:py-32">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
          </div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                  Partner With <span className="text-emerald-200">GymSpaYoga</span>
                </h1>
                <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                  Join India's fastest-growing wellness marketplace and take your business to the next level. 
                  Connect with thousands of health-conscious customers and grow your revenue effortlessly.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-emerald-600 hover:bg-gray-100"
                  onClick={() => setShowForm(true)}
                >
                  <Building2 className="mr-2 h-5 w-5" />
                  Start Registration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of successful wellness businesses already growing with GymSpaYoga. 
              Start your registration today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-emerald-600 hover:bg-gray-100"
                onClick={() => setShowForm(true)}
              >
                <Building2 className="mr-2 h-5 w-5" />
                Register Your Business
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
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
