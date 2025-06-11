
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, User, Building } from "lucide-react";
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface ChatWidgetProps {
  businessId?: string;
  trainerId?: string;
  businessName?: string;
  trainerName?: string;
}

const ChatWidget = ({ businessId, trainerId, businessName, trainerName }: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [currentChatRoom, setCurrentChatRoom] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { user } = useAuth();
  const { chatRooms, messages, createChatRoom, sendMessage, fetchMessages, subscribeToMessages } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentChatRoom) {
      const unsubscribe = subscribeToMessages(currentChatRoom);
      return unsubscribe;
    }
  }, [currentChatRoom]);

  const handleStartChat = async () => {
    if (!user) {
      toast.error('Please log in to start a chat');
      return;
    }

    try {
      // Check if chat room already exists
      const existingRoom = chatRooms.find(room => 
        (businessId && room.business_id === businessId) ||
        (trainerId && room.trainer_id === trainerId)
      );

      if (existingRoom) {
        setCurrentChatRoom(existingRoom.id);
        await fetchMessages(existingRoom.id);
      } else {
        const newRoom = await createChatRoom(businessId, trainerId);
        setCurrentChatRoom(newRoom.id);
      }
      setIsOpen(true);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentChatRoom) return;

    try {
      await sendMessage(currentChatRoom, newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={handleStartChat}
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-full p-4 shadow-lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 z-50 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                {businessId ? <Building className="h-4 w-4" /> : <User className="h-4 w-4" />}
                Chat with {businessName || trainerName}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-80">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        message.sender_id === user?.id
                          ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.created_at).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatWidget;
