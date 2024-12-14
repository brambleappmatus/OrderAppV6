-- Create shelter_rescue_of_the_week table if it doesn't exist
CREATE TABLE IF NOT EXISTS shelter_rescue_of_the_week (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  image_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE shelter_rescue_of_the_week ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON shelter_rescue_of_the_week
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable write access for authenticated users" ON shelter_rescue_of_the_week
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);