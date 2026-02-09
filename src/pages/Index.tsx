import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
 import { ArrowRight, Sparkles, Shield, Users, Star, MapPin, Dumbbell, Flower2, Heart, UserCheck, MessageCircle, Activity } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import HeroBanner from '@/components/HeroBanner';
import CommunityBanner from '@/components/CommunityBanner';
import AuthBanner from '@/components/AuthBanner';
import { useAuth } from '@/hooks/useAuth';

// Lazy load heavy components
const RecentListings = lazy(() => import('@/components/RecentListings'));

const LoadingFallback = () => (
  <div className="flex justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const Index = () => {
  const { user, loading: authLoading } = useAuth();

  const handleWhatsAppContact = () => {
    const message = "Hi! I'd like to know more about GymSpaYoga services.";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
     },
     {
       title: "Chiropractors",
       description: "Spine & pain relief specialists",
       icon: Activity,
       href: "/chiropractors",
       count: "100+"
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
        {/* Auth Banner for non-logged in users */}
        <AuthBanner />

        {/* Hero Banner with Search */}
        <HeroBanner />

        {/* Categories Section */}
        <section className="py-10 md:py-12 bg-white" data-tour="categories">
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
                  <Card className="group h-full border-2 border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                        <category.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-black mb-2">{category.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                      <span className="text-primary font-semibold">{category.count} listings</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="py-10 md:py-14 bg-gray-50">
          <div className="container mx-auto px-4">
            <Suspense fallback={<LoadingFallback />}>
              <RecentListings />
            </Suspense>
          </div>
        </section>

        {/* GymSpaYoga Platform Banner - Inspired by reference */}
        <section className="py-12 md:py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left: Device Mockups Image */}
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
                    alt="GymSpaYoga platform preview"
                    className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
                  />
                  {/* Overlay with wellness images */}
                  <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-xl shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=120&q=80"
                      alt="Yoga"
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  </div>
                  <div className="absolute -top-4 -left-4 bg-white p-2 rounded-xl shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&q=80"
                      alt="Spa"
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold mb-3">
                  <span className="text-[#005EB8]">Gym</span>
                  <span className="text-[#E85D04]">Spa</span>
                  <span className="text-[#2E7D32]">Yoga</span>
                </h2>
                <p className="text-xl text-gray-600 mb-4">
                  Train. Relax. Rejuvenate.
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                  India's Ultimate Hub For<br />
                  Wellness Services
                </h3>
                <Link to="/explore">
                  <Button size="lg" className="bg-[#005EB8] hover:bg-[#004d96] text-white font-semibold px-8 py-6 text-lg">
                    EXPLORE NOW
                  </Button>
                </Link>
                <p className="text-lg text-gray-500 mt-4">GymSpaYoga.com</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hire Personal Trainer Banner - Inspired by reference */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left: Trainer Image */}
              <div className="flex-1 flex justify-center lg:justify-start">
                <img 
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=500&q=80"
                  alt="Personal trainer helping client"
                  className="rounded-2xl max-w-sm w-full object-cover"
                />
              </div>

              {/* Right: Content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  HIRE A PERSONAL TRAINER
                </h2>
                <p className="text-xl text-gray-700 mb-4">
                  Getting back in shape has never been so easy!
                </p>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  Get a best-in-class Personal Trainer from GymSpaYoga and kick-start your fitness journey at the comfort of your home! You would love the results you see!
                </p>
                <Link to="/trainers">
                  <Button size="lg" className="bg-[#E85D04] hover:bg-[#D4540A] text-white font-semibold px-8 py-6 text-lg">
                    ENQUIRE NOW
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Yoga Banner */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
              {/* Right: Yoga Image */}
              <div className="flex-1 flex justify-center lg:justify-end">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80"
                  alt="Woman practicing yoga"
                  className="rounded-2xl max-w-sm w-full object-cover"
                />
              </div>

              {/* Left: Content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  DISCOVER YOGA STUDIOS
                </h2>
                <p className="text-xl text-gray-700 mb-4">
                  Find peace. Build strength. Transform your life.
                </p>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  Explore the best yoga studios near you. From beginner-friendly classes to advanced sessions, find the perfect practice for your wellness journey.
                </p>
                <Link to="/yoga">
                  <Button size="lg" className="bg-[#2E7D32] hover:bg-[#256b29] text-white font-semibold px-8 py-6 text-lg">
                    EXPLORE YOGA
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

         {/* Chiropractor Banner */}
         <section className="py-12 md:py-16 bg-white">
           <div className="container mx-auto px-4">
             <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
               {/* Left: Chiropractor Image */}
               <div className="flex-1 flex justify-center lg:justify-start">
                 <img 
                   src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=500&q=80"
                   alt="Professional chiropractor treatment"
                   className="rounded-2xl max-w-sm w-full object-cover"
                 />
               </div>
 
               {/* Right: Content */}
               <div className="flex-1 text-center lg:text-left">
                 <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                   FIND EXPERT CHIROPRACTORS
                 </h2>
                 <p className="text-xl text-gray-700 mb-4">
                   Relief from back pain, neck pain & posture issues.
                 </p>
                 <p className="text-lg text-gray-600 mb-8 max-w-lg">
                   Connect with certified chiropractors for professional spinal care, pain management, and improved mobility. Get the expert care your body deserves.
                 </p>
                 <Link to="/chiropractors">
                   <Button size="lg" className="bg-[#0D9488] hover:bg-[#0B7A70] text-white font-semibold px-8 py-6 text-lg">
                     FIND CHIROPRACTORS
                   </Button>
                 </Link>
               </div>
             </div>
           </div>
         </section>
 
         {/* Spa Banner */}
         <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left: Spa Image */}
              <div className="flex-1 flex justify-center lg:justify-start">
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80"
                  alt="Relaxing spa experience"
                  className="rounded-2xl max-w-sm w-full object-cover"
                />
              </div>

              {/* Right: Content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  LUXURY SPA EXPERIENCES
                </h2>
                <p className="text-xl text-gray-700 mb-4">
                  Unwind. Rejuvenate. Restore your inner peace.
                </p>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  Discover premium spa services that pamper your body and soul. From therapeutic massages to rejuvenating facials, find your perfect retreat.
                </p>
                <Link to="/spas">
                  <Button size="lg" className="bg-[#9C27B0] hover:bg-[#7B1FA2] text-white font-semibold px-8 py-6 text-lg">
                    EXPLORE SPAS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Therapists Banner */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
              {/* Right: Therapist Image */}
              <div className="flex-1 flex justify-center lg:justify-end">
                <img 
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=500&q=80"
                  alt="Wellness therapist providing treatment"
                  className="rounded-2xl max-w-sm w-full object-cover"
                />
              </div>

              {/* Left: Content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  BOOK WELLNESS THERAPISTS
                </h2>
                <p className="text-xl text-gray-700 mb-4">
                  Heal naturally. Feel better. Live fully.
                </p>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  Connect with certified wellness therapists for holistic treatments, stress relief, and overall well-being. Experience professional care tailored to your needs.
                </p>
                <Link to="/therapists">
                  <Button size="lg" className="bg-[#00838F] hover:bg-[#006971] text-white font-semibold px-8 py-6 text-lg">
                    FIND THERAPISTS
                  </Button>
                </Link>
              </div>
            </div>
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
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
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

        {/* Vision & Mission Section with GymSpaYoga Branding */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="text-[#005EB8]">Gym</span>
                <span className="text-[#E85D04]">Spa</span>
                <span className="text-[#2E7D32]">Yoga</span>
              </h2>
              <p className="text-xl text-gray-600">Train. Relax. Rejuvenate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Vision Card */}
              <Card className="border-2 border-[#005EB8]/20 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#005EB8] rounded-full flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#005EB8]">Our Vision</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To become India's most trusted wellness platform, empowering every individual to discover, access, and embrace a healthier lifestyle through seamless connections with quality fitness, relaxation, and mindfulness services.
                  </p>
                </CardContent>
              </Card>

              {/* Mission Card */}
              <Card className="border-2 border-[#E85D04]/20 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#E85D04] rounded-full flex items-center justify-center">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#E85D04]">Our Mission</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To bridge the gap between wellness seekers and service providers by offering a transparent, user-friendly platform that features verified listings, honest reviews, and personalized recommendations for gyms, spas, yoga studios, and certified trainers.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Core Values */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-black mb-6">Our Core Values</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-[#005EB8] text-white px-6 py-2 text-base font-semibold">Trust & Transparency</Badge>
                <Badge className="bg-[#E85D04] text-white px-6 py-2 text-base font-semibold">Quality First</Badge>
                <Badge className="bg-[#2E7D32] text-white px-6 py-2 text-base font-semibold">Customer Wellness</Badge>
                <Badge className="bg-[#9C27B0] text-white px-6 py-2 text-base font-semibold">Community Building</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Solid White Background */}
        <section className="py-12 md:py-14 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
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
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                        Get Started Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8">
                        Sign In
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/explore">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
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
        <section className="py-10 md:py-12 bg-[#005EB8]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Own a Wellness Business?
            </h2>
            <p className="text-lg text-white/90 mb-3 max-w-2xl mx-auto">
              Join our platform and reach thousands of potential customers looking for wellness services.
            </p>
            <p className="text-base text-white/80 mb-8 max-w-xl mx-auto">
              <span className="font-semibold">Free to use</span> • <span className="font-semibold">Easy to explore</span> • No hidden charges
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register-business">
                <Button size="lg" className="bg-white text-[#005EB8] font-bold hover:bg-gray-100 px-8 min-h-[48px]">
                  <Dumbbell className="mr-2 h-5 w-5" />
                  Register Your Business
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" className="bg-white text-[#005EB8] font-bold hover:bg-gray-100 px-8 min-h-[48px]">
                  View Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Community Banner */}
        <CommunityBanner />
      </div>
    </>
  );
};

export default Index;
