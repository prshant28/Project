import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  skills, type Skill, type InsertSkill,
  blogPosts, type BlogPost, type InsertBlogPost,
  contactMessages, type ContactMessage, type InsertContactMessage,
  statistics, type Statistic, type InsertStatistic
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getProject(id: number): Promise<Project | undefined>;
  getAllProjects(options?: { limit?: number, offset?: number, featured?: boolean }): Promise<Project[]>;
  getProjectsByUserId(userId: number): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Skill methods
  getSkill(id: number): Promise<Skill | undefined>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  getSkillsByUserId(userId: number): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;
  
  // Blog post methods
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getAllBlogPosts(options?: { limit?: number, offset?: number, published?: boolean }): Promise<BlogPost[]>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Contact message methods
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  getAllContactMessages(options?: { limit?: number, offset?: number, read?: boolean }): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markContactMessageAsRead(id: number): Promise<boolean>;
  deleteContactMessage(id: number): Promise<boolean>;
  
  // Statistics methods
  getStatistics(userId: number): Promise<Statistic | undefined>;
  createOrUpdateStatistics(statistic: InsertStatistic): Promise<Statistic>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Project methods
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }
  
  async getAllProjects(options?: { limit?: number, offset?: number, featured?: boolean }): Promise<Project[]> {
    let queryBuilder = db.select().from(projects);
    
    if (options?.featured !== undefined) {
      queryBuilder = queryBuilder.where(eq(projects.isFeatured, options.featured));
    }
    
    queryBuilder = queryBuilder.orderBy(desc(projects.createdAt));
    
    if (options?.limit) {
      queryBuilder = queryBuilder.limit(options.limit);
    }
    
    if (options?.offset) {
      queryBuilder = queryBuilder.offset(options.offset);
    }
    
    const result = await queryBuilder;
    return result;
  }
  
  async getProjectsByUserId(userId: number): Promise<Project[]> {
    return await db.select()
      .from(projects)
      .where(eq(projects.userId, userId))
      .orderBy(desc(projects.createdAt));
  }
  
  async getProjectsByCategory(category: string): Promise<Project[]> {
    return await db.select()
      .from(projects)
      .where(eq(projects.category, category))
      .orderBy(desc(projects.createdAt));
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const [createdProject] = await db.insert(projects).values(project).returning();
    return createdProject;
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updatedProject] = await db.update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return !!result;
  }
  
  // Skill methods
  async getSkill(id: number): Promise<Skill | undefined> {
    const [skill] = await db.select().from(skills).where(eq(skills.id, id));
    return skill;
  }
  
  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return await db.select()
      .from(skills)
      .where(eq(skills.category, category))
      .orderBy(asc(skills.name));
  }
  
  async getSkillsByUserId(userId: number): Promise<Skill[]> {
    return await db.select()
      .from(skills)
      .where(eq(skills.userId, userId))
      .orderBy(asc(skills.category), asc(skills.name));
  }
  
  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [createdSkill] = await db.insert(skills).values(skill).returning();
    return createdSkill;
  }
  
  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [updatedSkill] = await db.update(skills)
      .set(skill)
      .where(eq(skills.id, id))
      .returning();
    return updatedSkill;
  }
  
  async deleteSkill(id: number): Promise<boolean> {
    const result = await db.delete(skills).where(eq(skills.id, id));
    return !!result;
  }
  
  // Blog post methods
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }
  
  async getAllBlogPosts(options?: { limit?: number, offset?: number, published?: boolean }): Promise<BlogPost[]> {
    let queryBuilder = db.select().from(blogPosts);
    
    if (options?.published !== undefined) {
      queryBuilder = queryBuilder.where(eq(blogPosts.status, options.published ? 'published' : 'draft'));
    }
    
    queryBuilder = queryBuilder.orderBy(desc(blogPosts.createdAt));
    
    if (options?.limit) {
      queryBuilder = queryBuilder.limit(options.limit);
    }
    
    if (options?.offset) {
      queryBuilder = queryBuilder.offset(options.offset);
    }
    
    const result = await queryBuilder;
    return result;
  }
  
  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.category, category))
      .orderBy(desc(blogPosts.createdAt));
  }
  
  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const [createdPost] = await db.insert(blogPosts).values(blogPost).returning();
    return createdPost;
  }
  
  async updateBlogPost(id: number, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updatedPost] = await db.update(blogPosts)
      .set(blogPost)
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return !!result;
  }
  
  // Contact message methods
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message;
  }
  
  async getAllContactMessages(options?: { limit?: number, offset?: number, read?: boolean }): Promise<ContactMessage[]> {
    let queryBuilder = db.select().from(contactMessages);
    
    if (options?.read !== undefined) {
      queryBuilder = queryBuilder.where(eq(contactMessages.isRead, options.read));
    }
    
    queryBuilder = queryBuilder.orderBy(desc(contactMessages.createdAt));
    
    if (options?.limit) {
      queryBuilder = queryBuilder.limit(options.limit);
    }
    
    if (options?.offset) {
      queryBuilder = queryBuilder.offset(options.offset);
    }
    
    const result = await queryBuilder;
    return result;
  }
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [createdMessage] = await db.insert(contactMessages).values(message).returning();
    return createdMessage;
  }
  
  async markContactMessageAsRead(id: number): Promise<boolean> {
    const [updatedMessage] = await db.update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, id))
      .returning();
    return !!updatedMessage;
  }
  
  async deleteContactMessage(id: number): Promise<boolean> {
    const result = await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return !!result;
  }
  
  // Statistics methods
  async getStatistics(userId: number): Promise<Statistic | undefined> {
    const [stat] = await db.select().from(statistics).where(eq(statistics.userId, userId));
    return stat;
  }
  
  async createOrUpdateStatistics(statistic: InsertStatistic): Promise<Statistic> {
    if (!statistic.userId) {
      throw new Error("User ID is required for statistics");
    }
    
    // Check if statistics already exist for this user
    const existingStat = await this.getStatistics(statistic.userId);
    
    if (existingStat) {
      // Update existing stats
      const [updatedStat] = await db.update(statistics)
        .set({ ...statistic, updatedAt: new Date() })
        .where(eq(statistics.userId, statistic.userId))
        .returning();
      return updatedStat;
    } else {
      // Create new stats
      const [createdStat] = await db.insert(statistics).values(statistic).returning();
      return createdStat;
    }
  }
}

export const storage = new DatabaseStorage();
