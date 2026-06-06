import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { MapPin, BadgeCheck, ArrowRight, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ScrollReveal from '@/components/ScrollReveal';

interface ShowcaseItem {
  id: string;
  slug: string | null;
  business_name: string;
  business_type: string;
  city: string | null;
  image: string;
  verified: boolean;
}

const FALLBACK_IMG = '/placeholder.svg';

const categoryLabel = (t: string) => {
  const map: Record<string, string> = {
    gym: 'Gym', spa: 'Spa', yoga: 'Yoga Studio',
    trainer: 'Trainer', therapist: 'Therapist', chiropractor: 'Chiropractor',
  };
  return map[t?.toLowerCase()] || 'Wellness';
};

const BusinessShowcaseCarousel: React.FC = () => {
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true, containScroll: 'trimSnaps' },
    [autoplay.current]
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('business_profiles')
          .select('id, slug, business_name, business_type, city, image_urls, status')
          .eq('status', 'approved')
          .not('image_urls', 'is', null)
          .limit(40);

        if (error) throw error;
        const mapped: ShowcaseItem[] = (data || [])
          .map((b: any) => {
            const imgs = Array.isArray(b.image_urls) ? b.image_urls : [];
            return {
              id: b.id,
              slug: b.slug,
              business_name: b.business_name || 'Wellness Studio',
              business_type: b.business_type || 'wellness',
              city: b.city,
              image: imgs[0] || FALLBACK_IMG,
              verified: b.status === 'approved',
            };
          })
          .filter((i) => i.image && i.image !== FALLBACK_IMG);

        // shuffle for variety
        for (let i = mapped.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
        }

        if (mounted) setItems(mapped.slice(0, 16));
      } catch (e) {
        console.warn('Showcase fetch failed', e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!loading && items.length === 0) return null;

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-modern">
        <ScrollReveal>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-primary text-xs font-medium uppercase tracking-[0.18em]">
                Featured destinations
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05]">
              Explore Wellness <span className="text-gradient-emerald">Destinations</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-base md:text-lg leading-relaxed">
              Discover gyms, yoga studios, spas, trainers and wellness businesses registered on GymSpaYoga.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Full-width carousel */}
      <div className="relative">
        {loading ? (
          <div className="flex gap-5 px-6 md:px-12 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="shrink-0 w-[80vw] sm:w-[55vw] md:w-[38vw] lg:w-[26vw] xl:w-[22vw] aspect-[4/5] rounded-3xl"
              />
            ))}
          </div>
        ) : (
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-5 px-6 md:px-12 py-4">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.4) }}
                  className="shrink-0 w-[80vw] sm:w-[55vw] md:w-[38vw] lg:w-[26vw] xl:w-[22vw]"
                >
                  <Link
                    to={`/business/${item.slug || item.id}`}
                    className="group block relative aspect-[4/5] rounded-3xl overflow-hidden border border-border bg-card shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={`${item.business_name} – ${categoryLabel(item.business_type)} in ${item.city || 'India'}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
                      }}
                    />

                    {/* Image-only gradient overlay for legibility */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0) 70%)',
                      }}
                      aria-hidden
                    />

                    {/* Shimmer on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 group-hover:translate-x-[300%] transition-transform duration-[1500ms] ease-out" />
                    </div>

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2 z-10">
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-charcoal-950 text-[11px] font-semibold uppercase tracking-wider shadow-sm">
                        {categoryLabel(item.business_type)}
                      </span>
                      {item.verified && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold shadow-emerald">
                          <BadgeCheck className="h-3 w-3" />
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Bottom content with glass effect */}
                    <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                      <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3">
                        <h3 className="font-display text-lg md:text-xl font-bold text-white leading-tight line-clamp-1">
                          {item.business_name}
                        </h3>
                        {item.city && (
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span className="text-white/90 text-sm font-medium truncate">
                              {item.city}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="container-modern mt-10 flex justify-center">
        <Link to="/explore">
          <Button
            size="lg"
            className="rounded-2xl bg-gradient-emerald text-charcoal-950 font-semibold h-12 px-8 shadow-emerald hover:opacity-90"
          >
            Explore All Businesses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default BusinessShowcaseCarousel;
