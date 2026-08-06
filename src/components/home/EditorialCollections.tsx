import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Collection {
  title: string;
  count: string;
  to: string;
  img: string;
}

const COLLECTIONS: Collection[] = [
  { title: 'Luxury Spas', count: '12 Listings', to: '/spas', img: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80' },
  { title: 'Best Women Gyms', count: '18 Listings', to: '/gyms?collection=women', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80' },
  { title: 'Top Yoga Studios', count: '20 Listings', to: '/yoga', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80' },
  { title: 'Personal Trainers', count: '45 Listings', to: '/trainers', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80' },
  { title: '24x7 Gyms', count: '15 Listings', to: '/gyms?collection=24x7', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80' },
  { title: 'Budget Friendly', count: '25 Listings', to: '/explore?collection=budget', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80' },
  { title: 'Top Yoga Retreats', count: '9 Listings', to: '/yoga?collection=retreats', img: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=900&q=80' },
];

const EditorialCollections: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => railRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });

  return (
    <section aria-labelledby="collections-heading">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
        <div>
          <h2 id="collections-heading" className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
            Explore Premium Collections
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Handpicked for your wellness journey.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/explore" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40">
            View All
          </Link>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scrollBy(-1)} aria-label="Previous collections" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition hover:border-primary/40">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => scrollBy(1)} aria-label="More collections" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition hover:border-primary/40">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div ref={railRef} className="flex gap-4 overflow-x-auto scrollbar-hide snap-x pb-2 -mx-1 px-1">
        {COLLECTIONS.map(c => (
          <Link
            key={c.title}
            to={c.to}
            className="group relative w-[190px] sm:w-[212px] shrink-0 snap-start overflow-hidden rounded-[24px] zoom-media shadow-soft transition-transform duration-500 hover:-translate-y-1.5"
          >
            <div className="aspect-[3/4] w-full bg-secondary">
              <img src={c.img} alt={c.title} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-card-overlay" aria-hidden />
            <span className="absolute top-3.5 right-3.5 grid h-9 w-9 place-items-center rounded-full glass-dark">
              <Heart className="h-4 w-4 text-white" />
            </span>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="font-display text-base font-bold text-white leading-tight">{c.title}</h3>
              <p className="mt-1 font-num text-xs text-white/70">{c.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default EditorialCollections;
