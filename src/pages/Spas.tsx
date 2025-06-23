
import React from 'react';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import CategoryTrainers from '@/components/CategoryTrainers';
import SEOHead from '@/components/SEOHead';

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
        <section className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Luxury Spas & Wellness Centers</h1>
              <p className="text-xl mb-8">
                Rejuvenate your body and mind with premium spa treatments and wellness services
              </p>
            </div>
          </div>
        </section>

        {/* Business Listings */}
        <CategoryBusinesses
          category="spa"
          title="Spas"
          description="Indulge in ultimate relaxation and rejuvenation at our carefully selected luxury spas and wellness centers. From therapeutic massages and aromatherapy to advanced skincare treatments, our partner spas offer a sanctuary for your mind, body, and soul. Discover premium wellness experiences designed to restore your natural balance and inner peace."
        />

        {/* Expert Therapists */}
        <CategoryTrainers category="spa" />
      </div>
    </>
  );
};

export default Spas;
