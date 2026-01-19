import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Users, Target, Award, CheckCircle, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const About = () => {
  return (
    <>
      <SEOHead
        title="About GymSpaYoga - Your Ultimate Wellness Platform | India's Leading Fitness Marketplace"
        description="Learn about GymSpaYoga's mission to make wellness accessible to everyone in India. Founded by Jagdeep Singh, we connect 50K+ users with premium gyms, luxury spas, and authentic yoga studios."
        keywords="about gymspayoga, wellness platform India, fitness community, health services, Jagdeep Singh founder"
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section - Solid Blue */}
        <section className="relative py-20 bg-[#005EB8] text-white overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">About GymSpaYoga</h1>
              <p className="text-xl mb-8 leading-relaxed text-white/90">
                Transforming the wellness industry by connecting people with the best fitness centers, 
                spas, yoga studios, and personal trainers in their area.
              </p>
            </div>
          </div>
          
          {/* Real People Banner */}
          <div className="container mx-auto px-4 mt-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex -space-x-4">
                {[
                  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=face',
                ].map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Community member ${index + 1}`}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full border-3 border-white object-cover shadow-md"
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="text-center md:text-left">
                <p className="text-2xl md:text-3xl font-bold text-white">10,000+</p>
                <p className="text-white/80 text-sm md:text-base">Active Members</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partner With GymSpaYoga Banner */}
        <section className="py-16 bg-[#005EB8] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Partner With <span className="text-white">GymSpaYoga</span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join India's fastest-growing wellness marketplace and take your business to the next level. 
              Connect with thousands of health-conscious customers and grow your revenue effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register-business">
                <Button size="lg" className="bg-white text-[#005EB8] font-bold hover:bg-gray-100 px-8 min-h-[48px]">
                  Start Registration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="/pricing">
                <Button size="lg" className="bg-[#005EB8] border-2 border-white text-white font-bold hover:bg-[#004d96] px-8 min-h-[48px]">
                  View Pricing Plans
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Mission Section with Image */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-black mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  At GymSpaYoga, we believe wellness should be accessible to everyone. Our platform bridges 
                  the gap between wellness seekers and providers, creating a community where health and 
                  happiness thrive.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#005EB8]" />
                    <span className="text-gray-700">Quality Verified Partners</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#005EB8]" />
                    <span className="text-gray-700">Easy Online Booking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#005EB8]" />
                    <span className="text-gray-700">Personalized Recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#005EB8]" />
                    <span className="text-gray-700">Community Support</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
                  alt="Wellness Community"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-6">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do and shape our commitment to the wellness community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#005EB8] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Wellness First</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your health and well-being are our top priority. We carefully vet every partner to ensure 
                    they meet our high standards for quality and safety.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#005EB8] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Community</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We're building more than a platform – we're creating a supportive community where 
                    everyone can find their path to wellness.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#005EB8] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Excellence</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We strive for excellence in everything we do, from our platform experience to 
                    our customer service and partner relationships.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-6">Leadership</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Meet the visionary behind GymSpaYoga's mission to revolutionize wellness accessibility.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Card className="relative overflow-hidden border border-gray-200 shadow-lg rounded-2xl bg-white">
                <CardContent className="relative p-8 text-center">
                  {/* Profile Avatar with Badge */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-3xl font-bold text-white">JS</span>
                      </div>
                      {/* Floating Badge */}
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-[#005EB8] text-white text-xs px-3 py-1 rounded-full shadow-md font-medium whitespace-nowrap">
                          Founder & CEO
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Name and Title */}
                  <div className="mb-6 mt-4">
                    <h3 className="text-2xl font-bold text-black mb-1">Jagdeep Singh</h3>
                    <p className="text-[#005EB8] font-medium text-sm">Founder & CEO</p>
                  </div>
                  
                  {/* Vision Quote */}
                  <div className="mb-6 px-4">
                    <div className="relative">
                      <span className="text-4xl text-[#005EB8]/40 absolute -top-3 -left-2 font-serif">"</span>
                      <p className="text-gray-600 leading-relaxed italic text-center pt-2">
                        Our vision is to create a world where wellness is not a luxury, but an accessible 
                        part of everyone's daily life. Through GymSpaYoga, we're democratizing access to 
                        health and happiness, one booking at a time.
                      </p>
                      <span className="text-4xl text-[#005EB8]/40 absolute -bottom-4 -right-2 font-serif">"</span>
                    </div>
                  </div>
                  
                  {/* Mission Statement Card */}
                  <div className="bg-[#F0F7FF] rounded-xl p-5 mt-8">
                    <p className="text-sm text-gray-600 italic leading-relaxed">
                      "Every person deserves the opportunity to live their healthiest, happiest life. GymSpaYoga is our commitment to making that vision a reality."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>


        {/* Contact Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-black mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-600 mb-12">
                Have questions or want to partner with us? We'd love to hear from you.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-12 w-12 text-[#005EB8] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-black mb-2">Visit Us</h3>
                    <p className="text-gray-600">
                      Kolkata, India
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                  <CardContent className="p-6 text-center">
                    <Phone className="h-12 w-12 text-[#005EB8] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-black mb-2">Call Us</h3>
                    <p className="text-gray-600">
                      +91 7596958097<br />
                      Mon-Fri 9AM-6PM
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                  <CardContent className="p-6 text-center">
                    <Mail className="h-12 w-12 text-[#005EB8] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-black mb-2">Email Us</h3>
                    <p className="text-gray-600">
                      GymSpaYoga@Gmail.com
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
