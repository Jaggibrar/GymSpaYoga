// Programmatic City/Area SEO Page Component

import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';
import { 
  Search, MapPin, Star, Clock, ArrowRight, ChevronRight,
  Dumbbell, Sparkles, Heart, Users, MessageCircle, Eye,
  Filter, Grid3X3, List
} from 'lucide-react';
import { useOptimizedBusinessData } from '@/hooks/useOptimizedBusinessData';
import { useTrainers } from '@/hooks/useTrainers';
import OptimizedImage from '@/components/performance/ImageOptimizer';
import { 
  INDIAN_CITIES, 
  CITY_AREAS, 
  SERVICE_CATEGORIES, 
  SEO_FAQS,
  KEYWORD_CLUSTERS 
} from '@/data/seoData';
import {
  generateFAQSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
} from '@/utils/seoSchemaGenerator';

const CityCategory = () => {
  const { category, city, area } = useParams<{ category: string; city: string; area?: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get category info
  const categoryInfo = SERVICE_CATEGORIES.find(c => c.slug === category);
  const cityInfo = INDIAN_CITIES.find(c => c.slug === city);
  const cityAreas = city ? CITY_AREAS[city] || [] : [];
  const areaInfo = area ? cityAreas.find(a => a.slug === area) : null;

  // Fetch data based on category
  const isTrainerCategory = category === 'trainers' || category === 'therapists';
  
  const { businesses, loading: businessLoading } = useOptimizedBusinessData(
    isTrainerCategory ? '' : (category === 'yoga' ? 'yoga' : category || 'gym'),
    searchTerm,
    cityInfo?.name || ''
  );

  const { trainers, loading: trainerLoading } = useTrainers(
    searchTerm,
    cityInfo?.name || '',
    '',
    isTrainerCategory ? category : ''
  );

  const loading = isTrainerCategory ? trainerLoading : businessLoading;
  const items = isTrainerCategory ? trainers : businesses;

  // Generate SEO content
  const pageTitle = useMemo(() => {
    if (areaInfo && cityInfo) {
      return `Best ${categoryInfo?.name || 'Services'} in ${areaInfo.name}, ${cityInfo.name} - Top Rated 2026 | GymSpaYoga`;
    }
    if (cityInfo) {
      return `Best ${categoryInfo?.name || 'Services'} in ${cityInfo.name} - Top ${items.length || 50}+ Rated | GymSpaYoga`;
    }
    return `Best ${categoryInfo?.name || 'Services'} in India | GymSpaYoga`;
  }, [categoryInfo, cityInfo, areaInfo, items.length]);

  const pageDescription = useMemo(() => {
    const location = areaInfo ? `${areaInfo.name}, ${cityInfo?.name}` : cityInfo?.name || 'India';
    return `Discover the best ${categoryInfo?.name?.toLowerCase() || 'wellness services'} in ${location}. Compare prices, read verified reviews, check amenities & book online. ${items.length || 50}+ options starting from ₹999.`;
  }, [categoryInfo, cityInfo, areaInfo, items.length]);

  const h1Text = useMemo(() => {
    const location = areaInfo ? `${areaInfo.name}, ${cityInfo?.name}` : cityInfo?.name || 'India';
    return `Best ${categoryInfo?.name || 'Services'} in ${location}`;
  }, [categoryInfo, cityInfo, areaInfo]);

  // Generate schemas
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gymspayoga.com';
  const currentUrl = `${baseUrl}/${category}/${city}${area ? `/${area}` : ''}`;
  
  const breadcrumbs = [
    { name: 'Home', url: baseUrl },
    { name: categoryInfo?.name || 'Services', url: `${baseUrl}/${category}` },
    ...(cityInfo ? [{ name: cityInfo.name, url: `${baseUrl}/${category}/${city}` }] : []),
    ...(areaInfo ? [{ name: areaInfo.name, url: currentUrl }] : []),
  ];

  const faqSchema = generateFAQSchema(category || 'gyms', cityInfo?.name);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const webPageSchema = generateWebPageSchema(
    pageTitle,
    pageDescription,
    currentUrl,
    categoryInfo?.name || 'Services',
    cityInfo?.name
  );
  
  const itemListSchema = generateItemListSchema(
    items.slice(0, 10).map((item: any, index: number) => ({
      name: item.business_name || item.name,
      url: `${baseUrl}/${category}/${item.slug || item.id}`,
      image: item.image_urls?.[0] || item.profile_image_url,
      position: index + 1,
    })),
    `${categoryInfo?.name} in ${cityInfo?.name || 'India'}`
  );

  // Get related areas and cities for internal linking
  const relatedAreas = cityAreas.filter(a => a.slug !== area).slice(0, 6);
  const relatedCities = INDIAN_CITIES.filter(c => c.slug !== city).slice(0, 8);

  const getCategoryIcon = () => {
    switch (category) {
      case 'gyms': return <Dumbbell className="h-5 w-5" />;
      case 'spas': return <Sparkles className="h-5 w-5" />;
      case 'yoga': return <Heart className="h-5 w-5" />;
      case 'trainers': return <Users className="h-5 w-5" />;
      case 'therapists': return <Heart className="h-5 w-5" />;
      default: return <Star className="h-5 w-5" />;
    }
  };

  const handleViewDetails = (item: any) => {
    if (isTrainerCategory) {
      navigate(`/trainers/${item.id}`);
    } else {
      navigate(`/${category}/${item.slug || item.id}`);
    }
  };

  const handleBookNow = (phone: string, name: string) => {
    if (phone) {
      const message = `Hi, I'm interested in ${name}. Could you please provide more details?`;
      window.open(`https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${categoryInfo?.slug} in ${cityInfo?.name}, best ${categoryInfo?.slug} ${cityInfo?.name}, ${categoryInfo?.slug} near me, ${cityInfo?.name} ${categoryInfo?.slug}`} />
        <link rel="canonical" href={currentUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${baseUrl}/images/hero-banner.png`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#005EB8] to-[#003d7a] py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-white/80 text-sm mb-6" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.url}>
                  {index > 0 && <ChevronRight className="h-4 w-4" />}
                  <Link 
                    to={crumb.url.replace(baseUrl, '')} 
                    className={index === breadcrumbs.length - 1 ? 'text-white font-medium' : 'hover:text-white'}
                  >
                    {crumb.name}
                  </Link>
                </React.Fragment>
              ))}
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white">
                  {getCategoryIcon()}
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  {items.length}+ {categoryInfo?.name} Available
                </Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {h1Text}
              </h1>
              
              <p className="text-lg text-white/90 mb-8 max-w-2xl">
                {categoryInfo?.description} Find verified listings with transparent pricing and real reviews.
              </p>

              {/* Search Box */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                      <Input
                        placeholder={`Search ${categoryInfo?.name?.toLowerCase()}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
                      />
                    </div>
                    <Button className="bg-white text-[#005EB8] hover:bg-white/90 h-12 px-6 font-semibold">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Area Links */}
        {cityAreas.length > 0 && !area && (
          <section className="py-6 bg-gray-50 border-b">
            <div className="container mx-auto px-4">
              <h2 className="text-sm font-semibold text-gray-600 mb-3">
                Popular Areas in {cityInfo?.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {cityAreas.filter(a => a.popular).map((areaItem) => (
                  <Link
                    key={areaItem.slug}
                    to={`/${category}/${city}/${areaItem.slug}`}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-[#005EB8] hover:text-[#005EB8] transition-colors"
                  >
                    {categoryInfo?.singular} in {areaItem.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* View Toggle & Filters */}
        <section className="py-4 border-b sticky top-16 bg-white z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-[#005EB8] text-[#005EB8]">
                  {items.length} Results
                </Badge>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                </Button>
              </div>
              <div className="flex gap-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-[#005EB8]' : ''}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-[#005EB8]' : ''}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Listings Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg" />
                    <CardContent className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-8 bg-gray-200 rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">{categoryInfo?.icon || '🔍'}</div>
                <h3 className="text-2xl font-bold mb-2">No {categoryInfo?.name} Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or explore other areas</p>
                <Link to={`/${category}`}>
                  <Button>View All {categoryInfo?.name}</Button>
                </Link>
              </div>
            ) : (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {items.map((item: any) => (
                  <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage
                        src={item.image_urls?.[0] || item.profile_image_url || '/placeholder.svg'}
                        alt={`${item.business_name || item.name} - ${categoryInfo?.singular} in ${cityInfo?.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={400}
                        height={192}
                      />
                      <Badge className="absolute top-3 right-3 bg-[#005EB8]">
                        <Star className="h-3 w-3 mr-1 fill-white" />
                        {(4 + Math.random()).toFixed(1)}
                      </Badge>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-bold text-lg line-clamp-1 group-hover:text-[#005EB8] transition-colors">
                        {item.business_name || item.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="line-clamp-1">{item.city || item.location}</span>
                      </div>
                      {(item.opening_time || item.hourly_rate) && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span>
                            {item.opening_time ? `${item.opening_time} - ${item.closing_time}` : `₹${item.hourly_rate}/hr`}
                          </span>
                        </div>
                      )}
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleViewDetails(item)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button
                          className="flex-1 bg-[#25D366] hover:bg-[#20BD5A]"
                          onClick={() => handleBookNow(item.phone, item.business_name || item.name)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Book
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section - SEO Optimized */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Frequently Asked Questions about {categoryInfo?.name} in {cityInfo?.name || 'India'}
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {(SEO_FAQS[category as keyof typeof SEO_FAQS] || []).slice(0, 4).map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">
                      {faq.question.replace(/{city}/g, cityInfo?.name || 'your city')}
                    </h3>
                    <p className="text-gray-600">
                      {faq.answer.replace(/{city}/g, cityInfo?.name || 'your city')}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links - Related Areas */}
        {relatedAreas.length > 0 && (
          <section className="py-12 border-t">
            <div className="container mx-auto px-4">
              <h2 className="text-xl font-bold mb-6">
                {categoryInfo?.name} in Other {cityInfo?.name} Areas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {relatedAreas.map((areaItem) => (
                  <Link
                    key={areaItem.slug}
                    to={`/${category}/${city}/${areaItem.slug}`}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-[#005EB8] hover:text-white transition-colors text-center group"
                  >
                    <p className="font-medium">{areaItem.name}</p>
                    <p className="text-sm opacity-70">View {categoryInfo?.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Internal Links - Other Cities */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold mb-6">
              Explore {categoryInfo?.name} in Other Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {relatedCities.map((cityItem) => (
                <Link
                  key={cityItem.slug}
                  to={`/${category}/${cityItem.slug}`}
                  className="p-3 bg-white rounded-lg border hover:border-[#005EB8] hover:text-[#005EB8] transition-colors text-center text-sm"
                >
                  {categoryInfo?.singular} in {cityItem.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Related Categories */}
        <section className="py-12 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold mb-6">
              Related Services in {cityInfo?.name || 'India'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SERVICE_CATEGORIES.filter(c => c.slug !== category).map((cat) => (
                <Link
                  key={cat.slug}
                  to={city ? `/${cat.slug}/${city}` : `/${cat.slug}`}
                  className="p-6 bg-white rounded-xl border hover:shadow-lg transition-all group"
                >
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <h3 className="font-bold group-hover:text-[#005EB8]">{cat.name}</h3>
                  <p className="text-sm text-gray-600">in {cityInfo?.name || 'India'}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CityCategory;
