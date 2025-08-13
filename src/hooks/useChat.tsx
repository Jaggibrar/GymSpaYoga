
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface ChatRoom {
  id: string;
  user_id: string;
  business_id?: string;
  trainer_id?: string;
  room_type: 'business' | 'trainer';
  status: 'active' | 'closed' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  chat_room_id: string;
  sender_id: string;
  message: string;
  message_type: 'text' | 'image' | 'file';
  message_subtype?: 'normal' | 'price_quote' | 'system';
  price_quote?: {
    service: string;
    details?: string;
    amount: number; // stored in paisa (₹1 = 100)
    currency?: 'inr';
  } | null;
  is_read: boolean;
  created_at: string;
}

export const useChat = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchChatRooms = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch rooms where user is the customer
      const { data: userRooms, error: userRoomsError } = await supabase
        .from('chat_rooms')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active');
      if (userRoomsError) throw userRoomsError;

      // Fetch businesses/trainers owned by this user
      const [{ data: myBusinesses }, { data: myTrainers }] = await Promise.all([
        supabase.from('business_profiles').select('id').eq('user_id', user.id),
        supabase.from('trainer_profiles').select('id').eq('user_id', user.id)
      ]);

      // Fetch rooms where user is the owner (business or trainer)
      let ownerRooms: any[] = [];
      const businessIds = (myBusinesses || []).map((b: any) => b.id);
      const trainerIds = (myTrainers || []).map((t: any) => t.id);

      if (businessIds.length > 0) {
        const { data: roomsByBiz, error: roomsByBizError } = await supabase
          .from('chat_rooms')
          .select('*')
          .in('business_id', businessIds)
          .eq('status', 'active');
        if (roomsByBizError) throw roomsByBizError;
        ownerRooms = ownerRooms.concat(roomsByBiz || []);
      }
      if (trainerIds.length > 0) {
        const { data: roomsByTrainer, error: roomsByTrainerError } = await supabase
          .from('chat_rooms')
          .select('*')
          .in('trainer_id', trainerIds)
          .eq('status', 'active');
        if (roomsByTrainerError) throw roomsByTrainerError;
        ownerRooms = ownerRooms.concat(roomsByTrainer || []);
      }

      // Merge and sort rooms
      const allRoomsRaw: any[] = [...(userRooms || []), ...ownerRooms];
      const dedupMap = new Map<string, any>();
      for (const r of allRoomsRaw) dedupMap.set(r.id, r);
      const merged = Array.from(dedupMap.values()).sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );

      const transformedRooms: ChatRoom[] = merged.map((room: any) => ({
        id: room.id,
        user_id: room.user_id,
        business_id: room.business_id || undefined,
        trainer_id: room.trainer_id || undefined,
        room_type: room.room_type as 'business' | 'trainer',
        status: room.status as 'active' | 'closed' | 'archived',
        created_at: room.created_at,
        updated_at: room.updated_at
      }));

      setChatRooms(transformedRooms);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch chat rooms';
      setError(errorMessage);
      console.error('Error fetching chat rooms:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const fetchMessages = async (chatRoomId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_room_id', chatRoomId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      const transformedMessages: ChatMessage[] = (data || []).map((m: any) => ({
        id: m.id,
        chat_room_id: m.chat_room_id,
        sender_id: m.sender_id,
        message: m.message,
        message_type: m.message_type as 'text' | 'image' | 'file',
        message_subtype: m.message_subtype as 'normal' | 'price_quote' | 'system' | undefined,
        price_quote: (m.price_quote as any) ?? null,
        is_read: !!m.is_read,
        created_at: m.created_at
      }));
      
      setMessages(transformedMessages);
    } catch (err) {
      console.error('Error fetching messages:', err);
      toast.error('Failed to fetch messages');
    }
  };

  const markMessagesRead = async (chatRoomId: string) => {
    if (!user) return;
    try {
      // Mark all incoming messages as read
      const { error } = await supabase
        .from('chat_messages')
        .update({ is_read: true })
        .eq('chat_room_id', chatRoomId)
        .neq('sender_id', user.id);
      if (error) throw error;
    } catch (err) {
      console.error('Error marking messages read:', err);
    }
  };

  const createChatRoom = async (businessId?: string, trainerId?: string) => {
    if (!user) throw new Error('User not authenticated');
    if (!businessId && !trainerId) throw new Error('Either business or trainer ID required');

    try {
      const roomData = {
        user_id: user.id,
        business_id: businessId,
        trainer_id: trainerId,
        room_type: businessId ? 'business' as const : 'trainer' as const,
        status: 'active' as const
      };

      const { data, error } = await supabase
        .from('chat_rooms')
        .insert([roomData])
        .select()
        .maybeSingle();

      if (error) throw error;
      
      const transformedRoom: ChatRoom = {
        ...data,
        room_type: data.room_type as 'business' | 'trainer',
        status: data.status as 'active' | 'closed' | 'archived'
      };
      
      setChatRooms(prev => [transformedRoom, ...prev]);
      toast.success('Chat room created');
      return transformedRoom;
    } catch (err) {
      console.error('Error creating chat room:', err);
      toast.error('Failed to create chat room');
      throw err;
    }
  };

  const sendMessage = async (chatRoomId: string, message: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const messageData = {
        chat_room_id: chatRoomId,
        sender_id: user.id,
        message,
        message_type: 'text' as const
      };

      const { data, error } = await supabase
        .from('chat_messages')
        .insert([messageData])
        .select()
        .maybeSingle();

      if (error) throw error;
      
      const m: any = data;
      const transformedMessage: ChatMessage = {
        id: m.id,
        chat_room_id: m.chat_room_id,
        sender_id: m.sender_id,
        message: m.message,
        message_type: m.message_type as 'text' | 'image' | 'file',
        message_subtype: m.message_subtype as 'normal' | 'price_quote' | 'system' | undefined,
        price_quote: (m.price_quote as any) ?? null,
        is_read: !!m.is_read,
        created_at: m.created_at
      };
      
      setMessages(prev => [...prev, transformedMessage]);
      return transformedMessage;
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error('Failed to send message');
      throw err;
    }
  };

  const sendPriceQuote = async (
    chatRoomId: string,
    quote: { service: string; details?: string; amount: number; currency?: 'inr' }
  ) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([
          {
            chat_room_id: chatRoomId,
            sender_id: user.id,
            message: `Price quote: ₹${(quote.amount / 100).toFixed(2)} for ${quote.service}`,
            message_type: 'text',
            message_subtype: 'price_quote',
            price_quote: { ...quote, currency: 'inr' }
          }
        ])
        .select()
        .maybeSingle();

      if (error) throw error;

      const m: any = data;
      const transformedMessage: ChatMessage = {
        id: m.id,
        chat_room_id: m.chat_room_id,
        sender_id: m.sender_id,
        message: m.message,
        message_type: m.message_type as 'text' | 'image' | 'file',
        message_subtype: m.message_subtype as 'normal' | 'price_quote' | 'system' | undefined,
        price_quote: (m.price_quote as any) ?? null,
        is_read: !!m.is_read,
        created_at: m.created_at
      };
      setMessages(prev => [...prev, transformedMessage]);
      toast.success('Price quote sent');
      return transformedMessage;
    } catch (err) {
      console.error('Error sending price quote:', err);
      toast.error('Failed to send price quote');
      throw err;
    }
  };

  const confirmBooking = async (
    room: ChatRoom,
    priceMessage: ChatMessage
  ) => {
    if (!user) throw new Error('User not authenticated');
    if (priceMessage.message_subtype !== 'price_quote' || !priceMessage.price_quote) {
      throw new Error('Invalid price quote message');
    }

    try {
      const { data, error } = await supabase.rpc('create_chat_booking', {
        p_chat_room_id: room.id,
        p_customer_id: user.id,
        p_business_id: room.business_id ?? null,
        p_trainer_id: room.trainer_id ?? null,
        p_message_id: priceMessage.id,
        p_service_details: priceMessage.price_quote as any,
        p_price_amount: priceMessage.price_quote.amount
      });
      if (error) throw error;
      toast.success('Booking confirmed');
      return data as string; // booking id
    } catch (err) {
      console.error('Error confirming booking:', err);
      toast.error('Failed to confirm booking');
      throw err;
    }
  };

  const subscribeToMessages = useCallback((chatRoomId: string) => {
    const channel = supabase
      .channel(`chat-room-${chatRoomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `chat_room_id=eq.${chatRoomId}`
        },
        (payload) => {
          const m: any = payload.new;
          const transformedMessage: ChatMessage = {
            id: m.id,
            chat_room_id: m.chat_room_id,
            sender_id: m.sender_id,
            message: m.message,
            message_type: m.message_type as 'text' | 'image' | 'file',
            message_subtype: m.message_subtype as 'normal' | 'price_quote' | 'system' | undefined,
            price_quote: (m.price_quote as any) ?? null,
            is_read: !!m.is_read,
            created_at: m.created_at
          };
          setMessages(prev => [...prev, transformedMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    fetchChatRooms();
  }, [fetchChatRooms]);

  return {
    chatRooms,
    messages,
    loading,
    error,
    createChatRoom,
    sendMessage,
    sendPriceQuote,
    confirmBooking,
    fetchMessages,
    subscribeToMessages,
    markMessagesRead,
    refetch: fetchChatRooms
  };
};
