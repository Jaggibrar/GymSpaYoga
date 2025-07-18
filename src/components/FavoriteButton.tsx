import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/components/FavoritesProvider';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  businessId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  businessId,
  className,
  size = 'md',
  variant = 'ghost'
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(businessId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    e.preventDefault();
    toggleFavorite(businessId);
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={handleClick}
      className={cn(
        'transition-all duration-200 hover:scale-110 min-h-[44px] min-w-[44px]', // Improved touch targets
        sizeClasses[size],
        favorite && 'text-red-500 hover:text-red-600',
        !favorite && 'text-gray-400 hover:text-red-500',
        className
      )}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={cn(
          iconSizes[size],
          'transition-all duration-200',
          favorite && 'fill-current scale-110'
        )}
      />
    </Button>
  );
};

export default FavoriteButton;