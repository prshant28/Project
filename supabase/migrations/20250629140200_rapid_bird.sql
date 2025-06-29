-- Portfolio Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  category TEXT NOT NULL,
  technologies TEXT[],
  live_url TEXT,
  source_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  percentage INTEGER NOT NULL,
  category TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  image TEXT,
  category TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'draft',
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Statistics table
CREATE TABLE IF NOT EXISTS statistics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  projects_completed INTEGER DEFAULT 0,
  years_experience INTEGER DEFAULT 0,
  happy_clients INTEGER DEFAULT 0,
  technologies_mastered INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample user
INSERT INTO users (username, password, full_name, email, role) VALUES 
('prashant', 'hashed_password', 'Prashant Maurya', 'hello@prashant.dev', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, image, category, technologies, live_url, source_url, is_featured, user_id) VALUES 
('Edu Connect 247', 'AI-powered academic assistant with Smart AI Study Planner, Assignment Tracker, In-app Python IDE (JupyterLite), Eva Chatbot (trained on lecture data), Flashcards & Video Library.', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'AI Platform', ARRAY['AI', 'Python', 'JupyterLite', 'Machine Learning', 'React'], 'https://educonnect.x247.site', '#', TRUE, 1),
('GadgetsFever', 'Comprehensive tech blog platform covering latest gadgets, technology news, reviews, and insights for tech enthusiasts.', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Tech Blog', ARRAY['WordPress', 'PHP', 'MySQL', 'SEO Optimization'], 'https://gadgetsfever.in', '#', TRUE, 1),
('HostWithUs', 'Web and app hosting platform providing reliable hosting solutions. Founded and managed as CEO, offering comprehensive hosting services.', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Hosting Platform', ARRAY['Full-Stack', 'Cloud Infrastructure', 'DevOps', 'Security'], 'https://hostwithus.site', '#', TRUE, 1),
('Coupons x247', 'Live deals and coupons platform with WordPress REST API integration, providing real-time discount codes and offers.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'E-commerce', ARRAY['WordPress', 'REST API', 'PHP', 'JavaScript'], 'https://coupons.hostwithus.site', '#', FALSE, 1),
('x247.site Platform', 'Official landing page and comprehensive platform currently under development, showcasing all projects and services.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Platform', ARRAY['React', 'Next.js', 'TypeScript', 'Modern Web'], 'https://x247.site', '#', FALSE, 1),
('YouTube Downloader', 'Advanced YouTube video downloader tool built with Gradio framework, providing high-quality video downloads.', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'AI Tools', ARRAY['Gradio', 'Python', 'API Integration', 'UI/UX'], '#', '#', FALSE, 1),
('Ads Checker', 'AdSense validator and ad compliance checking tool for ensuring advertisement standards and optimization.', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Validation Tools', ARRAY['Python', 'AI', 'Validation Logic', 'Web Scraping'], '#', '#', FALSE, 1),
('QR Generator', 'Custom business QR code generator with advanced customization options and branding features.', 'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Business Tools', ARRAY['Python', 'UI/UX Design', 'API', 'Graphics Generation'], '#', '#', FALSE, 1),
('Shop Biller', 'Comprehensive billing and inventory management system for retail businesses (Work in Progress).', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Business Software', ARRAY['Full-Stack', 'Database Management', 'React', 'Node.js'], '#', '#', FALSE, 1),
('Smart Restaurant Assistant', 'AI-powered restaurant management system developed as college project with intelligent order processing.', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'AI Tools', ARRAY['AI', 'Streamlit', 'Machine Learning', 'Python'], '#', '#', FALSE, 1),
('GrabHostDeals', 'Specialized hosting deals and offers platform providing curated hosting solutions and discounts.', 'https://images.unsplash.com/photo-1551651653-c5578d6464fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Deal Platform', ARRAY['Web Development', 'API Integration', 'Deal Aggregation'], 'https://grabhostdeals.com', '#', FALSE, 1)
ON CONFLICT DO NOTHING;

-- Insert sample skills
INSERT INTO skills (name, percentage, category, user_id) VALUES 
-- Frontend Skills
('React.js & Next.js', 95, 'frontend', 1),
('TypeScript', 90, 'frontend', 1),
('JavaScript (ES6+)', 95, 'frontend', 1),
('HTML5 & CSS3', 98, 'frontend', 1),
('TailwindCSS', 90, 'frontend', 1),
('Responsive Design', 95, 'frontend', 1),

-- Backend Skills
('Node.js & Express', 90, 'backend', 1),
('Python', 95, 'backend', 1),
('PostgreSQL', 85, 'backend', 1),
('REST APIs', 90, 'backend', 1),
('Database Design', 85, 'backend', 1),
('Cloud Infrastructure', 80, 'backend', 1),

-- AI Skills
('AI Tools Integration', 98, 'ai', 1),
('Gradio Framework', 95, 'ai', 1),
('Streamlit', 90, 'ai', 1),
('HuggingFace', 85, 'ai', 1),
('Machine Learning', 80, 'ai', 1),
('JupyterLite', 85, 'ai', 1),

-- Tools Skills
('Git & Version Control', 95, 'tools', 1),
('Docker & DevOps', 80, 'tools', 1),
('WordPress & PHP', 85, 'tools', 1),
('Hosting & Deployment', 90, 'tools', 1),
('SEO Optimization', 85, 'tools', 1),
('Project Management', 90, 'tools', 1)
ON CONFLICT DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, image, category, tags, status, user_id, published_at) VALUES 
('Building Edu Connect 247: AI-Powered Academic Assistant', 'building-edu-connect-247-ai-powered-academic-assistant', 'Deep dive into creating an AI-powered academic platform with Smart Study Planner, Assignment Tracker, and in-app Python IDE using JupyterLite.', '# Building Edu Connect 247: AI-Powered Academic Assistant

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
Edu Connect 247 demonstrates the potential of AI in education, providing students with tools that enhance their learning experience and academic success.', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'AI Development', ARRAY['AI', 'Education', 'Python', 'JupyterLite'], 'published', 1, '2025-01-15'),

('From Zero to Hero: Launching GadgetsFever.in Tech Blog', 'from-zero-to-hero-launching-gadgetsfever-tech-blog', 'The complete journey of building and launching a comprehensive tech blog platform covering gadgets, reviews, and technology insights.', '# From Zero to Hero: Launching GadgetsFever.in Tech Blog

## The Beginning
Starting GadgetsFever.in was a journey of passion for technology and the desire to share insights with fellow tech enthusiasts.

## Platform Development
Built on WordPress with custom themes and optimizations for performance and SEO.

## Content Strategy
Focusing on comprehensive gadget reviews, technology news, and in-depth analysis of emerging trends.

## Growth and Success
The blog has grown to become a trusted source for technology insights and gadget recommendations.', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Entrepreneurship', ARRAY['WordPress', 'Tech Blog', 'SEO', 'Content Strategy'], 'published', 1, '2024-11-20'),

('100+ AI Tools for Developers: A Comprehensive Guide', '100-ai-tools-for-developers-comprehensive-guide', 'Complete guide to the top AI tools that can revolutionize your development workflow, from code generation to project management.', '# 100+ AI Tools for Developers: A Comprehensive Guide

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
Mastering these AI tools can significantly boost your development efficiency and open new possibilities for innovation.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'AI Tools', ARRAY['AI', 'Development', 'Productivity', 'Tools'], 'published', 1, '2024-12-10')
ON CONFLICT (slug) DO NOTHING;

-- Insert statistics
INSERT INTO statistics (user_id, projects_completed, years_experience, happy_clients, technologies_mastered) VALUES 
(1, 11, 3, 25, 100)
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample contact messages
INSERT INTO contact_messages (name, email, subject, message, is_read) VALUES 
('John Doe', 'john@example.com', 'Project Inquiry', 'Hi Prashant, I am interested in discussing a potential web development project. Could we schedule a call?', FALSE),
('Sarah Smith', 'sarah@techcorp.com', 'Collaboration Opportunity', 'We are looking for a talented developer to join our team on a exciting AI project. Your portfolio looks impressive!', TRUE)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_skills_user_id ON skills(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_user_id ON blog_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_statistics_user_id ON statistics(user_id);

-- Enable Row Level Security (RLS) for better security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access for skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access for blog_posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read access for statistics" ON statistics FOR SELECT USING (true);

-- Create policy for contact messages (insert only)
CREATE POLICY "Public insert access for contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);

COMMIT;