import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageCircle,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Search,
  Filter,
  MoreVertical,
  Star,
  Calendar,
  DollarSign
} from "lucide-react";
import { useChat, ChatRoom } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ChatContact {
  id: string;
  room: ChatRoom;
  customerName?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  status: 'online' | 'offline' | 'away';
  hasBookingRequest?: boolean;
  totalSpent?: number;
}

const BusinessChatDashboard: React.FC = () => {
  const { user } = useAuth();
  const { chatRooms, loading, error } = useChat();
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'booking'>('all');

  // Mock data for demo - in real app this would come from the database
  const [contacts, setContacts] = useState<ChatContact[]>([]);

  useEffect(() => {
    // Transform chat rooms into contacts with mock additional data
    const transformedContacts: ChatContact[] = chatRooms.map((room, index) => ({
      id: room.id,
      room,
      customerName: `Customer ${index + 1}`,
      lastMessage: index % 3 === 0 ? "I'm interested in your monthly membership" : 
                   index % 3 === 1 ? "What are your operating hours?" : 
                   "Can you send me more details?",
      lastMessageTime: new Date(room.updated_at).toLocaleString(),
      unreadCount: Math.floor(Math.random() * 5),
      status: ['online', 'offline', 'away'][Math.floor(Math.random() * 3)] as 'online' | 'offline' | 'away',
      hasBookingRequest: Math.random() > 0.7,
      totalSpent: Math.floor(Math.random() * 10000) + 500
    }));
    setContacts(transformedContacts);
  }, [chatRooms]);

  // Filter contacts based on search and status
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'unread' && contact.unreadCount > 0) ||
                         (filterStatus === 'booking' && contact.hasBookingRequest);
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  // Stats
  const stats = {
    totalChats: contacts.length,
    unreadChats: contacts.filter(c => c.unreadCount > 0).length,
    bookingRequests: contacts.filter(c => c.hasBookingRequest).length,
    averageResponseTime: '12 min'
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chat Dashboard</h1>
          <p className="text-muted-foreground">Manage your customer conversations</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <MessageCircle className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Chats</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalChats}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Unread Messages</p>
                <p className="text-2xl font-bold text-orange-900">{stats.unreadChats}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Booking Requests</p>
                <p className="text-2xl font-bold text-green-900">{stats.bookingRequests}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Avg Response</p>
                <p className="text-2xl font-bold text-purple-900">{stats.averageResponseTime}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Chats
              </CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            
            {/* Search and Filters */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Tabs value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="booking">Bookings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          
          <ScrollArea className="h-[500px]">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-4 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex items-center gap-3 p-3">
                      <div className="w-12 h-12 bg-muted rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No conversations found</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {filteredContacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className={`w-full p-4 rounded-lg text-left transition-colors hover:bg-muted/50 ${
                        selectedContact?.id === contact.id ? 'bg-primary/10 border border-primary/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {contact.customerName?.charAt(0) || 'C'}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -top-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-white`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm truncate">
                              {contact.customerName}
                            </h4>
                            <div className="flex items-center gap-1">
                              {contact.unreadCount > 0 && (
                                <Badge variant="destructive" className="text-xs px-2 py-1">
                                  {contact.unreadCount}
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {contact.lastMessageTime && formatTime(contact.lastMessageTime)}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-muted-foreground truncate mb-2">
                            {contact.lastMessage}
                          </p>
                          
                          <div className="flex items-center gap-2">
                            {contact.hasBookingRequest && (
                              <Badge variant="outline" className="text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                Booking
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              VIP
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedContact ? (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {selectedContact.customerName?.charAt(0) || 'C'}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -top-1 -right-1 w-4 h-4 ${getStatusColor(selectedContact.status)} rounded-full border-2 border-white`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedContact.customerName}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="capitalize">{selectedContact.status}</span>
                        <span>•</span>
                        <span>Total spent: ₹{selectedContact.totalSpent?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Send Quote
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="h-[400px] flex flex-col">
                <ScrollArea className="flex-1 mb-4">
                  <div className="space-y-4 p-4">
                    {/* Sample messages */}
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl px-4 py-3 max-w-xs">
                        <p className="text-sm">{selectedContact.lastMessage}</p>
                        <span className="text-xs text-muted-foreground">2:30 PM</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-2xl px-4 py-3 max-w-xs">
                        <p className="text-sm">Hello! Thank you for your interest. Our monthly membership starts at ₹2,999.</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className="text-xs opacity-70">2:31 PM</span>
                          <CheckCircle className="h-3 w-3 opacity-70" />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                
                {/* Message Input */}
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Type a message..." 
                    className="flex-1"
                  />
                  <Button>
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a chat from the list to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BusinessChatDashboard;