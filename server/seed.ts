import { db } from "./db";
import { 
  users, 
  projects, 
  skills, 
  blogPosts, 
  statistics,
  contactMessages 
} from "@shared/schema";

// Sample data for seeding the database
const seedData = {
  // User data
  user: {
    username: "prashant",
    password: "hashed_password_here", // In production, this should be properly hashed
    fullName: "Prashant Maurya",
    email: "hello@prashant.dev",
    role: "admin"
  },

  // Projects data
  projects: [
    {
      title: "Edu Connect 247",
      description: "AI-powered academic assistant with Smart AI Study Planner, Assignment Tracker, In-app Python IDE (JupyterLite), Eva Chatbot (trained on lecture data), Flashcards & Video Library.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "AI Platform",
      technologies: ["AI", "Python", "JupyterLite", "Machine Learning", "React"],
      liveUrl: "https://educonnect.x247.site",
      sourceUrl: "#",
      isFeatured: true,
    },
    {
      title: "GadgetsFever",
      description: "Comprehensive tech blog platform covering latest gadgets, technology news, reviews, and insights for tech enthusiasts.",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Tech Blog",
      technologies: ["WordPress", "PHP", "MySQL", "SEO Optimization"],
      liveUrl: "https://gadgetsfever.in",
      sourceUrl: "#",
      isFeatured: true,
    },
    {
      title: "HostWithUs",
      description: "Web and app hosting platform providing reliable hosting solutions. Founded and managed as CEO, offering comprehensive hosting services.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Hosting Platform",
      technologies: ["Full-Stack", "Cloud Infrastructure", "DevOps", "Security"],
      liveUrl: "https://hostwithus.site",
      sourceUrl: "#",
      isFeatured: true,
    },
    {
      title: "Coupons x247",
      description: "Live deals and coupons platform with WordPress REST API integration, providing real-time discount codes and offers.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "E-commerce",
      technologies: ["WordPress", "REST API", "PHP", "JavaScript"],
      liveUrl: "https://coupons.hostwithus.site",
      sourceUrl: "#",
      isFeatured: false,
    },
    {
      title: "x247.site Platform",
      description: "Official landing page and comprehensive platform currently under development, showcasing all projects and services.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Platform",
      technologies: ["React", "Next.js", "TypeScript", "Modern Web"],
      liveUrl: "https://x247.site",
      sourceUrl: "#",
      isFeatured: false,
    },
    {
      title: "YouTube Downloader",
      description: "Advanced YouTube video downloader tool built with Gradio framework, providing high-quality video downloads.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "AI Tools",
      technologies: ["Gradio", "Python", "API Integration", "UI/UX"],
      liveUrl: "#",
      sourceUrl: "#",
      isFeatured: false,
    },
    {
      title: "Ads Checker",
      description: "AdSense validator and ad compliance checking tool for ensuring advertisement standards and optimization.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Validation Tools",
      technologies: ["Python", "AI", "Validation Logic", "Web Scraping"],
      liveUrl: "#",
      sourceUrl: "#",
      isFeatured: false,
    },
    {
      title: "QR Generator",
      description: "Custom business QR code generator with advanced customization options and branding features.",
      image: "https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Business Tools",
      technologies: ["Python", "UI/UX Design", "API", "Graphics Generation"],
      liveUrl: "#",
      sourceUrl: "#",
      isFeatured: false,
    },
    {
      title: "Shop Biller",
      description: "Comprehensive billing and inventory management system for retail businesses (Work in Progress).",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Business Software",
      technologies: ["Full-Stack", "Database Management", "React", "Node.js"],
      liveUrl: "#",
      sourceUrl: "#",
      isFeatured: false,
    },
    {
      title: "Smart Restaurant Assistant",
      description: "AI-powered restaurant management system developed as college project with intelligent order processing.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "AI Tools",
      technologies: ["AI", "Streamlit", "Machine Learning", "Python"],
      liveUrl: "#",
      sourceUrl: "#",
      isFeatured: false,
    },
    {
      title: "GrabHostDeals",
      description: "Specialized hosting deals and offers platform providing curated hosting solutions and discounts.",
      image: "https://images.unsplash.com/photo-1551651653-c5578d6464fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Deal Platform",
      technologies: ["Web Development", "API Integration", "Deal Aggregation"],
      liveUrl: "https://grabhostdeals.com",
      sourceUrl: "#",
      isFeatured: false,
    },
  ],

  // Skills data
  skills: [
    // Frontend Skills
    { name: "React.js & Next.js", percentage: 95, category: "frontend" },
    { name: "TypeScript", percentage: 90, category: "frontend" },
    { name: "JavaScript (ES6+)", percentage: 95, category: "frontend" },
    { name: "HTML5 & CSS3", percentage: 98, category: "frontend" },
    { name: "TailwindCSS", percentage: 90, category: "frontend" },
    { name: "Responsive Design", percentage: 95, category: "frontend" },

    // Backend Skills
    { name: "Node.js & Express", percentage: 90, category: "backend" },
    { name: "Python", percentage: 95, category: "backend" },
    { name: "PostgreSQL", percentage: 85, category: "backend" },
    { name: "REST APIs", percentage: 90, category: "backend" },
    { name: "Database Design", percentage: 85, category: "backend" },
    { name: "Cloud Infrastructure", percentage: 80, category: "backend" },

    // AI Skills
    { name: "AI Tools Integration", percentage: 98, category: "ai" },
    { name: "Gradio Framework", percentage: 95, category: "ai" },
    { name: "Streamlit", percentage: 90, category: "ai" },
    { name: "HuggingFace", percentage: 85, category: "ai" },
    { name: "Machine Learning", percentage: 80, category: "ai" },
    { name: "JupyterLite", percentage: 85, category: "ai" },

    // Tools Skills
    { name: "Git & Version Control", percentage: 95, category: "tools" },
    { name: "Docker & DevOps", percentage: 80, category: "tools" },
    { name: "WordPress & PHP", percentage: 85, category: "tools" },
    { name: "Hosting & Deployment", percentage: 90, category: "tools" },
    { name: "SEO Optimization", percentage: 85, category: "tools" },
    { name: "Project Management", percentage: 90, category: "tools" },
  ],

  // Blog posts data
  blogPosts: [
    {
      title: "Building Edu Connect 247: AI-Powered Academic Assistant",
      slug: "building-edu-connect-247-ai-powered-academic-assistant",
      excerpt: "Deep dive into creating an AI-powered academic platform with Smart Study Planner, Assignment Tracker, and in-app Python IDE using JupyterLite.",
      content: `# Building Edu Connect 247: AI-Powered Academic Assistant

## Introduction

Edu Connect 247 represents a revolutionary approach to academic assistance, combining artificial intelligence with practical educational tools to create a comprehensive learning platform.

## Key Features

### Smart Study Planner
Our AI-powered study planner analyzes your learning patterns and creates personalized study schedules that adapt to your progress.

### Assignment Tracker
Keep track of all your assignments with intelligent reminders and progress tracking.

### In-app Python IDE
Built with JupyterLite, students can code directly in the browser without any setup required.

### Eva Chatbot
Our AI assistant is trained on lecture data to provide contextual help and answer academic questions.

## Technical Implementation

The platform is built using modern web technologies including React, Python, and advanced AI models. The integration of JupyterLite allows for seamless code execution in the browser.

## Conclusion

Edu Connect 247 demonstrates the potential of AI in education, providing students with tools that enhance their learning experience and academic success.`,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "AI Development",
      tags: ["AI", "Education", "Python", "JupyterLite"],
      status: "published",
      publishedAt: new Date("2025-01-15"),
    },
    {
      title: "From Zero to Hero: Launching GadgetsFever.in Tech Blog",
      slug: "from-zero-to-hero-launching-gadgetsfever-tech-blog",
      excerpt: "The complete journey of building and launching a comprehensive tech blog platform covering gadgets, reviews, and technology insights.",
      content: `# From Zero to Hero: Launching GadgetsFever.in Tech Blog

## The Beginning

Starting GadgetsFever.in was a journey of passion for technology and the desire to share insights with fellow tech enthusiasts.

## Platform Development

Built on WordPress with custom themes and optimizations for performance and SEO.

## Content Strategy

Focusing on comprehensive gadget reviews, technology news, and in-depth analysis of emerging trends.

## Growth and Success

The blog has grown to become a trusted source for technology insights and gadget recommendations.`,
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Entrepreneurship",
      tags: ["WordPress", "Tech Blog", "SEO", "Content Strategy"],
      status: "published",
      publishedAt: new Date("2024-11-20"),
    },
    {
      title: "100+ AI Tools for Developers: A Comprehensive Guide",
      slug: "100-ai-tools-for-developers-comprehensive-guide",
      excerpt: "Complete guide to the top AI tools that can revolutionize your development workflow, from code generation to project management.",
      content: `# 100+ AI Tools for Developers: A Comprehensive Guide

## Introduction

The AI revolution has brought countless tools that can enhance developer productivity and creativity.

## Categories of AI Tools

### Code Generation
- GitHub Copilot
- Tabnine
- CodeT5

### Design and UI
- Figma AI
- Uizard
- Sketch2Code

### Project Management
- Notion AI
- ClickUp AI
- Asana Intelligence

## Conclusion

Mastering these AI tools can significantly boost your development efficiency and open new possibilities for innovation.`,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "AI Tools",
      tags: ["AI", "Development", "Productivity", "Tools"],
      status: "published",
      publishedAt: new Date("2024-12-10"),
    },
  ],

  // Statistics data
  statistics: {
    projectsCompleted: 11,
    yearsExperience: 3,
    happyClients: 25,
    technologiesMastered: 100,
  },

  // Sample contact messages
  contactMessages: [
    {
      name: "John Doe",
      email: "john@example.com",
      subject: "Project Inquiry",
      message: "Hi Prashant, I'm interested in discussing a potential web development project. Could we schedule a call?",
      isRead: false,
    },
    {
      name: "Sarah Smith",
      email: "sarah@techcorp.com",
      subject: "Collaboration Opportunity",
      message: "We're looking for a talented developer to join our team on a exciting AI project. Your portfolio looks impressive!",
      isRead: true,
    },
  ],
};

