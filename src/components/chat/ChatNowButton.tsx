import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useChatWithNames as useChat } from '@/hooks/useChatWithNames';
import { toast } from 'sonner';

interface ChatNowButtonProps {
  businessId?: string;
  trainerId?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

const ChatNowButton: React.FC<ChatNowButtonProps> = ({
  businessId,
  trainerId,
  variant = 'outline',
  size = 'sm',
  className = ''
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createChatRoom } = useChat();
  const [isCreating, setIsCreating] = useState(false);

  const handleChatNow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to start a chat');
      navigate('/login');
      return;
    }
    
    setIsCreating(true);
    try {
      await createChatRoom(businessId, trainerId);
      navigate('/chat');
      toast.success('Chat started successfully!');
    } catch (error) {
      console.error('Failed to start chat:', error);
      toast.error('Failed to start chat');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button 
      onClick={handleChatNow}
      disabled={isCreating}
      variant={variant}
      size={size}
      className={`${className} ${
        variant === 'outline' 
          ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' 
          : ''
      }`}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      {isCreating ? 'Starting...' : 'Chat Now'}
    </Button>
  );
};

export default ChatNowButton;