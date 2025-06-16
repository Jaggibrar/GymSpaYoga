
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Smartphone, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface PlatformFeePaymentProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: number;
  businessName: string;
  onPaymentSuccess: () => void;
}

const PlatformFeePayment = ({ 
  isOpen, 
  onClose, 
  bookingId, 
  businessName, 
  onPaymentSuccess 
}: PlatformFeePaymentProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'qr' | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');
  
  const platformFee = 20; // ₹20 platform fee
  const upiId = "gymspaYoga@upi"; // Your UPI ID
  const qrCodeUrl = `upi://pay?pa=${upiId}&pn=GymSpaYoga&am=${platformFee}&cu=INR&tn=Platform Fee Booking ${bookingId}`;

  const handleUPIPayment = () => {
    setPaymentStatus('processing');
    
    // Simulate UPI app redirect
    const upiLink = `upi://pay?pa=${upiId}&pn=GymSpaYoga&am=${platformFee}&cu=INR&tn=Platform Fee Booking ${bookingId}`;
    
    // Try to open UPI app
    window.location.href = upiLink;
    
    // Simulate payment verification after 3 seconds
    setTimeout(() => {
      setPaymentStatus('success');
      toast.success("Payment successful! Booking confirmed.");
      onPaymentSuccess();
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 3000);
  };

  const handleQRPayment = () => {
    setPaymentStatus('processing');
    
    // Simulate QR code payment verification
    setTimeout(() => {
      setPaymentStatus('success');
      toast.success("Payment successful! Booking confirmed.");
      onPaymentSuccess();
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 3000);
  };

  const renderPaymentContent = () => {
    if (paymentStatus === 'success') {
      return (
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-4">Your booking with {businessName} is confirmed.</p>
          <Badge className="bg-green-100 text-green-800">Booking ID: #{bookingId}</Badge>
        </div>
      );
    }

    if (paymentStatus === 'processing') {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Processing Payment...</h3>
          <p className="text-gray-600">Please complete the payment in your UPI app.</p>
        </div>
      );
    }

    if (!paymentMethod) {
      return (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Platform Fee Payment</h3>
            <p className="text-gray-600">Pay ₹{platformFee} platform fee to confirm your booking</p>
          </div>

          <Card className="p-4 bg-blue-50 border-blue-200">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Booking with {businessName}</p>
                  <p className="text-sm text-gray-600">Platform Service Fee</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">₹{platformFee}</p>
                  <p className="text-xs text-gray-500">One-time fee</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => setPaymentMethod('upi')}
              className="flex items-center justify-center gap-3 h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Smartphone className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium">UPI Apps</div>
                <div className="text-xs opacity-90">GPay, PhonePe, Paytm</div>
              </div>
            </Button>

            <Button
              onClick={() => setPaymentMethod('qr')}
              variant="outline"
              className="flex items-center justify-center gap-3 h-16 border-2 hover:bg-gray-50"
            >
              <QrCode className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium">Scan QR Code</div>
                <div className="text-xs text-gray-500">Any UPI app</div>
              </div>
            </Button>
          </div>
        </div>
      );
    }

    if (paymentMethod === 'upi') {
      return (
        <div className="text-center space-y-6">
          <div>
            <Smartphone className="h-16 w-16 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Pay with UPI</h3>
            <p className="text-gray-600">You'll be redirected to your UPI app</p>
          </div>

          <Card className="p-4 bg-purple-50 border-purple-200">
            <CardContent className="p-0 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold">₹{platformFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">To:</span>
                <span className="font-medium">GymSpaYoga</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">UPI ID:</span>
                <span className="font-mono text-sm">{upiId}</span>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleUPIPayment}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Pay ₹{platformFee} via UPI
          </Button>

          <Button variant="ghost" onClick={() => setPaymentMethod(null)}>
            Back to payment options
          </Button>
        </div>
      );
    }

    if (paymentMethod === 'qr') {
      return (
        <div className="text-center space-y-6">
          <div>
            <QrCode className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Scan QR Code</h3>
            <p className="text-gray-600">Use any UPI app to scan and pay</p>
          </div>

          <Card className="p-6 bg-gray-50">
            <CardContent className="p-0">
              <div className="w-48 h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="text-center">
                  <QrCode className="h-24 w-24 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">QR Code</p>
                  <p className="text-xs text-gray-400">₹{platformFee}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Scan this QR code with any UPI app to pay ₹{platformFee}
              </p>
            </CardContent>
          </Card>

          <Button 
            onClick={handleQRPayment}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
          >
            I have completed the payment
          </Button>

          <Button variant="ghost" onClick={() => setPaymentMethod(null)}>
            Back to payment options
          </Button>
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Complete Your Booking
          </DialogTitle>
        </DialogHeader>
        
        {renderPaymentContent()}
      </DialogContent>
    </Dialog>
  );
};

export default PlatformFeePayment;
