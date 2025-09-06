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
  other_party_name?: string;
  other_party_avatar?: string;
  other_party_online?: boolean;
  unread_count?: number;
  last_message?: string;
  last_message_time?: string;
}

export interface ChatMessage {
  id: string;
  chat_room_id: string;
  sender_id: string;
  sender_name?: string;
  sender_avatar?: string;
  message: string;
  message_type: 'text' | 'image' | 'file';
  message_subtype?: 'normal' | 'price_quote' | 'system';
  price_quote?: {
    service: string;
    details?: string;
    amount: number;
    currency?: 'inr';
  } | null;
  is_read: boolean;
  created_at: string;
}

export const useChatWithNames = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<Record<string, string>>({});
  const { user } = useAuth();

  // Helper function to get user's business IDs
  const getUserBusinessIds = async (): Promise<string> => {
    if (!user) return '';
    try {
      const { data } = await supabase
        .from('business_profiles')
        .select('id')
        .eq('user_id', user.id);
      return (data || []).map(b => b.id).join(',') || 'none';
    } catch {
      return 'none';
    }
  };

  // Helper function to get user's trainer IDs
  const getUserTrainerIds = async (): Promise<string> => {
    if (!user) return '';
    try {
      const { data } = await supabase
        .from('trainer_profiles')
        .select('id')
        .eq('user_id', user.id);
      return (data || []).map(t => t.id).join(',') || 'none';
    } catch {
      return 'none';
    }
  };

  // Simplified fetch for better performance
  const fetchChatRooms = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Get basic rooms first
      const { data: rooms, error: roomsError } = await supabase
        .from('chat_rooms')
        .select('*')
        .eq('status', 'active')
        .limit(20);

      if (roomsError) throw roomsError;

      // Filter and transform rooms
      const userRooms = (rooms || []).filter(room => 
        room.user_id === user.id || 
        // Add owner filtering logic here if needed
        false
      );

      const enrichedRooms: ChatRoom[] = userRooms.map((room: any) => ({
        id: room.id,
        user_id: room.user_id,
        business_id: room.business_id || undefined,
        trainer_id: room.trainer_id || undefined,
        room_type: room.room_type as 'business' | 'trainer',
        status: room.status as 'active' | 'closed' | 'archived',
        created_at: room.created_at,
        updated_at: room.updated_at,
        other_party_name: room.room_type === 'business' ? 'Business' : 'Trainer',
        other_party_online: false,
        unread_count: 0,
        last_message: '',
        last_message_time: room.updated_at
      }));

      setChatRooms(enrichedRooms);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch chat rooms';
      setError(errorMessage);
      console.error('Error fetching chat rooms:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Fetch messages with sender names
  const fetchMessages = async (chatRoomId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          user_profiles!sender_id (
            full_name,
            avatar_url
          )
        `)
        .eq('chat_room_id', chatRoomId)
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;
      
      const transformedMessages: ChatMessage[] = (data || []).map((m: any) => ({
        id: m.id,
        chat_room_id: m.chat_room_id,
        sender_id: m.sender_id,
        sender_name: m.user_profiles?.full_name || 'Unknown User',
        sender_avatar: m.user_profiles?.avatar_url,
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

  const sendMessage = async (chatRoomId: string, message: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{
          chat_room_id: chatRoomId,
          sender_id: user.id,
          message,
          message_type: 'text' as const
        }])
        .select(`
          *,
          user_profiles!sender_id (
            full_name,
            avatar_url
          )
        `)
        .maybeSingle();

      if (error) throw error;
      
      const m: any = data;
      const transformedMessage: ChatMessage = {
        id: m.id,
        chat_room_id: m.chat_room_id,
        sender_id: m.sender_id,
        sender_name: m.user_profiles?.full_name || 'You',
        sender_avatar: m.user_profiles?.avatar_url,
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
        .insert([{
          chat_room_id: chatRoomId,
          sender_id: user.id,
          message: `Price quote: ₹${(quote.amount / 100).toFixed(2)} for ${quote.service}`,
          message_type: 'text',
          message_subtype: 'price_quote',
          price_quote: { ...quote, currency: 'inr' }
        }])
        .select(`
          *,
          user_profiles!sender_id (
            full_name,
            avatar_url
          )
        `)
        .maybeSingle();

      if (error) throw error;

      const m: any = data;
      const transformedMessage: ChatMessage = {
        id: m.id,
        chat_room_id: m.chat_room_id,
        sender_id: m.sender_id,
        sender_name: m.user_profiles?.full_name || 'You',
        sender_avatar: m.user_profiles?.avatar_url,
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

  const confirmBooking = async (room: ChatRoom, priceMessage: ChatMessage) => {
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
      return data as string;
    } catch (err) {
      console.error('Error confirming booking:', err);
      toast.error('Failed to confirm booking');
      throw err;
    }
  };

  const markMessagesRead = async (chatRoomId: string) => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('chat_messages')
        .update({ is_read: true })
        .eq('chat_room_id', chatRoomId)
        .neq('sender_id', user.id);
      if (error) throw error;
      
      setMessages(prev => prev.map(msg => 
        msg.chat_room_id === chatRoomId && msg.sender_id !== user.id 
          ? { ...msg, is_read: true }
          : msg
      ));
    } catch (err) {
      console.error('Error marking messages read:', err);
    }
  };

  const subscribeToTyping = useCallback((chatRoomId: string) => {
    // Simplified typing subscription
    const channel = supabase
      .channel(`typing-${chatRoomId}`)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const broadcastTyping = async (chatRoomId: string, isTyping: boolean) => {
    // Simplified typing broadcast
    if (!user) return;
    try {
      await supabase
        .channel(`typing-${chatRoomId}`)
        .send({
          type: 'broadcast',
          event: 'typing',
          payload: { user_id: user.id, is_typing: isTyping }
        });
    } catch (err) {
      console.error('Error broadcasting typing:', err);
    }
  };

  const createChatRoom = async (businessId?: string, trainerId?: string) => {
    if (!user) throw new Error('User not authenticated');
    if (!businessId && !trainerId) throw new Error('Either business or trainer ID required');

    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .insert([{
          user_id: user.id,
          business_id: businessId,
          trainer_id: trainerId,
          room_type: businessId ? 'business' as const : 'trainer' as const,
          status: 'active' as const
        }])
        .select()
        .maybeSingle();

      if (error) throw error;
      
      await fetchChatRooms();
      toast.success('Chat room created');
      return data;
    } catch (err) {
      console.error('Error creating chat room:', err);
      toast.error('Failed to create chat room');
      throw err;
    }
  };

  // Real-time subscriptions
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
        async (payload) => {
          const m: any = payload.new;
          
          // Don't add messages from current user (already added optimistically)
          if (m.sender_id === user?.id) return;

          const { data: senderData } = await supabase
            .from('user_profiles')
            .select('full_name, avatar_url')
            .eq('user_id', m.sender_id)
            .maybeSingle();

          const transformedMessage: ChatMessage = {
            id: m.id,
            chat_room_id: m.chat_room_id,
            sender_id: m.sender_id,
            sender_name: senderData?.full_name || 'Unknown User',
            sender_avatar: senderData?.avatar_url,
            message: m.message,
            message_type: m.message_type as 'text' | 'image' | 'file',
            message_subtype: m.message_subtype as 'normal' | 'price_quote' | 'system' | undefined,
            price_quote: (m.price_quote as any) ?? null,
            is_read: !!m.is_read,
            created_at: m.created_at
          };
          
          setMessages(prev => {
            if (prev.some(msg => msg.id === transformedMessage.id)) {
              return prev;
            }
            return [...prev, transformedMessage];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  // Load chat rooms on mount
  useEffect(() => {
    fetchChatRooms();
  }, [fetchChatRooms]);

  return {
    chatRooms,
    messages,
    loading,
    error,
    typingUsers,
    fetchMessages,
    sendMessage,
    sendPriceQuote,
    confirmBooking,
    markMessagesRead,
    subscribeToTyping,
    broadcastTyping,
    createChatRoom,
    subscribeToMessages,
    refetch: fetchChatRooms
  };
};