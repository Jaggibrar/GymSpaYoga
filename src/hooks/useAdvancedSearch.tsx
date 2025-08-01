
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface SearchFilter {
  id: string;
  user_id: string;
  filter_name: string;
  business_type: 'gym' | 'spa' | 'yoga';
  filters: {
    priceRange?: { min: number; max: number };
    amenities?: string[];
    location?: string;
    rating?: number;
    availability?: string[];
    category?: string;
  };
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export const useAdvancedSearch = () => {
  const [savedFilters, setSavedFilters] = useState<SearchFilter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchSavedFilters = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('search_filters')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform database types to our interface types
      const transformedFilters: SearchFilter[] = (data || []).map(filter => ({
        ...filter,
        business_type: filter.business_type as 'gym' | 'spa' | 'yoga',
        filters: filter.filters as SearchFilter['filters']
      }));
      
      setSavedFilters(transformedFilters);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch saved filters';
      setError(errorMessage);
      console.error('Error fetching saved filters:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveFilter = async (filterData: Omit<SearchFilter, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('search_filters')
        .insert([{ ...filterData, user_id: user.id }])
        .select()
        .maybeSingle();

      if (error) throw error;
      
      const transformedFilter: SearchFilter = {
        ...data,
        business_type: data.business_type as 'gym' | 'spa' | 'yoga',
        filters: data.filters as SearchFilter['filters']
      };
      
      setSavedFilters(prev => [transformedFilter, ...prev]);
      toast.success('Search filter saved');
      return transformedFilter;
    } catch (err) {
      console.error('Error saving filter:', err);
      toast.error('Failed to save filter');
      throw err;
    }
  };

  const updateFilter = async (filterId: string, updates: Partial<SearchFilter>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('search_filters')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', filterId)
        .eq('user_id', user.id)
        .select()
        .maybeSingle();

      if (error) throw error;
      
      const transformedFilter: SearchFilter = {
        ...data,
        business_type: data.business_type as 'gym' | 'spa' | 'yoga',
        filters: data.filters as SearchFilter['filters']
      };
      
      setSavedFilters(prev => prev.map(filter => filter.id === filterId ? transformedFilter : filter));
      toast.success('Filter updated');
      return transformedFilter;
    } catch (err) {
      console.error('Error updating filter:', err);
      toast.error('Failed to update filter');
      throw err;
    }
  };

  const deleteFilter = async (filterId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('search_filters')
        .delete()
        .eq('id', filterId)
        .eq('user_id', user.id);

      if (error) throw error;
      setSavedFilters(prev => prev.filter(filter => filter.id !== filterId));
      toast.success('Filter deleted');
    } catch (err) {
      console.error('Error deleting filter:', err);
      toast.error('Failed to delete filter');
      throw err;
    }
  };

  const setDefaultFilter = async (filterId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // First, unset all default filters
      await supabase
        .from('search_filters')
        .update({ is_default: false })
        .eq('user_id', user.id);

      // Then set the new default
      const { data, error } = await supabase
        .from('search_filters')
        .update({ is_default: true })
        .eq('id', filterId)
        .eq('user_id', user.id)
        .select()
        .maybeSingle();

      if (error) throw error;
      setSavedFilters(prev => prev.map(filter => ({
        ...filter,
        is_default: filter.id === filterId
      })));
      toast.success('Default filter updated');
      return data;
    } catch (err) {
      console.error('Error setting default filter:', err);
      toast.error('Failed to set default filter');
      throw err;
    }
  };

  useEffect(() => {
    fetchSavedFilters();
  }, [user?.id]); // Fixed dependency array

  return {
    savedFilters,
    loading,
    error,
    saveFilter,
    updateFilter,
    deleteFilter,
    setDefaultFilter,
    refetch: fetchSavedFilters
  };
};
