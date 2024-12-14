-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON shelter_rescue_of_the_week;
DROP POLICY IF EXISTS "Enable all access for anon" ON shelter_rescue_of_the_week;

-- Create new policies
CREATE POLICY "Public Access"
ON shelter_rescue_of_the_week FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Grant necessary permissions
GRANT ALL ON shelter_rescue_of_the_week TO public;