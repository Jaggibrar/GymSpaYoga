
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Dumbbell, Sparkles } from 'lucide-react';

interface MoodFilterProps {
  selectedMood: string | null;
  onMoodChange: (mood: string | null) => void;
}

export const MoodFilter = ({ selectedMood, onMoodChange }: MoodFilterProps) => {
  const moods = [
    {
      id: 'relax',
      label: 'Relax & Unwind',
      icon: Heart,
      description: 'Perfect for spa treatments and gentle yoga',
      color: 'from-blue-500 to-purple-500',
      categories: ['spa', 'yoga'],
      tiers: ['luxury', 'premium']
    },
    {
      id: 'fitness',
      label: 'Get Energized & Build Strength',
      description: 'High-intensity workouts and strength training',
      icon: Dumbbell,
      color: 'from-orange-500 to-red-500',
      categories: ['gym'],
      tiers: ['premium', 'budget', 'luxury']
    },
    {
      id: 'rejuvenate',
      label: 'Rejuvenate & Recover',
      description: 'Wellness and recovery focused treatments',
      icon: Sparkles,
      color: 'from-emerald-500 to-teal-500',
      categories: ['spa', 'yoga'],
      tiers: ['luxury', 'premium']
    }
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">How are you feeling today?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {moods.map((mood) => {
            const Icon = mood.icon;
            const isSelected = selectedMood === mood.id;
            
            return (
              <Button
                key={mood.id}
                variant={isSelected ? "default" : "outline"}
                className={`h-auto p-4 flex flex-col items-center gap-2 text-center transition-all ${
                  isSelected 
                    ? `bg-gradient-to-br ${mood.color} text-white hover:opacity-90` 
                    : 'hover:border-gray-400'
                }`}
                onClick={() => onMoodChange(selectedMood === mood.id ? null : mood.id)}
              >
                <Icon className="h-6 w-6" />
                <div>
                  <div className="font-medium">{mood.label}</div>
                  <div className="text-xs opacity-80 mt-1">{mood.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
        
        {selectedMood && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Great choice! We'll show you {moods.find(m => m.id === selectedMood)?.categories.join(', ')} 
              {' '}options that match your mood.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodFilter;
