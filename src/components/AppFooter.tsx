
import { Dumbbell, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, X } from "lucide-react";
import { Link } from "react-router-dom";

const AppFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">GymSpaYoga</h4>
            </div>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Your wellness journey starts here. We connect fitness enthusiasts with the best gyms, spas, and yoga centers across India.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                <X className="h-5 w-5 text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-800 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                <Linkedin className="h-5 w-5 text-white" />
              </a>
            </div>

            {/* Payment Methods */}
            <div>
              <h6 className="text-sm font-semibold text-gray-400 mb-3">We Accept</h6>
              <div className="flex space-x-3">
                <div className="bg-white rounded-lg p-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6 w-10" />
                </div>
                <div className="bg-white rounded-lg p-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 w-10" />
                </div>
                <div className="bg-white rounded-lg p-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="h-6 w-10" />
                </div>
                <div className="bg-white rounded-lg p-2">
                  <img src="https://logos-world.net/wp-content/uploads/2020/09/PayPal-Logo.png" alt="PayPal" className="h-6 w-10" />
                </div>
                <div className="bg-white rounded-lg p-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-6 w-10" />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-6 text-xl text-emerald-400">For Users</h5>
            <ul className="space-y-3 text-gray-300">
              <li><Link to="/gyms" className="hover:text-emerald-400 transition-colors duration-300">Find Gyms</Link></li>
              <li><Link to="/spas" className="hover:text-emerald-400 transition-colors duration-300">Find Spas</Link></li>
              <li><Link to="/yoga" className="hover:text-emerald-400 transition-colors duration-300">Find Yoga Centers</Link></li>
              <li><Link to="/trainers" className="hover:text-emerald-400 transition-colors duration-300">Find Trainers</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors duration-300">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-6 text-xl text-blue-400">For Business</h5>
            <ul className="space-y-3 text-gray-300">
              <li><Link to="/register-business" className="hover:text-blue-400 transition-colors duration-300">List Your Business</Link></li>
              <li><Link to="/register-trainer" className="hover:text-blue-400 transition-colors duration-300">Become a Trainer</Link></li>
              <li><Link to="/manage-bookings" className="hover:text-blue-400 transition-colors duration-300">Manage Bookings</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-400 transition-colors duration-300">Pricing Plans</Link></li>
              <li><span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Support</span></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-6 text-xl text-purple-400">Contact</h5>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-purple-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-purple-400" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-purple-400" />
                <span>info@gymspayoga.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 GymSpaYoga. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              <Link to="/blogs" className="text-gray-400 hover:text-white transition-colors">Blogs</Link>
              <Link to="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link>
              <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
