import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const pricingPlans = [
  {
    tier: "Budget",
    name: "Budget Friendly",
    price: "₹2,999",
    originalPrice: "₹3,999",
    description: "Perfect for small local businesses getting started",
    features: [
      "Basic business listing",
      "Up to 10 photos",
      "Contact information display",
      "Basic customer reviews",
      "Mobile app presence",
      "Business hours display",
      "Search result inclusion",
      "Email support"
    ],
    cta: "Get Started",
    highlight: false,
    icon: <Zap className="h-7 w-7" />,
  },
  {
    tier: "Premium",
    name: "Premium",
    price: "₹4,999",
    originalPrice: "₹6,999",
    description: "Ideal for established businesses looking to grow",
    features: [
      "Everything in Budget Friendly",
      "Up to 25 photos & videos",
      "Priority search placement",
      "Advanced analytics dashboard",
      "Customer booking management",
      "Social media integration",
      "Chat support",
      "Customer inquiry management",
      "Basic promotional tools",
      "Featured listing badge"
    ],
    cta: "Start Premium",
    highlight: true,
    icon: <Star className="h-7 w-7" />,
  },
  {
    tier: "Luxury",
    name: "Luxury",
    price: "₹7,999",
    originalPrice: "₹9,999",
    description: "Premium solution for luxury establishments",
    features: [
      "Everything in Premium",
      "Unlimited photos & videos",
      "Featured business badge",
      "Top search result placement",
      "Advanced booking system",
      "Custom business page design",
      "Priority customer support",
      "Advanced marketing tools",
      "Performance insights",
      "Multi-location support",
      "White-label booking system",
      "Dedicated account manager"
    ],
    cta: "Go Luxury",
    highlight: false,
    icon: <Crown className="h-7 w-7" />,
  }
];

// Unified features map for quick table presentation
const allFeatures = [
  "Basic business listing",
  "Up to 10 photos",
  "Contact information display",
  "Basic customer reviews",
  "Mobile app presence",
  "Business hours display",
  "Search result inclusion",
  "Email support",

  "Up to 25 photos & videos",
  "Priority search placement",
  "Advanced analytics dashboard",
  "Customer booking management",
  "Social media integration",
  "Chat support",
  "Customer inquiry management",
  "Basic promotional tools",
  "Featured listing badge",

  "Unlimited photos & videos",
  "Featured business badge",
  "Top search result placement",
  "Advanced booking system",
  "Custom business page design",
  "Priority customer support",
  "Advanced marketing tools",
  "Performance insights",
  "Multi-location support",
  "White-label booking system",
  "Dedicated account manager"
];

// What plan contains which feature
const planHasFeature = (feature: string, planIndex: number) => {
  const plan = pricingPlans[planIndex];
  return plan.features.some(f => f === feature || (feature.startsWith("Everything in") && f.startsWith(feature)));
};

