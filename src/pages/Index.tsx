import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Shield, Users, Star, MapPin, Dumbbell, Flower2, Heart, UserCheck, Activity } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import HeroBanner from '@/components/HeroBanner';
import CommunityBanner from '@/components/CommunityBanner';
import AuthBanner from '@/components/AuthBanner';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';
import AdSenseSlot from '@/components/AdSenseSlot';

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
    { title: "Gyms", description: "State-of-the-art fitness facilities", icon: Dumbbell, href: "/gyms", count: "500+", accent: "bg-charcoal-800" },
    { title: "Spas", description: "Relaxation & wellness centers", icon: Flower2, href: "/spas", count: "300+", accent: "bg-warm-700" },
    { title: "Yoga", description: "Mindfulness & meditation studios", icon: Heart, href: "/yoga", count: "400+", accent: "bg-warm-800" },
    { title: "Trainers", description: "Certified fitness professionals", icon: UserCheck, href: "/trainers", count: "200+", accent: "bg-primary" },
    { title: "Chiropractors", description: "Spine & pain relief specialists", icon: Activity, href: "/chiropractors", count: "100+", accent: "bg-charcoal-700" },
  ];

  const features = [
    { icon: Shield, title: "Verified Listings", description: "All businesses are verified for quality and authenticity" },
    { icon: Users, title: "Expert Professionals", description: "Connect with certified trainers and wellness experts" },
    { icon: Star, title: "Real Reviews", description: "Genuine reviews from verified customers" },
    { icon: MapPin, title: "Find Nearby", description: "Discover wellness options close to your location" },
  ];

  const serviceBanners = [
    {
      title: "HIRE A PERSONAL TRAINER",
      subtitle: "Getting back in shape has never been so easy!",
      description: "Get a best-in-class Personal Trainer and kick-start your fitness journey at the comfort of your home!",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80",
      link: "/trainers",
      btnText: "ENQUIRE NOW",
      btnClass: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      reverse: false,
    },
    {
      title: "DISCOVER YOGA STUDIOS",
      subtitle: "Find peace. Build strength. Transform your life.",
      description: "Explore the best yoga studios near you. From beginner-friendly classes to advanced sessions.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
      link: "/yoga",
      btnText: "EXPLORE YOGA",
      btnClass: "bg-warm-700 hover:bg-warm-800 text-white",
      reverse: true,
    },
    {
      title: "LUXURY SPA EXPERIENCES",
      subtitle: "Unwind. Rejuvenate. Restore your inner peace.",
      description: "Discover premium spa services that pamper your body and soul. From therapeutic massages to rejuvenating facials.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
      link: "/spas",
      btnText: "EXPLORE SPAS",
      btnClass: "bg-warm-600 hover:bg-warm-700 text-white",
      reverse: false,
    },
    {
      title: "FIND EXPERT CHIROPRACTORS",
      subtitle: "Relief from back pain, neck pain & posture issues.",
      description: "Connect with certified chiropractors for professional spinal care and improved mobility.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
      link: "/chiropractors",
      btnText: "FIND CHIROPRACTORS",
      btnClass: "bg-charcoal-700 hover:bg-charcoal-600 text-white",
      reverse: true,
    },
  ];

  return (
    <>
      <SEOHead
        title="GymSpaYoga - Find Gyms, Spas & Yoga Studios Near You"
        description="Discover and book the best gyms, spas, yoga studios, and personal trainers. Your complete wellness platform with verified listings and real reviews."
        keywords="gyms near me, spas, yoga studios, personal trainers, fitness, wellness, health"
      />

      <div className="min-h-screen bg-background">
        <AuthBanner />
        <HeroBanner />

        {/* Ad Slot - After Hero */}
        <div className="container mx-auto px-4 py-4">
          <AdSenseSlot adSlot="1234567890" adFormat="horizontal" className="min-h-[90px]" />
        </div>

        {/* Categories Section */}
        <section className="py-14 md:py-20 bg-background" data-tour="categories">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 rounded-lg px-4 py-1.5 text-sm">
                  Browse Categories
                </Badge>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Explore Wellness Categories
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Find the perfect wellness experience for your lifestyle
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {categories.map((category) => (
                <StaggerItem key={category.title}>
                  <Link to={category.href}>
                    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.25 }}>
                      <Card className="group h-full border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl bg-card rounded-2xl overflow-hidden">
                        <CardContent className="p-6 text-center">
                          <motion.div
                            className={`w-16 h-16 ${category.accent} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                            whileHover={{ rotate: 5 }}
                          >
                            <category.icon className="h-8 w-8 text-white" />
                          </motion.div>
                          <h3 className="text-xl font-display font-bold text-foreground mb-1">{category.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
                          <span className="text-primary font-bold text-sm">{category.count} listings</span>
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
        <section className="py-14 md:py-20 bg-accent/50">
          <div className="container mx-auto px-4">
            <Suspense fallback={<LoadingFallback />}>
              <RecentListings />
            </Suspense>
          </div>
        </section>

        {/* Ad Slot - Between Listings and Platform */}
        <div className="container mx-auto px-4 py-4">
          <AdSenseSlot adSlot="0987654321" adFormat="auto" className="min-h-[250px]" />
        </div>

        {/* Platform Banner */}
        <section className="py-16 md:py-24 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <ScrollReveal direction="left" className="flex-1 flex justify-center">
                <div className="relative">
                  <motion.img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
                    alt="GymSpaYoga platform preview"
                    className="rounded-3xl shadow-2xl w-full max-w-md object-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute -bottom-5 -right-5 bg-card p-2.5 rounded-2xl shadow-xl border border-border"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=120&q=80" alt="Yoga" className="w-28 h-28 rounded-xl object-cover" />
                  </motion.div>
                  <motion.div
                    className="absolute -top-5 -left-5 bg-card p-2.5 rounded-2xl shadow-xl border border-border"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&q=80" alt="Spa" className="w-28 h-28 rounded-xl object-cover" />
                  </motion.div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" className="flex-1 text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-3">
                  <span className="text-charcoal-800">Gym</span>
                  <span className="text-primary">Spa</span>
                  <span className="text-warm-700">Yoga</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-4 italic font-display">Train. Relax. Rejuvenate.</p>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
                  India's Ultimate Hub For<br />Wellness Services
                </h3>
                <Link to="/explore">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl">
                      EXPLORE NOW <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Service Banners */}
        {serviceBanners.map((banner, index) => (
          <section key={banner.title} className={`py-14 md:py-20 ${index % 2 === 0 ? 'bg-accent/50' : 'bg-background'}`}>
            <div className="container mx-auto px-4">
              <div className={`flex flex-col ${banner.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}>
                <ScrollReveal direction={banner.reverse ? 'right' : 'left'} className="flex-1 flex justify-center">
                  <motion.img
                    src={banner.image}
                    alt={banner.title}
                    className="rounded-3xl max-w-sm w-full object-cover shadow-xl"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  />
                </ScrollReveal>
                <ScrollReveal direction={banner.reverse ? 'left' : 'right'} className="flex-1 text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{banner.title}</h2>
                  <p className="text-xl text-muted-foreground mb-3">{banner.subtitle}</p>
                  <p className="text-lg text-muted-foreground mb-8 max-w-lg">{banner.description}</p>
                  <Link to={banner.link}>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                      <Button size="lg" className={`${banner.btnClass} font-semibold px-8 py-6 text-lg rounded-xl`}>
                        {banner.btnText}
                      </Button>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          </section>
        ))}

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 rounded-lg px-4 py-1.5">
                  Why Us
                </Badge>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">Why Choose GymSpaYoga?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Your trusted platform for wellness discovery</p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <StaggerItem key={index}>
                  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                    <Card className="border border-border shadow-md hover:shadow-xl transition-shadow bg-card rounded-2xl h-full">
                      <CardContent className="p-7 text-center">
                        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                          <feature.icon className="h-7 w-7 text-primary-foreground" />
                        </div>
                        <h3 className="text-lg font-display font-bold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 md:py-24 bg-accent/50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">
                  <span className="text-charcoal-800">Gym</span>
                  <span className="text-primary">Spa</span>
                  <span className="text-warm-700">Yoga</span>
                </h2>
                <p className="text-xl text-muted-foreground font-display italic">Train. Relax. Rejuvenate.</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <ScrollReveal direction="left">
                <Card className="border border-primary/20 shadow-lg hover:shadow-xl transition-shadow bg-card rounded-2xl h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                        <Sparkles className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-primary">Our Vision</h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      To become India's most trusted wellness platform, empowering every individual to discover, access, and embrace a healthier lifestyle.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <Card className="border border-warm-400/30 shadow-lg hover:shadow-xl transition-shadow bg-card rounded-2xl h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-warm-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Heart className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-warm-700">Our Mission</h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      To bridge the gap between wellness seekers and service providers with a transparent, user-friendly platform featuring verified listings and personalized recommendations.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2}>
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">Our Core Values</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Trust & Transparency', 'Quality First', 'Customer Wellness', 'Community Building'].map((value, i) => (
                    <motion.div key={value} whileHover={{ scale: 1.08 }}>
                      <Badge className={`${
                        [
                          'bg-primary text-primary-foreground',
                          'bg-secondary text-secondary-foreground',
                          'bg-warm-700 text-white',
                          'bg-charcoal-700 text-white',
                        ][i]
                      } px-6 py-2.5 text-base font-semibold rounded-xl`}>
                        {value}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">Ready to Transform Your Life?</h2>
                <p className="text-lg text-muted-foreground mb-8">Join thousands who have discovered their perfect wellness journey with GymSpaYoga.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {!user ? (
                    <>
                      <Link to="/signup">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-xl">
                            Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </motion.div>
                      </Link>
                      <Link to="/login">
                        <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 rounded-xl">Sign In</Button>
                      </Link>
                    </>
                  ) : (
                    <Link to="/explore">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-xl">
                        <MapPin className="mr-2 h-5 w-5" /> Explore Near You
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Business Registration CTA */}
        <section className="py-14 md:py-16 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-foreground mb-4">Own a Wellness Business?</h2>
              <p className="text-lg text-secondary-foreground/80 mb-3 max-w-2xl mx-auto">Join our platform and reach thousands of potential customers.</p>
              <p className="text-base text-secondary-foreground/70 mb-8 max-w-xl mx-auto">
                <span className="font-semibold">Free to use</span> • <span className="font-semibold">Easy to explore</span> • No hidden charges
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register-business">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button size="lg" className="bg-primary text-primary-foreground font-bold hover:bg-primary/90 px-8 min-h-[48px] rounded-xl">
                      <Dumbbell className="mr-2 h-5 w-5" /> Register Your Business
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" className="bg-card text-foreground font-bold hover:bg-card/90 px-8 min-h-[48px] rounded-xl">
                    View Pricing <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
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
