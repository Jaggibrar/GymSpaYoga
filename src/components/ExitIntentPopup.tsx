import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Gift, X } from 'lucide-react';
import { toast } from 'sonner';

const STORAGE_KEY = 'gymspayoga_exit_popup_dismissed';

const ExitIntentPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5 && !sessionStorage.getItem(STORAGE_KEY)) {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }
  }, []);

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 768) return;
    // Don't show if already dismissed permanently
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 10000); // Wait 10s before enabling

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    // Store email (in production, send to backend)
    setSubmitted(true);
    localStorage.setItem(STORAGE_KEY, 'true');
    toast.success('🎉 Your free trial pass has been sent!');
    setTimeout(() => setOpen(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Gift className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl">
            Wait! Get a Free 1-Day Trial Pass
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Try any gym, spa, or yoga studio near you — absolutely free. Enter your email and we'll send you the pass instantly.
          </DialogDescription>
        </DialogHeader>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-base"
              autoFocus
            />
            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base">
              Claim My Free Pass
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
        ) : (
          <div className="text-center py-6">
            <p className="text-lg font-semibold text-primary">🎉 Check your inbox!</p>
            <p className="text-muted-foreground mt-1">Your free trial pass is on the way.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
