import React from 'react';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import CategoryTrainers from '@/components/CategoryTrainers';
import SEOHead from '@/components/SEOHead';
import OptimizedImage from '@/components/performance/ImageOptimizer';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Yoga = () => {
  return (
    <>
      <SEOHead
        title="Best Yoga Studios in India - Yoga Classes in Mumbai, Delhi, Bangalore | GymSpaYoga"
        description="Discover authentic yoga studios in Mumbai, Delhi, Bangalore & across India. From Hatha to Vinyasa, certified instructors for mind, body, and soul. Book now!"
        keywords="yoga classes near me, best yoga Mumbai, yoga studio Delhi, meditation Bangalore, hatha yoga India, vinyasa yoga"
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden h-[250px] md:h-[350px]">
          <div className="absolute inset-0">
            <OptimizedImage 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Peaceful yoga studio with natural lighting"
              className="w-full h-full object-cover"
              priority={true}
              width={1920}
              height={350}
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white">
                Explore Yoga Studios
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                Find your inner peace with authentic yoga and meditation
              </p>
            </div>
          </div>
        </section>

        <CategoryBusinesses
          category="yoga"
          title="Authentic Yoga Studios & Classes"
          description="Embark on a transformative yoga journey with our network of authentic yoga studios and certified instructors."
        />

        {/* Expert Instructors */}
        <CategoryTrainers category="yoga" />

        {/* GymSpaYoga Branding Banner with Real People */}
        <section className="bg-[#005EB8] py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left: Real People Images */}
              <div className="flex items-center">
                <div className="flex -space-x-4">
                  {[
                    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=face',
                  ].map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Community member ${index + 1}`}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border-3 border-white object-cover shadow-md"
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="ml-4 md:ml-6">
                  <p className="text-2xl md:text-3xl font-bold text-white">10,000+</p>
                  <p className="text-white/80 text-sm md:text-base">Active Members</p>
                </div>
              </div>

              {/* Center: Message */}
              <div className="text-center lg:text-left flex-1 max-w-md">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  GymSpaYoga.com
                </h3>
                <p className="text-white/90 text-sm md:text-base">
                  Your Complete Wellness Destination. Begin your yoga journey!
                </p>
              </div>

              {/* Right: CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/explore">
                  <Button size="lg" className="bg-white text-[#005EB8] font-bold hover:bg-gray-100">
                    Explore More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20know%20more%20about%20GymSpaYoga" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-[#005EB8] font-bold hover:bg-gray-100">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Yoga;
