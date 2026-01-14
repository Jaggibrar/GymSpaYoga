import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const AuthBanner: React.FC = () => {
  const { user } = useAuth();

  // Don't show if user is logged in
  if (user) return null;

  return (
    <div className="bg-gradient-to-r from-primary via-primary/95 to-primary text-white py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-white/90" />
            <span className="text-sm sm:text-base font-medium">
              Join GymSpaYoga and unlock exclusive features!
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/signup">
              <Button 
                size="sm" 
                className="bg-white text-primary font-bold hover:bg-gray-100 px-4"
              >
                <User className="h-4 w-4 mr-1" />
                Sign Up Free
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="sm" 
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-4"
              >
                Login
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBanner;
