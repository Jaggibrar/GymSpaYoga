import { Dumbbell, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, X } from "lucide-react";
import { Link } from "react-router-dom";

const AppFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-[#101413] via-black to-[#101413] border-t border-[#3ECF8E22] text-white py-10 sm:py-14 w-full shadow-[0_0_48px_#3ECF8E16]">
      <div className="w-full px-3 sm:px-4 md:px-8 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 pb-8 border-b border-[#262626]">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 bg-gradient-to-r from-[#3ECF8E] to-[#106EBE] rounded-xl flex items-center justify-center">
                <span className="sr-only">GymSpaYoga</span>
              </div>
              <h4 className="text-2xl font-black bg-gradient-to-r from-[#3ECF8E] to-[#106EBE] bg-clip-text text-transparent">GymSpaYoga</h4>
            </div>
            <p className="text-gray-300 max-w-md mb-6">
              Your wellness journey starts here. Discover top gyms, spas and yoga centers for a better you.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-0 lg:col-span-3">
            <div className="text-left">
              <h5 className="font-bold mb-3 lg:mb-6 text-base lg:text-xl text-emerald-400">For Users</h5>
              <ul className="space-y-2 lg:space-y-3 text-gray-300 text-sm lg:text-base">
                <li><Link to="/gyms" className="hover:text-emerald-400 transition-colors duration-300">Find Gyms</Link></li>
                <li><Link to="/spas" className="hover:text-emerald-400 transition-colors duration-300">Find Spas</Link></li>
                <li><Link to="/yoga" className="hover:text-emerald-400 transition-colors duration-300">Find Yoga Centers</Link></li>
                <li><Link to="/trainers" className="hover:text-emerald-400 transition-colors duration-300">Find Trainers</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors duration-300">About Us</Link></li>
              </ul>
            </div>
            
            <div className="text-left">
              <h5 className="font-bold mb-3 lg:mb-6 text-base lg:text-xl text-blue-400">For Business</h5>
              <ul className="space-y-2 lg:space-y-3 text-gray-300 text-sm lg:text-base">
                <li><Link to="/register-business" className="hover:text-blue-400 transition-colors duration-300">List Your Business</Link></li>
                <li><Link to="/register-trainer" className="hover:text-blue-400 transition-colors duration-300">Become a Trainer</Link></li>
                <li><Link to="/manage-bookings" className="hover:text-blue-400 transition-colors duration-300">Manage Bookings</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-400 transition-colors duration-300">Pricing Plans</Link></li>
                <li><Link to="/support" className="hover:text-blue-400 transition-colors duration-300">Support</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 lg:col-span-1 text-left">
              <h5 className="font-bold mb-3 lg:mb-6 text-base lg:text-xl text-purple-400">Contact</h5>
              <div className="space-y-2 lg:space-y-3 text-gray-300 text-sm lg:text-base">
                <div className="flex items-start justify-start">
                  <Phone className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>+91 7596958097</span>
                </div>
                <div className="flex items-start justify-start">
                  <MapPin className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>Mumbai, Delhi, Bangalore, India</span>
                </div>
                <div className="flex items-start justify-start">
                  <Mail className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="break-all">gymspayoga@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <span>© 2025 GymSpaYoga. All rights reserved.</span>
          <div className="flex gap-6 mt-2 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/blogs" className="text-gray-400 hover:text-white transition-colors">Blogs</Link>
            <Link to="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
