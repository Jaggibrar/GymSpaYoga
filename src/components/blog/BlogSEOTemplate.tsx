// Blog SEO Template Component

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, Clock, User, ArrowLeft, Share2, Heart,
  ChevronRight, BookOpen, TrendingUp, MapPin
} from 'lucide-react';
import { 
  generateArticleSchema, 
  generateBreadcrumbSchema,
  generateFAQSchema 
} from '@/utils/seoSchemaGenerator';
import { BlogInternalLinks } from '@/components/SEO/InternalLinkingSystem';
import { INDIAN_CITIES, SERVICE_CATEGORIES, BLOG_TEMPLATES } from '@/data/seoData';

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author_name?: string;
  featured_image_url?: string;
  created_at: string;
  updated_at: string;
  category?: string;
  tags?: string[];
  read_time_minutes?: number;
  views_count?: number;
  likes_count?: number;
  meta_description?: string;
}

interface BlogSEOTemplateProps {
  blog: BlogPostData;
  relatedBlogs?: BlogPostData[];
  faqs?: Array<{ question: string; answer: string }>;
}

export const BlogSEOTemplate: React.FC<BlogSEOTemplateProps> = ({
  blog,
  relatedBlogs = [],
  faqs = []
}) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gymspayoga.com';
  const currentUrl = `${baseUrl}/blog/${blog.slug}`;
  
  // Generate SEO data
  const pageTitle = `${blog.title} | GymSpaYoga Blog`;
  const pageDescription = blog.meta_description || blog.excerpt || blog.content.substring(0, 160);
  
  // Determine category for internal linking
  const category = blog.category?.toLowerCase() || 'gyms';
  const matchedCategory = SERVICE_CATEGORIES.find(
    c => blog.tags?.some(tag => tag.toLowerCase().includes(c.slug)) || 
         blog.title.toLowerCase().includes(c.slug)
  )?.slug || 'gyms';

  // Generate schemas
  const articleSchema = generateArticleSchema({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    author_name: blog.author_name,
    featured_image_url: blog.featured_image_url,
    created_at: blog.created_at,
    updated_at: blog.updated_at,
    category: blog.category,
    tags: blog.tags,
  });

  const breadcrumbs = [
    { name: 'Home', url: baseUrl },
    { name: 'Blog', url: `${baseUrl}/blogs` },
    { name: blog.category || 'Article', url: `${baseUrl}/blogs?category=${blog.category}` },
    { name: blog.title, url: currentUrl },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Extract city mentions for internal linking
  const mentionedCities = INDIAN_CITIES.filter(city => 
    blog.content.toLowerCase().includes(city.name.toLowerCase()) ||
    blog.title.toLowerCase().includes(city.name.toLowerCase())
  ).slice(0, 4);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={blog.tags?.join(', ') || 'fitness, health, wellness, gym, yoga, spa'} />
        <meta name="author" content={blog.author_name || 'GymSpaYoga Team'} />
        <link rel="canonical" href={currentUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={blog.featured_image_url || `${baseUrl}/images/hero-banner.png`} />
        <meta property="article:published_time" content={blog.created_at} />
        <meta property="article:modified_time" content={blog.updated_at} />
        <meta property="article:author" content={blog.author_name || 'GymSpaYoga Team'} />
        <meta property="article:section" content={blog.category || 'Wellness'} />
        {blog.tags?.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={blog.featured_image_url || `${baseUrl}/images/hero-banner.png`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <article className="min-h-screen bg-white" itemScope itemType="https://schema.org/Article">
        {/* Breadcrumbs */}
        <nav className="bg-gray-50 py-3 border-b" aria-label="Breadcrumb">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.url}>
                  {index > 0 && <ChevronRight className="h-4 w-4" />}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-900 font-medium line-clamp-1">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link to={crumb.url.replace(baseUrl, '')} className="hover:text-[#005EB8]">
                      {crumb.name}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </nav>

        {/* Header */}
        <header className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Link */}
              <Link to="/blogs" className="inline-flex items-center text-sm text-gray-600 hover:text-[#005EB8] mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Articles
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags?.map(tag => (
                  <Link key={tag} to={`/blogs?tag=${tag}`}>
                    <Badge variant="outline" className="hover:bg-[#005EB8] hover:text-white cursor-pointer">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>

              {/* Title */}
              <h1 
                className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
                itemProp="headline"
              >
                {blog.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
                <div className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <User className="h-4 w-4" />
                  <span itemProp="name">{blog.author_name || 'GymSpaYoga Team'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time itemProp="datePublished" dateTime={blog.created_at}>
                    {formatDate(blog.created_at)}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{blog.read_time_minutes || 5} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{blog.views_count || 0} views</span>
                </div>
              </div>

              {/* Featured Image */}
              {blog.featured_image_url && (
                <figure className="mb-8">
                  <img
                    src={blog.featured_image_url}
                    alt={blog.title}
                    className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                    itemProp="image"
                  />
                </figure>
              )}

              {/* Excerpt */}
              {blog.excerpt && (
                <p 
                  className="text-xl text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-[#005EB8] pl-4"
                  itemProp="description"
                >
                  {blog.excerpt}
                </p>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-6 md:p-10">
                    <div 
                      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#005EB8] prose-strong:text-gray-900"
                      itemProp="articleBody"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  </CardContent>
                </Card>

                {/* FAQ Section if present */}
                {faqs.length > 0 && (
                  <section className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {faqs.map((faq, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                            <p className="text-gray-600">{faq.answer}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}

                {/* Internal Links */}
                <BlogInternalLinks category={matchedCategory} tags={blog.tags} />

                {/* City Links if mentioned */}
                {mentionedCities.length > 0 && (
                  <Card className="mt-8">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-[#005EB8]" />
                        Explore in These Cities
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {mentionedCities.map(city => (
                          <Link
                            key={city.slug}
                            to={`/${matchedCategory}/${city.slug}`}
                            className="p-3 bg-gray-50 rounded-lg text-center hover:bg-[#005EB8] hover:text-white transition-colors"
                          >
                            {SERVICE_CATEGORIES.find(c => c.slug === matchedCategory)?.singular} in {city.name}
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Share */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3 text-sm">Share this article</h4>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({ title: blog.title, url: currentUrl });
                            } else {
                              navigator.clipboard.writeText(currentUrl);
                            }
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4" />
                          <span className="ml-1">{blog.likes_count || 0}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Related Articles */}
                  {relatedBlogs.length > 0 && (
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-[#005EB8]" />
                          Related Articles
                        </h4>
                        <div className="space-y-3">
                          {relatedBlogs.slice(0, 3).map(post => (
                            <Link
                              key={post.id}
                              to={`/blog/${post.slug}`}
                              className="block group"
                            >
                              <p className="text-sm font-medium line-clamp-2 group-hover:text-[#005EB8]">
                                {post.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {post.read_time_minutes || 5} min read
                              </p>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Quick Links */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link to="/gyms" className="text-[#005EB8] hover:underline">
                            → Find Gyms Near You
                          </Link>
                        </li>
                        <li>
                          <Link to="/trainers" className="text-[#005EB8] hover:underline">
                            → Hire a Personal Trainer
                          </Link>
                        </li>
                        <li>
                          <Link to="/yoga" className="text-[#005EB8] hover:underline">
                            → Book Yoga Classes
                          </Link>
                        </li>
                        <li>
                          <Link to="/spas" className="text-[#005EB8] hover:underline">
                            → Discover Spas
                          </Link>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

// Blog List SEO Template
interface BlogListSEOProps {
  category?: string;
  city?: string;
  tag?: string;
}

export const BlogListSEOHead: React.FC<BlogListSEOProps> = ({
  category,
  city,
  tag
}) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gymspayoga.com';
  
  let title = 'Fitness & Wellness Blog - Expert Tips & Guides | GymSpaYoga';
  let description = 'Read expert articles on fitness, gym workouts, yoga, spa treatments, and wellness tips. Stay informed with the latest health and fitness trends.';
  let url = `${baseUrl}/blogs`;

  if (category) {
    title = `${category} Articles & Guides | GymSpaYoga Blog`;
    description = `Expert articles and guides about ${category.toLowerCase()}. Tips, trends, and advice from fitness professionals.`;
    url = `${baseUrl}/blogs?category=${category}`;
  }

  if (city) {
    title = `Fitness & Wellness Guide for ${city} | GymSpaYoga Blog`;
    description = `Local fitness tips and wellness guides for ${city}. Discover the best gyms, spas, and yoga studios in your area.`;
    url = `${baseUrl}/blogs?city=${city}`;
  }

  if (tag) {
    title = `${tag} - Fitness & Health Articles | GymSpaYoga Blog`;
    description = `Articles tagged with ${tag}. Expert insights and practical tips for your fitness journey.`;
    url = `${baseUrl}/blogs?tag=${tag}`;
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default BlogSEOTemplate;
