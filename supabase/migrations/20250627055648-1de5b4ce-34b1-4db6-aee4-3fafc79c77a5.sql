
-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  featured_image_url TEXT,
  category TEXT NOT NULL DEFAULT 'wellness',
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT DEFAULT 'draft',
  views_count INTEGER NOT NULL DEFAULT 0,
  likes_count INTEGER NOT NULL DEFAULT 0,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published_at TIMESTAMP WITH TIME ZONE,
  meta_description TEXT,
  read_time_minutes INTEGER DEFAULT 5
);

-- Create blog_likes table for tracking user likes
CREATE TABLE public.blog_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES public.blogs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(blog_id, user_id)
);

-- Create blog_comments table
CREATE TABLE public.blog_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES public.blogs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES public.blog_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on blogs table
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- RLS policies for blogs
CREATE POLICY "Everyone can view published blogs" ON public.blogs
  FOR SELECT USING (published = true);

CREATE POLICY "Authors can view their own blogs" ON public.blogs
  FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Authenticated users can create blogs" ON public.blogs
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own blogs" ON public.blogs
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own blogs" ON public.blogs
  FOR DELETE USING (auth.uid() = author_id);

-- Enable RLS on blog_likes table
ALTER TABLE public.blog_likes ENABLE ROW LEVEL SECURITY;

-- RLS policies for blog_likes
CREATE POLICY "Users can view all blog likes" ON public.blog_likes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their own likes" ON public.blog_likes
  FOR ALL USING (auth.uid() = user_id);

-- Enable RLS on blog_comments table
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- RLS policies for blog_comments
CREATE POLICY "Everyone can view comments on published blogs" ON public.blog_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.blogs 
      WHERE blogs.id = blog_comments.blog_id 
      AND blogs.published = true
    )
  );

CREATE POLICY "Authenticated users can create comments" ON public.blog_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON public.blog_comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON public.blog_comments
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_blogs_published ON public.blogs(published);
CREATE INDEX idx_blogs_author_id ON public.blogs(author_id);
CREATE INDEX idx_blogs_slug ON public.blogs(slug);
CREATE INDEX idx_blogs_category ON public.blogs(category);
CREATE INDEX idx_blogs_created_at ON public.blogs(created_at DESC);
CREATE INDEX idx_blog_likes_blog_id ON public.blog_likes(blog_id);
CREATE INDEX idx_blog_comments_blog_id ON public.blog_comments(blog_id);
