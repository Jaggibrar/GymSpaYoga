
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  category: string;
  trainer_tier: string;
  bio: string;
  experience: number;
  hourly_rate: number;
  specializations: string[];
  certifications?: string;
  profile_image_url?: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  rating?: number;
  reviews_count?: number;
}

export const useTrainers = (searchTerm?: string, location?: string, priceFilter?: string, category?: string) => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('trainer_profiles')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      // Apply filters
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,specializations.cs.{${searchTerm}}`);
      }

      if (location) {
        query = query.ilike('location', `%${location}%`);
      }

      if (category && category !== 'trainer') {
        query = query.eq('category', category);
      }

      if (priceFilter) {
        const [min, max] = priceFilter.split('-').map(Number);
        if (max) {
          query = query.gte('hourly_rate', min).lte('hourly_rate', max);
        } else {
          query = query.gte('hourly_rate', min);
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching trainers:', error);
        setError(error.message);
        return;
      }

      // Add mock ratings for display
      const trainersWithRatings = data?.map(trainer => ({
        ...trainer,
        rating: 4.8,
        reviews_count: Math.floor(Math.random() * 50) + 5
      })) || [];

      setTrainers(trainersWithRatings);
    } catch (err: any) {
      console.error('Error fetching trainers:', err);
      setError(err.message || 'Failed to load trainers');
    } finally {
      setLoading(false);
    }
  };

  const getTrainerById = async (id: string): Promise<Trainer | null> => {
    try {
      const { data, error } = await supabase
        .from('trainer_profiles')
        .select('*')
        .eq('id', id)
        .eq('status', 'approved')
        .single();

      if (error) {
        console.error('Error fetching trainer:', error);
        return null;
      }

      return {
        ...data,
        rating: 4.8,
        reviews_count: Math.floor(Math.random() * 50) + 5
      };
    } catch (err: any) {
      console.error('Error fetching trainer:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, [searchTerm, location, priceFilter, category]);

  return {
    trainers,
    loading,
    error,
    fetchTrainers,
    getTrainerById
  };
};
