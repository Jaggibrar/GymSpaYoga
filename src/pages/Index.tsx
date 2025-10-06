import React from "react";
import { Button } from "@/components/ui/button";
import { Dumbbell, Waves, Heart, MapPin, Star, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
const AnimatedHeroGrid = React.lazy(() => import("@/components/AnimatedHeroGrid"));
import { useAuth } from "@/hooks/useAuth";
const RecentListings = React.lazy(() => import("@/components/RecentListings"));
import SEOHead from "@/components/SEOHead";
import HeroCarousel from "@/components/HeroCarousel";
const GeolocationRecommendations = React.lazy(() => import("@/components/GeolocationRecommendations").then(m => ({ default: m.GeolocationRecommendations })));

const Index = () => {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const categories = [
    {
      title: "Premium Gyms",
      description: "State-of-the-art fitness centers with expert trainers",
      icon: <Dumbbell className="h-8 w-8" />,
      color: "from-orange-500 to-red-500",
      href: "/gyms",
      stats: "500+ Gyms"
    },
    {
      title: "Luxury Spas",
      description: "Rejuvenating wellness experiences for mind and body",
      icon: <Waves className="h-8 w-8" />,
      color: "from-blue-500 to-purple-500",
      href: "/spas",
      stats: "200+ Spas"
    },
    {
      title: "Yoga Studios",
      description: "Find your inner peace with certified yoga instructors",
      icon: <Heart className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500",
      href: "/yoga",
      stats: "300+ Studios"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Global Premium Gym, Spa & Yoga Booking Platform | GymSpaYoga - Premium Fitness & Wellness"
        description="🏋️‍♂️ Find & book premium gyms, luxury spas & authentic yoga studios worldwide. ⭐ 50,000+ happy members, 1000+ locations. Book instantly with verified reviews, expert trainers & exclusive wellness packages."
        keywords="gym near me, spa booking, yoga classes, fitness center, wellness India, Mumbai gym, Delhi spa, Bangalore yoga, personal trainer, massage therapy, meditation, pilates, crossfit, luxury spa treatments, fitness membership, health club, wellness center, Indian gyms, best spas India, fitness booking platform, wellness marketplace, premium gyms India, luxury spas India, certified yoga instructors, fitness classes near me, yoga studios near me, spa treatments near me"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://gymspayoga.com/#homepage",
          "name": "GymSpaYoga - India's Premier Wellness Marketplace",
          "description": "Find and book premium gyms, luxury spas, and authentic yoga studios across India. Join 50,000+ happy members on their wellness journey.",
          "url": "https://gymspayoga.com/",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Wellness Services",
            "description": "Premium fitness and wellness services available on GymSpaYoga",
            "numberOfItems": 4,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Service",
                  "name": "Premium Gyms",
                  "description": "State-of-the-art fitness centers with expert trainers",
                  "url": "https://gymspayoga.com/gyms"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Service",
                  "name": "Luxury Spas",
                  "description": "Rejuvenating wellness experiences for mind and body",
                  "url": "https://gymspayoga.com/spas"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Service",
                  "name": "Yoga Studios",
                  "description": "Find your inner peace with certified yoga instructors",
                  "url": "https://gymspayoga.com/yoga"
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "item": {
                  "@type": "Service",
                  "name": "Personal Trainers",
                  "description": "Expert fitness guidance from certified professionals",
                  "url": "https://gymspayoga.com/trainers"
                }
              }
            ]
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://gymspayoga.com/"
              }
            ]
          }
        }}
      />
      
      {/* Hero Section */}
      <HeroCarousel>
        <div className="container-modern">
          <div className="max-w-6xl mx-auto text-center text-white">
            <div className="mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight px-2">
                Transform Your
                <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Wellness Journey
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
                The world's premier wellness marketplace connecting you with premium gyms, luxury spas, authentic yoga studios, and certified trainers. Your path to holistic health starts here.
              </p>
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-row flex-wrap gap-3 sm:gap-4 lg:gap-6 justify-center mb-12 sm:mb-16 px-4">
              <Link to="/gyms">
                <Button size="lg" className="btn-primary text-base sm:text-lg px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-105 min-h-[48px]">
                  <Dumbbell className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  Explore Gyms
                </Button>
              </Link>
              <Link to="/spas">
                <Button size="lg" className="btn-secondary border-2 border-white/80 text-white hover:bg-white/20 text-base sm:text-lg px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 min-h-[48px]">
                  <Waves className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  Find Spas
                </Button>
              </Link>
              <Link to="/yoga">
                <Button size="lg" className="btn-secondary border-2 border-white/80 text-white hover:bg-white/20 text-base sm:text-lg px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 min-h-[48px]">
                  <Heart className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  Yoga Studios
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </HeroCarousel>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container-modern">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-primary mb-6 sm:mb-8">
              Your Wellness Universe
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover a curated ecosystem of premium wellness destinations. From strength training to spiritual wellness, find your perfect match for a healthier, happier you.
            </p>
          </div>
          
          <React.Suspense fallback={null}>
            <AnimatedHeroGrid />
          </React.Suspense>
        </div>
      </section>

      {/* Recent Listings Section - Reduced gap */}
      <div className="-mt-4">
          <React.Suspense fallback={null}>
            <RecentListings />
          </React.Suspense>
      </div>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
            {[
              { icon: <Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />, number: "50K+", label: "Happy Members" },
              { icon: <MapPin className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />, number: "1000+", label: "Locations" },
              { icon: <Star className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />, number: "4.9", label: "Average Rating" },
              { icon: <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />, number: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-emerald-600 mb-2 sm:mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geolocation Recommendations Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <React.Suspense fallback={null}>
            <GeolocationRecommendations />
          </React.Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Transform Your Life?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of people who have already started their wellness journey with us.
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-4 min-h-[48px]">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900 text-base sm:text-lg px-6 sm:px-8 py-4 min-h-[48px]">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/explore">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-4 min-h-[48px]">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Explore Near You
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Quick Setup Panel */}
    </div>
  );
};

export default Index;
