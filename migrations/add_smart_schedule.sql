-- Smart Schedule System
-- Run this in Supabase SQL Editor

-- 1. Staff Availability Table
-- Stores which shifts each staff member is available for in a specific week
CREATE TABLE IF NOT EXISTS staff_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL, -- Monday of the week (YYYY-MM-DD)
  shift_template_id UUID NOT NULL REFERENCES shift_templates(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(staff_id, week_start_date, shift_template_id, day_of_week)
);

-- 2. Shift Requirements Table
-- Stores how many staff are needed for each shift on each day
CREATE TABLE IF NOT EXISTS shift_requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  shift_template_id UUID NOT NULL REFERENCES shift_templates(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  required_staff_count INTEGER NOT NULL CHECK (required_staff_count >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(store_id, week_start_date, shift_template_id, day_of_week)
);

-- 3. Schedule Generation History Table
-- Tracks each time a smart schedule is generated
CREATE TABLE IF NOT EXISTS schedule_generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  total_shifts_required INTEGER NOT NULL DEFAULT 0,
  total_shifts_filled INTEGER NOT NULL DEFAULT 0,
  coverage_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
  fairness_score INTEGER NOT NULL DEFAULT 0,
  total_warnings INTEGER NOT NULL DEFAULT 0,
  is_accepted BOOLEAN NOT NULL DEFAULT false,
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add field to staff_schedules to track AI-generated schedules
ALTER TABLE staff_schedules
ADD COLUMN IF NOT EXISTS generation_id UUID REFERENCES schedule_generations(id) ON DELETE SET NULL;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_staff_availability_staff ON staff_availability(staff_id);
CREATE INDEX IF NOT EXISTS idx_staff_availability_store ON staff_availability(store_id);
CREATE INDEX IF NOT EXISTS idx_staff_availability_week ON staff_availability(week_start_date);

CREATE INDEX IF NOT EXISTS idx_shift_requirements_store ON shift_requirements(store_id);
CREATE INDEX IF NOT EXISTS idx_shift_requirements_week ON shift_requirements(week_start_date);

CREATE INDEX IF NOT EXISTS idx_schedule_generations_store ON schedule_generations(store_id);
CREATE INDEX IF NOT EXISTS idx_schedule_generations_week ON schedule_generations(week_start_date);

CREATE INDEX IF NOT EXISTS idx_staff_schedules_generation ON staff_schedules(generation_id);

-- Comments
COMMENT ON TABLE staff_availability IS 'Staff availability preferences for each shift in target week';
COMMENT ON TABLE shift_requirements IS 'Required number of staff for each shift per day';
COMMENT ON TABLE schedule_generations IS 'History of smart schedule generation attempts';

COMMENT ON COLUMN staff_availability.day_of_week IS '0=Sunday, 1=Monday, ..., 6=Saturday';
COMMENT ON COLUMN staff_availability.week_start_date IS 'Monday of the target week';
COMMENT ON COLUMN shift_requirements.required_staff_count IS 'Number of staff needed for this shift';
COMMENT ON COLUMN schedule_generations.coverage_percent IS 'Percentage of shifts successfully filled (0-100)';
COMMENT ON COLUMN schedule_generations.fairness_score IS 'Fairness score 0-100 (higher = more fair distribution)';
COMMENT ON COLUMN schedule_generations.is_accepted IS 'Whether owner accepted this generated schedule';

-- Enable RLS
ALTER TABLE staff_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE shift_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_generations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for staff_availability
CREATE POLICY "Users can view availability for their store"
  ON staff_availability FOR SELECT
  USING (
    store_id IN (
      SELECT id FROM stores WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert availability for their store"
  ON staff_availability FOR INSERT
  WITH CHECK (
    store_id IN (
      SELECT id FROM stores WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update availability for their store"
  ON staff_availability FOR UPDATE
  USING (
    store_id IN (
      SELECT id FROM stores WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete availability for their store"
  ON staff_availability FOR DELETE
  USING (
    store_id IN (
      SELECT id FROM stores WHERE owner_id = auth.uid()
    )
  );

-- RLS Policies for shift_requirements
CREATE POLICY "Users can view requirements for their store"
  ON shift_requirements FOR SELECT
  USING (
    store_id IN (
      SELECT id FROM stores WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert requirements for their store"
  ON shift_requirements FOR INSERT
  WITH CHECK (
    store_id IN (
      SELECT id FROM stores WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update requirements for their store"
  ON shift_requirements FOR UPDATE
  USING (
    store_id IN (
      SELECT id FROM stores WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete requirements for their store"
  ON shift_requirements FOR DELETE
  USING (
    store_id IN (
      SELECT id FROM stores WHERE owner_id = auth.uid()
    )
  );

-- RLS Policies for schedule_generations
CREATE POLICY "Users can view generations for their store"
  ON schedule_generations FOR SELECT
  USING (
    store_id IN (
      SELECT id FROM stores WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert generations for their store"
  ON schedule_generations FOR INSERT
  WITH CHECK (
    store_id IN (
      SELECT id FROM stores WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update generations for their store"
  ON schedule_generations FOR UPDATE
  USING (
    store_id IN (
      SELECT id FROM stores WHERE owner_id = auth.uid()
    )
  );
