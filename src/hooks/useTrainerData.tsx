
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TrainerData {
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
  certifications: string | null;
  profile_image_url: string | null;
  status: string;
  created_at: string;
  updated_at: string | null;
}

export const useTrainerData = (
  category?: string,
  searchTerm?: string,
  location?: string,
  tier?: string
) => {
  const [trainers, setTrainers] = useState<TrainerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('trainer_profiles')
          .select('*')
          .eq('status', 'approved'); // Only show approved trainers

        // Apply filters
        if (category && category !== 'all') {
          query = query.eq('category', category);
        }

        if (searchTerm) {
          query = query.or(`name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%,specializations.cs.{${searchTerm}}`);
        }

        if (location) {
          query = query.ilike('location', `%${location}%`);
        }

        if (tier && tier !== 'all') {
          query = query.eq('trainer_tier', tier);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching trainers:', error);
          setError(error.message);
          setLoading(false);
          return;
        }

        setTrainers(data || []);
      } catch (err) {
        console.error('Error in fetchTrainers:', err);
        setError('Failed to fetch trainers');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, [category, searchTerm, location, tier]);

  return { trainers, loading, error };
};
