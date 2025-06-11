
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface CalendarEvent {
  id: string;
  user_id: string;
  business_id?: string;
  trainer_id?: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  event_type: 'booking' | 'session' | 'reminder';
  booking_id?: number;
  created_at: string;
}

export const useCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchEvents = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .eq('user_id', user.id)
        .order('start_time', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch calendar events';
      setError(errorMessage);
      console.error('Error fetching calendar events:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<CalendarEvent, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .insert([{ ...eventData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setEvents(prev => [...prev, data]);
      toast.success('Calendar event created');
      return data;
    } catch (err) {
      console.error('Error creating calendar event:', err);
      toast.error('Failed to create calendar event');
      throw err;
    }
  };

  const updateEvent = async (eventId: string, updates: Partial<CalendarEvent>) => {
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .update(updates)
        .eq('id', eventId)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) throw error;
      setEvents(prev => prev.map(event => event.id === eventId ? data : event));
      toast.success('Calendar event updated');
      return data;
    } catch (err) {
      console.error('Error updating calendar event:', err);
      toast.error('Failed to update calendar event');
      throw err;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('calendar_events')
        .delete()
        .eq('id', eventId)
        .eq('user_id', user?.id);

      if (error) throw error;
      setEvents(prev => prev.filter(event => event.id !== eventId));
      toast.success('Calendar event deleted');
    } catch (err) {
      console.error('Error deleting calendar event:', err);
      toast.error('Failed to delete calendar event');
      throw err;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    refetch: fetchEvents
  };
};
