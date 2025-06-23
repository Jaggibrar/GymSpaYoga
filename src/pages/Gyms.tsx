
import React from 'react';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import CategoryTrainers from '@/components/CategoryTrainers';
import SEOHead from '@/components/SEOHead';

const Gyms = () => {
  return (
    <>
      <SEOHead
        title="Premium Gyms Near You - GymSpaYoga | Find & Book Top Fitness Centers"
        description="Discover and book the best gyms in your city. Premium fitness centers with state-of-the-art equipment, expert trainers, and flexible membership options."
        keywords="gyms near me, fitness center, premium gym, gym membership, workout facilities, fitness training"
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Premium Gyms Near You</h1>
              <p className="text-xl mb-8">
                Find state-of-the-art fitness centers with expert trainers and premium equipment
              </p>
            </div>
          </div>
        </section>

        {/* Business Listings */}
        <CategoryBusinesses
          category="gym"
          title="Gyms"
          description="Transform your fitness journey with our curated selection of premium gyms. Each facility offers state-of-the-art equipment, certified personal trainers, and a motivating environment to help you achieve your fitness goals. From budget-friendly options to luxury fitness centers, find the perfect gym that matches your workout style and budget."
        />

        {/* Expert Trainers */}
        <CategoryTrainers category="gym" />
      </div>
    </>
  );
};

export default Gyms;
