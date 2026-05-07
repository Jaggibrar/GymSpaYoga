import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Star,
  MapPin,
  Phone,
  CheckCircle2,
  Clock,
  Dumbbell,
  Flower2,
  Heart,
  UserCheck,
  Activity,
  Sparkles,
  Shield,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ScrollReveal';

type Block = {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  location: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  unit: string;
  href: string;
  phone: string;
  size: 'lg' | 'md' | 'sm' | 'wide' | 'tall';
  status: 'Open Now' | 'Booking Fast' | 'New';
};

const blocks: Block[] = [
  {
    id: 'gym-1',
    title: 'Iron Forge Elite',
    category: 'Gyms',
    icon: Dumbbell,
    location: 'Bandra West, Mumbai',
    description:
      'Award-winning strength & conditioning facility with elite coaches, recovery suite, and 24/7 access.',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80',
    rating: 4.9,
    reviews: 421,
    price: '₹3,499',
    unit: '/month',
    href: '/gyms',
    phone: '+919999999991',
    size: 'lg',
    status: 'Open Now',
  },
  {
    id: 'yoga-1',
    title: 'Lotus Sky Studio',
    category: 'Yoga',
    icon: Flower2,
    location: 'Indiranagar, Bangalore',
    description: 'Vinyasa, Hatha & Aerial yoga in a sunlit rooftop sanctuary.',
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: 286,
    price: '₹1,800',
    unit: '/month',
    href: '/yoga',
    phone: '+919999999992',
    size: 'tall',
    status: 'Booking Fast',
  },
  {
    id: 'spa-1',
    title: 'Aurea Wellness Spa',
    category: 'Spa',
    icon: Sparkles,
    location: 'Koregaon Park, Pune',
    description: 'Signature aromatherapy, deep-tissue & couples ritual treatments.',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: 512,
    price: '₹2,499',
    unit: '/session',
    href: '/spas',
    phone: '+919999999993',
    size: 'md',
    status: 'Open Now',
  },
  {
    id: 'trainer-1',
    title: 'Sudarshan T.A',
    category: 'Personal Trainer',
    icon: UserCheck,
    location: 'Whitefield, Bangalore',
    description: 'Elite-tier trainer • 5★ Four Seasons coach • Strength & body recomposition.',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviews: 198,
    price: '₹2,000',
    unit: '/session',
    href: '/trainers/1add22ab-7d89-4376-b8f4-1c6e31399938',
    phone: '+919999999994',
    size: 'wide',
    status: 'New',
  },
  {
    id: 'therapist-1',
    title: 'Dr. Naomi Sharma',
    category: 'Therapist',
    icon: Heart,
    location: 'Connaught Place, Delhi',
    description: 'Licensed clinical therapist — anxiety, CBT & mindfulness.',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: 142,
    price: '₹1,500',
    unit: '/session',
    href: '/therapists',
    phone: '+919999999995',
    size: 'sm',
    status: 'Open Now',
  },
  {
    id: 'chiro-1',
    title: 'AlignSpine Clinic',
    category: 'Chiropractor',
    icon: Activity,
    location: 'Anna Nagar, Chennai',
    description: 'Posture correction, spinal decompression & sports recovery.',
    image:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: 96,
    price: '₹1,200',
    unit: '/visit',
    href: '/chiropractors',
    phone: '+919999999996',
    size: 'sm',
    status: 'Booking Fast',
  },
];

const sizeMap: Record<Block['size'], string> = {
  lg: 'md:col-span-2 md:row-span-2 min-h-[420px] md:min-h-[520px]',
  tall: 'md:col-span-1 md:row-span-2 min-h-[420px] md:min-h-[520px]',
  wide: 'md:col-span-2 md:row-span-1 min-h-[260px]',
  md: 'md:col-span-1 md:row-span-1 min-h-[260px]',
  sm: 'md:col-span-1 md:row-span-1 min-h-[260px]',
};

const statusStyles: Record<Block['status'], string> = {
  'Open Now': 'bg-emerald-500/90 text-white',
  'Booking Fast': 'bg-amber-500/90 text-white',
  New: 'bg-primary/90 text-white',
};

