
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
      highlight: "Zero Commission Model"
    },
    {
      icon: TrendingUp,
      title: "Instant Online Presence",
      description: "Get found by 25,000+ active users searching for fitness services in your area every month.",
      highlight: "Go Live in 24 Hours"
    },
    {
      icon: Shield,
      title: "100% Verified Leads",
      description: "Every lead is verified with phone and location. No fake inquiries, no time wasters.",
      highlight: "Quality Guaranteed"
    },
    {
      icon: Zap,
      title: "Complete Business Dashboard",
      description: "Track leads, manage bookings, analyze performance, and optimize your listing for better results.",
      highlight: "Full Analytics Included"
    }
  ];

  const successStories = [
    {
      name: "FitZone Gym",
      location: "Mumbai",
      type: "Premium Gym",
      results: "150+ new members in 3 months",
      revenue: "₹4.5L additional revenue",
      rating: 4.9,
      quote: "Best investment for our gym. Quality leads and professional support."
    },
    {
      name: "Serenity Spa",
      location: "Delhi",
      type: "Luxury Spa",
      results: "80 new clients monthly",
      revenue: "₹3.2L monthly increase",
      rating: 4.8,
      quote: "The platform transformed our business. Highly recommend to spa owners."
    },
    {
      name: "Yogi's Paradise",
      location: "Bangalore",
      type: "Yoga Studio",
      results: "200+ yoga enthusiasts",
      revenue: "₹2.8L extra income",
      rating: 5.0,
      quote: "Amazing results! Our classes are always full now."
    }
  ];

  const steps = [
    {
      step: 1,
      title: "Quick Registration",
      description: "Fill our simple form with your business details, photos, and services. Takes only 10 minutes.",
      time: "10 mins"
    },
    {
      step: 2,
      title: "Profile Review",
      description: "Our team verifies your business and optimizes your profile for maximum visibility.",
      time: "24 hours"
    },
    {
      step: 3,
      title: "Go Live & Get Leads",
      description: "Start receiving qualified leads immediately. Pay only ₹20 per genuine inquiry.",
      time: "Instant"
    },
    {
      step: 4,
      title: "Grow Your Business",
      description: "Use our dashboard to track performance, manage bookings, and scale your operations.",
      time: "Ongoing"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead
        title="List Your Fitness Business | GymSpaYoga - ₹20 Per Lead Only"
        description="Join 800+ fitness businesses. Pay only ₹20 per qualified lead. No setup fees, no commission. Get instant online presence and grow your gym, spa, or yoga studio."
        keywords="list fitness business, gym registration, spa listing, yoga studio marketing, fitness leads, business growth"
      />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <Badge className="bg-green-100 text-green-700 px-4 py-2 text-lg font-bold mb-4">
                  🚀 Join 800+ Successful Businesses
                </Badge>
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                  Grow Your Fitness Business with
                  <span className="block text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text">
                    ₹20 Per Lead Only
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  No setup fees. No monthly charges. No commission on bookings. 
                  <span className="font-bold text-emerald-600"> Pay only when we send you qualified customers.</span>
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "✅ 25,000+ active users searching daily",
                  "✅ Verified leads with phone & location",
                  "✅ Complete business dashboard included",
                  "✅ Go live in 24 hours guaranteed"
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-lg">
                    <span className="mr-3">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/register-business">
                  <Button size="xl" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-black px-8 py-4 text-xl">
                    List Your Business FREE
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
                <Button variant="outline" size="xl" className="border-2 border-gray-300 text-gray-700 font-bold px-8 py-4 text-xl">
                  <PlayCircle className="mr-2 h-6 w-6" />
                  Watch Demo (2 min)
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>100% Secure & Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <span>Instant Setup</span>
                </div>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <Calculator className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">ROI Calculator</h3>
                <p className="text-gray-600">See your potential returns</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Monthly Website Visitors
                  </label>
                  <Input
                    type="number"
                    value={monthlyVisitors}
                    onChange={(e) => setMonthlyVisitors(e.target.value)}
                    className="text-lg"
                    placeholder="Enter visitors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expected Conversion Rate (%)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(e.target.value)}
                    className="text-lg"
                    placeholder="Enter rate"
                  />
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border-l-4 border-emerald-500">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-black text-emerald-600">{leads}</div>
                      <div className="text-sm text-gray-600">Qualified Leads</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-blue-600">₹{cost.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Cost</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-3xl font-black text-green-600">₹{potentialRevenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Potential Revenue</div>
                      <div className="text-xs text-green-600 font-bold mt-1">
                        {Math.round((potentialRevenue - cost) / cost * 100)}x ROI
                      </div>
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
              Why Choose GymSpaYoga?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The smartest way to grow your fitness business with guaranteed results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300 border-2 hover:border-emerald-400">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <Badge className="bg-emerald-100 text-emerald-700 mx-auto mb-4">
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

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">
              Real Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how businesses like yours are thriving with our platform
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="hover:shadow-2xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-blue-100 text-blue-700">{story.type}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-bold">{story.rating}</span>
                    </div>
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
                        <div className="text-sm text-gray-600">New Customers</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600">{story.revenue}</div>
                        <div className="text-sm text-gray-600">Revenue Growth</div>
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
              Get Started in 4 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              From registration to receiving leads in less than 24 hours
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-black text-white">{step.step}</span>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">
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
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 800+ successful fitness businesses already growing with us
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/register-business">
              <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 font-black px-12 py-4 text-xl">
                Start Free Registration
              </Button>
            </Link>
            <Button variant="outline" size="xl" className="border-2 border-white text-white hover:bg-white/20 font-bold px-12 py-4 text-xl">
              Call Us: +91 75969 58097
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>No Setup Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>24 Hour Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessLanding;
