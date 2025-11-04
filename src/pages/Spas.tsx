
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
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted/50 text-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Perfect Spa
              </h1>
              <p className="text-lg text-muted-foreground">
                Browse spas across all price ranges - from budget-friendly options to luxury wellness centers
              </p>
            </div>
          </div>
        </section>

        {/* Business Listings - First Priority */}
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
