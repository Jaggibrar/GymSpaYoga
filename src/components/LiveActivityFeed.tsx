import React, { useState, useEffect, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Goa'];
const SERVICES = ['Gym Membership', 'Spa Treatment', 'Yoga Class', 'Personal Training', 'Massage Therapy', 'Meditation Session'];
const NAMES = ['A', 'R', 'S', 'P', 'M', 'K', 'N', 'D', 'V', 'T'];

const generateActivity = () => {
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];
  const service = SERVICES[Math.floor(Math.random() * SERVICES.length)];
  const initial = NAMES[Math.floor(Math.random() * NAMES.length)];
  const mins = Math.floor(Math.random() * 15) + 1;
  return { id: Date.now(), city, service, initial, mins };
};

const LiveActivityFeed: React.FC = () => {
  const [activity, setActivity] = useState(generateActivity);
  const [visible, setVisible] = useState(false);

  const showNext = useCallback(() => {
    setActivity(generateActivity());
    setVisible(true);
    setTimeout(() => setVisible(false), 4000);
  }, []);

  useEffect(() => {
    // Initial delay
    const initialTimer = setTimeout(() => {
      showNext();
    }, 5000);

    const interval = setInterval(showNext, 12000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [showNext]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-4 z-40 md:bottom-6 animate-slide-up">
      <div className="bg-card border border-border rounded-lg shadow-lg p-3 max-w-[280px] flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Activity className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-foreground leading-snug">
            <span className="font-semibold">{activity.initial}***</span> enquired about{' '}
            <span className="font-semibold">{activity.service}</span> in{' '}
            <span className="text-primary font-semibold">{activity.city}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{activity.mins} min ago</p>
        </div>
      </div>
    </div>
  );
};

export default LiveActivityFeed;
