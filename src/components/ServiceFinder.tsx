import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Flower2, Heart, UserCheck, Activity, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

type Goal = 'fitness' | 'relax' | 'flexibility' | 'pain' | 'transform';
type Budget = 'budget' | 'premium' | 'luxury';

const goals: { id: Goal; label: string; icon: React.ElementType; desc: string }[] = [
  { id: 'fitness', label: 'Build Strength', icon: Dumbbell, desc: 'Get stronger & fitter' },
  { id: 'relax', label: 'Relax & Unwind', icon: Flower2, desc: 'De-stress & rejuvenate' },
  { id: 'flexibility', label: 'Flexibility & Calm', icon: Heart, desc: 'Yoga & mindfulness' },
  { id: 'pain', label: 'Pain Relief', icon: Activity, desc: 'Back, joint, posture' },
  { id: 'transform', label: '1-on-1 Coaching', icon: UserCheck, desc: 'Personal guidance' },
];

const budgets: { id: Budget; label: string; range: string }[] = [
  { id: 'budget', label: 'Budget', range: 'Under ₹2k/mo' },
  { id: 'premium', label: 'Premium', range: '₹2k–6k/mo' },
  { id: 'luxury', label: 'Luxury', range: '₹6k+/mo' },
];

const routeFor = (goal: Goal, budget: Budget) => {
  const tier = budget;
  switch (goal) {
    case 'fitness': return `/gyms?tier=${tier}`;
    case 'relax': return `/spas?tier=${tier}`;
    case 'flexibility': return `/yoga?tier=${tier}`;
    case 'pain': return `/chiropractors`;
    case 'transform': return `/trainers?tier=${tier}`;
  }
};

const ServiceFinder = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);

  const reset = () => { setStep(1); setGoal(null); setBudget(null); };
  const handleGo = () => { if (goal && budget) navigate(routeFor(goal, budget)); };

  const recommendation = () => {
    if (!goal) return '';
    const labels: Record<Goal, string> = {
      fitness: 'Gyms', relax: 'Spas', flexibility: 'Yoga Studios', pain: 'Chiropractors', transform: 'Personal Trainers',
    };
    return labels[goal];
  };

  return (
    <section className="py-12 md:py-16 bg-accent/40 border-y border-border">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <Badge className="mb-3 bg-primary/10 text-primary border-0"><Sparkles className="h-3 w-3 mr-1" /> Choose Your Service</Badge>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">Find your perfect wellness match in 30 seconds</h2>
            <p className="text-muted-foreground text-sm md:text-base">Answer 2 quick questions and we'll recommend the right service for your goal & budget.</p>
          </div>
        </ScrollReveal>

        <Card className="max-w-3xl mx-auto border border-border shadow-md rounded-2xl overflow-hidden">
          <CardContent className="p-6 md:p-8">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-6 text-xs font-medium text-muted-foreground">
              <span className={step >= 1 ? 'text-primary' : ''}>1. Goal</span>
              <div className="flex-1 h-1 bg-border rounded-full overflow-hidden"><div className="h-full bg-primary transition-all" style={{ width: `${(step / 3) * 100}%` }} /></div>
              <span className={step >= 2 ? 'text-primary' : ''}>2. Budget</span>
              <span className={step >= 3 ? 'text-primary' : ''}>3. Result</span>
            </div>

            {step === 1 && (
              <div>
                <h3 className="text-lg font-display font-bold mb-4">What's your primary goal?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {goals.map(g => (
                    <button
                      key={g.id}
                      onClick={() => { setGoal(g.id); setStep(2); }}
                      className="text-left p-4 rounded-2xl border border-border hover:border-primary hover:bg-primary/5 transition-all group min-h-[88px]"
                    >
                      <g.icon className="h-6 w-6 text-primary mb-2" />
                      <div className="font-bold text-foreground text-sm">{g.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{g.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-display font-bold mb-4">What's your budget?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {budgets.map(b => (
                    <button
                      key={b.id}
                      onClick={() => { setBudget(b.id); setStep(3); }}
                      className="text-left p-5 rounded-2xl border border-border hover:border-primary hover:bg-primary/5 transition-all min-h-[88px]"
                    >
                      <div className="font-bold text-foreground">{b.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{b.range}</div>
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="mt-4 text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
                  <RotateCcw className="h-3.5 w-3.5" /> Change goal
                </button>
              </div>
            )}

            {step === 3 && goal && budget && (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold mb-2">Perfect — we recommend</h3>
                <p className="text-3xl font-display font-bold text-primary mb-3">{recommendation()}</p>
                <p className="text-muted-foreground text-sm mb-6">
                  Filtered for <strong className="text-foreground">{budgets.find(b => b.id === budget)?.label}</strong> tier.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleGo} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold min-h-[48px]">
                    See Recommended Listings <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button onClick={reset} size="lg" variant="outline" className="rounded-xl min-h-[48px]">
                    <RotateCcw className="h-4 w-4 mr-2" /> Start Over
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServiceFinder;
