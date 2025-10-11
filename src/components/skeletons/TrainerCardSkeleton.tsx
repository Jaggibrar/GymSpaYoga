import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const TrainerCardSkeleton = () => {
  return (
    <Card shadow="interactive" className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="space-y-3 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 flex-1 rounded-full" />
          <Skeleton className="h-10 flex-1 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainerCardSkeleton;
