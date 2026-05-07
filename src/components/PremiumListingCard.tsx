import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Phone, CheckCircle2, Verified } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RatingStars from '@/components/ui/RatingStars';
import { cn } from '@/lib/utils';

export interface PremiumListingCardProps {
  href: string;
  title: string;
  category: string;
  location?: string;
  description?: string;
  image?: string;
  rating?: number;
  price?: string;
  unit?: string;
  phone?: string;
  status?: 'Open Now' | 'Booking Fast' | 'New' | 'Verified';
  tier?: string;
  index?: number;
  bookHref?: string;
  whatsappMessage?: string;
  className?: string;
}

const statusStyles: Record<NonNullable<PremiumListingCardProps['status']>, string> = {
  'Open Now': 'bg-emerald-500/90 text-white',
  'Booking Fast': 'bg-amber-500/90 text-white',
  New: 'bg-primary/90 text-white',
  Verified: 'bg-primary/90 text-white',
};

const fallbackImage =
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80';

/**
 * Unified premium listing card matching the Bento Grid design language.
 * Used across all category pages (Gyms, Yoga, Spa, Trainers, Therapists, Chiropractors).
 */
const PremiumListingCard: React.FC<PremiumListingCardProps> = ({
  href,
  title,
  category,
  location,
  description,
  image,
  rating = 4.8,
  price,
  unit,
  phone,
  status = 'Verified',
  tier,
  index = 0,
  whatsappMessage,
  className,
}) => {
  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (phone) window.location.href = `tel:${phone}`;
  };

  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!phone) return;
    const msg = whatsappMessage || `Hi, I'd like to book a session at ${title}.`;
    window.open(
      `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-border/60',
        'bg-card shadow-[0_4px_24px_-8px_hsl(var(--foreground)/0.08)]',
        'hover:shadow-[0_24px_60px_-20px_hsl(var(--primary)/0.35)]',
        'hover:border-primary/40 transition-all duration-500 cursor-pointer',
        'min-h-[420px] flex flex-col',
        className
      )}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={image || fallbackImage}
          alt={`${title} — ${category}${location ? ` in ${location}` : ''}`}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackImage;
          }}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/95 via-charcoal-900/40 to-charcoal-900/10" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.35),transparent_60%)]" />
      </div>

      {/* Top badges */}
      <div className="relative z-10 flex items-start justify-between p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="backdrop-blur-md bg-white/15 border border-white/25 text-white font-medium rounded-full px-3 py-1 text-xs capitalize">
            {category}
          </Badge>
          {tier && (
            <Badge className="backdrop-blur-md bg-white/15 border border-white/25 text-white rounded-full px-2.5 py-1 text-xs capitalize">
              {tier}
            </Badge>
          )}
          <Badge className="backdrop-blur-md bg-white/15 border border-white/25 text-white rounded-full px-2.5 py-1 text-xs flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-300" />
            Verified
          </Badge>
        </div>
        <Badge
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md border-0 hidden sm:flex items-center',
            statusStyles[status]
          )}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white mr-1.5 animate-pulse" />
          {status}
        </Badge>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 mt-auto flex flex-col justify-end p-5">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <div className="flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-2.5 py-1">
            <RatingStars rating={rating} size="sm" emptyClassName="text-white/30" />
          </div>
          {location && (
            <div className="flex items-center gap-1 text-white/85 text-xs min-w-0">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          )}
        </div>

        <h3 className="font-display font-bold text-white tracking-tight leading-tight mb-2 text-xl md:text-2xl line-clamp-2">
          {title}
        </h3>

        {description && (
          <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>
        )}

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            {price ? (
              <>
                <span className="text-white text-xl md:text-2xl font-display font-bold">{price}</span>
                {unit && <span className="text-white/70 text-xs md:text-sm ml-1">{unit}</span>}
              </>
            ) : (
              <span className="text-white/80 text-sm">Contact for pricing</span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {phone && (
              <Button
                onClick={handleCall}
                size="sm"
                variant="outline"
                className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-md h-10 w-10 p-0"
                aria-label={`Call ${title}`}
              >
                <Phone className="h-4 w-4" />
              </Button>
            )}
            <Button
              onClick={handleBook}
              size="sm"
              className="rounded-full bg-white text-charcoal-900 hover:bg-primary hover:text-primary-foreground font-semibold h-10 px-4 transition-all duration-300 group/btn"
            >
              Book Now
              <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover/btn:rotate-45" />
            </Button>
          </div>
        </div>
      </div>

      {/* Full-card link */}
      <Link
        to={href}
        aria-label={`View ${title} profile`}
        className="absolute inset-0 z-[5]"
      />
    </motion.div>
  );
};

export default PremiumListingCard;
