import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase connection - with fallbacks for production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xjjkqtlnvjqfrblyjnex.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqamtxdGxudmpxZnJibHlqbmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNzM2NzQsImV4cCI6MjA2Njg0OTY3NH0.VQzKhKJGHJhkOGhJJGHJhkOGhJJGHJhkOGhJJGHJhkO';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Contact form will not work.');
}

// Create Supabase client with error handling
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Type definitions for contact messages
export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
}

// Helper function to insert contact message with better error handling
export const insertContactMessage = async (messageData: Omit<ContactMessage, 'id' | 'created_at'>) => {
  if (!supabase) {
    throw new Error('Supabase client not initialized. Please check environment variables.');
  }

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        ...messageData,
        is_read: false,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Failed to send message: ${error.message}`);
    }

    return data;
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    throw error;
  }
};

// Helper function to get all contact messages (for admin use)
export const getContactMessages = async () => {
  if (!supabase) {
    throw new Error('Supabase client not initialized.');
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

// Helper function to mark message as read
export const markMessageAsRead = async (messageId: number) => {
  if (!supabase) {
    throw new Error('Supabase client not initialized.');
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', messageId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};