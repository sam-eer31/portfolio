import { Container } from "../layout/Container";
import portfolioData from "../../data/portfolio.json";
import { Carousel3D } from "../ui/Carousel3D";
import { SECTION_SPACING } from "../../lib/constants";

export function Projects() {
  const projects = portfolioData.projects;

  return (
    <section id="projects" className={`${SECTION_SPACING} relative overflow-hidden`}>
      {/* Faded Grid Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden"
        style={{ WebkitMaskImage: 'radial-gradient(ellipse 80% 45% at center, black 10%, transparent 100%)' }}
      >
        <svg
          className="absolute w-[150%] h-[150%] max-w-none text-accent opacity-[0.15] z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="project-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#project-grid)" />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-10 relative flex flex-col items-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-rose-400">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
            </svg>
            <span className="text-xs font-medium tracking-[0.3em] text-gray-400 uppercase">
              FEATURED WORK
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-white relative z-10">
            Projects I&apos;m <span className="relative inline-block text-rose-500 pb-2">proud of.</span>
          </h2>
        </div>

        <Carousel3D projects={projects} />
      </Container>
    </section>
  );
}
