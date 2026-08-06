import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { useHomeListings } from '@/hooks/useHomeListings';
import LuxuryListingCard from './LuxuryListingCard';

const TrendingNearYou: React.FC = () => {
  const { listings, loading } = useHomeListings(10);
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <section className="relative" aria-labelledby="trending-heading">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
        <div>
          <h2 id="trending-heading" className="flex items-center gap-2 font-display text-2xl sm:text-3xl font-extrabold text-foreground">
            <Flame className="h-6 w-6 text-coral" />
            Trending Near You
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Curated recommendations from our wellness editors.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/explore"
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40"
          >
            View All
          </Link>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scrollBy(-1)} aria-label="Scroll left" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition hover:border-primary/40">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => scrollBy(1)} aria-label="Scroll right" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition hover:border-primary/40">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex gap-5 overflow-hidden">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="w-[260px] shrink-0 animate-pulse rounded-[24px] bg-secondary aspect-[4/5]" />
          ))}
        </div>
      ) : (
        <div ref={railRef} className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-1 px-1">
          {listings.map(l => (
            <div key={l.id} className="w-[248px] sm:w-[268px] shrink-0 snap-start">
              <LuxuryListingCard listing={l} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TrendingNearYou;
