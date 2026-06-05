import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Search, ArrowRight, Sparkles, Dumbbell, Flower2, Heart, UserCheck, Activity, Stethoscope, Star, ShieldCheck, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

/**
 * CinematicHero — fullscreen, animated, parallax hero for the premium dark GymSpaYoga experience.
 * No video assets required. Pure CSS/Framer Motion for cinematic depth.
 */
const CATEGORIES = [
  { key: 'gym', label: 'Gyms', icon: Dumbbell, path: '/gyms' },
  { key: 'yoga', label: 'Yoga', icon: Flower2, path: '/yoga' },
  { key: 'spa', label: 'Spas', icon: Heart, path: '/spas' },
  { key: 'trainer', label: 'Trainers', icon: UserCheck, path: '/trainers' },
  { key: 'therapist', label: 'Therapists', icon: Activity, path: '/therapists' },
  { key: 'chiropractor', label: 'Chiropractors', icon: Stethoscope, path: '/chiropractors' },
];

const FLOATING_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80', cls: 'top-[12%] left-[6%] w-32 h-40 md:w-40 md:h-52', delay: 0 },
  { src: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80', cls: 'top-[18%] right-[8%] w-36 h-44 md:w-44 md:h-56', delay: 0.4 },
  { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80', cls: 'bottom-[14%] left-[10%] w-32 h-40 md:w-44 md:h-52', delay: 0.6 },
  { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80', cls: 'bottom-[18%] right-[6%] w-32 h-40 md:w-40 md:h-52', delay: 0.8 },
];

const CinematicHero: React.FC = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, reduceMotion ? 0 : -120]);
  const y2 = useTransform(scrollY, [0, 600], [0, reduceMotion ? 0 : -60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem('gymspayoga_detected_city');
    if (cached) setCity(cached);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    const route = CATEGORIES.find(c => c.key === cat)?.path ?? '/explore';
    navigate(`${route}?${params.toString()}`);
  };

  return (
    <section
      aria-label="Hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal-950"
    >
      {/* Ambient gradient + grain backdrop */}
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
      <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden />

      {/* Animated glow orbs */}
      <motion.div
        aria-hidden
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-primary/20 blur-[140px]"
        animate={reduceMotion ? undefined : { x: [0, 60, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -right-40 w-[560px] h-[560px] rounded-full bg-gold/15 blur-[160px]"
        animate={reduceMotion ? undefined : { x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating parallax images (decorative) */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 hidden md:block pointer-events-none" aria-hidden>
        {FLOATING_IMAGES.slice(0, 2).map((img, i) => (
          <motion.div
            key={i}
            className={`absolute ${img.cls} rounded-3xl overflow-hidden border border-white/10 shadow-2xl`}
            initial={{ opacity: 0, y: 40, rotate: i % 2 ? 4 : -4 }}
            animate={{ opacity: 1, y: 0, rotate: i % 2 ? 4 : -4 }}
            transition={{ duration: 1, delay: img.delay, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={img.src} alt="" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
          </motion.div>
        ))}
      </motion.div>
      <motion.div style={{ y: y2, opacity }} className="absolute inset-0 hidden md:block pointer-events-none" aria-hidden>
        {FLOATING_IMAGES.slice(2).map((img, i) => (
          <motion.div
            key={i}
            className={`absolute ${img.cls} rounded-3xl overflow-hidden border border-white/10 shadow-2xl`}
            initial={{ opacity: 0, y: 40, rotate: i % 2 ? -3 : 3 }}
            animate={{ opacity: 1, y: 0, rotate: i % 2 ? -3 : 3 }}
            transition={{ duration: 1, delay: img.delay, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={img.src} alt="" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
          </motion.div>
        ))}
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background))_90%)]" aria-hidden />

      {/* Content */}
      <div className="relative z-10 container-modern flex flex-col items-center justify-center text-center min-h-[100svh] py-24">
        {/* Trust pill */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8 shadow-medium"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs sm:text-sm text-foreground font-medium">
            India's #1 Premium Wellness Discovery · 1,500+ Verified Listings
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold tracking-tight text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] max-w-5xl"
        >
          Where Fitness
          <br />
          Meets <span className="text-gradient-emerald">Wellness</span>.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-white leading-relaxed"
        >
          {city
            ? <>Discover India's most premium gyms, yoga studios, spas, trainers & therapists in <span className="text-white font-medium">{city}</span>. Booked in seconds.</>
            : <>Discover, book and transform with India's most curated network of gyms, yoga studios, luxury spas and certified wellness experts.</>}
        </motion.p>

        {/* Search command */}
        <motion.div
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 w-full max-w-3xl"
        >
          <div className="glass-card p-2 sm:p-2.5 flex flex-col sm:flex-row gap-2 sm:gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search gyms, yoga, spas, trainers, cities…"
                className="pl-11 h-12 sm:h-14 bg-background border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 text-sm sm:text-base"
              />
            </div>
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger className="w-full sm:w-[170px] h-12 sm:h-14 bg-background border-border text-foreground rounded-2xl">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {CATEGORIES.map(c => (
                  <SelectItem key={c.key} value={c.key}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleSearch}
              className="h-12 sm:h-14 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary shadow-emerald"
            >
              <Search className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            onClick={() => navigate('/explore')}
            size="lg"
            className="rounded-2xl bg-primary text-primary-foreground font-semibold px-7 h-12 shadow-emerald hover:bg-primary"
          >
            Explore Wellness <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={() => navigate('/register-business')}
            size="lg"
            variant="outline"
            className="rounded-2xl h-12 px-7 bg-card border-border text-foreground hover:bg-secondary hover:text-foreground"
          >
            List Your Business
          </Button>
        </motion.div>

        {/* Floating category chips */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 max-w-3xl"
        >
          {CATEGORIES.map((c, i) => (
            <motion.button
              key={c.key}
              onClick={() => navigate(c.path)}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-foreground hover:text-foreground hover:border-primary hover:bg-secondary transition-all text-sm font-medium"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <c.icon className="h-3.5 w-3.5 text-primary" />
              {c.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Live counters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-12 grid grid-cols-3 gap-4 sm:gap-10 max-w-2xl w-full"
        >
          {[
            { label: 'Verified Listings', value: '1,500+' },
            { label: 'Happy Members', value: '50K+' },
            { label: 'Cities Covered', value: '200+' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">{s.value}</div>
              <div className="mt-1 text-[11px] sm:text-xs uppercase tracking-wider text-white/55">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs uppercase tracking-[0.3em] flex flex-col items-center gap-2"
        >
          <span>Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
            animate={reduceMotion ? undefined : { scaleY: [0.4, 1, 0.4] }}
            style={{ transformOrigin: 'top' }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CinematicHero;
