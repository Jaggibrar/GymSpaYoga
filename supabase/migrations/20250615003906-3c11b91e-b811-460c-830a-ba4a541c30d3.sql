
-- Update user_profiles table to ensure role is properly set
UPDATE user_profiles 
SET role = 'end_user' 
WHERE role IS NULL;

-- Make role column not nullable with default
ALTER TABLE user_profiles 
ALTER COLUMN role SET DEFAULT 'end_user',
ALTER COLUMN role SET NOT NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_business_profiles_category ON business_profiles(category);
CREATE INDEX IF NOT EXISTS idx_business_profiles_status ON business_profiles(status);
CREATE INDEX IF NOT EXISTS idx_business_profiles_city ON business_profiles(city);
CREATE INDEX IF NOT EXISTS idx_trainer_profiles_category ON trainer_profiles(category);
CREATE INDEX IF NOT EXISTS idx_trainer_profiles_status ON trainer_profiles(status);
CREATE INDEX IF NOT EXISTS idx_trainer_profiles_location ON trainer_profiles(location);

-- Add a function to determine pricing tier based on monthly/session price
CREATE OR REPLACE FUNCTION get_pricing_tier(monthly_price INTEGER, session_price INTEGER)
RETURNS TEXT AS $$
BEGIN
  IF monthly_price IS NOT NULL THEN
    IF monthly_price >= 5000 THEN
      RETURN 'luxury';
    ELSIF monthly_price >= 3000 THEN
      RETURN 'premium';
    ELSE
      RETURN 'budget';
    END IF;
  ELSIF session_price IS NOT NULL THEN
    IF session_price >= 2000 THEN
      RETURN 'luxury';
    ELSIF session_price >= 1000 THEN
      RETURN 'premium';
    ELSE
      RETURN 'budget';
    END IF;
  ELSE
    RETURN 'budget';
  END IF;
END;
$$ LANGUAGE plpgsql;
