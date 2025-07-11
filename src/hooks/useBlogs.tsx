
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
  featured_image_url?: string;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  status?: 'draft' | 'published' | 'archived';
  views_count: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
  author_id?: string;
  author_name?: string;
  author_avatar?: string;
  author?: {
    full_name: string;
    avatar_url?: string;
  };
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
      
      let query = supabase
        .from('blogs')
        .select(`
          *
        `)
        .order('created_at', { ascending: false });

      if (status === 'published') {
        query = query.eq('published', true);
      } else if (status === 'draft') {
        query = query.eq('published', false);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching blogs:', error);
        if (error.code === 'PGRST116') {
          // No blogs found, create sample data
          await createSampleBlogs();
          return;
        }
        toast.error('Failed to load blogs');
        return;
      }

      const blogsWithMeta = data?.map((blog: any) => ({
        ...blog,
        read_time_minutes: Math.ceil((blog.content || '').length / 200) || 5,
        is_liked: false,
        author_name: 'GymSpaYoga Author',
        author_avatar: undefined,
        meta_description: blog.excerpt || blog.content?.substring(0, 160) || '',
        featured_image_url: blog.image_url,
        status: blog.published ? 'published' : 'draft',
        tags: Array.isArray(blog.tags) ? blog.tags : []
      })) || [];

      if (blogsWithMeta.length === 0 && status === 'published') {
        // No published blogs found, create sample data
        await createSampleBlogs();
        return;
      }

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
        .from('blogs')
        .insert({
          title: blogData.title,
          content: blogData.content,
          excerpt: blogData.excerpt,
          slug: slug,
          category: blogData.category || 'wellness',
          tags: Array.isArray(blogData.tags) ? blogData.tags : [],
          image_url: blogData.image_url || blogData.featured_image_url,
          author_id: user.id,
          published: true,
          featured: false,
          views_count: 0,
          likes_count: 0,
          meta_description: blogData.meta_description || blogData.excerpt
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
        .from('blogs')
        .select(`*`)
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        console.error('Error fetching blog by slug:', error);
        return null;
      }

      // Increment view count
      await supabase
        .from('blogs')
        .update({ views_count: (data.views_count || 0) + 1 })
        .eq('id', data.id);

      return {
        ...data,
        read_time_minutes: Math.ceil((data.content || '').length / 200) || 5,
        is_liked: false,
        author_name: 'GymSpaYoga Author',
        author_avatar: undefined,
        meta_description: data.excerpt || data.content?.substring(0, 160) || '',
        featured_image_url: data.image_url,
        status: data.published ? 'published' : 'draft',
        tags: Array.isArray(data.tags) ? data.tags : []
      };
    } catch (error: any) {
      console.error('Error fetching blog by slug:', error);
      return null;
    }
  };

  const likeBlog = async (id: string) => {
    if (!user) {
      toast.error('Please log in to like blogs');
      return;
    }

    try {
      // Check if user already liked this blog
      const { data: existingLike } = await supabase
        .from('blog_likes')
        .select('id')
        .eq('blog_id', id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingLike) {
        // Unlike the blog
        await supabase
          .from('blog_likes')
          .delete()
          .eq('blog_id', id)
          .eq('user_id', user.id);

        // Decrement likes count
        const { data: currentBlog } = await supabase
          .from('blogs')
          .select('likes_count')
          .eq('id', id)
          .single();

        if (currentBlog) {
          await supabase
            .from('blogs')
            .update({ likes_count: Math.max(0, (currentBlog.likes_count || 0) - 1) })
            .eq('id', id);
        }

        toast.success('Blog unliked!');
      } else {
        // Like the blog
        await supabase
          .from('blog_likes')
          .insert({ blog_id: id, user_id: user.id });

        // Increment likes count
        const { data: currentBlog } = await supabase
          .from('blogs')
          .select('likes_count')
          .eq('id', id)
          .single();

        if (currentBlog) {
          await supabase
            .from('blogs')
            .update({ likes_count: (currentBlog.likes_count || 0) + 1 })
            .eq('id', id);
        }

        toast.success('Blog liked!');
      }

      fetchBlogs();
    } catch (error: any) {
      console.error('Error liking blog:', error);
      toast.error('Failed to update like status');
    }
  };

  const updateBlog = async (id: string, blogData: Partial<Blog>) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .update({
          ...blogData,
          tags: Array.isArray(blogData.tags) ? blogData.tags : [],
          updated_at: new Date().toISOString()
        })
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
        .from('blogs')
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
        .from('blogs')
        .update({ 
          published: true, 
          status: 'published',
          published_at: new Date().toISOString() 
        })
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

  const createSampleBlogs = async () => {
    try {
      console.log('Creating sample blog data...');
      setLoading(true);
      
      // Call the edge function to create sample blogs
      const { data, error } = await supabase.functions.invoke('create-sample-blogs');
      
      if (error) {
        console.error('Error creating sample blogs:', error);
        toast.error('Failed to create sample blogs');
        return;
      }
      
      console.log('Sample blogs created successfully');
      toast.success('Sample blog articles loaded!');
      
      // Refresh the blogs list
      fetchBlogs('published');
    } catch (error) {
      console.error('Error creating sample blogs:', error);
      toast.error('Failed to create sample blogs');
    } finally {
      setLoading(false);
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
    likeBlog,
    createSampleBlogs
  };
};
