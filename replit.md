# Portfolio Website - Prashant.dev

## Overview

This is a modern, full-stack portfolio website built with React, TypeScript, and Express.js. The application features a sleek portfolio design with dark/light theme support, interactive animations, and a complete backend API for content management. The project uses Drizzle ORM with PostgreSQL for data persistence and includes a comprehensive contact system, project showcase, and blog functionality.

## System Architecture

The application follows a monorepo structure with clear separation between client and server:

- **Frontend**: React with TypeScript, using Vite for build tooling
- **Backend**: Express.js server with RESTful API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: TailwindCSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Animations**: Framer Motion for smooth interactions and transitions

## Key Components

### Frontend Architecture
- **Component Structure**: Modular React components using TypeScript
- **UI Framework**: shadcn/ui component library built on Radix UI primitives
- **Styling**: TailwindCSS with custom CSS variables for theming
- **Animation**: Framer Motion for scroll-triggered animations and transitions
- **Forms**: React Hook Form with Zod validation
- **Responsive Design**: Mobile-first approach with responsive layouts

### Backend Architecture
- **API Design**: RESTful API with Express.js
- **Database Layer**: Drizzle ORM providing type-safe database operations
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Validation**: Zod schemas for request validation
- **File Structure**: Modular route handlers and storage abstractions

### Database Schema
The application includes the following main entities:
- **Users**: Basic user management with roles
- **Projects**: Portfolio projects with categories, technologies, and links
- **Skills**: Technical skills with categories and proficiency levels
- **Blog Posts**: Content management with published/draft states
- **Contact Messages**: Form submissions with read/unread status
- **Statistics**: Site statistics and metrics

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data
2. **API Layer**: Express.js routes handle requests and validate input
3. **Storage Layer**: Storage interface abstracts database operations
4. **Database**: Drizzle ORM manages PostgreSQL interactions
5. **Response**: Data flows back through the same layers with proper error handling

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18 with TypeScript support
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Styling**: TailwindCSS with PostCSS processing
- **Animations**: Framer Motion for interactive animations
- **Forms**: React Hook Form with Hookform Resolvers
- **State Management**: TanStack React Query
- **Icons**: Lucide React and React Icons

### Backend Dependencies
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js for API endpoints
- **Database**: Neon PostgreSQL with connection pooling
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution

### Build Tools
- **Frontend Build**: Vite with React plugin
- **Backend Build**: esbuild for production bundling
- **Development**: Hot reload and error overlay in development
- **TypeScript**: Strict type checking across the entire codebase

## Deployment Strategy

### Production Build
- Frontend builds to static assets in `dist/public`
- Backend compiles to a single Node.js bundle in `dist`
- Assets are served statically in production

### Environment Setup
- Database connection via `DATABASE_URL` environment variable
- Development and production configurations
- Graceful fallbacks for missing environment variables

### Scalability Considerations
- Connection pooling for database efficiency
- Static asset serving for performance
- Modular architecture for easy feature additions
- Type-safe database operations prevent runtime errors

## Changelog
- June 28, 2025. Initial setup
- June 28, 2025. Enhanced entire website with advanced animations and interactions:
  * Completely redesigned Technologies section with interactive filtering and 25+ technologies
  * Enhanced About Me section with tabbed interface, new profile image, and advanced animations  
  * Added global particle system with floating animations throughout the site
  * Applied consistent background effects and parallax animations across all sections
  * Updated all section headers with consistent gradient styling
  * Enhanced profile photo animations with orbital rings and 3D effects

## Recent Changes
- **Consistent Header Styling**: Applied unified section header design across all sections with gradient labels (PERSONAL STORY, FEATURED WORK, PROFESSIONAL SKILLS, LATEST INSIGHTS, GET IN TOUCH)
- **Projects Section**: Updated header styling and fixed AnimatePresence warning for smoother animations
- **Skills Section**: Enhanced header with gradient styling and improved visual consistency
- **Blog Section**: Updated header styling to match site-wide format
- **Contact Section**: Applied consistent header design and improved content
- **Animation Fixes**: Resolved AnimatePresence mode conflicts for better performance

## User Preferences

Preferred communication style: Simple, everyday language.
Technical preferences: Advanced animations, interactive elements, consistent visual design across all sections.