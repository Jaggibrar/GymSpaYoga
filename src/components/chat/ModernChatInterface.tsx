import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Send, 
  Smile,
  MessageCircle,
  DollarSign,
  Calendar,
  CheckCheck,
  Clock,
  MoreVertical
} from "lucide-react";
import { useChatWithNames as useChat, ChatRoom, ChatMessage } from "@/hooks/useChatWithNames";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import ErrorBoundary from "@/components/ErrorBoundary";

interface ModernChatInterfaceProps {
  selectedRoom: ChatRoom | null;
  onRoomSelect: (room: ChatRoom) => void;
  onBackToList?: () => void;
}

const ModernChatInterface: React.FC<ModernChatInterfaceProps> = ({ 
  selectedRoom, 
  onRoomSelect,
  onBackToList
}) => {
  const { user } = useAuth();
  const {
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
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Handle room selection
  useEffect(() => {
    if (!selectedRoom?.id) return;
    
    let unsubMessages: (() => void) | undefined;
    let unsubTyping: (() => void) | undefined;
    
    const setupRoom = async () => {
      try {
        await fetchMessages(selectedRoom.id);
        await markMessagesRead(selectedRoom.id);
        unsubMessages = subscribeToMessages(selectedRoom.id);
        unsubTyping = subscribeToTyping(selectedRoom.id);
      } catch (error) {
        console.error('Error setting up chat room:', error);
      }
    };
    
    setupRoom();
    
    return () => {
      if (unsubMessages) unsubMessages();
      if (unsubTyping) unsubTyping();
    };
  }, [selectedRoom?.id]);

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
      hour: 'numeric',
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
      <div className="h-full flex flex-col items-center justify-center bg-muted/30 text-center p-8">
        <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-6">
          <MessageCircle className="h-16 w-16 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Select a Chat</h3>
        <p className="text-muted-foreground max-w-sm">
          Choose a conversation from the list to start messaging
        </p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="h-full bg-background flex flex-col">
        {/* Sticky Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={selectedRoom.other_party_avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {selectedRoom.other_party_name ? selectedRoom.other_party_name.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-foreground">
                  {selectedRoom.other_party_name || `${selectedRoom.room_type === "business" ? "Business" : "Trainer"}`}
                  {selectedRoom.other_party_category && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">
                      {selectedRoom.other_party_category}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedRoom.other_party_online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isOwner && (
                <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Quote
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
                      />
                      <Input 
                        placeholder="Details (optional)" 
                        value={quoteDetails} 
                        onChange={(e) => setQuoteDetails(e.target.value)}
                      />
                      <Input 
                        placeholder="Amount in INR (e.g., 1499)" 
                        value={quoteAmount} 
                        onChange={(e) => setQuoteAmount(e.target.value)}
                        type="number"
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={handleSendQuote} className="w-full bg-primary hover:bg-primary/90">
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
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 bg-muted/30">
          <div className="p-4">
            {error ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8">
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
                    <p className="text-destructive font-medium mb-2">⚠️ Unable to load messages</p>
                    <p className="text-destructive/80 text-sm">{error}</p>
                    <Button 
                      onClick={() => selectedRoom && fetchMessages(selectedRoom.id)}
                      variant="outline" 
                      size="sm" 
                      className="mt-3"
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              </div>
            ) : Object.entries(groupedMessages).map(([dateKey, dayMessages]) => (
              <div key={dateKey}>
                {/* Date Divider */}
                <div className="flex justify-center my-4">
                  <div className="bg-card px-3 py-1 rounded-full text-xs text-muted-foreground shadow-sm border border-border">
                    {dateKey}
                  </div>
                </div>

                {/* Messages for this date */}
                <div className="space-y-2">
                  {dayMessages.map((message) => {
                    const mine = message.sender_id === user?.id;
                    const isQuote = message.message_subtype === "price_quote" && message.price_quote;
                    
                    return (
                      <div key={message.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-xs lg:max-w-md ${mine ? 'order-2' : 'order-1'}`}>
                          {isQuote ? (
                            <div className={`rounded-2xl p-4 shadow-sm ${
                              mine ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground border border-border'
                            }`}>
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
                                <div className="mt-3">
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
                            </div>
                          ) : (
                            <div className={`rounded-2xl px-4 py-2 shadow-sm ${
                              mine 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted text-foreground'
                            }`}>
                              <div className="break-words">{message.message}</div>
                            </div>
                          )}
                          
                          {/* Timestamp and status */}
                          <div className={`flex items-center gap-1 mt-1 px-2 ${mine ? 'justify-end' : 'justify-start'}`}>
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
                    );
                  })}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {Object.keys(typingUsers).filter(userId => userId !== user?.id).length > 0 && (
              <div className="flex justify-start mb-4">
                <div className="bg-muted rounded-2xl px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Sticky Footer - Input Bar */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-foreground">
              <Smile className="h-5 w-5" />
            </Button>
            <Input
              ref={inputRef}
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTypingIndicator(e.target.value);
              }}
              onKeyPress={handleKeyPress}
              className="flex-1 rounded-full border-border bg-muted text-foreground placeholder:text-muted-foreground"
              disabled={loading}
            />
            <Button 
              onClick={handleSend}
              disabled={!newMessage.trim() || loading}
              size="sm"
              className="rounded-full p-2 bg-primary hover:bg-primary/90 text-primary-foreground"
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