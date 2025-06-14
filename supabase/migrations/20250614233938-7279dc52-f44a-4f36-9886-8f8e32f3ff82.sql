
-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('business_owner', 'end_user');

-- Add role column to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN role public.user_role DEFAULT 'end_user';

-- Create business dashboard stats table
CREATE TABLE public.business_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.business_profiles(id) ON DELETE CASCADE,
  profile_visits INTEGER DEFAULT 0,
  leads_received INTEGER DEFAULT 0,
  leads_this_month INTEGER DEFAULT 0,
  monthly_revenue INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create customer inquiries table
CREATE TABLE public.customer_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.business_profiles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'responded', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- Create user wishlist table
CREATE TABLE public.user_wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.business_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, business_id)
);

-- Create business verification documents table
CREATE TABLE public.business_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.business_profiles(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('gst', 'id_proof', 'business_license', 'other')),
  document_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on new tables
ALTER TABLE public.business_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_documents ENABLE ROW LEVEL SECURITY;

-- RLS policies for business_stats
CREATE POLICY "Business owners can view their stats" ON public.business_stats
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.business_profiles bp 
      WHERE bp.id = business_id AND bp.user_id = auth.uid()
    )
  );

-- RLS policies for customer_inquiries
CREATE POLICY "Business owners can view their inquiries" ON public.customer_inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.business_profiles bp 
      WHERE bp.id = business_id AND bp.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create inquiries" ON public.customer_inquiries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for user_wishlist
CREATE POLICY "Users can manage their wishlist" ON public.user_wishlist
  FOR ALL USING (auth.uid() = user_id);

-- RLS policies for business_documents
CREATE POLICY "Business owners can manage their documents" ON public.business_documents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.business_profiles bp 
      WHERE bp.id = business_id AND bp.user_id = auth.uid()
    )
  );

-- Function to update business stats
CREATE OR REPLACE FUNCTION update_business_profile_visit(business_profile_id UUID)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.business_stats (business_id, profile_visits)
  VALUES (business_profile_id, 1)
  ON CONFLICT (business_id) 
  DO UPDATE SET 
    profile_visits = business_stats.profile_visits + 1,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
