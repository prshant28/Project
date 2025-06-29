import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  GraduationCap,
  BookOpen,
  Award,
  Calendar,
  MapPin,
  Sparkles,
  Star,
  Users,
  Target,
} from "lucide-react";

const EducationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const educationData = [
    {
      level: "Current Degree (Second Bachelor)",
      degree: "B.Sc. (Hons.) in Data Science and Artificial Intelligence",
      institution: "Indian Institute of Technology (IIT) Jodhpur",
      duration: "2025 - 2029",
      location: "Jodhpur, Rajasthan",
      focus:
        "AI Systems, ML, Data Analysis, Full-Stack App Development, and Problem Solving",
      type: "current",
      icon: GraduationCap,
      highlights: [
        "Prestigious IIT education",
        "AI & Data Science specialization",
        "Full-stack development focus",
        "Advanced problem-solving techniques",
      ],
    },
    {
      level: "Bachelor's Degree",
      degree: "B.Sc. (Bachelor of Science)",
      institution: "Dr. Ram Manohar Lohia Avadh University",
      duration: "2022 - 2025",
      location: "Ayodhya, Uttar Pradesh",
      focus: "Chemistry and Mathematics",
      type: "completed",
      icon: BookOpen,
      highlights: [
        "Scientific concepts mastery",
        "Quantitative logic development",
        "Data-based analysis skills",
        "Research methodology",
      ],
    },
    {
      level: "Schooling",
      degree: "Class 10 & 12 (PCM Stream)",
      institution: "Shri Vishwanath Inter College",
      duration: "2020 - 2022",
      location: "Kalan, Sultanpur, Uttar Pradesh",
      focus: "Physics, Chemistry, Mathematics",
      type: "foundation",
      icon: Award,
      highlights: [
        "Strong analytical foundation",
        "Scientific reasoning",
        "Mathematical problem-solving",
        "Academic excellence",
      ],
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "current":
        return "text-green-500";
      case "completed":
        return "text-blue-500";
      case "foundation":
        return "text-purple-500";
      default:
        return "text-primary";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "current":
        return "Pursuing";
      case "completed":
        return "Completed";
      case "foundation":
        return "Foundation";
      default:
        return "Education";
    }
  };

  return (
    <section
      id="education"
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
      {[...Array(10)].map((_, i) => (
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
              Academic Journey
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-alegreya font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 relative inline-block bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
          >
            Education
            <motion.span
              className="absolute -top-6 -right-6 text-primary opacity-70"
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <GraduationCap size={28} />
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-muted-foreground"
          >
            From foundational learning to advanced AI specialization at IIT
            Jodhpur, my educational journey reflects continuous growth and
            academic excellence.
          </motion.p>
        </motion.div>

        {/* Education Timeline */}
        <div className="space-y-8">
          {educationData.map((edu, index) => {
            const Icon = edu.icon;
            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative"
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                  {/* Header Section */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex items-start gap-4 mb-4 lg:mb-0">
                      <motion.div
                        className={`p-3 rounded-xl bg-primary/10 ${getTypeColor(edu.type)}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon size={32} className="text-current" />
                      </motion.div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-foreground">
                            {edu.degree}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium bg-primary/10 ${getTypeColor(edu.type)}`}
                          >
                            {getTypeBadge(edu.type)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">
                          {edu.level}
                        </p>
                        <p className="text-primary font-semibold text-lg">
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground lg:justify-end">
                        <Calendar size={14} />
                        <span>{edu.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground lg:justify-end">
                        <MapPin size={14} />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Focus Area */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-secondary mb-2 flex items-center gap-2">
                      <Target size={16} />
                      Focus Areas
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {edu.focus}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="text-sm font-semibold text-accent mb-3 flex items-center gap-2">
                      <Star size={16} />
                      Key Highlights
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {edu.highlights.map((highlight, hIndex) => (
                        <motion.div
                          key={hIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.2 + hIndex * 0.1,
                            duration: 0.5,
                          }}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0" />
                          <span>{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Animated decoration */}
                  <motion.div
                    className="absolute top-4 right-4 w-16 h-16 opacity-5"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div
                      className={`w-full h-full rounded-full border-2 ${edu.type === "current" ? "border-green-500" : edu.type === "completed" ? "border-blue-500" : "border-purple-500"} border-dashed`}
                    ></div>
                  </motion.div>
                </div>

                {/* Connection line */}
                {index < educationData.length - 1 && (
                  <motion.div
                    className="flex justify-center my-6"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                  >
                    <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Achievement Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-primary/10 text-center"
        >
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
            <Sparkles className="text-primary" size={24} />
            Educational Excellence
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My educational journey showcases a strong foundation in scientific
            reasoning and mathematics, progressing to advanced studies in Data
            Science and AI at one of India's premier institutes. This diverse
            academic background provides me with both theoretical depth and
            practical problem-solving skills essential for modern technology
            development.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
