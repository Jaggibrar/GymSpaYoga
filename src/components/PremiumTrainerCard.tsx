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
  certified: { label: 'Certified', cls: 'bg-sky-500 text-white' },
  expert:    { label: 'Expert',    cls: 'bg-violet-500 text-white' },
  elite:     { label: 'Elite',     cls: 'bg-amber-500 text-white' },
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
        'group relative w-full max-w-sm cursor-pointer overflow-hidden bg-white',
        'rounded-[24px] border border-slate-200/70',
        'shadow-[0_4px_24px_-8px_rgba(15,23,42,0.18)]',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-16px_rgba(16,185,129,0.35)] hover:border-emerald-200'
      )}
    >
      {/* IMAGE */}
      <div className="relative h-[220px] sm:h-[240px] md:h-[260px] overflow-hidden bg-slate-100">
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent pointer-events-none" />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="inline-flex items-center rounded-full bg-slate-900/85 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {trainer.category || 'Trainer'}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
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
          <h3 className="text-[17px] font-bold text-slate-900 leading-tight line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {trainer.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 rounded-full bg-amber-50 px-2 py-0.5">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-slate-900">{rating.toFixed(1)}</span>
            <span className="text-[11px] text-slate-500">({reviews})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-slate-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs font-medium truncate">{trainer.location}</span>
        </div>

        {/* Bio */}
        <p className="text-[13px] leading-relaxed text-slate-600 line-clamp-2 min-h-[2.6em]">
          {trainer.bio || 'Certified wellness professional helping clients reach their goals with personalized programs.'}
        </p>

        {/* Skills */}
        {visibleSpecs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleSpecs.map((s, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 border border-emerald-100"
              >
                {s}
              </span>
            ))}
            {extraSpecs > 0 && (
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                +{extraSpecs} more
              </span>
            )}
          </div>
        )}

        {/* Experience + price */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{trainer.experience} yrs exp</span>
          </div>
          <div className="text-emerald-600 font-bold text-base">
            ₹{trainer.hourly_rate}
            <span className="text-xs font-medium text-slate-500">/session</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={(e) => { e.stopPropagation(); goProfile(); }}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-emerald-500 bg-white px-3 py-2.5 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50 min-h-[44px]"
          >
            <Eye className="h-4 w-4" /> View Profile
          </button>
          <button
            onClick={goBook}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-md min-h-[44px]"
          >
            <MessageCircle className="h-4 w-4" /> Book Session
          </button>
        </div>

        {/* Footer trust line */}
        <div className="flex items-center gap-1.5 pt-3 mt-1 border-t border-slate-100 text-[11px] text-slate-500">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
          <span className="truncate">{trainer.certifications || 'Certified & background-verified'}</span>
        </div>
      </div>
    </article>
  );
};

export default React.memo(PremiumTrainerCard);
