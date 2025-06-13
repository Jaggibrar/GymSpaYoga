
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, MapPin } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const currentUrl = `https://gymspayoga.com${location.pathname}`;

  return (
    <>
      <SEOHead
        title="Page Not Found (404) - GymSpaYoga"
        description="The page you're looking for doesn't exist. Find gyms, spas, and yoga studios near you on GymSpaYoga. Explore our wellness services and book your fitness journey today."
        keywords="404 error, page not found, gym booking, spa treatments, yoga classes, fitness centers"
        url={currentUrl}
        noindex={true}
      />
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 px-4">
        <div className="text-center max-w-2xl w-full">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. But don't worry! 
              There are plenty of amazing gyms, spas, and yoga studios waiting for you to discover.
            </p>
          </div>
          
          {/* Helpful suggestions */}
          <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What would you like to find instead?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/gyms" className="group">
                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                  <div className="bg-emerald-500 p-2 rounded-lg">
                    <span className="text-white text-lg">💪</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-emerald-700">Find Gyms</h4>
                    <p className="text-sm text-emerald-600">Premium fitness centers</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/spas" className="group">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <span className="text-white text-lg">🧘</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-blue-700">Find Spas</h4>
                    <p className="text-sm text-blue-600">Luxury wellness treatments</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/yoga" className="group">
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="bg-purple-500 p-2 rounded-lg">
                    <span className="text-white text-lg">🕉️</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-purple-700">Find Yoga</h4>
                    <p className="text-sm text-purple-600">Meditation & yoga classes</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Return to Home
                </Link>
              </Button>
              <Button variant="outline" onClick={() => window.history.back()} className="w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/trainers">
                  <Search className="h-4 w-4 mr-2" />
                  Find Trainers
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/about">
                  <MapPin className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </Button>
            </div>
          </div>

          {/* Additional content for SEO */}
          <div className="mt-12 bg-white/60 backdrop-blur-sm rounded-xl p-6 text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Why Choose GymSpaYoga?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">🏃‍♂️ Premium Fitness Centers</h4>
                <p>Discover state-of-the-art gyms in Mumbai, Delhi, and Bangalore with certified trainers and modern equipment.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">🧘‍♀️ Luxury Spa Experiences</h4>
                <p>Indulge in rejuvenating spa treatments, massage therapy, and wellness services at top-rated establishments.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">🕉️ Authentic Yoga Studios</h4>
                <p>Join traditional and modern yoga classes led by experienced instructors in peaceful, welcoming environments.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">👨‍🏫 Certified Trainers</h4>
                <p>Connect with qualified personal trainers, yoga instructors, and wellness coaches to achieve your fitness goals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
