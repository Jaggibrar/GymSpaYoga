
import { Button } from "@/components/ui/button";
import { Dumbbell, LogOut, Calendar, Building, Menu, X, MapPin, Navigation, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useState } from "react";
import { toast } from "sonner";

const AppHeader = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { position, getCurrentPosition, loading: geoLoading } = useGeolocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleGetLocation = () => {
    getCurrentPosition();
    if (position) {
      toast.success("Location access granted successfully!");
    }
  };

  const navItems = [
    { name: "Gyms", href: "/gyms" },
    { name: "Spas", href: "/spas" },
    { name: "Yoga", href: "/yoga" },
    { name: "Trainers", href: "/trainers" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" id="navigation">
            <div className="h-10 w-10 bg-gradient-to-br from-primary via-accent to-secondary rounded-xl flex items-center justify-center shadow-md">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FIT Friend
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/explore"
              className="text-foreground hover:text-primary font-medium transition-colors duration-200"
            >
              Find Services
            </Link>
            <Link
              to="/explore"
              className="text-foreground hover:text-primary font-medium transition-colors duration-200"
            >
              Categories
            </Link>
            <Link
              to="/business-landing"
              className="text-foreground hover:text-primary font-medium transition-colors duration-200"
            >
              For Business
            </Link>
          </nav>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Location Access Button */}
            <Button
              onClick={handleGetLocation}
              disabled={geoLoading}
              variant="outline"
              size="sm"
              className="hidden md:flex items-center text-xs"
              title={position ? "Location Active" : "Enable Location Access"}
            >
              {geoLoading ? (
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600 mr-1"></div>
              ) : position ? (
                <Navigation className="h-3 w-3 mr-1 text-green-600" />
              ) : (
                <MapPin className="h-3 w-3 mr-1" />
              )}
              <span className="hidden lg:inline">
                {position ? "Located" : "Location"}
              </span>
            </Button>
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <Link to="/user-bookings">
                    <Button variant="outline" className="text-xs md:text-sm">
                      <Calendar className="h-3 w-3 mr-1" />
                      My Bookings
                    </Button>
                  </Link>
                  <Link to="/business-dashboard">
                    <Button variant="outline" className="text-xs md:text-sm">
                      <Building className="h-3 w-3 mr-1" />
                      Business
                    </Button>
                  </Link>
                  <Link to="/trainer-dashboard">
                    <Button variant="outline" className="text-xs md:text-sm">
                      <Users className="h-3 w-3 mr-1" />
                      Trainer
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    className="text-xs md:text-sm text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <LogOut className="h-3 w-3 mr-1" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" className="text-sm font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register-business">
                  <Button variant="hero" className="text-sm">
                    List Your Business
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3 pt-4">
              {/* Mobile Navigation Items - Scrollable */}
              <div className="flex overflow-x-auto space-x-4 pb-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-700 hover:text-emerald-600 font-medium whitespace-nowrap px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Location Button */}
              <Button
                onClick={handleGetLocation}
                disabled={geoLoading}
                variant="outline"
                className="w-full justify-start text-sm"
                title={position ? "Location Active" : "Enable Location Access"}
              >
                {geoLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                ) : position ? (
                  <Navigation className="h-4 w-4 mr-2 text-green-600" />
                ) : (
                  <MapPin className="h-4 w-4 mr-2" />
                )}
                {position ? "Location Active" : "Enable Location Access"}
              </Button>
              
              {user ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                  <Link to="/user-bookings" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      My Bookings
                    </Button>
                  </Link>
                  <Link to="/business-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Building className="h-4 w-4 mr-2" />
                      Business Dashboard
                    </Button>
                  </Link>
                  <Link to="/trainer-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Users className="h-4 w-4 mr-2" />
                      Trainer Dashboard
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    className="w-full justify-start text-sm text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full text-sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full text-sm bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
