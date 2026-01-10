
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useBlogs, Blog } from '@/hooks/useBlogs';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Search, BarChart3, Calendar, Heart } from 'lucide-react';
import BlogRichEditor from '@/components/blog/BlogRichEditor';
import SEOHead from '@/components/SEOHead';
import { toast } from 'sonner';

const MyBlogs = () => {
  const { blogs, loading, fetchBlogs, createBlog, updateBlog, deleteBlog } = useBlogs();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBlogs();
  }, [user]);

  const userBlogs = blogs.filter(blog => blog.author_id === user?.id);
  const filteredBlogs = userBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateBlog = async (blogData: any) => {
    setIsSubmitting(true);
    try {
      const slug = await createBlog(blogData);
      if (slug) {
        setIsCreateModalOpen(false);
        toast.success('Blog created successfully!');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditBlog = async (blogData: any) => {
    if (!editingBlog) return;
    
    setIsSubmitting(true);
    try {
      await updateBlog(editingBlog.id, blogData);
      setIsEditModalOpen(false);
      setEditingBlog(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await deleteBlog(blogId);
    }
  };

  const totalViews = userBlogs.reduce((sum, blog) => sum + blog.views_count, 0);
  const totalLikes = userBlogs.reduce((sum, blog) => sum + blog.likes_count, 0);
  const publishedBlogs = userBlogs.filter(blog => blog.published).length;

  if (!user) {
    return null;
  }

  return (
    <>
      <SEOHead
        title="My Blogs - GymSpaYoga"
        description="Manage your blog posts and articles"
      />
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Blogs</h1>
              <p className="text-gray-600">Manage your articles and content</p>
            </div>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-[#005EB8] hover:bg-[#004d96] text-white shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Blog
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Blogs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{userBlogs.length}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Published</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">{publishedBlogs}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Likes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-pink-600">{totalLikes.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search your blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Blogs List */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                  <div className="bg-white rounded-b-lg p-6 space-y-3">
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                    <div className="bg-gray-200 h-3 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  {userBlogs.length === 0 ? (
                    <>
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-semibold mb-2">No blogs yet</h3>
                      <p>Create your first blog post to get started!</p>
                    </>
                  ) : (
                    <>
                      <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-semibold mb-2">No blogs found</h3>
                      <p>Try adjusting your search terms</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <Card key={blog.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow overflow-hidden">
                  {blog.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant={blog.published ? "default" : "secondary"}>
                          {blog.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(blog.created_at).toLocaleDateString()}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {blog.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {blog.excerpt || blog.content.substring(0, 120) + '...'}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {blog.views_count}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {blog.likes_count}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/blog/${blog.slug}`)}
                        className="flex-1"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingBlog(blog);
                          setIsEditModalOpen(true);
                        }}
                        className="flex-1"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Create Blog Modal */}
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Blog Post</DialogTitle>
              </DialogHeader>
              <BlogRichEditor
                onSubmit={handleCreateBlog}
                isSubmitting={isSubmitting}
                onCancel={() => setIsCreateModalOpen(false)}
              />
            </DialogContent>
          </Dialog>

          {/* Edit Blog Modal */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Blog Post</DialogTitle>
              </DialogHeader>
              <BlogRichEditor
                onSubmit={handleEditBlog}
                isSubmitting={isSubmitting}
                initialData={editingBlog}
                onCancel={() => {
                  setIsEditModalOpen(false);
                  setEditingBlog(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default MyBlogs;
