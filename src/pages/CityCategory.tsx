import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, DollarSign, Eye, MessageCircle, ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { useOptimizedBusinessData } from '@/hooks/useOptimizedBusinessData';
import OptimizedImage from '@/components/performance/ImageOptimizer';
import { getCityBySlug, getCategoryBySlug, generateFaqs, generateSeoContent, cities, categories } from '@/data/citySeoData';
import AdvancedSchemaInjector, { generateBreadcrumbSchema, generateFAQPageSchema } from '@/components/SEO/AdvancedSchemaGenerator';
import ReactMarkdown from 'react-markdown';

const CityCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Parse slug: "gyms-in-kolkata" → category=gyms, city=kolkata
  const parts = slug?.match(/^(.+?)-in-(.+)$/);
  const categorySlug = parts?.[1] || '';
  const citySlug = parts?.[2] || '';

  const city = getCityBySlug(citySlug);
  const category = getCategoryBySlug(categorySlug);

  const { businesses, loading, error } = useOptimizedBusinessData(
    category?.businessType,
    '',
    city?.name || '',
    'created_at'
  );

  if (!city || !category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground">This city or category page doesn't exist.</p>
          <Button asChild><Link to="/">Go Home</Link></Button>
        </div>
      </div>
    );
  }

  const faqs = generateFaqs(category.label, city.name);
  const seoContent = generateSeoContent(category.label, city.name, city.description);
  const pageTitle = `Best ${category.label} in ${city.name} — Top ${category.label} Near You | GymSpaYoga`;
  const metaDescription = `Discover the best ${category.label.toLowerCase()} in ${city.name}, ${city.state}. Compare pricing, read reviews, and book directly. Budget, Premium & Luxury options available. No commission!`;

  const handleViewDetails = (business: any) => {
    const categoryPath = category.businessType === 'gym' ? 'gyms' : category.businessType === 'spa' ? 'spas' : 'yoga';
    navigate(`/${categoryPath}/${business.slug || business.id}`);
  };

  const handleBookNow = (phone: string, businessName: string) => {
    if (phone) {
      const message = `Hi, I found ${businessName} on GymSpaYoga. I'd like to know more about membership options.`;
      window.open(`https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={metaDescription}
        keywords={`${category.label.toLowerCase()} in ${city.name}, best ${category.label.toLowerCase()} ${city.name}, ${category.label.toLowerCase()} near me ${city.name}, ${category.businessType} membership ${city.name}`}
      />
      <AdvancedSchemaInjector schemas={[
        generateBreadcrumbSchema([
          { name: 'Home', url: 'https://gymspayoga.com/' },
          { name: category.label, url: `https://gymspayoga.com/${category.slug === 'yoga-classes' ? 'yoga' : category.slug}` },
          { name: city.name, url: `https://gymspayoga.com/${categorySlug}-in-${citySlug}` },
        ]),
        generateFAQPageSchema(faqs),
      ]} />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden h-[250px] md:h-[350px]">
          <div className="absolute inset-0">
            <OptimizedImage
              src={category.heroImage}
              alt={`${category.label} in ${city.name}`}
              className="w-full h-full object-cover"
              priority
              width={1920}
              height={350}
            />
            <div className="absolute inset-0 bg-black/55" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white">
                Best {category.label} in {city.name}
              </h1>
              <p className="text-base md:text-lg text-white/90">
                Discover top-rated {category.label.toLowerCase()} in {city.name}, {city.state}. Compare pricing, amenities & book directly.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 py-3 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li><Link to={`/${category.slug === 'yoga-classes' ? 'yoga' : category.slug}`} className="hover:text-primary">{category.label}</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">{city.name}</li>
          </ol>
        </nav>

        {/* Results count */}
        <section className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Badge className="bg-primary text-primary-foreground">{businesses.length} {category.label} Found</Badge>
            <span className="text-muted-foreground text-sm">in {city.name}, {city.state}</span>
          </div>
        </section>

        {/* Listings */}
        <section className="container mx-auto px-4 py-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-muted rounded-t-xl" />
                  <CardContent className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                    <div className="h-3 bg-muted rounded w-1/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : businesses.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="text-6xl">{category.icon}</div>
              <h3 className="text-2xl font-bold">No {category.label.toLowerCase()} found in {city.name} yet</h3>
              <p className="text-muted-foreground">Be the first to list your business on GymSpaYoga!</p>
              <Button asChild>
                <Link to="/register-business">Register Your Business <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <Card key={business.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border shadow-sm rounded-xl overflow-hidden flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <OptimizedImage
                      src={business.image_urls?.[0] || category.heroImage}
                      alt={`${business.business_name} — ${category.label.replace(/s$/, '')} in ${city.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={400}
                      height={300}
                    />
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground border-0 shadow">
                      <Star className="h-3 w-3 mr-1 fill-current inline" />
                      {(4.0 + Math.random()).toFixed(1)}
                    </Badge>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {business.business_name}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>{business.city}, {business.state}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {business.amenities?.slice(0, 3).map((a: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">{a}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      <span>{business.opening_time} – {business.closing_time}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="text-lg font-bold text-primary">
                        {business.monthly_price ? `₹${business.monthly_price}/mo` :
                         business.session_price ? `₹${business.session_price}/session` : 'Contact'}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-auto pt-2">
                      <Button variant="outline" onClick={() => handleViewDetails(business)} className="flex-1 min-h-[48px]">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button onClick={() => handleBookNow(business.phone, business.business_name)} className="flex-1 min-h-[48px] bg-[#25D366] hover:bg-[#20BD5A] text-white">
                        <MessageCircle className="h-4 w-4 mr-1" /> Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* SEO Content Section */}
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none text-foreground">
            <ReactMarkdown>{seoContent}</ReactMarkdown>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Frequently Asked Questions — {category.label} in {city.name}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="group border rounded-lg p-5 open:shadow-md transition-shadow">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between text-foreground">
                  {faq.question}
                  <span className="ml-2 text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Internal linking to other cities */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Explore {category.label} in Other Cities</h2>
          <div className="flex flex-wrap gap-3">
            {cities.filter(c => c.slug !== citySlug).slice(0, 12).map(c => (
              <Link
                key={c.slug}
                to={`/${categorySlug}-in-${c.slug}`}
                className="px-4 py-2 rounded-full border hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
              >
                {category.label} in {c.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Cross-category links */}
        <section className="container mx-auto px-4 py-8 pb-16">
          <h2 className="text-2xl font-bold mb-6">More Wellness Services in {city.name}</h2>
          <div className="flex flex-wrap gap-3">
            {categories.filter(c => c.slug !== categorySlug).map(c => (
              <Link
                key={c.slug}
                to={`/${c.slug}-in-${citySlug}`}
                className="px-4 py-2 rounded-full border hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
              >
                {c.icon} {c.label} in {city.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default CityCategory;
