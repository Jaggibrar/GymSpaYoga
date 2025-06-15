
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const pricingPlans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for hobby projects and getting started.",
    features: [
      "Up to 5 gym/spa listings",
      "Basic customer reviews",
      "Email support",
      "Mobile app presence",
      "Basic analytics",
      "Community support"
    ],
    limitations: [
      "Limited customization",
      "Basic search visibility",
      "Standard support"
    ],
    cta: "Get started",
    popular: false,
    buttonVariant: "outline" as const
  },
  {
    name: "Pro",
    price: "₹2,999",
    period: "per month",
    description: "Everything you need to scale your wellness business.",
    features: [
      "Everything in Free",
      "Unlimited listings",
      "Priority search placement",
      "Advanced analytics dashboard",
      "Customer booking management",
      "Social media integration",
      "Priority email support",
      "Custom business page design",
      "Performance insights",
      "API access"
    ],
    limitations: [],
    cta: "Start free trial",
    popular: true,
    buttonVariant: "default" as const
  },
  {
    name: "Team",
    price: "₹7,999",
    period: "per month",
    description: "Advanced features for teams and enterprises.",
    features: [
      "Everything in Pro",
      "Multi-location support",
      "Advanced booking system",
      "White-label solutions",
      "Dedicated account manager",
      "Phone & chat support",
      "Custom integrations",
      "Advanced security",
      "SLA guarantee",
      "Training & onboarding"
    ],
    limitations: [],
    cta: "Start free trial",
    popular: false,
    buttonVariant: "outline" as const
  }
];

const comparisonFeatures = [
  {
    category: "Platform",
    features: [
      { name: "Business listings", free: "5", pro: "Unlimited", team: "Unlimited" },
      { name: "Customer reviews", free: true, pro: true, team: true },
      { name: "Mobile app presence", free: true, pro: true, team: true },
      { name: "API access", free: false, pro: true, team: true },
      { name: "Custom domain", free: false, pro: false, team: true }
    ]
  },
  {
    category: "Analytics & Reporting",
    features: [
      { name: "Basic analytics", free: true, pro: true, team: true },
      { name: "Advanced analytics", free: false, pro: true, team: true },
      { name: "Performance insights", free: false, pro: true, team: true },
      { name: "Custom reports", free: false, pro: false, team: true },
      { name: "Data export", free: false, pro: true, team: true }
    ]
  },
  {
    category: "Support",
    features: [
      { name: "Community support", free: true, pro: true, team: true },
      { name: "Email support", free: true, pro: true, team: true },
      { name: "Priority support", free: false, pro: true, team: true },
      { name: "Phone support", free: false, pro: false, team: true },
      { name: "Dedicated account manager", free: false, pro: false, team: true }
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
    q: "Is there a free trial?",
    a: "Yes, we offer a 14-day free trial for all paid plans. No credit card required to start."
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
        description="Simple, transparent pricing for gym, spa, and yoga studio owners. Start free, scale as you grow."
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
              Choose the perfect plan for your wellness business. Always know what you'll pay.
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
                  {plan.limitations.map((limitation) => (
                    <li key={limitation} className="flex gap-x-3">
                      <X className="h-6 w-5 flex-none text-gray-400" />
                      <span className="text-gray-400">{limitation}</span>
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
            Choose the plan that's right for you
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
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
                        {typeof feature.free === 'boolean' ? (
                          feature.free ? (
                            <Check className="mx-auto h-5 w-5 text-indigo-600" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-gray-400" />
                          )
                        ) : (
                          <span className="text-sm text-gray-600">{feature.free}</span>
                        )}
                      </div>
                      <div className="text-center">
                        {typeof feature.pro === 'boolean' ? (
                          feature.pro ? (
                            <Check className="mx-auto h-5 w-5 text-indigo-600" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-gray-400" />
                          )
                        ) : (
                          <span className="text-sm text-gray-600">{feature.pro}</span>
                        )}
                      </div>
                      <div className="text-center">
                        {typeof feature.team === 'boolean' ? (
                          feature.team ? (
                            <Check className="mx-auto h-5 w-5 text-indigo-600" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-gray-400" />
                          )
                        ) : (
                          <span className="text-sm text-gray-600">{feature.team}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column Headers for comparison table */}
        <div className="grid grid-cols-4 gap-x-6 border-b border-gray-200 pb-4 mb-8">
          <div></div>
          <div className="text-center text-sm font-semibold text-gray-900">Free</div>
          <div className="text-center text-sm font-semibold text-gray-900">Pro</div>
          <div className="text-center text-sm font-semibold text-gray-900">Team</div>
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
                  Start your free trial
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
