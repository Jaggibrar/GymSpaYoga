import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Send, 
  MoreVertical, 
  Clock, 
  CheckCheck, 
  User, 
  Briefcase,
  DollarSign,
  Calendar
} from "lucide-react";
import { useChatWithNames as useChat, ChatRoom, ChatMessage } from "@/hooks/useChatWithNames";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ErrorBoundary from "@/components/ErrorBoundary";

interface ModernChatInterfaceProps {
  selectedRoom: ChatRoom | null;
  onRoomSelect: (room: ChatRoom) => void;
}

const ModernChatInterface: React.FC<ModernChatInterfaceProps> = ({ 
  selectedRoom, 
  onRoomSelect 
}) => {
  const { user } = useAuth();
  const {
    chatRooms,
    messages,
    loading,
    error,
    typingUsers,
    fetchMessages,
    sendMessage,
    sendPriceQuote,
    confirmBooking,
    subscribeToMessages,
    subscribeToTyping,
    broadcastTyping,
    markMessagesRead,
  } = useChat();

  const [newMessage, setNewMessage] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState("");
  const [quoteDetails, setQuoteDetails] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState<Record<string, boolean>>({});
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Handle room selection
  useEffect(() => {
    if (!selectedRoom) return;
    (async () => {
      await fetchMessages(selectedRoom.id);
      await markMessagesRead(selectedRoom.id);
    })();
    const unsubMessages = subscribeToMessages(selectedRoom.id);
    const unsubTyping = subscribeToTyping(selectedRoom.id);
    return () => {
      unsubMessages();
      unsubTyping();
    };
  }, [selectedRoom?.id, fetchMessages, subscribeToMessages, subscribeToTyping, markMessagesRead]);

  // Determine ownership
  useEffect(() => {
    if (!selectedRoom || !user) {
      setIsOwner(false);
      return;
    }
    setIsOwner(user.id !== selectedRoom.user_id);
  }, [selectedRoom, user?.id]);

  // Format timestamp
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format date
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const formatINR = (paisa: number) => `₹${(paisa / 100).toFixed(2)}`;

  const handleSend = async () => {
    if (!selectedRoom || !newMessage.trim()) return;
    try {
      // Stop typing indicator immediately
      setIsTyping(false);
      broadcastTyping(selectedRoom.id, false);
      
      await sendMessage(selectedRoom.id, newMessage.trim());
      setNewMessage("");
      await markMessagesRead(selectedRoom.id);
      inputRef.current?.focus();
    } catch (e) {
      // toast handled in hook
    }
  };

  const handleSendQuote = async () => {
    if (!selectedRoom) return;
    const amountNumber = Number(quoteAmount);
    if (!quoteService.trim() || isNaN(amountNumber) || amountNumber <= 0) {
      toast.error("Enter valid service and amount");
      return;
    }
    try {
      await sendPriceQuote(selectedRoom.id, {
        service: quoteService.trim(),
        details: quoteDetails.trim() || undefined,
        amount: Math.round(amountNumber * 100),
        currency: "inr",
      });
      setQuoteOpen(false);
      setQuoteService("");
      setQuoteDetails("");
      setQuoteAmount("");
    } catch (e) {}
  };

  const handleConfirm = async (m: ChatMessage) => {
    if (!selectedRoom) return;
    setConfirmingId(m.id);
    try {
      await confirmBooking(selectedRoom, m);
      await markMessagesRead(selectedRoom.id);
    } catch (e) {}
    finally { setConfirmingId(null); }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTypingIndicator = (value: string) => {
    if (!selectedRoom || !user) return;

    if (value.trim() && !isTyping) {
      setIsTyping(true);
      broadcastTyping(selectedRoom.id, true);
    }

    // Clear previous timer
    if (typingTimer) {
      clearTimeout(typingTimer);
    }

    // Set new timer to stop typing indicator
    const timer = setTimeout(() => {
      setIsTyping(false);
      broadcastTyping(selectedRoom.id, false);
    }, 1000);

    setTypingTimer(timer);
  };

  // Group messages by date
  const groupedMessages = useMemo(() => {
    const groups: Record<string, ChatMessage[]> = {};
    messages.forEach(message => {
      const dateKey = formatDate(message.created_at);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    return groups;
  }, [messages]);

  if (!selectedRoom) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-6">
          <Briefcase className="h-16 w-16 text-primary/60" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Welcome to Chat</h3>
        <p className="text-muted-foreground max-w-sm">
          Select a conversation to start chatting with businesses and trainers
        </p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-full bg-gradient-to-br from-background to-muted/30">
        {/* Chat Header */}
        <CardHeader className="bg-white/80 backdrop-blur-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                <AvatarImage src={selectedRoom.other_party_avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {selectedRoom.other_party_name ? selectedRoom.other_party_name.charAt(0).toUpperCase() : (selectedRoom.room_type === "business" ? "B" : "T")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">
                  {selectedRoom.other_party_name || `Chat with ${selectedRoom.room_type === "business" ? "Business" : "Trainer"}`}
                </h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${selectedRoom.other_party_online ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-sm text-muted-foreground">
                    {selectedRoom.other_party_online ? 'Online' : 'Offline'}
                  </span>
                  {isOwner && (
                    <Badge variant="secondary" className="ml-2">Owner</Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isOwner && (
                <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Send Quote
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Send Price Quote
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input 
                        placeholder="Service (e.g., Monthly membership)" 
                        value={quoteService} 
                        onChange={(e) => setQuoteService(e.target.value)} 
                        className="border-primary/20 focus:border-primary"
                      />
                      <Input 
                        placeholder="Details (optional)" 
                        value={quoteDetails} 
                        onChange={(e) => setQuoteDetails(e.target.value)}
                        className="border-primary/20 focus:border-primary"
                      />
                      <Input 
                        placeholder="Amount in INR (e.g., 1499)" 
                        value={quoteAmount} 
                        onChange={(e) => setQuoteAmount(e.target.value)}
                        type="number"
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={handleSendQuote} className="w-full">
                        Send Quote
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6">
          <ErrorBoundary>
            <div className="space-y-6">
              {Object.entries(groupedMessages).map(([dateKey, dayMessages]) => (
                <div key={dateKey}>
                  {/* Date Divider */}
                  <div className="flex items-center justify-center my-4">
                    <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                      {dateKey}
                    </div>
                  </div>

                  {/* Messages for this date */}
                  <div className="space-y-3">
                    {dayMessages.map((message, index) => {
                      const mine = message.sender_id === user?.id;
                      const isQuote = message.message_subtype === "price_quote" && message.price_quote;
                      const showAvatar = !mine && (index === 0 || dayMessages[index - 1]?.sender_id !== message.sender_id);
                      
                      return (
                        <ErrorBoundary key={message.id}>
                          <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                            <div className="flex items-end gap-2 max-w-[80%]">
                              {showAvatar && !mine && (
                                <Avatar className="h-8 w-8 mb-1">
                                  <AvatarImage src={message.sender_avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="text-xs">
                                    {message.sender_name ? message.sender_name.charAt(0).toUpperCase() : "U"}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              
                              <div className={`${!mine && !showAvatar ? 'ml-10' : ''}`}>
                                {/* Show sender name for non-mine messages */}
                                {!mine && showAvatar && (
                                  <div className="text-xs text-muted-foreground mb-1 px-1">
                                    {message.sender_name || 'Unknown'}
                                  </div>
                                )}
                                
                                {isQuote ? (
                                  <Card className={`${mine ? 'bg-primary text-primary-foreground' : 'bg-white border-primary/20'} shadow-lg`}>
                                    <CardContent className="p-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="h-4 w-4" />
                                        <span className="text-sm font-medium">Price Quote</span>
                                      </div>
                                      <div className="space-y-2">
                                        <div className="font-semibold">{message.price_quote?.service}</div>
                                        {message.price_quote?.details && (
                                          <div className="text-sm opacity-90">{message.price_quote.details}</div>
                                        )}
                                        <div className="text-lg font-bold">{formatINR(message.price_quote!.amount)}</div>
                                      </div>
                                      {!mine && (
                                        <div className="mt-3 flex gap-2">
                                          <Button 
                                            size="sm" 
                                            onClick={() => handleConfirm(message)} 
                                            disabled={confirmingId === message.id}
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                          >
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {confirmingId === message.id ? "Confirming..." : "Accept & Book"}
                                          </Button>
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>
                                ) : (
                                  <div className={`rounded-2xl px-4 py-3 ${
                                    mine 
                                      ? 'bg-primary text-primary-foreground' 
                                      : 'bg-white border border-border shadow-sm'
                                  }`}>
                                    <div className="whitespace-pre-wrap break-words">{message.message}</div>
                                  </div>
                                )}
                                
                                {/* Message metadata */}
                                <div className={`flex items-center gap-2 mt-1 px-1 ${mine ? 'justify-end' : 'justify-start'}`}>
                                  <span className="text-xs text-muted-foreground">
                                    {formatTime(message.created_at)}
                                  </span>
                                  {mine && (
                                    <div className="flex items-center">
                                      {message.is_read ? (
                                        <CheckCheck className="h-3 w-3 text-primary" />
                                      ) : (
                                        <Clock className="h-3 w-3 text-muted-foreground" />
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </ErrorBoundary>
                      );
                    })}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </ErrorBoundary>
        </ScrollArea>

        {/* Typing Indicator */}
        {Object.keys(typingUsers).filter(userId => userId !== user?.id).length > 0 && (
          <div className="px-6 py-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
              </div>
              <span>
                {Object.entries(typingUsers)
                  .filter(([userId]) => userId !== user?.id)
                  .map(([, userName]) => userName)
                  .slice(0, 2)
                  .join(', ')} 
                {Object.keys(typingUsers).filter(userId => userId !== user?.id).length > 2 
                  ? ` and ${Object.keys(typingUsers).filter(userId => userId !== user?.id).length - 2} others` 
                  : ''} is typing...
              </span>
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="p-6 bg-white/80 backdrop-blur-sm border-t">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  handleTypingIndicator(e.target.value);
                }}
                onKeyPress={handleKeyPress}
                className="pr-12 border-primary/20 focus:border-primary rounded-2xl bg-background/50 backdrop-blur-sm"
              />
            </div>
            <Button 
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="rounded-2xl h-11 w-11 p-0 bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ModernChatInterface;