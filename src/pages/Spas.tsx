import React from 'react';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import CategoryTrainers from '@/components/CategoryTrainers';
import SEOHead from '@/components/SEOHead';
import CategoryHero from '@/components/listing/CategoryHero';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Spas = () => {
  return (
    <>
      <SEOHead
        title="Best Spas in India - Luxury Wellness Centers in Mumbai, Delhi, Bangalore | GymSpaYoga"
        description="Book premium spa treatments in Mumbai, Delhi, Bangalore & across India. Professional massage therapy, aromatherapy, and rejuvenating treatments. Book now!"
        keywords="spa near me, best spa Mumbai, luxury spa Delhi, wellness center Bangalore, massage therapy India, aromatherapy, ayurvedic spa, balinese massage, thai massage, swedish massage, deep tissue massage, hot stone massage, couple spa, body scrub, facial treatment, full body massage, head massage, foot reflexology, sauna and steam, hammam spa, prenatal massage, sports massage, ladies only spa, spa in Goa, spa in Jaipur, spa in Kerala, spa packages, day spa, spa membership, spa offers, top rated spa India"
      />
      
      <div className="min-h-screen bg-background">
        <CategoryHero
          eyebrow="Spa & Recovery"
          title="Rituals of Rest, Curated"
          description="Indulge in ultimate relaxation at India's most refined spas and wellness sanctuaries."
          image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80"
          imageAlt="Luxury spa interior with relaxing ambiance"
        />

        <CategoryBusinesses
          category="spa"
          title="Luxury Spas & Wellness Centers"
          description="Indulge in ultimate relaxation and rejuvenation at our carefully selected luxury spas and wellness centers."
        />

        {/* Expert Therapists */}
        <CategoryTrainers category="spa" />

        {/* Luxury CTA band */}
        <section className="section-padding bg-primary-deep">
          <div className="container-modern flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-xl">
              <span className="eyebrow text-gold">GymSpaYoga</span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-primary-foreground leading-tight">
                Zero commission. Direct bookings.
              </h2>
              <p className="mt-3 text-primary-foreground/70 leading-relaxed">
                Discover verified spas near you and connect with them directly — no middlemen, no markups.
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

export default Spas;
