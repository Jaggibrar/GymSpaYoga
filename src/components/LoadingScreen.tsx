
import { useState, useEffect } from 'react';
import { Dumbbell, Waves, Heart } from "lucide-react";

interface LoadingScreenProps {
  category: 'gym' | 'spa' | 'yoga';
  onComplete: () => void;
}

const LoadingScreen = ({ category, onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  const getLoadingContent = () => {
    switch (category) {
      case 'gym':
        return {
          icon: <Dumbbell className="h-16 w-16 text-white animate-spin" />,
          text: "Warming up your gym experience...",
          gradient: "from-red-500 via-orange-500 to-yellow-500"
        };
      case 'spa':
        return {
          icon: <Waves className="h-16 w-16 text-white animate-pulse" />,
          text: "Preparing your spa sanctuary...",
          gradient: "from-blue-500 via-purple-500 to-pink-500"
        };
      case 'yoga':
        return {
          icon: <Heart className="h-16 w-16 text-white animate-bounce" />,
          text: "Centering your yoga journey...",
          gradient: "from-green-500 via-emerald-500 to-teal-500"
        };
    }
  };

  const content = getLoadingContent();

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br ${content.gradient} flex items-center justify-center`}>
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          {content.icon}
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">{content.text}</h2>
        <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/80 mt-2">{progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
