/*
  # Fix Contact Form RLS Policy

  1. Security Changes
    - Add RLS policy to allow anonymous users to insert contact messages
    - This enables the contact form to work for visitors who are not authenticated
    - The policy allows INSERT operations for anonymous (anon) role with full access

  2. Policy Details
    - Policy name: "Allow anonymous contact form submissions"
    - Operation: INSERT
    - Role: anon (anonymous users)
    - Using clause: true (allows all inserts)
    - With check clause: true (no restrictions on inserted data)
*/

-- Create policy to allow anonymous users to insert contact messages
CREATE POLICY "Allow anonymous contact form submissions"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);