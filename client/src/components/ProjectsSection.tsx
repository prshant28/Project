import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from "framer-motion";
import { 
  ExternalLink, 
  Code, 
  ArrowRight, 
  Filter, 
  Star, 
  Calendar,
  Eye,
  Heart,
  Share2,
  Download,
  Award,
  Zap,
  Grid3X3,
  List,
  Search,
  SortAsc,
  SortDesc,
  Clock,
  TrendingUp,
  Github,
  Globe,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RefreshCw,
  BookOpen,
  Code2,
  Database,
  Smartphone,
  Monitor,
  Layers,
  Cpu,
  Cloud,
  Lock,
  Palette,
  Lightbulb,
  Target,
  Users,
  MessageCircle,
  ThumbsUp,
  Bookmark,
  Tag,
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  Minus,
  Settings,
  Info,
  CheckCircle,
  AlertCircle,
  Loader,
  Sparkles,
  Rocket,
  Trophy,
  Crown,
  Diamond,
  Flame,
  Lightning,
  Magic,
  Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { projects } from "@/data/projects";

// Enhanced project data structure
const enhancedProjects = [
  {
    id: 1,
    title: "EduConnect 247",
    description: "AI-powered academic assistant with Smart AI Study Planner, Assignment Tracker, In-app messaging system, and comprehensive learning analytics.",
    longDescription: "EduConnect 247 is a revolutionary educational platform that leverages artificial intelligence to transform the learning experience. Built with cutting-edge technology, it features personalized study planning, intelligent assignment tracking, real-time collaboration tools, and advanced analytics to help students achieve their academic goals.",
    image: "/api/placeholder/600/400",
    category: "AI Platform",
    technologies: ["React", "Node.js", "Python", "TensorFlow", "MongoDB", "Socket.io", "JWT", "Material-UI"],
    liveUrl: "https://educonnect247.com",
    sourceUrl: "https://github.com/prashant/educonnect247",
    status: "Live",
    featured: true,
    date: "2024-12-15",
    views: 15420,
    likes: 892,
    shares: 156,
    difficulty: "Advanced",
    duration: "6 months",
    teamSize: 4,
    role: "Full Stack Developer & AI Integration Specialist",
    achievements: ["Best Educational App 2024", "AI Innovation Award"],
    keyFeatures: [
      "Smart AI Study Planner with personalized recommendations",
      "Real-time assignment tracking and deadline management",
      "Collaborative study groups with video conferencing",
      "Advanced analytics and progress visualization",
      "Multi-language support with 15+ languages",
      "Offline mode with data synchronization"
    ],
    techStack: {
      frontend: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion"],
      backend: ["Node.js", "Express.js", "Python Flask", "GraphQL"],
      database: ["MongoDB", "Redis", "PostgreSQL"],
      ai: ["TensorFlow", "OpenAI GPT-4", "Scikit-learn"],
      deployment: ["AWS", "Docker", "Kubernetes", "CloudFront"]
    },
    metrics: {
      performance: 98,
      accessibility: 95,
      seo: 92,
      bestPractices: 96
    },
    testimonials: [
      {
        name: "Dr. Sarah Johnson",
        role: "Education Director",
        comment: "EduConnect 247 has revolutionized how our students learn and collaborate."
      }
    ]
  },
  {
    id: 2,
    title: "GadgetsFever",
    description: "Comprehensive tech blog platform covering latest gadgets, technology news, reviews, and in-depth analysis of consumer electronics.",
    longDescription: "GadgetsFever is a cutting-edge technology blog platform that serves as the ultimate destination for tech enthusiasts. With comprehensive coverage of the latest gadgets, detailed reviews, and expert analysis, it has become the go-to resource for informed technology decisions.",
    image: "/api/placeholder/600/400",
    category: "Tech Blog",
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "SCSS", "SEO Optimization"],
    liveUrl: "https://gadgetsfever.com",
    sourceUrl: "https://github.com/prashant/gadgetsfever",
    status: "Live",
    featured: true,
    date: "2024-11-20",
    views: 28750,
    likes: 1240,
    shares: 320,
    difficulty: "Intermediate",
    duration: "4 months",
    teamSize: 3,
    role: "Lead Developer & Content Strategist",
    achievements: ["Top Tech Blog 2024", "Content Excellence Award"],
    keyFeatures: [
      "Advanced content management system",
      "Real-time gadget price tracking",
      "Interactive product comparison tools",
      "User-generated reviews and ratings",
      "Newsletter automation system",
      "Social media integration"
    ],
    techStack: {
      frontend: ["WordPress", "Custom PHP", "JavaScript ES6", "SCSS"],
      backend: ["PHP 8.1", "MySQL 8.0", "Apache"],
      cms: ["Custom WordPress Theme", "Advanced Custom Fields"],
      seo: ["Yoast SEO", "Schema Markup", "Google Analytics"],
      deployment: ["cPanel", "Cloudflare", "SSL Certificate"]
    },
    metrics: {
      performance: 94,
      accessibility: 91,
      seo: 98,
      bestPractices: 93
    }
  },
  {
    id: 3,
    title: "HostWithUs",
    description: "Web and app hosting platform providing reliable hosting solutions. Founded and developed with modern infrastructure and security features.",
    longDescription: "HostWithUs is a comprehensive hosting platform designed to provide scalable, secure, and reliable hosting solutions for businesses of all sizes. Built with modern cloud infrastructure and advanced security measures.",
    image: "/api/placeholder/600/400",
    category: "Hosting Platform",
    technologies: ["Full-Stack", "Cloud Infrastructure", "DevOps", "Security"],
    liveUrl: "https://hostwithus.com",
    sourceUrl: "https://github.com/prashant/hostwithus",
    status: "Live",
    featured: true,
    date: "2024-10-10",
    views: 12300,
    likes: 567,
    shares: 89,
    difficulty: "Expert",
    duration: "8 months",
    teamSize: 6,
    role: "Founder & Lead Architect",
    achievements: ["Best Hosting Startup 2024", "Security Excellence Award"],
    keyFeatures: [
      "Auto-scaling cloud infrastructure",
      "Advanced security monitoring",
      "One-click application deployment",
      "24/7 customer support system",
      "Backup and disaster recovery",
      "Performance optimization tools"
    ],
    techStack: {
      frontend: ["React", "Next.js", "TypeScript", "Chakra UI"],
      backend: ["Node.js", "Express.js", "Python", "Go"],
      database: ["PostgreSQL", "MongoDB", "Redis"],
      infrastructure: ["AWS", "Docker", "Kubernetes", "Terraform"],
      monitoring: ["Prometheus", "Grafana", "ELK Stack"]
    },
    metrics: {
      performance: 99,
      accessibility: 94,
      seo: 89,
      bestPractices: 97
    }
  },
  {
    id: 4,
    title: "ShopEase Pro",
    description: "Modern e-commerce platform with advanced features including AI-powered recommendations, real-time inventory management, and seamless payment integration.",
    longDescription: "ShopEase Pro is a next-generation e-commerce platform that combines cutting-edge technology with user-centric design to deliver exceptional shopping experiences.",
    image: "/api/placeholder/600/400",
    category: "E-Commerce",
    technologies: ["React", "Node.js", "Stripe", "MongoDB", "Redis", "AWS"],
    liveUrl: "https://shopeasepro.com",
    sourceUrl: "https://github.com/prashant/shopeasepro",
    status: "In Development",
    featured: false,
    date: "2024-09-15",
    views: 8900,
    likes: 445,
    shares: 67,
    difficulty: "Advanced",
    duration: "5 months",
    teamSize: 5,
    role: "Full Stack Developer",
    keyFeatures: [
      "AI-powered product recommendations",
      "Real-time inventory management",
      "Multi-vendor marketplace",
      "Advanced analytics dashboard",
      "Mobile-first responsive design",
      "Integrated payment gateway"
    ],
    techStack: {
      frontend: ["React 18", "Redux Toolkit", "Tailwind CSS"],
      backend: ["Node.js", "Express.js", "GraphQL"],
      database: ["MongoDB", "Redis"],
      payment: ["Stripe", "PayPal", "Razorpay"],
      deployment: ["AWS", "Docker", "CI/CD Pipeline"]
    },
    metrics: {
      performance: 96,
      accessibility: 93,
      seo: 91,
      bestPractices: 95
    }
  },
  {
    id: 5,
    title: "TaskMaster Analytics",
    description: "Comprehensive project management platform with advanced analytics, team collaboration tools, and AI-powered insights for productivity optimization.",
    longDescription: "TaskMaster Analytics revolutionizes project management by combining powerful analytics with intuitive collaboration tools.",
    image: "/api/placeholder/600/400",
    category: "Platform",
    technologies: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "Docker"],
    liveUrl: "https://taskmasteranalytics.com",
    sourceUrl: "https://github.com/prashant/taskmaster",
    status: "Beta",
    featured: false,
    date: "2024-08-20",
    views: 6750,
    likes: 234,
    shares: 45,
    difficulty: "Advanced",
    duration: "4 months",
    teamSize: 3,
    role: "Backend Developer & Data Analyst",
    keyFeatures: [
      "Advanced project analytics",
      "Team performance insights",
      "Automated reporting system",
      "Real-time collaboration",
      "Custom dashboard creation",
      "API integration capabilities"
    ],
    techStack: {
      frontend: ["Vue.js 3", "Vuetify", "Chart.js"],
      backend: ["Python", "FastAPI", "Celery"],
      database: ["PostgreSQL", "InfluxDB"],
      analytics: ["Pandas", "NumPy", "Plotly"],
      deployment: ["Docker", "Kubernetes", "GCP"]
    },
    metrics: {
      performance: 93,
      accessibility: 90,
      seo: 87,
      bestPractices: 92
    }
  },
  {
    id: 6,
    title: "AI Content Creator",
    description: "Intelligent content generation platform powered by advanced AI models, supporting multiple content types and languages with SEO optimization.",
    longDescription: "AI Content Creator leverages state-of-the-art artificial intelligence to generate high-quality, SEO-optimized content across multiple formats and languages.",
    image: "/api/placeholder/600/400",
    category: "AI Tools",
    technologies: ["Python", "OpenAI", "React", "FastAPI", "PostgreSQL"],
    liveUrl: "https://aicontentcreator.com",
    sourceUrl: "https://github.com/prashant/ai-content-creator",
    status: "Live",
    featured: true,
    date: "2024-07-10",
    views: 19200,
    likes: 876,
    shares: 234,
    difficulty: "Expert",
    duration: "6 months",
    teamSize: 4,
    role: "AI Engineer & Full Stack Developer",
    achievements: ["AI Innovation Award 2024"],
    keyFeatures: [
      "Multi-format content generation",
      "SEO optimization algorithms",
      "Multi-language support",
      "Plagiarism detection",
      "Content scheduling system",
      "Analytics and performance tracking"
    ],
    techStack: {
      frontend: ["React", "TypeScript", "Material-UI"],
      backend: ["Python", "FastAPI", "Celery"],
      ai: ["OpenAI GPT-4", "Hugging Face", "spaCy"],
      database: ["PostgreSQL", "Redis", "Elasticsearch"],
      deployment: ["AWS", "Docker", "Lambda Functions"]
    },
    metrics: {
      performance: 97,
      accessibility: 94,
      seo: 96,
      bestPractices: 98
    }
  }
];

