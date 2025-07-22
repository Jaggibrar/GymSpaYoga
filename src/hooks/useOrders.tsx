
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Order {
  id: string;
  user_id: string;
  business_id?: string;
  trainer_id?: string;
  stripe_session_id?: string;
  amount: number;
  currency: string;
  status: string;
  payment_status: string;
  service_type?: string;
  booking_date?: string;
  booking_time?: string;
  duration_minutes?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          setError(error.message);
          console.error('Error fetching orders:', error);
          return;
        }

        setOrders(data || []);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const createOrder = async (orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          ...orderData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .maybeSingle();

      if (error) {
        throw error;
      }

      setOrders(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      console.error('Error creating order:', err);
      return { data: null, error: err };
    }
  };

  const updateOrderStatus = async (orderId: string, status: string, paymentStatus?: string) => {
    try {
      const updateData: any = {
        status,
        updated_at: new Date().toISOString()
      };

      if (paymentStatus) {
        updateData.payment_status = paymentStatus;
      }

      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)
        .select()
        .maybeSingle();

      if (error) {
        throw error;
      }

      setOrders(prev => prev.map(order => 
        order.id === orderId ? data : order
      ));

      return { data, error: null };
    } catch (err) {
      console.error('Error updating order:', err);
      return { data: null, error: err };
    }
  };

  return { 
    orders, 
    loading, 
    error, 
    createOrder, 
    updateOrderStatus 
  };
};
