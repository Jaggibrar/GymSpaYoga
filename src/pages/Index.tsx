import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield, Users, Star, MapPin, Dumbbell, Flower2, Heart, UserCheck, Activity, Stethoscope, Zap, Globe, CheckCircle2, Quote } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import CinematicHero from '@/components/CinematicHero';
import CommunityBanner from '@/components/CommunityBanner';
import AuthBanner from '@/components/AuthBanner';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';
import HealthChallengeHub from '@/components/HealthChallengeHub';
import BentoShowcase from '@/components/BentoShowcase';
import DietPlanner from '@/components/DietPlanner';
import WellnessStats from '@/components/WellnessStats';
import HomeFAQ from '@/components/HomeFAQ';

const RecentListings = lazy(() => import('@/components/RecentListings'));

const LoadingFallback = () => (
  <div className="flex justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
  </div>
);

const CATEGORIES = [
  { title: 'Gyms', desc: 'Strength · cardio · CrossFit', icon: Dumbbell, href: '/gyms', count: '500+' },
  { title: 'Yoga', desc: 'Hatha · Vinyasa · Ashtanga', icon: Flower2, href: '/yoga', count: '400+' },
  { title: 'Spas', desc: 'Ayurveda · Swedish · Thai', icon: Heart, href: '/spas', count: '300+' },
  { title: 'Trainers', desc: 'Certified · 1-on-1 · online', icon: UserCheck, href: '/trainers', count: '200+' },
  { title: 'Therapists', desc: 'Physio · sports · recovery', icon: Activity, href: '/therapists', count: '150+' },
  { title: 'Chiropractors', desc: 'Spine · posture · pain', icon: Stethoscope, href: '/chiropractors', count: '100+' },
];

const FEATURES = [
  { icon: Shield, title: 'Verified', desc: 'Every listing manually approved by our team.' },
  { icon: Users, title: 'Expert-led', desc: 'Certified trainers, therapists, instructors.' },
  { icon: Star, title: 'Real reviews', desc: 'No fakes. Verified by actual booking history.' },
  { icon: Globe, title: '200+ cities', desc: 'Premium discovery across India and beyond.' },
];

const TESTIMONIALS = [
  { name: 'Priya S.', city: 'Mumbai', quote: 'Found my dream yoga studio in 30 seconds. The booking flow is genuinely Apple-level.', avatar: '🧘‍♀️' },
  { name: 'Arjun K.', city: 'Bangalore', quote: 'Trainer match was perfect. Lost 8kg in 12 weeks. The platform feels truly premium.', avatar: '💪' },
  { name: 'Ananya R.', city: 'Delhi', quote: 'Booked a spa day for my mom — the quality of verified options blew me away.', avatar: '✨' },
];

const CITIES = [
  { name: 'Mumbai', slug: 'mumbai' }, { name: 'Delhi', slug: 'delhi' },
  { name: 'Bangalore', slug: 'bangalore' }, { name: 'Pune', slug: 'pune' },
  { name: 'Hyderabad', slug: 'hyderabad' }, { name: 'Chennai', slug: 'chennai' },
  { name: 'Kolkata', slug: 'kolkata' }, { name: 'Jaipur', slug: 'jaipur' },
  { name: 'Goa', slug: 'goa' }, { name: 'Rishikesh', slug: 'rishikesh' },
  { name: 'Gurgaon', slug: 'gurgaon' }, { name: 'Chandigarh', slug: 'chandigarh' },
];

