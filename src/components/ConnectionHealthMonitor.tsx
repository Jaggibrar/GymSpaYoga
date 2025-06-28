
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, AlertTriangle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ConnectionHealthMonitorProps {
  onReconnect?: () => void;
}

const ConnectionHealthMonitor: React.FC<ConnectionHealthMonitorProps> = ({ onReconnect }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [dbConnectionHealthy, setDbConnectionHealthy] = useState(true);
  const [lastHealthCheck, setLastHealthCheck] = useState<Date>(new Date());

  // Monitor browser online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      checkDatabaseHealth();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Check database connection health
  const checkDatabaseHealth = async () => {
    try {
      const { error } = await supabase.from('business_profiles').select('id').limit(1);
      setDbConnectionHealthy(!error);
      setLastHealthCheck(new Date());
    } catch (err) {
      setDbConnectionHealthy(false);
      setLastHealthCheck(new Date());
    }
  };

  // Periodic health check
  useEffect(() => {
    const interval = setInterval(checkDatabaseHealth, 30000); // Check every 30 seconds
    checkDatabaseHealth(); // Initial check

    return () => clearInterval(interval);
  }, []);

  const handleReconnect = () => {
    checkDatabaseHealth();
    onReconnect?.();
  };

  if (!isOnline) {
    return (
      <Alert className="border-red-200 bg-red-50 mb-4">
        <WifiOff className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>You're currently offline. Some features may not work properly.</span>
          <Button variant="outline" size="sm" onClick={handleReconnect}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!dbConnectionHealthy) {
    return (
      <Alert className="border-yellow-200 bg-yellow-50 mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <div>
            <div>Connection issues detected. Data may not be up to date.</div>
            <div className="text-xs text-gray-500 mt-1">
              Last check: {lastHealthCheck.toLocaleTimeString()}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleReconnect}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reconnect
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default ConnectionHealthMonitor;
