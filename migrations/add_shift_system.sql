-- Phase 1-4: Shift-Based Salary System
-- Run this in Supabase SQL Editor

-- 1. Shift Templates Table
CREATE TABLE IF NOT EXISTS shift_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  grace_period_minutes INTEGER DEFAULT 15,
  color VARCHAR(7) DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Staff Schedules Table (Assigned Shifts)
CREATE TABLE IF NOT EXISTS staff_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  shift_template_id UUID NOT NULL REFERENCES shift_templates(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(staff_id, scheduled_date, shift_template_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_shift_templates_store ON shift_templates(store_id);
CREATE INDEX IF NOT EXISTS idx_staff_schedules_staff ON staff_schedules(staff_id);
CREATE INDEX IF NOT EXISTS idx_staff_schedules_store ON staff_schedules(store_id);
CREATE INDEX IF NOT EXISTS idx_staff_schedules_date ON staff_schedules(scheduled_date);

-- Comments
COMMENT ON TABLE shift_templates IS 'Shift template definitions for stores';
COMMENT ON TABLE staff_schedules IS 'Scheduled shifts assigned to staff members';
COMMENT ON COLUMN shift_templates.grace_period_minutes IS 'Minutes of grace period for late arrival';
COMMENT ON COLUMN shift_templates.color IS 'Hex color code for calendar display';
