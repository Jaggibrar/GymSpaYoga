-- Add only the missing foreign key constraints
-- First, let's add the constraints that don't exist yet

-- Check if constraint exists and add if missing
DO $$ 
BEGIN
    -- Add foreign key for in_app_notifications -> auth.users if not exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_notifications_user_id' 
        AND table_name = 'in_app_notifications'
    ) THEN
        ALTER TABLE public.in_app_notifications 
        ADD CONSTRAINT fk_notifications_user_id 
        FOREIGN KEY (user_id) REFERENCES auth.users(id) 
        ON DELETE CASCADE;
    END IF;

    -- Add foreign key for user_profiles -> auth.users if not exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_user_profiles_user_id' 
        AND table_name = 'user_profiles'
    ) THEN
        ALTER TABLE public.user_profiles 
        ADD CONSTRAINT fk_user_profiles_user_id 
        FOREIGN KEY (user_id) REFERENCES auth.users(id) 
        ON DELETE CASCADE;
    END IF;

    -- Add foreign key for business_profiles -> auth.users if not exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_business_profiles_user_id' 
        AND table_name = 'business_profiles'
    ) THEN
        ALTER TABLE public.business_profiles 
        ADD CONSTRAINT fk_business_profiles_user_id 
        FOREIGN KEY (user_id) REFERENCES auth.users(id) 
        ON DELETE CASCADE;
    END IF;

    -- Add foreign key for trainer_profiles -> auth.users if not exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_trainer_profiles_user_id' 
        AND table_name = 'trainer_profiles'
    ) THEN
        ALTER TABLE public.trainer_profiles 
        ADD CONSTRAINT fk_trainer_profiles_user_id 
        FOREIGN KEY (user_id) REFERENCES auth.users(id) 
        ON DELETE CASCADE;
    END IF;

END $$;