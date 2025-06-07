
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Diamond, IndianRupee } from "lucide-react";
import LoadingScreen from './LoadingScreen';
import { useNavigate } from 'react-router-dom';

const AnimatedHeroGrid = () => {
  const [loadingCategory, setLoadingCategory] = useState<'gym' | 'spa' | 'yoga' | null>(null);
  const navigate = useNavigate();

  const categories = [
    {
      id: 'gym',
      title: "Premium Gyms",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      gradient: "from-red-500/80 to-orange-500/80",
      route: "/gyms"
    },
    {
      id: 'spa',
      title: "Luxury Spas",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      gradient: "from-blue-500/80 to-purple-500/80",
      route: "/spas"
    },
    {
      id: 'yoga',
      title: "Yoga Centers",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      gradient: "from-green-500/80 to-emerald-500/80",
      route: "/yoga"
    }
  ];

  const handleCategoryClick = (category: 'gym' | 'spa' | 'yoga', route: string) => {
    setLoadingCategory(category);
  };

  const handleLoadingComplete = () => {
    if (loadingCategory) {
      const category = categories.find(c => c.id === loadingCategory);
      if (category) {
        navigate(category.route);
      }
    }
    setLoadingCategory(null);
  };

  return (
    <>
      {loadingCategory && (
        <LoadingScreen 
          category={loadingCategory} 
          onComplete={handleLoadingComplete}
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        {categories.map((category, index) => (
          <Card 
            key={category.id}
            className="group relative overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
            onClick={() => handleCategoryClick(category.id as 'gym' | 'spa' | 'yoga', category.route)}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="relative h-64 overflow-hidden rounded-lg">
              <img 
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} group-hover:opacity-90 transition-opacity duration-300`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {category.title}
                  </h3>
                  <Badge className="bg-white/20 text-white border-white/30 group-hover:bg-white/30 transition-all duration-300">
                    Explore Now
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AnimatedHeroGrid;
