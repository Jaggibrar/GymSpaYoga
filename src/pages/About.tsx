
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Award, Target, Heart, Dumbbell, ArrowLeft, TrendingUp, BarChart3, Activity, CheckCircle, Play, Volume2, Sparkles, Zap, Globe, Shield, Rocket, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const About = () => {
  useScrollToTop();
  const [isFounderInView, setIsFounderInView] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDrawingSignature, setIsDrawingSignature] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
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

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Smart Analytics",
      description: "Advanced AI-powered insights help wellness businesses understand customer behavior, optimize pricing, and predict market trends for sustainable growth.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Seamless Discovery",
      description: "Our intelligent matching algorithm connects health enthusiasts with perfect wellness destinations based on preferences, location, and lifestyle goals.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust & Safety",
      description: "Every partner is verified through our rigorous quality assurance process, ensuring safe, professional, and exceptional wellness experiences.",
      color: "from-purple-500 to-violet-600"
    }
  ];

  const values = [
    {
      icon: <Heart className="h-6 w-6 text-rose-500" />,
      title: "Wellness First",
      description: "We believe wellness should be accessible, inspiring, and transformative for everyone",
      bgColor: "bg-rose-50"
    },
    {
      icon: <Rocket className="h-6 w-6 text-blue-500" />,
      title: "Innovation",
      description: "Pioneering the future of wellness discovery through cutting-edge technology",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-500" />,
      title: "Community",
      description: "Building bridges between wellness seekers and exceptional service providers",
      bgColor: "bg-emerald-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Contact Bar */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-gray-200 py-3">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-4">
            <Phone className="h-5 w-5 text-emerald-600" />
            <span className="text-lg font-semibold text-gray-700">Talk to Owner: 7596958097</span>
            <div className="flex space-x-3">
              <a 
                href="tel:7596958097" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Call
              </a>
              <a 
                href="https://wa.me/917596958097" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-6 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-50 to-blue-50 text-emerald-700 px-8 py-4 rounded-full text-lg font-bold mb-16 shadow-lg border border-emerald-100/50 backdrop-blur-sm animate-bounce">
            <Sparkles className="h-6 w-6 animate-pulse" />
            <span>Redefining Wellness Discovery</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-10 leading-none">
            The Future of
            <span className="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
              Wellness
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto font-light mb-16">
            We're revolutionizing how people discover, connect with, and experience wellness. From AI-powered recommendations to seamless bookings, we're building the platform that transforms lives.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl font-bold transform hover:scale-105">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/business-dashboard">
              <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-emerald-500 px-12 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-xl font-semibold transform hover:scale-105">
                Business Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div>
                <div className="inline-block bg-gradient-to-r from-emerald-100 to-blue-100 px-6 py-3 rounded-2xl text-lg font-bold text-emerald-700 mb-8">
                  Our Story
                </div>
                <h2 className="text-5xl font-black text-gray-900 mb-10 leading-tight">
                  Crafting the
                  <span className="text-emerald-600"> wellness revolution</span>
                </h2>
                <div className="space-y-8 text-xl text-gray-600 leading-relaxed font-light">
                  <p>
                    Born from a sacred vision to awaken holistic well-being, GymSpaYoga is more than just a platform — it's a path to inner balance and outer vitality.
                  </p>
                  <p>
                    In a world where the search for true wellness often feels overwhelming and disconnected, we dreamed of something deeper — a way to bring harmony back into the journey of self-care.
                  </p>
                  <p>
                    At GymSpaYoga, we believe every individual is divinely guided toward their own unique path of healing and transformation. Our intuitive, AI-empowered system aligns seekers with spaces and practitioners that resonate with their energy and needs.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div key={index} className={`${value.bgColor} p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
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
                src="https://pihmoaogjjiicfnkmpbe.supabase.co/storage/v1/object/public/website-media/site-assets/pexels-photo-1597017.jpeg"
                alt="Modern wellness center" 
                className="relative rounded-[2rem] shadow-3xl w-full h-[600px] object-cover transform transition-transform hover:scale-105" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <div className="inline-block bg-gradient-to-r from-emerald-100 to-blue-100 px-6 py-3 rounded-2xl text-lg font-bold text-emerald-700 mb-8">
              Platform Excellence
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-8">Why We're Different</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto font-light leading-relaxed">
              Advanced technology meets human-centered design to deliver experiences that exceed expectations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`border-0 shadow-xl hover:shadow-3xl transition-all duration-700 group bg-white relative overflow-hidden cursor-pointer transform hover:-translate-y-2 ${
                  activeFeature === index ? 'ring-4 ring-emerald-200 scale-105' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
                
                <CardContent className="p-12 relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center text-white mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-6">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-white via-gray-50 to-emerald-50/20" ref={founderRef}>
        <div className="container mx-auto max-w-6xl">
          <div className={`transition-all duration-1000 ${isFounderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="bg-gradient-to-br from-white via-gray-50/50 to-white border-0 shadow-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
              
              <CardContent className="p-20 relative z-10">
                <div className="text-center mb-16">
                  <div className="flex items-center justify-center mb-10">
                    <h3 className="text-4xl font-black text-gray-900 mr-6">Jagdeep Singh</h3>
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

                <blockquote className="text-3xl text-gray-700 text-center leading-relaxed font-light italic mb-16 max-w-4xl mx-auto">
                  "We're not just building a platform; we're crafting a movement that transforms communities, empowers wellness entrepreneurs, and makes healthy living a joyful journey for millions."
                </blockquote>

                <div className="flex justify-center mb-16">
                  <a href="tel:7596958097">
                    <Button className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 text-white px-16 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl font-bold transform hover:scale-105">
                      <Phone className="h-6 w-6 mr-4" />
                      Connect with Founder
                      <Volume2 className="h-6 w-6 ml-4" />
                    </Button>
                  </a>
                </div>

                <div className={`text-right transition-all duration-2000 ${isDrawingSignature ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  <span className="text-2xl text-emerald-600 font-serif italic">– Jagdeep Singh</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-12 leading-tight">
            Ready to Experience
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              The Future?
            </span>
          </h2>
          
          <p className="text-xl text-white/90 mb-20 max-w-3xl mx-auto font-light leading-relaxed">
            Join the wellness revolution and discover extraordinary experiences that will transform your journey to better health and happiness.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Link to="/">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-16 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl font-black transform hover:scale-105">
                <Rocket className="h-6 w-6 mr-3" />
                Start Exploring
              </Button>
            </Link>
            <Link to="/business-dashboard">
              <Button size="lg" variant="outline" className="border-3 border-white text-white hover:bg-white hover:text-gray-900 px-16 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl font-black transform hover:scale-105">
                <BarChart3 className="h-6 w-6 mr-3" />
                Business Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
