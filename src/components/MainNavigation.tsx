
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Menu, X, User, LogOut, Settings, Calendar, Building, Edit } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import RealTimeNotifications from '@/components/RealTimeNotifications';
import NotificationSystem from '@/components/NotificationSystem';
import { Heart } from 'lucide-react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import ThemeToggle from '@/components/ThemeToggle';

const MainNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollDirection, scrollY } = useScrollDirection();

  const isActive = (path: string) => location.pathname === path;
  const isScrolled = scrollY > 50;
  const shouldHide = scrollDirection === 'down' && scrollY > 100;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <nav 
      className={`bg-background/95 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-border dark:bg-card/95 transition-all duration-300 ${
        shouldHide ? '-translate-y-full' : 'translate-y-0'
      } ${isScrolled ? 'shadow-strong' : 'shadow-lg'}`}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16'}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className={`bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
              isScrolled ? 'h-8 w-8' : 'h-10 w-10'
            }`}>
              <Dumbbell className={`text-white transition-all duration-300 ${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
            </div>
            <div className="flex flex-col">
              <h1 className={`font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled ? 'text-lg' : 'text-xl'
              }`}>
                GymSpaYoga
              </h1>
              {!isScrolled && <p className="text-xs text-gray-500 -mt-1">One Platform. All Wellness.</p>}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/gyms" 
              className={`text-foreground hover:text-primary font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                isActive('/gyms') ? 'text-primary after:w-full' : ''
              }`}
            >
              Gyms
            </Link>
            <Link 
              to="/spas" 
              className={`text-foreground hover:text-primary font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                isActive('/spas') ? 'text-primary after:w-full' : ''
              }`}
            >
              Spas
            </Link>
            <Link 
              to="/yoga" 
              className={`text-foreground hover:text-primary font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                isActive('/yoga') ? 'text-primary after:w-full' : ''
              }`}
            >
              Yoga
            </Link>
            <Link 
              to="/trainers" 
              className={`text-foreground hover:text-primary font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                isActive('/trainers') ? 'text-primary after:w-full' : ''
              }`}
            >
              Trainers
            </Link>
            <Link 
              to="/explore" 
              className={`text-foreground hover:text-primary font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                isActive('/explore') ? 'text-primary after:w-full' : ''
              }`}
            >
              Explore
            </Link>
          </div>

          {/* Right side - Auth & Notifications */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {user ? (
              <>
                {/* Favorites Link */}
                <Link to="/favorites">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>
                
                {/* Notification System */}
                <NotificationSystem />

                {/* User Menu */}
                <div className="relative group">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">Account</span>
                  </Button>
                  
                   {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-lg shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <Link 
                        to="/profile" 
                        className="flex items-center space-x-2 px-4 py-2 text-foreground hover:bg-muted transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      {isAdmin && (
                        <Link 
                          to="/admin-dashboard" 
                          className="flex items-center space-x-2 px-4 py-2 text-foreground hover:bg-muted transition-colors"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                       <Link 
                         to="/my-blogs" 
                         className="flex items-center space-x-2 px-4 py-2 text-foreground hover:bg-muted transition-colors"
                       >
                         <Edit className="h-4 w-4" />
                         <span>My Blogs</span>
                       </Link>
                       <Link 
                         to="/business-dashboard" 
                         className="flex items-center space-x-2 px-4 py-2 text-foreground hover:bg-muted transition-colors"
                       >
                         <Building className="h-4 w-4" />
                         <span>Business Dashboard</span>
                       </Link>
                      <hr className="my-2 border-border" />
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 px-4 py-2 text-destructive hover:bg-destructive/10 w-full text-left transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/gyms" 
                className="text-foreground hover:text-primary font-medium px-2 py-1 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gyms
              </Link>
              <Link 
                to="/spas" 
                className="text-foreground hover:text-primary font-medium px-2 py-1 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Spas
              </Link>
              <Link 
                to="/yoga" 
                className="text-foreground hover:text-primary font-medium px-2 py-1 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Yoga
              </Link>
              <Link 
                to="/trainers" 
                className="text-foreground hover:text-primary font-medium px-2 py-1 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Trainers
              </Link>
              <Link 
                to="/explore" 
                className="text-foreground hover:text-primary font-medium px-2 py-1 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              {user && (
                <>
                  <hr className="my-2 border-border" />
                  <Link 
                    to="/profile" 
                    className="text-foreground hover:text-primary font-medium px-2 py-1 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                   <Link 
                     to="/my-blogs" 
                     className="text-foreground hover:text-primary font-medium px-2 py-1 transition-colors"
                     onClick={() => setIsMenuOpen(false)}
                   >
                     My Blogs
                   </Link>
                   <Link 
                     to="/business-dashboard" 
                     className="text-foreground hover:text-primary font-medium px-2 py-1 transition-colors"
                     onClick={() => setIsMenuOpen(false)}
                   >
                     Business Dashboard
                   </Link>
                  <button 
                    onClick={handleSignOut}
                    className="text-destructive hover:opacity-80 font-medium px-2 py-1 text-left transition-opacity"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;
