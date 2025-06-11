
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, MapPin, Clock, MessageCircle, HeadphonesIcon, Users, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import SEOHead from "@/components/SEOHead";

const Support = () => {
  useScrollToTop();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Support ticket submitted successfully! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const faqs = [
    {
      question: "How do I book a gym session?",
      answer: "Simply browse our gym listings, select your preferred gym, choose a membership plan or day pass, and click 'Book Now'. You'll receive a confirmation email with all the details."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking up to 2 hours before your scheduled session. Go to 'Manage Bookings' in your account to cancel or reschedule."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No, we believe in transparent pricing. All fees are clearly displayed during the booking process. The only additional charges may be for premium amenities or personal training sessions."
    },
    {
      question: "How do I become a business partner?",
      answer: "Visit our 'Register Business' page and fill out the application form. Our team will review your submission and contact you within 5-7 business days."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets like PayTM, PhonePe, and Google Pay."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, we offer a mobile-optimized website. A dedicated mobile app is in development and will be available soon on both iOS and Android platforms."
    },
    {
      question: "How do I update my profile information?",
      answer: "Log into your account and go to the Profile section where you can update your personal information, preferences, and contact details."
    },
    {
      question: "What if I forget my password?",
      answer: "Click on 'Forgot Password' on the login page and follow the instructions. You'll receive an email with a link to reset your password."
    }
  ];

  const supportStats = [
    { icon: Users, value: "10K+", label: "Happy Customers", color: "text-emerald-500" },
    { icon: MessageCircle, value: "24/7", label: "Support Available", color: "text-blue-500" },
    { icon: Star, value: "4.9/5", label: "Support Rating", color: "text-yellow-500" },
    { icon: HeadphonesIcon, value: "<2hrs", label: "Response Time", color: "text-purple-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <SEOHead 
        title="Support Center - Get Help | GymSpaYoga"
        description="Need help? Our support team is here 24/7. Find answers to common questions or contact us directly for personalized assistance."
        keywords="support, help, customer service, FAQ, contact, GymSpaYoga"
        url="https://gymspayoga.com/support"
      />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Support Center
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            We're here to help! Find answers to common questions or get in touch with our support team.
          </p>
          
          {/* Support Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {supportStats.map((stat, index) => (
              <Card key={index} className="text-center p-4 hover:shadow-lg transition-all duration-300">
                <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl flex items-center">
                <MessageCircle className="h-6 w-6 mr-3 text-emerald-600" />
                Contact Support
              </CardTitle>
              <CardDescription>
                Send us a message and we'll respond within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Describe your issue or question in detail"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Get in Touch</CardTitle>
                <CardDescription>
                  Multiple ways to reach our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Phone className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="font-semibold">Phone Support</p>
                    <p className="text-gray-600">+91 7596958097</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 7 PM IST</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold">Email Support</p>
                    <p className="text-gray-600">gymspayoga@gmail.com</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-semibold">Office Address</p>
                    <p className="text-gray-600">India</p>
                    <p className="text-sm text-gray-500">Headquarters</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9 AM - 7 PM</p>
                    <p className="text-gray-600">Saturday: 10 AM - 4 PM</p>
                    <p className="text-sm text-gray-500">Sunday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">
              Frequently Asked Questions
            </CardTitle>
            <CardDescription className="text-center">
              Quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-emerald-600 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;
