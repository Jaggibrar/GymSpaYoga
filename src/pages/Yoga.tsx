import React from 'react';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import CategoryTrainers from '@/components/CategoryTrainers';
import SEOHead from '@/components/SEOHead';
import OptimizedImage from '@/components/performance/ImageOptimizer';

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
      </div>
    </>
  );
};

export default Yoga;
