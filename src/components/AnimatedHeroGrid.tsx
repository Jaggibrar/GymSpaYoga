
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

const AnimatedHeroGrid = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'gym',
      title: "Premium Gyms",
      description: "State-of-the-art fitness centers with modern equipment and expert trainers",
      image: "/lovable-uploads/8a6d01a4-4710-4631-98d6-3ef7c16000c2.png",
      gradient: "from-red-500/80 to-orange-500/80",
      route: "/gyms",
      subtitle: "Transform Your Body"
    },
    {
      id: 'spa',
      title: "Luxury Spas", 
      description: "Premium wellness centers offering rejuvenating treatments and relaxation",
      image: "/lovable-uploads/f6b8bda4-a19a-4114-b2d6-550e44d1a2ce.png",
      gradient: "from-blue-500/80 to-purple-500/80",
      route: "/spas",
      subtitle: "Rejuvenate Your Soul"
    },
    {
      id: 'yoga',
      title: "Yoga Studios",
      description: "Peaceful studios with experienced instructors for your mindfulness journey",
      image: "/lovable-uploads/1b4c27c8-74f8-4552-9ef9-658431a0e65b.png",
      gradient: "from-green-500/80 to-emerald-500/80",
      route: "/yoga",
      subtitle: "Find Inner Peace"
    },
    {
      id: 'trainers',
      title: "Personal Trainers",
      description: "Certified fitness professionals to guide your personalized workout journey",
      image: "/lovable-uploads/36471bfc-00c7-47b8-a7c2-a9488b24803a.png",
      gradient: "from-yellow-500/80 to-amber-500/80",
      route: "/trainers",
      subtitle: "Expert Guidance"
    }
  ];

  const handleCategoryClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
        {categories.map((category, index) => (
          <Card 
            key={category.id}
            className="group relative overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
            onClick={() => handleCategoryClick(category.route)}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-lg">
              <img 
                src={category.image}
                alt={category.title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-4 sm:p-6 text-center">
              <div className="text-sm sm:text-base lg:text-lg font-medium mb-2 text-muted-foreground">
                {category.subtitle}
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-foreground transform group-hover:scale-105 transition-transform duration-300">
                {category.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 max-w-md mx-auto">
                {category.description}
              </p>
              <Badge className="bg-primary text-primary-foreground group-hover:bg-primary/90 transition-all duration-300 px-3 sm:px-4 py-1 sm:py-2 text-sm">
                Explore Now
              </Badge>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default AnimatedHeroGrid;
