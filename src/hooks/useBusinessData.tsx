
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Business {
  id: string;
  business_name: string;
  business_type: string;
  category: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  opening_time: string;
  closing_time: string;
  monthly_price?: number;
  session_price?: number;
  description: string;
  amenities: string[];
  image_urls: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export const useBusinessData = (
  category?: string,
  searchTerm: string = '',
  location: string = '',
  sortBy: string = 'created_at'
) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchBusinesses();
  }, [category, searchTerm, location, sortBy]);

  const fetchBusinesses = async () => {
    console.log('🔍 Fetching businesses... Category:', category || 'all');
    console.log('📊 Search params:', { searchTerm, location, sortBy });
    setLoading(true);
    setError('');
    
    try {
      // For trainer category, we need to fetch from trainer_profiles instead
      if (category === 'trainer') {
        const { data: trainers, error: trainerError } = await supabase
          .from('trainer_profiles')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (trainerError) {
          console.error('❌ Error fetching trainers:', trainerError);
          setError(trainerError.message);
          toast.error('Failed to fetch trainers');
          return;
        }

        console.log('✅ Successfully fetched trainers:', trainers?.length || 0);
        
        // Transform trainer data to match Business interface
        const transformedTrainers = (trainers || []).map(trainer => ({
          id: trainer.id,
          business_name: trainer.name,
          business_type: 'trainer',
          category: trainer.category,
          email: trainer.email,
          phone: trainer.phone,
          address: trainer.location,
          city: trainer.location.split(',')[0] || trainer.location,
          state: trainer.location.split(',')[1]?.trim() || 'India',
          pin_code: '000000',
          opening_time: '09:00:00',
          closing_time: '18:00:00',
          session_price: trainer.hourly_rate,
          description: trainer.bio,
          amenities: trainer.specializations || [],
          image_urls: trainer.profile_image_url ? [trainer.profile_image_url] : [],
          status: trainer.status,
          created_at: trainer.created_at,
          updated_at: trainer.updated_at || trainer.created_at
        }));

        setBusinesses(transformedTrainers);
        return;
      }

      // For regular businesses, use the existing logic
      let query = supabase
        .from('business_profiles')
        .select('*');

      // Debug: Check all businesses in database
      const { data: allBusinesses, error: allError } = await supabase
        .from('business_profiles')
        .select('business_type, status, business_name')
        .order('created_at', { ascending: false });
      
      console.log('📋 All businesses in database:', allBusinesses);
      console.log('✅ Approved businesses:', allBusinesses?.filter(b => b.status === 'approved'));

      // Apply the approved filter
      query = query.eq('status', 'approved');

      // Apply category filter (exclude trainer as it's handled above)
      if (category && category !== 'all' && category !== 'trainer') {
        console.log('🎯 Filtering by category:', category);
        query = query.eq('business_type', category);
      }

      // Apply search term filter
      if (searchTerm) {
        console.log('🔤 Applying search term:', searchTerm);
        query = query.or(`business_name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Apply location filter
      if (location) {
        console.log('📍 Applying location filter:', location);
        query = query.or(`city.ilike.%${location}%,state.ilike.%${location}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'name':
          query = query.order('business_name', { ascending: true });
          break;
        case 'price':
          query = query.order('monthly_price', { ascending: true, nullsFirst: false });
          break;
        case 'created_at':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('❌ Error fetching businesses:', fetchError);
        setError(fetchError.message);
        toast.error('Failed to fetch businesses');
        return;
      }

      console.log('✅ Successfully fetched businesses:', data?.length || 0);
      console.log('📊 Fetched business data:', data);
      
      // Ensure we have valid business objects
      const validBusinesses = (data || []).map(business => ({
        ...business,
        amenities: Array.isArray(business.amenities) ? business.amenities : [],
        image_urls: Array.isArray(business.image_urls) ? business.image_urls : [],
        monthly_price: business.monthly_price || undefined,
        session_price: business.session_price || undefined
      }));

      setBusinesses(validBusinesses);
      console.log('🎯 Final filtered results:', validBusinesses.length, 'businesses');
      
      if (validBusinesses.length === 0) {
        console.log('⚠️ No businesses found with current filters');
      }
      
    } catch (err) {
      console.error('💥 Unexpected error:', err);
      setError('An unexpected error occurred');
      toast.error('Failed to load businesses');
    } finally {
      setLoading(false);
    }
  };

  return { businesses, loading, error, refetch: fetchBusinesses };
};
