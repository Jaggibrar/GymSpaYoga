import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Star, CheckCircle, Dumbbell, Heart, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import TrainerRegistrationForm from '@/components/trainer/TrainerRegistrationForm';
import TrainerRegistrationSuccess from '@/components/trainer/TrainerRegistrationSuccess';
import SEOHead from '@/components/SEOHead';
import { useAuth } from '@/hooks/useAuth';

const RegisterTrainer = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<{ trainerId: string; status: string } | null>(null);

  const benefits = [
    { icon: <Users className="h-7 w-7" />, title: 'Connect with clients', description: 'Reach motivated trainees actively searching for trainers.' },
    { icon: <TrendingUp className="h-7 w-7" />, title: 'Grow your income', description: 'Set your rates and build a steady client base.' },
    { icon: <Star className="h-7 w-7" />, title: 'Build your reputation', description: 'Showcase expertise and collect verified reviews.' },
    { icon: <Clock className="h-7 w-7" />, title: 'Flexible schedule', description: 'Work on your terms with smart booking tools.' },
  ];

  const features = [
    'Professional profile showcase',
    'Direct client communication',
    'Secure payment processing',
    'Review and rating system',
    'Booking management tools',
    'Marketing support',
  ];

  if (showForm) {
    return (
      <>
        <SEOHead
          title="Trainer Registration - GymSpaYoga"
          description="Register as a fitness trainer on GymSpaYoga. Connect with clients and grow your training business."
          keywords="trainer registration, fitness trainer, personal trainer, yoga instructor"
        />
        <div className="min-h-screen bg-background py-12">
          <div className="container mx-auto px-4">
            {registrationResult ? (
              <TrainerRegistrationSuccess
                trainerId={registrationResult.trainerId}
                status={registrationResult.status}
                onBack={() => { setRegistrationResult(null); setShowForm(false); }}
              />
            ) : (
              <TrainerRegistrationForm
                onSuccess={(result) => {
                  if (result.trainerId) {
                    setRegistrationResult({
                      trainerId: result.trainerId,
                      status: result.status || 'pending',
                    });
                  }
                }}
                onCancel={() => { setRegistrationResult(null); setShowForm(false); }}
              />
            )}
            {!user && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                You must be logged in to submit your trainer application.
              </p>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Become a Trainer - GymSpaYoga | Join Our Network"
        description="Join GymSpaYoga as a certified trainer. Connect with fitness enthusiasts and grow your client base."
        keywords="become trainer, fitness trainer jobs, personal trainer platform, yoga instructor"
      />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden section-padding">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 grain-overlay pointer-events-none" />
          <div className="container-modern relative">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-emerald opacity-30 blur-2xl rounded-full" />
                  <div className="relative w-20 h-20 rounded-3xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <Dumbbell className="h-10 w-10 text-primary" />
                  </div>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-[1.05]">
                Become a <span className="text-gradient-emerald">trainer</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                Join certified trainers building successful careers on our platform. Connect with motivated clients and grow with purpose.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="btn-primary" onClick={() => setShowForm(true)}>
                  Get Started Now
                </Button>
                <Button size="lg" className="btn-secondary" asChild>
                  <Link to="/trainers">View Trainers</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding">
          <div className="container-modern">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Why choose <span className="text-gradient-emerald">our platform</span>
              </h2>
              <p className="text-muted-foreground text-lg">Everything you need to succeed as a fitness professional.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <Card key={i} className="glass-card glass-card-hover border-0">
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4 text-primary">
                      {b.icon}
                    </div>
                    <CardTitle className="text-lg font-display text-foreground">{b.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features split */}
        <section className="section-padding">
          <div className="container-modern">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 leading-tight">
                  Everything you need to <span className="text-gradient-emerald">succeed</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  A complete toolkit to build and grow your training business.
                </p>
                <div className="space-y-3">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 glass-card px-4 py-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => setShowForm(true)} size="lg" className="mt-8 btn-primary">
                  Start Your Journey
                </Button>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-emerald opacity-20 blur-3xl rounded-full" />
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80"
                  alt="Fitness trainer helping client"
                  className="relative rounded-3xl shadow-2xl w-full h-[480px] object-cover border border-white/10"
                  loading="lazy"
                />
                <div className="absolute -bottom-5 -left-5 glass-card px-5 py-4 flex items-center gap-3">
                  <Heart className="h-7 w-7 text-primary" />
                  <div>
                    <p className="font-display font-bold text-foreground">5,000+</p>
                    <p className="text-xs text-muted-foreground">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-modern">
            <div className="relative overflow-hidden rounded-3xl glass-card p-12 md:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-hero opacity-60" />
              <div className="relative max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Ready to <span className="text-gradient-emerald">transform lives?</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Join our community of successful trainers and start making a difference today.
                </p>
                <Button onClick={() => setShowForm(true)} size="lg" className="btn-primary">
                  Register Now — It's Free
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RegisterTrainer;
