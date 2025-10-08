-- ================================================
-- COMPREHENSIVE SECURITY FIX - DATABASE ONLY
-- ================================================

-- Step 1: Security definer functions
-- ================================================

CREATE OR REPLACE FUNCTION public.is_super_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM admin_permissions WHERE user_id = user_uuid AND 'super_admin' = ANY(permissions)); $$;

CREATE OR REPLACE FUNCTION public.has_admin_permission(permission_name text, user_uuid uuid DEFAULT auth.uid())
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM admin_permissions WHERE user_id = user_uuid AND permission_name = ANY(permissions)); $$;

-- Step 2: Drop admin_users table
-- ================================================

DROP TABLE IF EXISTS public.admin_users CASCADE;

-- Step 3: Recreate business_profiles policies
-- ================================================

DROP POLICY IF EXISTS "Admins can manage all business profiles" ON public.business_profiles;
DROP POLICY IF EXISTS "Authenticated users can view approved businesses" ON public.business_profiles;
DROP POLICY IF EXISTS "Users can create their own business profile" ON public.business_profiles;
DROP POLICY IF EXISTS "Users can update their own business profile" ON public.business_profiles;
DROP POLICY IF EXISTS "Users can view their own business profile" ON public.business_profiles;

CREATE POLICY "Own business view" ON public.business_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin view all" ON public.business_profiles FOR SELECT USING (public.is_super_admin());
CREATE POLICY "Own business create" ON public.business_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own business update" ON public.business_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admin manage all" ON public.business_profiles FOR ALL USING (public.is_super_admin());

-- Step 4: Recreate trainer_profiles policies
-- ================================================

DROP POLICY IF EXISTS "Admins can update all trainer profiles" ON public.trainer_profiles;
DROP POLICY IF EXISTS "Admins can view all trainer profiles" ON public.trainer_profiles;
DROP POLICY IF EXISTS "Allow users to delete their own trainer profiles" ON public.trainer_profiles;
DROP POLICY IF EXISTS "Allow users to insert trainer profiles" ON public.trainer_profiles;
DROP POLICY IF EXISTS "Allow users to select their own trainer profiles" ON public.trainer_profiles;
DROP POLICY IF EXISTS "Allow users to update their own trainer profiles" ON public.trainer_profiles;
DROP POLICY IF EXISTS "Users can create their own trainer profile" ON public.trainer_profiles;
DROP POLICY IF EXISTS "Users can update their own trainer profile" ON public.trainer_profiles;
DROP POLICY IF EXISTS "Users can view their own trainer profile" ON public.trainer_profiles;

CREATE POLICY "Own trainer view" ON public.trainer_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin view trainers" ON public.trainer_profiles FOR SELECT USING (public.is_super_admin());
CREATE POLICY "Own trainer create" ON public.trainer_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own trainer update" ON public.trainer_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own trainer delete" ON public.trainer_profiles FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Admin manage trainers" ON public.trainer_profiles FOR ALL USING (public.is_super_admin());

-- Step 5: Recreate bookings policies
-- ================================================

DROP POLICY IF EXISTS "Admins can update booking status" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Business owners can update bookings for their business" ON public.bookings;
DROP POLICY IF EXISTS "Business owners can view bookings for their business" ON public.bookings;
DROP POLICY IF EXISTS "Users can create their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;

CREATE POLICY "Own bookings view" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Business owner bookings" ON public.bookings FOR SELECT USING (EXISTS (SELECT 1 FROM business_profiles WHERE id = bookings.business_id AND user_id = auth.uid()));
CREATE POLICY "Trainer bookings" ON public.bookings FOR SELECT USING (EXISTS (SELECT 1 FROM trainer_profiles WHERE id = bookings.trainer_id AND user_id = auth.uid()));
CREATE POLICY "Own bookings insert" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own bookings update" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Business update bookings" ON public.bookings FOR UPDATE USING (EXISTS (SELECT 1 FROM business_profiles WHERE id = bookings.business_id AND user_id = auth.uid()));
CREATE POLICY "Admin view bookings" ON public.bookings FOR SELECT USING (public.is_super_admin());
CREATE POLICY "Admin update bookings" ON public.bookings FOR UPDATE USING (public.is_super_admin());

