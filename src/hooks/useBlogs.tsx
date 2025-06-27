
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
  image_url?: string;
  category: string;
  tags?: string[];
  published: boolean;
  featured: boolean;
  views_count: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
  author_id?: string;
  author_name?: string;
  author_avatar?: string;
  read_time_minutes?: number;
  meta_description?: string;
  published_at?: string;
  is_liked?: boolean;
}

export const useBlogs = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (status?: 'published' | 'draft') => {
    try {
      setLoading(true);
      
      // Use the correct SQL query with proper typing
      const { data, error } = await supabase.rpc('get_blogs_with_authors', {
        published_only: status === 'published'
      });

      if (error) {
        console.error('Error fetching blogs:', error);
        
        // Fallback to direct table query if RPC doesn't exist
        const fallbackQuery = supabase
          .from('blogs' as any)
          .select('*')
          .order('created_at', { ascending: false });

        if (status === 'published') {
          fallbackQuery.eq('published', true);
        }

        const { data: fallbackData, error: fallbackError } = await fallbackQuery;
        
        if (fallbackError) {
          console.error('Fallback query error:', fallbackError);
          toast.error('Failed to load blogs');
          return;
        }

        const blogsWithMeta = fallbackData?.map((blog: any) => ({
          ...blog,
          read_time_minutes: Math.ceil((blog.content || '').length / 200),
          is_liked: false,
          author_name: 'GymSpaYoga Author',
          meta_description: blog.excerpt || blog.content?.substring(0, 160)
        })) || [];

        setBlogs(blogsWithMeta);
        return;
      }

      const blogsWithMeta = data?.map((blog: any) => ({
        ...blog,
        read_time_minutes: Math.ceil((blog.content || '').length / 200),
        is_liked: false,
        meta_description: blog.excerpt || blog.content?.substring(0, 160)
      })) || [];

      setBlogs(blogsWithMeta);
    } catch (error: any) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async (blogData: Partial<Blog>): Promise<string> => {
    if (!user) {
      toast.error('You must be logged in to create a blog');
      return '';
    }

    try {
      const slug = blogData.title?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || '';

      const { data, error } = await supabase
        .from('blogs' as any)
        .insert({
          title: blogData.title,
          content: blogData.content,
          excerpt: blogData.excerpt,
          slug: slug,
          category: blogData.category || 'wellness',
          tags: blogData.tags || [],
          image_url: blogData.image_url,
          author_id: user.id,
          published: true,
          featured: false,
          views_count: 0,
          likes_count: 0
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating blog:', error);
        toast.error('Failed to create blog');
        return '';
      }

      toast.success('Blog created successfully!');
      fetchBlogs();
      return data.slug;
    } catch (error: any) {
      console.error('Error creating blog:', error);
      toast.error('Failed to create blog');
      return '';
    }
  };

  const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
    try {
      const { data, error } = await supabase
        .from('blogs' as any)
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        console.error('Error fetching blog by slug:', error);
        return null;
      }

      // Increment view count
      await supabase
        .from('blogs' as any)
        .update({ views_count: (data.views_count || 0) + 1 })
        .eq('id', data.id);

      return {
        ...data,
        read_time_minutes: Math.ceil((data.content || '').length / 200),
        is_liked: false,
        author_name: 'GymSpaYoga Author',
        meta_description: data.excerpt || data.content?.substring(0, 160)
      };
    } catch (error: any) {
      console.error('Error fetching blog by slug:', error);
      return null;
    }
  };

  const likeBlog = async (id: string) => {
    try {
      const { data: currentBlog } = await supabase
        .from('blogs' as any)
        .select('likes_count')
        .eq('id', id)
        .single();

      if (currentBlog) {
        await supabase
          .from('blogs' as any)
          .update({ likes_count: (currentBlog.likes_count || 0) + 1 })
          .eq('id', id);

        toast.success('Blog liked!');
        fetchBlogs();
      }
    } catch (error: any) {
      console.error('Error liking blog:', error);
      toast.error('Failed to like blog');
    }
  };

  const updateBlog = async (id: string, blogData: Partial<Blog>) => {
    try {
      const { error } = await supabase
        .from('blogs' as any)
        .update(blogData)
        .eq('id', id);

      if (error) {
        console.error('Error updating blog:', error);
        toast.error('Failed to update blog');
        return null;
      }

      toast.success('Blog updated successfully!');
      fetchBlogs();
      return blogData;
    } catch (error: any) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog');
      return null;
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blogs' as any)
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting blog:', error);
        toast.error('Failed to delete blog');
        return;
      }

      toast.success('Blog deleted successfully!');
      fetchBlogs();
    } catch (error: any) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  const publishBlog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blogs' as any)
        .update({ published: true })
        .eq('id', id);

      if (error) {
        console.error('Error publishing blog:', error);
        toast.error('Failed to publish blog');
        return;
      }

      toast.success('Blog published successfully!');
      fetchBlogs();
    } catch (error: any) {
      console.error('Error publishing blog:', error);
      toast.error('Failed to publish blog');
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
    getBlogBySlug,
    likeBlog
  };
};
