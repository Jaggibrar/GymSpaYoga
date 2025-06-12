
import { useState, useEffect } from 'react';
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

// Mock data for blog functionality until database tables are created
const mockBlogs: Blog[] = [
  {
    id: '1',
    user_id: 'mock-user-1',
    title: '10 Essential Yoga Poses for Beginners',
    slug: '10-essential-yoga-poses-beginners',
    excerpt: 'Discover the fundamental yoga poses every beginner should master to start their wellness journey.',
    content: `Starting your yoga journey can feel overwhelming with so many poses to learn. Here are 10 essential poses that will build your foundation:

1. Mountain Pose (Tadasana) - The foundation of all standing poses
2. Downward-Facing Dog (Adho Mukha Svanasana) - Great for building strength
3. Child's Pose (Balasana) - Perfect for rest and relaxation
4. Warrior I (Virabhadrasana I) - Builds strength and stability
5. Warrior II (Virabhadrasana II) - Improves focus and endurance
6. Tree Pose (Vrikshasana) - Enhances balance and concentration
7. Bridge Pose (Setu Bandhasana) - Strengthens the back and opens the heart
8. Seated Forward Bend (Paschimottanasana) - Improves flexibility
9. Cobra Pose (Bhujangasana) - Strengthens the spine
10. Corpse Pose (Savasana) - Essential for relaxation and integration

Remember to listen to your body and never force a pose. Yoga is about progress, not perfection.`,
    image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3',
    category: 'yoga',
    tags: ['yoga', 'beginners', 'poses', 'wellness'],
    status: 'published',
    featured: true,
    views_count: 1250,
    likes_count: 89,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    author: {
      full_name: 'Sarah Johnson',
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3'
    },
    is_liked: false
  },
  {
    id: '2',
    user_id: 'mock-user-2',
    title: 'The Ultimate Guide to Home Gym Setup',
    slug: 'ultimate-guide-home-gym-setup',
    excerpt: 'Learn how to create an effective home gym on any budget with essential equipment and space optimization tips.',
    content: `Creating a home gym doesn't have to break the bank. Here's your complete guide:

**Essential Equipment for Beginners:**
- Resistance bands
- Adjustable dumbbells
- Yoga mat
- Pull-up bar
- Kettlebell

**Space Optimization:**
- Use wall-mounted storage
- Choose multi-functional equipment
- Consider foldable options
- Designate a specific workout area

**Budget-Friendly Tips:**
- Start small and build gradually
- Look for used equipment
- DIY alternatives (water jugs as weights)
- Focus on bodyweight exercises first

**Creating the Right Environment:**
- Good ventilation
- Proper lighting
- Motivational decor
- Mirror for form checking

Remember, the best home gym is one you'll actually use. Start with basics and expand as your fitness journey progresses.`,
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3',
    category: 'fitness',
    tags: ['home gym', 'fitness', 'equipment', 'budget'],
    status: 'published',
    featured: false,
    views_count: 950,
    likes_count: 67,
    created_at: '2024-01-12T14:30:00Z',
    updated_at: '2024-01-12T14:30:00Z',
    author: {
      full_name: 'Mike Chen',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3'
    },
    is_liked: false
  },
  {
    id: '3',
    user_id: 'mock-user-3',
    title: 'Spa Treatments for Stress Relief: A Complete Guide',
    slug: 'spa-treatments-stress-relief-guide',
    excerpt: 'Explore various spa treatments that can help you unwind and manage stress effectively.',
    content: `In today's fast-paced world, stress relief is more important than ever. Here are the most effective spa treatments:

**Massage Therapy:**
- Swedish massage for general relaxation
- Deep tissue for muscle tension
- Hot stone for deep relaxation
- Aromatherapy for emotional wellness

**Body Treatments:**
- Body wraps for detoxification
- Exfoliating scrubs for renewal
- Mud baths for purification
- Hydrotherapy for circulation

**Facial Treatments:**
- Classic European facial
- Anti-aging treatments
- Acne-focused facials
- Hydrating masks

**Holistic Approaches:**
- Reflexology
- Reiki energy healing
- Meditation sessions
- Breathing workshops

**At-Home Spa Tips:**
- Create a calming environment
- Use essential oils
- Take regular bath soaks
- Practice mindfulness

Regular spa treatments can significantly improve your mental health and overall well-being.`,
    image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3',
    category: 'spa',
    tags: ['spa', 'stress relief', 'wellness', 'relaxation'],
    status: 'published',
    featured: true,
    views_count: 1100,
    likes_count: 78,
    created_at: '2024-01-10T09:15:00Z',
    updated_at: '2024-01-10T09:15:00Z',
    author: {
      full_name: 'Emma Williams',
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3'
    },
    is_liked: false
  },
  {
    id: '4',
    user_id: 'mock-user-4',
    title: 'Nutrition Tips for Optimal Workout Performance',
    slug: 'nutrition-tips-optimal-workout-performance',
    excerpt: 'Fuel your workouts with the right nutrition strategies for maximum performance and recovery.',
    content: `Proper nutrition is the foundation of any successful fitness routine. Here's how to fuel your body:

**Pre-Workout Nutrition:**
- Eat 30-60 minutes before exercising
- Focus on easily digestible carbs
- Include a small amount of protein
- Stay hydrated

**During Workout:**
- Water for sessions under 60 minutes
- Sports drinks for longer sessions
- Listen to your body's needs

**Post-Workout Recovery:**
- Consume protein within 30 minutes
- Include carbohydrates to replenish glycogen
- Rehydrate adequately
- Consider anti-inflammatory foods

**Daily Nutrition Guidelines:**
- Eat whole, unprocessed foods
- Balance macronutrients (carbs, protein, fats)
- Include plenty of vegetables and fruits
- Time your meals around workouts

**Supplements to Consider:**
- Whey protein powder
- Creatine for strength training
- Omega-3 fatty acids
- Vitamin D

Remember, nutrition needs vary by individual, workout intensity, and fitness goals. Consider consulting with a registered dietitian for personalized advice.`,
    image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3',
    category: 'nutrition',
    tags: ['nutrition', 'fitness', 'performance', 'recovery'],
    status: 'published',
    featured: false,
    views_count: 820,
    likes_count: 55,
    created_at: '2024-01-08T16:45:00Z',
    updated_at: '2024-01-08T16:45:00Z',
    author: {
      full_name: 'Dr. Alex Rivera',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3'
    },
    is_liked: false
  }
];

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setBlogs(mockBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async (blogData: Partial<Blog>) => {
    try {
      // Simulate creating a blog
      const newBlog: Blog = {
        id: Date.now().toString(),
        user_id: 'current-user',
        title: blogData.title || '',
        slug: blogData.title?.toLowerCase().replace(/\s+/g, '-') || '',
        excerpt: blogData.excerpt,
        content: blogData.content || '',
        image_url: blogData.image_url,
        category: blogData.category || 'wellness',
        tags: blogData.tags || [],
        status: 'published',
        featured: false,
        views_count: 0,
        likes_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        author: {
          full_name: 'Current User',
          avatar_url: undefined
        },
        is_liked: false
      };

      setBlogs(prev => [newBlog, ...prev]);
      toast.success('Blog created successfully!');
      return newBlog;
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Failed to create blog');
      throw error;
    }
  };

  const updateBlog = async (id: string, blogData: Partial<Blog>) => {
    try {
      setBlogs(prev => prev.map(blog => 
        blog.id === id 
          ? { ...blog, ...blogData, updated_at: new Date().toISOString() }
          : blog
      ));
      toast.success('Blog updated successfully!');
      return blogData;
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog');
      throw error;
    }
  };

  const likeBlog = async (blogId: string) => {
    try {
      setBlogs(prev => prev.map(blog => {
        if (blog.id === blogId) {
          const isLiked = !blog.is_liked;
          return {
            ...blog,
            is_liked: isLiked,
            likes_count: isLiked ? blog.likes_count + 1 : blog.likes_count - 1
          };
        }
        return blog;
      }));
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
