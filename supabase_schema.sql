-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum for Submission Type
CREATE TYPE submission_type AS ENUM ('elogio', 'reclamação', 'sugestão', 'desabafo');

-- Enum for Mood
CREATE TYPE mood_type AS ENUM ('feliz', 'contente', 'neutro', 'chateado', 'bravo');

-- Main Table: Submissions
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type submission_type NOT NULL,
    message TEXT NOT NULL CHECK (char_length(message) > 0),
    mood mood_type,
    category TEXT, -- 'Comunicação', 'Liderança', etc.
    cycle TEXT DEFAULT 'Q1-2025', -- Can be updated via trigger or app logic
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Security: Enable it
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Policy 1: allow anonymous inserts (public)
-- "True" means anyone can insert. We rely on the app to validate data, 
-- but at the DB level, we allow the insertion.
CREATE POLICY "Allow public anonymous submissions"
ON submissions
FOR INSERT
TO public
WITH CHECK (true);

-- Policy 2: Allow SELECT only for service role (admin)
-- Users cannot read submissions.
-- Note: 'service_role' bypasses RLS, so strictly we don't need a policy for it,
-- but we explicitly strictly 'public' from SELECT.
CREATE POLICY "Deny public select"
ON submissions
FOR SELECT
TO public
USING (false);

-- Index for analytics (optional)
CREATE INDEX idx_submissions_cycle ON submissions(cycle);
CREATE INDEX idx_submissions_created_at ON submissions(created_at);
