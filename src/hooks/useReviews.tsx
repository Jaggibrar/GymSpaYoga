
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Review {
  id: string;
  user_id: string;
  business_type: 'gym' | 'spa' | 'yoga' | 'trainer';
  business_id: string;
  trainer_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
}

export const useReviews = (businessType?: string, businessId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        let query = supabase.from('reviews').select('*');

        if (businessType && businessId) {
          query = query
            .eq('business_type', businessType)
            .eq('business_id', businessId);
        }

        query = query.order('created_at', { ascending: false });

        const { data, error } = await query;

        if (error) {
          setError(error.message);
          console.error('Error fetching reviews:', error);
          return;
        }

        setReviews(data || []);
      } catch (err) {
        setError('Failed to fetch reviews');
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [businessType, businessId]);

  const createReview = async (reviewData: Partial<Review>) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{ ...reviewData, user_id: user.id }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setReviews(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating review:', err);
      throw err;
    }
  };

  return { reviews, loading, error, createReview };
};
