
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2, Home, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import MainNavigation from "@/components/MainNavigation";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'pending'>('pending');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    } else {
      setIsVerifying(false);
      setPaymentStatus('failed');
      toast.error("No payment session found");
    }
  }, [sessionId]);

  const verifyPayment = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { sessionId }
      });

      if (error) {
        console.error('Verification error:', error);
        setPaymentStatus('failed');
        toast.error("Failed to verify payment");
        return;
      }

      if (data?.success && data?.status === 'paid') {
        setPaymentStatus('success');
        setPaymentDetails(data);
        toast.success("Payment successful!");
      } else {
        setPaymentStatus('failed');
        toast.error("Payment verification failed");
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setPaymentStatus('failed');
      toast.error("An error occurred during verification");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <MainNavigation />
      
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {isVerifying ? (
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
              ) : paymentStatus === 'success' ? (
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              ) : (
                <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-red-600" />
                </div>
              )}
            </div>
            
            <CardTitle className="text-2xl font-bold">
              {isVerifying ? 'Verifying Payment...' : 
               paymentStatus === 'success' ? 'Payment Successful!' : 
               'Payment Failed'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {isVerifying ? (
              <p className="text-center text-gray-600">
                Please wait while we verify your payment...
              </p>
            ) : paymentStatus === 'success' ? (
              <>
                <div className="text-center space-y-2">
                  <p className="text-green-600 font-medium">
                    Your booking has been confirmed!
                  </p>
                  {paymentDetails?.amount && (
                    <p className="text-gray-600">
                      Amount: ₹{(paymentDetails.amount / 100).toFixed(2)}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    You will receive a confirmation email shortly.
                  </p>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button asChild className="w-full">
                    <Link to="/manage-bookings">
                      <Calendar className="h-4 w-4 mr-2" />
                      View My Bookings
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/">
                      <Home className="h-4 w-4 mr-2" />
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center space-y-2">
                  <p className="text-red-600 font-medium">
                    There was an issue with your payment.
                  </p>
                  <p className="text-sm text-gray-500">
                    Please try again or contact support if the problem persists.
                  </p>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/">
                      <Home className="h-4 w-4 mr-2" />
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
