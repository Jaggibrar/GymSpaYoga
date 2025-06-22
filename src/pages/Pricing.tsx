
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      icon: <Zap className="h-8 w-8" />,
      price: "Free",
      description: "Perfect for getting started with your wellness journey",
      features: [
        "Browse all gyms, spas, and yoga studios",
        "Basic search and filters",
        "Read reviews and ratings",
        "Contact businesses directly",
        "Mobile-friendly interface"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Premium",
      icon: <Star className="h-8 w-8" />,
      price: "₹199",
      period: "/month",
      description: "Enhanced features for serious fitness enthusiasts",
      features: [
        "Everything in Basic",
        "Advanced search filters",
        "Priority booking support",
        "Exclusive deals and discounts",
        "Booking history and analytics",
        "Cancel/reschedule flexibility",
        "Priority customer support"
      ],
      buttonText: "Choose Premium",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Business",
      icon: <Crown className="h-8 w-8" />,
      price: "₹999",
      period: "/month",
      description: "Complete solution for fitness business owners",
      features: [
        "List your business on the platform",
        "Manage bookings and schedules",
        "Customer communication tools",
        "Analytics and insights",
        "Marketing and promotion tools",
        "Priority listing placement",
        "Dedicated account manager",
        "24/7 business support"
      ],
      buttonText: "Start Business",
      buttonVariant: "default" as const,
      popular: false
    }
  ];

  return (
    <>
      <SEOHead
        title="Pricing Plans - GymSpaYoga | Choose Your Perfect Plan"
        description="Discover our flexible pricing plans for users and businesses. Start free or upgrade for premium features and business solutions."
        keywords="pricing, plans, subscription, business, premium, free trial"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Choose the perfect plan for your wellness journey or business needs. 
              No hidden fees, cancel anytime.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative hover:shadow-2xl transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-emerald-500 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-2">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {plan.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-gray-500">{plan.period}</span>}
                    </div>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-6">
                      <Link to={plan.name === 'Business' ? '/register-business' : '/signup'}>
                        <Button 
                          variant={plan.buttonVariant}
                          className={`w-full ${
                            plan.popular 
                              ? 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600' 
                              : ''
                          }`}
                        >
                          {plan.buttonText}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Pricing FAQ</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I change my plan anytime?</h3>
                <p className="text-gray-600">
                  Yes! You can upgrade, downgrade, or cancel your plan at any time. 
                  Changes take effect at the next billing cycle.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-gray-600">
                  Our Basic plan is completely free forever. For Premium and Business plans, 
                  we offer a 14-day free trial so you can test all features.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards, debit cards, UPI, and net banking. 
                  All payments are processed securely.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-gray-600">
                  Yes, we offer a 30-day money-back guarantee if you're not completely satisfied 
                  with our Premium or Business plans.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Pricing;
