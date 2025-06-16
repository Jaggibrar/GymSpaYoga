
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dumbbell, Menu, User, LogOut, Calendar, Building, Home, ChevronRight, Phone, HelpCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const MainNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  useScrollToTop();

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Gyms", path: "/gyms" },
    { name: "Spas", path: "/spas" },
    { name: "Yoga", path: "/yoga" },
    { name: "Trainers", path: "/trainers" },
    { name: "Blog", path: "/blogs" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Support", path: "/support" }
  ];

  const isActivePath = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
  };

  // Breadcrumb generation
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    
    if (pathnames.length === 0) return null;
    
    return (
      <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
        <Link to="/" className="hover:text-emerald-600 transition-colors">
          <Home className="h-4 w-4" />
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <div key={to} className="flex items-center space-x-2">
              <ChevronRight className="h-3 w-3 text-gray-400" />
              {isLast ? (
                <span className="text-gray-800 font-medium capitalize">{value}</span>
              ) : (
                <Link to={to} className="hover:text-emerald-600 transition-colors capitalize">
                  {value}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <nav className="bg-white/98 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  GymSpaYoga
                </span>
                <div className="text-xs text-gray-500 font-medium">Transform Your Life</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-emerald-50 ${
                  isActivePath(item.path)
                    ? "text-emerald-600 bg-emerald-50 border-b-2 border-emerald-500"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/user-dashboard">
                  <Button variant="outline" size="sm" className="hover:border-emerald-500 hover:text-emerald-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    My Dashboard
                  </Button>
                </Link>
                <Link to="/business-bookings">
                  <Button variant="outline" size="sm" className="hover:border-blue-500 hover:text-blue-600">
                    <Building className="h-4 w-4 mr-2" />
                    Business
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="hover:border-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/support">
                  <Button variant="ghost" size="sm" className="hover:text-emerald-600">
                    <Phone className="h-4 w-4 mr-2" />
                    1-800-WELLNESS
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="hover:border-emerald-500 hover:text-emerald-600">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 font-bold">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-emerald-50">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-white">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Dumbbell className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent text-xl font-black">
                        GymSpaYoga
                      </span>
                      <div className="text-xs text-gray-500 font-medium">Transform Your Life</div>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col space-y-1 mt-6">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-left px-4 py-3 text-base font-semibold transition-colors rounded-lg ${
                        isActivePath(item.path) 
                          ? "text-emerald-600 bg-emerald-50" 
                          : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="border-t pt-4 mt-4 space-y-2">
                    {user ? (
                      <>
                        <Link to="/user-dashboard" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full justify-start hover:border-emerald-500 hover:text-emerald-600">
                            <Calendar className="h-4 w-4 mr-3" />
                            My Dashboard
                          </Button>
                        </Link>
                        <Link to="/business-bookings" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full justify-start hover:border-blue-500 hover:text-blue-600">
                            <Building className="h-4 w-4 mr-3" />
                            Business Dashboard
                          </Button>
                        </Link>
                        <Link to="/profile" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full justify-start">
                            <User className="h-4 w-4 mr-3" />
                            Profile Settings
                          </Button>
                        </Link>
                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-2 bg-emerald-50 rounded-lg mb-3">
                          <div className="flex items-center text-emerald-700">
                            <HelpCircle className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">Need Help? Call 1-800-WELLNESS</span>
                          </div>
                        </div>
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full hover:border-emerald-500 hover:text-emerald-600">
                            Login to Account
                          </Button>
                        </Link>
                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                          <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 font-bold">
                            Sign Up
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Breadcrumbs */}
        <div className="pb-2">
          {generateBreadcrumbs()}
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
