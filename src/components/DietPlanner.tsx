import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Apple, Flame, Beef, Wheat, Droplet, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

type Goal = 'lose' | 'maintain' | 'gain';
type Activity = 'sedentary' | 'light' | 'moderate' | 'active' | 'very';
type Sex = 'male' | 'female';

const activityFactor: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very: 1.9,
};

const goalAdjust: Record<Goal, number> = { lose: -0.2, maintain: 0, gain: 0.15 };

const mealPlans: Record<Goal, { meal: string; items: string }[]> = {
  lose: [
    { meal: 'Breakfast', items: 'Oats with berries, almonds & green tea' },
    { meal: 'Mid-Morning', items: 'Apple + 10 soaked almonds' },
    { meal: 'Lunch', items: 'Grilled chicken / paneer, salad, 1 roti, dal' },
    { meal: 'Snack', items: 'Greek yogurt + cucumber sticks' },
    { meal: 'Dinner', items: 'Vegetable soup + grilled fish / tofu + sautéed greens' },
  ],
  maintain: [
    { meal: 'Breakfast', items: 'Veg poha / 2 eggs + multigrain toast + fruit' },
    { meal: 'Mid-Morning', items: 'Banana + handful of nuts' },
    { meal: 'Lunch', items: '2 rotis, dal, sabzi, curd, salad' },
    { meal: 'Snack', items: 'Sprouts chaat or roasted chana' },
    { meal: 'Dinner', items: 'Brown rice + rajma / chicken curry + salad' },
  ],
  gain: [
    { meal: 'Breakfast', items: 'Paneer paratha + milkshake + 4 egg whites' },
    { meal: 'Mid-Morning', items: 'Peanut butter banana smoothie' },
    { meal: 'Lunch', items: '3 rotis, chicken / soya curry, dal, rice, curd' },
    { meal: 'Snack', items: 'Protein shake + dates + nuts' },
    { meal: 'Dinner', items: 'Rice + paneer / chicken + ghee roti + sabzi' },
  ],
};

export default function DietPlanner() {
  const [age, setAge] = useState('28');
  const [sex, setSex] = useState<Sex>('male');
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');
  const [activity, setActivity] = useState<Activity>('moderate');
  const [goal, setGoal] = useState<Goal>('maintain');
  const [show, setShow] = useState(false);

  const result = useMemo(() => {
    const a = +age, h = +height, w = +weight;
    if (!a || !h || !w) return null;
    const bmr = sex === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * activityFactor[activity];
    const calories = Math.round(tdee * (1 + goalAdjust[goal]));
    const protein = Math.round(w * (goal === 'gain' ? 2 : goal === 'lose' ? 1.8 : 1.4));
    const fats = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories - protein * 4 - fats * 9) / 4);
    const water = Math.round(w * 0.04 * 10) / 10;
    return { calories, protein, fats, carbs, water };
  }, [age, sex, height, weight, activity, goal]);

  return (
    <section className="py-16 md:py-20 bg-accent/40" aria-labelledby="diet-planner-heading">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Free Diet Planner</p>
            <h2 id="diet-planner-heading" className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Personalized Diet Plan & Calorie Calculator
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get a free Indian diet chart for weight loss, muscle gain or maintenance — calculates BMR, TDEE, macros (protein, carbs, fats) & daily water intake.
            </p>
          </div>
        </ScrollReveal>

        <Card className="max-w-5xl mx-auto border border-border bg-card shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="dp-age">Age</Label>
                <Input id="dp-age" type="number" value={age} onChange={e => setAge(e.target.value)} />
              </div>
              <div>
                <Label>Sex</Label>
                <Select value={sex} onValueChange={(v) => setSex(v as Sex)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dp-h">Height (cm)</Label>
                <Input id="dp-h" type="number" value={height} onChange={e => setHeight(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="dp-w">Weight (kg)</Label>
                <Input id="dp-w" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
              </div>
              <div>
                <Label>Activity Level</Label>
                <Select value={activity} onValueChange={(v) => setActivity(v as Activity)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (desk job)</SelectItem>
                    <SelectItem value="light">Light (1-3 days/wk)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-5 days/wk)</SelectItem>
                    <SelectItem value="active">Active (6-7 days/wk)</SelectItem>
                    <SelectItem value="very">Very Active (athlete)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Goal</Label>
                <Select value={goal} onValueChange={(v) => setGoal(v as Goal)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">Weight Loss / Fat Burn</SelectItem>
                    <SelectItem value="maintain">Maintain Fitness</SelectItem>
                    <SelectItem value="gain">Muscle Gain / Bulk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-center mb-6">
              <Button onClick={() => setShow(true)} size="lg" className="rounded-xl px-8">
                <Sparkles className="mr-2 h-4 w-4" /> Generate My Diet Plan
              </Button>
            </div>

            {show && result && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { icon: Flame, label: 'Calories', value: `${result.calories}`, unit: 'kcal/day' },
                    { icon: Beef, label: 'Protein', value: `${result.protein}`, unit: 'grams' },
                    { icon: Wheat, label: 'Carbs', value: `${result.carbs}`, unit: 'grams' },
                    { icon: Apple, label: 'Fats', value: `${result.fats}`, unit: 'grams' },
                    { icon: Droplet, label: 'Water', value: `${result.water}`, unit: 'litres' },
                  ].map(s => (
                    <div key={s.label} className="bg-background border border-border rounded-2xl p-4 text-center">
                      <s.icon className="h-5 w-5 text-primary mx-auto mb-1.5" />
                      <div className="text-2xl font-bold text-foreground">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label} • {s.unit}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">Sample Daily Meal Plan</h3>
                  <div className="grid gap-2">
                    {mealPlans[goal].map(m => (
                      <div key={m.meal} className="flex items-start gap-3 bg-background border border-border rounded-xl p-3">
                        <div className="w-24 shrink-0 text-sm font-semibold text-primary">{m.meal}</div>
                        <div className="text-sm text-foreground">{m.items}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    *Indicative plan. For medical conditions or precise macros, consult a certified nutritionist or trainer on GymSpaYoga.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
