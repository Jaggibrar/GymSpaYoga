
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBlogs, Blog } from '@/hooks/useBlogs';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Clock, ArrowLeft, Share2, Heart, Eye } from 'lucide-react';
import { toast } from 'sonner';
import SEOHead from '@/components/SEOHead';
import BlogComments from '@/components/blog/BlogComments';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getBlogBySlug, likeBlog } = useBlogs();
  const { user } = useAuth();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleLike = async () => {
    if (!user || !blog) {
      toast.error('Please log in to like posts');
      return;
    }
    
    try {
      await likeBlog(blog.id);
      // Refresh blog to get updated like count
      fetchBlog();
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        <span className="ml-2 text-gray-600">Loading blog post...</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blogs">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const featuredImage = blog.image_url || blog.featured_image_url;

  return (
    <>
      <SEOHead
        title={`${blog.title} - GymSpaYoga Blog`}
        description={blog.meta_description || blog.excerpt || ''}
        keywords={blog.tags?.join(', ') || 'health, fitness, wellness'}
      />
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 py-8">
          <div className="container mx-auto px-4">
            <Link to="/blogs">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </div>
        </div>

        {/* Blog Content */}
        <article className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Featured Image */}
              {featuredImage && (
                <img
                  src={featuredImage}
                  alt={blog.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8 shadow-lg"
                />
              )}

              {/* Title and Meta */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {blog.tags?.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {blog.title}
                </h1>

                <div className="flex items-center justify-between text-gray-600 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(blog.published_at || blog.created_at)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {blog.read_time_minutes} min read
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      {blog.views_count || 0} views
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {user && (
                      <Button variant="outline" size="sm" onClick={handleLike}>
                        <Heart className="h-4 w-4 mr-2" />
                        {blog.likes_count || 0}
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {blog.excerpt && (
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
                    {blog.excerpt}
                  </p>
                )}
              </div>

              {/* Content */}
              <Card className="shadow-lg">
                <CardContent className="p-8 md:p-12">
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-emerald-600 prose-strong:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
                  />
                </CardContent>
              </Card>

              {/* Comments Section */}
              <BlogComments blogId={blog.id} />

              {/* Back to Blogs */}
              <div className="text-center mt-12">
                <Link to="/blogs">
                  <Button size="lg">
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
