import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, MapPin, Star, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import SEOHead from '@/components/SEOHead';
import { useTrainers } from '@/hooks/useTrainers';

const BookTrainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { trainers, loading } = useTrainers();
  const trainer = trainers.find(t => t.id === id);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Trainer Not Found</h2>
            <p className="text-muted-foreground mb-6">The trainer you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/trainers')}>
              Back to Trainers
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Booking request sent successfully!');
      navigate('/user-bookings');
    } catch (error) {
      toast.error('Failed to book session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalCost = trainer.hourly_rate * (parseInt(duration) / 60);

  return (
    <>
      <SEOHead
        title={`Book Session with ${trainer.name} - GymSpaYoga`}
        description={`Book a training session with certified trainer ${trainer.name}. ${trainer.specializations?.join(', ') || trainer.category}.`}
        keywords={`book trainer, ${trainer.name}, personal training, ${trainer.specializations?.join(', ') || trainer.category}`}
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent text-white py-12">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/20 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold">Book Training Session</h1>
            <p className="text-white/90 mt-2">Schedule your session with a certified trainer</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trainer Info */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <img
                      src={trainer.profile_image_url || "/placeholder.svg"}
                      alt={trainer.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                    <h3 className="text-xl font-bold text-foreground">{trainer.name}</h3>
                    <div className="flex items-center justify-center mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{trainer.rating || 4.8}</span>
                      <span className="text-muted-foreground ml-1">({trainer.reviews_count || 12} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{trainer.location}</span>
                    </div>
                    
                      <div>
                        <h4 className="font-semibold mb-2">Specializations</h4>
                        <div className="flex flex-wrap gap-2">
                          {trainer.specializations?.map((spec) => (
                            <span key={spec} className="px-2 py-1 bg-muted rounded-md text-sm">
                              {spec}
                            </span>
                          )) || (
                            <span className="px-2 py-1 bg-muted rounded-md text-sm capitalize">
                              {trainer.category}
                            </span>
                          )}
                        </div>
                      </div>
                    
                      <div>
                        <h4 className="font-semibold mb-2">Rate</h4>
                        <p className="text-2xl font-bold text-primary">₹{trainer.hourly_rate}/hour</p>
                      </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Your Session</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <Label htmlFor="date">Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal mt-2"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label htmlFor="time">Select Time</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          className="text-sm"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <Label htmlFor="duration">Session Duration (minutes)</Label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="90">90 minutes</option>
                      <option value="120">120 minutes</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes">Special Requirements (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific fitness goals, health conditions, or preferences..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  {/* Cost Summary */}
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Booking Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Rate per hour:</span>
                          <span>₹{trainer.hourly_rate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{duration} minutes</span>
                        </div>
                        <div className="flex justify-between font-semibold text-base border-t pt-2 mt-2">
                          <span>Total Cost:</span>
                          <span>₹{totalCost}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Submit Button */}
                  <Button
                    onClick={handleBooking}
                    disabled={isSubmitting || !selectedDate || !selectedTime}
                    className="w-full btn-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Booking Session...
                      </>
                    ) : (
                      `Book Session - ₹${totalCost}`
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookTrainer;