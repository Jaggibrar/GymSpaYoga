import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Shield, Users, Star, MapPin, Dumbbell, Flower2, Heart, UserCheck } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import HeroBanner from '@/components/HeroBanner';
import { useAuth } from '@/hooks/useAuth';

// Lazy load heavy components
const RecentListings = lazy(() => import('@/components/RecentListings'));
const GeolocationRecommendations = lazy(() => import('@/components/GeolocationRecommendations').then(m => ({ default: m.GeolocationRecommendations })));

const LoadingFallback = () => (
  <div className="flex justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A45FF]"></div>
  </div>
);

const Index = () => {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A45FF]"></div>
      </div>
    );
  }

  const categories = [
    {
      title: "Gyms",
      description: "State-of-the-art fitness facilities",
      icon: Dumbbell,
      href: "/gyms",
      count: "500+"
    },
    {
      title: "Spas",
      description: "Relaxation & wellness centers",
      icon: Flower2,
      href: "/spas",
      count: "300+"
    },
    {
      title: "Yoga",
      description: "Mindfulness & meditation studios",
      icon: Heart,
      href: "/yoga",
      count: "400+"
    },
    {
      title: "Trainers",
      description: "Certified fitness professionals",
      icon: UserCheck,
      href: "/trainers",
      count: "200+"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Listings",
      description: "All businesses are verified for quality and authenticity"
    },
    {
      icon: Users,
      title: "Expert Professionals",
      description: "Connect with certified trainers and wellness experts"
    },
    {
      icon: Star,
      title: "Real Reviews",
      description: "Genuine reviews from verified customers"
    },
    {
      icon: MapPin,
      title: "Find Nearby",
      description: "Discover wellness options close to your location"
    }
  ];

  return (
    <>
      <SEOHead
        title="GymSpaYoga - Find Gyms, Spas & Yoga Studios Near You"
        description="Discover and book the best gyms, spas, yoga studios, and personal trainers. Your complete wellness platform with verified listings and real reviews."
        keywords="gyms near me, spas, yoga studios, personal trainers, fitness, wellness, health"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Banner with Search */}
        <HeroBanner />

        {/* Categories Section */}
        <section className="py-10 md:py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Explore Wellness Categories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find the perfect wellness experience for your lifestyle
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => (
                <Link key={category.title} to={category.href}>
                  <Card className="group h-full border-2 border-gray-100 hover:border-[#0A45FF] transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-[#0A45FF]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0A45FF] transition-colors">
                        <category.icon className="h-8 w-8 text-[#0A45FF] group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-black mb-2">{category.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                      <span className="text-[#0A45FF] font-semibold">{category.count} listings</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Listings */}
        <section className="py-10 md:py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
                Featured Listings
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover top-rated wellness destinations near you
              </p>
            </div>
            <Suspense fallback={<LoadingFallback />}>
              <RecentListings />
            </Suspense>
          </div>
        </section>

        {/* Geolocation Recommendations */}
        <section className="py-10 md:py-12 bg-white">
          <div className="container mx-auto px-4">
            <Suspense fallback={<LoadingFallback />}>
              <GeolocationRecommendations />
            </Suspense>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10 md:py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
                Why Choose GymSpaYoga?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your trusted platform for wellness discovery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-[#0A45FF] rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Solid White Background */}
        <section className="py-12 md:py-14 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="h-12 w-12 text-[#0A45FF] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Ready to Transform Your Life?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands who have discovered their perfect wellness journey with GymSpaYoga.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!user ? (
                  <>
                    <Link to="/signup">
                      <Button size="lg" className="bg-[#0A45FF] hover:bg-[#083ACC] text-white px-8">
                        Get Started Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="border-[#0A45FF] text-[#0A45FF] hover:bg-[#0A45FF] hover:text-white px-8">
                        Sign In
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/explore">
                    <Button size="lg" className="bg-[#0A45FF] hover:bg-[#083ACC] text-white px-8">
                      <MapPin className="mr-2 h-5 w-5" />
                      Explore Near You
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Business Registration CTA */}
        <section className="py-10 md:py-12 bg-[#0A45FF]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Own a Wellness Business?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join our platform and reach thousands of potential customers looking for wellness services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register-business">
                <Button size="lg" className="bg-white text-[#0A45FF] hover:bg-gray-100 px-8">
                  <Dumbbell className="mr-2 h-5 w-5" />
                  Register Your Business
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0A45FF] px-8">
                  View Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
