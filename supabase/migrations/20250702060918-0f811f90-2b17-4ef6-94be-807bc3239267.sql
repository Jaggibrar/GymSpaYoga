-- Create admin user roles and permissions system
CREATE TABLE IF NOT EXISTS public.admin_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  permissions TEXT[] NOT NULL DEFAULT ARRAY['view_dashboard', 'manage_listings', 'manage_users', 'manage_payments', 'manage_content', 'view_analytics'],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_permissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can view admin permissions" 
ON public.admin_permissions 
FOR SELECT 
USING (user_id = auth.uid() OR EXISTS (
  SELECT 1 FROM public.admin_permissions ap 
  WHERE ap.user_id = auth.uid() AND 'manage_users' = ANY(ap.permissions)
));

CREATE POLICY "Super admins can manage admin permissions" 
ON public.admin_permissions 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_permissions ap 
  WHERE ap.user_id = auth.uid() AND 'manage_users' = ANY(ap.permissions)
));

-- Create admin analytics table
CREATE TABLE IF NOT EXISTS public.admin_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value INTEGER NOT NULL DEFAULT 0,
  metric_date DATE NOT NULL DEFAULT CURRENT_DATE,
  additional_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Admins can view analytics" 
ON public.admin_analytics 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.admin_permissions ap 
  WHERE ap.user_id = auth.uid() AND 'view_analytics' = ANY(ap.permissions)
));

-- Create function to check admin permissions
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_permissions
    WHERE user_id = user_uuid
  );
$$;

-- Create function to check specific admin permission
CREATE OR REPLACE FUNCTION public.has_admin_permission(permission_name TEXT, user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_permissions
    WHERE user_id = user_uuid AND permission_name = ANY(permissions)
  );
$$;