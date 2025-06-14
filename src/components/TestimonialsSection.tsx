
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  review: string;
  location: string;
  service: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    review: "Found the perfect yoga studio near my office. The booking process was seamless and the instructors are amazing!",
    location: "Mumbai",
    service: "Yoga Studio"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    review: "Best platform to find quality gyms. Saved me hours of research and found a great gym with all amenities.",
    location: "Delhi",
    service: "Gym"
  },
  {
    id: 3,
    name: "Anita Desai",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    review: "The spa treatments I booked through this platform were incredible. Highly recommend for wellness seekers!",
    location: "Bangalore",
    service: "Spa"
  },
  {
    id: 4,
    name: "Vikram Singh",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    review: "Connected with an excellent personal trainer who helped me achieve my fitness goals. Great platform!",
    location: "Mumbai",
    service: "Personal Training"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-50" aria-labelledby="testimonials-heading">
      <div className="w-full px-4 md:px-8 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who found their perfect wellness destination
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <OptimizedImage
                    src={testimonial.image}
                    alt={`${testimonial.name} profile photo`}
                    className="w-12 h-12 rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 text-yellow-400 fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                  "{testimonial.review}"
                </p>

                <div className="text-xs text-emerald-600 font-medium">
                  {testimonial.service}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center mr-4">
              <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
              <span className="font-bold text-lg">4.8</span>
              <span className="text-gray-600 ml-1">/ 5</span>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <p className="text-sm font-medium text-gray-800">Over 10,000+ Happy Users</p>
              <p className="text-xs text-gray-600">Across India's top cities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
