
import { useState, useEffect } from 'react';
import { Dumbbell, Waves, Heart } from "lucide-react";

interface BrandedLoadingScreenProps {
  onComplete: () => void;
  message?: string;
}

const BrandedLoadingScreen = ({ onComplete, message = "Loading GymSpaYoga.com" }: BrandedLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [
    { icon: <Dumbbell className="h-12 w-12 text-white" />, color: "from-red-500 to-orange-500" },
    { icon: <Waves className="h-12 w-12 text-white" />, color: "from-blue-500 to-purple-500" },
    { icon: <Heart className="h-12 w-12 text-white" />, color: "from-green-500 to-emerald-500" }
  ];

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 12;
      });
    }, 150);

    const iconTimer = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 800);

    return () => {
      clearInterval(progressTimer);
      clearInterval(iconTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8 flex justify-center">
          <div className={`p-6 rounded-3xl bg-gradient-to-br ${icons[currentIcon].color} shadow-2xl transform transition-all duration-500 hover:scale-105`}>
            <div className="animate-pulse">
              {icons[currentIcon].icon}
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gym
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Spa
            </span>
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600 bg-clip-text text-transparent">
              Yoga
            </span>
          </h1>
          <p className="text-gray-600 text-lg">{message}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <p className="text-gray-500 text-sm">{progress}% Complete</p>

        {/* Floating Icons Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-20 opacity-10">
            <Dumbbell className="h-8 w-8 text-emerald-500 animate-bounce" style={{ animationDelay: '0s' }} />
          </div>
          <div className="absolute top-40 right-32 opacity-10">
            <Waves className="h-6 w-6 text-blue-500 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="absolute bottom-32 left-40 opacity-10">
            <Heart className="h-7 w-7 text-pink-500 animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute bottom-20 right-20 opacity-10">
            <Dumbbell className="h-5 w-5 text-purple-500 animate-bounce" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandedLoadingScreen;
