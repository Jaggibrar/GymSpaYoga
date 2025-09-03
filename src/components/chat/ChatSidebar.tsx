import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  MessageCircle, 
  Users, 
  Settings,
  Briefcase,
  User,
  Clock,
  Star
} from "lucide-react";
import { ChatRoom } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

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
  const [activeTab, setActiveTab] = useState<'all' | 'business' | 'trainer'>('all');

  // Filter rooms based on search and tab
  const filteredRooms = chatRooms.filter(room => {
    const matchesSearch = true; // We'll implement search later when we have room details
    const matchesTab = activeTab === 'all' || room.room_type === activeTab;
    return matchesSearch && matchesTab;
  });

  const formatLastUpdated = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return `${Math.floor(diff / 86400000)}d`;
  };

  const getRoomIcon = (roomType: string) => {
    return roomType === 'business' ? Briefcase : User;
  };

  const getRoomBadgeColor = (roomType: string) => {
    return roomType === 'business' 
      ? 'bg-blue-100 text-blue-700' 
      : 'bg-purple-100 text-purple-700';
  };

  return (
    <div className="w-80 bg-white/95 backdrop-blur-sm border-r flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Chats
          </h2>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-primary/20 focus:border-primary bg-background/50"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('all')}
            className="flex-1 text-xs"
          >
            All
          </Button>
          <Button
            variant={activeTab === 'business' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('business')}
            className="flex-1 text-xs"
          >
            Business
          </Button>
          <Button
            variant={activeTab === 'trainer' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('trainer')}
            className="flex-1 text-xs"
          >
            Trainers
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {loading ? (
            <div className="space-y-3 p-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-4 text-center text-destructive">
              {error}
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No conversations yet</h3>
              <p className="text-sm text-muted-foreground">
                Start chatting with businesses and trainers to see them here
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredRooms.map((room) => {
                const Icon = getRoomIcon(room.room_type);
                const isSelected = selectedRoom?.id === room.id;
                
                return (
                  <button
                    key={room.id}
                    onClick={() => onRoomSelect(room)}
                    className={cn(
                      "w-full p-4 rounded-lg text-left transition-all hover:bg-muted/50",
                      isSelected && "bg-primary/10 border border-primary/20"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className={cn(
                            "text-sm font-semibold",
                            room.room_type === 'business' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                          )}>
                            <Icon className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm truncate">
                            {room.room_type === 'business' ? 'Business Chat' : 'Trainer Chat'}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {formatLastUpdated(room.updated_at)}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground truncate">
                            Active conversation
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs capitalize",
                                getRoomBadgeColor(room.room_type)
                              )}
                            >
                              {room.room_type}
                            </Badge>
                          </div>
                        </div>

                        {/* Status indicators */}
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant={room.status === 'active' ? 'default' : 'secondary'} 
                            className="text-xs"
                          >
                            {room.status}
                          </Badge>
                          {/* Unread count placeholder */}
                          <Badge variant="destructive" className="text-xs px-2">
                            2
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Sidebar Footer */}
      <div className="p-4 border-t bg-muted/20">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{filteredRooms.length} conversations</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-muted-foreground">4.8 rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;