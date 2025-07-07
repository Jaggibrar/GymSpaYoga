import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuthWithSplash';
import BrandedLoadingScreen from '@/components/BrandedLoadingScreen';

const SplashScreenOverlay = () => {
  const { showSplashScreen, hideSplashScreen } = useAuth();

  useEffect(() => {
    if (showSplashScreen) {
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        hideSplashScreen();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSplashScreen, hideSplashScreen]);

  if (!showSplashScreen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9998] bg-white/95 backdrop-blur-sm">
      <BrandedLoadingScreen 
        onComplete={hideSplashScreen}
        message="Welcome to GymSpaYoga.com"
        duration={5000}
      />
    </div>
  );
};

export default SplashScreenOverlay;