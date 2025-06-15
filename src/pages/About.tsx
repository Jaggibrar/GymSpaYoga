
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Award, Target, Heart, Dumbbell, ArrowLeft, TrendingUp, BarChart3, Activity, CheckCircle, Play, Volume2, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const About = () => {
  useScrollToTop();
  const [isFounderInView, setIsFounderInView] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDrawingSignature, setIsDrawingSignature] = useState(false);
  const founderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFounderInView(true);
          setTimeout(() => setIsDrawingSignature(true), 1000);
        }
      },
      { threshold: 0.3 }
    );

    if (founderRef.current) {
      observer.observe(founderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: <Users className="h-6 w-6" />, number: "50,000+", label: "Happy Users" },
    { icon: <Dumbbell className="h-6 w-6" />, number: "1,000+", label: "Listed Businesses" },
    { icon: <Star className="h-6 w-6" />, number: "4.8", label: "Average Rating" },
    { icon: <Award className="h-6 w-6" />, number: "25+", label: "Cities Covered" }
  ];

  const features = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Real-time ROI Tracking",
      description: "Monitor your return on investment with comprehensive analytics dashboard showing customer acquisition costs, revenue trends, and booking patterns."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Customer Analytics",
      description: "Track customer behavior, peak booking times, popular services, and customer lifetime value to optimize your business strategy."
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Performance Metrics",
      description: "Access detailed performance metrics including conversion rates, customer satisfaction scores, and revenue per customer to drive growth."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Elegant Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Dumbbell className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Gym<span className="text-emerald-600">Spa</span><span className="text-blue-600">Yoga</span>
              </h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            <span>About Our Mission</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Connecting wellness
            <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              seekers everywhere
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We're building the future of wellness discovery, making it effortless to find and book the perfect fitness and wellness experiences across India.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600 shadow-sm group-hover:shadow-md transition-shadow">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Founded in 2025, GymSpaYoga began with a simple observation: finding and booking wellness services shouldn't be complicated. We saw people struggling to discover reliable gyms, spas, and yoga centers in their neighborhoods.
                  </p>
                  <p>
                    Today, we've evolved into India's premier wellness discovery platform, empowering thousands to find their ideal fitness destinations while helping local businesses thrive through our advanced analytics and performance insights.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className="px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                  <Heart className="h-4 w-4 mr-2" />
                  Trusted by 50,000+ Users
                </Badge>
                <Badge className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <Zap className="h-4 w-4 mr-2" />
                  1,000+ Partner Businesses
                </Badge>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-3xl transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1589400554239-7c6cf8393a6e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Wellness and meditation" 
                className="relative rounded-3xl shadow-xl w-full h-96 object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Purpose</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Driven by a vision to transform how people discover and experience wellness
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-emerald-400" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  To become the leading platform that connects wellness seekers with perfect fitness destinations, making healthy living accessible across India with real-time insights and analytics.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  We simplify the wellness journey by providing comprehensive information, seamless booking experiences, and building communities that support healthy lifestyle choices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 px-6" ref={founderRef}>
        <div className="container mx-auto max-w-4xl">
          <div className={`transition-all duration-1000 ${isFounderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl overflow-hidden">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 mr-3">Jagdeep Singh</h3>
                    <div 
                      className="relative cursor-pointer"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <div className="bg-emerald-500 rounded-full p-2 shadow-lg">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      {showTooltip && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap z-10">
                          Verified Wellness Visionary
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-emerald-600 font-semibold mb-8">CEO & Founder</p>
                </div>

                <blockquote className="text-2xl text-gray-700 text-center leading-relaxed font-medium italic mb-8">
                  "Let's build a movement of fitness and wellness that transforms lifestyles and empowers communities."
                </blockquote>

                <div className="flex justify-center mb-8">
                  <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <Play className="h-4 w-4 mr-2" />
                    Listen to Founder's Message
                    <Volume2 className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                <div className={`text-right transition-all duration-2000 ${isDrawingSignature ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  <span className="text-xl text-emerald-600 font-serif italic">– Jagdeep Singh</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Analytics Features */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Analytics & Performance Tracking</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive business intelligence tools to help wellness businesses thrive
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Wellness Journey?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of wellness enthusiasts who've discovered their perfect fitness destinations through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Explore Wellness Options
              </Button>
            </Link>
            <Link to="/manage-bookings">
              <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                View Analytics Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
