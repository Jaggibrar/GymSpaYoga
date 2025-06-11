
import { useState, useEffect } from 'react';
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
  is_read: boolean;
  created_at: string;
}

export const useChat = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchChatRooms = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setChatRooms(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch chat rooms';
      setError(errorMessage);
      console.error('Error fetching chat rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (chatRoomId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_room_id', chatRoomId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
      toast.error('Failed to fetch messages');
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
        .single();

      if (error) throw error;
      setChatRooms(prev => [data, ...prev]);
      toast.success('Chat room created');
      return data;
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
        .single();

      if (error) throw error;
      setMessages(prev => [...prev, data]);
      return data;
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error('Failed to send message');
      throw err;
    }
  };

  const subscribeToMessages = (chatRoomId: string) => {
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
          setMessages(prev => [...prev, payload.new as ChatMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  useEffect(() => {
    fetchChatRooms();
  }, [user]);

  return {
    chatRooms,
    messages,
    loading,
    error,
    createChatRoom,
    sendMessage,
    fetchMessages,
    subscribeToMessages,
    refetch: fetchChatRooms
  };
};
