import { Button } from "@/components/ui/button";
import { Heart, Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AppHeader = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100 w-full overflow-hidden">
      <div className="mx-auto px-3 sm:px-4 py-3 max-w-7xl w-full box-border">
        <div className="flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 min-w-0">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-[#005EB8] rounded-lg flex items-center justify-center flex-shrink-0">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white fill-white" />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-black truncate">GymSpaYoga</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-[#0A45FF] font-medium transition-colors duration-200">
                Find Services
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to="/gyms" className="cursor-pointer">Gyms</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/spas" className="cursor-pointer">Spas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/yoga" className="cursor-pointer">Yoga Studios</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/trainers" className="cursor-pointer">Trainers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/therapists" className="cursor-pointer">Therapists</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/chiropractors" className="cursor-pointer">Chiropractors</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/register-business"
              className="text-gray-700 hover:text-[#0A45FF] font-medium transition-colors duration-200 whitespace-nowrap"
            >
              For Business
            </Link>
          </nav>
          
          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-[#005EB8] font-medium whitespace-nowrap">
                  Sign In
                </Link>
                <Link to="/register-business">
                  <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium px-6">
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
            size="icon"
            className="lg:hidden flex-shrink-0 h-9 w-9"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 w-full overflow-hidden">
            <div className="flex flex-col space-y-3 pt-4 w-full min-w-0">
              {/* Mobile Navigation Items */}
              <div className="flex flex-col space-y-2 w-full">
                <Link
                  to="/gyms"
                  className="text-gray-700 hover:text-[#0A45FF] font-medium px-2 py-2 w-full transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Gyms
                </Link>
                <Link
                  to="/spas"
                  className="text-gray-700 hover:text-[#0A45FF] font-medium px-2 py-2 w-full transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Spas
                </Link>
                <Link
                  to="/yoga"
                  className="text-gray-700 hover:text-[#0A45FF] font-medium px-2 py-2 w-full transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Yoga Studios
                </Link>
                <Link
                  to="/trainers"
                  className="text-gray-700 hover:text-[#0A45FF] font-medium px-2 py-2 w-full transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Trainers
                </Link>
                <Link
                  to="/therapists"
                  className="text-gray-700 hover:text-[#0A45FF] font-medium px-2 py-2 w-full transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Therapists
                </Link>
                <Link
                  to="/chiropractors"
                  className="text-gray-700 hover:text-[#0A45FF] font-medium px-2 py-2 w-full transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Chiropractors
                </Link>
                <Link
                  to="/register-business"
                  className="text-gray-700 hover:text-[#0A45FF] font-medium px-2 py-2 w-full transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  For Business
                </Link>
              </div>
              
              {!user ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100 w-full">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full text-sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register-business" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full text-sm bg-[#22C55E] hover:bg-[#16A34A]">
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
