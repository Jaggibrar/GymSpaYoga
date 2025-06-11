
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  pin_code?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  preferences?: any;
  created_at: string;
  updated_at: string;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Direct query to user_profiles table with type assertion
        const { data, error } = await supabase
          .from('user_profiles' as any)
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          setError(error.message);
          console.error('Error fetching profile:', error);
          return;
        }

        if (data) {
          setProfile(data as UserProfile);
        }
      } catch (err) {
        setError('Failed to fetch profile');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      toast.error('User not authenticated');
      return false;
    }

    try {
      // Use type assertion for raw SQL upsert
      const { data, error } = await supabase
        .from('user_profiles' as any)
        .upsert({
          user_id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile(data as UserProfile);
      }
      toast.success('Profile updated successfully!');
      return true;
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile');
      return false;
    }
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!user) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, { upsert: true });
      
      if (uploadError) {
        throw uploadError;
      }
      
      const { data } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);
      
      return data.publicUrl;
    } catch (err) {
      console.error('Error uploading avatar:', err);
      toast.error('Failed to upload avatar');
      return null;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    uploadAvatar
  };
};
