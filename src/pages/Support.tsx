
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, Clock, MessageCircle, HelpCircle, Users, Settings, CreditCard, Dumbbell, ArrowLeft, Send, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const supportCategories = [
    {
      title: "Account & Billing",
      icon: <CreditCard className="h-8 w-8" />,
      description: "Manage your account, payments, and subscription",
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Booking Issues",
      icon: <Settings className="h-8 w-8" />,
      description: "Help with reservations and cancellations",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Business Partnership",
      icon: <Users className="h-8 w-8" />,
      description: "Partner with us to grow your business",
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Technical Support",
      icon: <Settings className="h-8 w-8" />,
      description: "App issues and technical difficulties",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  const faqs = [
    {
      question: "How do I book a gym membership?",
      answer: "Simply search for gyms in your area, compare prices and amenities, then click 'Book Now' on your preferred gym. You'll be guided through a simple booking process."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel bookings up to 24 hours before your scheduled session. Go to 'My Bookings' and select the booking you want to cancel."
    },
    {
      question: "How do I list my gym/spa/yoga center?",
      answer: "Click on 'List Your Business' in the header, fill out the registration form, choose your pricing plan, and our team will verify and activate your listing within 24-48 hours."
    },
    {
      question: "What analytics do I get as a business owner?",
      answer: "You get comprehensive analytics including booking trends, customer demographics, revenue tracking, ROI metrics, and performance insights to help grow your business."
    },
    {
      question: "How does the pricing work for businesses?",
      answer: "We have three plans: Budget (₹2,999), Standard (₹4,999), and Luxury (₹9,999) one-time registration fees, plus ₹20 per customer booking."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, we offer a responsive web platform that works seamlessly on all devices. A dedicated mobile app is coming soon!"
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Dumbbell className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
            How Can We 
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Help You?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get instant support, find answers to common questions, or contact our expert team for personalized assistance.
          </p>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 px-4 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak with our support team</p>
              <p className="text-xl font-semibold text-green-600">+91 98765 43210</p>
              <p className="text-sm text-gray-500">Available 24/7</p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Get detailed assistance</p>
              <p className="text-xl font-semibold text-blue-600">support@gymspayoga.com</p>
              <p className="text-sm text-gray-500">Response within 2 hours</p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Instant messaging support</p>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Start Chat
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">Support Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportCategories.map((category, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm cursor-pointer">
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white`}>
                  {category.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{category.title}</h4>
                <p className="text-gray-600">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">Frequently Asked Questions</h3>
          
          {/* FAQ Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white/90 border-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredFaqs.map((faq, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-start">
                  <HelpCircle className="h-6 w-6 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  {faq.question}
                </h4>
                <p className="text-gray-600 leading-relaxed pl-9">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-gray-800 mb-4">Send Us a Message</CardTitle>
                <p className="text-gray-600">Can't find what you're looking for? Send us a detailed message and we'll get back to you.</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <Input placeholder="Your full name" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" placeholder="your.email@example.com" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <Input placeholder="+91 98765 43210" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <Select onValueChange={setSelectedCategory}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account">Account & Billing</SelectItem>
                        <SelectItem value="booking">Booking Issues</SelectItem>
                        <SelectItem value="business">Business Partnership</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <Textarea 
                      placeholder="Describe your issue or question in detail..." 
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-8">Support Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <Clock className="h-8 w-8 text-white mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Phone Support</h4>
              <p className="text-white/90">Available 24/7</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <Mail className="h-8 w-8 text-white mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Email Support</h4>
              <p className="text-white/90">Response within 2 hours</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <MessageCircle className="h-8 w-8 text-white mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Live Chat</h4>
              <p className="text-white/90">Mon-Sun: 9 AM - 11 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
