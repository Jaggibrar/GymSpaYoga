import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ModernChatInterface from "@/components/chat/ModernChatInterface";
import { useChatWithNames as useChat, ChatRoom } from "@/hooks/useChatWithNames";
import { toast } from "sonner";

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const { chatRooms, loading, error } = useChat();
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);

  const canonicalUrl = React.useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/chat`;
    }
    return "/chat";
  }, []);

  const handleRoomSelect = (room: ChatRoom) => {
    setSelectedRoom(room);
  };

  // Update online status
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        await supabase.rpc('update_owner_status', { p_user_id: user.id, p_is_online: true });
      } catch (e) { 
        console.error('Failed to set online status', e); 
      }
    })();
    return () => {
      (async () => {
        try {
          await supabase.rpc('update_owner_status', { p_user_id: user.id, p_is_online: false });
        } catch (e) { 
          console.error('Failed to set offline status', e); 
        }
      })();
    };
  }, [user?.id]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <Helmet>
        <title>Modern Chat - GymSpaYoga.com</title>
        <meta name="description" content="Real-time chat with businesses and trainers. Get instant quotes and book services directly through our modern chat interface." />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content="gym chat, spa chat, yoga chat, trainer chat, instant booking, price quotes" />
      </Helmet>

      <div className="flex h-screen">
        <ChatSidebar 
          chatRooms={chatRooms}
          selectedRoom={selectedRoom}
          onRoomSelect={handleRoomSelect}
          loading={loading}
          error={error}
        />
        <div className="flex-1 flex">
          <ModernChatInterface 
            selectedRoom={selectedRoom}
            onRoomSelect={handleRoomSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
