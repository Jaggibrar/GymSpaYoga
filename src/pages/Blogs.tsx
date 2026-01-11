
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useBlogs } from '@/hooks/useBlogs';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, BookOpen, TrendingUp, Edit3 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogRichEditor from '@/components/blog/BlogRichEditor';
import SEOHead from '@/components/SEOHead';

const Blogs = () => {
  const { blogs, loading, createBlog, likeBlog } = useBlogs();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateBlog = async (blogData: any) => {
    setIsSubmitting(true);
    try {
      const slug = await createBlog(blogData);
      if (slug) {
        setIsCreateModalOpen(false);
        navigate(`/blog/${slug}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const featuredBlogs = blogs.filter(blog => blog.featured).slice(0, 3);
  const totalViews = blogs.reduce((sum, blog) => sum + (blog.views_count || 0), 0);

  return (
    <>
      <SEOHead
        title="Health & Wellness Blog - GymSpaYoga | Expert Tips & Guides"
        description="Discover expert tips, guides, and insights on fitness, wellness, yoga, and spa treatments. Stay updated with the latest health trends and advice."
        keywords="health blog, fitness tips, wellness guide, yoga advice, spa treatments, exercise tips"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-blue-500 to-teal-600 text-white py-20 lg:py-32">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
          </div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                  Wellness <span className="text-emerald-200">Insights</span>
                </h1>
                <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                  Expert insights, actionable tips, and comprehensive guides for your holistic wellness journey. Stay informed about the latest trends in fitness, nutrition, and mental well-being.
                </p>
              </div>
              
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
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Latest Articles ({filteredBlogs.length})
              </h2>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-emerald-600" />
                  <span>{blogs.length} Total Articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span>{totalViews.toLocaleString()} Total Views</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              {user && (
                <>
                  <Button 
                    onClick={() => navigate('/my-blogs')}
                    variant="outline"
                    className="text-[#005EB8] border-[#005EB8] hover:bg-[#005EB8]/10"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    My Blogs
                  </Button>
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-[#005EB8] hover:bg-[#004d96] text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Write Article
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Featured Blogs Section */}
          {featuredBlogs.length > 0 && !searchTerm && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-[#005EB8] rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Featured Articles</h2>
              </div>
              <BlogGrid 
                blogs={featuredBlogs} 
                onLike={user ? likeBlog : undefined}
              />
            </div>
          )}

          {/* All Blogs Section */}
          <div>
            {!searchTerm && featuredBlogs.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-[#005EB8] rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">All Articles</h2>
              </div>
            )}
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                    <div className="bg-white rounded-b-lg p-6 space-y-3">
                      <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                      <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                      <div className="bg-gray-200 h-3 rounded w-full"></div>
                      <div className="bg-gray-200 h-3 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <BlogGrid 
                blogs={filteredBlogs} 
                onLike={user ? likeBlog : undefined}
              />
            )}
          </div>
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
              <Button className="bg-[#005EB8] hover:bg-[#004d96]">
                Subscribe
              </Button>
            </div>
          </div>
        </section>

        {/* Create Blog Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Create New Blog Post
              </DialogTitle>
            </DialogHeader>
            <BlogRichEditor
              onSubmit={handleCreateBlog}
              isSubmitting={isSubmitting}
              onCancel={() => setIsCreateModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Blogs;
