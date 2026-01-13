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
    {
      icon: <Users className="h-8 w-8" />,
      title: "Connect with Clients",
      description: "Meet fitness enthusiasts who are actively looking for professional trainers in your area."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Grow Your Income",
      description: "Set your own rates and build a steady stream of clients through our platform."
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Build Your Reputation",
      description: "Showcase your expertise, collect reviews, and establish yourself as a trusted trainer."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Flexible Schedule",
      description: "Work on your own terms with flexible scheduling and booking management tools."
    }
  ];

  const features = [
    "Professional profile showcase",
    "Direct client communication",
    "Secure payment processing",
    "Review and rating system",
    "Booking management tools",
    "Marketing support"
  ];

  if (showForm) {
    return (
      <>
        <SEOHead
          title="Trainer Registration - GymSpaYoga | Join Our Platform"
          description="Register as a fitness trainer on GymSpaYoga. Connect with clients, manage bookings, and grow your training business with our comprehensive platform."
          keywords="trainer registration, fitness trainer, personal trainer, yoga instructor"
        />

        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            {registrationResult ? (
              <TrainerRegistrationSuccess
                trainerId={registrationResult.trainerId}
                status={registrationResult.status}
                onBack={() => {
                  setRegistrationResult(null);
                  setShowForm(false);
                }}
              />
            ) : (
              <TrainerRegistrationForm
                onSuccess={(result) => {
                  if (result.trainerId) {
                    setRegistrationResult({
                      trainerId: result.trainerId,
                      status: result.status || 'pending'
                    });
                  }
                }}
                onCancel={() => {
                  setRegistrationResult(null);
                  setShowForm(false);
                }}
              />
            )}

            {!user && (
              <p className="text-center text-sm text-gray-600 mt-4">
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
        description="Join GymSpaYoga as a certified trainer. Connect with fitness enthusiasts, grow your client base, and build your reputation in the wellness industry."
        keywords="become trainer, fitness trainer jobs, personal trainer platform, yoga instructor"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#005EB8] text-white py-20 lg:py-32">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-8">
                <div className="flex justify-center mb-8">
                  <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">
                    <Dumbbell className="h-20 w-20" />
                  </div>
                </div>
                <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                  Become a <span className="text-white/80">Trainer</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of certified trainers who are building successful careers through our platform. 
                  Connect with motivated clients and grow your fitness business with purpose and passion.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setShowForm(true)}
                  size="lg"
                  className="bg-white text-[#005EB8] hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  Get Started Now
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
                  asChild
                >
                  <Link to="/trainers">View Trainers</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide everything you need to succeed as a fitness professional
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="bg-[#005EB8] text-white p-3 rounded-full">
                        {benefit.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Everything You Need to Succeed
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Our comprehensive platform provides all the tools and support you need to build 
                    and grow your training business.
                  </p>
                  
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-6 w-6 text-[#005EB8] mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => setShowForm(true)}
                    size="lg"
                    className="mt-8 bg-[#005EB8] hover:bg-[#004d96]"
                  >
                    Start Your Journey
                  </Button>
                </div>
                
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
                    alt="Fitness trainer helping client"
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center">
                      <Heart className="h-8 w-8 text-red-500 mr-3" />
                      <div>
                        <p className="font-bold text-gray-900">5000+</p>
                        <p className="text-sm text-gray-600">Happy Clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#005EB8]">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Transform Lives?
              </h2>
              <p className="text-xl mb-8">
                Join our community of successful trainers and start making a difference today.
              </p>
              <Button 
                onClick={() => setShowForm(true)}
                size="lg"
                className="bg-white text-[#005EB8] hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                Register Now - It's Free!
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RegisterTrainer;
