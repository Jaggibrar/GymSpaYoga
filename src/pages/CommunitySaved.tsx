import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSavedPosts } from '@/hooks/useCommunity';
import { useAuth } from '@/hooks/useAuth';
import PostCard from '@/components/community/PostCard';
import SuggestedSidebar from '@/components/community/SuggestedSidebar';
import { Bookmark, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CommunitySaved() {
  const { user } = useAuth();
  const { data: posts, isLoading } = useSavedPosts();

  return (
    <>
      <Helmet>
        <title>Saved posts — Community · GymSpaYoga</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
          <Link to="/community" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to community
          </Link>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-primary/15 flex items-center justify-center">
              <Bookmark className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">Saved posts</h1>
              <p className="text-sm text-muted-foreground">Posts you've bookmarked from the community.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6">
            <div className="space-y-5 min-w-0">
              {!user ? (
                <div className="glass-card rounded-2xl p-10 text-center">
                  <p className="text-foreground font-medium mb-3">Sign in to see your saved posts.</p>
                  <Button asChild><Link to="/login">Sign in</Link></Button>
                </div>
              ) : isLoading ? (
                <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
              ) : !posts || posts.length === 0 ? (
                <div className="glass-card rounded-2xl p-10 text-center">
                  <p className="text-foreground font-medium">You haven't saved any posts yet.</p>
                  <p className="text-sm text-muted-foreground mt-1">Tap the bookmark icon on any post to save it here.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {posts.map(p => <PostCard key={p.id} post={p} />)}
                </div>
              )}
            </div>
            <aside className="hidden lg:block"><SuggestedSidebar /></aside>
          </div>
        </div>
      </div>
    </>
  );
}
