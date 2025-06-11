
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessId: string;
  serviceType: string;
  serviceName: string;
  price: number;
  priceType: string;
}

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  businessId, 
  serviceType, 
  serviceName, 
  price, 
  priceType 
}: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please login to make a payment");
      return;
    }

    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          businessId,
          serviceType,
          serviceName,
          price,
          priceType
        }
      });

      if (error) {
        console.error('Checkout error:', error);
        toast.error("Failed to create checkout session");
        return;
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        onClose();
        toast.success("Redirecting to payment...");
      } else {
        toast.error("No checkout URL received");
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("An error occurred while processing payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Complete Payment</span>
          </DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{serviceName}</CardTitle>
            <Badge variant="outline">{serviceType}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price ({priceType}):</span>
              <span className="text-2xl font-bold text-emerald-600">₹{price}</span>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center font-semibold">
                <span>Total Amount:</span>
                <span className="text-2xl text-emerald-600">₹{price}</span>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay with Stripe
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={onClose}
                className="w-full"
                disabled={isProcessing}
              >
                Cancel
              </Button>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Secure payment powered by Stripe
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
