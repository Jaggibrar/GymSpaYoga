
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const AppHeader = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: "Find Services", href: "/explore" },
    { name: "Categories", href: "/gyms" },
    { name: "For Business", href: "/register-business" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100 overflow-x-hidden w-full">
      <div className="container mx-auto px-4 py-3 max-w-full">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="h-10 w-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-white fill-white" />
            </div>
            <span className="text-xl font-semibold text-blue-500">FIT Friend</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200 whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-500 font-medium whitespace-nowrap">
                  Sign In
                </Link>
                <Link to="/register-business">
                  <Button className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-medium px-6">
                    List Your Business
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/user-bookings">
                  <Button variant="outline" size="sm">My Bookings</Button>
                </Link>
                <Link to="/business-dashboard">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
              </>
            )}
          </div>

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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 w-full overflow-x-hidden">
            <div className="flex flex-col space-y-3 pt-4 w-full">
              {/* Mobile Navigation Items */}
              <div className="flex flex-col space-y-2 w-full">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-700 hover:text-blue-500 font-medium px-2 py-2 w-full transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {!user ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100 w-full">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full text-sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register-business" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full text-sm bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600">
                      List Your Business
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100 w-full">
                  <Link to="/user-bookings" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      My Bookings
                    </Button>
                  </Link>
                  <Link to="/business-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      Dashboard
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
