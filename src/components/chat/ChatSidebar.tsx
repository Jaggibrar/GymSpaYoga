import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  MessageCircle,
  Briefcase,
  User,
  Dumbbell,
  Flower2,
  Waves
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
    if (name && name !== 'Unknown Business' && name !== 'Unknown Trainer') {
      return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2);
    }
    return roomType === 'business' ? 'B' : 'T';
  };

  const getCategoryBadge = (category: string | undefined, businessType: string | undefined) => {
    const type = category || businessType || '';
    const badgeColor = {
      'gym': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'spa': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300', 
      'yoga': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'trainer': 'bg-primary/10 text-primary dark:bg-primary/20',
      'business': 'bg-muted text-muted-foreground'
    };
    
    const displayType = type.toLowerCase();
    const color = badgeColor[displayType as keyof typeof badgeColor] || badgeColor.business;
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full font-medium ${color}`}>
        {displayType === 'trainer' ? 'Trainer' : type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  const getCategoryIcon = (category: string | undefined, businessType: string | undefined) => {
    const type = (category || businessType || '').toLowerCase();
    const iconProps = { className: "h-4 w-4", strokeWidth: 2 };
    
    switch (type) {
      case 'gym':
        return <Dumbbell {...iconProps} />;
      case 'spa':
        return <Flower2 {...iconProps} />;
      case 'yoga':
        return <Waves {...iconProps} />;
      case 'trainer':
        return <User {...iconProps} />;
      default:
        return <Briefcase {...iconProps} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="h-full bg-background flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border bg-card">
          <h1 className="text-xl font-semibold text-foreground mb-4">Chats</h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted border-0 rounded-lg text-foreground"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          {loading ? (
            <div className="p-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center p-3 animate-pulse">
                  <div className="w-12 h-12 bg-muted rounded-full mr-3" />
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
                <p className="text-destructive font-medium mb-2">⚠️ Unable to load chats</p>
                <p className="text-destructive/80 text-sm">{error}</p>
                <p className="text-destructive/60 text-xs mt-2">Please check your connection and try again</p>
              </div>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-muted-foreground mb-4">
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
                        "w-full p-3 flex items-center hover:bg-accent/50 transition-colors border-b border-border",
                        isSelected && "bg-accent border-l-4 border-l-primary"
                      )}
                    >
                      {/* Profile Picture */}
                      <div className="relative mr-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={room.other_party_avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-muted text-muted-foreground">
                            {getInitials(room.other_party_name, room.room_type)}
                          </AvatarFallback>
                        </Avatar>
                        {/* Online indicator */}
                        {room.other_party_online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0 text-left">
                        {/* Name, Category and Timestamp */}
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="flex items-center gap-1">
                              {getCategoryIcon(room.other_party_category, room.business_type)}
                              <h3 className="font-medium text-foreground truncate">
                                {room.other_party_name || (room.room_type === 'business' ? 'Business' : 'Trainer')}
                              </h3>
                            </div>
                            {getCategoryBadge(room.other_party_category, room.business_type)}
                          </div>
                          <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                            {formatLastUpdated(room.last_message_time || room.updated_at)}
                          </span>
                        </div>
                        
                        {/* Last Message and Unread Badge */}
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">
                            {room.last_message || 'Start a conversation'}
                          </p>
                          {unreadCount > 0 && (
                            <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium ml-2">
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
