import React from 'react';
import { Shield, Award, Users, CheckCircle, Star, Clock, Phone, Headphones } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TrustBadges = () => {
  const trustBadges = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Secure",
      description: "SSL Encrypted & Data Protected",
      color: "text-green-600 bg-green-50"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Verified Partners",
      description: "Hand-picked & Certified Businesses",
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "50K+ Members",
      description: "Trusted by Fitness Enthusiasts",
      color: "text-purple-600 bg-purple-50"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Money-Back Guarantee",
      description: "100% Satisfaction Assured",
      color: "text-emerald-600 bg-emerald-50"
    }
  ];

  const certifications = [
    { name: "ISO 27001", desc: "Information Security" },
    { name: "PCI DSS", desc: "Payment Security" },
    { name: "GDPR", desc: "Data Protection" },
    { name: "SOC 2", desc: "Security Standards" }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustBadges.map((badge, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${badge.color}`}>
                  {badge.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{badge.title}</h3>
                <p className="text-sm text-gray-600">{badge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications & Support */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Security Certifications */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="font-bold text-gray-800">Security Certifications</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-800">{cert.name}</div>
                    <div className="text-xs text-gray-600">{cert.desc}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 24/7 Support */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Headphones className="h-6 w-6 text-emerald-600 mr-3" />
                <h3 className="font-bold text-gray-800">24/7 Customer Support</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-blue-600 mr-3" />
                  <span className="text-gray-700">+91 1800-123-YOGA (9642)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-emerald-600 mr-3" />
                  <span className="text-gray-700">Average response time: &lt; 2 minutes</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-3 fill-current" />
                  <span className="text-gray-700">4.9/5 Customer Satisfaction</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Statement */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl">
          <div className="flex justify-center mb-4">
            <Badge className="bg-green-100 text-green-700 px-4 py-2 text-sm font-bold">
              <CheckCircle className="h-4 w-4 mr-2" />
              Trusted by 50,000+ Users Across India
            </Badge>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Your Wellness, Our Responsibility
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every business on our platform is verified, insured, and committed to excellence. 
            We personally vet each partner to ensure you receive the highest quality service. 
            Your safety and satisfaction are our top priorities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;