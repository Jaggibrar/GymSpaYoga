import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface CanonicalURLProps {
  customURL?: string;
}

const CanonicalURL = ({ customURL }: CanonicalURLProps) => {
  const location = useLocation();
  
  const getCanonicalURL = () => {
    if (customURL) return customURL;
    
    const baseURL = 'https://gymspayoga.com';
    const path = location.pathname;
    
    // Ensure no trailing slash except for root
    const cleanPath = path === '/' ? path : path.replace(/\/$/, '');
    
    return `${baseURL}${cleanPath}`;
  };

  const canonicalURL = getCanonicalURL();

  return (
    <Helmet>
      <link rel="canonical" href={canonicalURL} />
    </Helmet>
  );
};

export default CanonicalURL;