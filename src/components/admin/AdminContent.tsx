import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Eye, Edit, Trash, Users, Heart, MessageSquare, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  author_id: string;
  published: boolean;
  featured: boolean;
  views_count: number;
  likes_count: number;
  created_at: string;
  published_at: string | null;
  status: string | null;
}

export const AdminContent = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  };

  const updateBlogStatus = async (blogId: string, field: string, value: boolean) => {
    try {
      const updates: any = { [field]: value };
      if (field === 'published' && value) {
        updates.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('blogs')
        .update(updates)
        .eq('id', blogId);

      if (error) throw error;

      setBlogs(blogs.map(blog => 
        blog.id === blogId 
          ? { ...blog, [field]: value, ...(updates.published_at && { published_at: updates.published_at }) }
          : blog
      ));

      toast.success(`Blog ${field} updated successfully`);
    } catch (error) {
      console.error(`Error updating blog ${field}:`, error);
      toast.error(`Failed to update blog ${field}`);
    }
  };

  const deleteBlog = async (blogId: string) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blogId);

      if (error) throw error;

      setBlogs(blogs.filter(blog => blog.id !== blogId));
      toast.success('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'published' && blog.published) ||
      (statusFilter === 'draft' && !blog.published) ||
      (statusFilter === 'featured' && blog.featured);
    const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (blog: BlogPost) => {
    if (blog.featured) return 'bg-purple-100 text-purple-800';
    if (blog.published) return 'bg-green-100 text-green-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getStatusText = (blog: BlogPost) => {
    if (blog.featured) return 'Featured';
    if (blog.published) return 'Published';
    return 'Draft';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Button onClick={() => window.location.href = '/blogs/new'}>
          <FileText className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <Input
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="fitness">Fitness</SelectItem>
            <SelectItem value="wellness">Wellness</SelectItem>
            <SelectItem value="nutrition">Nutrition</SelectItem>
            <SelectItem value="yoga">Yoga</SelectItem>
            <SelectItem value="spa">Spa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Blog Posts */}
      <div className="grid gap-4">
        {filteredBlogs.map((blog) => (
          <Card key={blog.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-lg">{blog.title}</h3>
                    <Badge className={getStatusColor(blog)}>
                      {getStatusText(blog)}
                    </Badge>
                    <Badge variant="outline">{blog.category}</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{blog.views_count} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{blog.likes_count} likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Created {new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
                    {blog.published_at && (
                      <div className="flex items-center space-x-1">
                        <span>Published {new Date(blog.published_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateBlogStatus(blog.id, 'published', !blog.published)}
                  >
                    {blog.published ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateBlogStatus(blog.id, 'featured', !blog.featured)}
                  >
                    {blog.featured ? 'Unfeature' : 'Feature'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `/blog/${blog.id}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteBlog(blog.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No blog posts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};