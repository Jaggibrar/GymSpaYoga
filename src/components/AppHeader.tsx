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
  { label: "Spas", path: "/spas", icon: Flower2, color: "text-brand-600" },
  { label: "Yoga Studios", path: "/yoga", icon: HeartIcon, color: "text-brand-500" },
  { label: "Trainers", path: "/trainers", icon: UserCheck, color: "text-primary" },
  { label: "Therapists", path: "/therapists", icon: Stethoscope, color: "text-brand-700" },
  { label: "Chiropractors", path: "/chiropractors", icon: Activity, color: "text-charcoal-600" },
];

const AppHeader = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full overflow-hidden transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-lg shadow-md border-b border-border'
          : 'bg-background border-b border-transparent'
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-3 max-w-7xl w-full box-border">
        <div className="flex items-center justify-between gap-3 min-w-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 min-w-0 group">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
              <Heart className="h-5 w-5 text-primary-foreground fill-primary-foreground" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl font-display font-bold text-foreground truncate leading-tight tracking-tight">
                GymSpaYoga
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase hidden sm:block">
                TRAIN · RELAX · REJUVENATE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground font-medium transition-colors duration-200 px-4 py-2.5 rounded-xl hover:bg-accent text-sm">
                Find Services
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border border-border shadow-xl rounded-xl p-1.5 min-w-[220px]">
                {serviceLinks.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm">
                      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {[
              { path: '/explore', label: 'Explore' },
              { path: '/blogs', label: 'Blog' },
              { path: '/pricing', label: 'Pricing' },
            ].map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/8'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-foreground/70 hover:text-foreground font-medium text-sm rounded-xl">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register-business">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-5 rounded-xl text-sm shadow-sm">
                    List Your Business
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/user-bookings">
                  <Button variant="outline" size="sm" className="rounded-xl text-sm border-border">My Bookings</Button>
                </Link>
                <Link to="/business-dashboard">
                  <Button size="sm" className="rounded-xl text-sm bg-primary text-primary-foreground">Dashboard</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden flex-shrink-0 h-10 w-10 rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden mt-3 pb-4 border-t border-border w-full overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <div className="flex flex-col space-y-0.5 pt-3 w-full min-w-0">
                {serviceLinks.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center gap-3 text-foreground/80 hover:text-foreground font-medium px-3 py-3 rounded-xl hover:bg-accent transition-colors w-full text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                      </div>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="border-t border-border my-2" />
                
                <Link to="/explore" className="text-foreground/80 hover:text-foreground font-medium px-3 py-3 rounded-xl hover:bg-accent transition-colors text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  Explore All
                </Link>
                <Link to="/pricing" className="text-foreground/80 hover:text-foreground font-medium px-3 py-3 rounded-xl hover:bg-accent transition-colors text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  Pricing
                </Link>
                <Link to="/register-business" className="text-foreground/80 hover:text-foreground font-medium px-3 py-3 rounded-xl hover:bg-accent transition-colors text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  For Business
                </Link>
                
                {!user ? (
                  <div className="flex flex-col space-y-2 pt-3 border-t border-border w-full">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full rounded-xl text-sm">Sign In</Button>
                    </Link>
                    <Link to="/register-business" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-sm">
                        List Your Business
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-3 border-t border-border w-full">
                    <Link to="/user-bookings" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start rounded-xl text-sm">My Bookings</Button>
                    </Link>
                    <Link to="/business-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start rounded-xl text-sm">Dashboard</Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default AppHeader;
