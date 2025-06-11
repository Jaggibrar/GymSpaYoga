
import { Link } from "react-router-dom";
import { ArrowLeft, Dumbbell } from "lucide-react";

export const RegistrationHeader = () => {
  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600 font-medium">Back to Home</span>
          </Link>
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Dumbbell className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              GymSpaYoga
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
};
