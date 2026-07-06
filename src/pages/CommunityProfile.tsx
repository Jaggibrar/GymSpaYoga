import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useProfileHeader, useProfilePosts } from '@/hooks/useCommunity';
import PostCard from '@/components/community/PostCard';
import FollowButton from '@/components/community/FollowButton';
import { Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function CommunityProfile({ kind }: { kind: 'user' | 'business' | 'trainer' }) {
  const { id = '' } = useParams();
  const { data: header, isLoading } = useProfileHeader(kind, id);
  const { data: posts } = useProfilePosts(kind, id);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }
  if (!header?.profile) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Profile not found.</div>;
  }

  const p = header.profile;

  return (
    <>
      <Helmet>
        <title>{p.name} — Community · GymSpaYoga</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 lg:py-10 space-y-6">
          <Card className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                <AvatarImage src={p.avatar || undefined} />
                <AvatarFallback className="text-2xl">{(p.name || 'U').slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">{p.name}</h1>
                {p.meta && <p className="text-sm text-muted-foreground mt-0.5 capitalize">{p.meta}</p>}
                {p.bio && <p className="text-foreground/85 mt-3">{p.bio}</p>}
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{header.followerCount}</span> followers
                  </span>
                  <FollowButton targetId={id} targetType={kind} size="default" />
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-5">
            {posts && posts.length > 0 ? (
              posts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
              <Card className="glass-card rounded-2xl p-10 text-center">
                <p className="text-muted-foreground">No posts yet.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
