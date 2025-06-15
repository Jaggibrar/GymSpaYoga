import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, CheckCircle, AlertCircle, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useBookings } from '@/hooks/useBookings';
import { useAuth } from '@/hooks/useAuth';

interface BookingModalProps {
  businessName: string;
  businessType: string;
  businessId?: string;
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  price?: string;
}

const BookingModal = ({ businessName, businessType, businessId, trigger, isOpen, onClose, price }: BookingModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: undefined as Date | undefined,
    time: '',
    duration: '',
    service: '',
    name: '',
    phone: '',
    email: '',
    specialRequests: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  
  const { submitBooking } = useBookings();
  const { user, loading: authLoading } = useAuth();

  // Use external open/close if provided, otherwise use internal state
  const modalOpen = isOpen !== undefined ? isOpen : internalOpen;
  const handleOpenChange = (open: boolean) => {
    if (onClose && !open) {
      onClose();
    } else {
      setInternalOpen(open);
    }
    
    // Reset form when closing
    if (!open) {
      setStep(1);
      setBookingData({
        date: undefined,
        time: '',
        duration: '',
        service: '',
        name: '',
        phone: '',
        email: '',
        specialRequests: ''
      });
      setSubmissionStatus('idle');
    }
  };

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

  const services = {
    gym: ['Personal Training', 'Group Classes', 'Equipment Access', 'Nutrition Consultation', 'CrossFit Training', 'Weight Training'],
    spa: ['Full Body Massage', 'Facial Treatment', 'Body Wrap', 'Aromatherapy', 'Hot Stone Therapy', 'Swedish Massage'],
    yoga: ['Hatha Yoga', 'Vinyasa Flow', 'Meditation Session', 'Private Class', 'Power Yoga', 'Yin Yoga']
  };

  // Normalize business type to match database constraints
  const normalizeBusinessType = (type: string): string => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('gym') || lowerType.includes('fitness')) return 'gym';
    if (lowerType.includes('spa') || lowerType.includes('massage')) return 'spa';
    if (lowerType.includes('yoga') || lowerType.includes('meditation')) return 'yoga';
    return 'gym'; // default fallback
  };

  const getServiceType = () => {
    const normalizedType = normalizeBusinessType(businessType);
    return normalizedType as keyof typeof services;
  };

  const serviceType = getServiceType();
  const availableServices = services[serviceType] || services.gym;

  const handleSubmit = async () => {
    // Wait for auth loading to complete
    if (authLoading) {
      toast.error("Please wait while we verify your login status");
      return;
    }

    if (!user) {
      toast.error("Please login to submit a booking");
      return;
    }

    if (!businessId) {
      toast.error("Business ID is required");
      return;
    }

    // Validate required fields
    if (!bookingData.date || !bookingData.time || !bookingData.service || !bookingData.duration) {
      toast.error("Please fill in all required booking details");
      return;
    }

    if (!bookingData.name || !bookingData.phone || !bookingData.email) {
      toast.error("Please fill in all contact information");
      return;
    }

    setSubmissionStatus('submitting');
    
    const normalizedBusinessType = normalizeBusinessType(businessType);
    
    console.log('Submitting booking with user:', user.id);
    
    const booking = await submitBooking({
      user_id: user.id,
      business_id: businessId,
      business_type: normalizedBusinessType,
      trainer_id: null,
      booking_date: format(bookingData.date, 'yyyy-MM-dd'),
      booking_time: bookingData.time,
      duration_minutes: parseInt(bookingData.duration),
      total_amount: price ? parseInt(price.replace(/[^\d]/g, '')) : null,
      status: 'pending',
      payment_status: 'pending',
      notes: bookingData.specialRequests
    });

    if (booking) {
      setSubmissionStatus('submitted');
      toast.success("Booking request submitted successfully! Payment will be made at the counter.");
      // Close modal after a delay
      setTimeout(() => {
        handleOpenChange(false);
      }, 2000);
    } else {
      setSubmissionStatus('idle');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="service">Select Service *</Label>
              <Select value={bookingData.service} onValueChange={(value) => setBookingData({...bookingData, service: value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {availableServices.map((service) => (
                    <SelectItem key={service} value={service} className="hover:bg-gray-100">
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Select Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {bookingData.date ? format(bookingData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white z-50">
                  <Calendar
                    mode="single"
                    selected={bookingData.date}
                    onSelect={(date) => setBookingData({...bookingData, date})}
                    initialFocus
                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Time Slot *</Label>
                <Select value={bookingData.time} onValueChange={(value) => setBookingData({...bookingData, time: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time} className="hover:bg-gray-100">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Duration *</Label>
                <Select value={bookingData.duration} onValueChange={(value) => setBookingData({...bookingData, duration: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    <SelectItem value="30" className="hover:bg-gray-100">30 minutes</SelectItem>
                    <SelectItem value="60" className="hover:bg-gray-100">1 hour</SelectItem>
                    <SelectItem value="90" className="hover:bg-gray-100">1.5 hours</SelectItem>
                    <SelectItem value="120" className="hover:bg-gray-100">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={bookingData.name}
                onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={bookingData.phone}
                onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                placeholder="+91 98765 43210"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={bookingData.email}
                onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="requests">Special Requests (Optional)</Label>
              <Textarea
                id="requests"
                value={bookingData.specialRequests}
                onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                placeholder="Any special requirements or notes..."
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><strong>Service:</strong> {bookingData.service}</p>
                <p><strong>Date:</strong> {bookingData.date ? format(bookingData.date, "PPP") : ''}</p>
                <p><strong>Time:</strong> {bookingData.time}</p>
                <p><strong>Duration:</strong> {bookingData.duration} minutes</p>
                <p><strong>Contact:</strong> {bookingData.name} ({bookingData.phone})</p>
                {price && <p><strong>Price:</strong> {price}</p>}
              </div>
            </div>

            {/* Payment Information Notice */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-900">Payment Information</span>
              </div>
              <p className="text-sm text-blue-800">
                Payment will be made directly at the counter. No advance payment required.
              </p>
            </div>
            
            {submissionStatus !== 'idle' && (
              <div className="text-center">
                {submissionStatus === 'submitting' && (
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <AlertCircle className="h-5 w-5 animate-spin" />
                    <span>Submitting booking request...</span>
                  </div>
                )}
                {submissionStatus === 'submitted' && (
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Booking Request Submitted!</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const isStep1Valid = bookingData.service && bookingData.date && bookingData.time && bookingData.duration;
  const isStep2Valid = bookingData.name && bookingData.phone && bookingData.email;

  // Show loading while auth is being determined
  if (authLoading) {
    const loadingContent = (
      <DialogContent className="sm:max-w-[500px] bg-white">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          <span className="ml-3">Verifying login status...</span>
        </div>
      </DialogContent>
    );

    if (trigger) {
      return (
        <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            {trigger}
          </DialogTrigger>
          {loadingContent}
        </Dialog>
      );
    }

    return (
      <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
        {loadingContent}
      </Dialog>
    );
  }

  const modalContent = (
    <DialogContent className="sm:max-w-[500px] bg-white">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2">
          <span>Book at {businessName}</span>
          <Badge variant="outline">{businessType}</Badge>
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step >= stepNum 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`
                  w-12 h-1 mx-2
                  ${step > stepNum ? 'bg-emerald-500' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>

        {renderStepContent()}

        <div className="flex justify-between">
          {step > 1 && submissionStatus === 'idle' && (
            <Button 
              variant="outline" 
              onClick={() => setStep(step - 1)}
            >
              Previous
            </Button>
          )}
          
          {step < 3 ? (
            <Button 
              onClick={() => setStep(step + 1)}
              className="ml-auto bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
              disabled={
                (step === 1 && !isStep1Valid) ||
                (step === 2 && !isStep2Valid)
              }
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="ml-auto bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
              disabled={submissionStatus !== 'idle' || authLoading}
            >
              {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit Booking Request'}
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  );

  // If trigger is provided, use DialogTrigger pattern
  if (trigger) {
    return (
      <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        {modalContent}
      </Dialog>
    );
  }

  // If no trigger, use controlled dialog pattern
  return (
    <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
      {modalContent}
    </Dialog>
  );
};

export default BookingModal;
