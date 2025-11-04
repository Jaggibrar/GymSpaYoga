
import React from 'react';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import CategoryTrainers from '@/components/CategoryTrainers';
import SEOHead from '@/components/SEOHead';

const Yoga = () => {
  return (
    <>
      <SEOHead
        title="Yoga Studios & Classes Near You - GymSpaYoga | Find Inner Peace"
        description="Discover authentic yoga studios and certified instructors across India. From Hatha to Vinyasa, book your perfect yoga practice for mind, body, and soul with verified reviews and real photos."
        keywords="yoga classes near me, yoga studio, meditation, hatha yoga, vinyasa, yoga instructor, mindfulness, spiritual wellness, best yoga classes India"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted/50 text-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Perfect Yoga Studio
              </h1>
              <p className="text-lg text-muted-foreground">
                Browse yoga studios across all price ranges - from budget-friendly options to luxury wellness centers
              </p>
            </div>
          </div>
        </section>

        {/* Business Listings - First Priority */}
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
