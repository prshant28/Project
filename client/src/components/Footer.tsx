import { Github, Linkedin, Twitter, Dribbble } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background py-10 border-t border-muted w-full">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-primary font-poppins font-bold text-2xl tracking-wider">
              Prashant.dev
            </a>
            <p className="text-muted-foreground mt-2 max-w-md">
              UI/UX Designer & Full Stack Developer creating beautiful and functional web experiences.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
            <div>
              <h5 className="font-semibold mb-3">Quick Links</h5>
              <ul className="space-y-2">
                <li><a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
                <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a></li>
                <li><a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Skills</a></li>
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-3">Resources</h5>
              <ul className="space-y-2">
                <li><a href="#blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Resume</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-muted mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 sm:mb-0">
            © {currentYear} Prashant.dev. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={18} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Dribbble size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
