import { supabase, supabaseAdmin, handleSupabaseError, type Project, type ContactMessage, type Skill, type BlogPost, type Statistic } from '../lib/supabase';

export class SupabaseStorage {
  // Project methods
  async getAllProjects(options?: { 
    limit?: number; 
    offset?: number; 
    featured?: boolean; 
    category?: string;
  }) {
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (options?.featured !== undefined) {
        query = query.eq('is_featured', options.featured);
      }

      if (options?.category) {
        query = query.eq('category', options.category);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      if (options?.offset) {
        query = query.range(options.offset, (options.offset + (options.limit || 10)) - 1);
      }

      const { data, error } = await query;

      if (error) {
        return handleSupabaseError(error);
      }

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }

  async getProject(id: number) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return handleSupabaseError(error);
      }

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }

  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await (supabaseAdmin || supabase)
        .from('projects')
        .insert([project])
        .select()
        .single();

      if (error) {
        return handleSupabaseError(error);
      }

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }

  async updateProject(id: number, updates: Partial<Project>) {
    try {
      const { data, error } = await (supabaseAdmin || supabase)
        .from('projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return handleSupabaseError(error);
      }

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }

  async deleteProject(id: number) {
    try {
      const { error } = await (supabaseAdmin || supabase)
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        return handleSupabaseError(error);
      }

      return { data: { success: true }, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }

  // Contact message methods
  async createContactMessage(message: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{ ...message, is_read: false }])
        .select()
        .single();

      if (error) {
        return handleSupabaseError(error);
      }

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }

  async getAllContactMessages(options?: { 
    limit?: number; 
    offset?: number; 
    read?: boolean; 
  }) {
    try {
      let query = (supabaseAdmin || supabase)
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (options?.read !== undefined) {
        query = query.eq('is_read', options.read);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      if (options?.offset) {
        query = query.range(options.offset, (options.offset + (options.limit || 10)) - 1);
      }

      const { data, error } = await query;

      if (error) {
        return handleSupabaseError(error);
      }

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }

  async markContactMessageAsRead(id: number) {
    try {
      const { data, error } = await (supabaseAdmin || supabase)
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return handleSupabaseError(error);
      }

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }

  // Skills methods
  async getSkillsByCategory(category: string) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('category', category)
        .order('name', { ascending: true });

      if (error) {
        return handleSupabaseError(error);
      }

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }

  async createSkill(skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await (supabaseAdmin || supabase)
        .from('skills')
        .insert([skill])
        .select()
        .single();

      if (error) {
        return handleSupabaseError(error);
      }

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }

  // Blog posts methods
  async getAllBlogPosts(options?: { 
    limit?: number; 
    offset?: number; 
    published?: boolean; 
  }) {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (options?.published !== undefined) {
        query = query.eq('status', options.published ? 'published' : 'draft');
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      if (options?.offset) {
        query = query.range(options.offset, (options.offset + (options.limit || 10)) - 1);
      }

      const { data, error } = await query;

      if (error) {
        return handleSupabaseError(error);
      }

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }

  async getBlogPostBySlug(slug: string) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        return handleSupabaseError(error);
      }

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }

  // Statistics methods
  async getStatistics(userId: number) {
    try {
      const { data, error } = await supabase
        .from('statistics')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        return handleSupabaseError(error);
      }

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }

  async createOrUpdateStatistics(statistic: Omit<Statistic, 'id' | 'updated_at'>) {
    try {
      const { data, error } = await (supabaseAdmin || supabase)
        .from('statistics')
        .upsert([{ ...statistic, updated_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) {
        return handleSupabaseError(error);
      }

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }
}

export const supabaseStorage = new SupabaseStorage();