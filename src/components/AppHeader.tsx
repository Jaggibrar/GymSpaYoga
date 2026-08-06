import { Heart, Menu, X, ChevronDown, User, Dumbbell, Flower2, Heart as HeartIcon, UserCheck, Activity, Stethoscope } from "lucide-react";
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
  { label: "Gyms", path: "/gyms", icon: Dumbbell },
  { label: "Yoga Studios", path: "/yoga", icon: HeartIcon },
  { label: "Spas", path: "/spas", icon: Flower2 },
  { label: "Trainers", path: "/trainers", icon: UserCheck },
  { label: "Therapists", path: "/therapists", icon: Stethoscope },
  { label: "Chiropractors", path: "/chiropractors", icon: Activity },
];

const navLinks = [
  { path: "/explore", label: "Explore" },
  { path: "/gyms", label: "Gyms" },
  { path: "/yoga", label: "Yoga" },
  { path: "/spas", label: "Spa" },
  { path: "/trainers", label: "Trainers" },
  { path: "/community", label: "Community" },
  { path: "/blogs", label: "Blog" },
];

const AppHeader = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled && !isMobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [location.pathname]);

  const textCls = transparent ? "text-white" : "text-foreground";
  const subtleCls = transparent ? "text-white/75" : "text-muted-foreground";

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "border-b border-border bg-background/85 backdrop-blur-xl shadow-soft"
      }`}
    >
      <div className="container-modern">
        <div className="flex min-w-0 items-center justify-between gap-3 py-4">
          {/* Logo */}
          <Link to="/" className="group flex min-w-0 flex-shrink-0 items-center gap-2.5">
            <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl bg-gradient-emerald shadow-soft">
              <Heart className="h-5 w-5 fill-white text-white" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className={`truncate font-display text-lg font-extrabold leading-tight tracking-tight ${textCls}`}>
                GYMSPAYOGA
              </span>
              <span className={`hidden text-[9px] font-medium uppercase tracking-[0.18em] sm:block ${subtleCls}`}>
                Discover · Book · Transform
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${textCls} ${
                  transparent ? "hover:bg-white/10" : "hover:bg-secondary"
                }`}
              >
                Explore <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[230px] rounded-2xl border border-border bg-popover p-1.5 shadow-strong">
                {serviceLinks.map(item => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary">
                        <item.icon className="h-4 w-4 text-primary" />
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(1).map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-primary"
                    : `${textCls} ${transparent ? "hover:bg-white/10" : "hover:bg-secondary"}`
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden flex-shrink-0 items-center gap-2 lg:flex">
            <Link
              to="/register-business"
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                transparent
                  ? "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                  : "bg-primary text-primary-foreground shadow-emerald"
              }`}
            >
              List Your Business
            </Link>
            <Link
              to="/favorites"
              aria-label="Wishlist"
              className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${textCls} ${
                transparent ? "hover:bg-white/10" : "hover:bg-secondary"
              }`}
            >
              <Heart className="h-[18px] w-[18px]" />
            </Link>
            <Link
              to={user ? "/profile" : "/login"}
              aria-label={user ? "Your profile" : "Sign in"}
              className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${textCls} ${
                transparent ? "hover:bg-white/10" : "hover:bg-secondary"
              }`}
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-full lg:hidden ${textCls} ${
              transparent ? "bg-white/10" : "bg-secondary"
            }`}
            onClick={() => setIsMobileMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="overflow-hidden border-t border-border pb-5 lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="flex flex-col gap-0.5 pt-3">
                {serviceLinks.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary">
                      <item.icon className="h-4 w-4 text-primary" />
                    </span>
                    {item.label}
                  </Link>
                ))}
                <div className="my-2 h-px bg-border" />
                {["/community", "/explore", "/blogs", "/pricing"].map(p => (
                  <Link key={p} to={p} className="rounded-2xl px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary">
                    {p.replace("/", "").replace("blogs", "blog").replace(/^\w/, c => c.toUpperCase())}
                  </Link>
                ))}
                <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                  {!user && (
                    <Link to="/login" className="rounded-full border border-border py-3 text-center text-sm font-semibold text-foreground">
                      Sign In
                    </Link>
                  )}
                  <Link to="/register-business" className="rounded-full bg-primary py-3 text-center text-sm font-semibold text-primary-foreground">
                    List Your Business
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default AppHeader;
