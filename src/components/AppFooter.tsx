
import { Heart, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, X } from "lucide-react";
import { Link } from "react-router-dom";

const AppFooter = () => {
  return (
    <footer className="bg-charcoal-800 text-warm-100 py-8 sm:py-12 w-full border-t border-charcoal-700">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 mb-6 lg:mb-0 text-left">
            <Link to="/" className="flex items-center space-x-3 mb-3 lg:mb-4 justify-start">
              <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-lg bg-charcoal-700 flex items-center justify-center">
                <Heart className="h-5 w-5 lg:h-6 lg:w-6 text-brand-400 fill-brand-400" />
              </div>
              <span className="text-lg lg:text-2xl font-display font-bold text-warm-50">GymSpaYoga</span>
            </Link>
            <p className="text-base lg:text-lg font-display font-semibold text-brand-400 mb-4 lg:mb-6 italic">
              Train. Relax. Rejuvenate.
            </p>
            <p className="text-warm-300 text-sm lg:text-base mb-4 lg:mb-6 leading-relaxed text-left">
              Your wellness journey starts here. We connect fitness enthusiasts with the best gyms, spas, and yoga centers across India. Transform your health and discover premium wellness experiences tailored for you.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3 mb-4 lg:mb-6 justify-start">
              <a href="https://facebook.com/gymspayoga" target="_blank" rel="noopener noreferrer" className="bg-charcoal-600 hover:bg-brand-400 hover:text-charcoal-900 p-2 lg:p-3 rounded-full transition-all duration-300" aria-label="Follow us on Facebook">
                <Facebook className="h-4 w-4 lg:h-5 lg:w-5" />
              </a>
              <a href="https://instagram.com/gymspayoga" target="_blank" rel="noopener noreferrer" className="bg-charcoal-600 hover:bg-brand-400 hover:text-charcoal-900 p-2 lg:p-3 rounded-full transition-all duration-300" aria-label="Follow us on Instagram">
                <Instagram className="h-4 w-4 lg:h-5 lg:w-5" />
              </a>
              <a href="https://twitter.com/gymspayoga" target="_blank" rel="noopener noreferrer" className="bg-charcoal-600 hover:bg-brand-400 hover:text-charcoal-900 p-2 lg:p-3 rounded-full transition-all duration-300" aria-label="Follow us on Twitter">
                <X className="h-4 w-4 lg:h-5 lg:w-5" />
              </a>
              <a href="https://linkedin.com/company/gymspayoga" target="_blank" rel="noopener noreferrer" className="bg-charcoal-600 hover:bg-brand-400 hover:text-charcoal-900 p-2 lg:p-3 rounded-full transition-all duration-300" aria-label="Follow us on LinkedIn">
                <Linkedin className="h-4 w-4 lg:h-5 lg:w-5" />
              </a>
            </div>

            {/* Payment Methods */}
            <div className="text-left">
              <p className="text-xs lg:text-sm font-semibold text-warm-500 mb-2 lg:mb-3">We Accept</p>
              <div className="flex space-x-2 lg:space-x-3 justify-start flex-wrap">
                <div className="bg-white rounded-lg p-1 lg:p-2 mb-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-4 w-6 lg:h-6 lg:w-10" />
                </div>
                <div className="bg-white rounded-lg p-1 lg:p-2 mb-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 w-6 lg:h-6 lg:w-10" />
                </div>
                <div className="bg-white rounded-lg p-1 lg:p-2 mb-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="h-4 w-6 lg:h-6 lg:w-10" />
                </div>
                <div className="bg-white rounded-lg p-1 lg:p-2 mb-2">
                  <img src="https://logos-world.net/wp-content/uploads/2020/09/PayPal-Logo.png" alt="PayPal" className="h-4 w-6 lg:h-6 lg:w-10" />
                </div>
                <div className="bg-white rounded-lg p-1 lg:p-2 mb-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4 w-6 lg:h-6 lg:w-10" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Sections */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-0 lg:col-span-3">
            <div className="text-left">
              <h5 className="font-display font-bold mb-3 lg:mb-6 text-base lg:text-xl text-brand-400">For Users</h5>
              <ul className="space-y-2 lg:space-y-3 text-warm-300 text-sm lg:text-base">
                <li><Link to="/gyms" className="hover:text-brand-400 transition-colors duration-300">Find Gyms</Link></li>
                <li><Link to="/spas" className="hover:text-brand-400 transition-colors duration-300">Find Spas</Link></li>
                <li><Link to="/yoga" className="hover:text-brand-400 transition-colors duration-300">Find Yoga Centers</Link></li>
                <li><Link to="/trainers" className="hover:text-brand-400 transition-colors duration-300">Find Trainers</Link></li>
                <li><Link to="/therapists" className="hover:text-brand-400 transition-colors duration-300">Find Therapists</Link></li>
                <li><Link to="/chiropractors" className="hover:text-brand-400 transition-colors duration-300">Find Chiropractors</Link></li>
                <li><Link to="/about" className="hover:text-brand-400 transition-colors duration-300">About Us</Link></li>
              </ul>
            </div>
            
            <div className="text-left">
              <h5 className="font-display font-bold mb-3 lg:mb-6 text-base lg:text-xl text-brand-400">For Business</h5>
              <ul className="space-y-2 lg:space-y-3 text-warm-300 text-sm lg:text-base">
                <li><Link to="/register-business" className="hover:text-brand-400 transition-colors duration-300">List Your Business</Link></li>
                <li><Link to="/register-trainer" className="hover:text-brand-400 transition-colors duration-300">Become a Trainer</Link></li>
                <li><Link to="/business-dashboard" className="hover:text-brand-400 transition-colors duration-300">Manage Bookings</Link></li>
                <li><Link to="/pricing" className="hover:text-brand-400 transition-colors duration-300">Pricing Plans</Link></li>
                <li><Link to="/support" className="hover:text-brand-400 transition-colors duration-300">Support</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 lg:col-span-1 text-left">
              <h5 className="font-display font-bold mb-3 lg:mb-6 text-base lg:text-xl text-brand-400">Contact</h5>
              <div className="space-y-2 lg:space-y-3 text-warm-300 text-sm lg:text-base">
                <div className="flex items-start justify-start">
                  <Phone className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 text-brand-400 flex-shrink-0 mt-0.5" />
                  <span>+91 7596958097</span>
                </div>
                <div className="flex items-start justify-start">
                  <MapPin className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 text-brand-400 flex-shrink-0 mt-0.5" />
                  <span>Kolkata, India</span>
                </div>
                <div className="flex items-start justify-start">
                  <Mail className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 text-brand-400 flex-shrink-0 mt-0.5" />
                  <span className="break-all">gymspayoga@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-charcoal-600 mt-8 lg:mt-12 pt-6 lg:pt-8 w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-left">
            <p className="text-warm-500 mb-4 md:mb-0 text-sm lg:text-base">
              © 2025 GymSpaYoga. All rights reserved. Connecting World with premium wellness experiences❤️.
            </p>
            <div className="flex flex-wrap justify-start md:justify-end space-x-4 lg:space-x-6 text-sm lg:text-base">
              <Link to="/privacy-policy" className="text-warm-500 hover:text-brand-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-warm-500 hover:text-brand-400 transition-colors">Terms of Service</Link>
              <Link to="/blogs" className="text-warm-500 hover:text-brand-400 transition-colors">Blogs</Link>
              <Link to="/support" className="text-warm-500 hover:text-brand-400 transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
