import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagChipProps {
  tag: string;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Shared tag chip used on blog listing and blog detail pages.
 * Uses semantic theme tokens for consistent contrast in dark theme.
 */
const TagChip = ({ tag, size = 'sm', className }: TagChipProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium border-border bg-secondary/60 text-muted-foreground',
        'hover:border-primary/50 hover:text-primary hover:bg-primary/10',
        'transition-colors rounded-full',
        size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1',
        className,
      )}
    >
      #{tag}
    </Badge>
  );
};

export default TagChip;
