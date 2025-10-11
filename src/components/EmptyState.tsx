import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  className = '' 
}: EmptyStateProps) => {
  return (
    <Card shadow="flat" className={`p-12 text-center ${className}`}>
      <div className="flex flex-col items-center space-y-4 max-w-md mx-auto">
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Icon className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">{title}</h3>
          <p className="text-muted-foreground text-base">{description}</p>
        </div>
        {actionLabel && onAction && (
          <Button onClick={onAction} size="lg" className="mt-4">
            {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default EmptyState;
