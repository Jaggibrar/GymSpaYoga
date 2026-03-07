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
    <header className="bg-card/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-border w-full overflow-hidden">
      <div className="mx-auto px-3 sm:px-4 py-3 max-w-7xl w-full box-border">
        <div className="flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 min-w-0">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary fill-primary" />
            </div>
            <span className="text-lg sm:text-xl font-display font-bold text-foreground truncate">GymSpaYoga</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-primary font-medium transition-colors duration-200">
                Find Services
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border border-border shadow-lg">
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
              className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 whitespace-nowrap"
            >
              For Business
            </Link>
          </nav>
          
          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            {!user ? (
              <>
                <Link to="/login" className="text-muted-foreground hover:text-primary font-medium whitespace-nowrap">
                  Sign In
                </Link>
                <Link to="/register-business">
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-6">
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
          <div className="lg:hidden mt-4 pb-4 border-t border-border w-full overflow-hidden">
            <div className="flex flex-col space-y-3 pt-4 w-full min-w-0">
              <div className="flex flex-col space-y-2 w-full">
                {["Gyms", "Spas", "Yoga Studios", "Trainers", "Therapists", "Chiropractors"].map((item) => {
                  const path = item === "Yoga Studios" ? "/yoga" : `/${item.toLowerCase()}`;
                  return (
                    <Link
                      key={item}
                      to={path}
                      className="text-foreground hover:text-primary font-medium px-2 py-2 w-full transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  );
                })}
                <Link
                  to="/register-business"
                  className="text-foreground hover:text-primary font-medium px-2 py-2 w-full transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  For Business
                </Link>
              </div>
              
              {!user ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-border w-full">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full text-sm">Sign In</Button>
                  </Link>
                  <Link to="/register-business" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full text-sm bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      List Your Business
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-border w-full">
                  <Link to="/user-bookings" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start text-sm">My Bookings</Button>
                  </Link>
                  <Link to="/business-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start text-sm">Dashboard</Button>
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
