import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

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
      src: "/lovable-uploads/f0f905ef-8ae5-4c34-8db3-7a23bedbc1b5.png",
      alt: "Wellness lifestyle"
    },
    {
      src: "/lovable-uploads/dff015a7-a5ee-4388-a12c-c0256e98eac2.png", 
      alt: "Fitness and wellness services"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full h-full absolute inset-0"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="h-screen">
          {images.map((image, index) => (
            <CarouselItem key={index} className="relative h-full">
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="hero-overlay"></div>
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
              className="w-2 h-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
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