
import { useState } from "react";
import { ChevronDown, ChevronUp, Star, Shield, Zap, Award, HelpCircle, Phone, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
  category: "booking" | "services" | "membership" | "business" | "general";
  popular?: boolean;
}

const faqs: FAQ[] = [
  {
    question: "How quickly can I book my first transformation session?",
    answer: "Instant booking! Our premium partners have real-time availability. Most members secure their first session within 2 hours of signing up. With our FREE trial, you can start your transformation journey today - no commitment required.",
    category: "booking",
    popular: true
  },
  {
    question: "What makes GymSpaYoga different from other platforms?",
    answer: "We're India's only platform offering verified premium destinations with a 99% goal achievement rate. Every partner is hand-selected, certified, and backed by our money-back guarantee. Plus, you get personalized matching, instant booking, and 24/7 support.",
    category: "services",
    popular: true
  },
  {
    question: "Are your spa treatments and yoga instructors certified?",
    answer: "Absolutely! Every professional on our platform is rigorously verified with certified credentials, insurance, and background checks. We display certifications, specializations, and real member reviews to ensure you receive world-class service.",
    category: "services",
    popular: true
  },
  {
    question: "What if I'm not satisfied with my experience?",
    answer: "Your success is guaranteed! We offer a 100% money-back guarantee within 7 days of your first session. If you're not completely satisfied, we'll refund your payment and help you find a better match - no questions asked.",
    category: "membership",
    popular: true
  },
  {
    question: "Can I cancel or reschedule my sessions?",
    answer: "Yes! Premium members enjoy flexible cancellation up to 4 hours before their session. Basic members can cancel up to 24 hours in advance. Reschedule anytime through your dashboard with zero hassle.",
    category: "booking"
  },
  {
    question: "What are the exclusive membership benefits?",
    answer: "Premium members get priority booking, up to 50% discounts, exclusive access to luxury facilities, complimentary guest passes, personal wellness consultants, and first access to new premium destinations across India.",
    category: "membership"
  },
  {
    question: "How do I become a verified partner business?",
    answer: "Join 800+ premium partners! Apply through our 'Partner with Us' page. We verify credentials, inspect facilities, and ensure insurance compliance. Once approved, access our business dashboard with booking management, analytics, and marketing tools.",
    category: "business"
  },
  {
    question: "Do you have a mobile app for easier access?",
    answer: "Our mobile-optimized website works flawlessly on all devices with app-like functionality. Our dedicated mobile app launches soon with exclusive features like offline booking, push notifications, and AR gym tours.",
    category: "general"
  }
];

const categories = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "booking", label: "Booking & Scheduling", icon: Zap },
  { id: "services", label: "Services & Quality", icon: Award },
  { id: "membership", label: "Membership Benefits", icon: Star },
  { id: "business", label: "Business Partnership", icon: Shield }
];

const FAQSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFAQs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const popularFAQs = faqs.filter(faq => faq.popular);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" aria-labelledby="faq-heading">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] rounded-full"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-emerald-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-tr from-blue-100/20 to-emerald-100/20 rounded-full blur-2xl"></div>

      <div className="relative w-full px-4 md:px-8 mx-auto max-w-6xl">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <Badge className="bg-emerald-100 text-emerald-700 px-6 py-3 text-lg font-bold">
              💡 Your Questions, Answered Instantly
            </Badge>
          </div>
          <h2 id="faq-heading" className="text-3xl md:text-5xl font-black text-gray-800 mb-4">
            Everything You Need to Know
            <span className="block text-transparent bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] bg-clip-text text-2xl md:text-4xl mt-2">
              About Your Transformation
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
            Join 25,000+ members who found their answers and transformed their lives.
            <span className="block text-emerald-600 font-bold mt-1">Still have questions? We're here 24/7!</span>
          </p>
        </div>

        {/* Popular Questions Highlight */}
        <div className="mb-10">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-3">
              🔥 Most Asked Questions
            </h3>
            <p className="text-gray-600 font-medium">
              Quick answers to what our community wants to know most
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {popularFAQs.slice(0, 4).map((faq, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#0FFCBE] bg-white">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <h4 className="font-bold text-base text-gray-800 group-hover:text-emerald-600 transition-colors">
                      {faq.question}
                    </h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-medium text-sm">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`px-4 py-2 font-bold transition-all duration-300 text-sm ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg"
                    : "hover:border-emerald-500 hover:text-emerald-600"
                }`}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {filteredFAQs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-2 border-gray-200 hover:border-[#0FFCBE] rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="px-5 py-4 text-left hover:no-underline group">
                  <div className="flex items-center gap-3">
                    {faq.popular && (
                      <Badge className="bg-red-100 text-red-600 px-2 py-1 text-xs animate-pulse">
                        🔥 Popular
                      </Badge>
                    )}
                    <h3 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4">
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4 border-l-4 border-emerald-500">
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Enhanced Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-black mb-3">
                Still Have Questions?
              </h3>
              <p className="text-lg opacity-90 font-medium max-w-2xl mx-auto">
                Our wellness experts are available 24/7 to help you start your transformation journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="tel:+917596958097"
                className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 group"
              >
                <Phone className="h-6 w-6 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-base mb-1">Call Us Now</h4>
                <p className="text-sm opacity-90">+91 75969 58097</p>
                <p className="text-xs opacity-75 mt-1">Available 24/7</p>
              </a>
              
              <a
                href="mailto:support@gymspayoga.com"
                className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 group"
              >
                <Mail className="h-6 w-6 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-base mb-1">Email Support</h4>
                <p className="text-sm opacity-90">support@gymspayoga.com</p>
                <p className="text-xs opacity-75 mt-1">Response in 2 hours</p>
              </a>
            </div>
            
            <div className="text-center mt-6">
              <div className="flex items-center justify-center gap-4 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>100% Secure Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-300" />
                  <span>5-Star Rated Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span>Instant Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
