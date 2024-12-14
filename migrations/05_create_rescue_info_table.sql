-- Function to create rescue_info table
CREATE OR REPLACE FUNCTION create_rescue_info_table()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Create the table if it doesn't exist
  CREATE TABLE IF NOT EXISTS rescue_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    image_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  -- Enable RLS
  ALTER TABLE rescue_info ENABLE ROW LEVEL SECURITY;

  -- Create policies if they don't exist
  DO $$ 
  BEGIN
    -- Read policy
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'rescue_info' 
      AND policyname = 'Enable read access for all users'
    ) THEN
      CREATE POLICY "Enable read access for all users" ON rescue_info
        FOR SELECT
        TO public
        USING (true);
    END IF;

    -- Write policy
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'rescue_info' 
      AND policyname = 'Enable write access for authenticated users'
    ) THEN
      CREATE POLICY "Enable write access for authenticated users" ON rescue_info
        FOR ALL
        TO authenticated
        USING (true)
        WITH CHECK (true);
    END IF;
  END $$;
END;
$$;

-- Execute the function to create the table
SELECT create_rescue_info_table();