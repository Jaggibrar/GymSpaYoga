-- Add admin policies for trainer_profiles to allow admins to manage all trainer profiles
CREATE POLICY "Admins can view all trainer profiles" 
ON trainer_profiles 
FOR SELECT 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM admin_permissions 
  WHERE admin_permissions.user_id = auth.uid() 
  AND 'manage_listings' = ANY(admin_permissions.permissions)
));

CREATE POLICY "Admins can update all trainer profiles" 
ON trainer_profiles 
FOR UPDATE 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM admin_permissions 
  WHERE admin_permissions.user_id = auth.uid() 
  AND 'manage_listings' = ANY(admin_permissions.permissions)
));