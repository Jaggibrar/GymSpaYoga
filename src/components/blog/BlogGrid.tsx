
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, User, Eye, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Blog } from '@/hooks/useBlogs';

interface BlogGridProps {
  blogs: Blog[];
  onLike?: (blogId: string) => void;
}

const BlogGrid = ({ blogs, onLike }: BlogGridProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  if (blogs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Tag className="h-12 w-12 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No blogs found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {blogs.map((blog) => (
        <Card key={blog.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
          {blog.image_url && (
            <div className="relative h-44 sm:h-48 overflow-hidden">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <Badge className={`absolute top-3 right-3 border ${getCategoryColor(blog.category)} font-semibold text-xs px-2 py-1`}>
                {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
              </Badge>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-xs">
                <Clock className="h-3 w-3" />
                <span className="font-medium">5 min read</span>
              </div>
            </div>
          )}
          
          <CardHeader className="pb-3 px-4 sm:px-6">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span className="font-medium">{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="h-3 w-3" />
                <span className="font-medium">{blog.views_count.toLocaleString()}</span>
              </div>
            </div>
            
            <Link to={`/blogs/${blog.slug}`}>
              <h3 className="text-base sm:text-lg font-bold hover:text-emerald-600 transition-colors line-clamp-2 leading-tight mb-2">
                {blog.title}
              </h3>
            </Link>
            
            {blog.author && (
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                  {blog.author.full_name.charAt(0)}
                </div>
                <span className="font-medium">By {blog.author.full_name}</span>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="pt-0 px-4 sm:px-6">
            {blog.excerpt && (
              <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                {blog.excerpt}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {blog.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5 text-gray-600 border-gray-300 hover:bg-gray-50">
                    #{tag}
                  </Badge>
                ))}
                {blog.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5 text-gray-500 border-gray-200">
                    +{blog.tags.length - 2}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {onLike && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLike(blog.id)}
                    className={`h-8 w-8 p-0 rounded-full transition-all duration-200 ${
                      blog.is_liked 
                        ? 'text-red-500 hover:text-red-600 hover:bg-red-50' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`h-3.5 w-3.5 ${blog.is_liked ? 'fill-current' : ''}`} />
                  </Button>
                )}
                
                <Link to={`/blogs/${blog.slug}`}>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-xs px-3 py-1.5 h-auto font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Read More
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogGrid;
