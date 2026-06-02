import { Link } from "react-router-dom";
import { ArrowLeft, Dumbbell } from "lucide-react";

export const RegistrationHeader = () => {
  return (
    <header className="bg-background/80 backdrop-blur-xl sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium text-sm">Back to Home</span>
          </Link>
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-emerald">
              <Dumbbell className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-display font-bold text-foreground">
              GymSpaYoga
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
};
