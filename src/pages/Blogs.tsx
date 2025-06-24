
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useBlogs } from '@/hooks/useBlogs';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Clock, User, Heart, Eye, Plus } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const Blogs = () => {
  const { blogs, loading } = useBlogs();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleBlogClick = (slug: string) => {
    navigate(`/blogs/${slug}`);
  };

  return (
    <>
      <SEOHead
        title="Health & Wellness Blog - GymSpaYoga | Expert Tips & Guides"
        description="Discover expert tips, guides, and insights on fitness, wellness, yoga, and spa treatments. Stay updated with the latest health trends and advice."
        keywords="health blog, fitness tips, wellness guide, yoga advice, spa treatments, exercise tips"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Health & Wellness Blog</h1>
              <p className="text-xl mb-8">
                Expert insights, tips, and guides for your wellness journey
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3 text-gray-900"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Latest Articles ({filteredBlogs.length})
            </h2>
            
            {user && (
              <Button onClick={() => navigate('/create-blog')}>
                <Plus className="h-4 w-4 mr-2" />
                Write Article
              </Button>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <Card 
                  key={blog.id} 
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => handleBlogClick(blog.slug)}
                >
                  {blog.image_url && (
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {blog.featured && (
                        <Badge className="absolute top-3 right-3 bg-purple-500 text-white">
                          Featured
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{blog.read_time_minutes} min read</span>
                    </div>
                    
                    <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>
                    
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{blog.views_count || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className={`h-4 w-4 ${blog.is_liked ? 'text-red-500 fill-current' : ''}`} />
                          <span>Like</span>
                        </div>
                      </div>
                      
                      <Badge variant="secondary">
                        {blog.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? 'Try adjusting your search terms' : 'Be the first to write an article!'}
                </p>
                {user && (
                  <Button onClick={() => navigate('/create-blog')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Write First Article
                  </Button>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest health and wellness tips, 
              delivered straight to your inbox.
            </p>
            
            <div className="max-w-md mx-auto flex gap-3">
              <Input 
                placeholder="Enter your email"
                type="email"
                className="flex-1"
              />
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blogs;
