
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Phone, Mail, Calendar, Clock, MapPin } from "lucide-react";

interface GuestBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  businessType: string;
  location: string;
}

const GuestBookingModal = ({ isOpen, onClose, businessName, businessType, location }: GuestBookingModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate booking submission
    toast.success("Booking request submitted! We'll call you within 30 minutes to confirm.");
    onClose();
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      notes: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Quick Booking - {businessName}
          </DialogTitle>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <MapPin className="h-4 w-4 mr-1" />
            {location} • {businessType}
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your@email.com"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number *
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+91 98765 43210"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="date" className="text-sm font-medium">
                Preferred Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="time" className="text-sm font-medium">
                Preferred Time
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="text-sm font-medium">
              Special Requests (Optional)
            </Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any specific requirements or questions"
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Quick Booking:</strong> We'll call you within 30 minutes to confirm availability and finalize your booking.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
            >
              Request Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GuestBookingModal;
