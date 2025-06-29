import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

// Load environment variables from .env file
config();

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const databaseUrl = process.env.DATABASE_URL;

if (!supabaseUrl || !supabaseAnonKey || !databaseUrl) {
  console.error("❌ Supabase environment variables are not set!");
  console.log("📝 To fix this:");
  console.log("   1. Create a Supabase project at https://supabase.com");
  console.log("   2. Go to Settings > API in your Supabase dashboard");
  console.log("   3. Copy your project URL and anon key");
  console.log("   4. Go to Settings > Database and copy your connection string");
  console.log("   5. Update the .env file with your actual values:");
  console.log("      SUPABASE_URL=https://your-project-ref.supabase.co");
  console.log("      SUPABASE_ANON_KEY=your_anon_key_here");
  console.log("      DATABASE_URL=postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres");
  
  throw new Error(
    "Supabase credentials must be set. Please configure your environment variables.",
  );
}

// Create Supabase client for auth and realtime features
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create postgres connection for Drizzle ORM
const client = postgres(databaseUrl, { prepare: false });

// Create a drizzle instance with our schema
export const db = drizzle(client, { schema });