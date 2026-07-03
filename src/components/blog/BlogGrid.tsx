import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, Eye, Clock, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Blog } from '@/hooks/useBlogs';
import TagChip from '@/components/blog/TagChip';

interface BlogGridProps {
  blogs: Blog[];
  onLike?: (blogId: string) => void;
}

const BlogGrid = ({ blogs, onLike }: BlogGridProps) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  if (blogs.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Tag className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-3">No Articles Yet</h3>
          <p className="text-muted-foreground leading-relaxed">
            We're building our wellness content library. Check back soon for expert insights on fitness, yoga, spa treatments, and healthy living.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {blogs.map((blog) => (
        <Card
          key={blog.id}
          className="group overflow-hidden bg-card border border-border rounded-3xl shadow-medium hover:shadow-emerald hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 flex flex-col"
        >
          {blog.image_url && (
            <Link to={`/blogs/${blog.slug}`} className="relative block h-52 sm:h-56 overflow-hidden">
              <img
                src={blog.image_url}
                alt={blog.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.15) 55%, rgba(0,0,0,0))',
                }}
              />
              <Badge
                className="absolute top-4 right-4 border-0 font-semibold text-xs px-3 py-1.5 shadow-lg"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
              >
                {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
              </Badge>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-xs font-medium">
                <Clock className="h-3.5 w-3.5" />
                <span>5 min read</span>
              </div>
            </Link>
          )}

          <CardHeader className="pb-3 px-6 pt-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-primary" />
                <span>{blog.views_count.toLocaleString()}</span>
              </div>
            </div>

            <Link to={`/blogs/${blog.slug}`}>
              <h3 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug text-foreground">
                {blog.title}
              </h3>
            </Link>

            {blog.author && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-3">
                <div className="w-8 h-8 rounded-full bg-gradient-emerald flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {blog.author.full_name.charAt(0)}
                </div>
                <span className="font-medium">By {blog.author.full_name}</span>
              </div>
            )}
          </CardHeader>

          <CardContent className="pt-0 px-6 pb-6 flex-1 flex flex-col">
            {blog.excerpt && (
              <p className="text-muted-foreground text-sm line-clamp-3 mb-5 leading-relaxed">
                {blog.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {blog.tags.slice(0, 2).map((tag) => (
                  <TagChip key={tag} tag={tag} />
                ))}
              </div>

              <div className="flex items-center gap-2">
                {onLike && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLike(blog.id)}
                    aria-label="Like article"
                    className={`h-9 w-9 p-0 rounded-full transition-all ${
                      blog.is_liked
                        ? 'text-destructive hover:bg-destructive/10'
                        : 'text-muted-foreground hover:text-destructive hover:bg-destructive/10'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${blog.is_liked ? 'fill-current' : ''}`} />
                  </Button>
                )}

                <Link to={`/blogs/${blog.slug}`}>
                  <Button
                    size="sm"
                    className="btn-primary h-9 px-4 text-sm gap-1.5"
                  >
                    Read
                    <ArrowRight className="h-3.5 w-3.5" />
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
