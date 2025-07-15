import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ListingLayoutProps {
  children: React.ReactNode;
  backLink: string;
  backText: string;
  brandIcon: React.ReactNode;
  brandGradient: string;
}

const ListingLayout: React.FC<ListingLayoutProps> = ({
  children,
  backLink,
  backText,
  brandIcon,
  brandGradient
}) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/90 backdrop-blur-lg border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to={backLink} 
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{backText}</span>
            </Link>
            <Link to="/" className="flex items-center space-x-3">
              <div className={`h-12 w-12 bg-gradient-to-r ${brandGradient} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300`}>
                {brandIcon}
              </div>
              <h1 className={`text-3xl font-bold bg-gradient-to-r ${brandGradient} bg-clip-text text-transparent`}>
                GymSpaYoga
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default ListingLayout;