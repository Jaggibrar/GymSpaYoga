import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronDown, Dumbbell, Flame, Flower2, Leaf, HeartPulse, Users, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80',
];

const LIFESTYLES = [
  { label: 'Build Muscle', icon: Dumbbell, to: '/gyms?goal=build-muscle' },
  { label: 'Lose Weight', icon: Flame, to: '/gyms?goal=lose-weight' },
  { label: 'Yoga & Mind', icon: Flower2, to: '/yoga' },
  { label: 'Relax & Recover', icon: Leaf, to: '/spas' },
  { label: "Women's Fitness", icon: HeartPulse, to: '/gyms?goal=womens-fitness' },
  { label: 'Senior Wellness', icon: Sparkles, to: '/explore?goal=senior-wellness' },
  { label: 'Family Fitness', icon: Users, to: '/explore?goal=family-fitness' },
];

const STATS = [
  { value: '1500+', label: 'Premium Listings' },
  { value: '200+', label: 'Cities' },
  { value: '50,000+', label: 'Happy Members' },
];

const POPULAR = ['Gyms', 'Yoga', 'Spa', 'Personal Trainer', 'Physiotherapist'];

const LuxuryHero: React.FC = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 160]);

  const [idx, setIdx] = useState(0);
  const [q, setQ] = useState('');
  const [loc, setLoc] = useState('');

  useEffect(() => {
    const cached = sessionStorage.getItem('gymspayoga_detected_city');
    if (cached) setLoc(cached);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_IMAGES.length), 7000);
    return () => clearInterval(t);
  }, [reduce]);

  const search = () => {
    const p = new URLSearchParams();
    if (q) p.set('q', q);
    if (loc) p.set('city', loc);
    navigate(`/explore?${p.toString()}`);
  };

  return (
    <section ref={ref} aria-label="Hero" className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal-950">
      {/* Cinematic backdrop */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 -top-20 -bottom-20">
        <AnimatePresence mode="sync">
          <motion.img
            key={idx}
            src={HERO_IMAGES[idx]}
            alt=""
            aria-hidden
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.6 }, scale: { duration: 9, ease: 'linear' } }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
      <div className="absolute inset-0 bg-[hsl(172_65%_8%/0.35)]" aria-hidden />

      <div className="relative z-10 container-modern flex min-h-[100svh] flex-col justify-center pt-28 pb-40 lg:pb-48">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
          {/* Left column */}
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold text-white tracking-[-0.04em] leading-[0.95] text-[13vw] sm:text-6xl lg:text-[5.5rem]"
            >
              Wellness,
              <br />
              <span className="text-mint">Reimagined.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed"
            >
              Discover the best gyms, yoga studios, spas, trainers and wellness experts near you.
            </motion.p>

            {/* Floating search panel */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-9 rounded-[24px] bg-white/95 backdrop-blur-xl p-5 sm:p-6 shadow-[0_40px_90px_-30px_rgba(7,31,28,0.6)]"
            >
              <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                <div>
                  <label htmlFor="hero-q" className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal-500 mb-2">
                    What are you looking for?
                  </label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                    <input
                      id="hero-q"
                      value={q}
                      onChange={e => setQ(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && search()}
                      placeholder="Gym, Yoga, Spa, Trainer…"
                      className="h-[52px] w-full rounded-full border border-charcoal-200 bg-white pl-10 pr-4 text-sm text-charcoal-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="hero-loc" className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal-500 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                    <input
                      id="hero-loc"
                      value={loc}
                      onChange={e => setLoc(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && search()}
                      placeholder="City or neighbourhood"
                      className="h-[52px] w-full rounded-full border border-charcoal-200 bg-white pl-10 pr-4 text-sm text-charcoal-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                </div>
                <button
                  onClick={search}
                  className="h-[52px] rounded-full bg-brand-500 px-9 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 shadow-emerald"
                >
                  Search
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
                <span className="font-semibold text-charcoal-800">Popular:</span>
                {POPULAR.map(p => (
                  <button
                    key={p}
                    onClick={() => { setQ(p); }}
                    className="text-charcoal-500 transition-colors hover:text-brand-500"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Floating stats card */}
          <motion.aside
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="glass-dark hidden lg:block p-7 text-center animate-float"
          >
            <p className="eyebrow !text-gold mb-5">Our Mission &amp; Vision</p>
            <div className="space-y-6">
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="font-num text-3xl font-bold text-white">{s.value}</div>
                  <div className="mt-1 text-xs text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-7 flex justify-center -space-x-2">
              {['👩', '🧘', '💪', '🧖'].map((e, i) => (
                <span key={i} className="grid h-9 w-9 place-items-center rounded-full border-2 border-white/25 bg-brand-800 text-sm">{e}</span>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>

      {/* Floating lifestyle pills */}
      <div className="absolute inset-x-0 bottom-10 z-20">
        <div className="container-modern">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {LIFESTYLES.map((l, i) => (
              <motion.button
                key={l.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.06 }}
                onClick={() => navigate(l.to)}
                className="glass-dark group flex min-w-[128px] flex-col items-center gap-2 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-mint/50"
              >
                <l.icon className="h-5 w-5 text-mint transition-transform duration-300 group-hover:scale-110" />
                <span className="whitespace-nowrap text-xs font-medium text-white">{l.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 z-20 -translate-x-1/2">
        <ChevronDown className="h-5 w-5 animate-bounce text-white/50" />
      </div>
    </section>
  );
};

export default LuxuryHero;
