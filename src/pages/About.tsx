import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Target, Award, CheckCircle, MapPin, Phone, Mail } from 'lucide-react';
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
            
            <div className="max-w-lg mx-auto">
              <Card className="group relative overflow-hidden border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-[#005EB8] bg-white">
                <CardContent className="relative p-8 text-center">
                  {/* Profile Avatar */}
                  <div className="relative mb-8">
                    <div className="relative mx-auto">
                      <div className="w-28 h-28 bg-[#005EB8] rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <span className="text-3xl font-bold text-white">JS</span>
                      </div>
                      {/* Floating Badge */}
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-[#005EB8] text-white px-4 py-2 shadow-lg font-medium">
                          Founder & CEO
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Name and Title */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-black mb-2">Jagdeep Singh</h3>
                    <p className="text-[#005EB8] font-semibold">Founder & CEO</p>
                  </div>
                  
                  {/* Vision Quote */}
                  <div className="mb-6">
                    <blockquote className="text-gray-600 leading-relaxed italic text-center relative">
                      <span className="text-4xl text-[#005EB8]/30 absolute -top-2 -left-2">"</span>
                      Our vision is to create a world where wellness is not a luxury, but an accessible 
                      part of everyone's daily life. Through GymSpaYoga, we're democratizing access to 
                      health and happiness, one booking at a time.
                      <span className="text-4xl text-[#005EB8]/30 absolute -bottom-6 -right-2">"</span>
                    </blockquote>
                  </div>
                  
                  {/* Mission Statement */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
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
