import type { Express, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { supabaseStorage } from "./supabase-storage";

// Contact form schema for validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Error handler middleware
const errorHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("API Error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to process your request. Please try again later." 
        });
      }
    }
  };
};

export async function registerSupabaseRoutes(app: Express) {
  // Test endpoint
  app.get("/api/test", (req: Request, res: Response) => {
    res.json({ 
      success: true, 
      message: "🎉 Supabase client is working!",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });

  // --- PROJECT ROUTES ---
  
  // Get all projects
  app.get("/api/projects", errorHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : undefined;
    const featured = req.query.featured ? req.query.featured === 'true' : undefined;
    const category = req.query.category as string;
    
    const result = await supabaseStorage.getAllProjects({ limit, offset, featured, category });
    
    if (result.error) {
      return res.status(result.status || 500).json({
        success: false,
        message: result.error
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.data
    });
  }));
  
  // Get a specific project
  app.get("/api/projects/:id", errorHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    const result = await supabaseStorage.getProject(id);
    
    if (result.error) {
      return res.status(result.status || 500).json({
        success: false,
        message: result.error
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.data
    });
  }));
  
  // Create a new project (admin only)
  app.post("/api/admin/projects", errorHandler(async (req: Request, res: Response) => {
    const result = await supabaseStorage.createProject(req.body);
    
    if (result.error) {
      return res.status(result.status || 500).json({
        success: false,
        message: result.error
      });
    }
    
    res.status(201).json({
      success: true,
      data: result.data
    });
  }));
  
  // Update a project (admin only)
  app.put("/api/admin/projects/:id", errorHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    const result = await supabaseStorage.updateProject(id, req.body);
    
    if (result.error) {
      return res.status(result.status || 500).json({
        success: false,
        message: result.error
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.data
    });
  }));
  
  // Delete a project (admin only)
  app.delete("/api/admin/projects/:id", errorHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    const result = await supabaseStorage.deleteProject(id);
    
    if (result.error) {
      return res.status(result.status || 500).json({
        success: false,
        message: result.error
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  }));

  // --- CONTACT ROUTES ---
  
  // Save contact form submissions
  app.post("/api/contact", errorHandler(async (req: Request, res: Response) => {
    const validatedData = contactSchema.parse(req.body);
    
    const result = await supabaseStorage.createContactMessage(validatedData);
    
    if (result.error) {
      return res.status(result.status || 500).json({
        success: false,
        message: result.error
      });
    }
    
    res.status(201).json({ 
      success: true, 
      message: "Your message has been received! I'll get back to you soon.",
      data: { id: result.data.id }
    });
  }));

  // Get all contact messages (admin only)
  app.get("/api/admin/contact-messages", errorHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : undefined;
    const read = req.query.read ? req.query.read === 'true' : undefined;
    
    const result = await supabaseStorage.getAllContactMessages({ limit, offset, read });
    
    if (result.error) {
      return res.status(result.status || 500).json({
        success: false,
        message: result.error
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.data
    });
  }));

  // --- SKILL ROUTES ---
  
  // Get skills by category
  app.get("/api/skills/category/:category", errorHandler(async (req: Request, res: Response) => {
    const category = req.params.category;
    
    const result = await supabaseStorage.getSkillsByCategory(category);
    
    if (result.error) {
      return res.status(result.status || 500).json({
        success: false,
        message: result.error
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.data
    });
  }));

  // --- BLOG POST ROUTES ---
  
  // Get all blog posts
  app.get("/api/blog-posts", errorHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : undefined;
    const published = req.query.published ? req.query.published === 'true' : true;
    
    const result = await supabaseStorage.getAllBlogPosts({ limit, offset, published });
    
    if (result.error) {
      return res.status(result.status || 500).json({
        success: false,
        message: result.error
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.data
    });
  }));
  
  // Get a blog post by slug
  app.get("/api/blog-posts/slug/:slug", errorHandler(async (req: Request, res: Response) => {
    const slug = req.params.slug;
    
    const result = await supabaseStorage.getBlogPostBySlug(slug);
    
    if (result.error) {
      return res.status(result.status || 500).json({
        success: false,
        message: result.error
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.data
    });
  }));

  // --- STATISTICS ROUTES ---
  
  // Get user statistics
  app.get("/api/statistics/:userId", errorHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    
    const result = await supabaseStorage.getStatistics(userId);
    
    if (result.error) {
      return res.status(result.status || 500).json({
        success: false,
        message: result.error
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.data
    });
  }));
}