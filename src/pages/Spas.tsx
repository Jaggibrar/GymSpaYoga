
import { Button } from "@/components/ui/button";
import { Waves, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import FilteredListings from "@/components/FilteredListings";
import LoadingScreen from "@/components/LoadingScreen";

const Spas = () => {
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

  const spas = [
    {
      id: 1,
      name: "Serenity Wellness Spa",
      type: "Luxury Spa",
      category: "luxury",
      rating: 4.9,
      location: "Juhu, Mumbai",
      price: "₹4,500/session",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Aromatherapy", "Hot Stone Massage", "Jacuzzi", "Steam Room", "Couples Suite"],
      link: "/spa/1"
    },
    {
      id: 2,
      name: "Tranquil Touch Spa",
      type: "Wellness Spa",
      category: "premium",
      rating: 4.7,
      location: "Koramangala, Bangalore",
      price: "₹2,800/session",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Deep Tissue Massage", "Facial Treatments", "Sauna", "Reflexology"],
      link: "/spa/2"
    },
    {
      id: 3,
      name: "Bliss Day Spa",
      type: "Day Spa",
      category: "budget",
      rating: 4.4,
      location: "Connaught Place, Delhi",
      price: "₹1,500/session",
      image: "https://images.unsplash.com/photo-1583454110551-4515c1934342?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Swedish Massage", "Body Scrub", "Hair Spa", "Manicure/Pedicure"],
      link: "/spa/3"
    },
    {
      id: 4,
      name: "Royal Rejuvenation",
      type: "Premium Spa",
      category: "luxury",
      rating: 4.8,
      location: "Bandra West, Mumbai",
      price: "₹6,000/session",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Gold Facial", "Thai Massage", "Private Pool", "Champagne Service", "Personal Butler"],
      link: "/spa/4"
    },
    {
      id: 5,
      name: "Zen Harmony Spa",
      type: "Holistic Spa",
      category: "premium",
      rating: 4.6,
      location: "Whitefield, Bangalore",
      price: "₹3,200/session",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Ayurvedic Treatment", "Meditation Room", "Herbal Steam", "Sound Therapy"],
      link: "/spa/5"
    },
    {
      id: 6,
      name: "Quick Refresh Spa",
      type: "Express Spa",
      category: "budget",
      rating: 4.3,
      location: "Sector 18, Gurgaon",
      price: "₹1,200/session",
      image: "https://images.unsplash.com/photo-1583454110551-4515c1934342?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Express Facial", "Chair Massage", "Quick Pedicure", "Stress Relief"],
      link: "/spa/6"
    }
  ];

  if (isLoading) {
    return <LoadingScreen category="spa" onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 md:h-10 w-8 md:w-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Waves className="h-4 md:h-6 w-4 md:w-6 text-white" />
              </div>
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Luxury spa with relaxing ambiance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 leading-tight">
              Find Your Perfect
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-purple-400 mb-4 md:mb-6">
              Spa
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover ultimate relaxation and rejuvenation experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Filtered Listings */}
      <FilteredListings listings={spas} pageType="spa" />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <div className="h-10 md:h-12 w-10 md:w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Waves className="h-5 md:h-6 w-5 md:w-6 text-white" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">GymSpaYoga</h4>
              </div>
              <p className="text-gray-300 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
                Your wellness journey starts here. We connect wellness enthusiasts with the best gyms, spas, and yoga centers across India.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 md:mb-6 text-lg md:text-xl text-emerald-400">For Users</h5>
              <ul className="space-y-2 md:space-y-3 text-gray-300">
                <li><Link to="/gyms" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Gyms</Link></li>
                <li><Link to="/spas" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Spas</Link></li>
                <li><Link to="/yoga" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Yoga Centers</Link></li>
                <li><Link to="/trainers" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">Find Trainers</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors duration-300 text-sm md:text-base">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 md:mb-6 text-lg md:text-xl text-blue-400">For Business</h5>
              <ul className="space-y-2 md:space-y-3 text-gray-300">
                <li><Link to="/register-business" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">List Your Business</Link></li>
                <li><Link to="/register-trainer" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Become a Trainer</Link></li>
                <li><Link to="/manage-bookings" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Manage Bookings</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Pricing Plans</Link></li>
                <li><Link to="/support" className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 md:mb-6 text-lg md:text-xl text-purple-400">Contact</h5>
              <div className="space-y-2 md:space-y-3 text-gray-300">
                <p className="text-sm md:text-base">Mumbai, India</p>
                <p className="text-sm md:text-base">contact@gymspayoga.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400">
            <p className="text-sm md:text-base">&copy; 2024 GymSpaYoga. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Spas;
