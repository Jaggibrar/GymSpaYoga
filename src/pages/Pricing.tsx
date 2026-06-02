import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Sparkles, Heart, ArrowRight, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdvancedSEOManager } from '@/components/SEO/AdvancedSEOManager';

const Pricing = () => {
  const businessPlans = [
    {
      name: 'Budget Plan',
      icon: <Heart className="h-8 w-8" />,
      registrationFee: '₹5,999',
      monthlyFee: '₹1,500',
      leadCharge: '₹20',
      description: 'Perfect for emerging gyms, local wellness centers, and community-based yoga spaces',
      longDescription: 'Get discovered by new customers in your area with ease. Designed for businesses building visibility and credibility on a budget.',
      tagline: 'Your first step to online visibility begins here.',
      isPopular: false,
      badge: null,
    },
    {
      name: 'Premium Plan',
      icon: <Sparkles className="h-8 w-8" />,
      registrationFee: '₹8,999',
      monthlyFee: '₹1,500',
      leadCharge: '₹20',
      description: 'Ideal for growing gyms, branded yoga studios, and trusted urban wellness destinations',
      longDescription: 'Upgrade your brand presence with a prominent profile, detailed insights, and a smoother customer experience.',
      tagline: 'Get the spotlight your business deserves.',
      isPopular: true,
      badge: 'Most Popular',
    },
    {
      name: 'Luxury Plan',
      icon: <Crown className="h-8 w-8" />,
      registrationFee: '₹10,000',
      monthlyFee: '₹2,000',
      leadCharge: '₹20',
      description: 'Perfect for premium gyms, luxury spas, and elite yoga retreats',
      longDescription: 'Built for scale, trust, and prestige — high-converting leads, top placement, and premium support tailored to your growth.',
      tagline: 'Make your brand unforgettable — lead the wellness revolution.',
      isPopular: false,
      badge: 'Premium Tier',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Pricing Plans - GymSpaYoga.com',
    description: 'Transparent pricing for users and business owners.',
    url: 'https://gymspayoga.com/pricing',
    offers: businessPlans.map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      description: plan.description,
      price: plan.registrationFee.replace('₹', ''),
      priceCurrency: 'INR',
    })),
  };

  return (
    <>
      <AdvancedSEOManager
        title="Pricing — Free for Users, Flexible for Businesses | GymSpaYoga"
        description="Free for users to explore and book. Transparent business pricing — Budget (₹5,999), Premium (₹8,999), or Luxury (₹10,000)."
        keywords="gym pricing, spa pricing, yoga pricing, wellness business plans, transparent pricing"
        structuredData={structuredData}
        canonical="https://gymspayoga.com/pricing"
      />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 grain-overlay pointer-events-none" />
          <div className="container-modern relative text-center">
            <div className="max-w-3xl mx-auto animate-fade-in">
              <Badge className="mb-6 bg-primary/15 text-primary border border-primary/30 px-4 py-1.5 rounded-full">
                <Shield className="h-3.5 w-3.5 mr-2" />
                100% Transparent Pricing
              </Badge>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-[1.05]">
                Simple, transparent <span className="text-gradient-emerald">pricing</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Free for users to discover and book. Businesses only pay for successful leads — no hidden charges.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/explore">
                  <Button size="lg" className="btn-primary">
                    Start Exploring Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/register-business">
                  <Button size="lg" className="btn-secondary">List Your Business</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* User pricing */}
        <section className="section-padding">
          <div className="container-modern">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
                For wellness <span className="text-gradient-emerald">seekers</span>
              </h2>
              <p className="text-muted-foreground text-lg">Everything to discover and book amazing wellness experiences.</p>
            </div>

            <div className="max-w-xl mx-auto">
              <Card className="glass-card border-primary/30 overflow-hidden">
                <div className="bg-gradient-emerald text-primary-foreground p-8 text-center">
                  <Heart className="h-14 w-14 mx-auto mb-4" />
                  <h3 className="text-3xl font-display font-bold mb-1">Absolutely Free</h3>
                  <p className="text-base opacity-90">For All Users</p>
                </div>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-6xl font-display font-black text-gradient-emerald mb-2">₹0</div>
                    <p className="text-muted-foreground">No charges, ever.</p>
                  </div>
                  <div className="space-y-3 mb-8">
                    {[
                      'Explore nearby gyms, spas, yoga & trainers',
                      'View real listings, reviews & photos',
                      'Book your preferred wellness experience',
                      'No registration or hidden fees',
                      'Instant booking confirmations',
                      'Access to exclusive deals',
                      '24/7 customer support',
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-primary/20 border border-primary/40 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-foreground text-sm">{feature}</span>
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

        {/* Business plans */}
        <section className="section-padding">
          <div className="container-modern">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
                For business <span className="text-gradient-emerald">owners</span>
              </h2>
              <p className="text-muted-foreground text-lg">Choose the plan that fits your wellness business.</p>
              <div className="mt-6 glass-card px-5 py-3 inline-flex items-center gap-2">
                <Star className="h-4 w-4 text-gold" />
                <span className="text-sm text-foreground"><strong>Launch Offer:</strong> Monthly charges start only after 6 months.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {businessPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative glass-card glass-card-hover border-0 overflow-hidden ${
                    plan.isPopular ? 'lg:-mt-6 lg:mb-6 border-primary/40 shadow-emerald' : ''
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-emerald text-primary-foreground px-4 py-1.5 text-xs font-bold shadow-emerald rounded-full">
                        <Crown className="h-3 w-3 mr-1" />
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <div className="p-8 text-center border-b border-white/10">
                    <div className="text-primary mb-4 flex justify-center">{plan.icon}</div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-3">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{plan.description}</p>
                    <div className="space-y-2">
                      <div className="text-3xl font-display font-black text-gradient-emerald">
                        {plan.registrationFee}
                        <span className="text-xs font-normal text-muted-foreground ml-1">one-time</span>
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        {plan.monthlyFee}<span className="text-xs font-normal text-muted-foreground">/mo · after 6mo</span>
                      </div>
                      <div className="text-sm font-medium glass-card inline-block py-2 px-3">
                        {plan.leadCharge} per lead
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">{plan.longDescription}</p>
                    <p className="text-primary font-medium text-sm mb-6">📌 {plan.tagline}</p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="glass-card p-3 text-center">
                        <Check className="h-4 w-4 text-primary mx-auto mb-1" />
                        <span className="text-xs text-muted-foreground font-medium">No hidden fees</span>
                      </div>
                      <div className="glass-card p-3 text-center">
                        <Shield className="h-4 w-4 text-primary mx-auto mb-1" />
                        <span className="text-xs text-muted-foreground font-medium">Verified leads</span>
                      </div>
                    </div>

                    <Link to="/register-business" className="block">
                      <Button size="lg" className={`w-full ${plan.isPopular ? 'btn-primary' : 'btn-secondary'}`}>
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

        {/* Trust */}
        <section className="section-padding">
          <div className="container-modern">
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-10 md:p-14 text-center">
                <Shield className="h-14 w-14 mx-auto mb-5 text-primary" />
                <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
                  100% transparent. <span className="text-gradient-emerald">No hidden charges.</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-3">
                    <h4 className="text-lg font-display font-semibold text-foreground">For Users</h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /><span>Always free to browse and book</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /><span>No membership fees</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /><span>No booking charges</span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-display font-semibold text-foreground">For Businesses</h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /><span>Pay only for successful leads</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /><span>6 months free platform access</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /><span>Cancel anytime</span></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 text-xs text-muted-foreground">
                  * Prices in INR. All memberships include 7-day free trial. Platform charges start only after 6 months of registration.
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
