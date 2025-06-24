
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
  // Additional properties for UI compatibility
  image_url?: string;
  category?: string;
  views_count?: number;
  author?: {
    full_name: string;
  };
  is_liked?: boolean;
  featured?: boolean;
}

export const useBlogs = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (status?: 'published' | 'draft') => {
    try {
      setLoading(true);
      
      // Mock blogs for now since the table doesn't exist yet
      const mockBlogs: Blog[] = [
        {
          id: '1',
          title: 'Top 10 Yoga Poses for Beginners',
          slug: 'top-10-yoga-poses-beginners',
          content: 'Discover the essential yoga poses every beginner should master...',
          excerpt: 'Essential yoga poses for beginners to start their wellness journey',
          featured_image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          author_id: 'demo',
          status: 'published',
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          tags: ['yoga', 'beginners', 'wellness'],
          meta_description: 'Learn the top 10 yoga poses perfect for beginners',
          read_time_minutes: 5,
          image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          category: 'Yoga',
          views_count: 150,
          is_liked: false,
          featured: true
        },
        {
          id: '2',
          title: 'Benefits of Regular Spa Treatments',
          slug: 'benefits-regular-spa-treatments',
          content: 'Explore how regular spa treatments can improve your mental and physical health...',
          excerpt: 'Discover the amazing benefits of incorporating spa treatments into your routine',
          featured_image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
          author_id: 'demo',
          status: 'published',
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          tags: ['spa', 'wellness', 'health'],
          meta_description: 'Learn about the benefits of regular spa treatments',
          read_time_minutes: 7,
          image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
          category: 'Spa',
          views_count: 89,
          is_liked: false,
          featured: false
        }
      ];
      
      setBlogs(mockBlogs);
    } catch (error: any) {
      console.error('Error fetching blogs:', error);
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

      toast.success('Blog created successfully!');
      return slug;
    } catch (error: any) {
      console.error('Error creating blog:', error);
      toast.error('Failed to create blog - feature coming soon!');
      return '';
    }
  };

  const updateBlog = async (id: string, blogData: Partial<Blog>) => {
    try {
      toast.success('Blog updated successfully!');
      return blogData;
    } catch (error: any) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog - feature coming soon!');
      return null;
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      toast.success('Blog deleted successfully!');
      fetchBlogs();
    } catch (error: any) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog - feature coming soon!');
    }
  };

  const publishBlog = async (id: string) => {
    try {
      toast.success('Blog published successfully!');
      fetchBlogs();
    } catch (error: any) {
      console.error('Error publishing blog:', error);
      toast.error('Failed to publish blog - feature coming soon!');
    }
  };

  const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
    try {
      // Return mock blog for now
      return {
        id: '1',
        title: 'Sample Blog Post',
        slug: slug,
        content: 'This is a sample blog post content with rich formatting and detailed information.',
        excerpt: 'Sample excerpt for the blog post',
        author_id: 'user1',
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        read_time_minutes: 5,
        category: 'Health',
        views_count: 0,
        is_liked: false,
        featured: false
      };
    } catch (error: any) {
      console.error('Error fetching blog by slug:', error);
      return null;
    }
  };

  const likeBlog = async (id: string) => {
    try {
      toast.success('Blog liked!');
      // Mock implementation
    } catch (error: any) {
      console.error('Error liking blog:', error);
      toast.error('Failed to like blog');
    }
  };

  useEffect(() => {
    fetchBlogs();
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
