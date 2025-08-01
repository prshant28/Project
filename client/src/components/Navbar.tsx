import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, ChevronRight, Code2 } from "lucide-react";

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

      const sections = [
        "home",
        "projects",
        "skills",
        "about",
        "blog",
        "contact",
      ];
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
    { href: "#about", label: "About" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Rounded Header Container */}
      <div className="fixed top-2 left-2 right-2 z-50">
        <div className="rounded-header-container">
          {/* Main Header Content */}
          <div className="rounded-header-content">
            {/* Logo Section */}
            <a href="#home" className="logo-section">
              {/* Logo Icon with Code Symbol */}
              <div className="logo-icon-rounded">
                <Code2 size={20} className="text-white" />
              </div>

              {/* Brand Text */}
              <div className="brand-text">
                <span className="brand-name-rounded">PRASHANT</span>
                <span className="brand-subtitle-rounded">.DEVELOPER</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              {/* Navigation Pills */}
              <div className="nav-pills-container">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`nav-pill ${
                      activeSection === link.href.substring(1)
                        ? "nav-pill-active"
                        : ""
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Right Controls */}
              <div className="header-controls">
                <ThemeToggle />

                {/* Hire Me Button */}
                <a href="#contact" className="hire-button">
                  <span>Hire Me</span>
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="mobile-nav-controls">
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                className="mobile-menu-btn"
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="mobile-overlay" onClick={closeMobileMenu} />

          {/* Mobile Menu */}
          <div className="mobile-menu-rounded">
            <div className="mobile-menu-header">
              <h3>Navigation</h3>
            </div>

            <div className="mobile-nav-links">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} />
                </a>
              ))}
            </div>

            <div className="mobile-menu-footer">
              <a
                href="#contact"
                className="mobile-hire-btn"
                onClick={closeMobileMenu}
              >
                Get In Touch
                <ChevronRight size={16} />
              </a>

              <div className="mobile-footer-text">
                <p>&copy; {new Date().getFullYear()} Prashant.dev</p>
                <p>UI/UX Designer & Full Stack Developer</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
