import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  MessageCircle,
  Briefcase,
  User
} from "lucide-react";
import { ChatRoom } from "@/hooks/useChatWithNames";
import { cn } from "@/lib/utils";
import ErrorBoundary from "@/components/ErrorBoundary";

interface ChatSidebarProps {
  chatRooms: ChatRoom[];
  selectedRoom: ChatRoom | null;
  onRoomSelect: (room: ChatRoom) => void;
  loading: boolean;
  error: string | null;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chatRooms,
  selectedRoom,
  onRoomSelect,
  loading,
  error
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter rooms based on search
  const filteredRooms = chatRooms.filter(room => {
    return !searchQuery || 
      (room.other_party_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       room.last_message?.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const formatLastUpdated = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getInitials = (name: string | null | undefined, roomType: string) => {
    if (name) return name.charAt(0).toUpperCase();
    return roomType === 'business' ? 'B' : 'T';
  };

  return (
    <ErrorBoundary>
      <div className="h-full bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Chats</h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-100 border-0 rounded-lg"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          {loading ? (
            <div className="p-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center p-3 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-3" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="text-gray-500 mb-4">
                <MessageCircle className="h-12 w-12 mx-auto mb-2" />
                <p>No chats yet</p>
              </div>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-500 mb-4">
                <MessageCircle className="h-12 w-12 mx-auto mb-2" />
                <p>{searchQuery ? 'No matching conversations' : 'No chats yet'}</p>
                <p className="text-sm mt-2">
                  {searchQuery 
                    ? 'Try different search terms'
                    : 'Start chatting with businesses and trainers'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div>
              {filteredRooms.map((room) => {
                const isSelected = selectedRoom?.id === room.id;
                const unreadCount = room.unread_count || 0;
                
                return (
                  <ErrorBoundary key={room.id}>
                    <button
                      onClick={() => onRoomSelect(room)}
                      className={cn(
                        "w-full p-3 flex items-center hover:bg-gray-50 transition-colors border-b border-gray-100",
                        isSelected && "bg-blue-50"
                      )}
                    >
                      {/* Profile Picture */}
                      <div className="relative mr-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={room.other_party_avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gray-300 text-gray-700">
                            {getInitials(room.other_party_name, room.room_type)}
                          </AvatarFallback>
                        </Avatar>
                        {/* Online indicator */}
                        {room.other_party_online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0 text-left">
                        {/* Name and Timestamp */}
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900 truncate">
                            {room.other_party_name || (room.room_type === 'business' ? 'Business' : 'Trainer')}
                          </h3>
                          <span className="text-xs text-gray-500 ml-2">
                            {formatLastUpdated(room.last_message_time || room.updated_at)}
                          </span>
                        </div>
                        
                        {/* Last Message and Unread Badge */}
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">
                            {room.last_message || 'Start a conversation'}
                          </p>
                          {unreadCount > 0 && (
                            <div className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium ml-2">
                              {unreadCount > 9 ? '9+' : unreadCount}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </ErrorBoundary>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>
    </ErrorBoundary>
  );
};

export default ChatSidebar;