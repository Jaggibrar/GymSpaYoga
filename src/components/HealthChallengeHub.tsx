import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Brain, ListChecks, Trophy, RefreshCw, Sparkles, Target, Flame, Award, ArrowRight, CheckCircle2, Save, TrendingUp, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

/* ---------------- DATA POOLS ---------------- */

type Quiz = { q: string; options: { text: string; correct?: boolean; explain?: string }[] };

const QUIZ_POOL: Quiz[] = [
  { q: 'How many minutes of moderate exercise per week does the WHO recommend for adults?', options: [
    { text: '60 minutes' }, { text: '150 minutes', correct: true, explain: 'WHO recommends 150–300 mins moderate activity weekly.' }, { text: '300 minutes' }, { text: '500 minutes' },
  ]},
  { q: 'Which macronutrient builds and repairs muscle?', options: [
    { text: 'Carbs' }, { text: 'Fats' }, { text: 'Protein', correct: true, explain: 'Aim for 1.2–2g/kg bodyweight.' }, { text: 'Fiber' },
  ]},
  { q: 'How many glasses of water should an average adult drink daily?', options: [
    { text: '2–3' }, { text: '8–10', correct: true, explain: '~2.5–3.5L depending on activity & climate.' }, { text: '15+' }, { text: '1' },
  ]},
  { q: 'Best time to do a stretch/yoga cooldown?', options: [
    { text: 'Before workout' }, { text: 'After workout', correct: true, explain: 'Stretching warm muscles improves flexibility safely.' }, { text: 'Never' }, { text: 'Mid-workout' },
  ]},
  { q: 'Which yoga style is most relaxing for beginners?', options: [
    { text: 'Ashtanga' }, { text: 'Power Yoga' }, { text: 'Hatha', correct: true, explain: 'Slow, gentle and beginner-friendly.' }, { text: 'Bikram' },
  ]},
  { q: 'Recommended sleep for adults?', options: [
    { text: '4–5 hours' }, { text: '7–9 hours', correct: true, explain: 'Crucial for recovery and metabolism.' }, { text: '10+ hours' }, { text: '3 hours' },
  ]},
  { q: 'Healthiest cooking oil among these?', options: [
    { text: 'Refined palm oil' }, { text: 'Extra virgin olive oil', correct: true, explain: 'High in monounsaturated fats and antioxidants.' }, { text: 'Vanaspati' }, { text: 'Margarine' },
  ]},
  { q: 'BMI range considered "healthy" for most adults?', options: [
    { text: '15–18' }, { text: '18.5–24.9', correct: true }, { text: '25–30' }, { text: '30+' },
  ]},
  { q: 'Which is a complete protein source?', options: [
    { text: 'Rice alone' }, { text: 'Eggs', correct: true, explain: 'Contains all 9 essential amino acids.' }, { text: 'Potato' }, { text: 'Bread' },
  ]},
  { q: 'How long should a deep tissue massage typically last?', options: [
    { text: '5 mins' }, { text: '60–90 mins', correct: true }, { text: '4 hours' }, { text: '10 mins' },
  ]},
  { q: 'Which exercise burns most calories per minute?', options: [
    { text: 'Walking' }, { text: 'HIIT', correct: true, explain: '~12–15 kcal/min and afterburn effect.' }, { text: 'Stretching' }, { text: 'Standing' },
  ]},
  { q: 'Best pre-workout meal timing?', options: [
    { text: '5 mins before' }, { text: '1–2 hours before', correct: true }, { text: '6 hours before' }, { text: 'During workout' },
  ]},
  { q: 'Which vitamin is the "sunshine vitamin"?', options: [
    { text: 'Vitamin C' }, { text: 'Vitamin D', correct: true, explain: '15 mins sun exposure boosts immunity & bones.' }, { text: 'Vitamin B12' }, { text: 'Vitamin A' },
  ]},
  { q: 'Pranayama is the practice of?', options: [
    { text: 'Strength training' }, { text: 'Breath control', correct: true }, { text: 'Cardio' }, { text: 'Dancing' },
  ]},
  { q: 'Resting heart rate of a fit adult?', options: [
    { text: '40–60 bpm', correct: true, explain: 'Athletes often have 40–55 bpm.' }, { text: '90–110 bpm' }, { text: '120+ bpm' }, { text: '20 bpm' },
  ]},
  { q: 'Which is a sign of dehydration?', options: [
    { text: 'Clear urine' }, { text: 'Dark yellow urine', correct: true }, { text: 'Sweating' }, { text: 'Sneezing' },
  ]},
  { q: 'Best stress-relief activity?', options: [
    { text: 'Doomscrolling' }, { text: 'Meditation', correct: true, explain: '10 mins/day lowers cortisol significantly.' }, { text: 'Late-night caffeine' }, { text: 'Skipping meals' },
  ]},
  { q: 'Which is a "good fat"?', options: [
    { text: 'Trans fat' }, { text: 'Omega-3', correct: true }, { text: 'Hydrogenated oil' }, { text: 'Saturated only' },
  ]},
];

