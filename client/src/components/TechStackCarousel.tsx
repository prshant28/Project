import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiFigma,
  SiVuedotjs,
  SiPython,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiNetlify,
  SiVercel,
  SiAmazon,
  SiFirebase,
  SiRedis,
  SiFramer,
  SiBootstrap,
  SiSass,
  SiWebpack,
  SiVite,
  SiOpenai,
  SiTensorflow,
  SiPandas,
  SiNumpy,
  SiJupyter,
} from "react-icons/si";
import {
  Code,
  Palette,
  Database,
  Cloud,
  Brain,
  Zap,
  Layers,
  Globe,
  Settings,
} from "lucide-react";

const TechStackCarousel = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const categories = [
    { id: "all", name: "All Tech", icon: Layers, color: "text-primary" },
    { id: "frontend", name: "Frontend", icon: Palette, color: "text-blue-500" },
    { id: "backend", name: "Backend", icon: Code, color: "text-green-500" },
    {
      id: "database",
      name: "Database",
      icon: Database,
      color: "text-orange-500",
    },
    {
      id: "cloud",
      name: "Cloud & DevOps",
      icon: Cloud,
      color: "text-purple-500",
    },
    { id: "ai", name: "AI & ML", icon: Brain, color: "text-red-500" },
  ];

  const technologies = [
    // Frontend
    {
      icon: SiReact,
      color: "#61DAFB",
      name: "React",
      category: "frontend",
      experience: "Advanced",
      projects: 25,
    },
    {
      icon: SiVuedotjs,
      color: "#4FC08D",
      name: "Vue.js",
      category: "frontend",
      experience: "Intermediate",
      projects: 12,
    },
    {
      icon: SiTypescript,
      color: "#3178C6",
      name: "TypeScript",
      category: "frontend",
      experience: "Advanced",
      projects: 30,
    },
    {
      icon: SiJavascript,
      color: "#F7DF1E",
      name: "JavaScript",
      category: "frontend",
      experience: "Expert",
      projects: 40,
    },
    {
      icon: SiHtml5,
      color: "#E34F26",
      name: "HTML5",
      category: "frontend",
      experience: "Expert",
      projects: 50,
    },
    {
      icon: SiCss3,
      color: "#1572B6",
      name: "CSS3",
      category: "frontend",
      experience: "Expert",
      projects: 45,
    },
    {
      icon: SiTailwindcss,
      color: "#06B6D4",
      name: "Tailwind CSS",
      category: "frontend",
      experience: "Advanced",
      projects: 20,
    },
    {
      icon: SiBootstrap,
      color: "#7952B3",
      name: "Bootstrap",
      category: "frontend",
      experience: "Advanced",
      projects: 15,
    },
    {
      icon: SiSass,
      color: "#CC6699",
      name: "Sass",
      category: "frontend",
      experience: "Intermediate",
      projects: 10,
    },
    {
      icon: SiFramer,
      color: "#0055FF",
      name: "Framer Motion",
      category: "frontend",
      experience: "Advanced",
      projects: 18,
    },

    // Backend
    {
      icon: SiNodedotjs,
      color: "#339933",
      name: "Node.js",
      category: "backend",
      experience: "Advanced",
      projects: 28,
    },
    {
      icon: SiExpress,
      color: "#000000",
      name: "Express.js",
      category: "backend",
      experience: "Advanced",
      projects: 25,
    },
    {
      icon: SiPython,
      color: "#3776AB",
      name: "Python",
      category: "backend",
      experience: "Expert",
      projects: 35,
    },

    // Database
    {
      icon: SiMongodb,
      color: "#47A248",
      name: "MongoDB",
      category: "database",
      experience: "Advanced",
      projects: 20,
    },
    {
      icon: SiPostgresql,
      color: "#336791",
      name: "PostgreSQL",
      category: "database",
      experience: "Intermediate",
      projects: 15,
    },
    {
      icon: SiRedis,
      color: "#DC382D",
      name: "Redis",
      category: "database",
      experience: "Intermediate",
      projects: 8,
    },

    // Cloud & DevOps
    {
      icon: SiVercel,
      color: "#000000",
      name: "Vercel",
      category: "cloud",
      experience: "Advanced",
      projects: 22,
    },
    {
      icon: SiNetlify,
      color: "#00C7B7",
      name: "Netlify",
      category: "cloud",
      experience: "Advanced",
      projects: 18,
    },
    {
      icon: SiAmazon,
      color: "#FF9900",
      name: "AWS",
      category: "cloud",
      experience: "Intermediate",
      projects: 10,
    },
    {
      icon: SiFirebase,
      color: "#FFCA28",
      name: "Firebase",
      category: "cloud",
      experience: "Advanced",
      projects: 16,
    },
    {
      icon: SiDocker,
      color: "#2496ED",
      name: "Docker",
      category: "cloud",
      experience: "Intermediate",
      projects: 12,
    },
    {
      icon: SiGit,
      color: "#F05032",
      name: "Git",
      category: "cloud",
      experience: "Expert",
      projects: 50,
    },
    {
      icon: SiVite,
      color: "#646CFF",
      name: "Vite",
      category: "cloud",
      experience: "Advanced",
      projects: 20,
    },
    {
      icon: SiWebpack,
      color: "#8DD6F9",
      name: "Webpack",
      category: "cloud",
      experience: "Intermediate",
      projects: 15,
    },

    // AI & ML
    {
      icon: SiOpenai,
      color: "#412991",
      name: "OpenAI",
      category: "ai",
      experience: "Expert",
      projects: 30,
    },
    {
      icon: SiTensorflow,
      color: "#FF6F00",
      name: "TensorFlow",
      category: "ai",
      experience: "Intermediate",
      projects: 8,
    },
    {
      icon: SiPandas,
      color: "#150458",
      name: "Pandas",
      category: "ai",
      experience: "Advanced",
      projects: 20,
    },
    {
      icon: SiNumpy,
      color: "#013243",
      name: "NumPy",
      category: "ai",
      experience: "Advanced",
      projects: 18,
    },
    {
      icon: SiJupyter,
      color: "#F37626",
      name: "Jupyter",
      category: "ai",
      experience: "Advanced",
      projects: 25,
    },

    // Design
    {
      icon: SiFigma,
      color: "#F24E1E",
      name: "Figma",
      category: "frontend",
      experience: "Advanced",
      projects: 30,
    },
  ];

  const filteredTechnologies =
    activeCategory === "all"
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case "Expert":
        return "text-green-500";
      case "Advanced":
        return "text-blue-500";
      case "Intermediate":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Advanced background effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background"
        style={{ y: backgroundY }}
      />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, hsl(var(--primary)) 2px, transparent 0), 
                           radial-gradient(circle at 75px 75px, hsl(var(--secondary)) 1px, transparent 0)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-primary/20 to-secondary/20"
          style={{
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15],
            x: [0, Math.random() * 30 - 15],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

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
              <Settings size={16} />
              Technologies
              <Code size={16} />
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-alegreya font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 relative inline-block bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
          >
            I Work With
            <motion.span
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
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg text-muted-foreground"
            style={{ fontFamily: '"Rajdhani", sans-serif' }}
          >
            A comprehensive showcase of the modern technologies, frameworks, and
            tools I use to build exceptional digital experiences.
          </motion.p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full border-2 transition-all duration-300 flex items-center gap-2 font-medium ${
                  activeCategory === category.id
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                    : "border-border bg-card/50 hover:border-primary/50 hover:bg-card"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon
                  size={18}
                  className={
                    activeCategory === category.id
                      ? "text-white"
                      : category.color
                  }
                />
                <span className="text-sm">{category.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
        >
          {filteredTechnologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  rotateY: 10,
                }}
                className="relative group"
              >
                <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                  {/* Tech Icon */}
                  <motion.div
                    className="flex justify-center mb-4"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon size={48} color={tech.color} />
                  </motion.div>

                  {/* Tech Name */}
                  <h4 className="font-medium text-sm mb-2 text-foreground">
                    {tech.name}
                  </h4>

                  {/* Experience Level */}
                  <div
                    className={`text-xs font-medium mb-2 ${getExperienceColor(tech.experience)}`}
                  >
                    {tech.experience}
                  </div>

                  {/* Projects Count */}
                  <div className="text-xs text-muted-foreground">
                    {tech.projects} projects
                  </div>

                  {/* Animated border on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-primary/50 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tech Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center bg-card/30 backdrop-blur-sm p-8 rounded-2xl border border-primary/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {technologies.length}+
              </div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">100+</div>
              <div className="text-sm text-muted-foreground">AI Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <div className="text-sm text-muted-foreground">
                Projects Built
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">3+</div>
              <div className="text-sm text-muted-foreground">
                Years Experience
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackCarousel;