import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  const [filter, setFilter] = useState<string>("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'featured'>('recent');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Get unique categories from projects
  const categories = [
    "all",
    ...Array.from(new Set(projects.map((p) => p.category.toLowerCase()))),
  ];

  // Filter and sort projects
  const getFilteredAndSortedProjects = () => {
    let filtered = filter === "all" 
      ? projects 
      : projects.filter((project) => project.category.toLowerCase() === filter);
    
    // Sort projects
    switch (sortBy) {
      case 'featured':
        return filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      case 'popular':
        return filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
      default:
        return filtered.sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());
    }
  };

  const filteredProjects = getFilteredAndSortedProjects();

  // Advanced animations
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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 sm:py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden w-full"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 filter blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-gradient-to-r from-secondary/10 to-blue-500/10 filter blur-3xl -z-10 animate-pulse delay-1000"></div>
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
              <Zap size={16} className="animate-bounce" />
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
            and seamless user experiences. Each project represents a unique challenge conquered.
          </motion.p>
        </motion.div>

        {/* Advanced Filter and Sort Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className={`rounded-full font-alegreya uppercase text-xs tracking-wider px-6 py-2.5 transition-all duration-300 ${
                  filter === category
                    ? "bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg shadow-primary/30 border-primary scale-105"
                    : "hover:bg-gradient-to-r hover:from-primary/15 hover:to-purple-500/15 hover:text-primary hover:scale-105 border-primary/40 dark:border-primary/20 bg-background/80 dark:bg-muted/20 backdrop-blur-sm"
                }`}
              >
                {category === "all" ? "All Projects" : category}
                {filter === category && (
                  <motion.span
                    className="ml-2 flex h-2 w-2 rounded-full bg-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}
              </Button>
            ))}
          </div>

          {/* Sort and View Controls */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
                <option value="featured">Featured</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                List
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
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
                  className="rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm border border-muted/50 hover:border-primary/40 transition-all duration-500 shadow-xl hover:shadow-2xl will-change-transform"
                  whileHover={{
                    y: -12,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                  style={{ transformOrigin: "center" }}
                >
                  {/* Enhanced Card Header */}
                  <div className="relative h-64 overflow-hidden">
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
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 font-poppins text-xs py-1.5 px-3 shadow-md border border-orange-400/30 backdrop-blur-sm">
                          {project.status}
                        </Badge>
                      )}
                      {project.featured && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 font-poppins text-xs py-1.5 px-3 shadow-md border border-green-400/30 backdrop-blur-sm animate-pulse">
                          <Star size={12} className="mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Enhanced Action Buttons - PURPLE THEME */}
                    <div className="absolute bottom-4 right-4 z-30 flex gap-3">
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-gray-700 dark:text-gray-200 flex items-center justify-center shadow-xl border border-white/30 dark:border-gray-700/50 will-change-transform"
                        whileHover={{
                          scale: 1.15,
                          backgroundColor: "rgb(147 51 234)", // Purple-600
                          color: "white",
                          boxShadow: "0 20px 25px -5px rgb(147 51 234 / 0.4), 0 10px 10px -5px rgb(147 51 234 / 0.1)",
                          transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="View live site"
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                      <motion.a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-gray-700 dark:text-gray-200 flex items-center justify-center shadow-xl border border-white/30 dark:border-gray-700/50 will-change-transform"
                        whileHover={{
                          scale: 1.15,
                          backgroundColor: "rgb(147 51 234)", // Purple-600
                          color: "white",
                          boxShadow: "0 20px 25px -5px rgb(147 51 234 / 0.4), 0 10px 10px -5px rgb(147 51 234 / 0.1)",
                          transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="View source code"
                      >
                        <Code size={16} />
                      </motion.a>
                    </div>

                    {/* Project Stats */}
                    <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 text-white/80">
                      {project.views && (
                        <div className="flex items-center gap-1 text-xs">
                          <Eye size={12} />
                          <span>{project.views}</span>
                        </div>
                      )}
                      {project.likes && (
                        <div className="flex items-center gap-1 text-xs">
                          <Heart size={12} />
                          <span>{project.likes}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Card Content */}
                  <div className="p-6">
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

                    {/* Enhanced Technology Stack */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.map((tech, techIndex) => (
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
                    </div>

                    {/* Enhanced Project Details Link */}
                    <div className="pt-4 border-t border-muted/50">
                      <motion.a
                        href="#"
                        className="text-primary hover:text-purple-500 transition-colors duration-300 flex items-center gap-2 text-sm font-semibold group/link"
                        whileHover={{ x: 4 }}
                      >
                        <span>Explore Project</span>
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover/link:translate-x-2"
                        />
                      </motion.a>
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

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center mt-20 space-y-6"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">
              Ready to See More?
            </h3>
            <p className="text-muted-foreground">
              Discover all my projects and dive deeper into my development journey
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="gap-3 rounded-full px-8 py-3 font-semibold shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 group"
            >
              <span>View All Projects</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="gap-3 rounded-full px-8 py-3 font-semibold border-primary/40 hover:bg-primary/10 hover:border-primary transition-all duration-300 group"
            >
              <Download size={18} />
              <span>Download Portfolio</span>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .bg-300% {
          background-size: 300% 300%;
        }
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
