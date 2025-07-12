
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
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Serene spa environment"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 via-pink-500/80 to-purple-600/80"></div>
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200/15 rounded-full blur-3xl"></div>
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
