import { Heart, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AppFooter = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground w-full">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary-foreground fill-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-white">GymSpaYoga</span>
            </Link>
            <p className="text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
              Train · Relax · Rejuvenate
            </p>
            <p className="text-secondary-foreground/60 text-sm leading-relaxed mb-6 max-w-sm">
              Your global wellness platform. Discover and connect with premium gyms, spas, yoga studios, and certified trainers in 200+ cities worldwide.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-2 mb-6">
              {[
                { href: "https://facebook.com/gymspayoga", icon: Facebook, label: "Facebook" },
                { href: "https://instagram.com/gymspayoga", icon: Instagram, label: "Instagram" },
                { href: "https://twitter.com/gymspayoga", icon: Twitter, label: "Twitter" },
                { href: "https://linkedin.com/company/gymspayoga", icon: Linkedin, label: "LinkedIn" },
              ].map(social => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-secondary-foreground/10 hover:bg-primary flex items-center justify-center transition-all duration-200 group" aria-label={social.label}>
                  <social.icon className="h-4 w-4 text-secondary-foreground/60 group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div>
              <p className="text-xs font-semibold text-secondary-foreground/40 mb-2 uppercase tracking-wider">We Accept</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg", alt: "Visa" },
                  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg", alt: "Mastercard" },
                  { src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg", alt: "Amex" },
                  { src: "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg", alt: "UPI" },
                ].map(pm => (
                  <div key={pm.alt} className="bg-white rounded-md p-1.5">
                    <img src={pm.src} alt={pm.alt} className="h-5 w-8 object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h5 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider">For Users</h5>
              <ul className="space-y-2.5 text-secondary-foreground/60 text-sm">
                {[
                  { to: "/gyms", label: "Find Gyms" },
                  { to: "/spas", label: "Find Spas" },
                  { to: "/yoga", label: "Find Yoga Studios" },
                  { to: "/trainers", label: "Find Trainers" },
                  { to: "/therapists", label: "Find Therapists" },
                  { to: "/chiropractors", label: "Chiropractors" },
                  { to: "/about", label: "About Us" },
                ].map(link => (
                  <li key={link.to}><Link to={link.to} className="hover:text-primary transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider">For Business</h5>
              <ul className="space-y-2.5 text-secondary-foreground/60 text-sm">
                {[
                  { to: "/register-business", label: "List Your Business" },
                  { to: "/register-trainer", label: "Become a Trainer" },
                  { to: "/business-dashboard", label: "Manage Bookings" },
                  { to: "/pricing", label: "Pricing Plans" },
                  { to: "/support", label: "Support" },
                ].map(link => (
                  <li key={link.to}><Link to={link.to} className="hover:text-primary transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <h5 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider">Contact</h5>
              <div className="space-y-3 text-secondary-foreground/60 text-sm">
                <div className="flex items-start gap-2.5">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>+91 7596958097</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Kolkata, India</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="break-all">gymspayoga@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-secondary-foreground/40 text-xs">
              © 2025 GymSpaYoga. All rights reserved.
            </p>
            <div className="flex gap-5 text-xs text-secondary-foreground/40">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="/blogs" className="hover:text-primary transition-colors">Blog</Link>
              <Link to="/support" className="hover:text-primary transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
