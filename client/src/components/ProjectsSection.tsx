import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Github,
  Filter,
  Grid3X3,
  List,
  Eye,
  Star,
  Calendar,
  Code,
  Sparkles,
} from "lucide-react";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Get unique categories from projects
  const categories = ["all", ...Array.from(new Set(projects.map(p => p.category)))];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Handle image load
  const handleImageLoad = (projectId: number) => {
    setImageLoadStates(prev => ({ ...prev, [projectId]: true }));
  };

  // Handle image error
  const handleImageError = (projectId: number) => {
    setImageLoadStates(prev => ({ ...prev, [projectId]: false }));
  };

  const handleProjectClick = (url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Advanced background effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background"
        style={{ y: backgroundY }}
      />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, hsl(var(--primary)) 1px, transparent 0), 
                           radial-gradient(circle at 75px 75px, hsl(var(--secondary)) 1px, transparent 0)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-primary/20 to-secondary/20"
          style={{
            width: Math.random() * 6 + 3,
            height: Math.random() * 6 + 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 40 - 20],
            x: [0, Math.random() * 40 - 20],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div style={{ opacity }} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium tracking-wider uppercase">
              Featured Work
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-alegreya font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 relative inline-block bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
          >
            My Projects
            <motion.span
              className="absolute -top-6 -right-6 text-primary opacity-70"
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Sparkles size={28} />
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-muted-foreground"
          >
            A showcase of my recent work, featuring AI-powered applications, 
            full-stack web development, and innovative digital solutions.
          </motion.p>
        </motion.div>

        {/* Filter and View Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12"
        >
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-card/50 hover:bg-card border border-border/50 hover:border-primary/30"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Filter size={14} className="inline mr-2" />
                {category === "all" ? "All Projects" : category}
              </motion.button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-card/50 p-1 rounded-lg border border-border/50">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-primary text-white shadow-md"
                  : "hover:bg-muted"
              }`}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-primary text-white shadow-md"
                  : "hover:bg-muted"
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                : "space-y-6"
            }
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`group relative bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 ${
                  viewMode === "list" ? "flex flex-col md:flex-row" : ""
                }`}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Project Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === "list" ? "md:w-1/3 h-48 md:h-auto" : "h-48 sm:h-56"
                }`}>
                  {/* Image Loading Skeleton */}
                  {!imageLoadStates[project.id] && (
                    <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/30 animate-pulse flex items-center justify-center">
                      <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                      imageLoadStates[project.id] ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(project.id)}
                    onError={() => handleImageError(project.id)}
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star size={12} />
                      Featured
                    </div>
                  )}

                  {/* Status Badge */}
                  {project.status && (
                    <div className="absolute top-4 right-4 bg-blue-500/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {project.status}
                    </div>
                  )}

                  {/* Quick Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project.liveUrl!);
                        }}
                        className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <ExternalLink size={16} />
                      </button>
                    )}
                    {project.sourceUrl && project.sourceUrl !== "#" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project.sourceUrl!);
                        }}
                        className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <Github size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className={`p-6 ${viewMode === "list" ? "md:w-2/3 flex flex-col justify-between" : ""}`}>
                  <div>
                    {/* Category Badge */}
                    <Badge variant="outline" className="mb-3 text-xs">
                      {project.category}
                    </Badge>

                    {/* Project Title */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Project Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  {project.technologies && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <Button
                        size="sm"
                        onClick={() => handleProjectClick(project.liveUrl!)}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white"
                      >
                        <Eye size={14} className="mr-2" />
                        Live Demo
                      </Button>
                    )}
                    {project.sourceUrl && project.sourceUrl !== "#" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleProjectClick(project.sourceUrl!)}
                        className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        <Code size={14} className="mr-2" />
                        Source
                      </Button>
                    )}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-muted-foreground text-lg mb-4">
              No projects found in this category.
            </div>
            <Button
              onClick={() => setActiveFilter("all")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              View All Projects
            </Button>
          </motion.div>
        )}

        {/* View All Projects Button */}
        {activeFilter === "all" && filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3"
            >
              <Github size={18} className="mr-2" />
              View More on GitHub
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;