const Index = () => {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="GymSpaYoga — Premium Wellness Discovery & Booking Platform"
        description="India's premium wellness ecosystem. Discover and book the best gyms, yoga studios, spas, certified trainers, therapists and chiropractors. 1,500+ verified listings across 200+ cities."
        keywords="gym near me, yoga near me, spa near me, personal trainer, premium wellness platform india, gymspayoga"
      />

      <div className="min-h-screen bg-background text-foreground">
        <AuthBanner />

        {/* 1. Cinematic hero */}
        <CinematicHero />

        {/* 2. Featured categories */}
        <section className="relative section-padding overflow-hidden">
          <div className="container-modern">
            <ScrollReveal>
              <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
                <div className="max-w-2xl">
                  <p className="text-primary font-medium text-sm uppercase tracking-[0.2em] mb-3">Explore the ecosystem</p>
                  <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Six categories.<br />
                    <span className="text-gradient-emerald">One premium destination.</span>
                  </h2>
                </div>
                <Link to="/explore" className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {CATEGORIES.map((cat) => (
                <StaggerItem key={cat.title}>
                  <Link to={cat.href} className="block group">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="glass-card glass-card-hover p-5 h-full"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-emerald flex items-center justify-center mb-4 shadow-emerald">
                        <cat.icon className="h-5 w-5 text-charcoal-950" />
                      </div>
                      <h3 className="font-display text-base font-bold text-white mb-1">{cat.title}</h3>
                      <p className="text-white/55 text-xs mb-3 leading-relaxed">{cat.desc}</p>
                      <span className="text-primary text-xs font-semibold">{cat.count} listings →</span>
                    </motion.div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* 3. Bento grid wellness showcase */}
        <BentoShowcase />

        {/* 4. Top-rated professionals (featured listings) */}
        <section className="relative section-padding">
          <div className="container-modern">
            <ScrollReveal>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <p className="text-primary font-medium text-sm uppercase tracking-[0.2em] mb-3">Top rated this week</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Featured professionals</h2>
                <p className="text-white/60 mt-3">Hand-picked, highly-rated wellness experts our community keeps coming back to.</p>
              </div>
            </ScrollReveal>
            <Suspense fallback={<LoadingFallback />}>
              <RecentListings />
            </Suspense>
          </div>
        </section>

        {/* 5. Featured cities */}
        <section className="relative section-padding">
          <div className="container-modern">
            <ScrollReveal>
              <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
                <div>
                  <p className="text-primary font-medium text-sm uppercase tracking-[0.2em] mb-3">Featured cities</p>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Premium wellness, wherever you are</h2>
                </div>
                <Link to="/explore" className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1">
                  All cities <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {CITIES.map((c) => (
                <StaggerItem key={c.slug}>
                  <Link to={`/city/${c.slug}`} className="block">
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="glass-card glass-card-hover px-4 py-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="text-white text-sm font-medium truncate">{c.name}</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-white/40" />
                    </motion.div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* 6. Why choose us */}
        <section className="relative section-padding">
          <div className="container-modern">
            <ScrollReveal>
              <div className="text-center mb-14 max-w-2xl mx-auto">
                <p className="text-primary font-medium text-sm uppercase tracking-[0.2em] mb-3">Why GymSpaYoga</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Built for serious wellness.</h2>
                <p className="text-white/60 mt-3">Premium standards. Verified providers. Zero noise.</p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURES.map((f) => (
                <StaggerItem key={f.title}>
                  <div className="glass-card glass-card-hover p-6 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-5">
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* 7. Real testimonials */}
        <section className="relative section-padding">
          <div className="container-modern">
            <ScrollReveal>
              <div className="text-center mb-14 max-w-2xl mx-auto">
                <p className="text-primary font-medium text-sm uppercase tracking-[0.2em] mb-3">Loved by our community</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Real stories. Real results.</h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TESTIMONIALS.map((t) => (
                <StaggerItem key={t.name}>
                  <div className="glass-card glass-card-hover p-7 h-full">
                    <Quote className="h-6 w-6 text-primary/60 mb-4" />
                    <p className="text-white/85 leading-relaxed text-[15px] mb-6">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-emerald/20 border border-primary/30 flex items-center justify-center text-lg">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{t.name}</div>
                        <div className="text-white/50 text-xs">{t.city}</div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* 8. Stats */}
        <WellnessStats />

        {/* 9. Wellness lifestyle banner (Diet Planner + Health Challenge engagement) */}
        <DietPlanner />
        <HealthChallengeHub />

        {/* FAQ */}
        <HomeFAQ />

        {/* 10. Cinematic CTA footer */}
        <section className="relative section-padding overflow-hidden">
          <div className="container-modern">
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-charcoal-900/60 backdrop-blur-xl p-10 md:p-20 text-center">
              <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
              <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" aria-hidden />
              <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gold/15 blur-3xl" aria-hidden />

              <div className="relative z-10 max-w-3xl mx-auto">
                <Sparkles className="h-8 w-8 text-primary mx-auto mb-5" />
                <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
                  Your next chapter<br />
                  <span className="text-gradient-emerald">starts with one tap.</span>
                </h2>
                <p className="text-white/65 mt-5 text-base md:text-lg max-w-xl mx-auto">
                  Join 50,000+ members transforming their lives with India's premium wellness ecosystem.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  {!user ? (
                    <>
                      <Link to="/signup">
                        <Button size="lg" className="rounded-2xl bg-gradient-emerald text-charcoal-950 font-semibold h-12 px-8 shadow-emerald hover:opacity-90">
                          Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to="/register-business">
                        <Button size="lg" variant="outline" className="rounded-2xl h-12 px-8 bg-white/[0.04] border-white/15 text-white hover:bg-white/[0.08] hover:text-white">
                          List Your Business
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link to="/explore">
                      <Button size="lg" className="rounded-2xl bg-gradient-emerald text-charcoal-950 font-semibold h-12 px-8 shadow-emerald hover:opacity-90">
                        <MapPin className="mr-2 h-4 w-4" /> Explore Near You
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CommunityBanner />
      </div>
    </>
  );
};

export default Index;
