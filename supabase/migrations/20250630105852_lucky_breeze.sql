-- Fix RLS policies for contact_messages table to allow anonymous submissions

-- First, ensure RLS is enabled
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON contact_messages;
DROP POLICY IF EXISTS "Allow contact form submissions" ON contact_messages;
DROP POLICY IF EXISTS "Allow anonymous contact submissions" ON contact_messages;
DROP POLICY IF EXISTS "Public insert access for contact_messages" ON contact_messages;

-- Create a single, comprehensive policy for contact message insertions
CREATE POLICY "Enable contact form submissions for everyone"
  ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Grant necessary permissions to both anon and authenticated roles
GRANT INSERT ON contact_messages TO anon;
GRANT INSERT ON contact_messages TO authenticated;

-- Grant usage on the sequence for auto-incrementing IDs
GRANT USAGE ON SEQUENCE contact_messages_id_seq TO anon;
GRANT USAGE ON SEQUENCE contact_messages_id_seq TO authenticated;

-- Ensure the table structure is correct
ALTER TABLE contact_messages 
  ALTER COLUMN is_read SET DEFAULT false,
  ALTER COLUMN created_at SET DEFAULT now();

-- Add an index for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Verify the policy exists
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'contact_messages';