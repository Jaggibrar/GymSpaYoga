
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
import { CalendarIcon, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface BookingModalProps {
  businessName: string;
  businessType: string;
  trigger: React.ReactNode;
}

const BookingModal = ({ businessName, businessType, trigger }: BookingModalProps) => {
  const [open, setOpen] = useState(false);
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
  const [bookingStatus, setBookingStatus] = useState<'pending' | 'confirmed' | 'rejected' | null>(null);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const services = {
    gym: ['Personal Training', 'Group Classes', 'Equipment Access', 'Nutrition Consultation'],
    spa: ['Full Body Massage', 'Facial Treatment', 'Body Wrap', 'Aromatherapy'],
    yoga: ['Hatha Yoga', 'Vinyasa Flow', 'Meditation Session', 'Private Class']
  };

  const handleSubmit = () => {
    // Simulate booking submission
    setBookingStatus('pending');
    toast.success("Booking request submitted!");
    
    // Simulate owner response after 3 seconds
    setTimeout(() => {
      const responses = ['confirmed', 'rejected'];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)] as 'confirmed' | 'rejected';
      setBookingStatus(randomResponse);
      
      if (randomResponse === 'confirmed') {
        toast.success("Booking confirmed by owner!");
      } else {
        toast.error("Booking declined. Please try another time slot.");
      }
    }, 3000);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="service">Select Service</Label>
              <Select onValueChange={(value) => setBookingData({...bookingData, service: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {services[businessType as keyof typeof services]?.map((service) => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {bookingData.date ? format(bookingData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={bookingData.date}
                    onSelect={(date) => setBookingData({...bookingData, date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Time Slot</Label>
                <Select onValueChange={(value) => setBookingData({...bookingData, time: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Duration</Label>
                <Select onValueChange={(value) => setBookingData({...bookingData, duration: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
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
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={bookingData.name}
                onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={bookingData.phone}
                onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                placeholder="+91 98765 43210"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={bookingData.email}
                onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                placeholder="your.email@example.com"
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
              </div>
            </div>
            
            {bookingStatus && (
              <div className="text-center">
                {bookingStatus === 'pending' && (
                  <div className="flex items-center justify-center space-x-2 text-yellow-600">
                    <AlertCircle className="h-5 w-5 animate-spin" />
                    <span>Waiting for owner confirmation...</span>
                  </div>
                )}
                {bookingStatus === 'confirmed' && (
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Booking Confirmed!</span>
                  </div>
                )}
                {bookingStatus === 'rejected' && (
                  <div className="flex items-center justify-center space-x-2 text-red-600">
                    <XCircle className="h-5 w-5" />
                    <span>Booking Declined</span>
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
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
            {step > 1 && (
              <Button 
                variant="outline" 
                onClick={() => setStep(step - 1)}
                disabled={bookingStatus === 'pending'}
              >
                Previous
              </Button>
            )}
            
            {step < 3 ? (
              <Button 
                onClick={() => setStep(step + 1)}
                className="ml-auto bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                disabled={
                  (step === 1 && (!bookingData.service || !bookingData.date || !bookingData.time)) ||
                  (step === 2 && (!bookingData.name || !bookingData.phone || !bookingData.email))
                }
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="ml-auto bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                disabled={bookingStatus !== null}
              >
                {bookingStatus === 'pending' ? 'Submitting...' : 'Confirm Booking'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
