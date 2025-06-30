-- Fix RLS policies for contact_messages table to allow anonymous submissions
-- Run this SQL in your Supabase SQL Editor

BEGIN;

-- First, ensure RLS is enabled
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh (using IF EXISTS to avoid errors)
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON contact_messages;
    DROP POLICY IF EXISTS "Allow contact form submissions" ON contact_messages;
    DROP POLICY IF EXISTS "Allow anonymous contact submissions" ON contact_messages;
    DROP POLICY IF EXISTS "Public insert access for contact_messages" ON contact_messages;
    DROP POLICY IF EXISTS "Enable contact form submissions for everyone" ON contact_messages;
EXCEPTION
    WHEN undefined_object THEN
        NULL; -- Ignore if policies don't exist
END $$;

-- Create a single, comprehensive policy for contact message insertions
CREATE POLICY "Enable contact form submissions for everyone"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Grant necessary permissions to both anon and authenticated roles
DO $$
BEGIN
    -- Grant INSERT permission
    GRANT INSERT ON contact_messages TO anon;
    GRANT INSERT ON contact_messages TO authenticated;
    
    -- Grant usage on the sequence for auto-incrementing IDs
    GRANT USAGE ON SEQUENCE contact_messages_id_seq TO anon;
    GRANT USAGE ON SEQUENCE contact_messages_id_seq TO authenticated;
EXCEPTION
    WHEN insufficient_privilege THEN
        RAISE NOTICE 'Some permissions already exist or cannot be granted';
END $$;

-- Ensure the table structure is correct
ALTER TABLE contact_messages 
  ALTER COLUMN is_read SET DEFAULT false,
  ALTER COLUMN created_at SET DEFAULT now();

-- Add an index for better performance (if it doesn't exist)
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Verify the policy was created successfully
DO $$
DECLARE
    policy_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies 
    WHERE tablename = 'contact_messages' 
    AND policyname = 'Enable contact form submissions for everyone';
    
    IF policy_count > 0 THEN
        RAISE NOTICE 'Contact form RLS policy created successfully';
    ELSE
        RAISE EXCEPTION 'Failed to create contact form RLS policy';
    END IF;
END $$;

COMMIT;