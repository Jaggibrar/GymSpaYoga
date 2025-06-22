
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Award, Heart } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const About = () => {
  return (
    <>
      <SEOHead
        title="About Us - GymSpaYoga | Your Wellness Journey Starts Here"
        description="Learn about GymSpaYoga's mission to make fitness and wellness accessible to everyone. Discover our story, values, and commitment to your health."
        keywords="about gymspaYoga, wellness platform, fitness mission, health commitment"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">About GymSpaYoga</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We're on a mission to make fitness and wellness accessible to everyone, 
              connecting you with the best gyms, spas, yoga studios, and personal trainers in your area.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  At GymSpaYoga, we believe that everyone deserves access to quality fitness and wellness services. 
                  Our platform bridges the gap between fitness enthusiasts and premium wellness facilities, 
                  making it easier than ever to find and book your perfect workout or relaxation session.
                </p>
                <p className="text-lg text-gray-600">
                  Whether you're looking for a high-intensity gym session, a relaxing spa treatment, 
                  or a peaceful yoga class, we've got you covered with verified, high-quality options in your area.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Wellness journey"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardTitle>Wellness First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your health and wellness are our top priority. We carefully vet all our partners to ensure quality.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Building a strong wellness community where everyone supports each other's fitness journey.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We maintain the highest standards for all facilities and trainers on our platform.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle>Accessibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Making fitness and wellness accessible to everyone, regardless of their location or budget.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              We're a passionate team of fitness enthusiasts, wellness experts, and technology professionals 
              dedicated to revolutionizing how you discover and book wellness services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full mx-auto mb-4"></div>
                    <h3 className="text-xl font-bold mb-2">Team Member {i}</h3>
                    <p className="text-gray-600 mb-2">Wellness Expert</p>
                    <p className="text-sm text-gray-500">
                      Dedicated to helping you achieve your fitness and wellness goals.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
