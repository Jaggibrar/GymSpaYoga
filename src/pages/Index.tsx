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
    { title: "Gyms", description: "State-of-the-art fitness facilities", icon: Dumbbell, href: "/gyms", count: "500+" },
    { title: "Spas", description: "Relaxation & wellness centers", icon: Flower2, href: "/spas", count: "300+" },
    { title: "Yoga", description: "Mindfulness & meditation studios", icon: Heart, href: "/yoga", count: "400+" },
    { title: "Trainers", description: "Certified fitness professionals", icon: UserCheck, href: "/trainers", count: "200+" },
    { title: "Chiropractors", description: "Spine & pain relief specialists", icon: Activity, href: "/chiropractors", count: "100+" },
  ];

  const features = [
    { icon: Shield, title: "Verified Listings", description: "All businesses are verified for quality and authenticity" },
    { icon: Users, title: "Expert Professionals", description: "Connect with certified trainers and wellness experts" },
    { icon: Star, title: "Real Reviews", description: "Genuine reviews from verified customers" },
    { icon: MapPin, title: "Find Nearby", description: "Discover wellness options close to your location" },
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

        {/* Categories Section */}
        <section className="py-10 md:py-14 bg-background" data-tour="categories">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Explore Wellness Categories
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find the perfect wellness experience for your lifestyle
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => (
                <Link key={category.title} to={category.href}>
                  <Card className="group h-full border border-border hover:border-primary transition-all duration-300 hover:shadow-lg bg-card">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                        <category.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <h3 className="text-xl font-display font-bold text-foreground mb-2">{category.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{category.description}</p>
                      <span className="text-primary font-semibold">{category.count} listings</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="py-10 md:py-14 bg-accent">
          <div className="container mx-auto px-4">
            <Suspense fallback={<LoadingFallback />}>
              <RecentListings />
            </Suspense>
          </div>
        </section>

        {/* Platform Banner */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
                    alt="GymSpaYoga platform preview"
                    className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-card p-2 rounded-xl shadow-lg border border-border">
                    <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=120&q=80" alt="Yoga" className="w-24 h-24 rounded-lg object-cover" />
                  </div>
                  <div className="absolute -top-4 -left-4 bg-card p-2 rounded-xl shadow-lg border border-border">
                    <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&q=80" alt="Spa" className="w-24 h-24 rounded-lg object-cover" />
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
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
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg">
                    EXPLORE NOW
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trainer Banner */}
        <section className="py-12 md:py-16 bg-accent">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-1 flex justify-center lg:justify-start">
                <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=500&q=80" alt="Personal trainer helping client" className="rounded-2xl max-w-sm w-full object-cover shadow-lg" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">HIRE A PERSONAL TRAINER</h2>
                <p className="text-xl text-muted-foreground mb-4">Getting back in shape has never been so easy!</p>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">Get a best-in-class Personal Trainer from GymSpaYoga and kick-start your fitness journey at the comfort of your home!</p>
                <Link to="/trainers">
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8 py-6 text-lg">ENQUIRE NOW</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Yoga Banner */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
              <div className="flex-1 flex justify-center lg:justify-end">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80" alt="Woman practicing yoga" className="rounded-2xl max-w-sm w-full object-cover shadow-lg" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">DISCOVER YOGA STUDIOS</h2>
                <p className="text-xl text-muted-foreground mb-4">Find peace. Build strength. Transform your life.</p>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">Explore the best yoga studios near you. From beginner-friendly classes to advanced sessions, find the perfect practice.</p>
                <Link to="/yoga">
                  <Button size="lg" className="bg-warm-700 hover:bg-warm-800 text-white font-semibold px-8 py-6 text-lg">EXPLORE YOGA</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Chiropractor Banner */}
        <section className="py-12 md:py-16 bg-accent">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-1 flex justify-center lg:justify-start">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=500&q=80" alt="Professional chiropractor treatment" className="rounded-2xl max-w-sm w-full object-cover shadow-lg" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">FIND EXPERT CHIROPRACTORS</h2>
                <p className="text-xl text-muted-foreground mb-4">Relief from back pain, neck pain & posture issues.</p>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">Connect with certified chiropractors for professional spinal care, pain management, and improved mobility.</p>
                <Link to="/chiropractors">
                  <Button size="lg" className="bg-charcoal-700 hover:bg-charcoal-600 text-white font-semibold px-8 py-6 text-lg">FIND CHIROPRACTORS</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Spa Banner */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-1 flex justify-center lg:justify-start">
                <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80" alt="Relaxing spa experience" className="rounded-2xl max-w-sm w-full object-cover shadow-lg" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">LUXURY SPA EXPERIENCES</h2>
                <p className="text-xl text-muted-foreground mb-4">Unwind. Rejuvenate. Restore your inner peace.</p>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">Discover premium spa services that pamper your body and soul. From therapeutic massages to rejuvenating facials.</p>
                <Link to="/spas">
                  <Button size="lg" className="bg-warm-600 hover:bg-warm-700 text-white font-semibold px-8 py-6 text-lg">EXPLORE SPAS</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Therapists Banner */}
        <section className="py-12 md:py-16 bg-accent">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
              <div className="flex-1 flex justify-center lg:justify-end">
                <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=500&q=80" alt="Wellness therapist providing treatment" className="rounded-2xl max-w-sm w-full object-cover shadow-lg" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">BOOK WELLNESS THERAPISTS</h2>
                <p className="text-xl text-muted-foreground mb-4">Heal naturally. Feel better. Live fully.</p>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">Connect with certified wellness therapists for holistic treatments, stress relief, and overall well-being.</p>
                <Link to="/therapists">
                  <Button size="lg" className="bg-charcoal-800 hover:bg-charcoal-700 text-white font-semibold px-8 py-6 text-lg">FIND THERAPISTS</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10 md:py-14 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Why Choose GymSpaYoga?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Your trusted platform for wellness discovery</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border border-border shadow-md hover:shadow-lg transition-shadow bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-12 md:py-16 bg-accent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">
                <span className="text-charcoal-800">Gym</span>
                <span className="text-primary">Spa</span>
                <span className="text-warm-700">Yoga</span>
              </h2>
              <p className="text-xl text-muted-foreground font-display italic">Train. Relax. Rejuvenate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="border border-primary/20 shadow-lg hover:shadow-xl transition-shadow bg-card">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-primary">Our Vision</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To become India's most trusted wellness platform, empowering every individual to discover, access, and embrace a healthier lifestyle through seamless connections with quality fitness, relaxation, and mindfulness services.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-warm-400/30 shadow-lg hover:shadow-xl transition-shadow bg-card">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-warm-600 rounded-full flex items-center justify-center">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-warm-700">Our Mission</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To bridge the gap between wellness seekers and service providers by offering a transparent, user-friendly platform that features verified listings, honest reviews, and personalized recommendations.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-display font-bold text-foreground mb-6">Our Core Values</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-primary text-primary-foreground px-6 py-2 text-base font-semibold">Trust & Transparency</Badge>
                <Badge className="bg-secondary text-secondary-foreground px-6 py-2 text-base font-semibold">Quality First</Badge>
                <Badge className="bg-warm-700 text-white px-6 py-2 text-base font-semibold">Customer Wellness</Badge>
                <Badge className="bg-charcoal-700 text-white px-6 py-2 text-base font-semibold">Community Building</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-14 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Ready to Transform Your Life?</h2>
              <p className="text-lg text-muted-foreground mb-8">Join thousands who have discovered their perfect wellness journey with GymSpaYoga.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!user ? (
                  <>
                    <Link to="/signup">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                        Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">Sign In</Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/explore">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                      <MapPin className="mr-2 h-5 w-5" /> Explore Near You
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Business Registration CTA */}
        <section className="py-10 md:py-12 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-foreground mb-4">Own a Wellness Business?</h2>
            <p className="text-lg text-secondary-foreground/80 mb-3 max-w-2xl mx-auto">Join our platform and reach thousands of potential customers looking for wellness services.</p>
            <p className="text-base text-secondary-foreground/70 mb-8 max-w-xl mx-auto">
              <span className="font-semibold">Free to use</span> • <span className="font-semibold">Easy to explore</span> • No hidden charges
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register-business">
                <Button size="lg" className="bg-primary text-primary-foreground font-bold hover:bg-primary/90 px-8 min-h-[48px]">
                  <Dumbbell className="mr-2 h-5 w-5" /> Register Your Business
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" className="bg-card text-foreground font-bold hover:bg-card/90 px-8 min-h-[48px]">
                  View Pricing <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <CommunityBanner />
      </div>
    </>
  );
};

export default Index;
