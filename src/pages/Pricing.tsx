
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
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Pricing - Choose Your Perfect Plan | GymSpaYoga"
        description="Simple, transparent pricing for gym, spa, and yoga studio owners. Choose from Budget Friendly, Premium, or Luxury business listings."
        keywords="pricing, gym software, spa management, yoga studio software, business listing"
        url="https://gymspayoga.com/pricing"
        structuredData={structuredData}
      />

      {/* Header */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Choose the perfect plan for your wellness business tier. Each plan includes one business listing.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-md grid gap-8 lg:max-w-none lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative rounded-3xl p-8 ring-1 ring-gray-200 ${
                plan.popular ? 'bg-gray-900 ring-gray-900' : 'bg-white'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1">
                  Most popular
                </Badge>
              )}
              
              <CardHeader className="p-0">
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className={`text-lg font-semibold leading-8 ${
                    plan.popular ? 'text-white' : 'text-gray-900'
                  }`}>
                    {plan.name}
                  </h3>
                </div>
                <p className={`mt-4 text-sm leading-6 ${
                  plan.popular ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {plan.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className={`text-4xl font-bold tracking-tight ${
                    plan.popular ? 'text-white' : 'text-gray-900'
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm font-semibold leading-6 ${
                    plan.popular ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    /{plan.period}
                  </span>
                </p>
              </CardHeader>

              <CardContent className="p-0 mt-8">
                <ul className="mt-8 space-y-3 text-sm leading-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className={`h-6 w-5 flex-none ${
                        plan.popular ? 'text-indigo-400' : 'text-indigo-600'
                      }`} />
                      <span className={plan.popular ? 'text-gray-300' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/register-business" className="block mt-8">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-indigo-500' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
                    }`}
                    variant={plan.buttonVariant}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Compare features
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the plan that's right for your business tier
          </p>
        </div>

        {/* Column Headers for comparison table */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-4 gap-x-6 border-b border-gray-200 pb-4 mb-8">
            <div></div>
            <div className="text-center text-sm font-semibold text-gray-900">Budget Friendly</div>
            <div className="text-center text-sm font-semibold text-gray-900">Premium</div>
            <div className="text-center text-sm font-semibold text-gray-900">Luxury</div>
          </div>

          <div className="grid grid-cols-1 gap-y-16">
            {comparisonFeatures.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">
                  {category.category}
                </h3>
                <div className="mt-4 space-y-4">
                  {category.features.map((feature) => (
                    <div key={feature.name} className="grid grid-cols-4 gap-x-6 py-4 border-b border-gray-200">
                      <div className="text-sm leading-6 text-gray-900 font-medium">
                        {feature.name}
                      </div>
                      <div className="text-center">
                        {typeof feature.budget === 'boolean' ? (
                          feature.budget ? (
                            <Check className="mx-auto h-5 w-5 text-indigo-600" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-gray-400" />
                          )
                        ) : (
                          <span className="text-sm text-gray-600">{feature.budget}</span>
                        )}
                      </div>
                      <div className="text-center">
                        {typeof feature.premium === 'boolean' ? (
                          feature.premium ? (
                            <Check className="mx-auto h-5 w-5 text-indigo-600" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-gray-400" />
                          )
                        ) : (
                          <span className="text-sm text-gray-600">{feature.premium}</span>
                        )}
                      </div>
                      <div className="text-center">
                        {typeof feature.luxury === 'boolean' ? (
                          feature.luxury ? (
                            <Check className="mx-auto h-5 w-5 text-indigo-600" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-gray-400" />
                          )
                        ) : (
                          <span className="text-sm text-gray-600">{feature.luxury}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance-based pricing */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Performance-based pricing
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Only pay for results. ₹20 per genuine customer booking.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-2">
              <span className="text-5xl font-bold text-indigo-600">₹20</span>
              <span className="text-lg text-gray-600">per customer booking</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-16">
            Frequently asked questions
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {FAQ.map((item, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">
                  {item.q}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Ready to get started?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join thousands of wellness businesses already growing with our platform.
            </p>
            <div className="mt-8">
              <Link to="/register-business">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3">
                  Start your business listing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
