// Internal Linking Automation Component

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, TrendingUp } from 'lucide-react';
import { 
  INDIAN_CITIES, 
  CITY_AREAS, 
  SERVICE_CATEGORIES,
  INTERNAL_LINK_STRUCTURE 
} from '@/data/seoData';

interface CityLinksProps {
  currentCategory?: string;
  currentCity?: string;
  variant?: 'footer' | 'sidebar' | 'inline';
}

// City Links Matrix for Footer/Sidebar
export const CityLinksMatrix: React.FC<CityLinksProps> = ({ 
  currentCategory = 'gyms',
  currentCity,
  variant = 'footer'
}) => {
  const categories = SERVICE_CATEGORIES;
  const cities = INDIAN_CITIES.filter(c => c.tier === 1).slice(0, 8);

  if (variant === 'footer') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {categories.map((cat) => (
          <div key={cat.slug}>
            <h4 className="font-bold mb-4 text-white">{cat.name}</h4>
            <ul className="space-y-2">
              {cities.map((city) => (
                <li key={`${cat.slug}-${city.slug}`}>
                  <Link
                    to={`/${cat.slug}/${city.slug}`}
                    className={`text-sm hover:text-white transition-colors ${
                      currentCategory === cat.slug && currentCity === city.slug
                        ? 'text-white font-medium'
                        : 'text-gray-400'
                    }`}
                  >
                    {cat.singular} in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#005EB8]" />
            Explore by City
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cities.slice(0, 6).map((city) => (
            <Link
              key={city.slug}
              to={`/${currentCategory}/${city.slug}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="font-medium group-hover:text-[#005EB8]">
                {city.name}
              </span>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#005EB8]" />
            </Link>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Inline variant
  return (
    <div className="flex flex-wrap gap-2">
      {cities.map((city) => (
        <Link
          key={city.slug}
          to={`/${currentCategory}/${city.slug}`}
        >
          <Badge variant="outline" className="hover:bg-[#005EB8] hover:text-white cursor-pointer">
            {city.name}
          </Badge>
        </Link>
      ))}
    </div>
  );
};

interface RelatedListingsProps {
  category: string;
  city?: string;
  currentId?: string;
  limit?: number;
}

// Related Listings Component
export const RelatedListings: React.FC<RelatedListingsProps> = ({
  category,
  city,
  currentId,
  limit = 4
}) => {
  const linkStructure = INTERNAL_LINK_STRUCTURE[category as keyof typeof INTERNAL_LINK_STRUCTURE];
  const relatedCategories = linkStructure?.relatedCategories || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#005EB8]" />
          You Might Also Like
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {relatedCategories.map((relCat) => {
          const catInfo = SERVICE_CATEGORIES.find(c => c.slug === relCat);
          return (
            <Link
              key={relCat}
              to={city ? `/${relCat}/${city}` : `/${relCat}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="text-2xl">{catInfo?.icon}</span>
              <div className="flex-1">
                <p className="font-medium group-hover:text-[#005EB8]">
                  {catInfo?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {city ? `in ${INDIAN_CITIES.find(c => c.slug === city)?.name}` : 'Near You'}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#005EB8]" />
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
};

interface AreaLinksProps {
  city: string;
  category: string;
  currentArea?: string;
}

// Area Quick Links
export const AreaQuickLinks: React.FC<AreaLinksProps> = ({
  city,
  category,
  currentArea
}) => {
  const areas = CITY_AREAS[city] || [];
  const categoryInfo = SERVICE_CATEGORIES.find(c => c.slug === category);

  if (areas.length === 0) return null;

  return (
    <div className="py-4">
      <h3 className="text-sm font-semibold text-gray-600 mb-3">
        Popular Areas
      </h3>
      <div className="flex flex-wrap gap-2">
        {areas.filter(a => a.popular).map((area) => (
          <Link
            key={area.slug}
            to={`/${category}/${city}/${area.slug}`}
          >
            <Badge
              variant={currentArea === area.slug ? 'default' : 'outline'}
              className={`cursor-pointer ${
                currentArea === area.slug
                  ? 'bg-[#005EB8]'
                  : 'hover:bg-[#005EB8] hover:text-white'
              }`}
            >
              {categoryInfo?.singular} in {area.name}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};

interface BlogInternalLinksProps {
  category: string;
  tags?: string[];
}

// Blog Internal Links
export const BlogInternalLinks: React.FC<BlogInternalLinksProps> = ({
  category,
  tags = []
}) => {
  const linkStructure = INTERNAL_LINK_STRUCTURE[category as keyof typeof INTERNAL_LINK_STRUCTURE];
  const blogTopics = linkStructure?.blogTopics || [];
  const cities = INDIAN_CITIES.filter(c => c.tier === 1).slice(0, 4);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg">Related Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Related Blogs */}
          <div>
            <h4 className="font-semibold mb-3 text-sm text-gray-600">Related Articles</h4>
            <ul className="space-y-2">
              {blogTopics.slice(0, 3).map((topic) => (
                <li key={topic}>
                  <Link
                    to={`/blogs?tag=${topic}`}
                    className="text-sm text-[#005EB8] hover:underline"
                  >
                    → Browse {topic.replace('-', ' ')} articles
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* City Guides */}
          <div>
            <h4 className="font-semibold mb-3 text-sm text-gray-600">City Guides</h4>
            <ul className="space-y-2">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    to={`/${category}/${city.slug}`}
                    className="text-sm text-[#005EB8] hover:underline"
                  >
                    → {SERVICE_CATEGORIES.find(c => c.slug === category)?.name} in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Contextual Links Component (for embedding in content)
interface ContextualLinksProps {
  text: string;
  category: string;
  city?: string;
}

export const ContextualLinks: React.FC<ContextualLinksProps> = ({
  text,
  category,
  city
}) => {
  // Replace keywords with links
  const keywords = [
    { word: 'gyms', link: city ? `/gyms/${city}` : '/gyms' },
    { word: 'spas', link: city ? `/spas/${city}` : '/spas' },
    { word: 'yoga', link: city ? `/yoga/${city}` : '/yoga' },
    { word: 'trainers', link: city ? `/trainers/${city}` : '/trainers' },
    { word: 'personal trainer', link: city ? `/trainers/${city}` : '/trainers' },
  ];

  let processedText = text;
  keywords.forEach(({ word, link }) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    processedText = processedText.replace(
      regex,
      `<a href="${link}" class="text-[#005EB8] hover:underline">${word}</a>`
    );
  });

  return (
    <span dangerouslySetInnerHTML={{ __html: processedText }} />
  );
};

// SEO Footer Links
export const SEOFooterLinks: React.FC = () => {
  const popularSearches = [
    { label: 'Gyms Near Me', href: '/gyms' },
    { label: 'Spa Near Me', href: '/spas' },
    { label: 'Yoga Classes Near Me', href: '/yoga' },
    { label: 'Personal Trainer Near Me', href: '/trainers' },
    { label: 'Gym in Mumbai', href: '/gyms/mumbai' },
    { label: 'Spa in Delhi', href: '/spas/delhi' },
    { label: 'Yoga in Bangalore', href: '/yoga/bangalore' },
    { label: 'Trainers in Pune', href: '/trainers/pune' },
    { label: 'Gym Membership', href: '/pricing' },
    { label: 'Register Business', href: '/register-business' },
    { label: 'Become a Trainer', href: '/register-trainer' },
    { label: 'Wellness Blog', href: '/blogs' },
  ];

  return (
    <div className="border-t border-gray-700 pt-8 mt-8">
      <h4 className="font-semibold text-white mb-4">Popular Searches</h4>
      <div className="flex flex-wrap gap-2">
        {popularSearches.map((search) => (
          <Link
            key={search.href}
            to={search.href}
            className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300 hover:bg-[#005EB8] hover:text-white transition-colors"
          >
            {search.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CityLinksMatrix;
