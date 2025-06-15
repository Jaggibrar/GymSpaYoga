
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowLeft className="h-4 w-4 text-white group-hover:-translate-x-1 transition-transform" />
              </div>
              <span className="font-semibold text-lg">Back to Home</span>
            </Link>
            <Link to="/" className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gym<span className="text-emerald-600">Spa</span><span className="text-blue-600">Yoga</span>
              </h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - More Modern */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5"></div>
        <div className="container mx-auto max-w-5xl text-center relative">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-50 to-blue-50 text-emerald-700 px-6 py-3 rounded-full text-sm font-semibold mb-12 shadow-sm border border-emerald-100">
            <Sparkles className="h-5 w-5" />
            <span>About Our Vision</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
            Transforming
            <span className="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              wellness discovery
            </span>
          </h1>
          <p className="text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto font-light">
            We're pioneering the future of wellness experiences, creating seamless connections between health enthusiasts and premium fitness destinations across India.
          </p>
        </div>
      </section>

      {/* Story Section - Redesigned */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div>
                <div className="inline-block bg-gradient-to-r from-emerald-100 to-blue-100 px-4 py-2 rounded-full text-sm font-semibold text-emerald-700 mb-6">
                  Our Journey
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  Building the future of
                  <span className="text-emerald-600"> wellness</span>
                </h2>
                <div className="space-y-8 text-xl text-gray-600 leading-relaxed font-light">
                  <p>
                    Founded in 2025, GymSpaYoga emerged from a simple yet powerful vision: wellness discovery should be effortless, inspiring, and transformative.
                  </p>
                  <p>
                    Today, we're India's most trusted wellness discovery platform, empowering communities to embrace healthier lifestyles while providing businesses with cutting-edge analytics and growth insights.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Badge className="px-6 py-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-base">
                  <Heart className="h-5 w-5 mr-2" />
                  50,000+ Happy Users
                </Badge>
                <Badge className="px-6 py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-base">
                  <Zap className="h-5 w-5 mr-2" />
                  1,000+ Partner Businesses
                </Badge>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-3xl transform rotate-2"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-3xl transform -rotate-1"></div>
              <img 
                src="https://images.unsplash.com/photo-1589400554239-7c6cf8393a6e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Wellness and meditation" 
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Modern Cards */}
      <section className="py-32 px-6 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">Our Purpose</h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto font-light">
              Driven by passion, guided by innovation, committed to transforming wellness experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 text-white hover:bg-white/10 transition-all duration-500 group">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-emerald-400" />
                </div>
                <CardTitle className="text-3xl font-bold">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed text-lg">
                  To become the world's leading platform that seamlessly connects wellness seekers with extraordinary fitness destinations, making healthy living accessible and inspiring across India through innovative technology and data-driven insights.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 text-white hover:bg-white/10 transition-all duration-500 group">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-3xl font-bold">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed text-lg">
                  We revolutionize the wellness journey by providing comprehensive discovery tools, seamless booking experiences, and fostering vibrant communities that support and celebrate healthy lifestyle transformations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Section - Elevated Design */}
      <section className="py-32 px-6" ref={founderRef}>
        <div className="container mx-auto max-w-5xl">
          <div className={`transition-all duration-1000 ${isFounderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="bg-gradient-to-br from-white via-gray-50 to-white border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-16">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center mb-8">
                    <h3 className="text-4xl font-bold text-gray-900 mr-4">Jagdeep Singh</h3>
                    <div 
                      className="relative cursor-pointer"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <div className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full p-3 shadow-lg hover:scale-110 transition-transform">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      {showTooltip && (
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl whitespace-nowrap z-10 shadow-lg">
                          Verified Wellness Visionary
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-emerald-600 font-semibold text-lg mb-12">CEO & Founder</p>
                </div>

                <blockquote className="text-3xl text-gray-700 text-center leading-relaxed font-light italic mb-12 max-w-4xl mx-auto">
                  "We're not just building a platform; we're creating a movement that transforms lives, empowers communities, and makes wellness accessible to everyone."
                </blockquote>

                <div className="flex justify-center mb-12">
                  <Button className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 text-white px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg">
                    <Play className="h-5 w-5 mr-3" />
                    Listen to Founder's Message
                    <Volume2 className="h-5 w-5 ml-3" />
                  </Button>
                </div>

                <div className={`text-right transition-all duration-2000 ${isDrawingSignature ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  <span className="text-2xl text-emerald-600 font-serif italic">– Jagdeep Singh</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Analytics Features - Modern Grid */}
      <section className="py-32 px-6 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-block bg-gradient-to-r from-emerald-100 to-blue-100 px-4 py-2 rounded-full text-sm font-semibold text-emerald-700 mb-6">
              Business Intelligence
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Analytics & Performance</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto font-light">
              Comprehensive business intelligence tools designed to help wellness businesses thrive and grow
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group bg-white">
                <CardContent className="p-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-3xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Elevated */}
      <section className="py-32 px-6 bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-5xl font-bold text-white mb-8 leading-tight">
            Ready to Transform Your
            <span className="block">Wellness Journey?</span>
          </h2>
          <p className="text-xl text-white/90 mb-16 max-w-3xl mx-auto font-light">
            Join thousands of wellness enthusiasts who've discovered their perfect fitness destinations through our innovative platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Link to="/">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg font-semibold">
                Explore Wellness Options
              </Button>
            </Link>
            <Link to="/manage-bookings">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg font-semibold">
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
