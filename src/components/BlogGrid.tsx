
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Eye, Heart, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Blog } from '@/hooks/useBlogs';

interface BlogGridProps {
  blogs: Blog[];
  onLike?: (id: string) => void;
}

const BlogGrid: React.FC<BlogGridProps> = ({ blogs, onLike }) => {
  const navigate = useNavigate();

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No articles found
          </h3>
          <p className="text-gray-600">
            Check back later for new wellness content!
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      yoga: 'bg-purple-100 text-purple-700',
      fitness: 'bg-orange-100 text-orange-700',
      spa: 'bg-pink-100 text-pink-700',
      wellness: 'bg-green-100 text-green-700',
      nutrition: 'bg-blue-100 text-blue-700',
      mindfulness: 'bg-indigo-100 text-indigo-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {blogs.map((blog) => (
        <Card 
          key={blog.id} 
          className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-md bg-white/80 backdrop-blur-sm"
          onClick={() => navigate(`/blog/${blog.slug}`)}
        >
          {(blog.image_url || blog.featured_image_url) && (
            <div className="relative h-44 sm:h-48 overflow-hidden">
              <img
                src={blog.image_url || blog.featured_image_url || ''}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800';
                }}
              />
              {blog.featured && (
                <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  Featured
                </Badge>
              )}
              <div className="absolute bottom-3 left-3">
                <Badge className={`${getCategoryColor(blog.category)} border-0 font-medium`}>
                  {blog.category}
                </Badge>
              </div>
            </div>
          )}
          
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{blog.read_time_minutes || 5} min read</span>
              </div>
            </div>
            
            <CardTitle className="text-lg sm:text-xl leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">
              {blog.title}
            </CardTitle>

            {blog.author_name && (
              <div className="flex items-center gap-2 text-xs text-gray-600 mt-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                  {blog.author_name.charAt(0)}
                </div>
                <span className="font-medium">By {blog.author_name}</span>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="pt-0">
            <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
              {blog.excerpt || blog.content.substring(0, 120) + '...'}
            </p>
            
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {blog.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-2 py-1 bg-gray-50">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{blog.views_count || 0}</span>
                </div>
                {onLike && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLike(blog.id);
                    }}
                    className="flex items-center gap-1 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`h-3 w-3 ${blog.is_liked ? 'text-red-500 fill-current' : ''}`} />
                    <span>{blog.likes_count || 0}</span>
                  </button>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600 hover:text-emerald-700 p-1 h-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/blog/${blog.slug}`);
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogGrid;
