-- Grant admin access to a specific user (replace with actual email)
-- First, we need to add a specific user as admin
-- Note: Replace 'admin@gymspayoga.com' with the actual admin email address

-- Insert admin permission for the main admin user
-- This assumes the user has already signed up with email 'admin@gymspayoga.com'
-- You'll need to replace this with the actual user ID or email after they sign up

-- Create a function to grant admin access by email
CREATE OR REPLACE FUNCTION public.grant_admin_access(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Find user by email from auth.users
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    -- Check if user exists
    IF target_user_id IS NULL THEN
        RAISE NOTICE 'User with email % not found', user_email;
        RETURN FALSE;
    END IF;
    
    -- Insert admin permissions if not already exists
    INSERT INTO public.admin_permissions (user_id, role, permissions)
    VALUES (
        target_user_id, 
        'super_admin', 
        ARRAY['view_dashboard', 'manage_listings', 'manage_users', 'manage_payments', 'manage_content', 'view_analytics', 'super_admin']
    )
    ON CONFLICT (user_id) DO UPDATE SET
        role = 'super_admin',
        permissions = ARRAY['view_dashboard', 'manage_listings', 'manage_users', 'manage_payments', 'manage_content', 'view_analytics', 'super_admin'],
        updated_at = now();
    
    RETURN TRUE;
END;
$$;

-- Example usage (uncomment and replace with actual admin email):
-- SELECT public.grant_admin_access('admin@gymspayoga.com');