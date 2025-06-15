import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const pricingPlans = [
  {
    name: "Budget Friendly",
    price: "₹1,999",
    period: "per month",
    description: "Perfect for affordable wellness businesses starting out.",
    features: [
      "1 budget-friendly business listing",
      "Basic customer reviews",
      "Email support",
      "Mobile app presence",
      "Basic analytics",
      "Community support",
      "Monthly price range: ₹1,000 - ₹2,999",
      "Session price range: ₹200 - ₹999"
    ],
    limitations: [],
    cta: "Start listing",
    popular: false,
    buttonVariant: "outline" as const
  },
  {
    name: "Premium",
    price: "₹3,999",
    period: "per month",
    description: "Everything you need for quality wellness services.",
    features: [
      "1 premium business listing",
      "Priority search placement",
      "Advanced analytics dashboard",
      "Customer booking management",
      "Social media integration",
      "Priority email support",
      "Custom business page design",
      "Performance insights",
      "API access",
      "Monthly price range: ₹3,000 - ₹4,999",
      "Session price range: ₹1,000 - ₹1,999"
    ],
    limitations: [],
    cta: "Start listing",
    popular: true,
    buttonVariant: "default" as const
  },
  {
    name: "Luxury",
    price: "₹7,999",
    period: "per month",
    description: "Premium experience for high-end wellness destinations.",
    features: [
      "1 luxury business listing",
      "Featured placement",
      "White-label solutions",
      "Dedicated account manager",
      "Phone & chat support",
      "Custom integrations",
      "Advanced security",
      "SLA guarantee",
      "Training & onboarding",
      "Monthly price range: ₹5,000+",
      "Session price range: ₹2,000+"
    ],
    limitations: [],
    cta: "Start listing",
    popular: false,
    buttonVariant: "outline" as const
  }
];

const comparisonFeatures = [
  {
    category: "Platform",
    features: [
      { name: "Business listings", budget: "1 Budget", premium: "1 Premium", luxury: "1 Luxury" },
      { name: "Customer reviews", budget: true, premium: true, luxury: true },
      { name: "Mobile app presence", budget: true, premium: true, luxury: true },
      { name: "API access", budget: false, premium: true, luxury: true },
      { name: "Custom domain", budget: false, premium: false, luxury: true }
    ]
  },
  {
    category: "Analytics & Reporting",
    features: [
      { name: "Basic analytics", budget: true, premium: true, luxury: true },
      { name: "Advanced analytics", budget: false, premium: true, luxury: true },
      { name: "Performance insights", budget: false, premium: true, luxury: true },
      { name: "Custom reports", budget: false, premium: false, luxury: true },
      { name: "Data export", budget: false, premium: true, luxury: true }
    ]
  },
  {
    category: "Support",
    features: [
      { name: "Community support", budget: true, premium: true, luxury: true },
      { name: "Email support", budget: true, premium: true, luxury: true },
      { name: "Priority support", budget: false, premium: true, luxury: true },
      { name: "Phone support", budget: false, premium: false, luxury: true },
      { name: "Dedicated account manager", budget: false, premium: false, luxury: true }
    ]
  }
];

