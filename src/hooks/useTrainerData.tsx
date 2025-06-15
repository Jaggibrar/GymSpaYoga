
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TrainerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  trainer_tier: string;
  experience: number;
  specializations: string[];
  hourly_rate: number;
  location: string;
  bio: string;
  profile_image_url: string;
  status: string;
  created_at: string;
}

export const useTrainerData = (category?: string, searchTerm?: string, locationFilter?: string, tierFilter?: string) => {
  const [trainers, setTrainers] = useState<TrainerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('trainer_profiles')
          .select('*')
          .eq('status', 'approved');

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;

        let filteredData = data || [];

        // Apply filters
        if (searchTerm) {
          filteredData = filteredData.filter(trainer =>
            trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trainer.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trainer.specializations?.some(spec => 
              spec.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }

        if (locationFilter) {
          filteredData = filteredData.filter(trainer =>
            trainer.location.toLowerCase().includes(locationFilter.toLowerCase())
          );
        }

        if (tierFilter && tierFilter !== 'all') {
          filteredData = filteredData.filter(trainer => trainer.trainer_tier === tierFilter);
        }

        setTrainers(filteredData);
      } catch (error: any) {
        console.error('Error fetching trainers:', error);
        setError(error.message || 'Failed to fetch trainers');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, [category, searchTerm, locationFilter, tierFilter]);

  return { trainers, loading, error, refetch: () => fetchTrainers() };
};
