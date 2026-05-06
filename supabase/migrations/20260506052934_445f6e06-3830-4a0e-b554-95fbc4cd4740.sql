INSERT INTO public.trainer_profiles (
  user_id, name, email, phone, category, trainer_tier,
  experience, certifications, hourly_rate, location, bio,
  profile_image_url, specializations, status
) VALUES (
  '442f91b4-a577-4803-8012-97531e38591e',
  'Sudarshan T.A',
  'sudarshanta11@gmail.com',
  '+966501963069',
  'gym',
  'elite',
  9,
  'Advance Personal Fitness Trainer (Gold''s Gym Fitness Institute, 2018); Diploma in Sports Massage Therapy (ICPEM, 2022-2023); Hammer Strength Clinic Training (Life Fitness, 2018); CPR & First Aid (Four Seasons Hotel Bengaluru, 2019).',
  2500,
  'Bangalore, Karnataka',
  'Dedicated fitness instructor with 9+ years of international experience across luxury hotels and resorts including Four Seasons (Bengaluru & Seychelles), Marriott Renaissance, and the NEOM project in Saudi Arabia. Specialist in CrossFit, body transformation, fat loss, strength & conditioning, injury prevention, sports massage therapy, and personalized program design.',
  '/trainer-certs/sudarshan/profile.jpg',
  ARRAY['CrossFit & Functional Training','Body Transformation','Fat Loss & Weight Management','Strength & Conditioning','Injury Prevention','Sports Massage Therapy','Personalized Program Design','Nutritional Coaching']::text[],
  'approved'
);

CREATE TABLE public.trainer_certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL REFERENCES public.trainer_profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  title TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_trainer_certificates_trainer ON public.trainer_certificates(trainer_id, sort_order);

ALTER TABLE public.trainer_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view approved trainer certificates"
  ON public.trainer_certificates FOR SELECT
  TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.trainer_profiles tp
    WHERE tp.id = trainer_certificates.trainer_id AND tp.status = 'approved'
  ));

CREATE POLICY "Super admins can manage trainer certificates"
  ON public.trainer_certificates FOR ALL
  TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

CREATE POLICY "Trainers can manage their own certificates"
  ON public.trainer_certificates FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.trainer_profiles tp
    WHERE tp.id = trainer_certificates.trainer_id AND tp.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.trainer_profiles tp
    WHERE tp.id = trainer_certificates.trainer_id AND tp.user_id = auth.uid()
  ));

GRANT SELECT ON public.trainer_certificates TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.trainer_certificates TO authenticated;

INSERT INTO public.trainer_certificates (trainer_id, image_url, title, sort_order)
SELECT id, '/trainer-certs/sudarshan/cert-golds-gym.jpeg', 'Advance Personal Fitness Trainer — Gold''s Gym Fitness Institute', 1
FROM public.trainer_profiles WHERE email = 'sudarshanta11@gmail.com' LIMIT 1;

INSERT INTO public.trainer_certificates (trainer_id, image_url, title, sort_order)
SELECT id, '/trainer-certs/sudarshan/cert-icpem-diploma.jpeg', 'Diploma in Sports Massage Therapy — ICPEM (2022-2023)', 2
FROM public.trainer_profiles WHERE email = 'sudarshanta11@gmail.com' LIMIT 1;

INSERT INTO public.trainer_certificates (trainer_id, image_url, title, sort_order)
SELECT id, '/trainer-certs/sudarshan/cert-hammer-strength.jpeg', 'Hammer Strength Clinic Training — Life Fitness (2018)', 3
FROM public.trainer_profiles WHERE email = 'sudarshanta11@gmail.com' LIMIT 1;

INSERT INTO public.trainer_certificates (trainer_id, image_url, title, sort_order)
SELECT id, '/trainer-certs/sudarshan/cert-four-seasons-5yr.jpeg', 'Certificate of Appreciation — 5 Years of Service, Four Seasons', 4
FROM public.trainer_profiles WHERE email = 'sudarshanta11@gmail.com' LIMIT 1;

INSERT INTO public.trainer_certificates (trainer_id, image_url, title, sort_order)
SELECT id, '/trainer-certs/sudarshan/cert-star-of-the-month.jpeg', 'Star of the Month — Four Seasons Bengaluru (April 2022)', 5
FROM public.trainer_profiles WHERE email = 'sudarshanta11@gmail.com' LIMIT 1;