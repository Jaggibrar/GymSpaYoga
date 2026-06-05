import React from 'react';
import { MapPin, Clock, Eye, MessageCircle, CheckCircle2, Verified, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Trainer } from '@/hooks/useTrainers';
import { getRatingInfo } from '@/utils/ratingFromId';
import { cn } from '@/lib/utils';

interface PremiumTrainerCardProps {
  trainer: Trainer;
  featured?: boolean;
}

const tierMap: Record<string, { label: string; cls: string }> = {
  certified: { label: 'Certified', cls: 'bg-primary text-primary-foreground' },
  expert:    { label: 'Expert',    cls: 'bg-secondary text-foreground' },
  elite:     { label: 'Elite',     cls: 'bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))]' },
};

const PremiumTrainerCard: React.FC<PremiumTrainerCardProps> = ({ trainer }) => {
  const navigate = useNavigate();
  const { rating, reviews } = React.useMemo(() => getRatingInfo(trainer.id), [trainer.id]);
  const tier = tierMap[trainer.trainer_tier] || tierMap.certified;

  const goProfile = () => navigate(`/trainers/${trainer.id}`);
  const goBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Hi, I'd like to book a session with ${trainer.name}.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const specs = trainer.specializations || [];
  const visibleSpecs = specs.slice(0, 2);
  const extraSpecs = specs.length - visibleSpecs.length;

  return (
    <article
      onClick={goProfile}
      className={cn(
        'group relative w-full max-w-sm cursor-pointer overflow-hidden bg-[hsl(var(--trainer-card))]',
        'rounded-[24px] border border-[hsl(var(--trainer-border))]',
        'shadow-[0_4px_24px_-8px_hsl(var(--trainer-shadow)/0.18)]',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-16px_hsl(var(--primary)/0.35)] hover:border-[hsl(var(--primary))]'
      )}
    >
      {/* IMAGE */}
      <div className="relative h-[220px] sm:h-[240px] md:h-[260px] overflow-hidden bg-[hsl(var(--trainer-muted))]">
        <img
          src={trainer.profile_image_url || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80'}
          alt={trainer.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80';
          }}
        />
        {/* dark gradient only on image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.1), rgba(0,0,0,0))' }}
        />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="inline-flex items-center rounded-full bg-background px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-foreground">
            {trainer.category || 'Trainer'}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground shadow-sm">
            <Verified className="h-3 w-3" /> Verified
          </span>
        </div>

        {/* Top-right tier */}
        <span className={cn('absolute top-3 right-3 rounded-full px-3 py-1 text-[11px] font-semibold shadow-sm capitalize', tier.cls)}>
          {tier.label}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3.5">
        {/* Name + rating */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[18px] font-bold text-[hsl(var(--trainer-card-foreground))] leading-tight line-clamp-1 group-hover:text-[hsl(var(--primary))] transition-colors">
            {trainer.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 rounded-full bg-[hsl(var(--trainer-rating-bg))] px-2 py-0.5">
            <Star className="h-3.5 w-3.5 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
            <span className="text-xs font-semibold text-[hsl(var(--trainer-card-foreground))]">{rating.toFixed(1)}</span>
            <span className="text-[11px] text-[hsl(var(--trainer-muted-foreground))]">({reviews})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-[hsl(var(--trainer-muted-foreground))]">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs font-medium truncate">{trainer.location}</span>
        </div>

        {/* Bio */}
        <p className="text-sm leading-relaxed text-[hsl(var(--trainer-body))] line-clamp-2 min-h-[2.8em]">
          {trainer.bio || 'Certified wellness professional helping clients reach their goals with personalized programs.'}
        </p>

        {/* Skills */}
        {visibleSpecs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleSpecs.map((s, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full bg-[hsl(var(--trainer-chip-bg))] px-2.5 py-1 text-[11px] font-semibold text-[hsl(var(--primary))] border border-[hsl(var(--trainer-chip-border))]"
              >
                {s}
              </span>
            ))}
            {extraSpecs > 0 && (
              <span className="inline-flex items-center rounded-full bg-[hsl(var(--trainer-muted))] px-2.5 py-1 text-[11px] font-medium text-[hsl(var(--trainer-body))]">
                +{extraSpecs} more
              </span>
            )}
          </div>
        )}

        {/* Experience + price */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-[hsl(var(--trainer-muted-foreground))]">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{trainer.experience} yrs exp</span>
          </div>
          <div className="text-[hsl(var(--primary))] font-bold text-base">
            ₹{trainer.hourly_rate}
            <span className="text-xs font-medium text-[hsl(var(--trainer-muted-foreground))]">/session</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={(e) => { e.stopPropagation(); goProfile(); }}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[hsl(var(--primary))] bg-[hsl(var(--trainer-card))] px-3 py-2.5 text-sm font-semibold text-[hsl(var(--primary))] transition hover:bg-[hsl(var(--trainer-chip-bg))] min-h-[48px]"
          >
            <Eye className="h-4 w-4" /> View Profile
          </button>
          <button
            onClick={goBook}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary min-h-[48px]"
          >
            <MessageCircle className="h-4 w-4" /> Book Session
          </button>
        </div>

        {/* Footer trust line */}
        <div className="flex items-center gap-1.5 pt-3 mt-1 border-t border-[hsl(var(--trainer-border))] text-[11px] text-[hsl(var(--trainer-muted-foreground))]">
          <CheckCircle2 className="h-3 w-3 text-[hsl(var(--primary))]" />
          <span className="truncate">{trainer.certifications || 'Certified & background-verified'}</span>
        </div>
      </div>
    </article>
  );
};

export default React.memo(PremiumTrainerCard);
