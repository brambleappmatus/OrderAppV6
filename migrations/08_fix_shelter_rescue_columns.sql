-- Drop existing table if it exists
DROP TABLE IF EXISTS shelter_rescue_of_the_week CASCADE;

-- Create shelter_rescue_of_the_week table with correct columns
CREATE TABLE shelter_rescue_of_the_week (
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

-- Create policies with proper permissions
CREATE POLICY "Enable read access for all users" ON shelter_rescue_of_the_week
    FOR SELECT
    TO PUBLIC
    USING (true);

CREATE POLICY "Enable all access for anon" ON shelter_rescue_of_the_week
    FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);

-- Grant necessary permissions
GRANT ALL ON shelter_rescue_of_the_week TO anon;
GRANT ALL ON shelter_rescue_of_the_week TO authenticated;