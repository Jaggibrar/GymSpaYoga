
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Blog {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image_url?: string;
  category: string;
  tags: string[];
  status: string;
  featured: boolean;
  views_count: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
  author?: {
    full_name: string;
    avatar_url?: string;
  };
  is_liked?: boolean;
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          user_profiles!inner(full_name, avatar_url)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const blogsWithAuthor = data?.map(blog => ({
        ...blog,
        author: blog.user_profiles
      })) || [];

      setBlogs(blogsWithAuthor);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async (blogData: Partial<Blog>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('blogs')
        .insert([{
          ...blogData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      toast.success('Blog created successfully!');
      fetchBlogs(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Failed to create blog');
      throw error;
    }
  };

  const updateBlog = async (id: string, blogData: Partial<Blog>) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast.success('Blog updated successfully!');
      fetchBlogs(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog');
      throw error;
    }
  };

  const likeBlog = async (blogId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check if already liked
      const { data: existingLike } = await supabase
        .from('blog_likes')
        .select('id')
        .eq('blog_id', blogId)
        .eq('user_id', user.id)
        .single();

      if (existingLike) {
        // Unlike
        await supabase
          .from('blog_likes')
          .delete()
          .eq('blog_id', blogId)
          .eq('user_id', user.id);

        // Decrement likes count
        await supabase
          .from('blogs')
          .update({ likes_count: blogs.find(b => b.id === blogId)?.likes_count - 1 || 0 })
          .eq('id', blogId);
      } else {
        // Like
        await supabase
          .from('blog_likes')
          .insert([{ blog_id: blogId, user_id: user.id }]);

        // Increment likes count
        await supabase
          .from('blogs')
          .update({ likes_count: blogs.find(b => b.id === blogId)?.likes_count + 1 || 1 })
          .eq('id', blogId);
      }

      fetchBlogs(); // Refresh to get updated counts
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    loading,
    createBlog,
    updateBlog,
    likeBlog,
    refetch: fetchBlogs
  };
};
