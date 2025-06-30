import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Check for both frontend and backend env vars
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please ensure SUPABASE_URL and SUPABASE_ANON_KEY are set in .env'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create admin client only if service role key is available
export const supabaseAdmin: SupabaseClient | null = supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

// Error handling utility
export function handleSupabaseError(error: any) {
  console.error('Supabase error:', error);
  return {
    data: null,
    error: {
      message: error?.message || 'An unexpected error occurred',
      code: error?.code || 'UNKNOWN_ERROR'
    }
  };
}

// Type definitions based on the database schema
export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  category: string;
  technologies?: string[];
  live_url?: string;
  source_url?: string;
  is_featured?: boolean;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
}

export interface Skill {
  id: number;
  name: string;
  percentage: number;
  category: string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image?: string;
  category?: string;
  tags?: string[];
  status?: string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

export interface Statistic {
  id: number;
  user_id?: number;
  projects_completed?: number;
  years_experience?: number;
  happy_clients?: number;
  technologies_mastered?: number;
  updated_at?: string;
}