import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Users, Target, ArrowRight, CheckCircle, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const About = () => {
  return (
    <>
      <SEOHead
        title="About GymSpaYoga — India's Premium Wellness Discovery Platform"
        description="Learn about GymSpaYoga's mission to make wellness accessible across India. Founded by Jagdeep Singh, connecting people with premium gyms, luxury spas, and authentic yoga studios."
        keywords="about gymspayoga, wellness platform India, fitness community, Jagdeep Singh founder"
      />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden section-padding">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 grain-overlay pointer-events-none" />
          <div className="container-modern relative">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <Badge className="mb-6 bg-primary/15 text-primary border border-primary/30 px-4 py-1.5 rounded-full">
                Our Story
              </Badge>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-[1.05]">
                Wellness, <span className="text-gradient-emerald">reimagined</span>.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                We connect people with the best gyms, yoga studios, spas, and trainers — without friction, without noise.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding">
          <div className="container-modern">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in">
                <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Our Mission</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-3 mb-6 leading-tight">
                  Make wellness <span className="text-gradient-emerald">accessible</span> to everyone in India.
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We bridge the gap between wellness seekers and providers, building a community where health, calm, and confidence thrive together.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Quality verified partners',
                    'Easy online booking',
                    'Personalized recommendations',
                    'Active wellness community',
                  ].map((label) => (
                    <div key={label} className="flex items-center gap-3 glass-card px-4 py-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-emerald opacity-20 blur-3xl rounded-full" />
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80"
                  alt="Wellness community"
                  className="relative rounded-3xl shadow-2xl w-full h-[480px] object-cover border border-white/10"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding">
          <div className="container-modern">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                What we <span className="text-gradient-emerald">stand for</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Three principles that shape every decision we make.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  title: 'Wellness First',
                  text: 'Your health is our north star. We vet every partner for quality and safety.',
                },
                {
                  icon: Users,
                  title: 'Community',
                  text: 'More than a platform — a supportive space where everyone finds their path.',
                },
                {
                  icon: Target,
                  title: 'Excellence',
                  text: 'Pixel-level care from product to support to partner relationships.',
                },
              ].map(({ icon: Icon, title, text }) => (
                <Card key={title} className="glass-card glass-card-hover border-0">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-6">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-3">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="section-padding">
          <div className="container-modern">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Leadership</h2>
              <p className="text-muted-foreground text-lg">The vision behind GymSpaYoga.</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="glass-card border-0 overflow-hidden">
                <CardContent className="p-10 text-center">
                  <div className="relative inline-block mb-6">
                    <div className="absolute -inset-3 bg-gradient-emerald opacity-40 blur-xl rounded-full" />
                    <div className="relative w-24 h-24 bg-gradient-emerald rounded-full flex items-center justify-center shadow-emerald">
                      <span className="text-3xl font-display font-bold text-primary-foreground">JS</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground">Jagdeep Singh</h3>
                  <p className="text-primary text-sm font-semibold uppercase tracking-wider mt-1 mb-6">
                    Founder & CEO
                  </p>
                  <p className="text-muted-foreground italic leading-relaxed max-w-md mx-auto">
                    "Our vision is to create a world where wellness is not a luxury, but an accessible part of everyone's daily life — one booking at a time."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Partner CTA */}
        <section className="section-padding">
          <div className="container-modern">
            <div className="relative overflow-hidden rounded-3xl glass-card p-12 md:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-hero opacity-60" />
              <div className="relative max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Partner with <span className="text-gradient-emerald">GymSpaYoga</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Join India's fastest-growing wellness marketplace and reach thousands of health-conscious customers.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/register-business">
                    <Button size="lg" className="btn-primary">
                      Start Registration
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button size="lg" className="btn-secondary">
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section-padding">
          <div className="container-modern">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Get in touch</h2>
              <p className="text-muted-foreground text-lg">Questions or partnerships — we'd love to hear from you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: MapPin, title: 'Visit us', text: 'Kolkata, India' },
                { icon: Phone, title: 'Call us', text: '+91 7596958097' },
                { icon: Mail, title: 'Email us', text: 'GymSpaYoga@Gmail.com' },
              ].map(({ icon: Icon, title, text }) => (
                <Card key={title} className="glass-card glass-card-hover border-0">
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2">{title}</h3>
                    <p className="text-muted-foreground text-sm">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
