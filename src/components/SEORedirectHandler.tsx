import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Handle common URL redirects and canonicalization
const SEORedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    const search = location.search;
    
    // Handle trailing slashes - remove them for consistency
    if (path.endsWith('/') && path !== '/') {
      navigate(path.slice(0, -1) + search, { replace: true });
      return;
    }

    // Handle duplicate blog routes
    if (path.startsWith('/blog/') && !path.startsWith('/blogs/')) {
      const newPath = path.replace('/blog/', '/blogs/');
      navigate(newPath + search, { replace: true });
      return;
    }

    // Handle old URLs that might exist
    const redirectMap: Record<string, string> = {
      '/fitness': '/gyms',
      '/wellness': '/spas',
      '/meditation': '/yoga',
      '/trainers-list': '/trainers',
      '/gym-list': '/gyms',
      '/spa-list': '/spas',
      '/yoga-list': '/yoga',
      '/register': '/signup',
      '/sign-up': '/signup',
      '/sign-in': '/login',
      '/log-in': '/login',
      '/dashboard': '/profile',
      '/account': '/profile',
      '/settings': '/profile',
      '/my-profile': '/profile',
      '/bookings': '/user-bookings',
      '/my-bookings': '/user-bookings',
      '/business': '/business-dashboard',
      '/business-profile': '/business-dashboard',
      '/trainer-profile': '/trainer-dashboard',
      '/admin': '/admin-dashboard',
    };

    // Check for redirects
    const redirectTo = redirectMap[path];
    if (redirectTo) {
      navigate(redirectTo + search, { replace: true });
      return;
    }

    // Handle case sensitivity - redirect to lowercase
    if (path !== path.toLowerCase()) {
      navigate(path.toLowerCase() + search, { replace: true });
      return;
    }

    // Remove tracking parameters for cleaner URLs
    const urlParams = new URLSearchParams(search);
    const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid', 'ref', 'source'];
    let hasTrackingParams = false;

    trackingParams.forEach(param => {
      if (urlParams.has(param)) {
        urlParams.delete(param);
        hasTrackingParams = true;
      }
    });

    if (hasTrackingParams) {
      const cleanSearch = urlParams.toString();
      navigate(path + (cleanSearch ? '?' + cleanSearch : ''), { replace: true });
      return;
    }

  }, [location, navigate]);

  return null;
};

export default SEORedirectHandler;