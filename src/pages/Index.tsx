
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, MapPin, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedHeroGrid from "@/components/AnimatedHeroGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import SEOHead from "@/components/SEOHead";
import RecentListings from "@/components/RecentListings";
import NearbyListings from "@/components/NearbyListings";

const Index = () => {
  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-20 lg:py-32">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMGZkZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  Find Your Perfect
                  <br />
                  <span className="text-gray-900">Wellness Partner</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
                  Discover premium gyms, luxury spas, authentic yoga studios, and certified personal trainers - all in one place
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                  <Link to="/explore">
                    <Button size="xl" className="text-xl font-black px-12 py-4 shadow-2xl">
                      Explore Now
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  </Link>
                  <Link to="/register-business">
                    <Button variant="outline" size="xl" className="text-xl font-black px-12 py-4">
                      List Your Business
                    </Button>
                  </Link>
                </div>
              </div>

              <AnimatedHeroGrid />
            </div>
          </div>
        </section>

        {/* Nearby Listings Section */}
        <NearbyListings />

        {/* Categories Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Explore By Category
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find exactly what you're looking for with our curated categories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Premium Gyms",
                  description: "State-of-the-art equipment and expert trainers",
                  image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
                  link: "/gyms",
                  gradient: "from-red-500 to-orange-500"
                },
                {
                  title: "Luxury Spas",
                  description: "Rejuvenating treatments and wellness therapies",
                  image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400",
                  link: "/spas",
                  gradient: "from-pink-500 to-rose-500"
                },
                {
                  title: "Yoga Studios",
                  description: "Find inner peace with certified instructors",
                  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
                  link: "/yoga",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  title: "Personal Trainers",
                  description: "Certified professionals for personalized fitness",
                  image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
                  link: "/trainers",
                  gradient: "from-blue-500 to-cyan-500"
                }
              ].map((category, index) => (
                <Link key={index} to={category.link} className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="aspect-square relative">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-500`}></div>
                    </div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                      <h3 className="text-2xl font-black mb-3">{category.title}</h3>
                      <p className="text-white/90 font-medium mb-4">{category.description}</p>
                      <div className="flex items-center text-white font-bold group-hover:text-yellow-300 transition-colors">
                        Explore Now <ArrowRight className="ml-2 h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Listings */}
        <RecentListings />

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "500+", label: "Verified Businesses" },
                { number: "10K+", label: "Happy Customers" },
                { number: "50+", label: "Cities Covered" },
                { number: "4.9", label: "Average Rating" }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl md:text-5xl font-black mb-2">{stat.number}</div>
                  <div className="text-emerald-100 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ */}
        <FAQSection />

        {/* CTA Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of people who have found their perfect fitness and wellness partners through our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/explore">
                <Button size="xl" className="text-xl font-black px-12 py-4">
                  Find Businesses Near You
                </Button>
              </Link>
              <Link to="/register-business">
                <Button variant="outline" size="xl" className="text-xl font-black px-12 py-4 border-white text-white hover:bg-white hover:text-gray-900">
                  List Your Business Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
