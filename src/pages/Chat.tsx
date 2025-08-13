import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useChat, ChatRoom, ChatMessage } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const formatINR = (paisa: number) => `₹${(paisa / 100).toFixed(2)}`;

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const {
    chatRooms,
    messages,
    loading,
    error,
    fetchMessages,
    sendMessage,
    sendPriceQuote,
    confirmBooking,
    subscribeToMessages,
    markMessagesRead,
  } = useChat();

  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState("");
  const [quoteDetails, setQuoteDetails] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    if (!selectedRoom) return;
    (async () => {
      await fetchMessages(selectedRoom.id);
      await markMessagesRead(selectedRoom.id);
    })();
    const unsub = subscribeToMessages(selectedRoom.id);
    return () => unsub();
  }, [selectedRoom?.id]);

  // Determine if current user owns the selected room's business/trainer
  useEffect(() => {
    // Heuristic: customer is room.user_id. If current user is not the customer, treat as owner side.
    if (!selectedRoom || !user) {
      setIsOwner(false);
      return;
    }
    setIsOwner(user.id !== selectedRoom.user_id);
  }, [selectedRoom, user?.id]);

  const handleSend = async () => {
    if (!selectedRoom || !newMessage.trim()) return;
    try {
      await sendMessage(selectedRoom.id, newMessage.trim());
      setNewMessage("");
      await markMessagesRead(selectedRoom.id);
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

  const canonicalUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/chat`;
    }
    return "/chat";
  }, []);

  // Mark read on new incoming messages
  useEffect(() => {
    if (!selectedRoom) return;
    const hasUnreadIncoming = messages.some(m => m.chat_room_id === selectedRoom.id && m.sender_id !== user?.id && !m.is_read);
    if (hasUnreadIncoming) {
      markMessagesRead(selectedRoom.id);
    }
  }, [messages, selectedRoom?.id, user?.id, markMessagesRead]);

  // Update my online status while on chat page
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        await supabase.rpc('update_owner_status', { p_user_id: user.id, p_is_online: true });
      } catch (e) { console.error('Failed to set online status', e); }
    })();
    return () => {
      (async () => {
        try {
          await supabase.rpc('update_owner_status', { p_user_id: user.id, p_is_online: false });
        } catch (e) { console.error('Failed to set offline status', e); }
      })();
    };
  }, [user?.id]);
  return (
    <div className="container mx-auto px-4 py-6">
      <Helmet>
        <title>Chat with Businesses & Trainers</title>
        <meta name="description" content="Chat with businesses and trainers, get price quotes, and confirm bookings instantly." />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Update my online status while on chat page */}
      {user && (
        <span className="sr-only">Online</span>
      )}


      <header className="mb-4">
        <h1 className="text-2xl font-semibold text-foreground">Chat with Businesses & Trainers</h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4">
        <aside className="border rounded-md bg-card">
          <div className="p-3 border-b flex items-center justify-between">
            <span className="font-medium text-foreground">Conversations</span>
            <Badge variant="secondary">{chatRooms.length}</Badge>
          </div>
          <ScrollArea className="h-[60vh]">
            <nav className="flex flex-col">
              {loading ? (
                <div className="p-3 text-muted-foreground">Loading rooms...</div>
              ) : error ? (
                <div className="p-3 text-destructive">{error}</div>
              ) : chatRooms.length === 0 ? (
                <div className="p-3 text-muted-foreground">No conversations yet</div>
              ) : (
                chatRooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`text-left px-3 py-2 border-b hover:bg-accent transition ${selectedRoom?.id === room.id ? "bg-accent" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">
                        {room.room_type === "business" ? "Business" : "Trainer"}
                      </span>
                      <Badge variant="outline" className="ml-2 capitalize">{room.status}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Updated {new Date(room.updated_at).toLocaleString()}
                    </div>
                  </button>
                ))
              )}
            </nav>
          </ScrollArea>
        </aside>

        <main className="border rounded-md bg-card min-h-[60vh] flex flex-col">
          {!selectedRoom ? (
            <div className="flex-1 grid place-items-center text-muted-foreground p-6">
              Select a conversation to start chatting
            </div>
          ) : (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">
                    {selectedRoom.room_type === "business" ? "Business" : "Trainer"} Room
                  </span>
                  {isOwner && (
                    <Badge variant="secondary">Owner</Badge>
                  )}
                </div>
                {isOwner && (
                  <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="default">Send price quote</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send price quote</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        <Input placeholder="Service (e.g., Monthly membership)" value={quoteService} onChange={(e) => setQuoteService(e.target.value)} />
                        <Input placeholder="Details (optional)" value={quoteDetails} onChange={(e) => setQuoteDetails(e.target.value)} />
                        <Input placeholder="Amount in INR (e.g., 1499)" value={quoteAmount} onChange={(e) => setQuoteAmount(e.target.value)} />
                      </div>
                      <DialogFooter>
                        <Button onClick={handleSendQuote}>Send</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {messages.map((m) => {
                    const mine = m.sender_id === user?.id;
                    const isQuote = m.message_subtype === "price_quote" && m.price_quote;
                    return (
                      <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] ${isQuote ? "w-full" : ""}`}>
                          {isQuote ? (
                            <Card className="p-3">
                              <div className="text-sm text-muted-foreground mb-1">Price quote</div>
                              <div className="font-medium text-foreground">{m.price_quote?.service}</div>
                              {m.price_quote?.details && (
                                <div className="text-sm text-muted-foreground">{m.price_quote.details}</div>
                              )}
                              <div className="mt-2 font-semibold text-foreground">{formatINR(m.price_quote!.amount)}</div>
                              {!mine && (
                                <div className="mt-3">
                                  <Button size="sm" onClick={() => handleConfirm(m)} disabled={confirmingId === m.id}>
                                    {confirmingId === m.id ? "Confirming..." : "Confirm booking"}
                                  </Button>
                                </div>
                              )}
                            </Card>
                          ) : (
                            <div className={`rounded-md px-3 py-2 border ${mine ? "bg-accent" : "bg-background"}`}>
                              <div className="whitespace-pre-wrap text-foreground">{m.message}</div>
                              <div className="text-[10px] text-muted-foreground mt-1 flex items-center gap-2">
                                <span>{new Date(m.created_at).toLocaleTimeString()}</span>
                                {mine && m.is_read && (
                                  <span className="uppercase tracking-wide">Seen</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={bottomRef} />
                </div>
              </ScrollArea>

              <div className="p-3 border-t flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <Button onClick={handleSend}>Send</Button>
              </div>
            </>
          )}
        </main>
      </section>
    </div>
  );
};

export default ChatPage;
