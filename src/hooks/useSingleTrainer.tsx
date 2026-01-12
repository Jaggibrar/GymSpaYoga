import { useState, useEffect, useCallback } from 'react';
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
  rating?: number;
  reviews_count?: number;
}

export const useSingleTrainer = (trainerId: string | undefined) => {
  const [trainer, setTrainer] = useState<TrainerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrainer = useCallback(async () => {
    if (!trainerId) {
      setTrainer(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Use public_trainer_listings view for public access
      const { data, error: supabaseError } = await supabase
        .from('public_trainer_listings')
        .select('*')
        .eq('id', trainerId)
        .eq('status', 'approved')
        .maybeSingle();

      if (supabaseError) {
        console.error('Error fetching trainer:', supabaseError);
        setError(supabaseError.message);
        setTrainer(null);
        return;
      }

      if (!data) {
        setTrainer(null);
        setError('Trainer not found');
        return;
      }

      // Add mock rating and reviews for demo
      const trainerWithRating = {
        ...data,
        rating: 4.8,
        reviews_count: Math.floor(Math.random() * 50) + 10
      };

      setTrainer(trainerWithRating);
    } catch (err) {
      console.error('Error in fetchTrainer:', err);
      setError('Failed to fetch trainer');
      setTrainer(null);
    } finally {
      setLoading(false);
    }
  }, [trainerId]);

  useEffect(() => {
    fetchTrainer();
  }, [fetchTrainer]);

  return {
    trainer,
    loading,
    error,
    refetch: fetchTrainer
  };
};