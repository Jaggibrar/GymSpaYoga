import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  businessName: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  businessName,
  variant = 'outline',
  size = 'sm',
  className = ''
}) => {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Remove any non-digit characters from phone number
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    
    // Pre-filled message
    const message = `Hi! I found ${businessName} on GymSpaYoga.com and I'm interested in learning more about your services.`;
    
    // WhatsApp URL
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button 
      onClick={handleWhatsAppClick}
      variant={variant}
      size={size}
      className={`${className} ${
        variant === 'outline' 
          ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' 
          : ''
      }`}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      WhatsApp
    </Button>
  );
};

export default WhatsAppButton;
