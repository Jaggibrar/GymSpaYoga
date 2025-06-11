
-- Create trainers table with comprehensive fields
CREATE TABLE public.trainer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('gym', 'spa', 'yoga')),
  trainer_tier TEXT NOT NULL CHECK (trainer_tier IN ('elite', 'pro', 'intermediate', 'basic')),
  experience INTEGER NOT NULL,
  certifications TEXT,
  specializations TEXT[] DEFAULT '{}',
  hourly_rate INTEGER NOT NULL,
  location TEXT NOT NULL,
  bio TEXT NOT NULL,
  profile_image_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create businesses table with comprehensive fields
CREATE TABLE public.business_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL CHECK (business_type IN ('gym', 'spa', 'yoga')),
  category TEXT NOT NULL CHECK (category IN ('luxury', 'premium', 'budget')),
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pin_code TEXT NOT NULL,
  opening_time TIME NOT NULL,
  closing_time TIME NOT NULL,
  monthly_price INTEGER,
  session_price INTEGER,
  description TEXT,
  amenities TEXT[] DEFAULT '{}',
  image_urls TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.trainer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for trainer_profiles
CREATE POLICY "Users can view their own trainer profile" ON public.trainer_profiles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own trainer profile" ON public.trainer_profiles
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trainer profile" ON public.trainer_profiles
FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for business_profiles
CREATE POLICY "Users can view their own business profile" ON public.business_profiles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own business profile" ON public.business_profiles
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own business profile" ON public.business_profiles
FOR UPDATE USING (auth.uid() = user_id);

-- Create storage bucket for profile images
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-images', 'profile-images', true);

-- Create storage policies for profile images
CREATE POLICY "Anyone can view profile images" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-images');

CREATE POLICY "Authenticated users can upload profile images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'profile-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile images" ON storage.objects
FOR UPDATE USING (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create indexes for better performance
CREATE INDEX idx_trainer_profiles_user_id ON public.trainer_profiles(user_id);
CREATE INDEX idx_trainer_profiles_category ON public.trainer_profiles(category);
CREATE INDEX idx_business_profiles_user_id ON public.business_profiles(user_id);
CREATE INDEX idx_business_profiles_type ON public.business_profiles(business_type);
