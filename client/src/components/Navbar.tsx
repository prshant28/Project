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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-background/90 backdrop-blur-xl shadow-md" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4">
        <nav className="flex justify-between items-center">
          <a 
            href="#home" 
            className="group flex items-center gap-2 relative z-20"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
              <Code size={16} className="sm:w-[18px] sm:h-[18px] text-primary" />
            </div>
            <div className="hidden xs:block">
              <span className="text-primary font-alegreya font-bold text-xl sm:text-2xl tracking-wider uppercase">
                Prashant
              </span>
              <span className="text-foreground font-alegreya text-xs sm:text-sm tracking-widest block -mt-1">.developer</span>
            </div>
            <div className="block xs:hidden">
              <span className="text-primary font-alegreya font-bold text-lg tracking-wider uppercase">
                P.dev
              </span>
            </div>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                className={`font-alegreya py-2 px-4 rounded-md uppercase tracking-wider text-sm relative group ${
                  activeSection === link.href.substring(1) 
                    ? "text-primary" 
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {activeSection === link.href.substring(1) && (
                  <motion.span 
                    layoutId="navIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {link.label}
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary"></span>
              </a>
            ))}
            
            <div className="ml-4 flex items-center gap-4 pl-4 border-l border-muted">
              <ThemeToggle />
              <a 
                href="#contact" 
                className="bg-primary/80 hover:bg-primary text-white py-2 px-5 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-1 shadow-lg shadow-primary/20"
              >
                Hire Me <ChevronRight size={14} />
              </a>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
              className="text-foreground relative z-20 w-10 h-10 flex items-center justify-center" 
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
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu with AnimatePresence for smooth animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 pt-20 px-4 pb-10 bg-background/95 backdrop-blur-lg z-10 flex flex-col justify-between w-full max-w-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col">
              {navLinks.map((link, index) => (
                <motion.a 
                  key={link.href} 
                  href={link.href} 
                  className="font-alegreya py-4 text-2xl font-medium uppercase tracking-wider border-b border-muted flex justify-between items-center"
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  {link.label}
                  <ChevronRight size={18} className="text-primary" />
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              className="mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <a 
                href="#contact" 
                className="w-full bg-primary text-white py-3 px-6 rounded-full text-lg font-medium flex items-center justify-center gap-2 shadow-lg"
                onClick={closeMobileMenu}
              >
                Get In Touch <ChevronRight size={18} />
              </a>
              <div className="mt-6 text-center text-muted-foreground">
                <p className="font-alegreya">&copy; {new Date().getFullYear()} Prashant.dev</p>
                <p className="text-sm mt-1">UI/UX Designer & Full Stack Developer</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
