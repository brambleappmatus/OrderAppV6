-- Drop existing policies if they exist
DO $$ 
BEGIN
    -- Drop policies if they exist
    DROP POLICY IF EXISTS "Enable read access for all users" ON shelter_rescue_of_the_week;
    DROP POLICY IF EXISTS "Enable write access for authenticated users" ON shelter_rescue_of_the_week;
    DROP POLICY IF EXISTS "Enable all access for anon" ON shelter_rescue_of_the_week;
EXCEPTION
    WHEN undefined_object THEN 
        NULL;
END $$;

-- Ensure RLS is enabled
ALTER TABLE shelter_rescue_of_the_week ENABLE ROW LEVEL SECURITY;

-- Create new policies with proper permissions
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
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('rescues', 'rescues')
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Enable read access for all users"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'rescues');

CREATE POLICY "Enable upload access for all users"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'rescues');

CREATE POLICY "Enable update access for all users"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'rescues');

CREATE POLICY "Enable delete access for all users"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'rescues');

-- Grant storage permissions
GRANT ALL ON storage.objects TO anon;
GRANT ALL ON storage.objects TO authenticated;