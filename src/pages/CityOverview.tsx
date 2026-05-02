import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Star, Sparkles } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import OptimizedImage from '@/components/performance/ImageOptimizer';
import { getCityBySlug, categories, cities, generateFaqs } from '@/data/citySeoData';
import AdvancedSchemaInjector, { generateBreadcrumbSchema, generateFAQPageSchema } from '@/components/SEO/AdvancedSchemaGenerator';

const CityOverview = () => {
  const { slug } = useParams<{ slug: string }>();
  const city = slug ? getCityBySlug(slug) : undefined;

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 px-4">
          <h1 className="text-3xl font-bold">City Not Found</h1>
          <p className="text-muted-foreground">We don't have a wellness guide for this city yet.</p>
          <Button asChild><Link to="/">Go Home</Link></Button>
        </div>
      </div>
    );
  }

  const locationLabel = city.country && city.country !== 'India' ? `${city.name}, ${city.country}` : `${city.name}, ${city.state}`;
  const pageTitle = `Best Gyms, Spas & Yoga Studios in ${city.name} — Wellness Guide ${new Date().getFullYear()}`;
  const description = `Discover the best gyms, luxury spas, yoga studios, personal trainers and chiropractors in ${locationLabel}. Compare pricing, reviews and book directly on GymSpaYoga.`;

  const faqs = [
    ...generateFaqs('Gyms', city.name, city.country).slice(0, 2),
    ...generateFaqs('Spas', city.name, city.country).slice(0, 2),
    ...generateFaqs('Yoga Classes', city.name, city.country).slice(0, 1),
  ];

  const cityCategories = [
    { ...categories[0], path: `/gyms-in-${city.slug}` },
    { ...categories[1], path: `/spas-in-${city.slug}` },
    { ...categories[2], path: `/yoga-classes-in-${city.slug}` },
    { slug: 'trainers', label: 'Personal Trainers', icon: '💪', heroImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80', path: `/trainers` },
    { slug: 'chiropractors', label: 'Chiropractors', icon: '🩺', heroImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80', path: `/chiropractors` },
    { slug: 'therapists', label: 'Therapists', icon: '🧘‍♀️', heroImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80', path: `/therapists` },
  ];

  return (
    <>
      <SEOHead title={pageTitle} description={description} keywords={`gyms in ${city.name}, spas in ${city.name}, yoga in ${city.name}, wellness ${city.name}, fitness ${city.name}, ${city.name} wellness guide`} />
      <AdvancedSchemaInjector schemas={[
        generateBreadcrumbSchema([
          { name: 'Home', url: 'https://gymspayoga.com/' },
          { name: 'Cities', url: 'https://gymspayoga.com/explore' },
          { name: city.name, url: `https://gymspayoga.com/city/${city.slug}` },
        ]),
        generateFAQPageSchema(faqs),
      ]} />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative h-[280px] md:h-[380px] overflow-hidden">
          <OptimizedImage src={city.heroImage} alt={`Wellness in ${city.name}`} className="absolute inset-0 w-full h-full object-cover" priority width={1920} height={380} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-center">
            <Badge className="mx-auto mb-3 bg-primary text-primary-foreground border-0 w-fit"><MapPin className="h-3 w-3 mr-1" /> {locationLabel}</Badge>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">Wellness in {city.name}</h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              Your complete guide to gyms, spas, yoga studios & wellness experts in {city.description}.
            </p>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 py-3 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex gap-1 flex-wrap">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li><Link to="/explore" className="hover:text-primary">Cities</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">{city.name}</li>
          </ol>
        </nav>

        {/* Categories grid */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-foreground">Explore Wellness Services in {city.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cityCategories.map((cat) => (
              <Link key={cat.slug} to={cat.path}>
                <Card className="group h-full overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <OptimizedImage src={cat.heroImage} alt={`${cat.label} in ${city.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width={600} height={338} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white text-2xl">{cat.icon}</div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors mb-1">{cat.label} in {city.name}</h3>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">Browse listings <ArrowRight className="h-3.5 w-3.5" /></p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Why */}
        <section className="container mx-auto px-4 py-10 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Why Choose Wellness Services in {city.name}?</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            {city.name}, {city.description}, has emerged as one of the most vibrant wellness destinations. Whether you're looking for high-intensity training, a luxury spa retreat, or a calming yoga session, {city.name} offers options across every budget — from affordable neighborhood studios to premium boutique experiences.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            On GymSpaYoga, every {city.name} listing is verified with real photos, transparent pricing, and direct WhatsApp booking — no commissions, no hidden fees.
          </p>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-10 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 flex items-center gap-2"><Sparkles className="h-6 w-6 text-primary" /> FAQs about Wellness in {city.name}</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group border border-border rounded-2xl p-5 bg-card open:shadow-md transition-shadow">
                <summary className="font-semibold cursor-pointer flex justify-between items-center text-foreground">
                  {f.question}
                  <span className="ml-2 text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related cities */}
        <section className="container mx-auto px-4 py-10 pb-16">
          <h2 className="text-xl md:text-2xl font-display font-bold mb-5">Wellness in Other Cities</h2>
          <div className="flex flex-wrap gap-2">
            {cities.filter(c => c.slug !== city.slug).slice(0, 24).map(c => (
              <Link key={c.slug} to={`/city/${c.slug}`} className="px-4 py-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors text-sm font-medium">
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default CityOverview;
