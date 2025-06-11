
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell, Home, Users, Building, User, Calendar, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const MainNavigation = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
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
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/">
              <Button variant={isActive('/') ? "default" : "ghost"} className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Link to="/gyms">
              <Button variant={isActive('/gyms') ? "default" : "ghost"} className="flex items-center space-x-2">
                <Dumbbell className="h-4 w-4" />
                <span>Gyms</span>
              </Button>
            </Link>
            <Link to="/spas">
              <Button variant={isActive('/spas') ? "default" : "ghost"} className="flex items-center space-x-2">
                <span>🧘</span>
                <span>Spas</span>
              </Button>
            </Link>
            <Link to="/yoga">
              <Button variant={isActive('/yoga') ? "default" : "ghost"} className="flex items-center space-x-2">
                <span>🕉️</span>
                <span>Yoga</span>
              </Button>
            </Link>
            <Link to="/trainers">
              <Button variant={isActive('/trainers') ? "default" : "ghost"} className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Trainers</span>
              </Button>
            </Link>
            <Link to="/manage-bookings">
              <Button variant={isActive('/manage-bookings') ? "default" : "ghost"} className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Bookings</span>
              </Button>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/profile">
              <Button variant="outline" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Profile</span>
              </Button>
            </Link>
            <Link to="/register-business">
              <Button variant="outline" className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span className="hidden md:inline">List Business</span>
              </Button>
            </Link>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50 flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
