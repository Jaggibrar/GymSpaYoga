
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  trainer_tier: string;
  experience: number;
  certifications?: string;
  specializations: string[];
  hourly_rate: number;
  location: string;
  bio: string;
  profile_image_url?: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export const useTrainers = (
  searchTerm?: string,
  locationFilter?: string,
  tierFilter?: string,
  categoryFilter?: string
) => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrainers = async () => {
    console.log('Fetching trainers from database...');
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('trainer_profiles')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      // Apply category filter if provided
      if (categoryFilter && categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching trainers:', error);
        throw error;
      }

      console.log(`Successfully fetched ${data?.length || 0} approved trainers:`, data);
      
      let filteredData = data || [];

      // Apply client-side filters
      if (searchTerm && searchTerm.trim()) {
        const search = searchTerm.toLowerCase().trim();
        filteredData = filteredData.filter(trainer => 
          trainer.name.toLowerCase().includes(search) ||
          trainer.bio?.toLowerCase().includes(search) ||
          trainer.specializations?.some(spec => spec.toLowerCase().includes(search)) ||
          trainer.certifications?.toLowerCase().includes(search)
        );
      }

      if (locationFilter && locationFilter.trim()) {
        const location = locationFilter.toLowerCase().trim();
        filteredData = filteredData.filter(trainer => 
          trainer.location.toLowerCase().includes(location)
        );
      }

      if (tierFilter && tierFilter !== 'all') {
        filteredData = filteredData.filter(trainer => 
          trainer.trainer_tier.toLowerCase() === tierFilter.toLowerCase()
        );
      }

      setTrainers(filteredData);
      
      if ((data?.length || 0) === 0) {
        console.log('No approved trainers found. Checking for pending trainers...');
        const { data: pendingData } = await supabase
          .from('trainer_profiles')
          .select('*')
          .eq('status', 'pending');
          
        console.log(`Found ${pendingData?.length || 0} pending trainer profiles`);
      }
      
    } catch (err: any) {
      console.error('Failed to fetch trainers:', err);
      setError(err.message);
      toast.error('Failed to load trainer profiles');
      setTrainers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, [searchTerm, locationFilter, tierFilter, categoryFilter]);

  return {
    trainers,
    loading,
    error,
    refetch: fetchTrainers,
    totalCount: trainers.length
  };
};
