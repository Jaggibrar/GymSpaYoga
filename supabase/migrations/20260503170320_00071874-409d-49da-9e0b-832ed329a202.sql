-- 1. Restrict PII column reads from anonymous users
REVOKE SELECT (email, phone) ON public.trainer_profiles FROM anon;
REVOKE SELECT (email, phone) ON public.business_profiles FROM anon;

-- 2. Lock down notifications table writes to service_role only
DROP POLICY IF EXISTS "System can update notification status" ON public.notifications;
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;

CREATE POLICY "Service role can insert notifications"
ON public.notifications
FOR INSERT
TO public
WITH CHECK ((auth.jwt() ->> 'role') = 'service_role');

CREATE POLICY "Service role can update notifications"
ON public.notifications
FOR UPDATE
TO public
USING ((auth.jwt() ->> 'role') = 'service_role')
WITH CHECK ((auth.jwt() ->> 'role') = 'service_role');

-- 3. grant_admin_access: require caller is already super_admin
CREATE OR REPLACE FUNCTION public.grant_admin_access(user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
    target_user_id uuid;
BEGIN
    -- Authorization: caller must already be a super admin
    IF NOT public.is_super_admin(auth.uid()) THEN
        RAISE EXCEPTION 'Unauthorized: only super admins can grant admin access';
    END IF;

    SELECT id INTO target_user_id
    FROM auth.users
    WHERE email = user_email;

    IF target_user_id IS NULL THEN
        RETURN FALSE;
    END IF;

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

REVOKE EXECUTE ON FUNCTION public.grant_admin_access(text) FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.grant_admin_access(text) TO authenticated;
-- (Internal authorization check inside function blocks non-super-admin callers.)