const FAQ = [
  {
    q: "Is the registration fee refundable?",
    a: "No, the one-time registration fee is non-refundable as it covers the setup and lifetime listing of your business on our platform.",
  },
  {
    q: "How does the ₹20 per customer charge work?",
    a: "You only pay ₹20 when we successfully connect you with a genuine customer who books or inquires about your services."
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes, you can upgrade your plan at any time by paying the difference between your current plan and the upgraded plan.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets for your convenience.",
  },
];

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "GymSpaYoga Business Listing Plans",
    "description": "Professional business listing plans for gyms, spas, and yoga studios in India",
    "brand": {
      "@type": "Brand",
      "name": "GymSpaYoga"
    },
    "offers": pricingPlans.map(plan => ({
      "@type": "Offer",
      "name": plan.name,
      "price": plan.price.replace('₹', ''),
      "priceCurrency": "INR",
      "description": plan.description,
      "availability": "https://schema.org/InStock"
    }))
  };

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fbff] to-[#ecfdf5] overflow-x-hidden">
      <SEOHead 
        title="Pricing Plans - Grow Your Wellness Business | GymSpaYoga"
        description="Choose the perfect pricing plan for your gym, spa, or yoga studio. One-time registration with performance-based lead charges. Start growing today!"
        keywords="gym pricing, spa pricing, yoga studio pricing, business listing, wellness business growth, fitness center pricing, spa membership plans"
        url="https://gymspayoga.com/pricing"
        structuredData={structuredData}
      />

      {/* Premium Hero Header */}
      <div className="mx-auto text-center pt-24 pb-12 max-w-2xl">
        <Badge className="bg-gradient-to-r from-emerald-200 via-teal-200 to-blue-200 text-emerald-800 mb-4 px-5 py-2 text-base font-bold rounded-full shadow-glass animate-float">
          <span className="mr-2">🚀</span>Special Offer: Save up to ₹2,000
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold gradient-text mb-6 drop-shadow-lg animate-scale-in">
          Unlock Limitless Growth
        </h1>
        <p className="text-2xl text-gray-700 font-light mb-7">
          Choose a premium plan—grow at your own pace, with zero hidden fees.
        </p>
      </div>

      {/* Premium Pricing Cards Section */}
      <section className="py-12 max-w-6xl mx-auto px-3">
        <div className="flex flex-col lg:flex-row gap-12 justify-center items-center lg:items-stretch">
          {pricingPlans.map((plan, idx) => (
            <Card
              key={plan.name}
              className={`
                flex-1 min-w-[325px] max-w-[410px] relative px-6 hover-lift
                bg-white/50 glass-glow rounded-3xl border-none shadow-xl
                transition-all duration-300
                ${plan.highlight
                  ? "z-20 animate-float border-2 border-gradient bg-white/80 shadow-2xl scale-105 ring-8 ring-emerald-100"
                  : "shadow-md"}
              `}
              style={
                plan.highlight
                  ? {
                      borderImage: "linear-gradient(90deg, #10b981 0%, #3b82f6 100%) 1",
                      boxShadow: "0 12px 32px rgba(16,185,129,0.15), 0 1.5px 8px rgba(0,0,0,0.08)",
                    }
                  : { }
              }
            >
              {/* Card Glow & Shine */}
              {plan.highlight && (
                <div className="absolute inset-0 pointer-events-none z-10 rounded-3xl ring-1 ring-emerald-300 shadow-lg animate-glow"></div>
              )}
              
              {/* Plan Header */}
              <CardHeader className={`py-10 flex flex-col items-center bg-gradient-to-br from-white/70 via-blue-50 to-emerald-50 rounded-2xl mb-5 shadow-md relative overflow-visible`}>
                <span className="absolute top-5 right-6">
                  {plan.highlight && (
                    <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 text-sm font-black drop-shadow-lg tracking-wide animate-pulse animate-delay-2000 glass-strong">
                      <Star className="h-5 w-5 inline mr-1 -mt-1" />
                      Most Popular
                    </Badge>
                  )}
                </span>
                <div className="mb-6 animate-float">{plan.icon}</div>
                <CardTitle className="text-3xl font-extrabold text-transparent gradient-text bg-clip-text mb-2">{plan.name}</CardTitle>
                <div className="text-gray-500 text-sm mb-3">{plan.description}</div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-5xl font-black text-gray-900 leading-none">{plan.price}</span>
                  <span className="text-lg text-gray-400 line-through">{plan.originalPrice}</span>
                </div>
              </CardHeader>

              {/* Features */}
              <CardContent>
                <ul className="mb-8 mt-2 space-y-4">
                  {plan.features.filter(f => !f.startsWith("Everything in")).map((feature, fi) => (
                    <li className="flex items-center group" key={fi}>
                      <span className="relative mr-3">
                        <Check className="h-5 w-5 text-emerald-500 transition-transform group-hover:scale-125 duration-200" />
                        {/* Animate checkmark on hover */}
                        <span className="absolute left-0 top-0 w-5 h-5 rounded-full bg-emerald-100 opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-200"></span>
                      </span>
                      <span className="text-base text-gray-700 leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register-business">
                  <Button
                    className={`
                      w-full py-4 text-lg font-extrabold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200
                      ${plan.highlight
                        ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-none animate-glow"
                        : "bg-white/80 text-emerald-700 border-2 border-emerald-300 hover:bg-emerald-50"}
                    `}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table - subtle glass effect, sticky header */}
        <div className="overflow-x-auto mt-20 rounded-xl border border-gray-100 bg-white/60 shadow-md md:block hidden">
          <table className="min-w-full border-collapse text-sm font-medium">
            <thead>
              <tr>
                <th className="border-b px-4 py-5 bg-gradient-to-r from-emerald-100 to-blue-50 text-left text-base text-emerald-700 font-extrabold sticky top-0 z-10">
                  Features
                </th>
                {pricingPlans.map(plan => (
                  <th key={plan.name} className="border-b px-4 py-5 text-center text-base gradient-text font-extrabold bg-gradient-to-br from-white via-blue-50 to-emerald-50 sticky top-0 z-10">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feature, idx) => (
                <tr key={feature} className="even:bg-white/30 hover:bg-emerald-50/40 transition-colors">
                  <td className="px-4 py-3">{feature}</td>
                  {pricingPlans.map((_, planIdx) => (
                    <td key={planIdx} className="px-4 py-3 text-center">
                      {planHasFeature(feature, planIdx) ? (
                        <span className="inline-flex justify-center items-center animate-scale-in">
                          <Check className="h-4 w-4 text-emerald-500 inline" />
                        </span>
                      ) : (
                        <span className="inline-block text-gray-300">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Per Conversion Fee - premium glass highlight */}
      <section className="mt-24 mx-auto max-w-3xl text-center">
        <div className="bg-gradient-to-r from-emerald-100/80 to-blue-100/80 rounded-2xl p-10 mb-10 shadow-xl glass-strong border border-emerald-200 flex flex-col items-center justify-center animate-slide-in">
          <h2 className="text-3xl sm:text-4xl font-black mb-2 gradient-text">Performance-Based Charges</h2>
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="text-6xl font-black text-emerald-600 animate-pulse">₹20</span>
            <span className="text-2xl text-gray-700 font-medium leading-tight">per paying customer</span>
          </div>
          <div className="text-gray-600 text-base font-medium">Only pay when we send you a genuine customer. Rest easy—no hidden fees.</div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-24 mx-auto max-w-4xl px-2">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 section-divider">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {FAQ.map((item, idx) => (
            <Card key={idx} className="p-7 rounded-2xl glass shadow-md">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.q}</h4>
              <div className="text-gray-600 text-base">{item.a}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 mx-auto text-center max-w-2xl pb-28">
        <h4 className="text-2xl font-black mb-2 text-gray-900 gradient-text drop-shadow-lg">Boost your wellness business growth today!</h4>
        <Link to="/register-business">
          <Button size="lg" className="btn-brand px-12 py-6 mt-6 font-black rounded-2xl shadow-2xl animate-scale-in text-xl">
            Get Started Now
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Pricing;
