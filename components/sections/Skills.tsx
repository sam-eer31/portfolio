"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "../layout/Container";
import portfolioData from "../../data/portfolio.json";

import { SkillCard } from "../cards/SkillCard";
import { CarouselNavigation } from "../ui/CarouselNavigation";

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
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMobile(window.innerWidth < 768), 200);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (wheelTimeout.current) return;
      if (e.deltaY > 20 || e.deltaX > 20) {
        handleNav("right");
        wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 300);
      } else if (e.deltaY < -20 || e.deltaX < -20) {
        handleNav("left");
        wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 300);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.targetTouches[0].clientX;
      touchEndX.current = e.targetTouches[0].clientX;
    };

    const onTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = () => {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 50) {
        handleNav("right");
      } else if (distance < -50) {
        handleNav("left");
      }
    };

    const onScroll = () => {
      if (container) {
        container.style.pointerEvents = "none";
      }
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        if (container) {
          container.style.pointerEvents = "auto";
        }
      }, 150);
    };

    container.addEventListener("wheel", onWheel, { passive: true });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <section id="skills" className="py-8 md:py-12 relative overflow-hidden">
      {/* Faded Dot Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--background)_60%)]" />
        <svg
          className="absolute w-[150%] h-[150%] max-w-none text-accent opacity-[0.25] z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="skill-dot" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#skill-dot)" />
        </svg>
      </div>
      
      <style>{`
        @keyframes drift {
           from { transform: translate3d(-1%, -1%, 0) scale(1); }
           to { transform: translate3d(1%, 1%, 0) scale(1.015); }
        }
      `}</style>
      <Container className="relative z-10">
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
            ref={containerRef}
            className="relative w-full h-[320px] md:h-[360px] flex items-center justify-center overflow-visible touch-pan-y"
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
                <div
                  key={skill.name}
                  className="absolute top-1/2 left-1/2 w-[220px] md:w-[260px] h-[280px] md:h-[320px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    transform: `translate3d(calc(-50% + ${translateX}px), -50%, 0) scale(${scale})`,
                    zIndex,
                    opacity: scale > 0 ? opacity : 0,
                    visibility: (scale > 0 && opacity > 0) ? "visible" : "hidden",
                    pointerEvents: absDistance > 3 ? "none" : "auto",
                  }}
                >
                  {absDistance <= 2 ? (
                    <SkillCard
                      skill={skill}
                      slug={slug}
                      isActive={isActive}
                      onClick={() => setActiveIndex(index)}
                      style={{ position: 'relative', top: 0, left: 0, transform: 'none' }}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>

          <CarouselNavigation 
            onPrev={() => handleNav("left")}
            onNext={() => handleNav("right")}
            text="Scroll or use arrow keys to explore"
            prevDisabled={activeIndex === 0}
            nextDisabled={activeIndex === skills.length - 1}
          />
        </div>

      </Container>
    </section>
  );
}

