import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertProjectSchema,
  insertSkillSchema,
  insertBlogPostSchema,
  insertStatisticSchema
} from "@shared/schema";

// Contact form schema for validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Test endpoint to verify server is working
  app.get("/api/test", (req: Request, res: Response) => {
    res.json({ 
      success: true, 
      message: "🎉 Server is working perfectly!",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });

  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ 
      status: "healthy",
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString()
    });
  });

  // Middleware to handle errors
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

  // --- CONTACT ROUTES ---
  
  // Save contact form submissions
  app.post("/api/contact", errorHandler(async (req: Request, res: Response) => {
    // Validate form data
    const validatedData = contactSchema.parse(req.body);
    
    // Save to database
    const message = await storage.createContactMessage(validatedData);
    
    res.status(201).json({ 
      success: true, 
      message: "Your message has been received! I'll get back to you soon.",
      data: { id: message.id }
    });
  }));

  // Get all contact messages (protected route, would require auth in a real app)
  app.get("/api/admin/contact-messages", errorHandler(async (req: Request, res: Response) => {
    // In a real app, you'd have authentication here
    // For demonstration purposes only
    
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : undefined;
    const read = req.query.read ? req.query.read === 'true' : undefined;
    
    const messages = await storage.getAllContactMessages({ limit, offset, read });
    
    res.status(200).json({
      success: true,
      data: messages
    });
  }));

  // --- PROJECT ROUTES ---
  
  // Get all projects
  app.get("/api/projects", errorHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : undefined;
    const featured = req.query.featured ? req.query.featured === 'true' : undefined;
    
    const projects = await storage.getAllProjects({ limit, offset, featured });
    
    res.status(200).json({
      success: true,
      data: projects
    });
  }));
  
  // Get a specific project
  app.get("/api/projects/:id", errorHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    const project = await storage.getProject(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  }));
  
  // Get projects by category
  app.get("/api/projects/category/:category", errorHandler(async (req: Request, res: Response) => {
    const category = req.params.category;
    
    const projects = await storage.getProjectsByCategory(category);
    
    res.status(200).json({
      success: true,
      data: projects
    });
  }));
  
  // Create a new project (protected route)
  app.post("/api/admin/projects", errorHandler(async (req: Request, res: Response) => {
    // In a real app, you'd have authentication here
    // For demonstration purposes only
    
    const projectData = insertProjectSchema.parse(req.body);
    
    const project = await storage.createProject(projectData);
    
    res.status(201).json({
      success: true,
      data: project
    });
  }));
  
  // Update a project (protected route)
  app.put("/api/admin/projects/:id", errorHandler(async (req: Request, res: Response) => {
    // In a real app, you'd have authentication here
    // For demonstration purposes only
    
    const id = parseInt(req.params.id);
    const projectData = req.body;
    
    const updatedProject = await storage.updateProject(id, projectData);
    
    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedProject
    });
  }));
  
  // Delete a project (protected route)
  app.delete("/api/admin/projects/:id", errorHandler(async (req: Request, res: Response) => {
    // In a real app, you'd have authentication here
    // For demonstration purposes only
    
    const id = parseInt(req.params.id);
    
    const success = await storage.deleteProject(id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  }));
  
  // --- SKILL ROUTES ---
  
  // Get skills by category
  app.get("/api/skills/category/:category", errorHandler(async (req: Request, res: Response) => {
    const category = req.params.category;
    
    const skills = await storage.getSkillsByCategory(category);
    
    res.status(200).json({
      success: true,
      data: skills
    });
  }));
  
  // Get skills by user ID
  app.get("/api/skills/user/:userId", errorHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    
    const skills = await storage.getSkillsByUserId(userId);
    
    res.status(200).json({
      success: true,
      data: skills
    });
  }));
  
  // Create a new skill (protected route)
  app.post("/api/admin/skills", errorHandler(async (req: Request, res: Response) => {
    // In a real app, you'd have authentication here
    // For demonstration purposes only
    
    const skillData = insertSkillSchema.parse(req.body);
    
    const skill = await storage.createSkill(skillData);
    
    res.status(201).json({
      success: true,
      data: skill
    });
  }));
  
  // Update a skill (protected route)
  app.put("/api/admin/skills/:id", errorHandler(async (req: Request, res: Response) => {
    // In a real app, you'd have authentication here
    // For demonstration purposes only
    
    const id = parseInt(req.params.id);
    const skillData = req.body;
    
    const updatedSkill = await storage.updateSkill(id, skillData);
    
    if (!updatedSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedSkill
    });
  }));
  
  // Delete a skill (protected route)
  app.delete("/api/admin/skills/:id", errorHandler(async (req: Request, res: Response) => {
    // In a real app, you'd have authentication here
    // For demonstration purposes only
    
    const id = parseInt(req.params.id);
    
    const success = await storage.deleteSkill(id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Skill not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Skill deleted successfully"
    });
  }));
  
  // --- BLOG POST ROUTES ---
  
  // Get all blog posts
  app.get("/api/blog-posts", errorHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : undefined;
    const published = req.query.published ? req.query.published === 'true' : true; // Default to published only
    
    const posts = await storage.getAllBlogPosts({ limit, offset, published });
    
    res.status(200).json({
      success: true,
      data: posts
    });
  }));
  
  // Get a blog post by slug
  app.get("/api/blog-posts/slug/:slug", errorHandler(async (req: Request, res: Response) => {
    const slug = req.params.slug;
    
    const post = await storage.getBlogPostBySlug(slug);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: post
    });
  }));
  
  // Get a specific blog post
  app.get("/api/blog-posts/:id", errorHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    const post = await storage.getBlogPost(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: post
    });
  }));
  
  // Create a new blog post (protected route)
  app.post("/api/admin/blog-posts", errorHandler(async (req: Request, res: Response) => {
    // In a real app, you'd have authentication here
    // For demonstration purposes only
    
    const blogPostData = insertBlogPostSchema.parse(req.body);
    
    const blogPost = await storage.createBlogPost(blogPostData);
    
    res.status(201).json({
      success: true,
      data: blogPost
    });
  }));
  
  // Update a blog post (protected route)
  app.put("/api/admin/blog-posts/:id", errorHandler(async (req: Request, res: Response) => {
    // In a real app, you'd have authentication here
    // For demonstration purposes only
    
    const id = parseInt(req.params.id);
    const blogPostData = req.body;
    
    const updatedBlogPost = await storage.updateBlogPost(id, blogPostData);
    
    if (!updatedBlogPost) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedBlogPost
    });
  }));
  
  // Delete a blog post (protected route)
  app.delete("/api/admin/blog-posts/:id", errorHandler(async (req: Request, res: Response) => {
    // In a real app, you'd have authentication here
    // For demonstration purposes only
    
    const id = parseInt(req.params.id);
    
    const success = await storage.deleteBlogPost(id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully"
    });
  }));
  
  // --- STATISTICS ROUTES ---
  
  // Get user statistics
  app.get("/api/statistics/:userId", errorHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    
    const stats = await storage.getStatistics(userId);
    
    if (!stats) {
      return res.status(404).json({
        success: false,
        message: "Statistics not found for this user"
      });
    }
    
    res.status(200).json({
      success: true,
      data: stats
    });
  }));
  
  // Create or update statistics (protected route)
  app.post("/api/admin/statistics", errorHandler(async (req: Request, res: Response) => {
    // In a real app, you'd have authentication here
    // For demonstration purposes only
    
    const statisticData = insertStatisticSchema.parse(req.body);
    
    const statistic = await storage.createOrUpdateStatistics(statisticData);
    
    res.status(201).json({
      success: true,
      data: statistic
    });
  }));

  // Download CV route
  app.get("/api/download-cv", (req: Request, res: Response) => {
    // In a real implementation, this would serve an actual file
    // For now, we'll just respond with a message
    res.status(200).json({
      success: true,
      message: "CV download functionality will be implemented soon."
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}