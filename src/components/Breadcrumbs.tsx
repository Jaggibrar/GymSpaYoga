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
    <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-2" aria-hidden="true" />
                )}
                
                {item.current ? (
                  <span className="text-gray-500 font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
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
  );
};

export default Breadcrumbs;