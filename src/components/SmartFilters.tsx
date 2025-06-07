
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Crown, Diamond, IndianRupee, TrendingUp, Star, Flame } from "lucide-react";

interface SmartFiltersProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
  activeFilter: string;
  activeSort: string;
}

const SmartFilters = ({ onFilterChange, onSortChange, activeFilter, activeSort }: SmartFiltersProps) => {
  const filters = [
    {
      id: 'all',
      label: 'All',
      icon: null,
      color: 'bg-gray-500 hover:bg-gray-600'
    },
    {
      id: 'luxury',
      label: 'Luxury',
      icon: <Crown className="h-4 w-4" />,
      color: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
    },
    {
      id: 'premium',
      label: 'Premium',
      icon: <Diamond className="h-4 w-4" />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
    },
    {
      id: 'budget',
      label: 'Budget',
      icon: <IndianRupee className="h-4 w-4" />,
      color: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
    }
  ];

  const sortOptions = [
    {
      id: 'popular',
      label: 'Most Popular',
      icon: <Flame className="h-4 w-4 text-orange-500" />
    },
    {
      id: 'price-low',
      label: 'Price: Low → High',
      icon: <TrendingUp className="h-4 w-4 text-green-500" />
    },
    {
      id: 'price-high',
      label: 'Price: High → Low',
      icon: <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
    },
    {
      id: 'rating',
      label: 'Highest Rated',
      icon: <Star className="h-4 w-4 text-yellow-500" />
    }
  ];

  return (
    <Card className="p-6 mb-8 bg-white/90 backdrop-blur-sm shadow-xl">
      <div className="space-y-6">
        {/* Filter Pills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`
                  group relative overflow-hidden transition-all duration-300 transform hover:scale-105
                  ${activeFilter === filter.id 
                    ? filter.color + ' text-white shadow-lg' 
                    : 'hover:shadow-md border-gray-200 hover:border-gray-300'
                  }
                  ${filter.id !== 'all' ? 'animate-pulse hover:animate-none' : ''}
                `}
              >
                <div className="flex items-center space-x-2">
                  {filter.icon}
                  <span className="font-medium">{filter.label}</span>
                </div>
                {activeFilter === filter.id && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Sort Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sortOptions.map((sort) => (
              <Button
                key={sort.id}
                onClick={() => onSortChange(sort.id)}
                variant={activeSort === sort.id ? "default" : "outline"}
                className={`
                  group transition-all duration-300 transform hover:scale-105
                  ${activeSort === sort.id 
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg' 
                    : 'hover:shadow-md'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  {sort.icon}
                  <span className="text-sm font-medium">{sort.label}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SmartFilters;