export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // 1. Create user first
    console.log("👤 Creating user...");
    const [user] = await db.insert(users).values(seedData.user).returning();
    console.log(`✅ User created with ID: ${user.id}`);

    // 2. Create projects
    console.log("🚀 Creating projects...");
    const projectsWithUserId = seedData.projects.map(project => ({
      ...project,
      userId: user.id,
    }));
    const createdProjects = await db.insert(projects).values(projectsWithUserId).returning();
    console.log(`✅ Created ${createdProjects.length} projects`);

    // 3. Create skills
    console.log("🎯 Creating skills...");
    const skillsWithUserId = seedData.skills.map(skill => ({
      ...skill,
      userId: user.id,
    }));
    const createdSkills = await db.insert(skills).values(skillsWithUserId).returning();
    console.log(`✅ Created ${createdSkills.length} skills`);

    // 4. Create blog posts
    console.log("📝 Creating blog posts...");
    const blogPostsWithUserId = seedData.blogPosts.map(post => ({
      ...post,
      userId: user.id,
    }));
    const createdBlogPosts = await db.insert(blogPosts).values(blogPostsWithUserId).returning();
    console.log(`✅ Created ${createdBlogPosts.length} blog posts`);

    // 5. Create statistics
    console.log("📊 Creating statistics...");
    const statisticsWithUserId = {
      ...seedData.statistics,
      userId: user.id,
    };
    const [createdStats] = await db.insert(statistics).values(statisticsWithUserId).returning();
    console.log(`✅ Created statistics with ID: ${createdStats.id}`);

    // 6. Create contact messages
    console.log("📧 Creating contact messages...");
    const createdMessages = await db.insert(contactMessages).values(seedData.contactMessages).returning();
    console.log(`✅ Created ${createdMessages.length} contact messages`);

    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📋 Summary:");
    console.log(`   • User: ${user.fullName} (${user.email})`);
    console.log(`   • Projects: ${createdProjects.length}`);
    console.log(`   • Skills: ${createdSkills.length}`);
    console.log(`   • Blog Posts: ${createdBlogPosts.length}`);
    console.log(`   • Contact Messages: ${createdMessages.length}`);
    console.log(`   • Statistics: Complete`);

    return {
      user,
      projects: createdProjects,
      skills: createdSkills,
      blogPosts: createdBlogPosts,
      statistics: createdStats,
      contactMessages: createdMessages,
    };

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Function to clear all data (useful for re-seeding)
export async function clearDatabase() {
  try {
    console.log("🧹 Clearing database...");
    
    // Delete in reverse order of dependencies
    await db.delete(contactMessages);
    await db.delete(statistics);
    await db.delete(blogPosts);
    await db.delete(skills);
    await db.delete(projects);
    await db.delete(users);
    
    console.log("✅ Database cleared successfully!");
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    throw error;
  }
}

// Main function to run seeding
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log("✅ Seeding completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    });
}