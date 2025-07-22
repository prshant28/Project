import { motion } from "framer-motion";
import {
  Download,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Code,
  Palette,
  Lightbulb,
  Star,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TypingEffect from "./TypingEffect";
import profileImage from "../assets/profile-new.png";
import { useState, useEffect } from "react";

const HeroSection = () => {
  // Image loading state to prevent layout shifts
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Preload image for instant loading
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = profileImage;
  }, []);

  // Texts for the typing effect
  const typingTexts = [
    "Full-Stack Developer",
    "AI Tools Expert", 
    "Tech Innovator",
    "Solutions Architect",
    "Creative Thinker",
    "UI/UX Designer", 
    "Brand Strategist",
    "Frontend Developer"
  ];

  // Achievement stats
  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "100+", label: "AI Tools Mastered" },
    { value: "11+", label: "Projects Built" },
    { value: "2", label: "Companies Founded" },
  ];

  // SCROLL TO PROJECTS FUNCTION
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Minimal particles for optimal performance
  const particles = Array.from({ length: 3 }).map((_, i) => ({
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 2,
  }));

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-20 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden w-full"
    >
      {/* Optimized particles background */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-gradient-to-tr from-secondary to-primary opacity-20 pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      {/* Simplified background gradients */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/3 blur-xl"></div>
      <div className="absolute top-40 right-10 w-40 h-40 rounded-full bg-secondary/3 blur-xl"></div>

      <div className="container mx-auto relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center w-full">
          {/* Text Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-1 text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-alegreya uppercase tracking-widest bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 block text-sm sm:text-base">
                Portfolio
              </span>

              {/* Theme-aware heading */}
              <motion.h1
                className="font-alegreya font-bold text-3xl sm:text-4xl lg:text-5xl mb-2 tracking-wide uppercase leading-tight"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="text-foreground">Hello, It's Me</div>
                <div className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  Prashant
                </div>
              </motion.h1>

              {/* Colored typing effect */}
              <motion.div
                className="text-lg sm:text-xl md:text-2xl mb-6 h-8 font-poppins"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="text-muted-foreground">I'm a </span>
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text font-semibold">
                  <TypingEffect texts={typingTexts} />
                </span>
              </motion.div>

              {/* MOBILE ONLY: Profile Image with fixed dimensions */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="md:hidden relative mb-6"
              >
                <div className="relative w-64 h-64 mx-auto">
                  {/* Fixed container to prevent layout shift */}
                  <div className="absolute inset-0">
                    {/* Background effects - only show when image is loaded */}
                    {imageLoaded && (
                      <>
                        <motion.div
                          className="absolute -inset-6 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-2xl"
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />

                        <motion.div
                          className="absolute -inset-2 border border-primary/20 rounded-full"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                      </>
                    )}

                    {/* Profile image container with fixed size */}
                    <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-3 border-primary/40 shadow-xl shadow-primary/20 bg-card/50">
                      {!imageLoaded && !imageError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                      
                      {imageError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Star className="text-primary" size={24} />
                            </div>
                            <div className="text-sm text-muted-foreground">Prashant</div>
                          </div>
                        </div>
                      )}

                      <motion.img
                        src={profileImage}
                        alt="Prashant - Full-Stack Developer & AI Expert"
                        className="w-full h-full object-cover"
                        style={{ 
                          opacity: imageLoaded ? 1 : 0,
                          transition: 'opacity 0.3s ease-in-out'
                        }}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                        loading="eager"
                        decoding="async"
                      />
                    </div>

                    {/* Mobile floating achievements - only show when image is loaded */}
                    {imageLoaded && (
                      <>
                        <motion.div
                          className="absolute top-2 -left-3 bg-card/90 backdrop-blur-md p-2 rounded-lg shadow-lg flex items-center gap-1 border border-primary/20 z-20"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                        >
                          <Star className="text-primary" size={12} />
                          <div className="text-primary font-semibold text-xs">3+</div>
                          <div className="text-xs font-poppins text-foreground">Years</div>
                        </motion.div>

                        <motion.div
                          className="absolute bottom-2 -right-3 bg-card/90 backdrop-blur-md p-2 rounded-lg shadow-lg flex items-center gap-1 border border-secondary/20 z-20"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5, duration: 0.4 }}
                        >
                          <Trophy className="text-secondary" size={12} />
                          <div className="text-secondary font-semibold text-xs">11+</div>
                          <div className="text-xs font-poppins text-foreground">Projects</div>
                        </motion.div>
                      </>
                    )}
                  </div>
                </div>

                {/* Mobile Achievement Stats */}
                <motion.div
                  className="mt-4 grid grid-cols-2 gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center bg-card/30 backdrop-blur-sm p-2 rounded-lg border border-border/30"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.05, duration: 0.4 }}
                    >
                      <div className="text-sm font-bold text-primary mb-1 font-alegreya">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground font-poppins uppercase tracking-wide">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.p
                className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed max-w-lg font-poppins"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Started in 2022, now with 3+ years of experience building
                scalable applications. Expert in 100+ AI tools, Founder & CEO of
                GadgetsFever.in and HostWithUs.site.
              </motion.p>

              {/* Action buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 flex items-center gap-2 group"
                >
                  <Download size={18} className="group-hover:animate-bounce" />
                  Download CV
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToProjects}
                  className="border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-2 group"
                >
                  View Work
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex justify-center md:justify-start gap-4 mb-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                  },
                  {
                    icon: Mail,
                    href: "mailto:contact@prashant.dev",
                    label: "Email",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-12 h-12 rounded-full bg-card/50 backdrop-blur-sm border border-border flex items-center justify-center hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </motion.div>

              {/* SEO-optimized section */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="bg-card/20 backdrop-blur-sm p-3 rounded-lg border border-primary/10"
              >
                <h3 className="text-xs font-medium text-secondary mb-1">
                  Web Developer & UI/UX Designer in India
                </h3>
                <p className="text-xs text-muted-foreground font-poppins mb-2">
                  Specializing in React, Next.js, Node.js and modern web technologies.
                </p>
                <div className="grid grid-cols-2 gap-1 text-xs font-poppins text-muted-foreground">
                  <div>• React/Next.js Expert</div>
                  <div>• UI/UX Designer</div>
                  <div>• Responsive Design</div>
                  <div>• Performance Expert</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* DESKTOP ONLY: Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:block relative"
          >
            <div className="relative w-80 h-80 mx-auto">
              {/* Fixed container to prevent layout shift */}
              <div className="absolute inset-0">
                {/* Background effects - only show when image is loaded */}
                {imageLoaded && (
                  <>
                    <motion.div
                      className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-3xl"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <motion.div
                      className="absolute -inset-2 border-2 border-primary/20 rounded-full"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />

                    <motion.div
                      className="absolute -inset-4 border border-secondary/15 rounded-full border-dashed"
                      animate={{ rotate: [360, 0] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </>
                )}

                {/* Profile image container with fixed size */}
                <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-primary/40 shadow-2xl shadow-primary/20 bg-card/50">
                  {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                      <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  {imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Star className="text-primary" size={32} />
                        </div>
                        <div className="text-lg text-muted-foreground font-semibold">Prashant</div>
                        <div className="text-sm text-muted-foreground">Full-Stack Developer</div>
                      </div>
                    </div>
                  )}

                  <motion.img
                    src={profileImage}
                    alt="Prashant - Full-Stack Developer & AI Expert"
                    className="w-full h-full object-cover"
                    style={{ 
                      opacity: imageLoaded ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out'
                    }}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    loading="eager"
                    decoding="async"
                  />

                  {/* Hover overlay effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Desktop floating achievements - only show when image is loaded */}
                {imageLoaded && (
                  <>
                    <motion.div
                      className="absolute top-3 -left-4 bg-card/90 backdrop-blur-md p-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-primary/20 z-20"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <Star className="text-primary" size={14} />
                      <div className="text-primary font-semibold text-sm">3+</div>
                      <div className="text-xs font-poppins whitespace-nowrap text-foreground">
                        Years Experience
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute bottom-8 -right-4 bg-card/90 backdrop-blur-md p-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-secondary/20 z-20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      <Trophy className="text-secondary" size={14} />
                      <div className="text-secondary font-semibold text-sm">11+</div>
                      <div className="text-xs font-poppins whitespace-nowrap text-foreground">
                        Projects Completed
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>

            {/* Achievement Stats below profile - Desktop only */}
            <motion.div
              className="mt-6 grid grid-cols-2 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center bg-card/30 backdrop-blur-sm p-3 rounded-xl border border-border/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05, duration: 0.4 }}
                >
                  <div className="text-lg font-bold text-primary mb-1 font-alegreya">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-poppins uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="text-primary" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground font-poppins">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
