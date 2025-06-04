
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Award, Target, Heart, Dumbbell, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { icon: <Users className="h-8 w-8" />, number: "50,000+", label: "Happy Users" },
    { icon: <Dumbbell className="h-8 w-8" />, number: "1,000+", label: "Listed Businesses" },
    { icon: <Star className="h-8 w-8" />, number: "4.8", label: "Average Rating" },
    { icon: <Award className="h-8 w-8" />, number: "25+", label: "Cities Covered" }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      image: "/placeholder.svg",
      description: "Passionate about wellness and technology, bringing 15 years of experience in the fitness industry."
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      image: "/placeholder.svg",
      description: "Tech enthusiast with expertise in building scalable platforms for the wellness ecosystem."
    },
    {
      name: "Amit Patel",
      role: "Head of Operations",
      image: "/placeholder.svg",
      description: "Operations expert ensuring seamless experiences for both users and business partners."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Dumbbell className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            About 
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> GymSpaYoga</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make wellness accessible to everyone by connecting people with the best fitness and wellness destinations across India.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2020, GymSpaYoga started with a simple vision: to make finding and booking wellness services as easy as ordering food online. We noticed that people struggled to find reliable information about gyms, spas, and yoga centers in their area.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Today, we've grown into India's leading wellness discovery platform, helping thousands of people find their perfect fitness and wellness destinations while supporting local businesses to grow and thrive.
              </p>
              <Badge className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600">
                <Heart className="h-4 w-4 mr-2" />
                Trusted by 50,000+ Users
              </Badge>
            </div>
            <div className="relative">
              <img src="/placeholder.svg" alt="Our Story" className="rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-white mb-16">Our Purpose</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="p-8 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h4>
              <p className="text-gray-600 leading-relaxed">
                To become the leading platform that connects wellness seekers with the perfect fitness and wellness destinations, making healthy living accessible to everyone across India.
              </p>
            </Card>
            <Card className="p-8 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h4>
              <p className="text-gray-600 leading-relaxed">
                We strive to simplify the wellness journey by providing comprehensive information, seamless booking experiences, and building a community that supports healthy lifestyle choices.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-6 object-cover" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h4>
                <p className="text-emerald-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-6">Join Our Wellness Community</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to start your wellness journey? Discover amazing gyms, spas, and yoga centers near you.
          </p>
          <Link to="/">
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
              Explore Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
