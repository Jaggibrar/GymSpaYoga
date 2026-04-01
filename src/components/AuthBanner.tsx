import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const AuthBanner: React.FC = () => {
  const { user } = useAuth();
  if (user) return null;

  return (
    <div className="bg-secondary text-secondary-foreground py-2.5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 text-center">
          <span className="text-xs sm:text-sm font-medium text-secondary-foreground/70">
            🎉 Join GymSpaYoga — Unlock exclusive features & deals
          </span>
          <Link to="/signup">
            <Button size="sm" className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90 px-3 h-7 text-xs rounded-lg">
              Sign Up Free
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthBanner;
