-- Create indexes for blog searches and filtering for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON blogs(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_author_id ON blogs(author_id);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_views_count ON blogs(views_count DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_likes_count ON blogs(likes_count DESC);

-- Create full-text search index for blog content
CREATE INDEX IF NOT EXISTS idx_blogs_search ON blogs USING gin(to_tsvector('english', title || ' ' || content || ' ' || COALESCE(excerpt, '')));

-- Update RLS policies to allow viewing published blogs without authentication
DROP POLICY IF EXISTS "Everyone can view published blogs" ON blogs;
CREATE POLICY "Everyone can view published blogs" 
ON blogs 
FOR SELECT 
USING (published = true);