import { Github, Linkedin, Twitter, Dribbble, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const handleSocialClick = (platform: string, url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:hello@prashant.dev";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+917618078806";
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  
  return (
    <footer className="bg-background py-10 border-t border-muted w-full">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="mb-6 md:mb-0">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-primary font-poppins font-bold text-2xl tracking-wider hover:text-primary/80 transition-colors"
            >
              Prashant.dev
            </button>
            <p className="text-muted-foreground mt-2 max-w-md">
              UI/UX Designer & Full Stack Developer creating beautiful and functional web experiences.
            </p>
            
            {/* Contact Info */}
            <div className="mt-4 space-y-2">
              <button
                onClick={handleEmailClick}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Mail size={14} />
                hello@prashant.dev
              </button>
              <button
                onClick={handlePhoneClick}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Phone size={14} />
                +91 76180 78806
              </button>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin size={14} />
                Azamgarh, Uttar Pradesh, India
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
            <div>
              <h5 className="font-semibold mb-3">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => scrollToSection("home")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("projects")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("skills")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Skills
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("about")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-3">Resources</h5>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => scrollToSection("blog")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => window.open('/cv/Prashant_Maurya_CV.pdf', '_blank')}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Resume
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("contact")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-muted mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 sm:mb-0">
            © {currentYear} Prashant.dev. All rights reserved. Made with ❤️ - Crafted by Prashant
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleSocialClick("GitHub", "https://github.com/prashantmaurya19")}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </button>
            <button 
              onClick={() => handleSocialClick("LinkedIn", "https://linkedin.com/in/prashant-maurya-dev")}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </button>
            <button 
              onClick={() => handleSocialClick("Twitter", "https://twitter.com/prashant_dev19")}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter Profile"
            >
              <Twitter size={18} />
            </button>
            <button 
              onClick={() => handleSocialClick("Portfolio", "https://x247.site")}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Portfolio Website"
            >
              <Dribbble size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;