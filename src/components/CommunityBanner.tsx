import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CommunityBanner = () => {
  const communityImages = [
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=face',
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Community Images */}
          <div className="flex items-center">
            <div className="flex -space-x-4">
              {communityImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Community member ${index + 1}`}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full border-3 border-white object-cover shadow-md"
                  loading="lazy"
                />
              ))}
            </div>
            <div className="ml-4 md:ml-6">
              <p className="text-2xl md:text-3xl font-bold text-black">10,000+</p>
              <p className="text-gray-600 text-sm md:text-base">Active Members</p>
            </div>
          </div>

          {/* Center: Message */}
          <div className="text-center md:text-left flex-1 max-w-md">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-2">
              Join Our Wellness Community
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Connect with fitness enthusiasts, discover new experiences, and transform your health journey.
            </p>
          </div>

          {/* Right: CTA */}
          <Link to="/signup">
            <Button size="lg" className="bg-[#005EB8] hover:bg-[#004d96] text-white px-6">
              Join Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunityBanner;
