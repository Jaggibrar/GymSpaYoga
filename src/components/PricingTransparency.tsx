
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap } from "lucide-react";

const PricingTransparency = () => {
  const plans = [
    {
      name: "Basic Gym Access",
      price: "₹1,500",
      period: "/month",
      description: "Perfect for fitness enthusiasts",
      features: [
        "Access to 500+ gyms",
        "Basic equipment usage",
        "Locker facilities",
        "Customer support"
      ],
      badge: "Most Popular",
      badgeColor: "bg-emerald-500"
    },
    {
      name: "Premium Wellness",
      price: "₹3,500",
      period: "/month",
      description: "Complete wellness experience",
      features: [
        "All Basic features",
        "Spa & yoga access",
        "Personal trainer sessions (2/month)",
        "Nutrition consultation",
        "Priority booking"
      ],
      badge: "Best Value",
      badgeColor: "bg-blue-500"
    },
    {
      name: "Elite Membership",
      price: "₹6,500",
      period: "/month",
      description: "Ultimate luxury experience",
      features: [
        "All Premium features",
        "Unlimited trainer sessions",
        "Luxury spa treatments",
        "Guest passes (4/month)",
        "Concierge service"
      ],
      badge: "Premium",
      badgeColor: "bg-purple-500"
    }
  ];

  const payPerUse = [
    {
      service: "Single Gym Session",
      price: "₹150-300",
      icon: Zap
    },
    {
      service: "Yoga Class",
      price: "₹300-500",
      icon: Star
    },
    {
      service: "Spa Treatment",
      price: "₹1,500-5,000",
      icon: Star
    },
    {
      service: "Personal Training",
      price: "₹800-1,500",
      icon: Zap
    }
  ];

  return (
    <section className="py-6 md:py-8 bg-white" aria-labelledby="pricing-heading">
      <div className="w-full px-4 md:px-8 mx-auto max-w-7xl">
        <div className="text-center mb-4">
          <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your wellness journey. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Membership Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative hover:shadow-xl transition-shadow duration-300 ${index === 1 ? 'border-2 border-blue-500' : ''}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className={`${plan.badgeColor} text-white px-3 py-1`}>
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-gray-800">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pay Per Use Options */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Pay Per Use
            </h3>
            <p className="text-gray-600">
              Try before you commit. Book individual sessions with no membership required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {payPerUse.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center">
                <item.icon className="h-8 w-8 mx-auto mb-3 text-emerald-500" />
                <h4 className="font-semibold text-gray-800 mb-1">{item.service}</h4>
                <p className="text-lg font-bold text-emerald-600">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            * Prices may vary by location and facility. All memberships include 7-day free trial.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingTransparency;
