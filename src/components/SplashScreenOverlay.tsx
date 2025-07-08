import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuthWithSplash';
import BrandedLoadingScreen from '@/components/BrandedLoadingScreen';

const SplashScreenOverlay = () => {
  const { showSplashScreen, hideSplashScreen } = useAuth();

  useEffect(() => {
    if (showSplashScreen) {
      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        hideSplashScreen();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSplashScreen, hideSplashScreen]);

  if (!showSplashScreen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <BrandedLoadingScreen 
        onComplete={hideSplashScreen}
        message="Welcome to GymSpaYoga.com"
        duration={3000}
      />
    </div>
  );
};

export default SplashScreenOverlay;