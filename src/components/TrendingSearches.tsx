import { Link } from 'react-router-dom';
import { TrendingUp, Flame } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const trending = [
  { label: 'Gyms in Mumbai', href: '/gyms-in-mumbai', hot: true },
  { label: 'Yoga in Bangalore', href: '/yoga-classes-in-bangalore', hot: true },
  { label: 'Spas in Delhi', href: '/spas-in-delhi' },
  { label: 'Wellness in Hyderabad', href: '/city/hyderabad' },
  { label: 'Gyms in Pune', href: '/gyms-in-pune' },
  { label: 'Spas in Goa', href: '/spas-in-goa' },
  { label: 'Power Yoga Pune', href: '/yoga-classes-in-pune' },
  { label: 'Wellness in Chennai', href: '/city/chennai' },
  { label: 'Gyms in Gurgaon', href: '/gyms-in-gurgaon', hot: true },
  { label: 'Yoga in Kolkata', href: '/yoga-classes-in-kolkata' },
  { label: 'Spas in Mumbai', href: '/spas-in-mumbai' },
  { label: 'Wellness in Jaipur', href: '/city/jaipur' },
  { label: 'Gyms in Ahmedabad', href: '/gyms-in-ahmedabad' },
  { label: 'Yoga in Delhi', href: '/yoga-classes-in-delhi' },
  { label: 'Wellness in Noida', href: '/city/noida' },
  { label: 'Spas in Bangalore', href: '/spas-in-bangalore' },
];

const TrendingSearches = () => (
  <section className="py-12 md:py-16 bg-background border-y border-border">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
            Trending Searches This Week
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {trending.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent/60 hover:bg-primary hover:text-primary-foreground text-foreground text-sm font-medium transition-all border border-border hover:border-primary"
            >
              {item.hot && <Flame className="h-3.5 w-3.5 text-orange-500" />}
              {item.label}
            </Link>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default TrendingSearches;
