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
      name: "💙 Budget Plan",
      icon: <Heart className="h-8 w-8" />,
      registrationFee: "₹5,999",
      monthlyFee: "₹1,500",
      leadCharge: "₹20",
      description: "Perfect for emerging gyms, local wellness centers, and community-based yoga spaces",
      longDescription: "Get discovered by new customers in your area with ease. This plan is designed for businesses that want to build visibility and credibility on a budget. A great way to start your digital journey and attract steady leads without upfront complexity.",
      tagline: "Your first step to online visibility begins here.",
      isPopular: false,
      gradient: "from-blue-500 to-blue-600",
      badge: null
    },
    {
      name: "💚 Premium Plan",
      icon: <Sparkles className="h-8 w-8" />,
      registrationFee: "₹8,999",
      monthlyFee: "₹1,500",
      leadCharge: "₹20",
      description: "Ideal for growing gyms, branded yoga studios, and trusted urban wellness destinations",
      longDescription: "Upgrade your brand presence with a more prominent profile, detailed insights, and a smoother customer experience. Designed to help you attract, engage, and retain more customers with powerful tools built to grow your wellness business.",
      tagline: "Get the spotlight your business deserves.",
      isPopular: true,
      gradient: "from-primary to-primary-dark",
      badge: "Most Popular"
    },
    {
      name: "🧡 Luxury Plan",
      icon: <Crown className="h-8 w-8" />,
      registrationFee: "₹10,000",
      monthlyFee: "₹2,000",
      leadCharge: "₹20",
      description: "Perfect for premium gyms, luxury spas, and elite yoga retreats",
      longDescription: "Put your brand on top and offer a world-class experience to your clients. This premium plan is built for scale, trust, and prestige — with tools that ensure high-converting leads, top placement in search results, and premium support tailored to your growth.",
      tagline: "Make your brand unforgettable — lead the wellness revolution.",
      isPopular: false,
      gradient: "from-accent to-wellness-gold",
      badge: "Premium Tier"
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

                   <div className={`bg-gradient-to-r ${plan.gradient} text-white p-8 text-center`}>
                    <div className="opacity-90 mb-4">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                    <p className="opacity-90 text-sm leading-relaxed mb-4">
                      {plan.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="text-3xl font-black">
                        {plan.registrationFee} <span className="text-sm font-normal opacity-75">one-time registration</span>
                      </div>
                      <div className="text-xl font-semibold">
                        {plan.monthlyFee}/month <span className="text-sm font-normal opacity-75">(starts after 6 months)</span>
                      </div>
                      <div className="text-lg font-medium bg-white/20 rounded-lg py-2 px-4 inline-block">
                        {plan.leadCharge} per lead <span className="text-sm opacity-75">(only on successful bookings)</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <div className="mb-6">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        ✨ {plan.longDescription}
                      </p>
                      <p className="text-primary font-medium text-sm">
                        📌 {plan.tagline}
                      </p>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                        <Check className="h-4 w-4 text-green-600 mx-auto mb-1" />
                        <span className="text-xs text-green-700 font-medium">No hidden fees</span>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                        <Shield className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                        <span className="text-xs text-blue-700 font-medium">100% verified leads</span>
                      </div>
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