
import { Dumbbell, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const AppFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4 md:mb-6">
              <div className="h-10 md:h-12 w-10 md:w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="h-5 md:h-6 w-5 md:w-6 text-white" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">GymSpaYoga</h4>
            </div>
            <p className="text-gray-300 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
              Your wellness journey starts here. We connect fitness enthusiasts with the best gyms, spas, and yoga centers across India.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold mb-4 md:mb-6 text-lg md:text-xl text-emerald-400">For Users</h5>
            <ul className="space-y-2 md:space-y-3 text-gray-300">
              <li><Link to="/gyms" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Gyms</Link></li>
              <li><Link to="/spas" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Spas</Link></li>
              <li><Link to="/yoga" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Yoga Centers</Link></li>
              <li><Link to="/trainers" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Trainers</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-4 md:mb-6 text-lg md:text-xl text-blue-400">For Business</h5>
            <ul className="space-y-2 md:space-y-3 text-gray-300">
              <li><Link to="/register-business" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">List Your Business</Link></li>
              <li><Link to="/register-trainer" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Become a Trainer</Link></li>
              <li><Link to="/manage-bookings" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Manage Bookings</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Pricing Plans</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-4 md:mb-6 text-lg md:text-xl text-purple-400">Contact Info</h5>
            <div className="space-y-2 md:space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm md:text-base">Kolkata, West Bengal</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm md:text-base">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm md:text-base">info@gymspayoga.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0 text-sm md:text-base">
              © 2024 GymSpaYoga. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">About</Link>
              <Link to="/blogs" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Blogs</Link>
              <Link to="/support" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
