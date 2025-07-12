-- Fix the infinite recursion in admin_permissions policies
-- Drop the problematic policies first
DROP POLICY IF EXISTS "Admins can view admin permissions" ON admin_permissions;
DROP POLICY IF EXISTS "Super admins can manage admin permissions" ON admin_permissions;

-- Create new, simpler policies that don't cause recursion
CREATE POLICY "Users can view their own admin permissions" 
ON admin_permissions 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Service role can manage admin permissions" 
ON admin_permissions 
FOR ALL 
USING (auth.jwt() ->> 'role' = 'service_role');