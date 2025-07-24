import React from 'react';
import { Shield, Phone, Clock, MessageCircle, Mail, MapPin, Award, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SecurityGuarantee = () => {
  const guarantees = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "100% Money-Back Guarantee",
      description: "Not satisfied with your first session? Get a full refund within 7 days, no questions asked.",
      badge: "7-Day Promise"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Verified Professional Network",
      description: "Every trainer and business owner is background-checked, certified, and continuously monitored.",
      badge: "Background Verified"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Assurance Program",
      description: "Regular quality audits, customer feedback monitoring, and performance evaluations ensure excellence.",
      badge: "Quality Monitored"
    }
  ];

  const supportChannels = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "24/7 Phone Support",
      detail: "+91 1800-123-YOGA",
      availability: "Always available"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      detail: "Instant help",
      availability: "< 2 min response"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      detail: "support@gymspayoga.com",
      availability: "< 4 hour response"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Main Guarantee Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 text-green-700 px-6 py-3 rounded-full mb-6">
            <Shield className="h-5 w-5 mr-2" />
            <span className="font-bold">Protected by GymSpaYoga Guarantee</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Your Safety & Satisfaction, Guaranteed
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're so confident in our platform and partners that we back every booking with 
            comprehensive guarantees and 24/7 support. Your peace of mind is our priority.
          </p>
        </div>

        {/* Guarantee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {guarantees.map((guarantee, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-full mb-6">
                  {guarantee.icon}
                </div>
                <Badge className="bg-green-100 text-green-700 mb-4">
                  {guarantee.badge}
                </Badge>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {guarantee.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {guarantee.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Bank-Level Security for Your Data
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We use the same security standards as major banks to protect your personal and payment information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "256-bit SSL", desc: "Encryption" },
              { title: "PCI DSS", desc: "Compliant" },
              { title: "GDPR", desc: "Protected" },
              { title: "ISO 27001", desc: "Certified" }
            ].map((feature, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <div className="font-bold text-gray-800">{feature.title}</div>
                <div className="text-sm text-gray-600">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Channels */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need Help? We're Here 24/7
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Our dedicated support team is always ready to help you with any questions, 
              concerns, or issues. No matter the time, we've got your back.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {supportChannels.map((channel, index) => (
              <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                  {channel.icon}
                </div>
                <h4 className="font-bold mb-2">{channel.title}</h4>
                <p className="text-sm opacity-90 mb-1">{channel.detail}</p>
                <Badge className="bg-white/20 text-white text-xs">
                  {channel.availability}
                </Badge>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-3"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Start Live Chat Now
            </Button>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="text-center mt-12 p-6 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center justify-center mb-3">
            <Phone className="h-6 w-6 text-red-600 mr-2" />
            <span className="font-bold text-red-800">Emergency Helpline</span>
          </div>
          <p className="text-red-700 mb-2">
            For urgent safety concerns or emergencies during sessions
          </p>
          <p className="text-xl font-bold text-red-800">
            +91 9999-HELP (4357)
          </p>
          <p className="text-sm text-red-600 mt-2">
            Available 24/7 • Average response time: 30 seconds
          </p>
        </div>
      </div>
    </section>
  );
};

export default SecurityGuarantee;