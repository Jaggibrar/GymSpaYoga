import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Users, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BusinessRegistrationForm from '@/components/business/BusinessRegistrationForm';
import SEOHead from '@/components/SEOHead';

const RegisterBusiness = () => {
  const [showForm, setShowForm] = React.useState(false);

  const benefits = [
    { icon: <Users className="h-7 w-7" />, title: 'Reach more customers', description: 'Connect with thousands of wellness seekers in your area.' },
    { icon: <TrendingUp className="h-7 w-7" />, title: 'Grow your revenue', description: 'Powerful marketing and booking tools that compound over time.' },
    { icon: <Star className="h-7 w-7" />, title: 'Build your reputation', description: 'Showcase services, collect reviews, own your presence.' },
    { icon: <Building2 className="h-7 w-7" />, title: 'Easy management', description: 'One dashboard for bookings, schedules, and customer chats.' },
  ];

  if (showForm) {
    return (
      <>
        <SEOHead
          title="Register Your Business - GymSpaYoga"
          description="List your gym, spa, or yoga studio on GymSpaYoga. Reach more customers and grow your wellness business."
          keywords="register business, list gym, spa registration, yoga studio, business partner"
        />
        <div className="min-h-screen bg-background py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Button variant="ghost" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
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
        description="List your gym, spa, or yoga studio on GymSpaYoga. Reach more customers, manage bookings easily, and grow your wellness business."
        keywords="register business, list gym, spa registration, yoga studio, business partner"
      />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden section-padding">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 grain-overlay pointer-events-none" />
          <div className="container-modern relative">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <span className="inline-block px-4 py-1.5 mb-6 rounded-full text-xs uppercase tracking-[0.2em] glass-card text-primary border-primary/30">
                For Wellness Businesses
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-[1.05]">
                Partner with <span className="text-gradient-emerald">GymSpaYoga</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                Join India's fastest-growing wellness marketplace. Connect with thousands of health-conscious customers and grow your revenue effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="btn-primary" onClick={() => setShowForm(true)}>
                  <Building2 className="mr-2 h-5 w-5" />
                  Start Registration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/pricing">
                  <Button size="lg" className="btn-secondary">View Pricing Plans</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding">
          <div className="container-modern">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Why choose <span className="text-gradient-emerald">GymSpaYoga</span>
              </h2>
              <p className="text-muted-foreground text-lg">Built for serious wellness operators.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <Card key={i} className="glass-card glass-card-hover border-0">
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4 text-primary">
                      {b.icon}
                    </div>
                    <CardTitle className="text-lg font-display text-foreground">{b.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-modern">
            <div className="relative overflow-hidden rounded-3xl glass-card p-12 md:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-hero opacity-60" />
              <div className="relative max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Ready to <span className="text-gradient-emerald">get started?</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Join thousands of wellness businesses already growing with GymSpaYoga.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="btn-primary" onClick={() => setShowForm(true)}>
                    <Building2 className="mr-2 h-5 w-5" />
                    Register Your Business
                  </Button>
                  <Link to="/support">
                    <Button size="lg" className="btn-secondary">Contact Sales</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RegisterBusiness;