const FAQ = [
  {
    q: "Can I change plans at any time?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets."
  },
  {
    q: "How do the business listing tiers work?",
    a: "Each plan includes one business listing categorized by your pricing tier: Budget Friendly (₹1,000-₹2,999), Premium (₹3,000-₹4,999), or Luxury (₹5,000+)."
  },
  {
    q: "How does the ₹20 per customer charge work?",
    a: "You only pay ₹20 when we successfully connect you with a genuine customer who books your services."
  }
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "GymSpaYoga Business Plans",
  "description": "Professional business listing plans for gyms, spas, and yoga studios",
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
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Pricing - Choose Your Perfect Plan | GymSpaYoga"
        description="Simple, transparent pricing for gym, spa, and yoga studio owners. Choose from Budget Friendly, Premium, or Luxury business listings."
        keywords="pricing, gym software, spa management, yoga studio software, business listing"
        url="https://gymspayoga.com/pricing"
        structuredData={structuredData}
      />

      {/* Header */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-20 sm:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_2px_32px_#3ECF8E77]">
              <span className="block">Simple, modern pricing</span>
            </h1>
            <p className="mt-8 text-xl leading-relaxed text-gray-200">
              Designed for every tier of wellness business.
              <span className="block text-[#3ECF8E] font-bold mt-2">No hidden fees. One listing per plan.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="mx-auto max-w-7xl px-2 sm:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative rounded-3xl shadow-2xl border-0 px-8 py-10 flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-800
                ${plan.popular ? "ring-4 ring-[#3ECF8E] scale-105 z-10 shadow-[0_0_64px_#3ECF8E44]" : "ring-1 ring-gray-800"}
                hover:scale-105 hover:shadow-[0_0_32px_#3ECF8E55] transition-all duration-300
              `}
              style={{ minHeight: 580 }}
            >
              {plan.popular && (
                <Badge className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#3ECF8E] text-black px-5 py-1.5 rounded-full drop-shadow-[0_4px_32px_#3ECF8E55] border-0 text-base font-bold animate-pulse">
                  Most popular
                </Badge>
              )}

              <CardHeader className="p-0 text-center">
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-8 text-white tracking-tight drop-shadow">
                  {plan.name}
                </h3>
                <p className="mt-6 text-md leading-6 text-gray-400 font-medium">{plan.description}</p>
                <p className="mt-8 flex justify-center items-end gap-x-2">
                  <span className="text-5xl font-black tracking-tight text-white drop-shadow">{plan.price}</span>
                  <span className="text-base font-semibold leading-6 text-gray-300 mb-1">/{plan.period}</span>
                </p>
              </CardHeader>

              <CardContent className="p-0 mt-10 flex-1 flex flex-col justify-between">
                <ul className="space-y-3 text-lg font-medium">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 items-start">
                      <Check className="h-6 w-6 mt-1 text-[#3ECF8E] drop-shadow-[0_2px_12px_#3ECF8E33]" />
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register-business" className="block mt-10">
                  <Button
                    className={`w-full h-14 text-lg font-bold shadow-xl transition-all duration-300
                    ${plan.popular
                        ? "bg-[#3ECF8E] text-black hover:bg-[#32bf73] hover:shadow-[0_0_32px_#3ECF8E55]"
                        : "bg-[#181F1B] text-white border-2 border-[#3ECF8E55] hover:border-[#3ECF8E] hover:bg-[#101413] hover:shadow-[0_0_16px_#3ECF8E33]"
                    } rounded-xl`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Elegant divider */}
      <div className="my-24 flex items-center justify-center">
        <div className="w-4/5 h-0.5 bg-gradient-to-r from-transparent via-[#3ECF8E66] to-transparent rounded-full"></div>
      </div>

      {/* Feature Comparison */}
      <section className="mx-auto max-w-7xl px-2 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Compare features</h2>
          <p className="mt-3 text-lg text-gray-300">
            See which plan matches your growth journey
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-black border border-gray-700">
          <div className="grid grid-cols-4 gap-x-0 border-b border-gray-700">
            <div></div>
            <div className="text-center text-base font-bold text-white py-4 bg-black">Budget</div>
            <div className="text-center text-base font-bold text-white py-4 bg-[#101413]">Premium</div>
            <div className="text-center text-base font-bold text-white py-4 bg-black">Luxury</div>
          </div>

          <div className="divide-y divide-gray-800">
            {comparisonFeatures.map((category) => (
              <div key={category.category} className="py-6">
                <h3 className="text-lg font-bold text-[#3ECF8E] px-4 mb-2">{category.category}</h3>
                <div>
                  {category.features.map((feature, i) => (
                    <div
                      key={feature.name}
                      className={`grid grid-cols-4 gap-x-0 items-center px-4 py-3
                        ${i % 2 === 0 ? "bg-gray-900/60" : ""}
                      `}
                    >
                      <div className="text-left text-base text-white font-medium py-1">{feature.name}</div>
                      <div className="text-center py-1">
                        {typeof feature.budget === 'boolean'
                          ? feature.budget
                            ? <Check className="mx-auto h-5 w-5 text-[#3ECF8E]" />
                            : <X className="mx-auto h-5 w-5 text-gray-700" />
                          : <span className="text-base text-gray-200">{feature.budget}</span>
                        }
                      </div>
                      <div className="text-center py-1">
                        {typeof feature.premium === 'boolean'
                          ? feature.premium
                            ? <Check className="mx-auto h-5 w-5 text-[#3ECF8E]" />
                            : <X className="mx-auto h-5 w-5 text-gray-700" />
                          : <span className="text-base text-gray-200">{feature.premium}</span>
                        }
                      </div>
                      <div className="text-center py-1">
                        {typeof feature.luxury === 'boolean'
                          ? feature.luxury
                            ? <Check className="mx-auto h-5 w-5 text-[#3ECF8E]" />
                            : <X className="mx-auto h-5 w-5 text-gray-700" />
                          : <span className="text-base text-gray-200">{feature.luxury}</span>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elegant divider */}
      <div className="my-24 flex items-center justify-center">
        <div className="w-3/5 h-0.5 bg-gradient-to-r from-transparent via-[#3ECF8E44] to-transparent rounded-full"></div>
      </div>

      {/* Performance-based pricing */}
      <section className="bg-gradient-to-r from-[#101413] via-black to-[#101413] py-16 rounded-2xl mx-auto max-w-5xl mb-20 border border-gray-800 shadow-[0_0_48px_#3ECF8E22]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Performance-based pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Only pay for results.
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-2">
            <span className="text-6xl font-extrabold text-[#3ECF8E] drop-shadow-[0_0_32px_#3ECF8Ebb]">₹20</span>
            <span className="text-xl text-white opacity-80 font-bold">per customer booking</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-2 sm:px-8 pb-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-14 text-center">
            Frequently asked questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {FAQ.map((item, index) => (
              <div key={index} className="rounded-xl bg-gradient-to-br from-black via-gray-900 to-gray-800 p-7 border border-gray-800">
                <h3 className="text-lg font-bold leading-8 text-[#3ECF8E] mb-3">{item.q}</h3>
                <p className="text-base text-gray-200">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-[#3ECF8E19] via-[#3ECF8E12] to-transparent pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow">
            Ready to get started?
          </h2>
          <p className="mt-6 text-lg text-gray-200 font-medium">
            Grow with a GymSpaYoga business listing today.
          </p>
          <div className="mt-10 flex justify-center">
            <Link to="/register-business">
              <Button
                size="lg"
                className="bg-[#3ECF8E] hover:bg-[#32bf73] text-black px-12 py-4 font-black rounded-xl text-xl shadow-[0_0_32px_#3ECF8E33] transition-all duration-300"
              >
                Start your business listing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