const TASK_POOL = [
  { id: 't1', text: 'Drink 2 glasses of water right now', icon: '💧', points: 10 },
  { id: 't2', text: 'Take a 5-minute stretching break', icon: '🤸', points: 15 },
  { id: 't3', text: 'Do 20 squats', icon: '🏋️', points: 20 },
  { id: 't4', text: 'Walk 1,000 steps', icon: '🚶', points: 15 },
  { id: 't5', text: '5 mins of deep breathing / meditation', icon: '🧘', points: 15 },
  { id: 't6', text: 'Eat a piece of fruit', icon: '🍎', points: 10 },
  { id: 't7', text: 'Stand up & roll your shoulders 10x', icon: '💪', points: 5 },
  { id: 't8', text: 'Look 20ft away for 20 seconds (eye rest)', icon: '👀', points: 5 },
  { id: 't9', text: 'Do 15 push-ups', icon: '🔥', points: 25 },
  { id: 't10', text: 'Plank for 30 seconds', icon: '🪵', points: 20 },
  { id: 't11', text: 'Skip sugar in your next drink', icon: '🚫', points: 15 },
  { id: 't12', text: 'Climb stairs instead of lift', icon: '🪜', points: 15 },
  { id: 't13', text: 'Add a serving of greens to a meal', icon: '🥗', points: 15 },
  { id: 't14', text: 'No phone for next 30 mins', icon: '📵', points: 20 },
  { id: 't15', text: 'Sleep 30 mins earlier tonight', icon: '😴', points: 20 },
  { id: 't16', text: 'Practice gratitude — list 3 things', icon: '🙏', points: 10 },
  { id: 't17', text: '10 jumping jacks right now', icon: '⚡', points: 15 },
  { id: 't18', text: 'Do a 1-min wall sit', icon: '🧱', points: 20 },
];

/* ---------------- HELPERS ---------------- */

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
const pickN = <T,>(arr: T[], n: number) => shuffle(arr).slice(0, n);

/* ---------------- COMPONENT ---------------- */

