
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
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Tag className="h-12 w-12 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No blogs found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria, or create sample content</p>
          <div className="text-xs text-gray-400">
            Use the Quick Setup panel to create sample blogs for testing
          </div>
        </div>
      </div>
    </div>
  );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {blogs.map((blog) => (
          <Card key={blog.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white shadow-xl rounded-2xl">
          {blog.image_url && (
            <div className="relative h-52 sm:h-56 overflow-hidden">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <Badge className={`absolute top-4 right-4 border-0 ${getCategoryColor(blog.category)} font-bold text-xs px-3 py-1.5 shadow-lg backdrop-blur-sm`}>
                {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
              </Badge>
              
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm font-medium">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </div>
          )}
          
          <CardHeader className="pb-4 px-6 pt-6">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-600" />
                <span className="font-medium">{blog.views_count.toLocaleString()}</span>
              </div>
            </div>
            
            <Link to={`/blogs/${blog.slug}`}>
              <h3 className="text-xl font-bold hover:text-emerald-600 transition-colors line-clamp-2 leading-tight mb-3 text-gray-900">
                {blog.title}
              </h3>
            </Link>
            
            {blog.author && (
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-md">
                  {blog.author.full_name.charAt(0)}
                </div>
                <span className="font-medium">By {blog.author.full_name}</span>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="pt-0 px-6 pb-6">
            {blog.excerpt && (
              <p className="text-gray-600 text-sm line-clamp-3 mb-5 leading-relaxed">
                {blog.excerpt}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {blog.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs px-3 py-1 text-gray-600 border-gray-300 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors">
                    #{tag}
                  </Badge>
                ))}
                {blog.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs px-3 py-1 text-gray-500 border-gray-200 bg-gray-50">
                    +{blog.tags.length - 2}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {onLike && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLike(blog.id)}
                    className={`h-9 w-9 p-0 rounded-full transition-all duration-300 ${
                      blog.is_liked 
                        ? 'text-red-500 hover:text-red-600 hover:bg-red-50 hover:scale-110' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50 hover:scale-110'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${blog.is_liked ? 'fill-current' : ''}`} />
                  </Button>
                )}
                
                <Link to={`/blogs/${blog.slug}`}>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-sm px-4 py-2 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
    </div>
  );
};

export default BlogGrid;
