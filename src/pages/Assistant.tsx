import React from 'react';
import AIAssistant from '@/components/ai/AIAssistant';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import { Sparkles, MessageCircle, Brain, Dumbbell, Flower2, Heart } from 'lucide-react';

const Assistant: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <AppHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Wellness Assistant</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Your Personal
              <span className="text-primary"> Wellness Guide</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tell me how you're feeling, and I'll recommend the perfect gym, spa, yoga studio, or trainer for you. 
              I also help business owners create compelling listings!
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-card border text-center">
              <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm">Find Gyms</h3>
              <p className="text-xs text-muted-foreground">Based on your goals</p>
            </div>
            <div className="p-4 rounded-xl bg-card border text-center">
              <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-sm">Book Spas</h3>
              <p className="text-xs text-muted-foreground">For relaxation</p>
            </div>
            <div className="p-4 rounded-xl bg-card border text-center">
              <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Flower2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-sm">Yoga Studios</h3>
              <p className="text-xs text-muted-foreground">Inner peace awaits</p>
            </div>
            <div className="p-4 rounded-xl bg-card border text-center">
              <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Brain className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-sm">Smart Matching</h3>
              <p className="text-xs text-muted-foreground">AI recommendations</p>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="bg-card border rounded-2xl shadow-lg overflow-hidden" style={{ height: '600px' }}>
            <AIAssistant isFloating={false} defaultOpen={true} />
          </div>

          {/* Tips Section */}
          <div className="mt-8 p-6 rounded-xl bg-muted/50 border">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Tips for better recommendations
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Share your mood: "I'm feeling stressed and need to relax"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Mention your location: "Find gyms in Mumbai"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Specify budget: "Budget-friendly yoga classes"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Business owners: "Help me write a listing for my spa"</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default Assistant;