const HealthChallengeHub = () => {
  const [seed, setSeed] = useState(0);

  const quizzes = useMemo(() => pickN(QUIZ_POOL, 3).map(q => ({ ...q, options: shuffle(q.options) })), [seed]);
  const tasks = useMemo(() => pickN(TASK_POOL, 6), [seed]);

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => { setQuizIndex(0); setQuizAnswers({}); setDone({}); }, [seed]);

  const totalTaskPoints = tasks.reduce((s, t) => s + t.points, 0);
  const earnedTaskPoints = tasks.reduce((s, t) => s + (done[t.id] ? t.points : 0), 0);
  const taskPct = Math.round((earnedTaskPoints / totalTaskPoints) * 100);

  const correctAnswers = quizzes.reduce((s, q, i) => {
    const ans = quizAnswers[i];
    return s + (ans !== undefined && q.options[ans]?.correct ? 1 : 0);
  }, 0);
  const quizPct = Math.round((correctAnswers / quizzes.length) * 100);

  // Health score: weighted blend
  const healthScore = Math.round(quizPct * 0.4 + taskPct * 0.6);
  const grade = healthScore >= 85 ? { label: 'Wellness Champion', color: 'text-primary', icon: Trophy } :
                healthScore >= 60 ? { label: 'On Track', color: 'text-primary', icon: Flame } :
                healthScore >= 30 ? { label: 'Getting Started', color: 'text-foreground', icon: Target } :
                { label: 'Take Action!', color: 'text-muted-foreground', icon: Sparkles };
  const GradeIcon = grade.icon;

  const currentQuiz = quizzes[quizIndex];
  const currentAnswer = quizAnswers[quizIndex];
  const answered = currentAnswer !== undefined;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-accent/40 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-3">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Daily Health Challenge</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Test Your Health IQ & Build Better Habits
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              New quiz questions and tasks every visit. Complete them to boost your Health Score!
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSeed(s => s + 1)}
              className="mt-4 rounded-xl"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-2" /> Shuffle New Set
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* QUIZ */}
            <Card className="lg:col-span-1 border border-border bg-card shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-foreground">Health IQ Quiz</h3>
                  </div>
                  <Badge variant="secondary" className="text-xs">{quizIndex + 1}/{quizzes.length}</Badge>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${seed}-${quizIndex}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <p className="font-medium text-foreground mb-4 min-h-[3rem]">{currentQuiz.q}</p>
                    <div className="space-y-2">
                      {currentQuiz.options.map((opt, i) => {
                        const isSelected = currentAnswer === i;
                        const showResult = answered;
                        const isCorrect = opt.correct;
                        return (
                          <button
                            key={i}
                            disabled={answered}
                            onClick={() => setQuizAnswers(a => ({ ...a, [quizIndex]: i }))}
                            className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${
                              showResult && isCorrect
                                ? 'border-primary bg-primary/10 text-foreground font-medium'
                                : showResult && isSelected && !isCorrect
                                ? 'border-destructive bg-destructive/10 text-foreground'
                                : isSelected
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/40 hover:bg-accent/40'
                            }`}
                          >
                            <span className="flex items-center justify-between gap-2">
                              <span>{opt.text}</span>
                              {showResult && isCorrect && <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {answered && currentQuiz.options[currentAnswer]?.explain && (
                      <p className="mt-3 text-xs text-muted-foreground bg-accent/40 p-3 rounded-xl">
                        💡 {currentQuiz.options[currentAnswer].explain ||
                            currentQuiz.options.find(o => o.correct)?.explain}
                      </p>
                    )}

                    <div className="flex justify-between mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={quizIndex === 0}
                        onClick={() => setQuizIndex(i => i - 1)}
                        className="rounded-xl"
                      >
                        Previous
                      </Button>
                      <Button
                        size="sm"
                        disabled={!answered || quizIndex === quizzes.length - 1}
                        onClick={() => setQuizIndex(i => i + 1)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                      >
                        Next <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* TASKS */}
            <Card className="lg:col-span-1 border border-border bg-card shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <ListChecks className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-foreground">Today's Mini-Tasks</h3>
                  </div>
                  <Badge variant="secondary" className="text-xs">{earnedTaskPoints}/{totalTaskPoints} pts</Badge>
                </div>

                <Progress value={taskPct} className="h-2 mb-4" />

                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {tasks.map((t) => (
                    <label
                      key={`${seed}-${t.id}`}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        done[t.id] ? 'border-primary/30 bg-primary/5' : 'border-border hover:border-primary/30 hover:bg-accent/30'
                      }`}
                    >
                      <Checkbox
                        checked={!!done[t.id]}
                        onCheckedChange={(v) => setDone(d => ({ ...d, [t.id]: !!v }))}
                      />
                      <span className="text-xl flex-shrink-0">{t.icon}</span>
                      <span className={`flex-1 text-sm ${done[t.id] ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {t.text}
                      </span>
                      <Badge variant="outline" className="text-xs">+{t.points}</Badge>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* HEALTH SCORE CARD */}
            <Card className="lg:col-span-1 border border-primary/20 bg-card shadow-md overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
              <CardContent className="p-6 relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-foreground">Your Health Score</h3>
                </div>

                {/* Score circle */}
                <div className="flex flex-col items-center py-4">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                      <motion.circle
                        cx="60" cy="60" r="52" fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 52}
                        initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - healthScore / 100) }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-display font-bold text-foreground">{healthScore}</span>
                      <span className="text-xs text-muted-foreground">/ 100</span>
                    </div>
                  </div>

                  <div className={`mt-4 flex items-center gap-2 ${grade.color}`}>
                    <GradeIcon className="h-5 w-5" />
                    <span className="font-bold">{grade.label}</span>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Quiz Accuracy</span>
                    <span className="font-semibold text-foreground">{quizPct}%</span>
                  </div>
                  <Progress value={quizPct} className="h-1.5" />
                  <div className="flex items-center justify-between text-sm pt-2">
                    <span className="text-muted-foreground">Task Completion</span>
                    <span className="font-semibold text-foreground">{taskPct}%</span>
                  </div>
                  <Progress value={taskPct} className="h-1.5" />
                </div>

                <Link to="/explore" className="block mt-5">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold">
                    Boost Your Score — Find Wellness Pros
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthChallengeHub;