const BentoCard: React.FC<{ block: Block; index: number }> = ({ block, index }) => {
  const Icon = block.icon;
  const isLarge = block.size === 'lg' || block.size === 'tall';

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `tel:${block.phone}`;
  };

  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = `Hi, I'd like to book a session at ${block.title}.`;
    window.open(
      `https://wa.me/${block.phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-border/60',
        'bg-card shadow-[0_4px_24px_-8px_hsl(var(--foreground)/0.08)]',
        'hover:shadow-[0_24px_60px_-20px_hsl(var(--primary)/0.35)]',
        'hover:border-primary/40 transition-all duration-500',
        sizeMap[block.size]
      )}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={block.image}
          alt={`${block.title} — ${block.category} in ${block.location}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/95 via-charcoal-900/40 to-charcoal-900/10" />
        {/* glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.35),transparent_60%)]" />
      </div>

      {/* Top badges */}
      <div className="relative z-10 flex items-start justify-between p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="backdrop-blur-md bg-white/15 border border-white/25 text-white font-medium rounded-full px-3 py-1 text-xs">
            <Icon className="h-3 w-3 mr-1.5" />
            {block.category}
          </Badge>
          <Badge className="backdrop-blur-md bg-white/15 border border-white/25 text-white rounded-full px-2.5 py-1 text-xs flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-300" />
            Verified
          </Badge>
        </div>
        <Badge className={cn('rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md border-0', statusStyles[block.status])}>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white mr-1.5 animate-pulse" />
          {block.status}
        </Badge>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 mt-auto flex h-full flex-col justify-end p-5 md:p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-2.5 py-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-xs font-semibold">{block.rating}</span>
            <span className="text-white/70 text-xs">({block.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-white/85 text-xs">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{block.location}</span>
          </div>
        </div>

        <h3
          className={cn(
            'font-display font-bold text-white tracking-tight leading-tight mb-2',
            isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
          )}
        >
          {block.title}
        </h3>

        {isLarge && (
          <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4 max-w-md line-clamp-2">
            {block.description}
          </p>
        )}

        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="text-white text-xl md:text-2xl font-display font-bold">{block.price}</span>
            <span className="text-white/70 text-xs md:text-sm ml-1">{block.unit}</span>
          </div>

          <div className="flex items-center gap-2">
            {isLarge && (
              <Button
                onClick={handleCall}
                size="sm"
                variant="outline"
                className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-md h-9 px-3"
                aria-label={`Call ${block.title}`}
              >
                <Phone className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              onClick={handleBook}
              size="sm"
              className="rounded-full bg-white text-charcoal-900 hover:bg-primary hover:text-primary-foreground font-semibold h-9 px-4 transition-all duration-300 group/btn"
            >
              Book Now
              <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover/btn:rotate-45" />
            </Button>
          </div>
        </div>
      </div>

      {/* Full-card link for "View Profile" */}
      <Link
        to={block.href}
        aria-label={`View ${block.title} profile`}
        className="absolute inset-0 z-[5]"
      />
    </motion.div>
  );
};

const BentoShowcase: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Subtle ambient backgrounds */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-brand-600/10 blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 mb-3">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-foreground tracking-wide">
                  Featured · Verified · Hand-picked
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                Wellness, curated.
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xl">
                A premium edit of gyms, yoga studios, spas, trainers, therapists & chiropractors —
                all in one beautifully balanced view.
              </p>
            </div>
            <Link to="/explore">
              <Button
                variant="outline"
                className="rounded-full border-border hover:border-primary text-foreground hover:text-primary px-5 h-11"
              >
                Explore all
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[260px]">
          {blocks.map((b, i) => (
            <BentoCard key={b.id} block={b} index={i} />
          ))}
        </div>

        {/* Category quick-links strip */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Featured Gyms', href: '/gyms', icon: Dumbbell },
            { label: 'Trending Yoga', href: '/yoga', icon: Flower2 },
            { label: 'Premium Spa', href: '/spas', icon: Sparkles },
            { label: 'Top Trainers', href: '/trainers', icon: UserCheck },
            { label: 'Verified Therapists', href: '/therapists', icon: Heart },
            { label: 'Chiropractors', href: '/chiropractors', icon: Activity },
          ].map((l, i) => {
            const Icon = l.icon;
            return (
              <Link key={l.href} to={l.href}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md p-4 transition-all duration-300"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">{l.label}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      View all <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
          <span className="hidden">{Clock ? '' : ''}</span>
        </div>
      </div>
    </section>
  );
};

export default BentoShowcase;
