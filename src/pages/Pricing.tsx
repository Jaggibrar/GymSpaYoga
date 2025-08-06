import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Sparkles, Building2, Heart, ArrowRight, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdvancedSEOManager } from '@/components/SEO/AdvancedSEOManager';

const Pricing = () => {
  const businessPlans = [
    {
      name: "Budget Plan",
      icon: <Building2 className="h-8 w-8" />,
      registrationFee: "₹5,999",
      monthlyFee: "₹1,500",
      leadCharge: "₹20",
      description: "Perfect for local gyms, affordable wellness studios, and community centers",
      features: [
        "Basic listing with photos",
        "Contact details display",
        "Review system integration",
        "Search visibility",
        "Mobile-optimized profile",
        "Basic analytics",
        "Email support"
      ],
      isPopular: false,
      gradient: "from-blue-500 to-blue-600",
      badge: null
    },
    {
      name: "Premium Plan",
      icon: <Sparkles className="h-8 w-8" />,
      registrationFee: "₹8,999",
      monthlyFee: "₹1,500",
      leadCharge: "₹20",
      description: "Ideal for well-established gyms, urban spas, and branded yoga studios",
      features: [
        "Enhanced listing with gallery",
        "Priority in search results",
        "Advanced booking system",
        "Customer management tools",
        "Detailed analytics dashboard",
        "Social media integration",
        "Priority customer support",
        "Marketing toolkit"
      ],
      isPopular: true,
      gradient: "from-primary to-primary-dark",
      badge: "Most Popular"
    },
    {
      name: "Luxury Plan",
      icon: <Crown className="h-8 w-8" />,
      registrationFee: "₹10,000",
      monthlyFee: "₹2,000",
      leadCharge: "₹20",
      description: "Premium solution for high-end gyms, luxury spas, and exclusive yoga retreats",
      features: [
        "Premium listing with video content",
        "Top placement in search",
        "Advanced CRM integration",
        "Custom branding options",
        "Real-time notifications",
        "Dedicated account manager",
        "White-label booking system",
        "Advanced reporting suite",
        "24/7 premium support"
      ],
      isPopular: false,
      gradient: "from-accent to-wellness-gold",
      badge: "Premium"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pricing Plans - GymSpaYoga.com",
    "description": "Transparent pricing for users and business owners. Free for users, flexible plans for wellness businesses.",
    "url": "https://gymspayyoga.com/pricing",
    "offers": businessPlans.map(plan => ({
      "@type": "Offer",
      "name": plan.name,
      "description": plan.description,
      "price": plan.registrationFee.replace('₹', ''),
      "priceCurrency": "INR"
    }))
  };

  return (
    <>
      <AdvancedSEOManager
        title="Pricing Plans - Free for Users, Flexible for Businesses | GymSpaYoga.com"
        description="Completely free for users to explore and book wellness services. Transparent business pricing with no hidden charges. Choose from Budget (₹5,999), Premium (₹8,999), or Luxury (₹10,000) plans."
        keywords="gym pricing, spa pricing, yoga pricing, wellness business plans, free booking platform, fitness membership pricing, transparent pricing"
        structuredData={structuredData}
        canonical="https://gymspayyoga.com/pricing"
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-wellness-cream to-primary-light">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary/10 via-wellness-cream to-background">
          <div className="container-modern text-center">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-6 bg-primary text-primary-foreground text-lg px-6 py-2" variant="default">
                <Shield className="h-4 w-4 mr-2" />
                100% Transparent Pricing
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Simple, Transparent
                <span className="text-gradient-primary block">Pricing for Everyone</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Absolutely free for users to discover and book wellness services. 
                Business owners only pay for successful leads with no hidden charges.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/explore">
                  <Button size="lg" className="btn-primary">
                    Start Exploring Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/register-business">
                  <Button size="lg" variant="outline" className="btn-secondary">
                    List Your Business
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* User Pricing Section */}
        <section className="py-16 bg-background">
          <div className="container-modern">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                For Wellness Seekers
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to discover and book amazing wellness experiences
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="card-modern border-4 border-primary shadow-strong overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary-dark text-primary-foreground p-8 text-center">
                  <Heart className="h-16 w-16 mx-auto mb-4 opacity-90" />
                  <h3 className="text-3xl font-bold mb-2">Absolutely Free</h3>
                  <p className="text-xl opacity-90">For All Users</p>
                </div>
                
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-6xl font-black text-primary mb-2">₹0</div>
                    <p className="text-muted-foreground text-lg">No charges, ever</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {[
                      "Explore nearby gyms, spas, yoga studios, and trainers",
                      "View real listings, reviews, and photos",
                      "Book your preferred wellness experience",
                      "No registration fees or hidden charges",
                      "Instant booking confirmations",
                      "Access to exclusive deals and offers",
                      "24/7 customer support"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/explore" className="block">
                    <Button size="lg" className="w-full btn-primary">
                      Start Exploring
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Business Plans Section */}
        <section className="py-16 bg-gradient-to-br from-muted/30 via-background to-primary-light/20">
          <div className="container-modern">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                For Business Owners
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Choose the perfect plan for your wellness business. All plans include lead generation, 
                customer management, and our powerful booking platform.
              </p>
              
              <div className="mt-8 bg-wellness-cream/80 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto">
                <p className="text-foreground font-medium text-lg">
                  <Star className="inline h-5 w-5 text-accent mr-2" />
                  <strong>Special Launch Offer:</strong> Monthly charges start only after 6 months!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {businessPlans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative card-modern hover-lift transition-all duration-500 ${
                    plan.isPopular ? 'border-4 border-primary shadow-strong lg:-mt-8 lg:mb-8' : 'border-2 border-border'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className={`bg-gradient-to-r ${plan.gradient} text-white px-6 py-2 text-sm font-bold shadow-lg`}>
                        <Crown className="h-4 w-4 mr-1" />
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <div className={`bg-gradient-to-r ${plan.gradient} text-white p-6 text-center`}>
                    <div className="opacity-90 mb-3">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="opacity-90 text-sm leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <CardContent className="p-8">
                    <div className="space-y-6 mb-8">
                      <div className="text-center">
                        <div className="text-4xl font-black text-foreground mb-1">
                          {plan.registrationFee}
                        </div>
                        <p className="text-muted-foreground text-sm font-medium">One-time registration</p>
                      </div>

                      <div className="bg-muted/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-foreground mb-1">
                          {plan.monthlyFee}<span className="text-lg font-normal">/month</span>
                        </div>
                        <p className="text-muted-foreground text-sm">After 6 months</p>
                      </div>

                      <div className="bg-accent/10 rounded-xl p-4 text-center border border-accent/20">
                        <div className="text-xl font-bold text-accent mb-1">
                          {plan.leadCharge} per lead
                        </div>
                        <p className="text-muted-foreground text-sm">Only successful bookings</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                          <span className="text-muted-foreground text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link to="/register-business" className="block">
                      <Button 
                        size="lg" 
                        className={`w-full ${plan.isPopular ? 'btn-primary' : 'btn-secondary'} transition-all duration-300`}
                      >
                        Register Your Business
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Transparency Section */}
        <section className="py-16 bg-background">
          <div className="container-modern">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-wellness-cream to-primary-light/20 rounded-3xl p-12 shadow-soft">
                <Shield className="h-16 w-16 mx-auto mb-6 text-primary" />
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  100% Transparent. No Hidden Charges.
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-foreground">For Users:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Always free to browse and book</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>No membership fees</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>No booking charges</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-foreground">For Businesses:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Pay only for successful leads</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>6 months free platform access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Cancel anytime</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-primary/10 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    * Prices are in Indian Rupees (INR). All memberships include 7-day free trial. 
                    Platform charges start only after 6 months of registration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Pricing;