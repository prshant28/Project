import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ExternalLink,
  Code,
  ArrowRight,
  Filter,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  Eye,
  Layers,
  Palette,
  Database,
  Cloud,
  Brain,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  const [filter, setFilter] = useState<string>("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("carousel");
  const [isHovered, setIsHovered] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Enhanced categories with icons and better organization
  const categoryData = [
    {
      id: "all",
      name: "All Projects",
      icon: Layers,
      color: "from-primary to-secondary",
      count: projects.length,
    },
    {
      id: "ai platform",
      name: "AI Platform",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      count: projects.filter((p) => p.category.toLowerCase() === "ai platform")
        .length,
    },
    {
      id: "tech blog",
      name: "Tech Blog",
      icon: Monitor,
      color: "from-blue-500 to-cyan-500",
      count: projects.filter((p) => p.category.toLowerCase() === "tech blog")
        .length,
    },
    {
      id: "hosting platform",
      name: "Hosting Platform",
      icon: Cloud,
      color: "from-green-500 to-emerald-500",
      count: projects.filter(
        (p) => p.category.toLowerCase() === "hosting platform",
      ).length,
    },
    {
      id: "e-commerce",
      name: "E-commerce",
      icon: Code,
      color: "from-orange-500 to-red-500",
      count: projects.filter((p) => p.category.toLowerCase() === "e-commerce")
        .length,
    },
    {
      id: "platform",
      name: "Platform",
      icon: Database,
      color: "from-indigo-500 to-purple-500",
      count: projects.filter((p) => p.category.toLowerCase() === "platform")
        .length,
    },
    {
      id: "ai tools",
      name: "AI Tools",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      count: projects.filter((p) => p.category.toLowerCase() === "ai tools")
        .length,
    },
    {
      id: "validation tools",
      name: "Validation Tools",
      icon: Palette,
      color: "from-teal-500 to-cyan-500",
      count: projects.filter(
        (p) => p.category.toLowerCase() === "validation tools",
      ).length,
    },
    {
      id: "business tools",
      name: "Business Tools",
      icon: Grid3X3,
      color: "from-pink-500 to-rose-500",
      count: projects.filter(
        (p) => p.category.toLowerCase() === "business tools",
      ).length,
    },
    {
      id: "business software",
      name: "Business Software",
      icon: Monitor,
      color: "from-violet-500 to-purple-500",
      count: projects.filter(
        (p) => p.category.toLowerCase() === "business software",
      ).length,
    },
    {
      id: "deal platform",
      name: "Deal Platform",
      icon: ExternalLink,
      color: "from-emerald-500 to-green-500",
      count: projects.filter(
        (p) => p.category.toLowerCase() === "deal platform",
      ).length,
    },
  ];

  // Filter out categories with no projects
  const availableCategories = categoryData.filter(
    (cat) => cat.id === "all" || cat.count > 0,
  );

  // Filter projects based on selected category
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category.toLowerCase() === filter);

  // Featured projects (first 6 for carousel)
  const featuredProjects = filteredProjects.slice(0, 6);

  // Auto-scroll carousel with hover pause
  useEffect(() => {
    if (viewMode === "carousel" && !isHovered && featuredProjects.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [featuredProjects.length, viewMode, isHovered]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  }, [featuredProjects.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length,
    );
  }, [featuredProjects.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const handleExploreAll = useCallback(() => {
    setShowAllProjects(true);
    setViewMode("grid");
    setFilter("all");
    setTimeout(() => {
      const gridElement = document.querySelector(".projects-grid");
      if (gridElement) {
        gridElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  }, []);

  const DeviceMockup = ({
    project,
    device,
  }: {
    project: any;
    device: "laptop" | "mobile";
  }) => {
    if (device === "laptop") {
      return (
        <div className="relative w-full max-w-[450px]">
          {/* Mac Laptop Frame */}
          <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-2xl p-4 sm:p-6 shadow-2xl">
            {/* Top Bar */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <motion.div
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 shadow-sm"
                whileHover={{ scale: 1.2 }}
              ></motion.div>
              <motion.div
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 shadow-sm"
                whileHover={{ scale: 1.2 }}
              ></motion.div>
              <motion.div
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 shadow-sm"
                whileHover={{ scale: 1.2 }}
              ></motion.div>
              <div className="flex-1 mx-2 sm:mx-4 bg-gray-700 rounded-md px-2 sm:px-3 py-1 text-xs text-gray-300 text-center truncate">
                {project?.liveUrl || "localhost:3000"}
              </div>
            </div>

            {/* Screen Content */}
            <motion.div
              className="relative bg-white rounded-lg overflow-hidden aspect-video w-full"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={project?.image}
                alt={project?.title}
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/3 via-transparent to-transparent pointer-events-none"></div>
            </motion.div>
          </div>

          {/* Laptop Base */}
          <div className="h-3 sm:h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-3xl shadow-lg"></div>
          <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-2 sm:h-3 bg-black/15 rounded-full blur-sm"></div>
        </div>
      );
    }

    return null;
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-16 sm:py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden w-full"
    >
      {/* Enhanced Background Elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 filter blur-3xl opacity-60"></div>
        <div className="absolute bottom-32 right-1/4 w-80 h-80 rounded-full bg-gradient-to-l from-accent/10 to-primary/10 filter blur-3xl opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-conic from-primary/5 via-transparent to-secondary/5 opacity-30"></div>
      </motion.div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm text-primary rounded-full text-sm font-medium tracking-wider uppercase border border-primary/30 shadow-lg">
              <Monitor size={16} />
              Featured Work
              <Code size={16} />
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 relative inline-block"
            style={{ fontFamily: '"Alegreya Sans SC", sans-serif' }}
          >
            <span className="font-alegreya font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 relative inline-block bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Premium Projects
            </span>
            <motion.div
              className="absolute -top-4 -right-8 text-primary/60"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✨
            </motion.div>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg text-muted-foreground"
            style={{ fontFamily: '"Rajdhani", sans-serif' }}
          >
            Experience my work through realistic laptop mockups. Interactive
            carousel showcasing full-stack applications with enhanced visuals
            and smooth animations.
          </motion.p>
        </motion.div>

        {/* Enhanced Controls */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Mobile-First Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full"
          >
            {/* Mobile Filter Dropdown */}
            <div className="block sm:hidden">
              <div className="relative">
                <motion.button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="w-full flex items-center justify-between gap-3 px-6 py-4 bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-xl border border-border/50 rounded-2xl text-left font-medium text-foreground shadow-lg"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <Filter size={18} className="text-primary" />
                    <span
                      className="text-base font-medium"
                      style={{ fontFamily: '"Alegreya Sans SC", sans-serif' }}
                    >
                      {availableCategories.find((cat) => cat.id === filter)
                        ?.name || "All Projects"}
                    </span>
                    <Badge className="bg-primary/20 text-primary text-xs px-2 py-1">
                      {filteredProjects.length}
                    </Badge>
                  </div>
                  <ChevronRight
                    size={18}
                    className={`transition-transform duration-200 ${showFilterDropdown ? "rotate-90" : ""}`}
                  />
                </motion.button>

                <AnimatePresence>
                  {showFilterDropdown && (
                    <>
                      {/* Backdrop */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        onClick={() => setShowFilterDropdown(false)}
                      />

                      {/* Dropdown Menu */}
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 left-0 right-0 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto"
                      >
                        <div className="p-2">
                          {availableCategories.map((category) => {
                            const Icon = category.icon;
                            return (
                              <motion.button
                                key={category.id}
                                onClick={() => {
                                  setFilter(category.id);
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                  filter === category.id
                                    ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30"
                                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center gap-3">
                                  <Icon
                                    size={16}
                                    className={
                                      filter === category.id
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                    }
                                  />
                                  <span
                                    className="font-medium text-sm"
                                    style={{
                                      fontFamily:
                                        '"Alegreya Sans SC", sans-serif',
                                    }}
                                  >
                                    {category.name}
                                  </span>
                                </div>
                                <Badge
                                  className={`text-xs px-2 py-1 ${
                                    filter === category.id
                                      ? "bg-primary/30 text-primary"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {category.count}
                                </Badge>
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop Filter Buttons */}
            <div className="hidden sm:flex flex-wrap justify-center gap-3">
              {availableCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm tracking-wide transition-all duration-300 ${
                      filter === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-primary/25 border-0 scale-105`
                        : "hover:bg-primary/10 hover:text-primary border border-primary/30 bg-background/80 backdrop-blur-sm hover:scale-105 hover:shadow-md text-muted-foreground"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ fontFamily: '"Alegreya Sans SC", sans-serif' }}
                  >
                    <Icon size={14} />
                    {category.name}
                    <Badge
                      className={`text-xs px-1.5 py-0.5 ${
                        filter === category.id
                          ? "bg-white/20 text-white"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {category.count}
                    </Badge>
                    {filter === category.id && (
                      <motion.div
                        layoutId="activeFilter"
                        className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-full -z-10`}
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* View Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-2 bg-muted/50 backdrop-blur-sm p-1 rounded-full border border-border/30">
              <Button
                variant={viewMode === "carousel" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("carousel")}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                  viewMode === "carousel"
                    ? "bg-primary text-white shadow-sm"
                    : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                }`}
              >
                <Monitor size={14} className="mr-1" />
                Showcase
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-primary text-white shadow-sm"
                    : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                }`}
              >
                <Grid3X3 size={14} className="mr-1" />
                Grid
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Carousel View */}
        {viewMode === "carousel" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mb-16"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main Carousel Container */}
            <div className="relative bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-xl rounded-3xl p-4 sm:p-8 border border-border/50 shadow-2xl">
              {/* Enhanced Mobile-First Carousel Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-3">
                    <h3
                      className="text-xl sm:text-2xl font-bold text-foreground"
                      style={{ fontFamily: '"Alegreya Sans SC", sans-serif' }}
                    >
                      Featured Showcase
                    </h3>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="hidden sm:flex items-center gap-2 text-sm text-primary"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Paused
                      </motion.div>
                    )}
                  </div>

                  {/* Slide Indicators */}
                  <div className="flex gap-2">
                    {featuredProjects.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "bg-primary scale-125 shadow-lg shadow-primary/50"
                            : "bg-muted-foreground/30 hover:bg-primary/60"
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                  <span className="text-sm text-muted-foreground sm:order-2">
                    {currentSlide + 1} / {featuredProjects.length}
                  </span>

                  <div className="flex items-center gap-2 sm:order-1">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevSlide}
                        className="rounded-full w-9 h-9 sm:w-10 sm:h-10 p-0 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                        disabled={featuredProjects.length === 0}
                      >
                        <ChevronLeft size={16} />
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextSlide}
                        className="rounded-full w-9 h-9 sm:w-10 sm:h-10 p-0 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                        disabled={featuredProjects.length === 0}
                      >
                        <ChevronRight size={16} />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Carousel Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px] sm:min-h-[500px]"
                >
                  {/* Project Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-4 sm:space-y-6 order-2 lg:order-1"
                  >
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <Badge className="bg-primary/20 text-primary border-primary/30 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                          {featuredProjects[currentSlide]?.category}
                        </Badge>
                        {featuredProjects[currentSlide]?.featured && (
                          <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 border-amber-500/30 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                            ⭐ Featured
                          </Badge>
                        )}
                      </div>

                      <h3
                        className="text-2xl sm:text-3xl font-bold text-foreground"
                        style={{ fontFamily: '"Alegreya Sans SC", sans-serif' }}
                      >
                        {featuredProjects[currentSlide]?.title}
                      </h3>

                      <p
                        className="text-muted-foreground text-base sm:text-lg leading-relaxed"
                        style={{ fontFamily: '"Rajdhani", sans-serif' }}
                      >
                        {featuredProjects[currentSlide]?.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {featuredProjects[currentSlide]?.technologies.map(
                          (tech: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-muted/80 text-foreground border border-muted-foreground/20 hover:bg-primary/10 hover:text-primary transition-colors duration-200 text-xs"
                            >
                              {tech}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Button
                        asChild
                        className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 w-full sm:w-auto"
                      >
                        <a
                          href={featuredProjects[currentSlide]?.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        className="border-primary/30 hover:bg-primary/10 w-full sm:w-auto"
                      >
                        <a
                          href={featuredProjects[currentSlide]?.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Code size={16} />
                          Source Code
                        </a>
                      </Button>
                    </div>
                  </motion.div>

                  {/* Device Mockup - Laptop Only */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="relative flex justify-center items-center min-h-[300px] sm:min-h-[400px] order-1 lg:order-2"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, rotateY: -2 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="transform-gpu w-full max-w-[400px] sm:max-w-[480px]"
                      style={{ perspective: "1000px" }}
                    >
                      <DeviceMockup
                        project={featuredProjects[currentSlide]}
                        device="laptop"
                      />
                    </motion.div>

                    {/* Enhanced Floating Elements */}
                    <motion.div
                      className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-secondary rounded-full shadow-xl"
                      animate={{
                        y: [0, -15, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-6 h-6 sm:w-8 sm:h-8 bg-accent rounded-full shadow-xl"
                      animate={{
                        y: [0, 15, 0],
                        x: [0, 8, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />

                    <motion.div
                      className="absolute top-1/4 -left-6 sm:-left-8 w-4 h-4 sm:w-6 sm:h-6 bg-secondary/80 rounded-full shadow-lg"
                      animate={{
                        y: [0, -12, 0],
                        opacity: [0.8, 1, 0.8],
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    />

                    <motion.div
                      className="absolute top-3/4 -right-6 sm:-right-8 w-3 h-3 sm:w-4 sm:h-4 bg-primary/70 rounded-full shadow-lg"
                      animate={{
                        y: [0, 10, 0],
                        x: [0, -5, 0],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5,
                      }}
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <motion.div
            className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {(showAllProjects
                ? filteredProjects
                : filteredProjects.slice(0, 6)
              ).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group h-full"
                >
                  <motion.div
                    className="rounded-xl overflow-hidden bg-card border border-muted hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl h-full flex flex-col"
                    whileHover={{
                      y: -8,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      },
                    }}
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-2">
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          {project.category}
                        </Badge>
                        {project.featured && (
                          <Badge className="bg-amber-500 text-white text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>

                      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 text-gray-700 flex items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={14} />
                        </motion.a>
                        <motion.a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 text-gray-700 flex items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Code size={14} />
                        </motion.a>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <h3
                        className="font-bold text-lg sm:text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2"
                        style={{ fontFamily: '"Alegreya Sans SC", sans-serif' }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1"
                        style={{ fontFamily: '"Rajdhani", sans-serif' }}
                      >
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies
                          .slice(0, 3)
                          .map((tech: string, techIndex: number) => (
                            <Badge
                              key={techIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View All Projects Button */}
        {!showAllProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-12 sm:mt-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={handleExploreAll}
                className="gap-2 rounded-full px-6 sm:px-8 py-3 sm:py-4 font-medium bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="flex items-center gap-2 relative z-10">
                  <Eye size={16} />
                  Explore All Projects ({projects.length})
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary to-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Show Less Button */}
        {showAllProjects && viewMode === "grid" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mt-12 sm:mt-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setShowAllProjects(false);
                  setViewMode("carousel");
                  sectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="gap-2 rounded-full px-6 sm:px-8 py-3 sm:py-4 font-medium border-primary/30 hover:bg-primary/10 transition-all duration-300 group"
              >
                <ChevronLeft size={16} />
                Back to Showcase
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
