-- Fix contact messages RLS policies for both anonymous and authenticated users

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON contact_messages;
DROP POLICY IF EXISTS "Public insert access for contact_messages" ON contact_messages;

-- Create comprehensive policy for contact message insertions
-- This allows both anonymous (anon) and authenticated users to insert contact messages
CREATE POLICY "Allow contact form submissions" 
  ON contact_messages 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy for anonymous users specifically
CREATE POLICY "Allow anonymous contact submissions"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to anon role
GRANT INSERT ON contact_messages TO anon;
GRANT INSERT ON contact_messages TO authenticated;

-- Also grant usage on the sequence for auto-incrementing IDs
GRANT USAGE ON SEQUENCE contact_messages_id_seq TO anon;
GRANT USAGE ON SEQUENCE contact_messages_id_seq TO authenticated;