
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, TrendingUp, Shield, Zap, Crown, Sparkles, ArrowRight, Gift, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Budget Friendly",
      price: "₹2,999",
      originalPrice: "₹3,999",
      description: "Perfect for small local businesses getting started",
      icon: <Zap className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500",
      borderColor: "border-green-200",
      bestFor: "Small local gyms, spas, or yoga studios just getting started.",
      ideal: "If you have a modest setup and want a solid online presence with basic tools and customer visibility — this is your plan.",
      features: [
        "Basic business listing",
        "Up to 10 photos",
        "Contact information display",
        "Basic customer reviews",
        "Email support",
        "Mobile app presence",
        "Search result inclusion",
        "Business hours display"
      ],
      popular: false,
      savings: "Save ₹1,000"
    },
    {
      name: "Premium",
      price: "₹4,999",
      originalPrice: "₹6,999",
      description: "Ideal for established businesses looking to grow",
      icon: <Star className="h-8 w-8" />,
      color: "from-blue-500 to-purple-500",
      borderColor: "border-blue-200",
      bestFor: "Established businesses looking to grow.",
      ideal: "If your location has a good client base and you want priority search placement, customer management, and promotional tools, Premium gives you everything you need to scale.",
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
      popular: true,
      savings: "Save ₹2,000"
    },
    {
      name: "Luxury",
      price: "₹7,999",
      originalPrice: "₹9,999",
      description: "Premium solution for luxury establishments",
      icon: <Crown className="h-8 w-8" />,
      color: "from-purple-500 to-pink-500",
      borderColor: "border-purple-200",
      bestFor: "High-end or multi-location businesses offering luxury services.",
      ideal: "If you own a luxury wellness destination, offer customized services, or want advanced marketing tools, white-label booking, and dedicated account support, this plan is for you.",
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
      popular: false,
      savings: "Save ₹2,000"
    }
  ];

  const leadConversionFeatures = [
    {
      title: "Quality Leads",
      description: "Only pay for genuine customer inquiries and bookings",
      icon: <Users className="h-6 w-6 text-emerald-600" />
    },
    {
      title: "Performance Tracking",
      description: "Real-time analytics to track your ROI and customer acquisition",
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Secure Payments",
      description: "All transactions are secure and processed instantly",
      icon: <Shield className="h-6 w-6 text-purple-600" />
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      business: "FitZone Gym, Mumbai",
      rating: 5,
      text: "Our bookings increased by 300% within 2 months of joining GymSpaYoga!"
    },
    {
      name: "Raj Patel",
      business: "Serenity Spa, Delhi",
      rating: 5,
      text: "The premium plan helped us stand out and attract high-value customers."
    },
    {
      name: "Kavita Singh",
      business: "Bliss Yoga Studio, Bangalore",
      rating: 5,
      text: "Amazing ROI! We get qualified leads daily and our revenue has doubled."
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <SEOHead 
        title="Pricing Plans - Grow Your Wellness Business | GymSpaYoga"
        description="Choose the perfect pricing plan for your gym, spa, or yoga studio. One-time registration with performance-based lead charges. Start growing today!"
        keywords="gym pricing, spa pricing, yoga studio pricing, business listing, wellness business growth, fitness center pricing, spa membership plans"
        url="https://gymspayoga.com/pricing"
        structuredData={structuredData}
      />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section - Left Aligned */}
        <div className="text-left mb-16 max-w-4xl">
          <div className="flex justify-start mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
              <Gift className="h-4 w-4" />
              <span>Limited Time: Up to ₹2,000 OFF!</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mb-6">
            Pricing Plans for
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Business Owners </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Your wellness journey starts here. We connect fitness enthusiasts with the best gyms, spas, and yoga centers across India.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Badge className="px-6 py-3 text-base bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
              <Sparkles className="h-4 w-4 mr-2" />
              For Business Owners
            </Badge>
            <Badge variant="outline" className="px-6 py-3 text-base border-emerald-200 text-emerald-700">
              <Shield className="h-4 w-4 mr-2" />
              No Hidden Fees
            </Badge>
          </div>
        </div>

        {/* How to Choose Section */}
        <div className="mb-16">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 flex items-center">
              <Compass className="h-8 w-8 mr-3 text-emerald-600" />
              How to Choose the Right Plan for Your Business?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We've designed our pricing to match the type and scale of your establishment. Here's how to decide which plan is right for you:
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${plan.popular ? 'ring-4 ring-emerald-500 ring-opacity-50 shadow-2xl scale-105' : ''} ${plan.borderColor} border-2`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-center py-3 text-sm font-semibold flex items-center justify-center space-x-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span>MOST POPULAR</span>
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                )}
                
                <CardHeader className="text-left pb-6 pt-12">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">{plan.name}</CardTitle>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl text-gray-400 line-through">{plan.originalPrice}</span>
                      <Badge className="bg-red-500 text-white text-xs">{plan.savings}</Badge>
                    </div>
                    <div className="text-4xl sm:text-5xl font-bold text-gray-800">
                      {plan.price}
                      <span className="text-lg font-normal text-gray-500">/-</span>
                    </div>
                  </div>
                  
                  <CardDescription className="text-gray-600 text-base mt-4">
                    {plan.description}
                  </CardDescription>

                  <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
                    <p className="text-sm font-semibold text-emerald-700 mb-2">Best for:</p>
                    <p className="text-sm text-gray-700 mb-3">{plan.bestFor}</p>
                    <p className="text-sm text-gray-600">{plan.ideal}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="px-6 pb-8">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/register-business">
                    <Button className={`w-full py-4 text-lg font-semibold bg-gradient-to-r ${plan.color} hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2`}>
                      <span>Choose {plan.name}</span>
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Registration Fee Plans */}
        <div className="mb-24">
          <div className="text-left mb-12 max-w-4xl">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">1. One-Time Registration Fee</h3>
            <p className="text-lg text-gray-600 mb-8">Non-refundable registration to list your business on our platform</p>
          </div>
        </div>

        {/* Lead Conversion Fee */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl mb-20">
          <div className="text-left mb-12 max-w-4xl">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">2. Per-Customer Fee (Lead Conversion)</h3>
            <div className="flex items-center space-x-4 mb-6">
              <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                ₹20
              </div>
              <div className="text-xl text-gray-600">per customer</div>
            </div>
            <p className="text-lg text-gray-600">
              Platform usage charge - Only pay when we successfully connect you with a paying customer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadConversionFeatures.map((feature, index) => (
              <div key={index} className="text-left group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300 mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h3 className="text-3xl sm:text-4xl font-bold text-left text-gray-800 mb-12 max-w-4xl">What Our Partners Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-gray-100 text-left">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.business}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Manage Bookings CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-8 sm:p-12 text-white text-left mb-20">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Business?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-3xl">
            Join thousands of successful wellness businesses. Take control with our comprehensive management system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/manage-bookings">
              <Button size="lg" variant="outline" className="bg-white text-emerald-600 hover:bg-gray-100 border-0 text-lg px-8 py-4 flex items-center space-x-2">
                <span>Access Dashboard</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/register-business">
              <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-lg px-8 py-4 flex items-center space-x-2">
                <span>Start Registration</span>
                <Sparkles className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h3 className="text-3xl sm:text-4xl font-bold text-left text-gray-800 mb-12 max-w-4xl">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 text-left">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Is the registration fee refundable?</h4>
              <p className="text-gray-600">No, the one-time registration fee is non-refundable as it covers the setup and lifetime listing of your business on our platform.</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-all duration-300 text-left">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">How does the ₹20 per customer charge work?</h4>
              <p className="text-gray-600">You only pay ₹20 when we successfully connect you with a genuine customer who books or inquires about your services.</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-all duration-300 text-left">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Can I upgrade my plan later?</h4>
              <p className="text-gray-600">Yes, you can upgrade your plan at any time by paying the difference between your current plan and the upgraded plan.</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-all duration-300 text-left">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">What payment methods do you accept?</h4>
              <p className="text-gray-600">We accept all major credit cards, debit cards, UPI, net banking, and digital wallets for your convenience.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
