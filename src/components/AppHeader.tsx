import { Button } from "@/components/ui/button";
import { Heart, Menu, X, ChevronDown, Dumbbell, Flower2, Heart as HeartIcon, UserCheck, Activity, Stethoscope } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const serviceLinks = [
  { label: "Gyms", path: "/gyms", icon: Dumbbell, color: "text-primary" },
  { label: "Spas", path: "/spas", icon: Flower2, color: "text-warm-700" },
  { label: "Yoga Studios", path: "/yoga", icon: HeartIcon, color: "text-warm-600" },
  { label: "Trainers", path: "/trainers", icon: UserCheck, color: "text-primary" },
  { label: "Therapists", path: "/therapists", icon: Stethoscope, color: "text-warm-700" },
  { label: "Chiropractors", path: "/chiropractors", icon: Activity, color: "text-charcoal-700" },
];

const AppHeader = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full overflow-hidden border-b transition-all duration-300 ${
        scrolled
          ? 'bg-card/98 backdrop-blur-md shadow-md border-border'
          : 'bg-card/95 backdrop-blur-sm border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="mx-auto px-3 sm:px-6 py-3 max-w-7xl w-full box-border">
        <div className="flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 min-w-0 group">
            <motion.div
              className="h-9 w-9 sm:h-10 sm:w-10 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary fill-primary" />
            </motion.div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl font-display font-bold text-foreground truncate leading-tight">
                GymSpaYoga
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase hidden sm:block">
                Train · Relax · Rejuvenate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 text-muted-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-accent">
                Find Services
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border border-border shadow-xl rounded-xl p-1 min-w-[200px]">
                {serviceLinks.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg">
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/explore"
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                location.pathname === '/explore'
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-primary hover:bg-accent'
              }`}
            >
              Explore
            </Link>

            <Link
              to="/blogs"
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                location.pathname === '/blogs'
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-primary hover:bg-accent'
              }`}
            >
              Blog
            </Link>

            <Link
              to="/register-business"
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                location.pathname === '/register-business'
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-primary hover:bg-accent'
              }`}
            >
              For Business
            </Link>
          </nav>
          
          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register-business">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-5 rounded-xl">
                      List Your Business
                    </Button>
                  </motion.div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/user-bookings">
                  <Button variant="outline" size="sm" className="rounded-lg">My Bookings</Button>
                </Link>
                <Link to="/business-dashboard">
                  <Button variant="outline" size="sm" className="rounded-lg">Dashboard</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden flex-shrink-0 h-9 w-9 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden mt-3 pb-4 border-t border-border w-full overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <div className="flex flex-col space-y-1 pt-3 w-full min-w-0">
                {serviceLinks.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center gap-3 text-foreground hover:text-primary font-medium px-3 py-3 rounded-lg hover:bg-accent transition-colors w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="border-t border-border my-2" />
                
                <Link
                  to="/explore"
                  className="text-foreground hover:text-primary font-medium px-3 py-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Explore All
                </Link>
                <Link
                  to="/register-business"
                  className="text-foreground hover:text-primary font-medium px-3 py-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  For Business
                </Link>
                
                {!user ? (
                  <div className="flex flex-col space-y-2 pt-3 border-t border-border w-full">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full rounded-lg">Sign In</Button>
                    </Link>
                    <Link to="/register-business" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg">
                        List Your Business
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-3 border-t border-border w-full">
                    <Link to="/user-bookings" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start rounded-lg">My Bookings</Button>
                    </Link>
                    <Link to="/business-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start rounded-lg">Dashboard</Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default AppHeader;
