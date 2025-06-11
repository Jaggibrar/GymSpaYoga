
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Review {
  id: number;
  user_id: string | null;
  business_type: 'gym' | 'spa' | 'yoga' | 'trainer' | null;
  business_id: string | null;
  trainer_id: string | null;
  rating: number | null;
  comment: string | null;
  created_at: string;
  updated_at: string | null;
}

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

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
  }, []);

  const createReview = async (reviewData: Omit<Review, 'id' | 'created_at' | 'updated_at'>) => {
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
