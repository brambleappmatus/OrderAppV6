-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('rescues', 'rescues', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON storage.objects;
DROP POLICY IF EXISTS "Enable upload access for all users" ON storage.objects;
DROP POLICY IF EXISTS "Enable update access for all users" ON storage.objects;
DROP POLICY IF EXISTS "Enable delete access for all users" ON storage.objects;

-- Create new storage policies
CREATE POLICY "Public Access"
ON storage.objects FOR ALL
TO public
USING ( bucket_id = 'rescues' )
WITH CHECK ( bucket_id = 'rescues' );

-- Grant necessary permissions
GRANT ALL ON storage.objects TO anon;
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO anon;
GRANT ALL ON storage.buckets TO authenticated;