import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import NativeAdUnit from '@/components/NativeAdUnit';
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Shield, Users, Star, MapPin, Dumbbell, Flower2, Heart, UserCheck, Activity, Zap, Globe, CheckCircle2 } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import HeroBanner from '@/components/HeroBanner';
import CommunityBanner from '@/components/CommunityBanner';
import AuthBanner from '@/components/AuthBanner';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';
import WellnessQuiz from '@/components/WellnessQuiz';
import TrendingSearches from '@/components/TrendingSearches';
import HomeFAQ from '@/components/HomeFAQ';
import WellnessStats from '@/components/WellnessStats';


const RecentListings = lazy(() => import('@/components/RecentListings'));

const LoadingFallback = () => (
  <div className="flex justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const Index = () => {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const categories = [
    { title: "Gyms", description: "State-of-the-art fitness centers", icon: Dumbbell, href: "/gyms", count: "500+", color: "bg-primary" },
    { title: "Spas", description: "Luxury wellness & relaxation", icon: Flower2, href: "/spas", count: "300+", color: "bg-brand-600" },
    { title: "Yoga", description: "Mindfulness & meditation", icon: Heart, href: "/yoga", count: "400+", color: "bg-brand-700" },
    { title: "Trainers", description: "Certified professionals", icon: UserCheck, href: "/trainers", count: "200+", color: "bg-charcoal-800" },
    { title: "Chiropractors", description: "Spine & pain specialists", icon: Activity, href: "/chiropractors", count: "100+", color: "bg-charcoal-700" },
  ];

  const features = [
    { icon: Shield, title: "Verified Listings", description: "Every business is verified for quality and authenticity" },
    { icon: Users, title: "Expert Professionals", description: "Connect with certified trainers and wellness experts" },
    { icon: Star, title: "Real Reviews", description: "Genuine reviews from verified customers worldwide" },
    { icon: Globe, title: "200+ Cities", description: "Discover wellness options across 40+ countries" },
  ];

  const serviceBanners = [
    {
      title: "Hire a Personal Trainer",
      subtitle: "Getting back in shape has never been so easy!",
      description: "Get a best-in-class Personal Trainer and kick-start your fitness journey at the comfort of your home!",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80",
      link: "/trainers",
      btnText: "Find Trainers",
      reverse: false,
    },
    {
      title: "Discover Yoga Studios",
      subtitle: "Find peace. Build strength. Transform your life.",
      description: "Explore the best yoga studios near you. From beginner-friendly classes to advanced sessions.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
      link: "/yoga",
      btnText: "Explore Yoga",
      reverse: true,
    },
    {
      title: "Luxury Spa Experiences",
      subtitle: "Unwind. Rejuvenate. Restore your inner peace.",
      description: "Discover premium spa services that pamper your body and soul. From therapeutic massages to rejuvenating facials.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
      link: "/spas",
      btnText: "Explore Spas",
      reverse: false,
    },
  ];

  return (
    <>
      <SEOHead
        title="GymSpaYoga - Book Best Gyms, Spas, Yoga Classes & Personal Trainers Near Me"
        description="Find & book the best gyms, luxury spas, yoga studios, certified personal trainers and chiropractors near you. 1500+ verified listings across 200+ cities. Real reviews, instant booking, exclusive wellness packages. Start your fitness & wellness journey today."
        keywords="gym near me, spa near me, yoga classes near me, personal trainer near me, best gyms in india, luxury spas, yoga studios, fitness centers, wellness near me, gym membership, spa packages, yoga teacher training, weight loss gym, crossfit, hatha yoga, vinyasa yoga, ayurvedic spa, thai massage, deep tissue massage, prenatal yoga, hot yoga, female personal trainer, online yoga classes, home personal trainer, chiropractor near me, physiotherapist, sports massage, fitness booking app, wellness platform india, gymspayoga"
      />

      <div className="min-h-screen bg-background">
        <AuthBanner />
        <HeroBanner />

        {/* Categories */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Browse Categories</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Explore Wellness Services
                </h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((cat) => (
                <StaggerItem key={cat.title}>
                  <Link to={cat.href}>
                    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                      <Card className="group h-full border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg bg-card overflow-hidden">
                        <CardContent className="p-5 text-center">
                          <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:shadow-md transition-shadow`}>
                            <cat.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-base font-display font-bold text-foreground mb-1">{cat.title}</h3>
                          <p className="text-muted-foreground text-xs mb-2">{cat.description}</p>
                          <span className="text-primary font-bold text-xs">{cat.count} listings</span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="py-16 md:py-20 bg-accent/50">
          <div className="container mx-auto px-4">
            <Suspense fallback={<LoadingFallback />}>
              <RecentListings />
            </Suspense>
          </div>
        </section>

        {/* IN-FEED NATIVE AD — Highest CTR position: between content sections */}
        <div className="py-4 bg-background">
          <div className="container mx-auto px-4">
            <NativeAdUnit />
          </div>
        </div>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Why GymSpaYoga</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                  The Platform You Can Trust
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">Your trusted partner for discovering wellness services worldwide</p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((feature, index) => (
                <StaggerItem key={index}>
                  <Card className="border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-md h-full bg-card">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-base font-display font-bold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Service Banners */}
        {serviceBanners.map((banner, index) => (
          <section key={banner.title} className={`py-16 md:py-20 ${index % 2 === 0 ? 'bg-accent/40' : 'bg-background'}`}>
            <div className="container mx-auto px-4">
              <div className={`flex flex-col ${banner.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}>
                <ScrollReveal direction={banner.reverse ? 'right' : 'left'} className="flex-1 flex justify-center">
                  <div className="relative">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="rounded-2xl max-w-sm w-full object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-primary/10 rounded-2xl -z-10" />
                  </div>
                </ScrollReveal>
                <ScrollReveal direction={banner.reverse ? 'left' : 'right'} className="flex-1 text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">{banner.title}</h2>
                  <p className="text-lg text-muted-foreground mb-2">{banner.subtitle}</p>
                  <p className="text-muted-foreground mb-6 max-w-lg">{banner.description}</p>
                  <Link to={banner.link}>
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 rounded-xl shadow-sm">
                      {banner.btnText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          </section>
        ))}

        {/* Global Cities */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">🌍 Global Coverage</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                  Available in 200+ Cities Worldwide
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Explore wellness services across 40+ countries
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-8">
              {[
                { name: 'New York', slug: 'new-york', flag: '🇺🇸' },
                { name: 'London', slug: 'london', flag: '🇬🇧' },
                { name: 'Dubai', slug: 'dubai', flag: '🇦🇪' },
                { name: 'Los Angeles', slug: 'los-angeles', flag: '🇺🇸' },
                { name: 'Toronto', slug: 'toronto', flag: '🇨🇦' },
                { name: 'Sydney', slug: 'sydney', flag: '🇦🇺' },
                { name: 'Singapore', slug: 'singapore', flag: '🇸🇬' },
                { name: 'Tokyo', slug: 'tokyo', flag: '🇯🇵' },
                { name: 'Paris', slug: 'paris', flag: '🇫🇷' },
                { name: 'Bali', slug: 'bali', flag: '🇮🇩' },
                { name: 'Mumbai', slug: 'mumbai', flag: '🇮🇳' },
                { name: 'Bangkok', slug: 'bangkok', flag: '🇹🇭' },
              ].map((city) => (
                <StaggerItem key={city.slug}>
                  <Link to={`/gyms-in-${city.slug}`}>
                    <Card className="border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-sm bg-card group cursor-pointer">
                      <CardContent className="p-3 text-center">
                        <span className="text-xl block mb-1">{city.flag}</span>
                        <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{city.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="text-center">
              <Link to="/explore">
                <Button variant="outline" className="border-border hover:border-primary text-foreground hover:text-primary rounded-xl px-6 text-sm">
                  View All Cities <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready to Transform Your Life?</h2>
                <p className="text-secondary-foreground/60 mb-8">Join thousands who have discovered their perfect wellness journey.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {!user ? (
                    <>
                      <Link to="/signup">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-xl font-semibold shadow-md">
                          Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to="/register-business">
                        <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 rounded-xl">
                          List Your Business
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link to="/explore">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-xl font-semibold">
                        <MapPin className="mr-2 h-4 w-4" /> Explore Near You
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <CommunityBanner />
      </div>
    </>
  );
};

export default Index;
