import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, Code, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state for navbar background
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ["home", "projects", "skills", "timeline", "about", "blog", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#timeline", label: "Timeline" },
    { href: "#about", label: "About" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-500" 
           style={{ opacity: isScrolled ? 1 : 0 }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
        <nav className="flex justify-between items-center">
          {/* Logo Section */}
          <motion.a 
            href="#home" 
            className="group flex items-center gap-3 relative z-20"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Logo Icon with animated background */}
            <div className="relative">
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 border border-primary/20"
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  scale: 1.1,
                  boxShadow: "0 20px 40px -10px rgba(var(--primary), 0.4)"
                }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles size={20} className="text-white drop-shadow-sm" />
              </motion.div>
              
              {/* Animated ring around logo */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-primary/30"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            {/* Brand Text */}
            <div className="flex flex-col">
              <motion.span 
                className="text-primary font-alegreya font-bold text-xl sm:text-2xl tracking-wider uppercase leading-none"
                whileHover={{ 
                  background: "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Prashant
              </motion.span>
              <span className="text-muted-foreground font-alegreya text-xs sm:text-sm tracking-[0.2em] -mt-1 opacity-80">
                .developer
              </span>
            </div>
          </motion.a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Navigation Links */}
            <div className="flex items-center gap-1 bg-card/50 backdrop-blur-sm rounded-full px-2 py-2 border border-border/50">
              {navLinks.map((link, index) => (
                <motion.a 
                  key={link.href}
                  href={link.href} 
                  className={`relative font-alegreya py-2 px-4 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                    activeSection === link.href.substring(1) 
                      ? "text-white" 
                      : "text-foreground/70 hover:text-primary"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {/* Active indicator */}
                  {activeSection === link.href.substring(1) && (
                    <motion.div 
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg shadow-primary/25"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  
                  {/* Link text */}
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-full opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </div>
            
            {/* Right side controls */}
            <div className="flex items-center gap-4 ml-6">
              <ThemeToggle />
              
              {/* CTA Button */}
              <motion.a 
                href="#contact" 
                className="relative bg-gradient-to-r from-primary to-secondary text-white py-2.5 px-6 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-lg shadow-primary/25 border border-primary/20 overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px -10px rgba(var(--primary), 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <span className="relative z-10 font-alegreya-sans-sc uppercase tracking-wider">
                  Hire Me
                </span>
                <ChevronRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%]"
                  animate={{ translateX: ["100%", "200%"] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                />
              </motion.a>
            </div>
          </div>
          
          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <motion.button 
              className="relative text-foreground w-10 h-10 flex items-center justify-center rounded-full bg-card/50 backdrop-blur-sm border border-border/50" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                initial={false}
                animate={mobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
              
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-xl z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
            />
            
            {/* Mobile Menu Content */}
            <motion.div 
              className="lg:hidden fixed top-20 left-4 right-4 bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl shadow-primary/10 z-50 overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Mobile Navigation Links */}
              <div className="p-6">
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.a 
                      key={link.href} 
                      href={link.href} 
                      className="flex items-center justify-between py-3 px-4 rounded-xl font-alegreya text-lg font-medium uppercase tracking-wider transition-all duration-300 hover:bg-primary/10 hover:text-primary group"
                      onClick={closeMobileMenu}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={16} className="text-primary group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.a>
                  ))}
                </div>
                
                {/* Mobile CTA */}
                <motion.div 
                  className="mt-6 pt-6 border-t border-border/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <motion.a 
                    href="#contact" 
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-xl text-base font-medium flex items-center justify-center gap-2 shadow-lg font-alegreya-sans-sc uppercase tracking-wider"
                    onClick={closeMobileMenu}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    Get In Touch 
                    <ChevronRight size={16} />
                  </motion.a>
                  
                  {/* Footer info */}
                  <div className="mt-4 text-center text-muted-foreground">
                    <p className="font-alegreya text-sm">&copy; {new Date().getFullYear()} Prashant.dev</p>
                    <p className="text-xs mt-1 font-poppins">UI/UX Designer & Full Stack Developer</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;