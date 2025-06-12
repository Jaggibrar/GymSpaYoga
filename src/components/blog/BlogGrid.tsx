
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, User, Eye } from 'lucide-react';
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
      month: 'long',
      day: 'numeric'
    });
  };

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No blogs found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          {blog.image_url && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-2 right-2 bg-emerald-500">
                {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
              </Badge>
            </div>
          )}
          
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{blog.views_count}</span>
              </div>
            </div>
            
            <Link to={`/blogs/${blog.slug}`}>
              <h3 className="text-lg font-semibold hover:text-emerald-600 transition-colors line-clamp-2">
                {blog.title}
              </h3>
            </Link>
            
            {blog.author && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>By {blog.author.full_name}</span>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="pt-0">
            {blog.excerpt && (
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {blog.excerpt}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {blog.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {blog.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
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
                    className="flex items-center gap-1 text-gray-500 hover:text-red-500"
                  >
                    <Heart className={`h-4 w-4 ${blog.is_liked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="text-xs">{blog.likes_count}</span>
                  </Button>
                )}
                
                <Link to={`/blogs/${blog.slug}`}>
                  <Button variant="outline" size="sm">
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
