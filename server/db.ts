import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const databaseUrl = process.env.DATABASE_URL;

if (!supabaseUrl || !supabaseAnonKey || !databaseUrl) {
  console.error("❌ Supabase environment variables are not set!");
  console.log("📝 To fix this:");
  console.log("   1. Create a Supabase project at https://supabase.com");
  console.log("   2. Go to Settings > API in your Supabase dashboard");
  console.log("   3. Set these environment variables:");
  console.log("      SUPABASE_URL=your_supabase_project_url");
  console.log("      SUPABASE_ANON_KEY=your_supabase_anon_key");
  console.log("      DATABASE_URL=your_supabase_database_url");
  
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