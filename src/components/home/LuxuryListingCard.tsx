import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, ShieldCheck } from 'lucide-react';
import type { HomeListing } from '@/hooks/useHomeListings';
import { getRatingInfo } from '@/utils/ratingFromId';

const TYPE_LABEL: Record<string, string> = {
  gym: 'Gym',
  spa: 'Spa',
  yoga: 'Yoga Studio',
  trainer: 'Personal Trainer',
  therapist: 'Physiotherapist',
  chiropractor: 'Chiropractor',
};

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80';

interface Props {
  listing: HomeListing;
  className?: string;
  /** Optional override for the destination route (category pages use type-specific URLs). */
  href?: string;
}

const LuxuryListingCard: React.FC<Props> = ({ listing, className = '', href }) => {
  const [saved, setSaved] = useState(false);
  const img = listing.image_urls?.[0] || FALLBACK_IMG;
  const { rating, reviews } = getRatingInfo(listing.id);
  const price = listing.monthly_price
    ? `₹${listing.monthly_price.toLocaleString('en-IN')} / month`
    : listing.session_price
      ? `₹${listing.session_price.toLocaleString('en-IN')} / session`
      : 'Contact for pricing';

  return (
    <Link
      to={href || `/business/${listing.slug || listing.id}`}
      className={`group relative block rounded-[24px] overflow-hidden zoom-media lux-card p-0 ${className}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
        <img
          src={img}
          alt={`${listing.business_name} — ${TYPE_LABEL[listing.business_type] || 'wellness'} in ${listing.city}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-card-overlay" aria-hidden />

        {/* Glass badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="pill glass-dark !px-3 !py-1 text-[11px] font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Open Now
          </span>
          <span className="pill !px-3 !py-1 text-[11px] font-semibold text-white bg-primary/90">
            <ShieldCheck className="h-3 w-3" /> Verified
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setSaved(v => !v); }}
          aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute top-4 right-4 h-10 w-10 rounded-full glass-dark flex items-center justify-center transition-transform duration-300 hover:scale-110"
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-coral text-coral' : 'text-white'}`} />
        </button>

        {/* Content over image */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-lg font-bold text-white leading-snug line-clamp-1">
            {listing.business_name}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-[13px] text-white/85">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="font-num font-semibold text-white">{rating.toFixed(1)}</span>
            <span className="text-white/60">({reviews})</span>
            <span className="text-white/40">·</span>
            <span className="truncate">{TYPE_LABEL[listing.business_type] || 'Wellness'}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-[13px] text-white/70">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{listing.address ? `${listing.address}, ` : ''}{listing.city}</span>
          </div>
          <p className="mt-2.5 font-num text-sm font-semibold text-gold">{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default LuxuryListingCard;
