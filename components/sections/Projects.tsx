import { Container } from "../layout/Container";
import portfolioData from "../../data/portfolio.json";
import { Carousel3D } from "../ui/Carousel3D";

export function Projects() {
  const projects = portfolioData.projects;

  return (
    <section id="projects" className="py-8 md:py-12 relative overflow-hidden">
      {/* Faded Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <svg
          className="absolute w-[150%] h-[150%] max-w-none text-accent opacity-[0.15]"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)'
          }}
        >
          <defs>
            <pattern id="project-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#project-grid)" />
        </svg>
      </div>

      <div className="absolute top-0 left-0 w-full h-48 bg-linear-to-b from-background to-transparent pointer-events-none z-0" />

      <Container className="relative z-10">
        <div className="mb-12 flex flex-col items-start text-left">
          <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-2">
            Featured Work
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Projects I&apos;m proud of.
          </h2>
        </div>

        <Carousel3D projects={projects} />
      </Container>
    </section>
  );
}
