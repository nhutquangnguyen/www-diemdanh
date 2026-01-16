-- Create shared_schedules table for public schedule sharing
-- This allows users to share their generated schedules via public links

CREATE TABLE IF NOT EXISTS shared_schedules (
  id VARCHAR(12) PRIMARY KEY, -- Short ID for URL (e.g., 'abc123xyz')
  schedule_data JSONB NOT NULL, -- Full schedule data (staff, shifts, assignments, stats)
  view_count INTEGER DEFAULT 0, -- Track how many times the schedule was viewed
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL, -- Auto-delete after expiration
  last_viewed_at TIMESTAMPTZ -- Track last view time
);

-- Index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_shared_schedules_expires_at ON shared_schedules(expires_at);

-- Index for cleanup queries
CREATE INDEX IF NOT EXISTS idx_shared_schedules_created_at ON shared_schedules(created_at);

-- Enable Row Level Security
ALTER TABLE shared_schedules ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read shared schedules (public access)
CREATE POLICY "Public schedules are viewable by anyone"
  ON shared_schedules
  FOR SELECT
  USING (true);

-- Policy: Anyone can insert (no auth required for free tool)
CREATE POLICY "Anyone can create shared schedules"
  ON shared_schedules
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow updating view count
CREATE POLICY "Anyone can update view count"
  ON shared_schedules
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Note: Run this SQL in your Supabase SQL Editor
-- Dashboard > SQL Editor > New Query > Paste and Run
