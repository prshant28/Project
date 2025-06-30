import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, Code, ChevronRight } from "lucide-react";
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    closeMobileMenu();
  };
  
  const navLinks = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#timeline", label: "Timeline", id: "timeline" },
    { href: "#about", label: "About", id: "about" },
    { href: "#blog", label: "Blog", id: "blog" },
    { href: "#contact", label: "Contact", id: "contact" }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50" 
          : "bg-transparent"
      }`}>
        <div className="container mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
          <nav className="flex justify-between items-center">
            <button 
              onClick={() => scrollToSection("home")}
              className="group flex items-center gap-2 relative z-50"
            >
              <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
                <Code size={14} className="xs:w-4 xs:h-4 sm:w-[18px] sm:h-[18px] text-primary" />
              </div>
              <div className="hidden xs:block">
                <span className="text-primary font-alegreya font-bold text-lg xs:text-xl sm:text-2xl tracking-wider uppercase">
                  Prshant
                </span>
                <span className="text-foreground font-alegreya text-xs sm:text-sm tracking-widest block -mt-1">.developer</span>
              </div>
              <div className="block xs:hidden">
                <span className="text-primary font-alegreya font-bold text-base tracking-wider uppercase">
                  P.dev
                </span>
              </div>
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <button 
                  key={link.href}
                  onClick={() => scrollToSection(link.id)}
                  className={`font-alegreya py-2 px-3 xl:px-4 rounded-md uppercase tracking-wider text-sm relative group transition-colors duration-200 ${
                    activeSection === link.id 
                      ? "text-primary" 
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {activeSection === link.id && (
                    <motion.span 
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.label}
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary"></span>
                </button>
              ))}
              
              <div className="ml-3 xl:ml-4 flex items-center gap-3 xl:gap-4 pl-3 xl:pl-4 border-l border-muted">
                <ThemeToggle />
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="bg-primary/90 hover:bg-primary text-white py-2 px-4 xl:px-5 rounded-full text-sm font-alegreya font-medium transition-all duration-300 flex items-center gap-1 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 tracking-wide uppercase"
                >
                  Hire Me <ChevronRight size={14} />
                </button>
              </div>
            </div>
            
            {/* Tablet Menu (md to lg) */}
            <div className="hidden md:flex lg:hidden items-center gap-1">
              {navLinks.slice(0, 4).map(link => (
                <button 
                  key={link.href}
                  onClick={() => scrollToSection(link.id)}
                  className={`font-alegreya py-2 px-2 rounded-md uppercase tracking-wider text-xs relative group transition-colors duration-200 ${
                    activeSection === link.id 
                      ? "text-primary" 
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {activeSection === link.id && (
                    <motion.span 
                      layoutId="tabletNavIndicator"
                      className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              ))}
              
              <div className="ml-2 flex items-center gap-2 pl-2 border-l border-muted">
                <ThemeToggle />
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="bg-primary/90 hover:bg-primary text-white py-1.5 px-3 rounded-full text-xs font-alegreya font-medium transition-all duration-300 flex items-center gap-1 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 tracking-wide uppercase"
                >
                  Hire <ChevronRight size={12} />
                </button>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3 relative z-50">
              <ThemeToggle />
              <button 
                className="text-foreground w-9 h-9 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-colors" 
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <motion.div
                  initial={false}
                  animate={mobileMenuOpen ? "open" : "closed"}
                  variants={{
                    open: { rotate: 90 },
                    closed: { rotate: 0 }
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
            />
            
            {/* Mobile Menu */}
            <motion.div 
              className="mobile-menu-container md:hidden fixed top-0 right-0 h-full w-full max-w-sm bg-background/98 backdrop-blur-xl shadow-2xl border-l border-border/50 z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/30 bg-background/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                    <Code size={16} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-primary font-alegreya font-bold text-lg tracking-wider uppercase">
                      Prshant
                    </span>
                    <span className="text-foreground font-alegreya text-xs tracking-widest block -mt-1">.dev</span>
                  </div>
                </div>
                <button 
                  onClick={closeMobileMenu}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              {/* Scrollable Navigation Links */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.button 
                      key={link.href} 
                      onClick={() => scrollToSection(link.id)}
                      className={`w-full font-alegreya py-3 px-4 text-left rounded-lg uppercase tracking-wider text-base font-medium transition-all duration-200 flex justify-between items-center group ${
                        activeSection === link.id 
                          ? "bg-primary/10 text-primary border border-primary/20" 
                          : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={16} className={`transition-transform group-hover:translate-x-1 ${
                        activeSection === link.id ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Mobile Menu Footer */}
              <motion.div 
                className="p-4 border-t border-border/30 space-y-4 bg-background/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-3 px-6 rounded-xl text-base font-alegreya font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/30 hover:scale-[1.02] tracking-wide uppercase"
                >
                  Hire Me <ChevronRight size={18} />
                </button>
                
                <div className="text-center text-muted-foreground">
                  <p className="font-alegreya text-sm">&copy; {new Date().getFullYear()} Prashant.dev</p>
                  <p className="text-xs mt-1">UI/UX Designer & Full Stack Developer</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
