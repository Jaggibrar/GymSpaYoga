
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap, Diamond } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const Pricing = () => {
  const businessPlans = [
    {
      name: "Budget Friendly",
      icon: <Zap className="h-8 w-8" />,
      price: "₹999",
      period: "/month",
      description: "Perfect for small wellness businesses getting started",
      features: [
        "Basic business listing",
        "Up to 3 photos",
        "Contact form inquiries", 
        "Basic analytics",
        "Mobile-friendly profile",
        "Email support"
      ],
      priceRange: "Monthly: ₹1,000 - ₹2,999 | Session: ₹200 - ₹999",
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
      color: "from-green-500 to-green-600"
    },
    {
      name: "Premium",
      icon: <Diamond className="h-8 w-8" />,
      price: "₹1,999",
      period: "/month", 
      description: "Enhanced features for growing wellness businesses",
      features: [
        "Everything in Budget",
        "Up to 5 high-quality photos",
        "Priority listing placement",
        "Advanced booking management",
        "Customer review system",
        "Social media integration",
        "Detailed analytics dashboard",
        "Priority customer support"
      ],
      priceRange: "Monthly: ₹3,000 - ₹4,999 | Session: ₹1,000 - ₹1,999",
      buttonText: "Choose Premium",
      buttonVariant: "default" as const,
      popular: true,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Luxury",
      icon: <Crown className="h-8 w-8" />,
      price: "₹3,999",
      period: "/month",
      description: "Complete premium solution for luxury wellness brands",
      features: [
        "Everything in Premium",
        "Featured listing placement",
        "Custom business page design",
        "Advanced marketing tools",
        "Multiple location support",
        "API access for integrations",
        "Dedicated account manager",
        "24/7 premium support",
        "Custom branding options"
      ],
      priceRange: "Monthly: ₹5,000+ | Session: ₹2,000+",
      buttonText: "Go Luxury",
      buttonVariant: "default" as const,
      popular: false,
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  const customerPlans = [
    {
      name: "Basic Access",
      price: "Free",
      description: "Perfect for exploring wellness options",
      features: [
        "Browse all gyms, spas, and yoga studios",
        "Basic search and filters",
        "Read reviews and ratings",
        "Contact businesses directly",
        "Mobile-friendly interface"
      ],
      buttonText: "Start Free",
      buttonVariant: "outline" as const
    },
    {
      name: "Premium Membership",
      price: "₹199",
      period: "/month",
      description: "Enhanced features for serious wellness enthusiasts",
      features: [
        "Everything in Basic",
        "Advanced search filters",
        "Priority booking support",
        "Exclusive deals and discounts",
        "Booking history and analytics",
        "Cancel/reschedule flexibility",
        "Priority customer support"
      ],
      buttonText: "Upgrade Now",
      buttonVariant: "default" as const,
      popular: true
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
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your wellness journey or business needs. 
              No hidden fees, cancel anytime.
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                🎯 Tiered by Service Quality
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                💰 Competitive Rates
              </Badge>
            </div>
          </div>
        </section>

        {/* Business Pricing */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Business Plans</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get your wellness business discovered by thousands of potential customers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {businessPlans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative hover:shadow-2xl transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r ${plan.color} text-white`}>
                      {plan.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-gray-500">{plan.period}</span>}
                    </div>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                    <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 font-medium">{plan.priceRange}</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-4">
                      <Link to="/register-business">
                        <Button 
                          variant={plan.buttonVariant}
                          className={`w-full ${
                            plan.popular 
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
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

        {/* Customer Pricing */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Customer Plans</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find and book your perfect wellness experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {customerPlans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`hover:shadow-xl transition-shadow duration-300 ${
                    plan.popular ? 'ring-2 ring-emerald-500' : ''
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500">
                      Recommended
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-gray-500">{plan.period}</span>}
                    </div>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-4">
                      <Link to="/login">
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

        {/* Pricing Transparency */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Understanding Our Tier System
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our pricing tiers are based on service quality, amenities, and location to help you find 
                exactly what you're looking for within your budget.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Budget Friendly</h3>
                <p className="text-gray-600 mb-4">
                  Quality wellness services at affordable prices. Perfect for regular fitness routines.
                </p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Monthly:</strong> ₹1,000 - ₹2,999</p>
                  <p className="text-sm"><strong>Per Session:</strong> ₹200 - ₹999</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Diamond className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Premium</h3>
                <p className="text-gray-600 mb-4">
                  Enhanced facilities with better amenities, certified trainers, and modern equipment.
                </p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Monthly:</strong> ₹3,000 - ₹4,999</p>
                  <p className="text-sm"><strong>Per Session:</strong> ₹1,000 - ₹1,999</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Crown className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Luxury</h3>
                <p className="text-gray-600 mb-4">
                  Premium locations with luxury amenities, world-class trainers, and personalized service.
                </p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Monthly:</strong> ₹5,000+</p>
                  <p className="text-sm"><strong>Per Session:</strong> ₹2,000+</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Pricing FAQ</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">How are businesses categorized into tiers?</h3>
                <p className="text-gray-600">
                  Businesses are automatically categorized based on their pricing, amenities, location, 
                  and quality standards. This helps customers find options that match their budget and expectations.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I change my business plan anytime?</h3>
                <p className="text-gray-600">
                  Yes! You can upgrade, downgrade, or cancel your plan at any time. 
                  Changes take effect at the next billing cycle.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Is there a free trial for businesses?</h3>
                <p className="text-gray-600">
                  Yes, we offer a 14-day free trial for all business plans so you can test 
                  all features before committing.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards, debit cards, UPI, and net banking. 
                  All payments are processed securely through our payment partners.
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
