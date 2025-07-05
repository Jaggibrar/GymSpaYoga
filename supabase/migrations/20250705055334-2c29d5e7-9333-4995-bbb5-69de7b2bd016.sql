-- Fix unique constraint and grant admin access
ALTER TABLE public.admin_permissions ADD CONSTRAINT admin_permissions_user_id_unique UNIQUE (user_id);

-- Grant admin access to the specified user
SELECT public.grant_admin_access('jaggibrar001234@gmail.com');