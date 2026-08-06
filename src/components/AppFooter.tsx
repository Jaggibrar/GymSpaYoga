import { Heart, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const userLinks = [
  { to: "/gyms", label: "Find Gyms" },
  { to: "/spas", label: "Find Spas" },
  { to: "/yoga", label: "Yoga Studios" },
  { to: "/trainers", label: "Personal Trainers" },
  { to: "/therapists", label: "Therapists" },
  { to: "/chiropractors", label: "Chiropractors" },
];

const businessLinks = [
  { to: "/register-business", label: "List Your Business" },
  { to: "/register-trainer", label: "Become a Trainer" },
  { to: "/business-dashboard", label: "Manage Bookings" },
  { to: "/pricing", label: "Pricing Plans" },
  { to: "/support", label: "Support" },
  { to: "/about", label: "About Us" },
];

const cities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Goa"];

const socials = [
  { href: "https://facebook.com/gymspayoga", icon: Facebook, label: "Facebook" },
  { href: "https://instagram.com/gymspayoga", icon: Instagram, label: "Instagram" },
  { href: "https://twitter.com/gymspayoga", icon: Twitter, label: "Twitter" },
  { href: "https://linkedin.com/company/gymspayoga", icon: Linkedin, label: "LinkedIn" },
];

const AppFooter = () => (
  <footer className="w-full bg-[hsl(172_65%_8%)] text-white">
    <div className="container-modern py-16 lg:py-20">
      {/* Newsletter */}
      <div className="mb-14 grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-2 lg:items-end">
        <div>
          <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Wellness, delivered<br className="hidden sm:block" /> to your inbox.
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/60">
            Curated studios, new collections and member-only offers. One email a month, no noise.
          </p>
        </div>
        <form className="flex w-full max-w-md gap-2 lg:ml-auto" onSubmit={e => e.preventDefault()}>
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@email.com"
            className="h-[52px] min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-mint/60"
          />
          <button
            type="submit"
            className="inline-flex h-[52px] items-center gap-1.5 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
          >
            Subscribe <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link to="/" className="mb-5 flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-emerald">
              <Heart className="h-5 w-5 fill-white text-white" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">GymSpaYoga</span>
          </Link>
          <p className="mb-5 max-w-sm text-sm leading-relaxed text-white/55">
            India's premium wellness marketplace. Discover verified gyms, yoga studios, spas and certified experts near you.
          </p>

          <div className="mb-7 space-y-2.5 text-sm text-white/55">
            <p className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-mint" /> +91 7596958097</p>
            <p className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-mint" /> gymspayoga@gmail.com</p>
            <p className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-mint" /> Kolkata, India</p>
          </div>

          <div className="flex gap-2">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:border-mint/40 hover:bg-white/10"
              >
                <s.icon className="h-4 w-4 text-white/70" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Discover</h3>
            <ul className="space-y-2.5 text-sm text-white/65">
              {userLinks.map(l => (
                <li key={l.to}><Link to={l.to} className="transition hover:text-mint">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">For Business</h3>
            <ul className="space-y-2.5 text-sm text-white/65">
              {businessLinks.map(l => (
                <li key={l.to}><Link to={l.to} className="transition hover:text-mint">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Popular Cities</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-white/65 sm:grid-cols-1">
              {cities.map(c => (
                <li key={c}>
                  <Link to={`/city/${c.toLowerCase()}`} className="transition hover:text-mint">{c}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="container-modern flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
        <p className="text-xs text-white/40">© {new Date().getFullYear()} GymSpaYoga. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-white/40">
          <Link to="/privacy-policy" className="hover:text-mint">Privacy</Link>
          <Link to="/terms-of-service" className="hover:text-mint">Terms</Link>
          <Link to="/blogs" className="hover:text-mint">Blog</Link>
          <Link to="/support" className="hover:text-mint">Support</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default AppFooter;
