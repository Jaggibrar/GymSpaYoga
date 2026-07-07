import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useHashtagFeed } from '@/hooks/useCommunity';
import PostCard from '@/components/community/PostCard';
import SuggestedSidebar from '@/components/community/SuggestedSidebar';
import { Hash, Loader2, ArrowLeft } from 'lucide-react';

export default function CommunityTag() {
  const { tag = '' } = useParams();
  const feed = useHashtagFeed(tag);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 800) {
        if (feed.hasNextPage && !feed.isFetchingNextPage) feed.fetchNextPage();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [feed]);

  const posts = feed.data?.pages.flatMap(p => p.posts) || [];

  return (
    <>
      <Helmet>
        <title>#{tag} — Community · GymSpaYoga</title>
        <meta name="description" content={`Posts tagged with #${tag} in the GymSpaYoga wellness community.`} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
          <Link to="/community" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to community
          </Link>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-primary/15 flex items-center justify-center">
              <Hash className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">#{tag}</h1>
              <p className="text-sm text-muted-foreground">All posts tagged with #{tag}.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6">
            <div className="space-y-5 min-w-0">
              {feed.isLoading ? (
                <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
              ) : posts.length === 0 ? (
                <div className="glass-card rounded-2xl p-10 text-center">
                  <p className="text-foreground font-medium">Nothing here yet.</p>
                  <p className="text-sm text-muted-foreground mt-1">Be the first to post with #{tag}.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {posts.map(p => <PostCard key={p.id} post={p} />)}
                  {feed.isFetchingNextPage && (
                    <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
                  )}
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
