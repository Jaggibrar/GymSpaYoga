
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface CustomGeolocationPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface GeolocationError {
  code: number;
  message: string;
}

interface UseGeolocationReturn {
  position: CustomGeolocationPosition | null;
  error: GeolocationError | null;
  loading: boolean;
  getCurrentPosition: () => void;
  watchPosition: () => void;
  clearWatch: () => void;
  isSupported: boolean;
}

export const useGeolocation = (options?: PositionOptions): UseGeolocationReturn => {
  const [position, setPosition] = useState<CustomGeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [loading, setLoading] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);

  const isSupported = 'geolocation' in navigator;

  const defaultOptions: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 600000, // 10 minutes
    ...options,
  };

  const handleSuccess = useCallback((pos: GeolocationPosition) => {
    setPosition({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
      timestamp: pos.timestamp,
    });
    setError(null);
    setLoading(false);
  }, []);

  const handleError = useCallback((err: GeolocationPositionError) => {
    const errorMap: Record<number, string> = {
      1: 'Location access denied by user',
      2: 'Location information unavailable',
      3: 'Location request timeout',
    };

    const errorMessage = errorMap[err.code] || 'Unknown geolocation error';
    
    setError({
      code: err.code,
      message: errorMessage,
    });
    setPosition(null);
    setLoading(false);
    
    toast.error(`Location Error: ${errorMessage}`);
  }, []);

  const getCurrentPosition = useCallback(() => {
    if (!isSupported) {
      const notSupportedError = {
        code: 0,
        message: 'Geolocation is not supported by this browser',
      };
      setError(notSupportedError);
      toast.error(notSupportedError.message);
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      defaultOptions
    );
  }, [isSupported, handleSuccess, handleError, defaultOptions]);

  const watchPosition = useCallback(() => {
    if (!isSupported) {
      const notSupportedError = {
        code: 0,
        message: 'Geolocation is not supported by this browser',
      };
      setError(notSupportedError);
      toast.error(notSupportedError.message);
      return;
    }

    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    setLoading(true);
    setError(null);

    const id = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      defaultOptions
    );

    setWatchId(id);
  }, [isSupported, watchId, handleSuccess, handleError, defaultOptions]);

  const clearWatch = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setLoading(false);
    }
  }, [watchId]);

  // Cleanup watch on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return {
    position,
    error,
    loading,
    getCurrentPosition,
    watchPosition,
    clearWatch,
    isSupported,
  };
};

// Utility function to calculate distance between two points
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

// Utility function to get address from coordinates
export const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    
    if (!response.ok) {
      throw new Error('Reverse geocoding failed');
    }
    
    const data = await response.json();
    return data.displayName || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  }
};
