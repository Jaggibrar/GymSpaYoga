
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { useBlogs, Blog } from '@/hooks/useBlogs';
import { Calendar, Clock, User, Plus, Eye, Edit } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BlogEditor from '@/components/blog/BlogEditor';
import SEOHead from '@/components/SEOHead';

const Blogs = () => {
  const { user } = useAuth();
  const { blogs, loading, fetchBlogs } = useBlogs();
  const [showEditor, setShowEditor] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs('published');
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCreateBlog = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setSelectedBlog(undefined);
    setShowEditor(true);
  };

  return (
    <>
      <SEOHead
        title="Health & Wellness Blog - GymSpaYoga | Fitness Tips & Guides"
        description="Discover expert health and wellness tips, fitness guides, and lifestyle advice from top trainers and wellness professionals."
        keywords="health blog, fitness tips, wellness guide, yoga advice, gym workouts, spa treatments"
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-50 to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Health & Wellness Blog
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Expert insights, tips, and guides for your fitness and wellness journey
              </p>
              
              {user && (
                <Button onClick={handleCreateBlog} size="lg" className="mb-8">
                  <Plus className="h-5 w-5 mr-2" />
                  Write New Blog Post
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                <span className="ml-2 text-gray-600">Loading blog posts...</span>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Blog Posts Yet</h3>
                <p className="text-gray-600 mb-8">Be the first to share your wellness insights!</p>
                {user && (
                  <Button onClick={handleCreateBlog}>
                    <Plus className="h-5 w-5 mr-2" />
                    Write First Blog Post
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <Card key={blog.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <CardHeader className="p-0">
                      {blog.featured_image_url && (
                        <img
                          src={blog.featured_image_url}
                          alt={blog.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      )}
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {blog.tags?.[0] || 'Health'}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {blog.read_time_minutes} min read
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl font-bold mb-3 group-hover:text-emerald-600 transition-colors">
                        {blog.title}
                      </CardTitle>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(blog.published_at || blog.created_at)}
                        </div>
                      </div>
                      
                      <Link to={`/blogs/${blog.slug}`}>
                        <Button variant="outline" className="w-full group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                          <Eye className="h-4 w-4 mr-2" />
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Blog Editor Dialog */}
        <Dialog open={showEditor} onOpenChange={setShowEditor}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <BlogEditor
              blog={selectedBlog}
              onSave={() => {
                setShowEditor(false);
                fetchBlogs('published');
              }}
              onCancel={() => setShowEditor(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Blogs;