-- Step 6: Force RLS and secure access
-- ================================================

ALTER TABLE public.business_profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE public.trainer_profiles FORCE ROW LEVEL SECURITY;
REVOKE ALL ON public.business_profiles FROM anon, authenticated;
REVOKE ALL ON public.trainer_profiles FROM anon, authenticated;
GRANT SELECT ON public.public_business_listings TO anon, authenticated;
GRANT SELECT ON public.public_trainer_listings TO anon, authenticated;
GRANT SELECT, UPDATE ON public.business_profiles TO authenticated;
GRANT SELECT, UPDATE ON public.trainer_profiles TO authenticated;

-- Step 7: Audit tables
-- ================================================

CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  event_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin view logs" ON public.security_audit_log;
DROP POLICY IF EXISTS "System insert logs" ON public.security_audit_log;
CREATE POLICY "Admin view logs" ON public.security_audit_log FOR SELECT USING (public.is_super_admin());
CREATE POLICY "System insert logs" ON public.security_audit_log FOR INSERT WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.contact_access_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  business_id uuid REFERENCES business_profiles(id),
  trainer_id uuid REFERENCES trainer_profiles(id),
  access_reason text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.contact_access_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Own log view" ON public.contact_access_log;
DROP POLICY IF EXISTS "Owner log view" ON public.contact_access_log;
CREATE POLICY "Own log view" ON public.contact_access_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Owner log view" ON public.contact_access_log FOR SELECT USING (
  EXISTS (SELECT 1 FROM business_profiles WHERE id = contact_access_log.business_id AND user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM trainer_profiles WHERE id = contact_access_log.trainer_id AND user_id = auth.uid())
);

-- Step 8: Secure functions
-- ================================================

CREATE OR REPLACE FUNCTION public.log_admin_action(p_event_type text, p_event_data jsonb DEFAULT '{}'::jsonb)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$ BEGIN INSERT INTO security_audit_log (event_type, user_id, event_data) VALUES (p_event_type, auth.uid(), p_event_data); END; $$;

CREATE OR REPLACE FUNCTION public.get_business_contact_info_secure(business_id_param uuid)
RETURNS TABLE(email text, phone text) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$ BEGIN
  INSERT INTO contact_access_log (user_id, business_id, access_reason) VALUES (auth.uid(), business_id_param, 'contact_request');
  IF auth.uid() IS NOT NULL AND (
    EXISTS (SELECT 1 FROM business_profiles WHERE id = business_id_param AND user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM bookings WHERE business_id = business_id_param AND user_id = auth.uid() AND status IN ('pending', 'confirmed'))
    OR EXISTS (SELECT 1 FROM chat_rooms WHERE business_id = business_id_param AND user_id = auth.uid())
  ) THEN RETURN QUERY SELECT bp.email, bp.phone FROM business_profiles bp WHERE bp.id = business_id_param;
  ELSE RETURN QUERY SELECT NULL::text, NULL::text; END IF;
END; $$;

CREATE OR REPLACE FUNCTION public.get_trainer_contact_info_secure(trainer_id_param uuid)
RETURNS TABLE(email text, phone text) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$ BEGIN
  INSERT INTO contact_access_log (user_id, trainer_id, access_reason) VALUES (auth.uid(), trainer_id_param, 'contact_request');
  IF auth.uid() IS NOT NULL AND (
    EXISTS (SELECT 1 FROM trainer_profiles WHERE id = trainer_id_param AND user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM bookings WHERE trainer_id = trainer_id_param AND user_id = auth.uid() AND status IN ('pending', 'confirmed'))
    OR EXISTS (SELECT 1 FROM chat_rooms WHERE trainer_id = trainer_id_param AND user_id = auth.uid())
  ) THEN RETURN QUERY SELECT tp.email, tp.phone FROM trainer_profiles tp WHERE tp.id = trainer_id_param;
  ELSE RETURN QUERY SELECT NULL::text, NULL::text; END IF;
END; $$;