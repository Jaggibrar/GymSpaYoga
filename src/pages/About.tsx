
import { Phone, MessageCircle, Users, Target, Award, Heart, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";

const About = () => {
  const handleCall = () => {
    window.location.href = "tel:+917596958097";
  };

  const handleWhatsApp = () => {
    window.location.href = "https://wa.me/917596958097";
  };

  const values = [
    {
      icon: Heart,
      title: "Wellness First",
      description: "Your health and wellness journey is our top priority. We connect you with the best facilities and professionals.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "All our partner businesses are verified and maintain the highest standards of safety and hygiene.",
    },
    {
      icon: Target,
      title: "Personalized Experience",
      description: "Find exactly what you need with our smart matching system that understands your preferences.",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "We ensure only the best gyms, spas, and yoga centers join our platform through rigorous quality checks.",
    },
  ];

  return (
    <>
      <SEOHead 
        title="About GymSpaYoga - Your Wellness Journey Partner"
        description="Learn about GymSpaYoga's mission to connect you with the best wellness facilities across India. Discover our story, values, and commitment to your health."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        {/* Contact Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <h2 className="text-lg md:text-xl font-semibold">Talk to Owner: 7596958097</h2>
              <div className="flex gap-4">
                <Button 
                  onClick={handleCall}
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Transforming Wellness
                <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Across India
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                We're building India's most trusted wellness platform, connecting millions of people 
                with premium gyms, rejuvenating spas, and transformative yoga experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">Our Story</h2>
              <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                <p>
                  GymSpaYoga was born from a simple yet powerful vision: to make wellness accessible, 
                  convenient, and personalized for everyone across India. We recognized that finding 
                  the right fitness center, spa, or yoga studio shouldn't be a challenge.
                </p>
                <p>
                  Today, we're proud to be India's fastest-growing wellness platform, trusted by 
                  thousands of users and hundreds of premium wellness businesses. Our technology-driven 
                  approach ensures you always find the perfect match for your wellness journey.
                </p>
                <p>
                  From busy professionals seeking quick spa treatments to fitness enthusiasts looking 
                  for the perfect gym, we're here to connect you with experiences that transform your 
                  life, one booking at a time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do and every decision we make
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">Our Mission</h2>
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white">
                <p className="text-xl md:text-2xl leading-relaxed font-medium">
                  To revolutionize the wellness industry in India by creating a seamless, 
                  technology-driven platform that connects people with transformative wellness 
                  experiences, empowering both consumers and businesses to thrive in the digital age.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Wellness Journey?</h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Join thousands of satisfied customers who trust GymSpaYoga for their wellness needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-emerald-600 hover:bg-gray-50 font-semibold px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/explore'}
                >
                  Explore Services
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-emerald-600 font-semibold px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/register-business'}
                >
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
