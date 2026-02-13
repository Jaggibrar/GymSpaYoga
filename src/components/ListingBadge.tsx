import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Sparkles, Clock } from 'lucide-react';

interface ListingBadgeProps {
  createdAt?: string;
  verified?: boolean;
  reviewCount?: number;
}

const ListingBadge: React.FC<ListingBadgeProps> = ({ createdAt, verified = false, reviewCount = 0 }) => {
  const isNew = createdAt ? (Date.now() - new Date(createdAt).getTime()) < 30 * 24 * 60 * 60 * 1000 : false;

  if (verified && reviewCount > 0) {
    return (
      <Badge className="bg-emerald-600 text-white text-xs font-semibold gap-1">
        <ShieldCheck className="h-3 w-3" />
        Verified
      </Badge>
    );
  }

  if (isNew) {
    return (
      <Badge className="bg-amber-500 text-white text-xs font-semibold gap-1">
        <Sparkles className="h-3 w-3" />
        New Listing
      </Badge>
    );
  }

  return (
    <Badge className="bg-sky-500 text-white text-xs font-semibold gap-1">
      <Clock className="h-3 w-3" />
      Recently Updated
    </Badge>
  );
};

export default ListingBadge;
