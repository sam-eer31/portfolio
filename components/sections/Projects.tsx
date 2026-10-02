"use client";

import Image from "next/image";

import { useRef, useState, useEffect } from "react";
import { Container } from "../layout/Container";
import { Card } from "../ui/Card";
import { ProjectCard, Project } from "../ui/ProjectCard";
import portfolioData from "../../data/portfolio.json";
import Link from "next/link";

export function Projects() {
  const projects = portfolioData.projects;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const updatePagination = () => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      // Determine how many full viewports (pages) of cards exist
      const pages = Math.ceil(scrollWidth / clientWidth) || 1;
      setTotalPages(pages);

      // Determine which viewport is currently visible
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(Math.min(index, pages - 1));
    }
  };

  useEffect(() => {
    updatePagination();
    window.addEventListener("resize", updatePagination);
    return () => window.removeEventListener("resize", updatePagination);
  }, [projects]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
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

      {/* Smooth transition from Hero's solid background */}
      <div className="absolute top-0 left-0 w-full h-48 bg-linear-to-b from-background to-transparent pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-start text-left">
          <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-2">
            Featured Work
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Projects I&apos;m proud of.
          </h2>
        </div>

        {/* Slider Container */}
        {projects.length > 0 ? (
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={updatePagination}
              className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-8 scrollbar-none"
            >
              {projects.map((project: Project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>

            {/* Slider Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 bg-accent" : "w-2 bg-border"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-muted-foreground p-12 border border-dashed rounded-lg">
            No projects added yet. Add some projects to data/portfolio.json!
          </div>
        )}
      </Container>
    </section>
  );
}
