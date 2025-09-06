import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ModernChatInterface from "@/components/chat/ModernChatInterface";
import { useChatWithNames as useChat, ChatRoom } from "@/hooks/useChatWithNames";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const { chatRooms, loading, error } = useChat();
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [showChatList, setShowChatList] = useState(true);

  const canonicalUrl = React.useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/chat`;
    }
    return "/chat";
  }, []);

  const handleRoomSelect = (room: ChatRoom) => {
    setSelectedRoom(room);
    setShowChatList(false); // Hide chat list on mobile when room is selected
  };

  const handleBackToList = () => {
    setShowChatList(true);
    setSelectedRoom(null);
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
    <div className="h-screen bg-white">
      <Helmet>
        <title>Chat - GymSpaYoga.com</title>
        <meta name="description" content="Real-time chat with businesses and trainers. Get instant quotes and book services directly through our modern chat interface." />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content="gym chat, spa chat, yoga chat, trainer chat, instant booking, price quotes" />
      </Helmet>

      <div className="flex h-full">
        {/* Desktop: Always show both panels. Mobile: Show conditionally */}
        <div className={`
          w-full md:w-1/3 border-r border-gray-200 
          ${showChatList ? 'block' : 'hidden md:block'}
        `}>
          <ChatSidebar 
            chatRooms={chatRooms}
            selectedRoom={selectedRoom}
            onRoomSelect={handleRoomSelect}
            loading={loading}
            error={error}
          />
        </div>
        
        {/* Chat Window */}
        <div className={`
          w-full md:w-2/3 
          ${showChatList ? 'hidden md:block' : 'block'}
        `}>
          {selectedRoom && (
            <div className="md:hidden flex items-center p-4 border-b border-gray-200 bg-white">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToList}
                className="mr-3"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">Back to Chats</span>
            </div>
          )}
          <ModernChatInterface 
            selectedRoom={selectedRoom}
            onRoomSelect={handleRoomSelect}
            onBackToList={handleBackToList}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
