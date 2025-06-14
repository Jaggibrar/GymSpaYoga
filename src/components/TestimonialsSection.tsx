
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MapPin, Award, TrendingUp, Users, Target, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  review: string;
  location: string;
  service: string;
  achievement: string;
  beforeAfter?: string;
  timeframe: string;
  profession: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    review: "I was struggling with weight loss for years until I found this platform. The yoga studio they recommended changed everything - not just my body, but my entire mindset. The booking was instant and the results speak for themselves!",
    location: "Mumbai",
    service: "Yoga Studio",
    achievement: "Lost 15kg in 6 months",
    beforeAfter: "Transformed from stress-eating to mindful living",
    timeframe: "6 months",
    profession: "Marketing Manager"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    rating: 5,
    review: "As a software engineer, I was completely out of shape. This platform connected me with the perfect gym and trainer. The transformation has been incredible - I feel stronger and more confident than ever!",
    location: "Delhi",
    service: "Premium Gym",
    achievement: "Gained 10kg muscle mass",
    beforeAfter: "From skinny developer to fitness enthusiast",
    timeframe: "8 months",
    profession: "Software Engineer"
  },
  {
    id: 3,
    name: "Anita Desai",
    rating: 5,
    review: "Work stress was killing me slowly. The luxury spa treatments I discovered through this platform have been life-changing. I feel rejuvenated, my skin glows, and my stress levels are completely manageable now.",
    location: "Bangalore",
    service: "Luxury Spa",
    achievement: "Stress-free & glowing skin",
    beforeAfter: "From burnout to balanced living",
    timeframe: "4 months",
    profession: "Corporate Executive"
  },
  {
    id: 4,
    name: "Vikram Singh",
    rating: 5,
    review: "I thought running a marathon was impossible at 35. The personal trainer I found through this platform proved me wrong. Not only did I complete my first marathon, but I've become addicted to fitness!",
    location: "Mumbai",
    service: "Personal Training",
    achievement: "Completed first marathon",
    beforeAfter: "From couch potato to marathon finisher",
    timeframe: "4 months",
    profession: "Business Owner"
  }
];

const TestimonialsSection = () => {
  return (
    <div className="space-y-16">
      {/* Success Stories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-[#0FFCBE] bg-white relative overflow-hidden">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#106EBE] to-[#0FFCBE]"></div>
            
            <CardContent className="p-8">
              {/* Success metrics */}
              <div className="flex items-center justify-between mb-6">
                <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 text-sm font-bold">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {testimonial.achievement}
                </Badge>
                <div className="text-sm text-gray-500 font-medium">
                  {testimonial.timeframe}
                </div>
              </div>

              {/* Quote */}
              <div className="mb-6">
                <Quote className="h-10 w-10 text-[#106EBE] opacity-30 mb-4" />
                <blockquote className="text-lg text-gray-700 leading-relaxed font-medium italic">
                  "{testimonial.review}"
                </blockquote>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 text-yellow-400 fill-current"
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600 font-medium">
                  Verified Success Story
                </span>
              </div>

              {/* User info without image */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">{testimonial.name}</h3>
                    <p className="text-emerald-600 font-semibold">{testimonial.profession}</p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{testimonial.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Service Used</div>
                    <div className="text-sm text-emerald-600 font-bold">
                      {testimonial.service}
                    </div>
                  </div>
                </div>

                {/* Transformation */}
                {testimonial.beforeAfter && (
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border-l-4 border-emerald-500">
                    <p className="text-sm text-gray-700 font-medium">
                      <span className="text-emerald-600 font-bold">Transformation:</span> {testimonial.beforeAfter}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Stats Section */}
      <div className="bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
        </div>
        
        <div className="relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              Join India's Fastest Growing Wellness Community
            </h3>
            <p className="text-xl opacity-90 font-medium">
              Real results from real people across India's top cities
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 mr-2" />
                <div className="text-4xl md:text-5xl font-black">4.9</div>
              </div>
              <div className="flex items-center justify-center mb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 text-yellow-300 fill-current" />
                ))}
              </div>
              <p className="text-lg font-semibold opacity-90">Average Rating</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 mr-2" />
                <div className="text-4xl md:text-5xl font-black">25K+</div>
              </div>
              <p className="text-lg font-semibold opacity-90">Success Stories</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-6 w-6 mr-2" />
                <div className="text-4xl md:text-5xl font-black">800+</div>
              </div>
              <p className="text-lg font-semibold opacity-90">Premium Partners</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 mr-2" />
                <div className="text-4xl md:text-5xl font-black">99%</div>
              </div>
              <p className="text-lg font-semibold opacity-90">Goal Achievement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA within testimonials */}
      <div className="text-center bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 border-2 border-gray-100 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full translate-x-16 -translate-y-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-emerald-100 rounded-full -translate-x-12 translate-y-12 opacity-50"></div>
        
        <div className="relative z-10">
          <div className="mb-6">
            <Badge className="bg-red-100 text-red-600 px-4 py-2 text-lg font-bold animate-pulse">
              🔥 Limited Time: Free Trial Extended
            </Badge>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
            Your Success Story Starts Here
          </h3>
          <p className="text-xl text-gray-600 mb-8 font-medium max-w-2xl mx-auto">
            Join thousands who transformed their lives. Book your first session today and 
            <span className="text-emerald-600 font-bold"> get 50% off your first month</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href="/signup"
              className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-black px-10 py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
            >
              🚀 Start Your Transformation - FREE
            </a>
            <a
              href="/register-business"
              className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 font-bold px-10 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-lg hover:border-emerald-500 hover:text-emerald-600"
            >
              List Your Business
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-emerald-500" />
              <span>No commitment required</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4 text-blue-500" />
              <span>Instant access</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-purple-500" />
              <span>25K+ members</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
