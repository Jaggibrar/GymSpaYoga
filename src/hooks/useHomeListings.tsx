import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

export interface HomeListing {
  id: string;
  slug?: string | null;
  business_name: string;
  business_type: string;
  category?: string | null;
  city: string;
  state: string;
  address?: string | null;
  image_urls: string[] | null;
  monthly_price?: number | null;
  session_price?: number | null;
  amenities?: string[] | null;
}

const FALLBACK: HomeListing[] = [
  { id: 'f1', business_name: 'Cult Fit Salt Lake', business_type: 'gym', city: 'Kolkata', state: 'West Bengal', address: 'Salt Lake', image_urls: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80'], monthly_price: 2999 },
  { id: 'f2', business_name: 'Yoga House', business_type: 'yoga', city: 'Kolkata', state: 'West Bengal', address: 'Ballygunge', image_urls: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80'], monthly_price: 1499 },
  { id: 'f3', business_name: 'O2 Spa', business_type: 'spa', city: 'Kolkata', state: 'West Bengal', address: 'Park Street', image_urls: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80'], session_price: 2199 },
  { id: 'f4', business_name: 'FitFlex Gym', business_type: 'gym', city: 'Kolkata', state: 'West Bengal', address: 'New Alipore', image_urls: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80'], monthly_price: 2499 },
  { id: 'f5', business_name: 'Revive Physiotherapy', business_type: 'therapist', city: 'Kolkata', state: 'West Bengal', address: 'Gariahat', image_urls: ['https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=900&q=80'], session_price: 800 },
  { id: 'f6', business_name: 'Serenity Spa & Wellness', business_type: 'spa', city: 'Bangalore', state: 'Karnataka', address: 'Indiranagar', image_urls: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80'], session_price: 1200 },
];

export const useHomeListings = (limit = 8) => {
  const [listings, setListings] = useState<HomeListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('public_business_listings')
          .select('id, slug, business_name, business_type, category, city, state, address, image_urls, monthly_price, session_price, amenities')
          .order('created_at', { ascending: false })
          .limit(limit);
        if (error) throw error;
        if (!active) return;
        setListings(data && data.length ? (data as HomeListing[]) : FALLBACK);
      } catch (e) {
        logger.error('Home listings fetch failed', e);
        if (active) setListings(FALLBACK);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [limit]);

  return { listings, loading };
};
