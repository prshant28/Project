import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Skill } from "@shared/schema";

// Import static skills data as a fallback
import { skills as staticSkills } from "@/data/skills";

interface SkillProgressProps {
  skill: string;
  percentage: number;
  delay?: number;
}

const SkillProgress = ({
  skill,
  percentage,
  delay = 0,
}: SkillProgressProps) => {
  const progressRef = useRef(null);
  const isInView = useInView(progressRef, { once: true, margin: "-100px" });

  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-sm sm:text-base font-medium font-poppins">
          {skill}
        </span>
        <span className="text-sm sm:text-base font-semibold text-primary">
          {percentage}%
        </span>
      </div>
      <div
        ref={progressRef}
        className="h-2 w-full bg-muted rounded-full overflow-hidden"
      >
        <div
          className={`skill-bar ${isInView ? "animate" : ""}`}
          style={
            {
              "--width": `${percentage}%`,
              width: isInView ? `${percentage}%` : "0%",
            } as React.CSSProperties
          }
        ></div>
      </div>
    </div>
  );
};

interface StatCounterProps {
  value: string | number;
  label: string;
  delay?: number;
}

const StatCounter = ({ value, label, delay = 0 }: StatCounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value.toString());
    if (isNaN(end)) return;

    const duration = 2000;
    const increment = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={counterRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card p-4 sm:p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="text-primary text-2xl sm:text-4xl font-bold mb-2">
        {count}+
      </div>
      <p className="text-muted-foreground text-sm sm:text-base font-poppins">
        {label}
      </p>
    </motion.div>
  );
};

const SkillsSection = () => {
  // Fetch skills for each category from the API
  const { data: frontendSkills, isLoading: frontendLoading } = useQuery({
    queryKey: ["/api/skills/category/frontend"],
    select: (response: any) => response?.data as Skill[],
  });

  const { data: backendSkills, isLoading: backendLoading } = useQuery({
    queryKey: ["/api/skills/category/backend"],
    select: (response: any) => response?.data as Skill[],
  });

  const { data: aiSkills, isLoading: aiLoading } = useQuery({
    queryKey: ["/api/skills/category/ai"],
    select: (response: any) => response?.data as Skill[],
  });

  const { data: toolsSkills, isLoading: toolsLoading } = useQuery({
    queryKey: ["/api/skills/category/tools"],
    select: (response: any) => response?.data as Skill[],
  });

  // Fetch statistics
  const { data: statisticsData, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/statistics/1"],
    select: (response: any) => response?.data,
  });

  // Group skills loading state
  const isLoadingSkills =
    frontendLoading || backendLoading || aiLoading || toolsLoading;

  // Use API data if available, otherwise fallback to static data
  const frontendData = frontendSkills?.length
    ? frontendSkills
    : staticSkills.frontend || [];
  const backendData = backendSkills?.length
    ? backendSkills
    : staticSkills.backend || [];
  const aiData = aiSkills?.length ? aiSkills : staticSkills.ai || [];
  const toolsData = toolsSkills?.length
    ? toolsSkills
    : staticSkills.tools || [];

  return (
    <section id="skills" className="py-16 sm:py-20 w-full">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div className="text-center mb-16">
          {/* Portfolio Title Added */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium tracking-wider uppercase">
              My Skills
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-alegreya font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 relative inline-block bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
          >
            Technical Skills
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-muted-foreground"
          >
            A comprehensive overview of my technical skills and professional
            experience across various domains of software development and AI.
          </motion.p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
          <StatCounter value="11" label="Projects Built" delay={0.1} />
          <StatCounter value="3" label="Years Experience" delay={0.2} />
          <StatCounter value="100" label="AI Tools Mastered" delay={0.3} />
          <StatCounter value="2" label="Companies Founded" delay={0.4} />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Frontend Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Frontend Development
            </h3>
            {isLoadingSkills ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {frontendData.map((skill, index) => (
                  <SkillProgress
                    key={`frontend-${index}`}
                    skill={skill.name}
                    percentage={skill.percentage}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Backend Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-border/50 hover:border-secondary/30 transition-colors"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-secondary rounded-full"></span>
              Backend Development
            </h3>
            {isLoadingSkills ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {backendData.map((skill, index) => (
                  <SkillProgress
                    key={`backend-${index}`}
                    skill={skill.name}
                    percentage={skill.percentage}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* AI Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-accent rounded-full"></span>
              AI & Machine Learning
            </h3>
            {isLoadingSkills ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {aiData.map((skill, index) => (
                  <SkillProgress
                    key={`ai-${index}`}
                    skill={skill.name}
                    percentage={skill.percentage}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Tools & Technologies */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
              Tools & Technologies
            </h3>
            {isLoadingSkills ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {toolsData.map((skill, index) => (
                  <SkillProgress
                    key={`tools-${index}`}
                    skill={skill.name}
                    percentage={skill.percentage}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
