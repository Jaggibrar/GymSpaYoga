import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, MapPin, Trash2, Building2, Dumbbell, User as UserIcon,
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { CommunityPost, useDeletePost, useToggleLike, useToggleSave } from '@/hooks/useCommunity';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import CommentThread from './CommentThread';
import FollowButton from './FollowButton';
import { cn } from '@/lib/utils';

export default function PostCard({ post }: { post: CommunityPost }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const like = useToggleLike();
  const save = useToggleSave();
  const del = useDeletePost();
  const [showComments, setShowComments] = useState(false);

  const authorName =
    post.author_type === 'business'
      ? post.business?.business_name
      : post.author_type === 'trainer'
      ? post.trainer?.name
      : post.author?.full_name || 'Community member';

  const authorAvatar =
    post.author_type === 'business'
      ? post.business?.image_url
      : post.author_type === 'trainer'
      ? post.trainer?.profile_image_url
      : (post.author as any)?.avatar_url;

  const profileLink =
    post.author_type === 'business' && post.business
      ? `/community/business/${post.business.id}`
      : post.author_type === 'trainer' && post.trainer
      ? `/community/trainer/${post.trainer.id}`
      : `/community/user/${post.author_id}`;

  const followTarget =
    post.author_type === 'business' && post.business
      ? { id: post.business.id, type: 'business' as const }
      : post.author_type === 'trainer' && post.trainer
      ? { id: post.trainer.id, type: 'trainer' as const }
      : { id: post.author_id, type: 'user' as const };

  const onLike = () => {
    if (!user) return navigate('/login');
    like.mutate({ postId: post.id, liked: !!post.liked_by_me });
  };
  const onSave = () => {
    if (!user) return navigate('/login');
    save.mutate({ postId: post.id, saved: !!post.saved_by_me });
  };
  const onShare = async () => {
    const url = `${window.location.origin}/community?post=${post.id}`;
    try {
      if (navigator.share) await navigator.share({ url, text: post.content.slice(0, 100) });
      else {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied');
      }
    } catch {}
  };

  const badge =
    post.author_type === 'business' ? { icon: Building2, label: 'Business' }
    : post.author_type === 'trainer' ? { icon: Dumbbell, label: 'Trainer' }
    : { icon: UserIcon, label: 'Member' };
  const BadgeIcon = badge.icon;

  return (
    <Card className="glass-card rounded-2xl overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Link to={profileLink}>
            <Avatar className="h-11 w-11">
              <AvatarImage src={authorAvatar || undefined} />
              <AvatarFallback>{(authorName || 'U').slice(0, 1)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Link to={profileLink} className="font-semibold text-foreground hover:text-primary truncate">
                {authorName}
              </Link>
              <Badge variant="secondary" className="text-[10px] gap-1 px-2 py-0 h-5">
                <BadgeIcon className="h-3 w-3" /> {badge.label}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
              <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
              {post.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {post.location}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FollowButton targetId={followTarget.id} targetType={followTarget.type} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onShare}>Copy link</DropdownMenuItem>
                {user?.id === post.author_id && (
                  <DropdownMenuItem className="text-destructive" onClick={() => del.mutate(post.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {post.content && (
          <p className="mt-3 text-foreground/90 whitespace-pre-wrap break-words">
            {post.content.split(/(\s+)/).map((tok, i) =>
              tok.startsWith('#') ? (
                <span key={i} className="text-primary">{tok}</span>
              ) : (
                <span key={i}>{tok}</span>
              )
            )}
          </p>
        )}
      </div>

      {post.media && post.media.length > 0 && (
        <div
          className={cn(
            'grid gap-1 bg-background',
            post.media.length === 1 && 'grid-cols-1',
            post.media.length === 2 && 'grid-cols-2',
            post.media.length >= 3 && 'grid-cols-2'
          )}
        >
          {post.media.map(m => (
            <div key={m.id} className="relative aspect-video bg-secondary/40 overflow-hidden">
              {m.media_type === 'image' ? (
                <img src={m.url} alt="" className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <video src={m.url} controls className="w-full h-full object-cover" />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="px-4 sm:px-5 py-3 border-t border-border flex items-center gap-1 text-sm">
        <Button variant="ghost" size="sm" onClick={onLike} className={cn('gap-1.5', post.liked_by_me && 'text-primary')}>
          <Heart className={cn('h-4 w-4', post.liked_by_me && 'fill-current')} /> {post.like_count}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setShowComments(s => !s)} className="gap-1.5">
          <MessageCircle className="h-4 w-4" /> {post.comment_count}
        </Button>
        <Button variant="ghost" size="sm" onClick={onShare} className="gap-1.5">
          <Share2 className="h-4 w-4" /> Share
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="sm" onClick={onSave} className={cn(post.saved_by_me && 'text-primary')}>
          <Bookmark className={cn('h-4 w-4', post.saved_by_me && 'fill-current')} />
        </Button>
      </div>

      {showComments && (
        <div className="px-4 sm:px-5 pb-5">
          <CommentThread postId={post.id} />
        </div>
      )}
    </Card>
  );
}
