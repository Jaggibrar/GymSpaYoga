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
  // Enhanced with names and details
  customer_name?: string;
  customer_avatar?: string;
  business_name?: string;
  trainer_name?: string;
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

  // Fetch enriched chat rooms with names
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
        .select(`
          *,
          business_profiles!business_id (
            id,
            business_name,
            image_urls
          ),
          trainer_profiles!trainer_id (
            id,
            name,
            profile_image_url
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'active');

      if (userRoomsError) throw userRoomsError;

      // Fetch businesses/trainers owned by this user
      const [{ data: myBusinesses }, { data: myTrainers }] = await Promise.all([
        supabase.from('business_profiles').select('id').eq('user_id', user.id),
        supabase.from('trainer_profiles').select('id').eq('user_id', user.id)
      ]);

      // Fetch rooms where user is the owner
      let ownerRooms: any[] = [];
      const businessIds = (myBusinesses || []).map((b: any) => b.id);
      const trainerIds = (myTrainers || []).map((t: any) => t.id);

      if (businessIds.length > 0) {
        const { data: roomsByBiz, error: roomsByBizError } = await supabase
          .from('chat_rooms')
          .select(`
            *,
            user_profiles!user_id (
              id,
              full_name,
              avatar_url
            )
          `)
          .in('business_id', businessIds)
          .eq('status', 'active');

        if (roomsByBizError) throw roomsByBizError;
        ownerRooms = ownerRooms.concat(roomsByBiz || []);
      }

      if (trainerIds.length > 0) {
        const { data: roomsByTrainer, error: roomsByTrainerError } = await supabase
          .from('chat_rooms')
          .select(`
            *,
            user_profiles!user_id (
              id,
              full_name,
              avatar_url
            )
          `)
          .in('trainer_id', trainerIds)
          .eq('status', 'active');

        if (roomsByTrainerError) throw roomsByTrainerError;
        ownerRooms = ownerRooms.concat(roomsByTrainer || []);
      }

      // Get last messages and unread counts for all rooms
      const allRoomsRaw = [...(userRooms || []), ...ownerRooms];
      const roomIds = allRoomsRaw.map(room => room.id);

      let lastMessages: any[] = [];
      let unreadCounts: any[] = [];

      if (roomIds.length > 0) {
        // Get last message for each room
        const { data: lastMsgs } = await supabase
          .from('chat_messages')
          .select('chat_room_id, message, created_at')
          .in('chat_room_id', roomIds)
          .order('created_at', { ascending: false });

        lastMessages = lastMsgs || [];

        // Get unread counts
        const { data: unreadData } = await supabase
          .from('chat_messages')
          .select('chat_room_id, id')
          .in('chat_room_id', roomIds)
          .eq('is_read', false)
          .neq('sender_id', user.id);

        unreadCounts = unreadData || [];
      }

      // Transform and enrich rooms
      const enrichedRooms: ChatRoom[] = allRoomsRaw.map((room: any) => {
        const isOwner = user.id !== room.user_id;
        const lastMsg = lastMessages.find(m => m.chat_room_id === room.id);
        const unreadCount = unreadCounts.filter(m => m.chat_room_id === room.id).length;

        let otherPartyName = '';
        let otherPartyAvatar = '';

        if (isOwner) {
          // User is business/trainer owner, show customer name
          otherPartyName = room.user_profiles?.full_name || 'Customer';
          otherPartyAvatar = room.user_profiles?.avatar_url;
        } else {
          // User is customer, show business/trainer name
          if (room.room_type === 'business') {
            otherPartyName = room.business_profiles?.business_name || 'Business';
            otherPartyAvatar = room.business_profiles?.image_urls?.[0];
          } else {
            otherPartyName = room.trainer_profiles?.name || 'Trainer';
            otherPartyAvatar = room.trainer_profiles?.profile_image_url;
          }
        }

        return {
          id: room.id,
          user_id: room.user_id,
          business_id: room.business_id || undefined,
          trainer_id: room.trainer_id || undefined,
          room_type: room.room_type as 'business' | 'trainer',
          status: room.status as 'active' | 'closed' | 'archived',
          created_at: room.created_at,
          updated_at: room.updated_at,
          other_party_name: otherPartyName,
          other_party_avatar: otherPartyAvatar,
          unread_count: unreadCount,
          last_message: lastMsg?.message || '',
          last_message_time: lastMsg?.created_at || room.updated_at
        };
      });

      // Sort by last message time
      enrichedRooms.sort((a, b) => 
        new Date(b.last_message_time || b.updated_at).getTime() - 
        new Date(a.last_message_time || a.updated_at).getTime()
      );

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
        .order('created_at', { ascending: true });

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
      const messageData = {
        chat_room_id: chatRoomId,
        sender_id: user.id,
        message,
        message_type: 'text' as const
      };

      const { data, error } = await supabase
        .from('chat_messages')
        .insert([messageData])
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
      
      // Update room's last message
      await supabase
        .from('chat_rooms')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', chatRoomId);
        
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

  const markMessagesRead = async (chatRoomId: string) => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('chat_messages')
        .update({ is_read: true })
        .eq('chat_room_id', chatRoomId)
        .neq('sender_id', user.id);
      if (error) throw error;
      
      // Update local state
      setMessages(prev => prev.map(msg => 
        msg.chat_room_id === chatRoomId && msg.sender_id !== user.id 
          ? { ...msg, is_read: true }
          : msg
      ));
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
      
      // Refresh chat rooms to get the new one with names
      await fetchChatRooms();
      toast.success('Chat room created');
      return data;
    } catch (err) {
      console.error('Error creating chat room:', err);
      toast.error('Failed to create chat room');
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

  // Real-time subscriptions with enhanced message handling
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
          
          // Fetch sender details for the new message
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
            // Avoid duplicates
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
  }, []);

  // Subscribe to typing indicators
  const subscribeToTyping = useCallback((chatRoomId: string) => {
    const channel = supabase
      .channel(`typing-${chatRoomId}`)
      .on('broadcast', { event: 'typing' }, (payload) => {
        const { user_id, user_name, is_typing } = payload.payload;
        
        setTypingUsers(prev => {
          const newState = { ...prev };
          if (is_typing) {
            newState[user_id] = user_name;
          } else {
            delete newState[user_id];
          }
          return newState;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const broadcastTyping = useCallback((chatRoomId: string, isTyping: boolean) => {
    if (!user) return;
    
    supabase
      .channel(`typing-${chatRoomId}`)
      .send({
        type: 'broadcast',
        event: 'typing',
        payload: {
          user_id: user.id,
          user_name: user.user_metadata?.full_name || user.email,
          is_typing: isTyping
        }
      });
  }, [user]);

  useEffect(() => {
    fetchChatRooms();
  }, [fetchChatRooms]);

  return {
    chatRooms,
    messages,
    loading,
    error,
    typingUsers,
    createChatRoom,
    sendMessage,
    sendPriceQuote,
    confirmBooking,
    fetchMessages,
    subscribeToMessages,
    subscribeToTyping,
    broadcastTyping,
    markMessagesRead,
    refetch: fetchChatRooms
  };
};