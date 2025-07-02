
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Menu, X, User, LogOut, Settings, Calendar, Building } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import RealTimeNotifications from '@/components/RealTimeNotifications';

const MainNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

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
    <nav className="bg-white/95 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
              <p className="text-xs text-gray-500 -mt-1">One Platform. All Wellness.</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/gyms" 
              className={`text-gray-700 hover:text-emerald-600 font-medium transition-colors ${
                isActive('/gyms') ? 'text-emerald-600' : ''
              }`}
            >
              Gyms
            </Link>
            <Link 
              to="/spas" 
              className={`text-gray-700 hover:text-emerald-600 font-medium transition-colors ${
                isActive('/spas') ? 'text-emerald-600' : ''
              }`}
            >
              Spas
            </Link>
            <Link 
              to="/yoga" 
              className={`text-gray-700 hover:text-emerald-600 font-medium transition-colors ${
                isActive('/yoga') ? 'text-emerald-600' : ''
              }`}
            >
              Yoga
            </Link>
            <Link 
              to="/trainers" 
              className={`text-gray-700 hover:text-emerald-600 font-medium transition-colors ${
                isActive('/trainers') ? 'text-emerald-600' : ''
              }`}
            >
              Trainers
            </Link>
            <Link 
              to="/explore" 
              className={`text-gray-700 hover:text-emerald-600 font-medium transition-colors ${
                isActive('/explore') ? 'text-emerald-600' : ''
              }`}
            >
              Explore
            </Link>
          </div>

          {/* Right side - Auth & Notifications */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Real-time Notifications */}
                <RealTimeNotifications />

                {/* User Menu */}
                <div className="relative group">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">Account</span>
                  </Button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <Link 
                        to="/profile" 
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <Link 
                        to="/admin-dashboard" 
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                      <Link 
                        to="/business-dashboard" 
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <Building className="h-4 w-4" />
                        <span>Business Dashboard</span>
                      </Link>
                      <hr className="my-2" />
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
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
                  <Button variant="ghost" className="text-gray-700 hover:text-emerald-600">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
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
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/gyms" 
                className="text-gray-700 hover:text-emerald-600 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Gyms
              </Link>
              <Link 
                to="/spas" 
                className="text-gray-700 hover:text-emerald-600 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Spas
              </Link>
              <Link 
                to="/yoga" 
                className="text-gray-700 hover:text-emerald-600 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Yoga
              </Link>
              <Link 
                to="/trainers" 
                className="text-gray-700 hover:text-emerald-600 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Trainers
              </Link>
              <Link 
                to="/explore" 
                className="text-gray-700 hover:text-emerald-600 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              {user && (
                <>
                  <hr className="my-2" />
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-emerald-600 font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/business-dashboard" 
                    className="text-gray-700 hover:text-emerald-600 font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Business Dashboard
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="text-red-600 hover:text-red-700 font-medium px-2 py-1 text-left"
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
