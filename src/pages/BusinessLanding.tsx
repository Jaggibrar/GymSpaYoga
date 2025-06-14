
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
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <Badge className="bg-orange-100 text-orange-700 px-4 py-2 text-lg font-bold mb-4">
                  🚀 Beta Launch - Limited to 100 Businesses
                </Badge>
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                  Be a Founding Partner of
                  <span className="block text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text">
                    India's Next Big Fitness Platform
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  We're launching soon! Join our beta program and
                  <span className="font-bold text-emerald-600"> lock in ₹20/lead pricing forever.</span>
                  <span className="block mt-2 text-lg">No customers yet, but big dreams and solid tech.</span>
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "✅ First 100 businesses get lifetime beta pricing",
                  "✅ Direct founder support during setup",
                  "✅ Shape the platform with your feedback",
                  "✅ Premium features included at launch"
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-lg">
                    <span className="mr-3">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/register-business">
                  <Button size="xl" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-black px-8 py-4 text-xl">
                    Join Beta Program
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
                <Button variant="outline" size="xl" className="border-2 border-gray-300 text-gray-700 font-bold px-8 py-4 text-xl">
                  <PlayCircle className="mr-2 h-6 w-6" />
                  See Platform Demo
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

            {/* Beta Calculator */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <Calculator className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Beta Partnership Calculator</h3>
                <p className="text-gray-600">Estimate your potential with our platform</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expected Monthly Visitors
                  </label>
                  <Input
                    type="number"
                    value={monthlyVisitors}
                    onChange={(e) => setMonthlyVisitors(e.target.value)}
                    className="text-lg"
                    placeholder="Your estimate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Target Conversion Rate (%)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(e.target.value)}
                    className="text-lg"
                    placeholder="Your goal"
                  />
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border-l-4 border-emerald-500">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-black text-emerald-600">{leads}</div>
                      <div className="text-sm text-gray-600">Potential Leads</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-blue-600">₹{cost.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Beta Cost</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-3xl font-black text-green-600">₹{potentialRevenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Projected Revenue</div>
                      <Badge className="bg-orange-100 text-orange-700 text-xs mt-2">
                        Beta Pricing Locked Forever
                      </Badge>
                    </div>
                  </div>
                </div>
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
