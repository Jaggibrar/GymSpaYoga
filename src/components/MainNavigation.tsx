
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, Settings, Building, Edit, ChevronDown, Heart, UserCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useHasTrainerProfile } from '@/hooks/useHasTrainerProfile';
import NotificationSystem from '@/components/NotificationSystem';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { Badge } from '@/components/ui/badge';

const MainNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const { hasProfile: hasTrainerProfile, status: trainerStatus } = useHasTrainerProfile();
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
      className={`bg-white sticky top-0 z-50 border-b border-border transition-transform duration-300 ${
        shouldHide ? '-translate-y-full' : 'translate-y-0'
      } shadow-sm`}
    >
      <div className="container mx-auto px-3 sm:px-4 max-w-full">
        <div className={`flex items-center justify-between transition-all duration-200 min-w-0 ${isScrolled ? 'h-14' : 'h-16'}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
            <div className={`bg-primary rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
              isScrolled ? 'h-8 w-8' : 'h-8 w-8 sm:h-10 sm:w-10'
            }`}>
              <Heart className={`text-white transition-all duration-200 ${isScrolled ? 'h-5 w-5' : 'h-5 w-5 sm:h-6 sm:w-6'}`} />
            </div>
            <h1 className={`font-bold text-foreground transition-all duration-200 truncate ${
              isScrolled ? 'text-lg' : 'text-lg sm:text-xl'
            }`}>
              GymSpaYoga
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Find Services Dropdown */}
            <div className="relative group">
              <button data-tour="find-services" className="text-foreground hover:text-primary font-medium transition-colors flex items-center space-x-1">
                <span>Find Services</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link 
                    to="/gyms" 
                    className="block px-4 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    Gyms
                  </Link>
                  <Link 
                    to="/spas" 
                    className="block px-4 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    Spas
                  </Link>
                  <Link 
                    to="/yoga" 
                    className="block px-4 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    Yoga Studios
                  </Link>
                  <Link 
                    to="/trainers" 
                    className="block px-4 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    Trainers
                  </Link>
                  <Link 
                    to="/therapists" 
                    className="block px-4 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    Therapists
                  </Link>
                </div>
              </div>
            </div>
            
            <Link 
              to="/register-business" 
              data-tour="for-business"
              className={`text-foreground hover:text-primary font-medium transition-colors ${
                isActive('/register-business') ? 'text-primary' : ''
              }`}
            >
              For Business
            </Link>
          </div>

          {/* Right side - Auth & Notifications */}
          <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
            {user ? (
              <>
                {/* Favorites Link - hidden on small mobile */}
                <Link to="/favorites" className="hidden sm:inline-flex">
                  <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>
                
                {/* Notification System */}
                <div className="hidden sm:block">
                  <NotificationSystem />
                </div>

                {/* User Menu - Desktop only */}
                <div className="relative group hidden md:block">
                  <Button variant="ghost" className="flex items-center space-x-2 text-foreground">
                    <User className="h-5 w-5" />
                    <span className="hidden lg:inline">Account</span>
                  </Button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
                      {hasTrainerProfile && (
                        <Link 
                          to="/my-trainer-profile" 
                          className="flex items-center justify-between px-4 py-2 text-foreground hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <UserCheck className="h-4 w-4" />
                            <span>My Trainer Profile</span>
                          </div>
                          {trainerStatus === 'pending' && (
                            <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                              Pending
                            </Badge>
                          )}
                        </Link>
                      )}
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
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-foreground hover:text-primary font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register-business">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
                    List Your Business
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground flex-shrink-0 h-9 w-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              <div className="text-foreground font-semibold px-2 py-1 text-sm">
                Find Services
              </div>
              <Link 
                to="/gyms" 
                className="text-foreground hover:text-primary font-medium px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gyms
              </Link>
              <Link 
                to="/spas" 
                className="text-foreground hover:text-primary font-medium px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Spas
              </Link>
              <Link 
                to="/yoga" 
                className="text-foreground hover:text-primary font-medium px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Yoga Studios
              </Link>
              <Link 
                to="/trainers" 
                className="text-foreground hover:text-primary font-medium px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Trainers
              </Link>
              <Link 
                to="/therapists" 
                className="text-foreground hover:text-primary font-medium px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Therapists
              </Link>
              <hr className="my-2 border-border" />
              <Link 
                to="/register-business" 
                className="text-foreground hover:text-primary font-medium px-2 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                For Business
              </Link>
              {user ? (
                <>
                  <hr className="my-2 border-border" />
                  <Link 
                    to="/favorites" 
                    className="text-foreground hover:text-primary font-medium px-2 py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Favorites
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-foreground hover:text-primary font-medium px-2 py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/my-blogs" 
                    className="text-foreground hover:text-primary font-medium px-2 py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Blogs
                  </Link>
                  {hasTrainerProfile && (
                    <Link 
                      to="/my-trainer-profile" 
                      className="flex items-center justify-between text-foreground hover:text-primary font-medium px-2 py-2 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>My Trainer Profile</span>
                      {trainerStatus === 'pending' && (
                        <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                          Pending
                        </Badge>
                      )}
                    </Link>
                  )}
                  <Link 
                    to="/business-dashboard" 
                    className="text-foreground hover:text-primary font-medium px-2 py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Business Dashboard
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="text-destructive hover:opacity-80 font-medium px-2 py-2 text-left transition-opacity"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <hr className="my-2 border-border" />
                  <Link 
                    to="/login" 
                    className="text-foreground hover:text-primary font-medium px-2 py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register-business" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                      List Your Business
                    </Button>
                  </Link>
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
