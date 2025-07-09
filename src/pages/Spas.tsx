
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
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 text-white py-20 lg:py-32">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>
          </div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                  Luxury <span className="text-purple-200">Spas</span>
                </h1>
                <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                  Immerse yourself in tranquil wellness sanctuaries offering rejuvenating spa treatments, therapeutic massages, and holistic healing experiences for ultimate relaxation and renewal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Listings - First Priority */}
        <CategoryBusinesses
          category="spa"
          title="Luxury Spas & Wellness Centers"
          description="Indulge in ultimate relaxation and rejuvenation at our carefully selected luxury spas and wellness centers. From therapeutic massages and aromatherapy to advanced skincare treatments, our partner spas offer a sanctuary for your mind, body, and soul. Discover premium wellness experiences designed to restore your natural balance and inner peace."
        />

        {/* Expert Therapists */}
        <CategoryTrainers category="spa" />
      </div>
    </>
  );
};

export default Spas;
