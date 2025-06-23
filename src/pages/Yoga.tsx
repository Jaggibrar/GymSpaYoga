
import React from 'react';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import CategoryTrainers from '@/components/CategoryTrainers';
import SEOHead from '@/components/SEOHead';

const Yoga = () => {
  return (
    <>
      <SEOHead
        title="Yoga Studios & Classes Near You - GymSpaYoga | Find Inner Peace"
        description="Discover authentic yoga studios and certified instructors. From Hatha to Vinyasa, find the perfect yoga practice for your mind, body, and soul."
        keywords="yoga classes, yoga studio, meditation, hatha yoga, vinyasa, yoga instructor, mindfulness, spiritual wellness"
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Yoga Studios & Classes</h1>
              <p className="text-xl mb-8">
                Find inner peace and balance with certified yoga instructors and serene studio spaces
              </p>
            </div>
          </div>
        </section>

        {/* Business Listings */}
        <CategoryBusinesses
          category="yoga"
          title="Yoga Studios"
          description="Embark on a transformative yoga journey with our network of authentic yoga studios and certified instructors. Whether you're a beginner seeking gentle Hatha classes or an experienced practitioner looking for dynamic Vinyasa flows, find the perfect studio that aligns with your spiritual and physical wellness goals. Experience the ancient art of yoga in modern, peaceful environments."
        />

        {/* Expert Instructors */}
        <CategoryTrainers category="yoga" />
      </div>
    </>
  );
};

export default Yoga;