const ProjectsSection = () => {
  // State management
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [bookmarkedProjects, setBookmarkedProjects] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedTech, setSelectedTech] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Refs and motion values
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Get unique values for filters
  const categories = useMemo(() => [
    "all",
    ...Array.from(new Set(enhancedProjects.map(p => p.category.toLowerCase())))
  ], []);

  const technologies = useMemo(() => [
    "all",
    ...Array.from(new Set(enhancedProjects.flatMap(p => p.technologies)))
  ], []);

  const difficulties = useMemo(() => [
    "all",
    ...Array.from(new Set(enhancedProjects.map(p => p.difficulty).filter(Boolean)))
  ], []);

  const statuses = useMemo(() => [
    "all",
    ...Array.from(new Set(enhancedProjects.map(p => p.status).filter(Boolean)))
  ], []);

  // Enhanced filtering and sorting logic
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = enhancedProjects.filter(project => {
      const matchesCategory = filter === "all" || project.category.toLowerCase() === filter;
      const matchesSearch = searchQuery === "" || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTech = selectedTech === "all" || project.technologies.includes(selectedTech);
      const matchesDifficulty = difficultyFilter === "all" || project.difficulty === difficultyFilter;
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;

      return matchesCategory && matchesSearch && matchesTech && matchesDifficulty && matchesStatus;
    });

    // Sorting logic
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "recent":
          comparison = new Date(b.date) - new Date(a.date);
          break;
        case "popular":
          comparison = (b.views || 0) - (a.views || 0);
          break;
        case "featured":
          comparison = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
          break;
        case "likes":
          comparison = (b.likes || 0) - (a.likes || 0);
          break;
        case "alphabetical":
          comparison = a.title.localeCompare(b.title);
          break;
        case "difficulty":
          const difficultyOrder = { "Beginner": 1, "Intermediate": 2, "Advanced": 3, "Expert": 4 };
          comparison = (difficultyOrder[b.difficulty] || 0) - (difficultyOrder[a.difficulty] || 0);
          break;
        default:
          comparison = new Date(b.date) - new Date(a.date);
      }

      return sortOrder === "desc" ? comparison : -comparison;
    });

    return filtered;
  }, [filter, searchQuery, sortBy, sortOrder, selectedTech, difficultyFilter, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedProjects.length / itemsPerPage);
  const paginatedProjects = filteredAndSortedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Event handlers
  const handleLike = useCallback((projectId) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  }, []);

  const handleBookmark = useCallback((projectId) => {
    setBookmarkedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  }, []);

  const handleShare = useCallback(async (project) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: project.liveUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(project.liveUrl);
    }
  }, []);

  const resetFilters = useCallback(() => {
    setFilter("all");
    setSortBy("recent");
    setSearchQuery("");
    setSelectedTech("all");
    setDifficultyFilter("all");
    setStatusFilter("all");
    setCurrentPage(1);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -12,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Mouse move handler for interactive effects
  const handleMouseMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }, [mouseX, mouseY]);

  // Transform values for interactive effects
  const rotateX = useTransform(mouseY, [0, 400], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 400], [-10, 10]);

  return (
    <TooltipProvider>
      <section
        ref={sectionRef}
        id="projects"
        className="py-20 sm:py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden w-full"
        onMouseMove={handleMouseMove}
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 filter blur-3xl -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-gradient-to-r from-secondary/10 to-blue-500/10 filter blur-3xl -z-10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/5 to-purple-500/5 filter blur-3xl -z-10"></div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            {/* Animated Portfolio Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 dark:from-primary/10 dark:to-purple-500/10 text-primary dark:text-primary rounded-full text-sm font-semibold tracking-wider uppercase border border-primary/30 shadow-lg backdrop-blur-sm">
                <Award size={16} className="animate-pulse" />
                Portfolio Showcase
                <Sparkles size={16} className="animate-bounce" />
              </span>
            </motion.div>

            {/* Enhanced Title with Gradient Animation */}
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-alegreya font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 relative inline-block"
            >
              <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text animate-gradient-x bg-300% leading-tight">
                Featured Projects
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed"
            >
              Explore my latest creations that showcase cutting-edge technology, innovative design, 
              and seamless user experiences. Each project represents a unique challenge conquered with passion and precision.
            </motion.p>

            {/* Project Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-8 mt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{enhancedProjects.length}+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {enhancedProjects.reduce((sum, p) => sum + (p.views || 0), 0).toLocaleString()}+
                </div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {enhancedProjects.filter(p => p.featured).length}
                </div>
                <div className="text-sm text-muted-foreground">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Array.from(new Set(enhancedProjects.flatMap(p => p.technologies))).length}+
                </div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Advanced Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type="text"
                  placeholder="Search projects, technologies, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-full border-2 border-muted focus:border-primary transition-colors"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="rounded-full px-6"
                >
                  <Filter size={16} className="mr-2" />
                  Filters
                  <ChevronDown 
                    size={16} 
                    className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} 
                  />
                </Button>
                
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="rounded-full px-6"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-muted/50 mb-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="rounded-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category === "all" ? "All Categories" : category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Technology Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Technology</label>
                      <Select value={selectedTech} onValueChange={setSelectedTech}>
                        <SelectTrigger className="rounded-full">
                          <SelectValue placeholder="Select technology" />
                        </SelectTrigger>
                        <SelectContent>
                          {technologies.map(tech => (
                            <SelectItem key={tech} value={tech}>
                              {tech === "all" ? "All Technologies" : tech}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Difficulty</label>
                      <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                        <SelectTrigger className="rounded-full">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          {difficulties.map(difficulty => (
                            <SelectItem key={difficulty} value={difficulty}>
                              {difficulty === "all" ? "All Levels" : difficulty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="rounded-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map(status => (
                            <SelectItem key={status} value={status}>
                              {status === "all" ? "All Status" : status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sort and View Controls */}
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 rounded-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recent</SelectItem>
                      <SelectItem value="popular">Popular</SelectItem>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="likes">Most Liked</SelectItem>
                      <SelectItem value="alphabetical">A-Z</SelectItem>
                      <SelectItem value="difficulty">Difficulty</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                    className="rounded-full"
                  >
                    {sortOrder === "desc" ? <SortDesc size={16} /> : <SortAsc size={16} />}
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  Showing {filteredAndSortedProjects.length} of {enhancedProjects.length} projects
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-full"
                >
                  <Grid3X3 size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-full"
                >
                  <List size={16} />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Projects Grid/List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
                : 'flex flex-col gap-6 max-w-4xl mx-auto'
            }`}
          >
            <AnimatePresence mode="wait">
              {paginatedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                  className="group relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Enhanced Project Card */}
                  <motion.div
                    variants={cardHoverVariants}
                    whileHover="hover"
                    className={`rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm border border-muted/50 hover:border-primary/40 transition-all duration-500 shadow-xl hover:shadow-2xl will-change-transform ${
                      viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'
                    }`}
                    style={{
                      transformStyle: "preserve-3d",
                      rotateX: hoveredIndex === index ? rotateX : 0,
                      rotateY: hoveredIndex === index ? rotateY : 0,
                    }}
                  >
                    {/* Enhanced Card Header */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-1/3 h-48' : 'w-full h-64'
                    }`}>
                      {/* Dynamic Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-all duration-500 group-hover:from-black/90"></div>
                      
                      {/* Project Image with Parallax Effect */}
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700 ease-out will-change-transform"
                        whileHover={{ scale: 1.08 }}
                        loading="lazy"
                      />

                      {/* Enhanced Badges */}
                      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                        <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white hover:from-primary/90 hover:to-purple-500/90 font-alegreya uppercase tracking-wide py-1.5 px-4 shadow-lg border border-primary/20 backdrop-blur-sm">
                          {project.category}
                        </Badge>
                        {project.status && (
                          <Badge className={`font-poppins text-xs py-1.5 px-3 shadow-md backdrop-blur-sm ${
                            project.status === 'Live' 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-400/30'
                              : project.status === 'In Development'
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-400/30'
                              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-400/30'
                          }`}>
                            {project.status}
                          </Badge>
                        )}
                        {project.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 font-poppins text-xs py-1.5 px-3 shadow-md border border-yellow-400/30 backdrop-blur-sm animate-pulse">
                            <Crown size={12} className="mr-1" />
                            Featured
                          </Badge>
                        )}
                        {project.difficulty && (
                          <Badge className={`font-poppins text-xs py-1.5 px-3 shadow-md backdrop-blur-sm ${
                            project.difficulty === 'Beginner' 
                              ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                              : project.difficulty === 'Intermediate'
                              ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
                              : project.difficulty === 'Advanced'
                              ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
                              : 'bg-gradient-to-r from-red-400 to-red-600 text-white'
                          }`}>
                            {project.difficulty}
                          </Badge>
                        )}
                      </div>

                      {/* Enhanced Action Buttons - PURPLE THEME */}
                      <div className="absolute bottom-4 right-4 z-30 flex gap-3">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-11 h-11 rounded-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-gray-700 dark:text-gray-200 flex items-center justify-center shadow-xl border border-white/30 dark:border-gray-700/50 will-change-transform"
                              whileHover={{
                                scale: 1.15,
                                backgroundColor: "rgb(147 51 234)",
                                color: "white",
                                boxShadow: "0 20px 25px -5px rgb(147 51 234 / 0.4), 0 10px 10px -5px rgb(147 51 234 / 0.1)",
                                transition: { duration: 0.3 },
                              }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ExternalLink size={16} />
                            </motion.a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Live Site</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.a
                              href={project.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-11 h-11 rounded-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-gray-700 dark:text-gray-200 flex items-center justify-center shadow-xl border border-white/30 dark:border-gray-700/50 will-change-transform"
                              whileHover={{
                                scale: 1.15,
                                backgroundColor: "rgb(147 51 234)",
                                color: "white",
                                boxShadow: "0 20px 25px -5px rgb(147 51 234 / 0.4), 0 10px 10px -5px rgb(147 51 234 / 0.1)",
                                transition: { duration: 0.3 },
                              }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Code size={16} />
                            </motion.a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Source Code</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* Project Stats */}
                      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 text-white/80">
                        {project.views && (
                          <div className="flex items-center gap-1 text-xs bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                            <Eye size={12} />
                            <span>{project.views.toLocaleString()}</span>
                          </div>
                        )}
                        {project.likes && (
                          <div className="flex items-center gap-1 text-xs bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                            <Heart size={12} />
                            <span>{project.likes}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Card Content */}
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      {/* Project Title with Advanced Animation */}
                      <h3 className="font-alegreya font-bold text-xl mb-3 relative inline-block group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                        {project.title}
                        <motion.span
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      </h3>

                      {/* Project Description */}
                      <p className="text-muted-foreground text-sm mb-5 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Project Metrics */}
                      {project.metrics && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="text-xs">
                            <div className="flex justify-between mb-1">
                              <span>Performance</span>
                              <span>{project.metrics.performance}%</span>
                            </div>
                            <Progress value={project.metrics.performance} className="h-1" />
                          </div>
                          <div className="text-xs">
                            <div className="flex justify-between mb-1">
                              <span>SEO</span>
                              <span>{project.metrics.seo}%</span>
                            </div>
                            <Progress value={project.metrics.seo} className="h-1" />
                          </div>
                        </div>
                      )}

                      {/* Enhanced Technology Stack */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.technologies.slice(0, viewMode === 'list' ? 8 : 6).map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Badge
                              variant="secondary"
                              className="rounded-full text-xs font-medium bg-gradient-to-r from-muted/80 to-muted/60 dark:from-muted/50 dark:to-muted/30 text-foreground dark:text-muted-foreground hover:from-primary/15 hover:to-purple-500/15 dark:hover:from-primary/10 dark:hover:to-purple-500/10 hover:text-primary border border-muted-foreground/20 dark:border-muted/40 hover:border-primary/40 transition-all duration-300 shadow-sm backdrop-blur-sm"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                        {project.technologies.length > (viewMode === 'list' ? 8 : 6) && (
                          <Badge variant="outline" className="rounded-full text-xs">
                            +{project.technologies.length - (viewMode === 'list' ? 8 : 6)} more
                          </Badge>
                        )}
                      </div>

                      {/* Project Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-muted/50">
                        <div className="flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleLike(project.id)}
                                className={`rounded-full ${likedProjects.has(project.id) ? 'text-red-500' : ''}`}
                              >
                                <Heart size={16} className={likedProjects.has(project.id) ? 'fill-current' : ''} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{likedProjects.has(project.id) ? 'Unlike' : 'Like'} Project</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleBookmark(project.id)}
                                className={`rounded-full ${bookmarkedProjects.has(project.id) ? 'text-yellow-500' : ''}`}
                              >
                                <Bookmark size={16} className={bookmarkedProjects.has(project.id) ? 'fill-current' : ''} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{bookmarkedProjects.has(project.id) ? 'Remove Bookmark' : 'Bookmark'} Project</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleShare(project)}
                                className="rounded-full"
                              >
                                <Share2 size={16} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Share Project</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <motion.button
                              className="text-primary hover:text-purple-500 transition-colors duration-300 flex items-center gap-2 text-sm font-semibold group/link"
                              whileHover={{ x: 4 }}
                            >
                              <span>Explore Details</span>
                              <ArrowRight
                                size={16}
                                className="transition-transform duration-300 group-hover/link:translate-x-2"
                              />
                            </motion.button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">
                                {project.title}
                              </DialogTitle>
                            </DialogHeader>
                            
                            <div className="space-y-6">
                              {/* Project Image */}
                              <div className="relative h-64 rounded-xl overflow-hidden">
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Project Details */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-2">Description</h4>
                                  <p className="text-muted-foreground text-sm leading-relaxed">
                                    {project.longDescription || project.description}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Project Info</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span>Duration:</span>
                                      <span>{project.duration}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Team Size:</span>
                                      <span>{project.teamSize} members</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Role:</span>
                                      <span>{project.role}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Status:</span>
                                      <Badge variant="outline">{project.status}</Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Key Features */}
                              {project.keyFeatures && (
                                <div>
                                  <h4 className="font-semibold mb-3">Key Features</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {project.keyFeatures.map((feature, index) => (
                                      <div key={index} className="flex items-start gap-2 text-sm">
                                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>{feature}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Tech Stack */}
                              {project.techStack && (
                                <div>
                                  <h4 className="font-semibold mb-3">Technology Stack</h4>
                                  <Tabs defaultValue="frontend" className="w-full">
                                    <TabsList className="grid w-full grid-cols-4">
                                      <TabsTrigger value="frontend">Frontend</TabsTrigger>
                                      <TabsTrigger value="backend">Backend</TabsTrigger>
                                      <TabsTrigger value="database">Database</TabsTrigger>
                                      <TabsTrigger value="deployment">Deploy</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="frontend" className="mt-4">
                                      <div className="flex flex-wrap gap-2">
                                        {project.techStack.frontend?.map((tech, index) => (
                                          <Badge key={index} variant="secondary">{tech}</Badge>
                                        ))}
                                      </div>
                                    </TabsContent>
                                    <TabsContent value="backend" className="mt-4">
                                      <div className="flex flex-wrap gap-2">
                                        {project.techStack.backend?.map((tech, index) => (
                                          <Badge key={index} variant="secondary">{tech}</Badge>
                                        ))}
                                      </div>
                                    </TabsContent>
                                    <TabsContent value="database" className="mt-4">
                                      <div className="flex flex-wrap gap-2">
                                        {project.techStack.database?.map((tech, index) => (
                                          <Badge key={index} variant="secondary">{tech}</Badge>
                                        ))}
                                      </div>
                                    </TabsContent>
                                    <TabsContent value="deployment" className="mt-4">
                                      <div className="flex flex-wrap gap-2">
                                        {project.techStack.deployment?.map((tech, index) => (
                                          <Badge key={index} variant="secondary">{tech}</Badge>
                                        ))}
                                      </div>
                                    </TabsContent>
                                  </Tabs>
                                </div>
                              )}

                              {/* Performance Metrics */}
                              {project.metrics && (
                                <div>
                                  <h4 className="font-semibold mb-3">Performance Metrics</h4>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {Object.entries(project.metrics).map(([key, value]) => (
                                      <div key={key} className="text-center">
                                        <div className="text-2xl font-bold text-primary">{value}%</div>
                                        <div className="text-xs text-muted-foreground capitalize">{key}</div>
                                        <Progress value={value} className="mt-1 h-1" />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Achievements */}
                              {project.achievements && (
                                <div>
                                  <h4 className="font-semibold mb-3">Achievements</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {project.achievements.map((achievement, index) => (
                                      <Badge key={index} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                        <Trophy size={12} className="mr-1" />
                                        {achievement}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Action Buttons */}
                              <div className="flex gap-4 pt-4 border-t">
                                <Button asChild className="flex-1">
                                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                    <Globe size={16} className="mr-2" />
                                    Visit Live Site
                                  </a>
                                </Button>
                                <Button variant="outline" asChild className="flex-1">
                                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                                    <Github size={16} className="mr-2" />
                                    View Source
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </motion.div>

                  {/* Enhanced Glow Effect */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-2xl blur-xl -z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex justify-center items-center gap-2 mt-12"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-full"
              >
                Previous
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="rounded-full w-10 h-10"
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-full"
              >
                Next
              </Button>
            </motion.div>
          )}

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center mt-20 space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">
                Ready to Collaborate?
              </h3>
              <p className="text-muted-foreground max-w
