import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react";
import { useCalendar } from '@/hooks/useCalendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CalendarView = () => {
  const { events, loading, createEvent } = useCalendar();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<{
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    event_type: 'booking' | 'session' | 'reminder';
  }>({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    event_type: 'reminder'
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => 
      event.start_time.startsWith(dateStr)
    );
  };

  const handleCreateEvent = async () => {
    try {
      await createEvent(newEvent);
      setIsCreateDialogOpen(false);
      setNewEvent({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        event_type: 'reminder'
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'bg-blue-500';
      case 'session': return 'bg-green-500';
      case 'reminder': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  if (loading) {
    return <div className="animate-pulse h-64 md:h-96 bg-gray-200 rounded-lg"></div>;
  }

  const days = getDaysInMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <Card className="w-full">
      <CardHeader className="pb-3 px-3 md:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Calendar className="h-4 w-4 md:h-5 md:w-5" />
            <span className="truncate">{monthYear}</span>
          </CardTitle>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={previousMonth} className="touch-target">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous month</span>
            </Button>
            <Button variant="outline" size="sm" onClick={nextMonth} className="touch-target">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-[#005EB8] hover:bg-[#004d96] touch-target flex-1 sm:flex-initial">
                  <Plus className="h-4 w-4 mr-1" />
                  <span className="hidden xs:inline">Add Event</span>
                  <span className="xs:hidden">Add</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md mx-auto">
                <DialogHeader>
                  <DialogTitle className="text-lg">Create New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <Input
                    placeholder="Event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    className="mobile-text"
                  />
                  <Textarea
                    placeholder="Description (optional)"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    className="mobile-text min-h-[80px]"
                  />
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Time</label>
                      <Input
                        type="datetime-local"
                        value={newEvent.start_time}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, start_time: e.target.value }))}
                        className="mobile-text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Time</label>
                      <Input
                        type="datetime-local"
                        value={newEvent.end_time}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, end_time: e.target.value }))}
                        className="mobile-text"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Event Type</label>
                    <Select 
                      value={newEvent.event_type} 
                      onValueChange={(value: 'booking' | 'session' | 'reminder') => 
                        setNewEvent(prev => ({ ...prev, event_type: value }))
                      }
                    >
                      <SelectTrigger className="mobile-text">
                        <SelectValue placeholder="Event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reminder">Reminder</SelectItem>
                        <SelectItem value="session">Session</SelectItem>
                        <SelectItem value="booking">Booking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={handleCreateEvent}
                    disabled={!newEvent.title || !newEvent.start_time || !newEvent.end_time}
                    className="w-full bg-[#005EB8] hover:bg-[#004d96] touch-target"
                  >
                    Create Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 md:px-6">
        {/* Mobile-optimized day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2 md:mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-1 md:p-2 text-center font-semibold text-gray-600 text-xs md:text-sm">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.charAt(0)}</span>
            </div>
          ))}
        </div>
        
        {/* Mobile-optimized calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const isToday = date && date.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`min-h-16 md:min-h-24 p-1 border border-gray-200 rounded ${
                  date ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
                } ${isToday ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-200' : ''}`}
              >
                {date && (
                  <>
                    <div className={`text-xs md:text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 1).map(event => (
                        <Badge
                          key={event.id}
                          className={`text-xs p-1 w-full ${getEventTypeColor(event.event_type)} text-white`}
                        >
                          <div className="flex items-center gap-1">
                            <Clock className="h-2 w-2 md:h-3 md:w-3" />
                            <span className="truncate text-xs">{event.title}</span>
                          </div>
                        </Badge>
                      ))}
                      {dayEvents.length > 1 && (
                        <Badge variant="outline" className="text-xs p-1 w-full">
                          <span className="text-xs">+{dayEvents.length - 1}</span>
                        </Badge>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
