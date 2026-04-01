import { ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CommunityBanner = () => {
  const communityImages = [
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face',
  ];

  return (
    <section className="py-12 md:py-16 bg-accent border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="flex -space-x-3">
              {communityImages.map((img, index) => (
                <img key={index} src={img} alt={`Member ${index + 1}`}
                  className="w-11 h-11 md:w-12 md:h-12 rounded-full border-2 border-background object-cover shadow-sm" loading="lazy" />
              ))}
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-display font-bold text-foreground">10,000+</p>
              <p className="text-muted-foreground text-sm">Active Members</p>
            </div>
          </div>

          <div className="text-center md:text-left flex-1 max-w-md">
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-1">
              Join Our Wellness Community
            </h3>
            <p className="text-muted-foreground text-sm">
              Connect with fitness enthusiasts and transform your health journey.
            </p>
          </div>

          <Link to="/signup">
            <Button size="lg" className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90 px-6 rounded-xl shadow-sm">
              Join Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunityBanner;
