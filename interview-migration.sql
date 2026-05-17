-- SkillSync AI Interview System — Database Schema
-- Run this in Supabase SQL Editor

-- Interview sessions
CREATE TABLE IF NOT EXISTS interview_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  interview_type TEXT NOT NULL,
  company_mode TEXT,
  target_company TEXT,
  difficulty TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'in_progress',
  config JSONB DEFAULT '{}',
  started_at TIMESTAMPTZ DEFAULT now(),
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Interview messages
CREATE TABLE IF NOT EXISTS interview_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES interview_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  voice_metrics JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Interview reports
CREATE TABLE IF NOT EXISTS interview_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES interview_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  technical_score INT,
  communication_score INT,
  confidence_score INT,
  problem_solving_score INT,
  recruiter_impression INT,
  placement_readiness INT,
  strengths TEXT[],
  weaknesses TEXT[],
  improvements TEXT[],
  roadmap JSONB,
  recruiter_verdict TEXT,
  detailed_feedback JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Code submissions
CREATE TABLE IF NOT EXISTS code_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES interview_sessions(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  stdin TEXT,
  stdout TEXT,
  stderr TEXT,
  exit_code INT,
  execution_time_ms INT,
  ai_analysis JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_submissions ENABLE ROW LEVEL SECURITY;

-- Users can CRUD their own sessions
CREATE POLICY "Users manage own sessions" ON interview_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Users can CRUD messages for their own sessions
CREATE POLICY "Users manage own messages" ON interview_messages
  FOR ALL USING (
    session_id IN (SELECT id FROM interview_sessions WHERE user_id = auth.uid())
  );

-- Users can CRUD their own reports
CREATE POLICY "Users manage own reports" ON interview_reports
  FOR ALL USING (auth.uid() = user_id);

-- Users can CRUD submissions for their own sessions
CREATE POLICY "Users manage own submissions" ON code_submissions
  FOR ALL USING (
    session_id IN (SELECT id FROM interview_sessions WHERE user_id = auth.uid())
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sessions_user ON interview_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_session ON interview_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_reports_session ON interview_reports(session_id);
CREATE INDEX IF NOT EXISTS idx_reports_user ON interview_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_session ON code_submissions(session_id);
