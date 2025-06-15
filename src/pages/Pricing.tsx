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
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <SEOHead 
        title="Pricing Plans - Grow Your Wellness Business | GymSpaYoga"
        description="Choose the perfect pricing plan for your gym, spa, or yoga studio. One-time registration with performance-based lead charges. Start growing today!"
        keywords="gym pricing, spa pricing, yoga studio pricing, business listing, wellness business growth, fitness center pricing, spa membership plans"
        url="https://gymspayoga.com/pricing"
        structuredData={structuredData}
      />

      {/* Hero header */}
      <div className="mx-auto text-center pt-20 pb-10 max-w-2xl">
        <Badge className="bg-emerald-100 text-emerald-700 mb-3 px-4 py-2 text-base font-medium">Special Offer: Save up to ₹2,000</Badge>
        <h1 className="text-5xl font-black text-gray-900 mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 font-light mb-6">Pick the plan crafted for your business journey. Growing brands trust GymSpaYoga.</p>
      </div>

      {/* Pricing Tables (Supabase style) */}
      <section className="py-8 max-w-6xl mx-auto px-2">
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {pricingPlans.map((plan, idx) => (
            <Card key={plan.name}
              className={`
                flex-1 min-w-[325px] border-2 px-4 
                ${plan.highlight ? "border-emerald-400 scale-105 ring-4 ring-emerald-100 shadow-xl z-10" : "border-gray-200 shadow-md"}
                transition-all duration-300
              `}
            >
              {/* Plan Header */}
              <CardHeader className="py-8 flex flex-col items-center bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl mb-5 relative">
                <span className={`absolute top-6 right-7`}>
                  {plan.highlight && (
                    <Badge className="bg-emerald-500 text-white px-3 py-2 text-xs">Most Popular</Badge>
                  )}
                </span>
                <div className="mb-5">{plan.icon}</div>
                <CardTitle className="text-3xl font-extrabold text-gray-800 mb-2">{plan.name}</CardTitle>
                <div className="text-gray-500 text-sm mb-2">{plan.description}</div>
                <div className="flex items-end mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-gray-900">{plan.price}</span>
                  <span className="text-lg text-gray-400 ml-2 line-through">{plan.originalPrice}</span>
                </div>
              </CardHeader>

              {/* Features */}
              <CardContent>
                <ul className="mb-8 mt-2 space-y-4">
                  {plan.features.filter(f => !f.startsWith("Everything in")).map((feature, fi) => (
                    <li className="flex items-center" key={fi}>
                      <Check className="h-5 w-5 text-emerald-500 mr-2" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register-business">
                  <Button className={`w-full py-3 text-lg font-semibold ${plan.highlight ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white" : "bg-white text-emerald-700 border border-emerald-400"}`}>
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table (optional for desktop) */}
        <div className="overflow-x-auto mt-16 rounded-xl border border-gray-100 bg-white shadow md:block hidden">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b px-4 py-4 text-left text-base text-gray-700 font-bold">Features</th>
                {pricingPlans.map(plan => (
                  <th key={plan.name} className="border-b px-4 py-4 text-center text-base text-gray-700 font-bold">{plan.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feature, idx) => (
                <tr key={feature} className="even:bg-gray-50">
                  <td className="px-4 py-3">{feature}</td>
                  {pricingPlans.map((_, planIdx) => (
                    <td key={planIdx} className="px-4 py-3 text-center">
                      {planHasFeature(feature, planIdx) ? (
                        <span className="inline-block"><Check className="h-4 w-4 text-emerald-500 inline" /></span>
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

      {/* "Per Conversion Fee" like Supabase's "Usage-based" */}
      <section className="mt-20 mx-auto max-w-3xl text-center">
        <div className="bg-gradient-to-r from-emerald-100 to-blue-100 rounded-2xl p-8 mb-8 shadow">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">Performance-Based Charges</h2>
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="text-5xl font-extrabold text-emerald-600">₹20</span>
            <span className="text-xl text-gray-700 font-medium">per paying customer<br className="sm:hidden" /></span>
          </div>
          <div className="text-gray-600 text-base">Only pay when we send you a genuine customer. Rest easy—no hidden fees.</div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-20 mx-auto max-w-4xl px-2">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {FAQ.map((item, idx) => (
            <Card key={idx} className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.q}</h4>
              <div className="text-gray-600 text-base">{item.a}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 mx-auto text-center max-w-2xl pb-20">
        <h4 className="text-2xl font-bold mb-2 text-gray-900">Boost your wellness business growth today!</h4>
        <Link to="/register-business">
          <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-10 py-5 mt-4 font-bold rounded-xl shadow-xl">
            Get Started Now
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Pricing;
