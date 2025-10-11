import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const BusinessCardSkeleton = () => {
  return (
    <Card shadow="interactive" className="overflow-hidden">
      <div className="relative">
        <Skeleton className="h-48 w-full" />
        <div className="absolute top-4 right-4">
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
      <CardContent className="p-6">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-16 w-full mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </CardFooter>
    </Card>
  );
};

export default BusinessCardSkeleton;
