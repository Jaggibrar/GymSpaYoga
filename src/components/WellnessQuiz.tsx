import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, RotateCcw, Dumbbell, Flower2, Heart, UserCheck, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Goal = 'strength' | 'relax' | 'flexibility' | 'guidance' | 'recovery';

const questions = [
  {
    q: 'What is your #1 wellness goal right now?',
    options: [
      { label: 'Build strength & lose weight', value: 'strength' as Goal, icon: Dumbbell },
      { label: 'Relax & de-stress', value: 'relax' as Goal, icon: Flower2 },
      { label: 'Improve flexibility & mindfulness', value: 'flexibility' as Goal, icon: Heart },
      { label: 'Get expert 1-on-1 guidance', value: 'guidance' as Goal, icon: UserCheck },
      { label: 'Recover from pain or injury', value: 'recovery' as Goal, icon: Activity },
    ],
  },
];

const results: Record<Goal, { title: string; desc: string; href: string; cta: string }> = {
  strength: { title: 'A Premium Gym is your match', desc: 'Top-rated fitness centers with modern equipment and expert staff near you.', href: '/gyms', cta: 'Browse Gyms' },
  relax: { title: 'A Luxury Spa is calling', desc: 'Indulge in massages, aromatherapy and rejuvenating spa treatments.', href: '/spas', cta: 'Explore Spas' },
  flexibility: { title: 'Yoga Studios are perfect for you', desc: 'Authentic yoga classes from beginner Hatha to advanced Ashtanga.', href: '/yoga', cta: 'Find Yoga Classes' },
  guidance: { title: 'A Personal Trainer is what you need', desc: 'Certified trainers who design custom plans around your goals.', href: '/trainers', cta: 'Hire a Trainer' },
  recovery: { title: 'A Chiropractor or Therapist will help', desc: 'Specialists in spine care, pain relief and physical therapy.', href: '/chiropractors', cta: 'Find a Specialist' },
};

const WellnessQuiz = () => {
  const [answer, setAnswer] = useState<Goal | null>(null);

  const result = answer ? results[answer] : null;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-3">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Find Your Match in 10 Seconds</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Which Wellness Service Is Right For You?
            </h2>
            <p className="text-muted-foreground">Answer one question and get a personalized recommendation.</p>
          </div>

          <Card className="border border-border shadow-lg bg-card overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div
                    key="question"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-5 text-center">
                      {questions[0].q}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {questions[0].options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setAnswer(opt.value)}
                          className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <opt.icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium text-foreground text-sm">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-4"
                  >
                    <div className="inline-flex w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-4">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                      {result.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">{result.desc}</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link to={result.href}>
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 font-semibold">
                          {result.cta} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Button size="lg" variant="outline" onClick={() => setAnswer(null)} className="rounded-xl">
                        <RotateCcw className="mr-2 h-4 w-4" /> Retake
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WellnessQuiz;
