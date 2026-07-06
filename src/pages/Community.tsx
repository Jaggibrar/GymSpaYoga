import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useCommunityFeed, FeedTab } from '@/hooks/useCommunity';
import PostComposer from '@/components/community/PostComposer';
import PostCard from '@/components/community/PostCard';
import SuggestedSidebar from '@/components/community/SuggestedSidebar';
import { Loader2, Users2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Community() {
  const [tab, setTab] = useState<FeedTab>('for-you');
  const feed = useCommunityFeed(tab);

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
        <title>Community — GymSpaYoga</title>
        <meta name="description" content="Join the GymSpaYoga wellness community. Share your fitness journey, follow gyms, yoga studios, spas and trainers." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-primary/15 flex items-center justify-center">
              <Users2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">Community</h1>
              <p className="text-sm text-muted-foreground">Share, follow, and connect with the wellness world.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6">
            <div className="space-y-5 min-w-0">
              <PostComposer />

              <Tabs value={tab} onValueChange={v => setTab(v as FeedTab)}>
                <TabsList className="w-full overflow-x-auto flex justify-start bg-secondary/50 rounded-full p-1">
                  <TabsTrigger value="for-you" className="rounded-full">For You</TabsTrigger>
                  <TabsTrigger value="following" className="rounded-full">Following</TabsTrigger>
                  <TabsTrigger value="trending" className="rounded-full">Trending</TabsTrigger>
                  <TabsTrigger value="businesses" className="rounded-full">Businesses</TabsTrigger>
                  <TabsTrigger value="transformations" className="rounded-full">Transformations</TabsTrigger>
                </TabsList>
              </Tabs>

              {feed.isLoading ? (
                <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
              ) : posts.length === 0 ? (
                <div className="glass-card rounded-2xl p-10 text-center">
                  <p className="text-foreground font-medium">No posts yet.</p>
                  <p className="text-sm text-muted-foreground mt-1">Be the first to share something with the community.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {posts.map(p => <PostCard key={p.id} post={p} />)}
                  {feed.isFetchingNextPage && (
                    <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
                  )}
                  {!feed.hasNextPage && posts.length >= 10 && (
                    <p className="text-center text-xs text-muted-foreground py-4">You're all caught up ✨</p>
                  )}
                </div>
              )}
            </div>

            <aside className="hidden lg:block">
              <SuggestedSidebar />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
