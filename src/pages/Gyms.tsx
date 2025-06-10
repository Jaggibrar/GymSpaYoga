
import { Button } from "@/components/ui/button";
import { Dumbbell, LogOut, MapPin, Phone, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import FilteredListings from "@/components/FilteredListings";
import TrainersSection from "@/components/TrainersSection";
import LoadingScreen from "@/components/LoadingScreen";

const Gyms = () => {
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

  const gyms = [
    {
      id: 1,
      name: "Elite Fitness Hub",
      type: "Premium Gym",
      category: "luxury",
      rating: 4.8,
      location: "Bandra West, Mumbai",
      price: "₹2,500/month",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "Parking", "Locker", "Personal Training", "Modern Equipment"],
      link: "/gym/1"
    },
    {
      id: 2,
      name: "The Strength Factory",
      type: "Modern Gym",
      category: "premium",
      rating: 4.5,
      location: "Koregaon Park, Pune",
      price: "₹1,800/month",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "Showers", "Cardio", "Group Classes"],
      link: "/gym/2"
    },
    {
      id: 3,
      name: "Flex Zone Gym",
      type: "Community Gym",
      category: "budget",
      rating: 4.2,
      location: "Indiranagar, Bangalore",
      price: "₹1,000/month",
      image: "https://images.unsplash.com/photo-1583454110551-4515c1934342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Basic Equipment", "Personal Training", "Flexible Hours"],
      link: "/gym/3"
    },
    {
      id: 4,
      name: "Iron Paradise",
      type: "Hardcore Gym",
      category: "luxury",
      rating: 4.9,
      location: "Andheri West, Mumbai",
      price: "₹3,200/month",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Premium Equipment", "Spa Access", "Nutrition Counseling", "VIP Lounge"],
      link: "/gym/4"
    },
    {
      id: 5,
      name: "FitHub Express",
      type: "Quick Workout",
      category: "budget",
      rating: 4.1,
      location: "Sector 18, Gurgaon",
      price: "₹800/month",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["24/7 Access", "Basic Cardio", "Weight Training"],
      link: "/gym/5"
    },
    {
      id: 6,
      name: "Elite Powerhouse",
      type: "Professional Gym",
      category: "premium",
      rating: 4.7,
      location: "Whitefield, Bangalore",
      price: "₹2,200/month",
      image: "https://images.unsplash.com/photo-1583454110551-4515c1934342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["CrossFit", "Olympic Lifting", "Recovery Zone", "Meal Plans"],
      link: "/gym/6"
    }
  ];

  if (isLoading) {
    return <LoadingScreen category="gym" onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header with logout */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 md:h-10 w-8 md:w-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="h-4 md:h-6 w-4 md:w-6 text-white" />
              </div>
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
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
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Modern gym equipment and workout space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 leading-tight">
              Find Your Perfect
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-400 mb-4 md:mb-6">
              Gym
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover state-of-the-art fitness centers near you.
            </p>
          </div>
        </div>
      </section>

      {/* Filtered Listings */}
      <FilteredListings listings={gyms} pageType="gym" />

      {/* Trainers Section */}
      <TrainersSection />

      {/* Footer */}
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
    </div>
  );
};

export default Gyms;
