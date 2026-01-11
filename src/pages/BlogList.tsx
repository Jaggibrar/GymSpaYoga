
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Filter, TrendingUp, BookOpen } from 'lucide-react';
import { useBlogs } from '@/hooks/useBlogs';
import { useAuth } from '@/hooks/useAuth';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogEditor from '@/components/blog/BlogEditor';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/SEOHead';
import { toast } from 'sonner';

const BlogList = () => {
  const { blogs, loading, createBlog, likeBlog } = useBlogs();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories', color: 'bg-gray-100 text-gray-700' },
    { value: 'wellness', label: 'Wellness', color: 'bg-blue-100 text-blue-700' },
    { value: 'fitness', label: 'Fitness', color: 'bg-orange-100 text-orange-700' },
    { value: 'yoga', label: 'Yoga', color: 'bg-purple-100 text-purple-700' },
    { value: 'spa', label: 'Spa', color: 'bg-pink-100 text-pink-700' },
    { value: 'nutrition', label: 'Nutrition', color: 'bg-green-100 text-green-700' },
    { value: 'mindfulness', label: 'Mindfulness', color: 'bg-indigo-100 text-indigo-700' },
    { value: 'lifestyle', label: 'Lifestyle', color: 'bg-teal-100 text-teal-700' }
  ];

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

  const featuredBlogs = blogs.filter(blog => blog.featured).slice(0, 3);
  const totalViews = blogs.reduce((sum, blog) => sum + blog.views_count, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Wellness Blog - Expert Tips & Insights | GymSpaYoga"
        description="Discover expert wellness tips, fitness advice, yoga guides, and spa insights from certified professionals in our comprehensive wellness blog."
        keywords="wellness blog, fitness tips, yoga advice, spa treatments, health articles"
      />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="mb-4 sm:mb-6">
            <Badge className="bg-[#005EB8] text-white px-4 py-2 text-sm font-bold shadow-lg">
              📚 Expert Wellness Insights
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 mb-3 sm:mb-4">
            Wellness <span className="text-[#005EB8]">Blog</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Discover expert insights, tips, and inspiration for your fitness and wellness journey
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
              <BookOpen className="h-4 w-4 text-[#005EB8]" />
              <span className="text-sm font-semibold text-gray-700">{blogs.length} Articles</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
              <TrendingUp className="h-4 w-4 text-[#005EB8]" />
              <span className="text-sm font-semibold text-gray-700">{totalViews.toLocaleString()} Views</span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search wellness articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-[#005EB8] focus:ring-[#005EB8]"
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-sm border-gray-200">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm">
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${category.color.split(' ')[0]}`}></div>
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {user && (
                <Button 
                  onClick={() => setIsCreateModalOpen(true)} 
                  className="flex items-center gap-2 bg-[#005EB8] hover:bg-[#004d96] text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Write Blog</span>
                  <span className="sm:hidden">Write</span>
                </Button>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-[#005EB8]">{filteredBlogs.length}</span> {filteredBlogs.length === 1 ? 'article' : 'articles'} found
                {searchTerm && <span className="text-gray-500"> for "{searchTerm}"</span>}
                {selectedCategory && selectedCategory !== 'all' && <span className="text-gray-500"> in {selectedCategory}</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Blogs Section */}
        {featuredBlogs.length > 0 && !searchTerm && !selectedCategory && (
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-1 h-6 bg-[#005EB8] rounded-full"></div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Featured Articles</h2>
            </div>
            <BlogGrid 
              blogs={featuredBlogs} 
              onLike={user ? likeBlog : undefined}
            />
          </div>
        )}

        {/* All Blogs Section */}
        <div>
          {!searchTerm && !selectedCategory && featuredBlogs.length > 0 && (
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-1 h-6 bg-[#005EB8] rounded-full"></div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">All Articles</h2>
            </div>
          )}
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-44 sm:h-48 rounded-t-lg"></div>
                  <div className="bg-white rounded-b-lg p-4 sm:p-6 space-y-3">
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

        {/* Create Blog Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-[#005EB8]">
                Create New Blog Post
              </DialogTitle>
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
