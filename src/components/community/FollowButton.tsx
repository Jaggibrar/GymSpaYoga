import { Button } from '@/components/ui/button';
import { useIsFollowing, useToggleFollow } from '@/hooks/useCommunity';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { UserPlus, UserCheck } from 'lucide-react';

export default function FollowButton({
  targetId,
  targetType,
  size = 'sm',
}: {
  targetId: string;
  targetType: 'user' | 'business' | 'trainer';
  size?: 'sm' | 'default';
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: following } = useIsFollowing(targetId, targetType);
  const toggle = useToggleFollow();

  const onClick = () => {
    if (!user) return navigate('/login');
    toggle.mutate({ targetId, targetType, following: !!following });
  };

  if (user && targetType === 'user' && user.id === targetId) return null;

  return (
    <Button
      onClick={onClick}
      size={size}
      variant={following ? 'outline' : 'default'}
      className="rounded-full"
      disabled={toggle.isPending}
    >
      {following ? <UserCheck className="h-4 w-4 mr-1.5" /> : <UserPlus className="h-4 w-4 mr-1.5" />}
      {following ? 'Following' : 'Follow'}
    </Button>
  );
}
