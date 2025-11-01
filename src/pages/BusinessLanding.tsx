
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Star, TrendingUp, Users, Shield, Zap, Calculator, PlayCircle, Award, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEOHead from "@/components/SEOHead";

const BusinessLanding = () => {
  const [monthlyVisitors, setMonthlyVisitors] = useState("1000");
  const [conversionRate, setConversionRate] = useState("3");

  const calculateROI = () => {
    const visitors = parseInt(monthlyVisitors) || 0;
    const rate = parseFloat(conversionRate) || 0;
    const leads = Math.round(visitors * (rate / 100));
    const cost = leads * 20;
    const potentialRevenue = leads * 2000; // Assuming average customer value
    return { leads, cost, potentialRevenue };
  };

  const { leads, cost, potentialRevenue } = calculateROI();

  const benefits = [
    {
      icon: Target,
      title: "Pay Only ₹20 Per Real Lead",
      description: "No setup fees, no monthly charges. Pay only when we send you qualified customers ready to book.",
      highlight: "Beta Launch Special"
    },
    {
      icon: TrendingUp,
      title: "First-Mover Advantage",
      description: "Be among the first 100 fitness businesses on our platform. Lock in special pricing before we scale.",
      highlight: "Limited Spots Available"
    },
    {
      icon: Shield,
      title: "Founder-Level Support",
      description: "Direct access to our founding team for setup, optimization, and growth strategy during beta phase.",
      highlight: "Personal Attention"
    },
    {
      icon: Zap,
      title: "Complete Business Dashboard",
      description: "Track leads, manage bookings, analyze performance - built specifically for fitness businesses.",
      highlight: "Beta Features Included"
    }
  ];

  const betaStories = [
    {
      name: "FitZone Gym",
      location: "Mumbai",
      type: "Fitness Center",
      results: "Pre-launch partner",
      commitment: "Ready to launch with us",
      quote: "Excited to be part of this innovative platform from day one."
    },
    {
      name: "Wellness Spa",
      location: "Delhi",
      type: "Spa & Wellness",
      results: "Beta testing partner",
      commitment: "Providing feedback",
      quote: "The platform design looks promising for our industry."
    },
    {
      name: "Yoga Studio Pro",
      location: "Bangalore",
      type: "Yoga Studio",
      results: "Early adopter",
      commitment: "Launch day ready",
      quote: "Looking forward to reaching more yoga enthusiasts."
    }
  ];

  const steps = [
    {
      step: 1,
      title: "Beta Registration",
      description: "Join our beta program with your business details. Get early access before public launch.",
      time: "5 mins"
    },
    {
      step: 2,
      title: "Profile Setup",
      description: "Work with our team to create your perfect business profile with photos and services.",
      time: "1 hour"
    },
    {
      step: 3,
      title: "Beta Testing",
      description: "Test all features, provide feedback, and prepare for launch day with our support.",
      time: "2 weeks"
    },
    {
      step: 4,
      title: "Launch & Grow",
      description: "Go live with special beta pricing and start receiving your first customers.",
      time: "Day 1"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead
        title="Join Beta | GymSpaYoga - Revolutionary Fitness Platform"
        description="Be among the first 100 fitness businesses on India's next big wellness platform. Beta access with ₹20 per lead pricing. No setup fees."
        keywords="fitness platform beta, gym marketing, spa business growth, yoga studio listing, fitness leads"
      />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <Badge className="bg-cyan-100 text-cyan-700 px-4 py-2 text-sm font-medium mb-4 inline-flex items-center gap-2 rounded-full">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  For Business Owners
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  List Your Wellness Business on FIT Friend
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Join hundreds of successful wellness businesses already growing their client base with FIT Friend. Easy setup, powerful tools, real results.
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-cyan-100 rounded-full p-2">
                    <Users className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Reach More Clients</h3>
                    <p className="text-gray-600 text-sm">Connect with thousands of potential customers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cyan-100 rounded-full p-2">
                    <TrendingUp className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Grow Your Business</h3>
                    <p className="text-gray-600 text-sm">Increase bookings and revenue</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cyan-100 rounded-full p-2">
                    <Shield className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Verified Listings</h3>
                    <p className="text-gray-600 text-sm">Build trust with verified badges</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/register-business">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold px-8 py-3 text-lg rounded-full">
                    Get Started Free
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-3 text-lg rounded-full hover:bg-gray-50">
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>Startup Transparency</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <span>Beta Access Only</span>
                </div>
              </div>
            </div>

            {/* Mockup Illustration */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200">
              <div className="space-y-6">
                {/* Header mockup */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-1/2"></div>
                  </div>
                </div>
                
                {/* Card mockups */}
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-br from-purple-100 via-blue-100 to-cyan-100 rounded-2xl p-6 space-y-3" style={{animationDelay: `${i * 0.1}s`}}>
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2 bg-white/60 rounded-full w-2/3"></div>
                        <div className="h-2 bg-white/60 rounded-full w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">
              Why Join Our Beta Program?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of building India's most fitness-focused discovery platform from the ground up
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300 border-2 hover:border-emerald-400">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <Badge className="bg-orange-100 text-orange-700 mx-auto mb-4">
                    {benefit.highlight}
                  </Badge>
                  <CardTitle className="text-xl font-bold">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beta Partners */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">
              Meet Our Beta Partners
            </h2>
            <p className="text-xl text-gray-600">
              Forward-thinking businesses already committed to launching with us
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {betaStories.map((story, index) => (
              <Card key={index} className="hover:shadow-2xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-blue-100 text-blue-700">{story.type}</Badge>
                    <Badge className="bg-orange-100 text-orange-700">Beta Partner</Badge>
                  </div>
                  <CardTitle className="text-xl">{story.name}</CardTitle>
                  <p className="text-gray-600">{story.location}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <blockquote className="italic text-gray-700">
                      "{story.quote}"
                    </blockquote>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="font-bold text-emerald-600">{story.results}</div>
                        <div className="text-sm text-gray-600">Status</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600">{story.commitment}</div>
                        <div className="text-sm text-gray-600">Commitment</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">
              Beta Program Journey
            </h2>
            <p className="text-xl text-gray-600">
              From registration to launch day - here's what to expect
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-black text-white">{step.step}</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">
                    {step.time}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Build the Future Together?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Limited to 100 founding partners. Join us in creating something amazing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/register-business">
              <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 font-black px-12 py-4 text-xl">
                Join Beta Program
              </Button>
            </Link>
            <Button variant="outline" size="xl" className="border-2 border-white text-white hover:bg-white/20 font-bold px-12 py-4 text-xl">
              Founder Chat: +91 75969 58097
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>No Setup Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Beta Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Lifetime Pricing</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessLanding;
