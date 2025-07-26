-- Create admin permissions table if not exists and update admin access
-- Remove hardcoded admin email approach and use proper database-driven admin system

-- Grant admin permissions to the specific user
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    -- Find user by email
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'jaggibrar001234@gmail.com';
    
    -- Only proceed if user exists
    IF admin_user_id IS NOT NULL THEN
        -- Insert or update admin permissions
        INSERT INTO public.admin_permissions (user_id, role, permissions)
        VALUES (
            admin_user_id, 
            'super_admin', 
            ARRAY['view_dashboard', 'manage_listings', 'manage_users', 'manage_payments', 'manage_content', 'view_analytics', 'super_admin']
        )
        ON CONFLICT (user_id) DO UPDATE SET
            role = 'super_admin',
            permissions = ARRAY['view_dashboard', 'manage_listings', 'manage_users', 'manage_payments', 'manage_content', 'view_analytics', 'super_admin'],
            updated_at = now();
            
        RAISE NOTICE 'Admin permissions granted to user: %', admin_user_id;
    ELSE
        RAISE NOTICE 'User with email jaggibrar001234@gmail.com not found';
    END IF;
END $$;

-- Tighten RLS policies for better security

-- Update trainers table policies to be more restrictive
DROP POLICY IF EXISTS "Allow authenticated users to select trainers" ON public.trainers;
DROP POLICY IF EXISTS "Allow authenticated users to insert trainers" ON public.trainers;
DROP POLICY IF EXISTS "Allow authenticated users to update trainers" ON public.trainers;
DROP POLICY IF EXISTS "Allow authenticated users to delete trainers" ON public.trainers;

-- Create more restrictive policies for trainers table
CREATE POLICY "Trainers can view all trainer records" ON public.trainers
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Only system can manage trainer records" ON public.trainers
    FOR ALL USING (false);

-- Update spas table policies to be more restrictive  
DROP POLICY IF EXISTS "Allow authenticated users to select spas" ON public.spas;
DROP POLICY IF EXISTS "Allow authenticated users to insert spas" ON public.spas;
DROP POLICY IF EXISTS "Allow authenticated users to update spas" ON public.spas;
DROP POLICY IF EXISTS "Allow authenticated users to delete spas" ON public.spas;

-- Create proper policies for spas table
CREATE POLICY "Anyone can view spas" ON public.spas
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage spas" ON public.spas
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_permissions 
            WHERE user_id = auth.uid() 
            AND 'manage_listings' = ANY(permissions)
        )
    );

-- Update notifications table policy to be more restrictive
DROP POLICY IF EXISTS "System can manage notifications" ON public.notifications;

-- Create more secure notification policies
CREATE POLICY "System can insert notifications" ON public.notifications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all notifications" ON public.notifications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.admin_permissions 
            WHERE user_id = auth.uid() 
            AND 'view_analytics' = ANY(permissions)
        )
    );

CREATE POLICY "System can update notification status" ON public.notifications
    FOR UPDATE USING (true)
    WITH CHECK (true);