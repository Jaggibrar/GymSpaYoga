-- Create function to generate slug from business name and city
CREATE OR REPLACE FUNCTION public.generate_business_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  -- Only generate slug if it's null or empty, or if name/city changed
  IF NEW.slug IS NOT NULL AND NEW.slug != '' THEN
    IF TG_OP = 'INSERT' THEN
      RETURN NEW;
    ELSIF TG_OP = 'UPDATE' AND OLD.business_name = NEW.business_name AND OLD.city = NEW.city THEN
      RETURN NEW;
    END IF;
  END IF;

  -- Generate base slug from business name and city
  base_slug := lower(regexp_replace(
    regexp_replace(NEW.business_name || '-' || NEW.city, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  ));
  
  -- Remove multiple consecutive hyphens and trim
  base_slug := trim(both '-' from regexp_replace(base_slug, '-+', '-', 'g'));
  
  final_slug := base_slug;
  
  -- Check for uniqueness and add counter if needed
  WHILE EXISTS (SELECT 1 FROM public.business_profiles WHERE slug = final_slug AND id != NEW.id) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := final_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger to auto-generate slug on insert/update
DROP TRIGGER IF EXISTS generate_business_slug_trigger ON public.business_profiles;
CREATE TRIGGER generate_business_slug_trigger
BEFORE INSERT OR UPDATE ON public.business_profiles
FOR EACH ROW
EXECUTE FUNCTION public.generate_business_slug();