
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  author_id: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  meta_description?: string;
  read_time_minutes?: number;
}

export const useBlogs = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (status?: 'published' | 'draft') => {
    try {
      setLoading(true);
      let query = supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      setBlogs(data || []);
    } catch (error: any) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async (blogData: Partial<Blog>) => {
    if (!user) {
      toast.error('You must be logged in to create a blog');
      return null;
    }

    try {
      const slug = blogData.title?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || '';

      const { data, error } = await supabase
        .from('blogs')
        .insert({
          ...blogData,
          slug,
          author_id: user.id,
          status: blogData.status || 'draft'
        })
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Blog created successfully!');
      return data;
    } catch (error: any) {
      console.error('Error creating blog:', error);
      toast.error(error.message || 'Failed to create blog');
      return null;
    }
  };

  const updateBlog = async (id: string, blogData: Partial<Blog>) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .update({
          ...blogData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Blog updated successfully!');
      return data;
    } catch (error: any) {
      console.error('Error updating blog:', error);
      toast.error(error.message || 'Failed to update blog');
      return null;
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Blog deleted successfully!');
      fetchBlogs();
    } catch (error: any) {
      console.error('Error deleting blog:', error);
      toast.error(error.message || 'Failed to delete blog');
    }
  };

  const publishBlog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .update({
          status: 'published',
          published_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Blog published successfully!');
      fetchBlogs();
    } catch (error: any) {
      console.error('Error publishing blog:', error);
      toast.error(error.message || 'Failed to publish blog');
    }
  };

  const getBlogBySlug = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error fetching blog by slug:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchBlogs('published');
  }, []);

  return {
    blogs,
    loading,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    publishBlog,
    getBlogBySlug
  };
};
