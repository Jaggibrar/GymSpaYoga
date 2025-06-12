
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Eye, Heart, ArrowLeft, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import SEOHead from '@/components/SEOHead';
import { Blog } from '@/hooks/useBlogs';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;

      try {
        // Fetch blog with author info
        const { data, error } = await supabase
          .from('blogs')
          .select(`
            *,
            user_profiles!inner(full_name, avatar_url)
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (error) throw error;

        const blogWithAuthor = {
          ...data,
          author: data.user_profiles
        };

        setBlog(blogWithAuthor);

        // Check if user has liked this blog
        if (user) {
          const { data: likeData } = await supabase
            .from('blog_likes')
            .select('id')
            .eq('blog_id', data.id)
            .eq('user_id', user.id)
            .single();

          setIsLiked(!!likeData);
        }

        // Increment view count
        await supabase
          .from('blogs')
          .update({ views_count: data.views_count + 1 })
          .eq('id', data.id);

      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Blog not found');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, user]);

  const handleLike = async () => {
    if (!user || !blog) {
      toast.error('Please log in to like this post');
      return;
    }

    try {
      if (isLiked) {
        // Unlike
        await supabase
          .from('blog_likes')
          .delete()
          .eq('blog_id', blog.id)
          .eq('user_id', user.id);

        await supabase
          .from('blogs')
          .update({ likes_count: blog.likes_count - 1 })
          .eq('id', blog.id);

        setBlog(prev => prev ? { ...prev, likes_count: prev.likes_count - 1 } : null);
        setIsLiked(false);
      } else {
        // Like
        await supabase
          .from('blog_likes')
          .insert([{ blog_id: blog.id, user_id: user.id }]);

        await supabase
          .from('blogs')
          .update({ likes_count: blog.likes_count + 1 })
          .eq('id', blog.id);

        setBlog(prev => prev ? { ...prev, likes_count: prev.likes_count + 1 } : null);
        setIsLiked(true);
      }

      toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    }
  };

  const handleShare = () => {
    if (navigator.share && blog) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt || blog.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-8 w-1/3 mb-4"></div>
            <div className="bg-gray-200 h-64 mb-6"></div>
            <div className="bg-gray-200 h-4 mb-2"></div>
            <div className="bg-gray-200 h-4 w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <Link to="/blogs">
            <Button>← Back to Blogs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <SEOHead 
        title={`${blog.title} | GymSpaYoga Blog`}
        description={blog.excerpt || `Read ${blog.title} on GymSpaYoga wellness blog`}
        keywords={`${blog.category}, ${blog.tags.join(', ')}, wellness, fitness`}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-6">
            <Link to="/blogs">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blogs
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-emerald-500">
                {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(blog.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{blog.views_count} views</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {blog.title}
            </h1>

            {blog.author && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span>By {blog.author.full_name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLike}
                    className={`flex items-center gap-2 ${isLiked ? 'text-red-500 border-red-200' : ''}`}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{blog.likes_count}</span>
                  </Button>

                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {blog.image_url && (
            <div className="mb-8">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {blog.content}
            </div>
          </div>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="border-t pt-6 flex items-center justify-between">
            <Link to="/blogs">
              <Button variant="outline">← More Blogs</Button>
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant={isLiked ? "default" : "outline"}
                onClick={handleLike}
                className="flex items-center gap-2"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Liked' : 'Like'}
              </Button>

              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
