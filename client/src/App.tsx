import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import TechStackCarousel from "./components/TechStackCarousel";
import SkillsSection from "./components/SkillsSection";
import AboutSection from "./components/AboutSection";
import BlogSection from "./components/BlogSection";
import Timeline from "./components/Timeline";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ParticleSystem from "./components/ParticleSystem";
import EducationSection from "./components/EducationSection";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="relative min-h-screen w-full overflow-x-hidden">
          <ParticleSystem />
          {/* Add padding top to account for rounded header */}
          <div style={{ paddingTop: '100px' }}>
          <Navbar />
          <main className="w-full overflow-x-hidden">
            <HeroSection />
            <ProjectsSection />
            <TechStackCarousel />
            <SkillsSection />
            <Timeline />
            <AboutSection />
            <EducationSection />
            <BlogSection />
            <ContactSection />
          </main>
          <Footer />
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
