
import { Button } from "@/components/ui/button";
import { Dumbbell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface AppHeaderProps {
  onLogout: () => void;
}

const AppHeader = ({ onLogout }: AppHeaderProps) => {
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
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/">
              <Button variant="outline" className="text-xs md:text-sm">
                Home
              </Button>
            </Link>
            <Button 
              onClick={onLogout}
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
  );
};

export default AppHeader;
