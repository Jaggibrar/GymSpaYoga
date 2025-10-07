-- Allow anonymous users to view business listings (for detail pages)
-- Contact information will be masked at the application layer using the secure function
CREATE POLICY "Anyone can view approved business details"
ON public.business_profiles
FOR SELECT
TO anon
USING (status = 'approved');

-- Note: This policy allows viewing all columns, but the application should use 
-- the get_business_contact_info() function to conditionally display contact info