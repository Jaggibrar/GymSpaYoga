
import { useState, useEffect } from 'react';
import { Dumbbell, Waves, Heart } from "lucide-react";

interface BrandedLoadingScreenProps {
  onComplete: () => void;
  message?: string;
  duration?: number; // Duration in milliseconds
}

const BrandedLoadingScreen = ({ 
  onComplete, 
  message = "Loading GymSpaYoga.com",
  duration = 2000 // Default 2 seconds
}: BrandedLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const icons = [
    { icon: <Dumbbell className="h-12 w-12 text-white" />, color: "from-red-500 to-orange-500" },
    { icon: <Waves className="h-12 w-12 text-white" />, color: "from-blue-500 to-purple-500" },
    { icon: <Heart className="h-12 w-12 text-white" />, color: "from-green-500 to-emerald-500" }
  ];

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    let iconTimer: NodeJS.Timeout;
    let completionTimer: NodeJS.Timeout;

    const progressInterval = duration / 100; // Calculate interval for smooth progress
    
    // Progress animation
    progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2; // Increment by 2% each time
      });
    }, progressInterval);

    // Icon rotation animation
    iconTimer = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 600); // Icon changes every 600ms

    // Completion handler
    completionTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 300); // Allow fade out animation
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(iconTimer);
      clearTimeout(completionTimer);
    };
  }, [onComplete, duration]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center opacity-0 transition-opacity duration-300">
        {/* Fade out animation */}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center animate-fade-in">
      <div className="text-center relative">
        {/* Animated Logo */}
        <div className="mb-8 flex justify-center">
          <div className={`p-6 rounded-3xl bg-gradient-to-br ${icons[currentIcon].color} shadow-2xl transform transition-all duration-500 hover:scale-105`}>
            <div className="animate-bounce">
              {icons[currentIcon].icon}
            </div>
          </div>
        </div>

        {/* Brand Name with Enhanced Gradient Animation */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in">
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
              Gym
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse" style={{ animationDelay: '0.2s' }}>
              Spa
            </span>
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600 bg-clip-text text-transparent animate-pulse" style={{ animationDelay: '0.4s' }}>
              Yoga
            </span>
          </h1>
          <p className="text-gray-600 text-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>{message}</p>
        </div>

        {/* Enhanced Progress Bar with Shimmer Effect */}
        <div className="w-80 h-4 bg-gray-200 rounded-full overflow-hidden mb-4 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full transition-all duration-200 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
            {/* Moving Shine Effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transform -skew-x-12 animate-pulse"
              style={{ 
                animation: 'shimmer 1.5s infinite',
                width: '30%',
                left: `${progress - 15}%`
              }}
            ></div>
          </div>
        </div>

        {/* Progress Text with Animation */}
        <p className="text-gray-500 text-sm font-medium animate-pulse">{progress}% Complete</p>

        {/* Enhanced Floating Icons Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-20 opacity-10 animate-bounce" style={{ animationDelay: '0s' }}>
            <Dumbbell className="h-8 w-8 text-emerald-500" />
          </div>
          <div className="absolute top-40 right-32 opacity-10 animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Waves className="h-6 w-6 text-blue-500" />
          </div>
          <div className="absolute bottom-32 left-40 opacity-10 animate-bounce" style={{ animationDelay: '1s' }}>
            <Heart className="h-7 w-7 text-pink-500" />
          </div>
          <div className="absolute bottom-20 right-20 opacity-10 animate-bounce" style={{ animationDelay: '1.5s' }}>
            <Dumbbell className="h-5 w-5 text-purple-500" />
          </div>
          <div className="absolute top-1/2 left-10 opacity-10 animate-bounce" style={{ animationDelay: '2s' }}>
            <Heart className="h-6 w-6 text-red-500" />
          </div>
          <div className="absolute top-1/3 right-10 opacity-10 animate-bounce" style={{ animationDelay: '2.5s' }}>
            <Waves className="h-8 w-8 text-indigo-500" />
          </div>
        </div>

        {/* Pulsing Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-blue-200/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(400%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
};

export default BrandedLoadingScreen;
