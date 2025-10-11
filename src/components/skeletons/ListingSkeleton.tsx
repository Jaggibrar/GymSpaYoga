import { Skeleton } from '@/components/ui/skeleton';

interface ListingSkeletonProps {
  count?: number;
}

const ListingSkeleton = ({ count = 6 }: ListingSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-3 animate-pulse">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20 w-full" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingSkeleton;
