
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, TrendingUp, Shield, Zap, Crown, Dumbbell, MapPin, Phone, Facebook, Instagram, Linkedin, X } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Budget Friendly",
      price: "₹2,999",
      description: "Perfect for small local businesses getting started",
      icon: <Zap className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500",
      features: [
        "Basic business listing",
        "Up to 10 photos",
        "Contact information display",
        "Basic customer reviews",
        "Email support",
        "Mobile app presence",
        "Search result inclusion"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "₹4,999",
      description: "Ideal for established businesses looking to grow",
      icon: <Star className="h-8 w-8" />,
      color: "from-blue-500 to-purple-500",
      features: [
        "Everything in Budget Friendly",
        "Up to 25 photos & videos",
        "Priority search placement",
        "Advanced analytics dashboard",
        "Customer booking management",
        "Social media integration",
        "Chat support",
        "Customer inquiry management",
        "Basic promotional tools"
      ],
      popular: true
    },
    {
      name: "Luxury",
      price: "₹7,999",
      description: "Premium solution for luxury establishments",
      icon: <Crown className="h-8 w-8" />,
      color: "from-purple-500 to-pink-500",
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
        "White-label booking system"
      ],
      popular: false
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/blogs">
                <Button variant="outline" className="text-xs sm:text-sm">
                  Blogs
                </Button>
              </Link>
              <Link to="/register-business">
                <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-xs sm:text-sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Pricing Plans for
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Business Owners </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your gym, spa, or yoga studio. One-time registration fee with performance-based lead charges.
          </p>
          <Badge className="px-6 py-3 text-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
            ✨ For Business Owners (Gyms, Spas, Yoga Studios)
          </Badge>
        </div>

        {/* Registration Fee Plans */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">1. One-Time Registration Fee</h3>
          <p className="text-center text-gray-600 mb-12 text-lg">Non-refundable registration to list your business on our platform</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 transform hover:scale-105 ${plan.popular ? 'ring-4 ring-emerald-500 ring-opacity-50' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-center py-2 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                
                <CardHeader className="text-center pb-6 pt-8">
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    {plan.price}
                    <span className="text-lg font-normal text-gray-500">/-</span>
                  </div>
                  <CardDescription className="text-gray-600 text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="px-6 pb-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/register-business">
                    <Button className={`w-full py-3 text-lg font-semibold bg-gradient-to-r ${plan.color} hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
                      Choose {plan.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Lead Conversion Fee */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">2. Per-Customer Fee (Lead Conversion)</h3>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                ₹20
              </div>
              <div className="text-xl text-gray-600">per customer</div>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Platform usage charge - Only pay when we successfully connect you with a paying customer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadConversionFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Manage Bookings CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-8 sm:p-12 text-white text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Manage Your Bookings?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Take control of your business with our comprehensive booking management system. Track customers, manage schedules, and grow your revenue.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/manage-bookings">
              <Button size="lg" variant="outline" className="bg-white text-emerald-600 hover:bg-gray-100 border-0 text-lg px-8 py-4">
                Access Booking Dashboard
              </Button>
            </Link>
            <Link to="/register-business">
              <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-lg px-8 py-4">
                Start Your Registration
              </Button>
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Is the registration fee refundable?</h4>
              <p className="text-gray-600">No, the one-time registration fee is non-refundable as it covers the setup and lifetime listing of your business on our platform.</p>
            </Card>
            <Card className="p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">How does the ₹20 per customer charge work?</h4>
              <p className="text-gray-600">You only pay ₹20 when we successfully connect you with a genuine customer who books or inquires about your services.</p>
            </Card>
            <Card className="p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Can I upgrade my plan later?</h4>
              <p className="text-gray-600">Yes, you can upgrade your plan at any time by paying the difference between your current plan and the upgraded plan.</p>
            </Card>
            <Card className="p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">What payment methods do you accept?</h4>
              <p className="text-gray-600">We accept all major credit cards, debit cards, UPI, net banking, and digital wallets for your convenience.</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">GymSpaYoga</h4>
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Your wellness journey starts here. We connect fitness enthusiasts with the best gyms, spas, and yoga centers across India.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mb-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <Facebook className="h-5 w-5 text-white" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <X className="h-5 w-5 text-white" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-800 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <Linkedin className="h-5 w-5 text-white" />
                </a>
              </div>

              {/* Payment Methods */}
              <div>
                <h6 className="text-sm font-semibold text-gray-400 mb-3">We Accept</h6>
                <div className="flex space-x-3">
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://logos-world.net/wp-content/uploads/2020/09/PayPal-Logo.png" alt="PayPal" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-6 w-10" />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-emerald-400">For Users</h5>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/gyms" className="hover:text-emerald-400 transition-colors duration-300">Find Gyms</Link></li>
                <li><Link to="/spas" className="hover:text-emerald-400 transition-colors duration-300">Find Spas</Link></li>
                <li><Link to="/yoga" className="hover:text-emerald-400 transition-colors duration-300">Find Yoga Centers</Link></li>
                <li><Link to="/trainers" className="hover:text-emerald-400 transition-colors duration-300">Find Trainers</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors duration-300">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-blue-400">For Business</h5>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/register-business" className="hover:text-blue-400 transition-colors duration-300">List Your Business</Link></li>
                <li><Link to="/register-trainer" className="hover:text-blue-400 transition-colors duration-300">Become a Trainer</Link></li>
                <li><Link to="/manage-bookings" className="hover:text-blue-400 transition-colors duration-300">Manage Bookings</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-400 transition-colors duration-300">Pricing Plans</Link></li>
                <li><span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Support</span></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-purple-400">Contact</h5>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-purple-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-purple-400" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GymSpaYoga. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
