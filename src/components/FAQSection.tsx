
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How do I book a gym session near me?",
    answer: "Simply search for gyms in your area using our location filter, browse available options, and click 'Quick Book' to schedule your session. You can book as a guest or create an account for faster future bookings."
  },
  {
    question: "What types of spa treatments are available?",
    answer: "Our partner spas offer a wide range of treatments including Swedish massage, deep tissue massage, aromatherapy, facials, body wraps, hot stone therapy, and specialized wellness treatments. Each spa has detailed service descriptions and pricing."
  },
  {
    question: "Are the yoga instructors certified?",
    answer: "Yes, all yoga instructors on our platform are certified professionals with verified credentials. We display their certifications, experience levels, and specializations to help you choose the right instructor for your needs."
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you can cancel or reschedule bookings up to 24 hours before your appointment through your user dashboard. Some premium services may have different cancellation policies which are clearly stated during booking."
  },
  {
    question: "What are the membership benefits?",
    answer: "Our premium memberships include priority booking, discounted rates, access to exclusive facilities, complimentary guest passes, and dedicated customer support. Different tiers offer varying levels of benefits."
  },
  {
    question: "How do I become a partner business?",
    answer: "Register your business through our 'List Your Business' page. We'll verify your credentials, facilities, and insurance. Once approved, you can manage bookings, set pricing, and access our business dashboard tools."
  },
  {
    question: "Is there a mobile app available?",
    answer: "Currently, our website is fully mobile-optimized and works seamlessly on all devices. We're developing a dedicated mobile app which will be available soon with additional features like offline access and push notifications."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, UPI payments, net banking, and digital wallets. All transactions are secured with 256-bit SSL encryption for your safety."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 bg-gray-50" aria-labelledby="faq-heading">
      <div className="w-full px-4 md:px-8 mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about using our platform
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@gymspayoga.com"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Email Support
            </a>
            <a
              href="tel:+917596958097"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Call +91 75969 58097
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
