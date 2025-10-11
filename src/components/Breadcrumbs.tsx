import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

const Breadcrumbs = () => {
  const location = useLocation();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    // Map of path segments to user-friendly labels
    const segmentLabels: Record<string, string> = {
      'gyms': 'Gyms',
      'spas': 'Spas',
      'yoga': 'Yoga Studios',
      'trainers': 'Personal Trainers',
      'explore': 'Explore',
      'profile': 'Profile',
      'bookings': 'My Bookings',
      'dashboard': 'Dashboard',
      'business-dashboard': 'Business Dashboard',
      'trainer-dashboard': 'Trainer Dashboard',
      'admin': 'Admin',
      'pricing': 'Pricing',
      'about': 'About',
      'support': 'Support',
      'blogs': 'Blogs',
      'create-listing': 'Create Listing',
      'edit-listing': 'Edit Listing'
    };

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      breadcrumbs.push({
        label: segmentLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: currentPath,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (location.pathname === '/' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <>
      {/* Schema.org markup for breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: `${window.location.origin}${item.href}`
          }))
        })}
      </script>
      
      <nav className="bg-background/80 backdrop-blur-sm border-b border-border" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-3">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((item, index) => (
                <li key={item.href} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground mx-1.5" aria-hidden="true" />
                  )}
                  
                  {item.current ? (
                    <span className="text-foreground font-semibold" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-primary hover:text-primary/80 transition-all duration-200 flex items-center hover:underline underline-offset-2"
                    >
                      {index === 0 && <Home className="h-4 w-4 mr-1" />}
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;