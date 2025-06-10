
import { Button } from "@/components/ui/button";
import { Heart, LogOut, MapPin, Phone, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import FilteredListings from "@/components/FilteredListings";
import TrainersSection from "@/components/TrainersSection";
import LoadingScreen from "@/components/LoadingScreen";

const Yoga = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  const yogaStudios = [
    {
      id: 1,
      name: "Mindful Movement Studio",
      type: "Hatha Yoga",
      category: "luxury",
      rating: 4.9,
      location: "Bandra West, Mumbai",
      price: "₹2,000/month",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Air Conditioning", "Props Included", "Meditation Room", "Organic Tea", "Sound Healing"],
      link: "/yoga/1"
    },
    {
      id: 2,
      name: "Zen Flow Yoga",
      type: "Vinyasa Yoga",
      category: "premium",
      rating: 4.7,
      location: "Koramangala, Bangalore",
      price: "₹1,500/month",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Natural Lighting", "Wooden Floors", "Music Therapy", "Aromatherapy"],
      link: "/yoga/2"
    },
    {
      id: 3,
      name: "Community Yoga Center",
      type: "Community Classes",
      category: "budget",
      rating: 4.4,
      location: "Lajpat Nagar, Delhi",
      price: "₹800/month",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Group Classes", "Basic Props", "Beginner Friendly", "Outdoor Sessions"],
      link: "/yoga/3"
    },
    {
      id: 4,
      name: "Sacred Space Yoga",
      type: "Spiritual Yoga",
      category: "luxury",
      rating: 4.8,
      location: "Juhu, Mumbai",
      price: "₹2,800/month",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Private Sessions", "Ayurvedic Consultation", "Retreat Programs", "Luxury Amenities"],
      link: "/yoga/4"
    },
    {
      id: 5,
      name: "Power Yoga Studio",
      type: "Power Yoga",
      category: "premium",
      rating: 4.6,
      location: "Whitefield, Bangalore",
      price: "₹1,800/month",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      amenities: ["High Intensity", "Modern Equipment", "Fitness Tracking", "Nutrition Guidance"],
      link: "/yoga/5"
    },
    {
      id: 6,
      name: "Peaceful Path Yoga",
      type: "Restorative Yoga",
      category: "budget",
      rating: 4.3,
      location: "Sector 18, Gurgaon",
      price: "₹1,000/month",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Gentle Practice", "Stress Relief", "Senior Friendly", "Flexible Timing"],
      link: "/yoga/6"
    }
  ];

  if (isLoading) {
    return <LoadingScreen category="yoga" onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="h-8 md:h-10 w-8 md:w-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-green-200">
                <div className="relative">
                  <Heart className="h-4 md:h-6 w-4 md:w-6 text-white animate-pulse group-hover:animate-bounce" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping group-hover:animate-none"></div>
                </div>
              </div>
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent hover:from-green-700 hover:to-emerald-700 transition-all duration-300">
                GymSpaYoga
              </h1>
            </Link>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link to="/">
                <Button variant="outline" className="text-xs md:text-sm">
                  Home
                </Button>
              </Link>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="text-xs md:text-sm text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-3 w-3 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Peaceful yoga studio with natural lighting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 leading-tight">
              Find Your Perfect
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-400 mb-4 md:mb-6">
              Yoga Studio
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover inner peace and strengthen your mind-body connection.
            </p>
          </div>
        </div>
      </section>

      {/* Filtered Listings */}
      <FilteredListings listings={yogaStudios} pageType="yoga" />

      {/* Trainers Section */}
      <TrainersSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <div className="h-10 md:h-12 w-10 md:w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Heart className="h-5 md:h-6 w-5 md:w-6 text-white" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold">GymSpaYoga</h4>
              </div>
              <p className="text-gray-300 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
                Your ultimate destination for fitness, wellness, and mindfulness. 
                Discover the best gyms, spas, and yoga studios in your area.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 md:mb-6 text-lg md:text-xl text-emerald-400">Quick Links</h5>
              <ul className="space-y-2 md:space-y-3 text-gray-300">
                <li><Link to="/gyms" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Gyms</Link></li>
                <li><Link to="/spas" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Spas</Link></li>
                <li><Link to="/yoga" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Yoga</Link></li>
                <li><Link to="/trainers" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Trainers</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 md:mb-6 text-lg md:text-xl text-blue-400">For Business</h5>
              <ul className="space-y-2 md:space-y-3 text-gray-300">
                <li><Link to="/register-business" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">List Your Business</Link></li>
                <li><Link to="/register-trainer" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Join as Trainer</Link></li>
                <li><Link to="/manage-bookings" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Manage Bookings</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Pricing</Link></li>
                <li><Link to="/support" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Support</Link></li>
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
    </div>
  );
};

export default Yoga;
