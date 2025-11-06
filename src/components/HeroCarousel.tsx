import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import OptimizedImage from "@/components/OptimizedImage";

interface HeroCarouselProps {
  children: React.ReactNode;
}

const HeroCarousel = ({ children }: HeroCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();

  // Auto-play functionality
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  const images = [
    {
      src: "/lovable-uploads/108f077e-70d1-4f2b-a023-2d90eea38865.png",
      alt: "Wellness lifestyle - gym, spa and yoga"
    },
    {
      src: "/lovable-uploads/8fcd29bd-308b-4b88-879e-8b25e29eea84.png",
      alt: "Serene wellness and meditation space"
    },
    {
      src: "/lovable-uploads/997a0643-e3e2-4626-a26e-3cbc0eaba954.png",
      alt: "Spa wellness setup with dumbbells, yoga mat and towels"
    }
  ];

  return (
    <section className="relative h-[400px] md:h-[600px] lg:min-h-screen flex items-center overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full h-full absolute inset-0"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="h-[400px] md:h-[600px] lg:h-screen">
          {images.map((image, index) => (
            <CarouselItem key={index} className="relative h-full">
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'low'}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation arrows */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white backdrop-blur-sm" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white backdrop-blur-sm" />
        
        {/* Pagination dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className="min-w-[44px] min-h-[44px] p-2 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className="w-2 h-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"></span>
            </button>
          ))}
        </div>
      </Carousel>
      
      {/* Content overlay */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
};

export default HeroCarousel;