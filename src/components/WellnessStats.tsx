import { useEffect, useRef, useState } from 'react';
import { Users, Building2, Globe2, Star } from 'lucide-react';

const stats = [
  { icon: Users, value: 50000, suffix: '+', label: 'Active Members' },
  { icon: Building2, value: 1500, suffix: '+', label: 'Verified Listings' },
  { icon: Globe2, value: 200, suffix: '+', label: 'Cities Worldwide' },
  { icon: Star, value: 4.8, suffix: '/5', label: 'Average Rating', decimals: 1 },
];

const Counter = ({ value, decimals = 0 }: { value: number; decimals?: number }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const dur = 1500;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - start) / dur, 1);
            setN(value * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref}>{n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>;
};

const WellnessStats = () => (
  <section className="py-12 md:py-16 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="inline-flex w-12 h-12 rounded-xl bg-primary/20 items-center justify-center mb-3">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
              <Counter value={s.value} decimals={s.decimals || 0} />
              {s.suffix}
            </div>
            <p className="text-secondary-foreground/70 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WellnessStats;
