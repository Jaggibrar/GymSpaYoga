
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  permissions: string[];
  created_at: string;
}

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Only allow access to specific email address
        const allowedAdminEmail = 'jaggibrar001234@gmail.com';
        
        if (user.email?.toLowerCase() === allowedAdminEmail.toLowerCase()) {
          setIsAdmin(true);
          setAdminData({
            id: 'admin-override',
            user_id: user.id,
            role: 'super_admin',
            permissions: ['all'],
            created_at: new Date().toISOString()
          });
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error('Error checking admin status:', err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  return { isAdmin, adminData, loading };
};
