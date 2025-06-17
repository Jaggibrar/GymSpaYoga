import { Dumbbell, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, X } from "lucide-react";
import { Link } from "react-router-dom";

const AppFooter = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 sm:py-12 w-full">
            <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
                {/* Mobile Horizontal Layout - Stack sections horizontally on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12">
                    {/* Brand Section - Full width on mobile */}
                    <div className="lg:col-span-2 mb-6 lg:mb-0 text-left">
                        <div className="flex items-center space-x-3 mb-4 lg:mb-6 justify-start">
                            <div className="h-10 w-10 lg:h-12 lg:w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                                <Dumbbell className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                            </div>
                            <h4 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">GymSpaYoga</h4>
                        </div>
                        <p className="text-gray-300 text-sm lg:text-lg mb-4 lg:mb-6 leading-relaxed text-left">
                            Your wellness journey starts here. We connect fitness enthusiasts with the best gyms, spas, and yoga centers across India. Transform your health and discover premium wellness experiences tailored for you.
                        </p>
                        
                        {/* Social Media Icons - Left aligned */}
                        <div className="flex space-x-3 mb-4 lg:mb-6 justify-start">
                            <a href="https://facebook.com/gymspayoga" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-2 lg:p-3 rounded-full transition-colors duration-300 transform hover:scale-110" aria-label="Follow us on Facebook">
                                <Facebook className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                            </a>
                            <a href="https://instagram.com/gymspayoga" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-2 lg:p-3 rounded-full transition-all duration-300 transform hover:scale-110" aria-label="Follow us on Instagram">
                                <Instagram className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                            </a>
                            <a href="https://twitter.com/gymspayoga" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 p-2 lg:p-3 rounded-full transition-colors duration-300 transform hover:scale-110" aria-label="Follow us on Twitter">
                                <X className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                            </a>
                            <a href="https://linkedin.com/company/gymspayoga" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-800 p-2 lg:p-3 rounded-full transition-colors duration-300 transform hover:scale-110" aria-label="Follow us on LinkedIn">
                                <Linkedin className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                            </a>
                        </div>

                        {/* Payment Methods - Left aligned */}
                        <div className="text-left">
                            <h6 className="text-xs lg:text-sm font-semibold text-gray-400 mb-2 lg:mb-3">We Accept</h6>
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
                    
                    {/* Navigation Sections - Left aligned */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-0 lg:col-span-3">
                        <div className="text-left">
                            <h5 className="font-bold mb-3 lg:mb-6 text-base lg:text-xl text-emerald-400">For Users</h5>
                            <ul className="space-y-2 lg:space-y-3 text-gray-300 text-sm lg:text-base">
                                <li><Link to="/gyms" className="hover:text-emerald-400 transition-colors duration-300">Find Gyms</Link></li>
                                <li><Link to="/spas" className="hover:text-emerald