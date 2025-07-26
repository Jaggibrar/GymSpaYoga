import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface FavoriteItem {
  id: string;
  business_id: string;
  user_id: string;
  created_at: string;
  business_name?: string;
  business_type?: string;
  city?: string;
  state?: string;
  image_urls?: string[];
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  isLoading: boolean;
  isFavorite: (businessId: string) => boolean;
  addToFavorites: (businessId: string) => Promise<void>;
  removeFromFavorites: (businessId: string) => Promise<void>;
  toggleFavorite: (businessId: string) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  

  // Load favorites when user changes
  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites([]);
      setIsLoading(false);
    }
  }, [user]);

  const loadFavorites = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_wishlist')
        .select(`
          *,
          business_profiles!user_wishlist_business_id_fkey (
            business_name,
            business_type,
            city,
            state,
            image_urls
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedFavorites = data?.map(item => {
        const business = item.business_profiles as any;
        return {
          ...item,
          business_name: business?.business_name,
          business_type: business?.business_type,
          city: business?.city,
          state: business?.state,
          image_urls: business?.image_urls,
        };
      }) || [];

      setFavorites(formattedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setIsLoading(false);
    }
  };

  const isFavorite = (businessId: string): boolean => {
    return favorites.some(fav => fav.business_id === businessId);
  };

  const addToFavorites = async (businessId: string) => {
    if (!user) {
      toast.error('Please sign in to add favorites');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_wishlist')
        .insert({
          user_id: user.id,
          business_id: businessId,
        })
        .select()
        .maybeSingle();

      if (error) throw error;

      // Get business details
      const { data: businessData } = await supabase
        .from('business_profiles')
        .select('business_name, business_type, city, state, image_urls')
        .eq('id', businessId)
        .maybeSingle();

      const newFavorite: FavoriteItem = {
        ...data,
        business_name: businessData?.business_name,
        business_type: businessData?.business_type,
        city: businessData?.city,
        state: businessData?.state,
        image_urls: businessData?.image_urls,
      };

      setFavorites(prev => [...prev, newFavorite]);
      
      toast.success('Added to favorites');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast.error('Failed to add to favorites');
    }
  };

  const removeFromFavorites = async (businessId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('business_id', businessId);

      if (error) throw error;

      setFavorites(prev => prev.filter(fav => fav.business_id !== businessId));
      
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast.error('Failed to remove from favorites');
    }
  };

  const toggleFavorite = async (businessId: string) => {
    if (isFavorite(businessId)) {
      await removeFromFavorites(businessId);
    } else {
      await addToFavorites(businessId);
    }
  };

  const value: FavoritesContextType = {
    favorites,
    isLoading,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;