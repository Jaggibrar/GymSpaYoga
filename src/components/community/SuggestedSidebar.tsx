import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSuggested } from '@/hooks/useCommunity';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';
import { Sparkles } from 'lucide-react';

export default function SuggestedSidebar() {
  const { data } = useSuggested();
  return (
    <div className="space-y-4 sticky top-24">
      <Card className="glass-card p-4 rounded-2xl">
        <h3 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" /> Suggested businesses
        </h3>
        <div className="space-y-3">
          {data?.businesses.map(b => (
            <div key={b.id} className="flex items-center gap-3">
              <Link to={`/community/business/${b.id}`}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={b.image_url || undefined} />
                  <AvatarFallback>{b.business_name.slice(0, 1)}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/community/business/${b.id}`} className="text-sm font-medium text-foreground hover:text-primary truncate block">
                  {b.business_name}
                </Link>
                <p className="text-xs text-muted-foreground capitalize truncate">{b.category}</p>
              </div>
              <FollowButton targetId={b.id} targetType="business" />
            </div>
          ))}
        </div>
      </Card>
      <Card className="glass-card p-4 rounded-2xl">
        <h3 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" /> Top trainers
        </h3>
        <div className="space-y-3">
          {data?.trainers.map(t => (
            <div key={t.id} className="flex items-center gap-3">
              <Link to={`/community/trainer/${t.id}`}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={t.profile_image_url || undefined} />
                  <AvatarFallback>{t.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/community/trainer/${t.id}`} className="text-sm font-medium text-foreground hover:text-primary truncate block">
                  {t.name}
                </Link>
                <p className="text-xs text-muted-foreground capitalize truncate">{t.category}</p>
              </div>
              <FollowButton targetId={t.id} targetType="trainer" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
