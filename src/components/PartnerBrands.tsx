import React from 'react';
import { Building2, Users, Award, TrendingUp, MapPin, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PartnerBrands = () => {
  const partnerCategories = [
    {
      category: "Premium Gym Chains",
      partners: [
        { name: "Gold's Gym", locations: "50+ locations", rating: "4.8" },
        { name: "Anytime Fitness", locations: "25+ locations", rating: "4.7" },
        { name: "Fitness First", locations: "30+ locations", rating: "4.9" },
        { name: "Cult.fit", locations: "40+ locations", rating: "4.6" }
      ]
    },
    {
      category: "Luxury Spa Brands",
      partners: [
        { name: "VLCC", locations: "80+ locations", rating: "4.8" },
        { name: "Lakme Salon", locations: "60+ locations", rating: "4.7" },
        { name: "Kaya Skin Clinic", locations: "45+ locations", rating: "4.9" },
        { name: "O2 Spa", locations: "25+ locations", rating: "4.8" }
      ]
    },
    {
      category: "Yoga Studios",
      partners: [
        { name: "The Yoga Institute", locations: "15+ locations", rating: "4.9" },
        { name: "Isha Yoga", locations: "20+ locations", rating: "4.8" },
        { name: "Art of Living", locations: "35+ locations", rating: "4.7" },
        { name: "Patanjali Yogpeeth", locations: "10+ locations", rating: "4.9" }
      ]
    }
  ];

  const stats = [
    { icon: <Building2 className="h-6 w-6" />, value: "1000+", label: "Partner Businesses" },
    { icon: <Users className="h-6 w-6" />, value: "50K+", label: "Active Members" },
    { icon: <MapPin className="h-6 w-6" />, value: "25+", label: "Cities Covered" },
    { icon: <Award className="h-6 w-6" />, value: "4.9★", label: "Average Rating" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Trusted by India's Leading Wellness Brands
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We partner exclusively with certified, premium wellness destinations to ensure 
            you receive the highest quality services and experiences.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-full mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Partner Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {partnerCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.partners.map((partner, partnerIndex) => (
                    <div key={partnerIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <div className="font-semibold text-gray-800">{partner.name}</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {partner.locations}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm font-semibold text-gray-700">{partner.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partnership Promise */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <Award className="h-12 w-12 mx-auto mb-6 opacity-90" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Our Partnership Promise
            </h3>
            <p className="text-lg opacity-90 mb-6 leading-relaxed">
              Every business on our platform undergoes rigorous verification including license checks, 
              insurance validation, background verification, and quality assessments. We don't just list 
              businesses – we curate exceptional wellness experiences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-80">Verified Partners</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-80">Quality Monitoring</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">Zero</div>
                <div className="text-sm opacity-80">Tolerance for Poor Service</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerBrands;