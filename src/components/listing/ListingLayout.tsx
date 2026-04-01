import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <header className="bg-card/95 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link 
              to={backLink} 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{backText}</span>
            </Link>
            <Link to="/" className="flex items-center gap-2">
              <div className={`h-9 w-9 bg-primary rounded-xl flex items-center justify-center shadow-sm`}>
                {brandIcon}
              </div>
              <span className="text-lg font-display font-bold text-foreground">GymSpaYoga</span>
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
