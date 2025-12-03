
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import OptimizedImage from "@/components/OptimizedImage";
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
      id: 'therapists',
      title: "Wellness Therapists",
      description: "Certified therapists providing personalized healing and therapy sessions",
      image: "/lovable-uploads/f0f905ef-8ae5-4c34-8db3-7a23bedbc1b5.png",
      gradient: "from-pink-500/80 to-rose-500/80",
      route: "/therapists",
      subtitle: "Heal & Restore"
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
    <>
      {/* Mobile: Horizontal Scroll */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-4 pb-4">
          {categories.map((category, index) => (
            <Card 
              key={category.id}
              shadow="interactive"
              className="group relative overflow-hidden cursor-pointer flex-shrink-0 w-[250px] h-[420px] flex flex-col transition-all duration-300 hover:shadow-[var(--shadow-soft)] hover:-translate-y-1"
              onClick={() => handleCategoryClick(category.route)}
            >
              <div className="relative h-44 overflow-hidden rounded-t-lg flex-shrink-0">
                <OptimizedImage 
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  sizes="250px"
                  width={250}
                  height={176}
                />
              </div>
            <div className="p-4 text-center flex flex-col flex-grow">
              <div className="h-4 text-xs font-medium mb-1 text-muted-foreground overflow-hidden">
                {category.subtitle}
              </div>
              <h3 className="h-6 text-base font-bold mb-2 text-foreground overflow-hidden">
                {category.title}
              </h3>
              <p className="h-[54px] text-xs text-muted-foreground mb-4 line-clamp-3 overflow-hidden">
                {category.description}
              </p>
              <div className="mt-auto">
                <Badge className="bg-primary text-primary-foreground hover:shadow-[var(--shadow-glow)] transition-all duration-300 px-4 py-1.5 text-xs font-semibold rounded-full">
                  Explore Now
                </Badge>
              </div>
            </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Desktop: 5 Column Grid */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <Card 
            key={category.id}
            shadow="interactive"
            className="group relative overflow-hidden cursor-pointer flex flex-col h-[420px] transition-all duration-300 hover:shadow-[var(--shadow-soft)] hover:-translate-y-2"
            onClick={() => handleCategoryClick(category.route)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-44 overflow-hidden rounded-t-lg flex-shrink-0">
              <OptimizedImage 
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
                sizes="260px"
                width={260}
                height={176}
              />
            </div>
            <div className="p-4 text-center flex flex-col flex-grow">
              <div className="h-4 text-xs font-medium mb-1 text-muted-foreground overflow-hidden">
                {category.subtitle}
              </div>
              <h3 className="h-6 text-base font-bold mb-2 text-foreground overflow-hidden">
                {category.title}
              </h3>
              <p className="h-[63px] text-sm text-muted-foreground mb-4 line-clamp-3 overflow-hidden">
                {category.description}
              </p>
              <div className="mt-auto">
                <Badge className="bg-primary text-primary-foreground hover:shadow-[var(--shadow-glow)] transition-all duration-300 px-5 py-1.5 text-sm font-semibold rounded-full">
                  Explore Now
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AnimatedHeroGrid;
