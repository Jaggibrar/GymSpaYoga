
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MapPin, Award } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  review: string;
  location: string;
  service: string;
  achievement: string;
  beforeAfter?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    review: "I found the perfect yoga studio through this platform and lost 15kg in 6 months! The booking process was seamless and the instructors are world-class.",
    location: "Mumbai",
    service: "Yoga Studio",
    achievement: "Lost 15kg in 6 months",
    beforeAfter: "Transformed from beginner to advanced practitioner"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    review: "This platform connected me with an amazing gym that changed my life. I gained 10kg of muscle and finally achieved the physique I always wanted!",
    location: "Delhi",
    service: "Premium Gym",
    achievement: "Gained 10kg muscle mass",
    beforeAfter: "From skinny to strong in 8 months"
  },
  {
    id: 3,
    name: "Anita Desai",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    review: "The luxury spa treatments I discovered here completely transformed my stress levels. I feel 10 years younger and my skin has never looked better!",
    location: "Bangalore",
    service: "Luxury Spa",
    achievement: "Stress-free & glowing skin",
    beforeAfter: "Overcame chronic stress and anxiety"
  },
  {
    id: 4,
    name: "Vikram Singh",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    review: "My personal trainer helped me prepare for a marathon in just 4 months. I went from couch potato to marathon finisher - incredible results!",
    location: "Mumbai",
    service: "Personal Training",
    achievement: "Completed first marathon",
    beforeAfter: "From 0 to 42km in 4 months"
  }
];

const TestimonialsSection = () => {
  return (
    <div className="space-y-12">
      {/* Featured testimonials grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-[#0FFCBE] bg-white">
            <CardContent className="p-8">
              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="h-12 w-12 text-[#106EBE] opacity-20" />
              </div>

              {/* Review text */}
              <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                "{testimonial.review}"
              </blockquote>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-6 w-6 text-yellow-400 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Achievement badge */}
              <div className="mb-6">
                <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 text-sm font-bold">
                  <Award className="h-4 w-4 mr-2" />
                  {testimonial.achievement}
                </Badge>
              </div>

              {/* User info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <OptimizedImage
                    src={testimonial.image}
                    alt={`${testimonial.name} profile photo`}
                    className="w-16 h-16 rounded-full object-cover border-4 border-[#0FFCBE]"
                    width={64}
                    height={64}
                  />
                  <div className="ml-4">
                    <h3 className="font-bold text-xl text-gray-800">{testimonial.name}</h3>
                    <div className="flex items-center text-gray-600 mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{testimonial.location}</span>
                    </div>
                    <div className="text-sm text-emerald-600 font-bold">
                      {testimonial.service}
                    </div>
                  </div>
                </div>
              </div>

              {/* Before/After */}
              {testimonial.beforeAfter && (
                <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border-l-4 border-emerald-500">
                  <p className="text-sm text-gray-700 font-medium">
                    <span className="text-emerald-600 font-bold">Transformation:</span> {testimonial.beforeAfter}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats section */}
      <div className="bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] rounded-2xl p-8 md:p-12 text-white text-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl md:text-5xl font-black mb-2">4.8</div>
            <div className="flex items-center justify-center mb-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-5 w-5 text-yellow-300 fill-current" />
              ))}
            </div>
            <p className="text-lg font-semibold opacity-90">Average Rating</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black mb-2">10,000+</div>
            <p className="text-lg font-semibold opacity-90">Happy Members</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black mb-2">500+</div>
            <p className="text-lg font-semibold opacity-90">Partner Locations</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black mb-2">98%</div>
            <p className="text-lg font-semibold opacity-90">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Call to action within testimonials */}
      <div className="text-center bg-gray-50 rounded-2xl p-8 md:p-12">
        <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-4">
          Ready to Write Your Success Story?
        </h3>
        <p className="text-xl text-gray-600 mb-6 font-medium">
          Join thousands who transformed their lives with our platform
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
          >
            Start Your Transformation Today
          </a>
          <a
            href="/register-business"
            className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-lg hover:border-emerald-500 hover:text-emerald-600"
          >
            Partner with Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
