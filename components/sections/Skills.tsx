"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "../layout/Container";
import portfolioData from "../../data/portfolio.json";

import { SkillCard } from "../ui/SkillCard";

const iconSlugs: Record<string, string> = {
  "Python": "python/python-original.svg",
  "JavaScript": "javascript/javascript-original.svg",
  "TypeScript": "typescript/typescript-original.svg",
  "HTML": "html5/html5-original.svg",
  "CSS": "css3/css3-original.svg",
  "React": "react/react-original.svg",
  "Next.js": "nextjs/nextjs-original.svg",
  "Tailwind CSS": "tailwindcss/tailwindcss-original.svg",
  "FastAPI": "fastapi/fastapi-original.svg",
  "Flask": "flask/flask-original.svg",
  "Node.js": "nodejs/nodejs-original.svg",
  "MongoDB": "mongodb/mongodb-original.svg",
  "MySQL": "mysql/mysql-original.svg",
  "GitHub": "github/github-original.svg",
  "Figma": "figma/figma-original.svg",
  "Git": "git/git-original.svg",
  "VS Code": "vscode/vscode-original.svg"
};


export function Skills() {
  const skills = portfolioData.skills;
  const [activeIndex, setActiveIndex] = useState(Math.floor(skills.length / 2));
  const [isMobile, setIsMobile] = useState(false);
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => Math.min(skills.length - 1, prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [skills.length]);

  const handleNav = (direction: "left" | "right") => {
    if (direction === "left") {
      setActiveIndex((prev) => Math.max(0, prev - 1));
    } else {
      setActiveIndex((prev) => Math.min(skills.length - 1, prev + 1));
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (wheelTimeout.current) return;

    // Slight threshold to prevent accidental triggers
    if (e.deltaY > 20 || e.deltaX > 20) {
      handleNav("right");
      wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 300);
    } else if (e.deltaY < -20 || e.deltaX < -20) {
      handleNav("left");
      wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 300);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNav("right");
    } else if (distance < -50) {
      handleNav("left");
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <style>{`
        @keyframes drift {
          from { transform: translate3d(-1%, -1%, 0) scale(1); }
          to { transform: translate3d(1%, 1%, 0) scale(1.015); }
        }
      `}</style>
      <Container>
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col items-start text-left max-w-xl">
            <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-2">
              Skills
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Tools I use to<br />turn ideas into reality.
            </h2>
          </div>
          <div className="lg:max-w-md">
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              I enjoy working across the modern frontend ecosystem, constantly learning and exploring new tools to create better experiences.
            </p>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative w-full">
          <div
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center overflow-visible touch-pan-y"
          >
            {skills.map((skill, index) => {
              const slug = iconSlugs[skill.name];
              // Fallback to git or some other icon if slug is missing, but here we just return null
              if (!slug) return null;

              const distance = index - activeIndex;
              const absDistance = Math.abs(distance);
              const isActive = index === activeIndex;

              // Responsive positioning math
              const xBase = isMobile ? 100 : 150;
              const xOffset = isMobile ? 30 : 60;
              const translateX = Math.sign(distance) * (absDistance * xBase + (absDistance > 0 ? xOffset : 0));

              const scale = Math.max(0, 1 - absDistance * 0.12);
              const zIndex = 30 - absDistance;
              const opacity = absDistance === 0 ? 1 : Math.max(0, 0.7 - absDistance * 0.2);

              return (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  slug={slug}
                  isActive={isActive}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    transform: `translate3d(calc(-50% + ${translateX}px), -50%, 0) scale(${scale})`,
                    zIndex,
                    opacity: scale > 0 ? opacity : 0,
                    visibility: (scale > 0 && opacity > 0) ? "visible" : "hidden",
                    pointerEvents: absDistance > 3 ? "none" : "auto",
                    willChange: "transform, opacity",
                  }}
                />
              );
            })}
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-6 mt-8 z-20 relative">
            <button
              onClick={() => handleNav("left")}
              disabled={activeIndex === 0}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-white/50 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="text-sm font-medium text-white/40 tracking-wide uppercase text-[11px] md:text-xs">
              Scroll or use arrow keys to explore
            </span>

            <button
              onClick={() => handleNav("right")}
              disabled={activeIndex === skills.length - 1}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-white/50 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </Container>
    </section>
  );
}

