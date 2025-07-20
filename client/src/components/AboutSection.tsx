import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef, useState } from "react";
import {
  CheckCircle,
  Download,
  Calendar,
  Award,
  Code,
  Rocket,
  Building,
  Trophy,
  Star,
  Globe,
  Brain,
  Zap,
  Users,
  Coffee,
  Clock,
  Target,
  Sparkles,
  Play,
  Heart,
  ArrowRight,
} from "lucide-react";
import profileImage from "../assets/profile-new.png";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const tabs = [
    { id: "overview", name: "Overview", icon: Users },
    { id: "journey", name: "Journey", icon: Rocket },
    { id: "achievements", name: "Achievements", icon: Trophy },
  ];

  const personalStats = [
    {
      label: "Years Experience",
      value: "3+",
      icon: Clock,
      color: "text-blue-500",
    },
    {
      label: "Projects Built",
      value: "50+",
      icon: Code,
      color: "text-green-500",
    },
    {
      label: "AI Tools Mastered",
      value: "100+",
      icon: Brain,
      color: "text-purple-500",
    },
    {
      label: "Coffee Consumed",
      value: "∞",
      icon: Coffee,
      color: "text-orange-500",
    },
  ];

  const coreValues = [
    {
      title: "Innovation First",
      description:
        "Always exploring cutting-edge technologies and AI tools to create breakthrough solutions.",
      icon: Sparkles,
      color: "text-primary",
    },
    {
      title: "Quality Focus",
      description:
        "Delivering exceptional code quality and user experiences that exceed expectations.",
      icon: Target,
      color: "text-secondary",
    },
    {
      title: "Continuous Learning",
      description:
        "Staying ahead of technology trends and constantly expanding my skillset.",
      icon: Brain,
      color: "text-accent",
    },
    {
      title: "Client Success",
      description:
        "Your success is my success. Building solutions that drive real business growth.",
      icon: Heart,
      color: "text-primary",
    },
  ];

  

  const achievements = [
    {
      title: "Rank 2 Global Winner In Hostinger Hackathon",
      event: "Horizon App Hackathon 2025",
      description: "Achieved 2nd position globally among 10,000+ participants",
      icon: Trophy,
      color: "text-yellow-500",
      badge: "Global",
    },
    {
      title: "Master In 100+ AI Tools Expert",
      event: "Professional Certification",
      description:
        "Mastered and implemented 100+ AI tools in real-world projects",
      icon: Brain,
      color: "text-purple-500",
      badge: "Expert",
    },
    {
      title: "Startup Founder",
      event: "HostWithUs.site & GadgetsFever.in",
      description: "Successfully founded and manage two growing tech companies",
      icon: Building,
      color: "text-blue-500",
      badge: "CEO",
    },
  ];

  const journeyEvents = [
    {
      year: "2022",
      title: "Development Journey Begins",
      description:
        "Started learning full-stack development with modern web technologies",
      icon: Code,
      type: "milestone",
    },
    {
      year: "2023",
      title: "First Professional Projects",
      description: "Delivered successful web applications for local businesses",
      icon: Rocket,
      type: "achievement",
    },
    {
      year: "2024",
      title: "AI Expertise Development",
      description:
        "Mastered 100+ AI tools and integrated them into real-world solutions",
      icon: Brain,
      type: "innovation",
    },
    {
      year: "2024",
      title: "Company Foundations",
      description: "Founded GadgetsFever.in and HostWithUs.site",
      icon: Building,
      type: "milestone",
    },
    {
      year: "2025",
      title: "Global Recognition",
      description:
        "Achieved Rank 2 in Horizon App Hackathon among 10K+ participants",
      icon: Trophy,
      type: "achievement",
    },
  ];

  // Button handlers
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv/Prashant_Maurya_CV.pdf';
    link.download = 'Prashant_Maurya_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="about"
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
              My Journey
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-alegreya font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 relative inline-block bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
          >
            About Me
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
            Passionate full-stack developer, AI enthusiast, and entrepreneur
            building the future one line of code at a time.
          </motion.p>
        </motion.div>

        {/* Main Profile Section - SIMPLIFIED & POWERFUL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Profile Image with Clean Circular Design */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative max-w-sm mx-auto">
              {/* Single elegant background glow */}
              <motion.div
                className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Achievement Badge - Top */}
              <motion.div
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border-2 border-yellow-300/50 z-20"
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Trophy className="text-white" size={18} />
                <div className="text-white font-bold text-sm">Rank 2 Global</div>
              </motion.div>

              {/* Main Profile Circle */}
              <motion.div
                className="relative z-10 w-80 h-80 rounded-full overflow-hidden border-4 border-gradient-to-r from-primary to-secondary shadow-2xl shadow-primary/30"
                style={{
                  background: "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)))",
                  padding: "4px",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <motion.img
                    src={profileImage}
                    alt="Prashant - Full-Stack Developer & AI Expert"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Subtle hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* AI Tools Badge - Bottom Left */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-indigo-600 px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 border border-purple-300/30 z-20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Brain className="text-white" size={16} />
                <div className="text-white text-sm font-bold">100+ AI Tools</div>
              </motion.div>

              {/* Experience Badge - Bottom Right */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 border border-green-300/30 z-20"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Code className="text-white" size={16} />
                <div className="text-white text-sm font-bold">3+ Years</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Personal Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {personalStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border/50"
                  >
                    <Icon className={`mx-auto mb-2 ${stat.color}`} size={24} />
                    <div className="text-2xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Introduction Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-foreground">
                Hello It's Me Prashant Maurya 👋
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A passionate{" "}
                <span className="text-primary font-semibold">
                  full-stack developer
                </span>
                ,{" "}
                <span className="text-secondary font-semibold">
                  AI enthusiast
                </span>
                , and tech creator currently pursuing{" "}
                <span className="text-accent font-semibold">
                  B.Sc. (Hons.) in Data Science & Artificial Intelligence at IIT
                  Jodhpur
                </span>
                .
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Born on 28th June in Milkipur, Azamgarh – near Varanasi, Uttar
                Pradesh, India. Raised in a humble background, my journey has
                been one of consistent self-growth, driven by curiosity,
                learning, and a deep interest in building tools that solve
                real-life problems using technology and AI.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As the{" "}
                <span className="text-primary font-semibold">
                  Founder & CEO
                </span>{" "}
                of GadgetsFever.in and HostWithUs.site, I've successfully led
                teams to deliver exceptional digital experiences that drive
                business growth while mastering{" "}
                <span className="text-secondary font-semibold">
                  100+ AI tools
                </span>{" "}
                for innovative solutions.
              </p>
            </motion.div>

            {/* Action Buttons - UPDATED WITH WORKING FUNCTIONALITY */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 flex items-center gap-2 group"
              >
                <Users size={18} className="group-hover:animate-pulse" />
                Let's Work Together
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={downloadCV}
                className="border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-2 group"
              >
                <Download size={18} className="group-hover:animate-bounce" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Interactive Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-primary/10"
        >
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 font-medium ${
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "bg-card/50 hover:bg-card border border-border/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                  <span className="text-sm">{tab.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {coreValues.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-card/50 p-6 rounded-xl border border-border/30 hover:border-primary/30 transition-all"
                    >
                      <Icon className={`${value.color} mb-4`} size={32} />
                      <h4 className="text-lg font-semibold mb-2">
                        {value.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}

            

            {activeTab === "achievements" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center bg-card/50 p-6 rounded-xl border border-border/30 hover:border-primary/30 transition-all relative overflow-hidden"
                    >
                      <Badge className="absolute top-4 right-4 text-xs">
                        {achievement.badge}
                      </Badge>
                      <Icon
                        className={`mx-auto mb-4 ${achievement.color}`}
                        size={48}
                      />
                      <h4 className="font-bold text-lg mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-primary font-medium mb-2">
                        {achievement.event}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {achievement.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {activeTab === "journey" && (
              <div className="space-y-6">
                {journeyEvents.map((event, index) => {
                  const Icon = event.icon;
                  return (
                    <motion.div
                      key={event.year}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start gap-4 p-4 bg-card/30 rounded-xl hover:bg-card/50 transition-all"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="text-primary" size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-primary">
                            {event.year}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                        <h4 className="font-semibold mb-1">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;