import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    `Missing Supabase environment variables. Make sure .env includes:
    SUPABASE_URL + SUPABASE_ANON_KEY (for backend),
    or VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY (for frontend).`
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
