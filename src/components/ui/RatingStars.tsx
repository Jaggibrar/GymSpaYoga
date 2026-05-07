import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Color of unfilled stars; defaults to muted */
  emptyClassName?: string;
  filledClassName?: string;
}

/**
 * Visual-only star rating. Never shows numeric values.
 */
const RatingStars: React.FC<RatingStarsProps> = ({
  rating = 4.8,
  size = 'sm',
  className,
  emptyClassName = 'text-muted-foreground/30',
  filledClassName = 'fill-yellow-400 text-yellow-400',
}) => {
  const sizeMap = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-5 w-5' } as const;
  const dim = sizeMap[size];
  const rounded = Math.round(rating);
  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role="img"
      aria-label={`Rated ${rounded} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(dim, i <= rounded ? filledClassName : emptyClassName)}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

export default RatingStars;
