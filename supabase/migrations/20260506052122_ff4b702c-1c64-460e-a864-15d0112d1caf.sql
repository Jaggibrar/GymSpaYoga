-- Health Challenge progress tracking
CREATE TABLE public.health_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  health_score INTEGER NOT NULL DEFAULT 0,
  quiz_pct INTEGER NOT NULL DEFAULT 0,
  task_pct INTEGER NOT NULL DEFAULT 0,
  quiz_correct INTEGER NOT NULL DEFAULT 0,
  quiz_total INTEGER NOT NULL DEFAULT 0,
  earned_points INTEGER NOT NULL DEFAULT 0,
  total_points INTEGER NOT NULL DEFAULT 0,
  quiz_answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  completed_tasks JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_health_progress_user_created ON public.health_progress(user_id, created_at DESC);

ALTER TABLE public.health_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own health progress"
  ON public.health_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own health progress"
  ON public.health_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health progress"
  ON public.health_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

GRANT SELECT, INSERT, DELETE ON public.health_progress TO authenticated;