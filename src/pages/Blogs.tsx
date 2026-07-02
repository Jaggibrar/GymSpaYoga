import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBlogs } from '@/hooks/useBlogs';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, BookOpen, TrendingUp, Edit3, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogRichEditor from '@/components/blog/BlogRichEditor';
import SEOHead from '@/components/SEOHead';

const Blogs = () => {
  const { blogs, loading, createBlog, likeBlog } = useBlogs();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateBlog = async (blogData: any) => {
    setIsSubmitting(true);
    try {
      const slug = await createBlog(blogData);
      if (slug) {
        setIsCreateModalOpen(false);
        navigate(`/blog/${slug}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const featuredBlogs = blogs.filter(blog => blog.featured).slice(0, 3);
  const totalViews = blogs.reduce((sum, blog) => sum + (blog.views_count || 0), 0);

  return (
    <>
      <SEOHead
        title="Health & Wellness Blog - GymSpaYoga | Expert Tips & Guides"
        description="Discover expert tips, guides, and insights on fitness, wellness, yoga, and spa treatments. Stay updated with the latest health trends and advice."
        keywords="health blog, fitness tips, wellness guide, yoga advice, spa treatments, exercise tips"
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
          <div className="container-modern relative py-20 lg:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Wellness Journal</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
                Wellness{' '}
                <span className="text-gradient-emerald">Insights</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
                Expert insights, actionable tips, and comprehensive guides for your holistic wellness journey.
              </p>

              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search articles, topics, tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-6 h-14 bg-card border-border rounded-2xl text-base"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="container-modern py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Latest Articles <span className="text-muted-foreground font-normal">({filteredBlogs.length})</span>
              </h2>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>{blogs.length} Total Articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>{totalViews.toLocaleString()} Total Views</span>
                </div>
              </div>
            </div>

            {user && (
              <div className="flex gap-3">
                <Button
                  onClick={() => navigate('/my-blogs')}
                  variant="outline"
                  className="border-border bg-secondary hover:bg-accent"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  My Blogs
                </Button>
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="btn-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Write Article
                </Button>
              </div>
            )}
          </div>

          {featuredBlogs.length > 0 && !searchTerm && (
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-xl md:text-2xl font-bold">Featured Articles</h2>
              </div>
              <BlogGrid blogs={featuredBlogs} onLike={user ? likeBlog : undefined} />
            </div>
          )}

          <div>
            {!searchTerm && featuredBlogs.length > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-xl md:text-2xl font-bold">All Articles</h2>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="rounded-3xl border border-border bg-card overflow-hidden">
                    <div className="bg-secondary h-52 animate-pulse" />
                    <div className="p-6 space-y-3">
                      <div className="bg-secondary h-4 rounded w-3/4 animate-pulse" />
                      <div className="bg-secondary h-4 rounded w-1/2 animate-pulse" />
                      <div className="bg-secondary h-3 rounded w-full animate-pulse" />
                      <div className="bg-secondary h-3 rounded w-2/3 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <BlogGrid blogs={filteredBlogs} onLike={user ? likeBlog : undefined} />
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="border-t border-border bg-card/50">
          <div className="container-modern py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay <span className="text-gradient-emerald">Updated</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest health and wellness tips, delivered straight to your inbox.
            </p>

            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Enter your email"
                type="email"
                className="flex-1 h-12 bg-background border-border rounded-xl"
              />
              <Button className="btn-primary h-12">Subscribe</Button>
            </div>
          </div>
        </section>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gradient-emerald">
                Create New Blog Post
              </DialogTitle>
            </DialogHeader>
            <BlogRichEditor
              onSubmit={handleCreateBlog}
              isSubmitting={isSubmitting}
              onCancel={() => setIsCreateModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Blogs;
