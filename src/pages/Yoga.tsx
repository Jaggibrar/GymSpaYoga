import React from 'react';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import CategoryTrainers from '@/components/CategoryTrainers';
import SEOHead from '@/components/SEOHead';
import CategoryHero from '@/components/listing/CategoryHero';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Yoga = () => {
  return (
    <>
      <SEOHead
        title="Best Yoga Studios in India - Yoga Classes in Mumbai, Delhi, Bangalore | GymSpaYoga"
        description="Discover authentic yoga studios in Mumbai, Delhi, Bangalore & across India. From Hatha to Vinyasa, certified instructors for mind, body, and soul. Book now!"
        keywords="yoga classes near me, best yoga Mumbai, yoga studio Delhi, meditation Bangalore, hatha yoga India, vinyasa yoga, ashtanga yoga, iyengar yoga, kundalini yoga, power yoga, yin yoga, hot yoga, aerial yoga, prenatal yoga, postnatal yoga, yoga for beginners, yoga for back pain, yoga for weight loss, yoga teacher training, RYT 200, online yoga classes, home yoga instructor, pranayama, mindfulness meditation, yoga retreat India, yoga in Rishikesh, yoga in Goa, yoga in Pune, yoga in Hyderabad, kids yoga, senior yoga, corporate yoga"
      />
      
      <div className="min-h-screen bg-background">
        <CategoryHero
          eyebrow="Yoga & Mindfulness"
          title="Find Your Stillness"
          description="Authentic yoga studios and certified instructors for mind, body and breath."
          image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1920&q=80"
          imageAlt="Peaceful yoga studio with natural lighting"
        />

        <CategoryBusinesses
          category="yoga"
          title="Authentic Yoga Studios & Classes"
          description="Embark on a transformative yoga journey with our network of authentic yoga studios and certified instructors."
        />

        {/* Expert Instructors */}
        <CategoryTrainers category="yoga" />

        {/* Luxury CTA band */}
        <section className="section-padding bg-primary-deep">
          <div className="container-modern flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-xl">
              <span className="eyebrow text-gold">GymSpaYoga</span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-primary-foreground leading-tight">
                Zero commission. Direct bookings.
              </h2>
              <p className="mt-3 text-primary-foreground/70 leading-relaxed">
                Discover verified yoga studios near you and connect with them directly — no middlemen, no markups.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/explore">
                <Button size="lg" className="rounded-full h-[52px] px-7 bg-gold text-gold-foreground font-semibold hover:bg-gold/90">
                  Explore More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20know%20more%20about%20GymSpaYoga" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full h-[52px] px-7 bg-transparent border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Yoga;
