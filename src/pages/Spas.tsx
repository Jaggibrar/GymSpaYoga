import React from 'react';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import CategoryTrainers from '@/components/CategoryTrainers';
import SEOHead from '@/components/SEOHead';
import OptimizedImage from '@/components/performance/ImageOptimizer';

const Spas = () => {
  return (
    <>
      <SEOHead
        title="Luxury Spas & Wellness Centers - GymSpaYoga | Relaxation & Rejuvenation"
        description="Book premium spa treatments and wellness services. Professional massage therapy, aromatherapy, and rejuvenating treatments for ultimate relaxation."
        keywords="spa near me, massage therapy, wellness center, relaxation, aromatherapy, luxury spa, spa treatments"
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden h-[250px] md:h-[350px]">
          <div className="absolute inset-0">
            <OptimizedImage 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Luxury spa interior with relaxing ambiance"
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
                Explore Luxury Spas
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                Rejuvenate your mind and body at premium wellness centers
              </p>
            </div>
          </div>
        </section>

        <CategoryBusinesses
          category="spa"
          title="Luxury Spas & Wellness Centers"
          description="Indulge in ultimate relaxation and rejuvenation at our carefully selected luxury spas and wellness centers."
        />

        {/* Expert Therapists */}
        <CategoryTrainers category="spa" />
      </div>
    </>
  );
};

export default Spas;
