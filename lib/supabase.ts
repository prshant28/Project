import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
// In Vite, client-side env vars must be prefixed with VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

// Client for public operations (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any) {
  console.error('Supabase error:', error);
  
  if (error?.code === 'PGRST116') {
    return { error: 'No data found', status: 404 };
  }
  
  if (error?.code === 'PGRST301') {
    return { error: 'Unauthorized access', status: 401 };
  }
  
  return { 
    error: error?.message || 'Database operation failed', 
    status: 500 
  };
}

// Type definitions for your tables
export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  category: string;
  technologies: string[];
  live_url?: string;
  source_url?: string;
  is_featured: boolean;
  user_id?: number;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Skill {
  id: number;
  name: string;
  percentage: number;
  category: string;
  user_id?: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image?: string;
  category?: string;
  tags: string[];
  status: string;
  user_id?: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface Statistic {
  id: number;
  user_id?: number;
  projects_completed: number;
  years_experience: number;
  happy_clients: number;
  technologies_mastered: number;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  full_name?: string;
  email?: string;
  role?: string;
  created_at: string;
  updated_at: string;
}