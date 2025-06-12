
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus } from 'lucide-react';
import { useBlogs } from '@/hooks/useBlogs';
import { useAuth } from '@/hooks/useAuth';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogEditor from '@/components/blog/BlogEditor';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SEOHead from '@/components/SEOHead';
import { toast } from 'sonner';

const BlogList = () => {
  const { blogs, loading, createBlog, likeBlog } = useBlogs();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['all', 'wellness', 'fitness', 'yoga', 'spa', 'nutrition', 'mindfulness', 'lifestyle'];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = searchTerm === '' || 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || selectedCategory === 'all' || 
      blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCreateBlog = async (blogData: any) => {
    if (!user) {
      toast.error('Please log in to create a blog post');
      return;
    }

    setIsSubmitting(true);
    try {
      await createBlog(blogData);
      setIsCreateModalOpen(false);
    } catch (error) {
      // Error already handled in hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <SEOHead 
        title="Wellness Blog - Expert Tips & Insights | GymSpaYoga"
        description="Discover expert wellness tips, fitness advice, yoga guides, and spa insights from certified professionals in our comprehensive wellness blog."
        keywords="wellness blog, fitness tips, yoga advice, spa treatments, health articles"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Wellness <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover expert insights, tips, and inspiration for your fitness and wellness journey
          </p>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : 
                       category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {user && (
                <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Write Blog
                </Button>
              )}
            </div>

            <p className="text-gray-600">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? 'blog' : 'blogs'} found
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory && selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <BlogGrid blogs={filteredBlogs} onLike={user ? likeBlog : undefined} />
        )}

        {/* Create Blog Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
            </DialogHeader>
            <BlogEditor
              onSubmit={handleCreateBlog}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BlogList;
