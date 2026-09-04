import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Dumbbell, Flower2, Heart, UserCheck, Activity, Stethoscope, ShieldCheck, Star, Users, Globe } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import LuxuryHero from '@/components/home/LuxuryHero';
import TrendingNearYou from '@/components/home/TrendingNearYou';
import EditorialCollections from '@/components/home/EditorialCollections';
import WellnessPanel, { WellnessHighlights } from '@/components/home/WellnessPanel';
import AppDownloadBanner from '@/components/home/AppDownloadBanner';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const HomeFAQ = lazy(() => import('@/components/HomeFAQ'));

const CATEGORIES = [
  { title: 'Gyms', desc: 'Strength · cardio · CrossFit', icon: Dumbbell, href: '/gyms' },
  { title: 'Yoga', desc: 'Hatha · Vinyasa · Ashtanga', icon: Flower2, href: '/yoga' },
  { title: 'Spas', desc: 'Ayurveda · Swedish · Thai', icon: Heart, href: '/spas' },
  { title: 'Trainers', desc: 'Certified · 1-on-1 · online', icon: UserCheck, href: '/trainers' },
  { title: 'Therapists', desc: 'Physio · sports · recovery', icon: Activity, href: '/therapists' },
  { title: 'Chiropractors', desc: 'Spine · posture · pain', icon: Stethoscope, href: '/chiropractors' },
];

const TRUST = [
  { icon: ShieldCheck, title: 'Verified listings', desc: 'Every studio manually reviewed before it goes live.' },
  { icon: Users, title: 'Expert-led', desc: 'Certified trainers, therapists and instructors only.' },
  { icon: Star, title: 'Honest reviews', desc: 'Tied to real bookings — never bought, never faked.' },
  { icon: Globe, title: 'Nationwide', desc: 'Premium wellness discovery across Indian cities.' },
];

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai',
  'Kolkata', 'Jaipur', 'Goa', 'Rishikesh', 'Gurgaon', 'Chandigarh',
];

const Index = () => (
  <>
    <SEOHead
      title="GymSpaYoga — India's Premium Wellness Marketplace"
      description="Discover and book luxury gyms, yoga studios, spas, certified trainers and therapists across India. Verified listings, editorial collections, zero commission for studios."
      keywords="premium gym near me, luxury spa india, yoga studio booking, personal trainer india, wellness marketplace, gymspayoga"
    />

    <div className="min-h-screen bg-background text-foreground">
      <LuxuryHero />

      {/* Curved white content container that lifts over the hero */}
      <div className="relative z-20 -mt-8 rounded-t-[40px] bg-background pt-12 lg:pt-16">
        {/* Explore by category — full-width premium band */}
        <ScrollReveal>
          <section aria-labelledby="categories-heading" className="container-wide py-10 lg:py-16">
            <div className="mb-9 lg:mb-12">
              <p className="eyebrow mb-2">Explore the ecosystem</p>
              <h2 id="categories-heading" className="font-display text-[30px] leading-tight sm:text-[34px] font-extrabold text-foreground">
                Six categories. One premium destination.
              </h2>
            </div>
            <StaggerContainer className="eco-grid">
              {CATEGORIES.map(c => (
                <StaggerItem key={c.title} className="h-full">
                  <Link to={c.href} className="block h-full">
                    <div className="eco-card">
                      <span className="eco-icon mb-6 grid h-14 w-14 lg:h-16 lg:w-16 shrink-0 place-items-center rounded-[20px] bg-secondary">
                        <c.icon className="h-6 w-6 lg:h-7 lg:w-7 text-primary" />
                      </span>
                      <h3 className="font-display leading-snug font-bold text-foreground text-[clamp(19px,1.45vw,26px)]">{c.title}</h3>
                      <p className="mt-2.5 text-[15px] lg:text-[16px] leading-relaxed text-muted-foreground">{c.desc}</p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </ScrollReveal>

        <div className="container-modern">

          <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_460px] xl:gap-10">
            {/* Main column */}
            <div className="min-w-0 space-y-16 lg:space-y-20">
              <ScrollReveal><TrendingNearYou /></ScrollReveal>
              <ScrollReveal><EditorialCollections /></ScrollReveal>




              {/* Trust */}
              <ScrollReveal>
                <section aria-labelledby="trust-heading" className="rounded-[32px] bg-secondary p-7 sm:p-10">
                  <p className="eyebrow mb-2">Why GymSpaYoga</p>
                  <h2 id="trust-heading" className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                    Built for serious wellness.
                  </h2>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {TRUST.map(t => (
                      <div key={t.title} className="lux-card p-5">
                        <t.icon className="mb-4 h-5 w-5 text-primary" />
                        <h3 className="font-display text-[15px] font-bold text-foreground">{t.title}</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{t.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </ScrollReveal>

              {/* Cities — editorial split, full-width */}
              <ScrollReveal>
                <section aria-labelledby="cities-heading" className="relative overflow-hidden rounded-[32px] border border-border/60 bg-card p-7 sm:p-10 shadow-soft">
                  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" aria-hidden />
                  <div className="pointer-events-none absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-gold/10 blur-3xl" aria-hidden />
                  <div className="relative grid gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-12">
                    <div className="flex flex-col justify-between gap-6">
                      <div>
                        <p className="eyebrow mb-2">Featured cities</p>
                        <h2 id="cities-heading" className="font-display text-2xl sm:text-[30px] leading-tight font-extrabold text-foreground">
                          Premium wellness, wherever you are
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          Hand-picked studios, spas and trainers across India's most vibrant wellness destinations.
                        </p>
                      </div>
                      <Link
                        to="/explore"
                        className="group inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
                      >
                        Explore all cities
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {CITIES.map(c => (
                        <Link
                          key={c}
                          to={`/city/${c.toLowerCase()}`}
                          className="group flex items-center gap-2 rounded-2xl border border-border/70 bg-background px-3 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft"
                        >
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-secondary transition-colors group-hover:bg-primary/10">
                            <MapPin className="h-3.5 w-3.5 text-primary" />
                          </span>
                          <span className="min-w-0 text-[13px] font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">{c}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              </ScrollReveal>
            </div>

            {/* Sticky wellness panel */}
            <aside className="min-w-0 xl:sticky xl:top-24 xl:self-start">
              <WellnessPanel />
            </aside>
          </div>

          {/* Full-width closing sections */}
          <div className="mt-16 space-y-16 lg:mt-24 lg:space-y-20">
            <ScrollReveal><WellnessHighlights /></ScrollReveal>
            <ScrollReveal><AppDownloadBanner /></ScrollReveal>
            <Suspense fallback={null}><HomeFAQ /></Suspense>
          </div>
        </div>

        <div className="h-16" />
      </div>
    </div>
  </>
);

export default Index;
