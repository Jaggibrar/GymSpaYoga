
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Eye, Heart, ArrowLeft, Share2, Clock, Bookmark } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import SEOHead from '@/components/SEOHead';
import { useBlogs, Blog } from '@/hooks/useBlogs';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { blogs, likeBlog } = useBlogs();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const foundBlog = blogs.find(b => b.slug === slug);
    if (foundBlog) {
      setBlog(foundBlog);
      console.log(`Incremented view count for blog: ${foundBlog.title}`);
    }
    setLoading(false);
  }, [slug, blogs]);

  const handleLike = async () => {
    if (!user || !blog) {
      toast.error('Please log in to like this post');
      return;
    }

    try {
      await likeBlog(blog.id);
      const updatedBlogs = blogs.find(b => b.id === blog.id);
      if (updatedBlogs) {
        setBlog(updatedBlogs);
      }
      toast.success(blog.is_liked ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
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

  const getCategoryColor = (category: string) => {
    const colors = {
      yoga: 'bg-purple-100 text-purple-700 border-purple-200',
      fitness: 'bg-orange-100 text-orange-700 border-orange-200',
      spa: 'bg-pink-100 text-pink-700 border-pink-200',
      nutrition: 'bg-green-100 text-green-700 border-green-200',
      wellness: 'bg-blue-100 text-blue-700 border-blue-200',
      mindfulness: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      lifestyle: 'bg-teal-100 text-teal-700 border-teal-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/80 via-blue-50/60 to-teal-50/80">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="bg-gray-200 h-8 w-1/3 mb-6 rounded"></div>
            <div className="bg-gray-200 h-64 mb-8 rounded-lg"></div>
            <div className="space-y-4">
              <div className="bg-gray-200 h-4 rounded"></div>
              <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
              <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/80 via-blue-50/60 to-teal-50/80">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ArrowLeft className="h-12 w-12 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been moved.</p>
            <Link to="/blogs">
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
                ← Back to Blogs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/80 via-blue-50/60 to-teal-50/80">
      <SEOHead 
        title={`${blog.title} | GymSpaYoga Blog`}
        description={blog.excerpt || `Read ${blog.title} on GymSpaYoga wellness blog`}
        keywords={`${blog.category}, ${blog.tags.join(', ')}, wellness, fitness`}
      />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-6">
            <Link to="/blogs">
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-white/50 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Blogs
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            {/* Featured Image */}
            {blog.image_url && (
              <div className="relative h-64 sm:h-80 lg:h-96">
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className={`border ${getCategoryColor(blog.category)} font-semibold mb-4`}>
                    {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
                  </Badge>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                    {blog.title}
                  </h1>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-8">
              {/* Article without featured image */}
              {!blog.image_url && (
                <div className="mb-8">
                  <Badge className={`border ${getCategoryColor(blog.category)} font-semibold mb-4`}>
                    {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
                  </Badge>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-4 leading-tight">
                    {blog.title}
                  </h1>
                </div>
              )}

              {/* Article Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  {blog.author && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                        {blog.author.full_name.charAt(0)}
                      </div>
                      <span className="font-medium">By {blog.author.full_name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(blog.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>5 min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{blog.views_count.toLocaleString()} views</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLike}
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      blog.is_liked 
                        ? 'text-red-500 border-red-200 hover:bg-red-50' 
                        : 'hover:text-red-500 hover:border-red-200'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${blog.is_liked ? 'fill-current' : ''}`} />
                    <span>{blog.likes_count}</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBookmark}
                    className={`transition-all duration-200 ${
                      isBookmarked 
                        ? 'text-blue-500 border-blue-200 hover:bg-blue-50' 
                        : 'hover:text-blue-500 hover:border-blue-200'
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </Button>

                  <Button variant="outline" size="sm" onClick={handleShare} className="hover:bg-gray-50">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-8">
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {blog.content}
                </div>
              </div>

              {/* Tags */}
              {blog.tags.length > 0 && (
                <div className="mb-8 p-4 bg-gray-50/50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-gray-600 border-gray-300 hover:bg-gray-100">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Actions */}
              <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link to="/blogs">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    More Articles
                  </Button>
                </Link>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleLike}
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      blog.is_liked 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${blog.is_liked ? 'fill-current' : ''}`} />
                    {blog.is_liked ? 'Liked' : 'Like'}
                  </Button>

                  <Button 
                    variant="outline" 
                    onClick={handleShare}
                    className="flex items-center gap-2 hover:bg-gray-50"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
