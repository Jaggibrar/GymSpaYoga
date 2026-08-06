import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Target, Wallet, Clock, ShieldCheck, ChevronRight, Heart, MessageCircle, Star } from 'lucide-react';

const QUICK = [
  { icon: Target, title: 'Personalized', sub: 'Recommendations' },
  { icon: Wallet, title: 'Budget', sub: 'Friendly Options' },
  { icon: Clock, title: 'Save Time', sub: 'Smart Search' },
  { icon: ShieldCheck, title: 'Trusted', sub: 'Verified Listings' },
];

const STORIES = [
  { name: 'Rohit Sharma', ago: '2h ago', likes: 124, comments: 34, img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80' },
  { name: 'Ananya Das', ago: '4h ago', likes: 98, comments: 12, img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80' },
  { name: 'Pooja Mehta', ago: '8h ago', likes: 67, comments: 10, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80' },
  { name: 'Vikram Singh', ago: '1d ago', likes: 102, comments: 16, img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80' },
];

const EVENTS = [
  { title: '30 Days Fitness Challenge', dates: '1st – 30th June', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80' },
  { title: 'Yoga Week Challenge', dates: '5th – 11th June', img: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=600&q=80' },
  { title: 'Weight Loss Marathon', dates: '10th – 30th June', img: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=600&q=80' },
  { title: 'Cycling Challenge', dates: '15th – 30th June', img: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=600&q=80' },
];

const TRAINERS = [
  { name: 'Rahul Verma', role: 'Strength Coach', exp: '8+ Years Exp.', rating: 4.9, reviews: 132, price: '₹1,500 / session', img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=400&q=80' },
  { name: 'Neha Kapoor', role: 'Yoga Expert', exp: '6+ Years Exp.', rating: 4.8, reviews: 96, price: '₹1,200 / session', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80' },
  { name: 'Amit Singh', role: 'Fitness Coach', exp: '10+ Years Exp.', rating: 4.9, reviews: 210, price: '₹1,800 / session', img: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=400&q=80' },
];

const PanelHeader: React.FC<{ title: string; sub?: string; to: string }> = ({ title, sub, to }) => (
  <div className="mb-4 flex items-end justify-between gap-3">
    <div>
      <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </div>
    <Link to={to} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground transition hover:border-primary/40">
      View All
    </Link>
  </div>
);

const WellnessPanel: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* AI Wellness Assistant */}
      <section aria-labelledby="ai-assistant-heading">
        <h3 id="ai-assistant-heading" className="font-display text-lg font-bold text-foreground">AI Wellness Assistant</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">Let our AI find the perfect wellness options for you.</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="glass-card p-4">
            <span className="pill bg-primary text-primary-foreground !px-3 !py-1 text-[11px]">
              <Sparkles className="h-3 w-3" /> AI Assistant
            </span>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              Hi! I'm your AI Wellness Assistant. Tell me your goal and I'll recommend the best options for you.
            </p>
            <Link
              to="/assistant"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:-translate-y-0.5"
            >
              Start Chat <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {QUICK.map(q => (
              <Link
                key={q.title}
                to="/assistant"
                className="lux-card flex items-center gap-3 px-4 py-2.5 !rounded-2xl"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-secondary">
                  <q.icon className="h-4 w-4 text-primary" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold text-foreground">{q.title}</span>
                  <span className="block text-[11px] text-muted-foreground">{q.sub}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stories */}
      <section aria-labelledby="stories-heading">
        <div id="stories-heading">
          <PanelHeader title="Community Stories" sub="Real people. Real transformations." to="/community" />
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {STORIES.map(s => (
            <Link key={s.name} to="/community" className="group w-[150px] shrink-0 overflow-hidden rounded-[20px] zoom-media shadow-soft">
              <div className="relative aspect-[3/4] bg-secondary">
                <img src={s.img} alt={`${s.name}'s wellness story`} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-card-overlay" aria-hidden />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/90 text-[10px] font-bold text-brand-500">
                    {s.name.charAt(0)}
                  </span>
                  <span className="text-[10px] font-medium text-white drop-shadow">{s.name}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-2.5 text-[10px] text-white">
                  <span className="flex items-center gap-1"><Heart className="h-3 w-3 fill-coral text-coral" />{s.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{s.comments}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Events & Challenges */}
      <section aria-labelledby="events-heading">
        <div id="events-heading">
          <PanelHeader title="Upcoming Events & Challenges" to="/community" />
        </div>
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {EVENTS.map(e => (
            <div key={e.title} className="group relative overflow-hidden rounded-[20px] zoom-media shadow-soft">
              <div className="aspect-[4/5] bg-secondary">
                <img src={e.img} alt={e.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(172_65%_8%/0.75),hsl(172_65%_8%/0.9))]" aria-hidden />
              <div className="absolute inset-0 flex flex-col justify-between p-3.5">
                <div>
                  <h4 className="font-display text-[13px] font-bold leading-tight text-white">{e.title}</h4>
                  <p className="mt-1 font-num text-[10px] text-white/60">{e.dates}</p>
                </div>
                <Link to="/community" className="self-start rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground transition hover:-translate-y-0.5">
                  Join Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Trainers */}
      <section aria-labelledby="trainers-heading">
        <div id="trainers-heading">
          <PanelHeader title="Premium Trainers" sub="Certified. Experienced. Trusted." to="/trainers" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {TRAINERS.map(t => (
            <Link key={t.name} to="/trainers" className="lux-card flex items-center gap-3 p-3">
              <img src={t.img} alt={t.name} loading="lazy" className="h-14 w-14 shrink-0 rounded-2xl object-cover" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
                <p className="truncate text-[11px] text-muted-foreground">{t.role} · {t.exp}</p>
                <p className="mt-1 flex items-center gap-1 text-[11px]">
                  <Star className="h-3 w-3 fill-gold text-gold" />
                  <span className="font-num font-semibold text-foreground">{t.rating}</span>
                  <span className="text-muted-foreground">({t.reviews})</span>
                </p>
                <p className="mt-0.5 font-num text-[11px] font-semibold text-primary">{t.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WellnessPanel;
