import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useBlogs, Blog } from '@/hooks/useBlogs';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Clock, ArrowLeft, Heart, Eye } from 'lucide-react';
import { toast } from 'sonner';
import SEOHead from '@/components/SEOHead';
import BlogComments from '@/components/blog/BlogComments';
import TagChip from '@/components/blog/TagChip';
import ShareButtons from '@/components/blog/ShareButtons';
import AuthorProfile from '@/components/blog/AuthorProfile';
import DOMPurify from 'dompurify';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getBlogBySlug, likeBlog } = useBlogs();
  const { user } = useAuth();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    if (!slug) return;
    try {
      setLoading(true);
      const blogData = await getBlogBySlug(slug);
      setBlog(blogData);
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });


  const handleLike = async () => {
    if (!user || !blog) {
      toast.error('Please log in to like posts');
      return;
    }
    try {
      await likeBlog(blog.id);
      fetchBlog();
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        <span className="ml-3 text-muted-foreground">Loading article...</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blogs">
            <Button className="btn-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const featuredImage = blog.image_url || blog.featured_image_url;
  const rawContent = blog.content || blog.excerpt || '';
  const safeHtml = DOMPurify.sanitize(rawContent.replace(/\n/g, '<br />'));

  return (
    <>
      <SEOHead
        title={`${blog.title} - GymSpaYoga Blog`}
        description={blog.meta_description || blog.excerpt || ''}
        keywords={blog.tags?.join(', ') || 'health, fitness, wellness'}
      />

      <div className="min-h-screen bg-background">
        <div className="bg-secondary/40 border-b border-border py-6">
          <div className="container mx-auto px-4">
            <Link to="/blogs">
              <Button variant="outline" className="border-border">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </div>
        </div>

        <article className="py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {featuredImage && (
                <img
                  src={featuredImage}
                  alt={blog.title}
                  className="w-full h-64 md:h-96 object-cover rounded-3xl mb-8 shadow-medium border border-border"
                />
              )}

              <div className="mb-8">
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    {blog.tags.map((tag) => (
                      <TagChip key={tag} tag={tag} size="md" />
                    ))}
                  </div>
                )}

                <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  {blog.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      {formatDate(blog.published_at || blog.created_at)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-primary" />
                      {blog.read_time_minutes || 5} min read
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="h-4 w-4 text-primary" />
                      {(blog.views_count || 0).toLocaleString()} views
                    </div>
                  </div>

                  {user && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLike}
                      className="border-border"
                    >
                      <Heart
                        className={`h-4 w-4 mr-2 ${
                          blog.is_liked ? 'fill-destructive text-destructive' : ''
                        }`}
                      />
                      {blog.likes_count || 0}
                    </Button>
                  )}
                </div>

                {blog.excerpt && (
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 font-medium border-l-4 border-primary/60 pl-4">
                    {blog.excerpt}
                  </p>
                )}
              </div>

              <div className="rounded-3xl bg-card border border-border shadow-medium p-6 md:p-10">
                <div
                  className="prose prose-lg max-w-none dark:prose-invert
                    prose-headings:text-foreground prose-headings:font-bold
                    prose-p:text-foreground/85 prose-p:leading-relaxed
                    prose-a:text-primary hover:prose-a:text-primary/80
                    prose-strong:text-foreground
                    prose-li:text-foreground/85
                    prose-blockquote:text-muted-foreground prose-blockquote:border-primary
                    prose-code:text-primary prose-code:bg-secondary prose-code:px-1 prose-code:rounded
                    prose-img:rounded-2xl"
                  dangerouslySetInnerHTML={{ __html: safeHtml }}
                />
              </div>

              <BlogComments blogId={blog.id} />

              <div className="text-center mt-12">
                <Link to="/blogs">
                  <Button size="lg" className="btn-primary">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to All Blogs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogPost;
