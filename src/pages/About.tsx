
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Award, Target, Heart, Dumbbell, ArrowLeft, TrendingUp, BarChart3, Activity, CheckCircle, Play, Volume2, Sparkles, Zap, Globe, Shield, Rocket } from "lucide-react";
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
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Smart Analytics",
      description: "Advanced AI-powered insights help wellness businesses understand customer behavior, optimize pricing, and predict market trends for sustainable growth."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Seamless Discovery",
      description: "Our intelligent matching algorithm connects health enthusiasts with perfect wellness destinations based on preferences, location, and lifestyle goals."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust & Safety",
      description: "Every partner is verified through our rigorous quality assurance process, ensuring safe, professional, and exceptional wellness experiences."
    }
  ];

  const values = [
    {
      icon: <Heart className="h-6 w-6 text-rose-500" />,
      title: "Wellness First",
      description: "We believe wellness should be accessible, inspiring, and transformative for everyone"
    },
    {
      icon: <Rocket className="h-6 w-6 text-blue-500" />,
      title: "Innovation",
      description: "Pioneering the future of wellness discovery through cutting-edge technology"
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-500" />,
      title: "Community",
      description: "Building bridges between wellness seekers and exceptional service providers"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Navigation */}
      <header className="fixed top-6 left-6 right-6 bg-white/95 backdrop-blur-2xl border border-gray-200/50 rounded-2xl z-50 shadow-lg">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                <ArrowLeft className="h-5 w-5 text-white group-hover:-translate-x-1 transition-transform" />
              </div>
              <span className="font-bold text-lg">Back to Home</span>
            </Link>
            <Link to="/" className="flex items-center space-x-4">
              <div className="h-14 w-14 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl">
                <Dumbbell className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gym<span className="text-emerald-600">Spa</span><span className="text-blue-600">Yoga</span>
              </h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Revolutionary Design */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-50 to-blue-50 text-emerald-700 px-8 py-4 rounded-full text-lg font-bold mb-16 shadow-lg border border-emerald-100/50 backdrop-blur-sm">
            <Sparkles className="h-6 w-6 animate-pulse" />
            <span>Redefining Wellness Discovery</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-gray-900 mb-10 leading-none">
            The Future of
            <span className="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Wellness
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-600 leading-relaxed max-w-5xl mx-auto font-light mb-16">
            We're revolutionizing how people discover, connect with, and experience wellness. From AI-powered recommendations to seamless bookings, we're building the platform that transforms lives.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl font-bold">
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-emerald-500 px-12 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-xl font-semibold">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Story Section - Immersive Design */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div>
                <div className="inline-block bg-gradient-to-r from-emerald-100 to-blue-100 px-6 py-3 rounded-2xl text-lg font-bold text-emerald-700 mb-8">
                  Our Story
                </div>
                <h2 className="text-6xl font-black text-gray-900 mb-10 leading-tight">
                  Crafting the
                  <span className="text-emerald-600"> wellness revolution</span>
                </h2>
                <div className="space-y-8 text-2xl text-gray-600 leading-relaxed font-light">
                  <p>
                    Born from a vision to democratize wellness, GymSpaYoga emerged as India's most innovative wellness discovery platform. We saw a world where finding the perfect fitness destination was complicated, time-consuming, and often disappointing.
                  </p>
                  <p>
                    Today, we've transformed that experience into something magical. Our AI-powered platform doesn't just connect people with wellness providers – it creates perfect matches that inspire lasting lifestyle transformations.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-2xl hover:bg-gray-100 transition-colors duration-300">
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-[3rem] transform rotate-3 blur-lg"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-[2.5rem] transform -rotate-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Modern wellness center" 
                className="relative rounded-[2rem] shadow-3xl w-full h-[600px] object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Cinematic Cards */}
      <section className="py-32 px-6 bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-black text-white mb-8">Our North Star</h2>
            <p className="text-gray-300 text-2xl max-w-4xl mx-auto font-light leading-relaxed">
              Driven by purpose, powered by innovation, committed to transforming how the world experiences wellness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <Card className="bg-white/5 backdrop-blur-2xl border-white/10 text-white hover:bg-white/10 transition-all duration-700 group overflow-hidden">
              <CardHeader className="pb-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-full blur-2xl"></div>
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10">
                  <Target className="h-10 w-10 text-emerald-400" />
                </div>
                <CardTitle className="text-4xl font-black relative z-10">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-300 leading-relaxed text-xl">
                  To create a world where every person has instant access to transformative wellness experiences, powered by technology that understands their unique journey and connects them with the perfect wellness destinations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-2xl border-white/10 text-white hover:bg-white/10 transition-all duration-700 group overflow-hidden">
              <CardHeader className="pb-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/10 rounded-full blur-2xl"></div>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10">
                  <Heart className="h-10 w-10 text-blue-400" />
                </div>
                <CardTitle className="text-4xl font-black relative z-10">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-300 leading-relaxed text-xl">
                  We revolutionize wellness discovery by building an intelligent ecosystem that empowers businesses to thrive while helping individuals find their perfect wellness match through seamless, personalized experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Section - Elevated & Personal */}
      <section className="py-32 px-6 bg-gradient-to-br from-white via-gray-50 to-emerald-50/20" ref={founderRef}>
        <div className="container mx-auto max-w-6xl">
          <div className={`transition-all duration-1000 ${isFounderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="bg-gradient-to-br from-white via-gray-50/50 to-white border-0 shadow-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
              
              <CardContent className="p-20 relative z-10">
                <div className="text-center mb-16">
                  <div className="flex items-center justify-center mb-10">
                    <h3 className="text-5xl font-black text-gray-900 mr-6">Jagdeep Singh</h3>
                    <div 
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <div className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl p-4 shadow-xl group-hover:scale-110 transition-transform">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      {showTooltip && (
                        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-lg px-6 py-4 rounded-2xl whitespace-nowrap z-10 shadow-2xl">
                          Visionary Wellness Leader
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge className="px-8 py-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xl font-bold rounded-2xl">
                    CEO & Founder
                  </Badge>
                </div>

                <blockquote className="text-4xl text-gray-700 text-center leading-relaxed font-light italic mb-16 max-w-5xl mx-auto">
                  "We're not just building a platform; we're crafting a movement that transforms communities, empowers wellness entrepreneurs, and makes healthy living a joyful journey for millions."
                </blockquote>

                <div className="flex justify-center mb-16">
                  <Button className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 text-white px-16 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl font-bold">
                    <Play className="h-6 w-6 mr-4" />
                    Watch Founder's Vision
                    <Volume2 className="h-6 w-6 ml-4" />
                  </Button>
                </div>

                <div className={`text-right transition-all duration-2000 ${isDrawingSignature ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  <span className="text-3xl text-emerald-600 font-serif italic">– Jagdeep Singh</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section - Next-Level Design */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <div className="inline-block bg-gradient-to-r from-emerald-100 to-blue-100 px-6 py-3 rounded-2xl text-lg font-bold text-emerald-700 mb-8">
              Platform Excellence
            </div>
            <h2 className="text-6xl font-black text-gray-900 mb-8">Why We're Different</h2>
            <p className="text-gray-600 text-2xl max-w-4xl mx-auto font-light leading-relaxed">
              Advanced technology meets human-centered design to deliver experiences that exceed expectations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 group bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/5 to-blue-400/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <CardContent className="p-12 relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-3xl flex items-center justify-center text-white mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-8">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-xl">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Grand Finale */}
      <section className="py-32 px-6 bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-12 leading-tight">
            Ready to Experience
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              The Future?
            </span>
          </h2>
          
          <p className="text-2xl text-white/90 mb-20 max-w-4xl mx-auto font-light leading-relaxed">
            Join the wellness revolution and discover extraordinary experiences that will transform your journey to better health and happiness.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Link to="/">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-16 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl font-black">
                <Rocket className="h-6 w-6 mr-3" />
                Start Exploring
              </Button>
            </Link>
            <Link to="/manage-bookings">
              <Button size="lg" variant="outline" className="border-3 border-white text-white hover:bg-white hover:text-gray-900 px-16 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl font-black">
                <BarChart3 className="h-6 w-6 mr-3" />
                Business Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
