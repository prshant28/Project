import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  const [filter, setFilter] = useState<string>("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Get unique categories from projects
  const categories = [
    "all",
    ...Array.from(new Set(projects.map((p) => p.category.toLowerCase()))),
  ];

  // Filter projects based on selected category
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category.toLowerCase() === filter);

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 bg-muted/5 relative overflow-hidden w-full"
    >
      {/* Background decorative elements - contained within viewport */}
      <div className="absolute top-40 right-10 w-80 h-80 rounded-full bg-primary/5 filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-secondary/5 filter blur-3xl -z-10"></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Portfolio Title Added */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-primary/20 dark:bg-primary/10 text-primary dark:text-primary rounded-full text-sm font-medium tracking-wider uppercase border border-primary/30">
              Portfolio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-alegreya font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 relative inline-block bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
          >
            Featured Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-muted-foreground"
          >
            Here are some of my recent works that showcase my skills and
            expertise in full-stack development and AI integration.
          </motion.p>
        </motion.div>

        {/* Filter buttons - IMPROVED VISIBILITY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className={`rounded-full font-alegreya uppercase text-xs tracking-wider px-6 transition-all duration-200 ${
                filter === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 border-primary"
                  : "hover:bg-primary/15 dark:hover:bg-primary/10 hover:text-primary border-primary/40 dark:border-primary/20 bg-background/80 dark:bg-muted/20"
              }`}
            >
              {category === "all" ? "All" : category}
              {filter === category && (
                <span className="ml-2 flex h-2 w-2 rounded-full bg-primary-foreground"></span>
              )}
            </Button>
          ))}
        </motion.div>

        {/* Projects grid with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Project Card with FIXED hover effects */}
                <motion.div
                  className="rounded-xl overflow-hidden bg-card border border-muted hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl will-change-transform"
                  whileHover={{
                    y: -8,
                    transition: {
                      type: "tween",
                      duration: 0.2,
                      ease: "easeOut",
                    },
                  }}
                  style={{ transformOrigin: "center" }}
                >
                  {/* Card Header with Image */}
                  <div className="relative h-56 overflow-hidden">
                    {/* Overlay gradient - FIXED */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity duration-300 group-hover:from-black/70"></div>
                    
                    {/* Project image - OPTIMIZED */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                      loading="lazy"
                    />

                    {/* Category and Status badges - FIXED VISIBILITY */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                      <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 font-alegreya uppercase tracking-wide py-1.5 px-3 shadow-lg border border-primary/20">
                        {project.category}
                      </Badge>
                      {project.status && (
                        <Badge className="bg-orange-600 text-white hover:bg-orange-700 font-poppins text-xs py-1 px-2.5 shadow-md border border-orange-500/30">
                          {project.status}
                        </Badge>
                      )}
                      {project.featured && (
                        <Badge className="bg-green-600 text-white hover:bg-green-700 font-poppins text-xs py-1 px-2.5 shadow-md border border-green-500/30">
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Quick action buttons - COMPLETELY FIXED */}
                    <div className="absolute bottom-4 right-4 z-30 flex gap-2">
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-700 dark:text-gray-200 flex items-center justify-center shadow-lg border border-white/20 dark:border-gray-700/50 will-change-transform"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgb(var(--primary))",
                          color: "white",
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View live site"
                      >
                        <ExternalLink size={14} />
                      </motion.a>
                      <motion.a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-700 dark:text-gray-200 flex items-center justify-center shadow-lg border border-white/20 dark:border-gray-700/50 will-change-transform"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgb(var(--primary))",
                          color: "white",
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View source code"
                      >
                        <Code size={14} />
                      </motion.a>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Project title with SMOOTH animated underline */}
                    <h3 className="font-alegreya font-bold text-xl mb-2 relative inline-block group-hover:text-primary transition-colors duration-300">
                      {project.title}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                    </h3>

                    {/* Project description */}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies used - IMPROVED VISIBILITY */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="rounded-full text-xs font-medium bg-muted/80 dark:bg-muted/50 text-foreground dark:text-muted-foreground hover:bg-primary/15 dark:hover:bg-primary/10 hover:text-primary border border-muted-foreground/20 dark:border-muted/40 hover:border-primary/30 transition-all duration-200 shadow-sm"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* View details link */}
                    <div className="pt-2 border-t border-muted">
                      <a
                        href="#"
                        className="text-primary hover:text-primary/80 transition-colors duration-200 flex items-center gap-1 text-sm font-medium group/link"
                      >
                        <span>View Project Details</span>
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-200 group-hover/link:translate-x-1"
                        />
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* OPTIMIZED Glow effect on hover */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-primary/15 to-primary/25 rounded-xl blur-lg -z-10"
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.3 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* "View All Projects" button with enhanced design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-16"
        >
          <Button
            size="lg"
            className="gap-2 rounded-full px-8 font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow group"
          >
            View All Projects
            <span className="relative transition-all duration-300 group-hover:translate-x-1">
              <ArrowRight size={16} />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
