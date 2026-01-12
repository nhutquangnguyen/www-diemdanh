-- Add hour_rate column to staff table
-- Run this in Supabase SQL Editor

ALTER TABLE staff
ADD COLUMN IF NOT EXISTS hour_rate DECIMAL(10, 2) DEFAULT 0;

-- Add comment
COMMENT ON COLUMN staff.hour_rate IS 'Hourly rate in VND';
