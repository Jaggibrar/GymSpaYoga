
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
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 text-white py-12 sm:py-16 lg:py-24 xl:py-32">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Peaceful yoga environment"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/80 via-teal-500/80 to-emerald-600/80"></div>
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-200/15 rounded-full blur-3xl"></div>
          </div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                  Yoga <span className="text-emerald-200">Studios</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                  Discover authentic yoga environments with certified instructors offering traditional and modern practices. Find your perfect balance through mindful movement, meditation, and spiritual wellness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Listings - First Priority */}
        <CategoryBusinesses
          category="yoga"
          title="Authentic Yoga Studios & Classes"
          description="Embark on a transformative yoga journey with our network of authentic yoga studios and certified instructors. Whether you're a beginner seeking gentle Hatha classes or an experienced practitioner looking for dynamic Vinyasa flows, find the perfect studio that aligns with your spiritual and physical wellness goals. Experience the ancient art of yoga in modern, peaceful environments."
        />

        {/* Expert Instructors */}
        <CategoryTrainers category="yoga" />
      </div>
    </>
  );
};

export default Yoga;
