import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

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
    <header 
      className={`navbar-container transition-all duration-500 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5" 
          : "bg-transparent"
      }`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        width: '100%'
      }}
    >
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 transition-opacity duration-500" 
        style={{ opacity: isScrolled ? 1 : 0 }} 
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
        <nav className="navbar-content">
          {/* Logo Section */}
          <a 
            href="#home" 
            className="logo-container group"
            style={{ textDecoration: 'none' }}
          >
            {/* Logo Icon */}
            <div className="logo-icon">
              <Sparkles size={20} style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }} />
            </div>
            
            {/* Brand Text */}
            <div className="logo-text">
              <span className="brand-name">
                Prashant
              </span>
              <span className="brand-subtitle">
                .developer
              </span>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <div className="nav-desktop">
            {/* Navigation Links */}
            <div className="nav-links-container">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className={`nav-link ${
                    activeSection === link.href.substring(1) ? 'active' : ''
                  }`}
                  style={{ textDecoration: 'none' }}
                >
                  {/* Active indicator */}
                  {activeSection === link.href.substring(1) && (
                    <div 
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                        borderRadius: '9999px',
                        boxShadow: '0 10px 25px -5px rgba(var(--primary), 0.25)',
                        zIndex: -1
                      }}
                    />
                  )}
                  
                  {/* Link text */}
                  <span style={{ position: 'relative', zIndex: 10 }}>{link.label}</span>
                </a>
              ))}
            </div>
            
            {/* Right side controls */}
            <div className="nav-controls">
              <ThemeToggle />
              
              {/* CTA Button */}
              <a 
                href="#contact" 
                className="cta-button"
                style={{ textDecoration: 'none' }}
              >
                <span style={{ 
                  position: 'relative', 
                  zIndex: 10,
                  fontFamily: '"Alegreya Sans SC", sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Hire Me
                </span>
                <ChevronRight size={14} style={{ position: 'relative', zIndex: 10 }} />
              </a>
            </div>
          </div>
          
          {/* Mobile Controls */}
          <div className="mobile-controls">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-button" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <div style={{
                transform: mobileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="mobile-menu-backdrop"
            onClick={closeMobileMenu}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(var(--background), 0.8)',
              backdropFilter: 'blur(20px)',
              zIndex: 40
            }}
          />
          
          {/* Mobile Menu Content */}
          <div className="mobile-menu-content">
            {/* Mobile Navigation Links */}
            <div className="mobile-nav-links">
              <div style={{ marginBottom: '0.5rem' }}>
                {navLinks.map((link) => (
                  <a 
                    key={link.href} 
                    href={link.href} 
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                    style={{ textDecoration: 'none' }}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={16} style={{ color: 'hsl(var(--primary))' }} />
                  </a>
                ))}
              </div>
              
              {/* Mobile CTA */}
              <div className="mobile-cta">
                <a 
                  href="#contact" 
                  className="mobile-cta-button"
                  onClick={closeMobileMenu}
                  style={{ textDecoration: 'none' }}
                >
                  Get In Touch 
                  <ChevronRight size={16} />
                </a>
                
                {/* Footer info */}
                <div className="mobile-footer">
                  <p style={{ 
                    fontFamily: '"Alegreya Sans SC", sans-serif',
                    fontSize: '0.875rem',
                    margin: '1rem 0 0.25rem 0'
                  }}>
                    &copy; {new Date().getFullYear()} Prashant.dev
                  </p>
                  <p style={{ 
                    fontSize: '0.75rem',
                    margin: '0.25rem 0 0 0',
                    fontFamily: '"Poppins", sans-serif'
                  }}>
                    UI/UX Designer & Full Stack Developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;