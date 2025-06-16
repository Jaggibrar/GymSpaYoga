
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
      let query = supabase
        .from('business_profiles')
        .select('*');

      // First, let's check all businesses regardless of status for debugging
      const { data: allBusinesses, error: allError } = await supabase
        .from('business_profiles')
        .select('business_type, status, business_name')
        .order('created_at', { ascending: false });
      
      console.log('📋 All businesses in database:', allBusinesses);
      console.log('🏋️ Gym businesses:', allBusinesses?.filter(b => b.business_type === 'gym'));
      console.log('✅ Approved businesses:', allBusinesses?.filter(b => b.status === 'approved'));

      // Now apply the approved filter
      query = query.eq('status', 'approved');

      // Apply category filter
      if (category && category !== 'all') {
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
        if (category === 'gym') {
          console.log('🏋️ Specifically no approved gyms found');
        }
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
