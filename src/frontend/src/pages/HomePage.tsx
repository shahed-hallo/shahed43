import MarqueeTicker from "../components/MarqueeTicker";
import AboutSection from "../components/sections/AboutSection";
import AwardsSection from "../components/sections/AwardsSection";
import CommunitySection from "../components/sections/CommunitySection";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/sections/Footer";
import Header from "../components/sections/Header";
import HeroSection from "../components/sections/HeroSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import ToolkitSection from "../components/sections/ToolkitSection";

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <MarqueeTicker />
        <AboutSection />
        <ProjectsSection />
        <CommunitySection />
        <ToolkitSection />
        <TestimonialsSection />
        <AwardsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
