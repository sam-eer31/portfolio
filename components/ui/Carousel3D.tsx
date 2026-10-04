"use client";

import { useRef, useState, useEffect } from "react";
import { ProjectCard, Project } from "../cards/ProjectCard";

interface Carousel3DProps {
  projects: Project[];
}

const PROJECT_COLORS = [
  "#06B6D4", // Cyan
  "#F472B6", // Pink
  "#3B82F6", // Blue
  "#10B981", // Emerald
  "#8B5CF6", // Violet
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#6366F1", // Indigo
];

export function Carousel3D({ projects }: Carousel3DProps) {
  const N = projects.length;
  const [rotationIndex, setRotationIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setRotationIndex((prev) => prev - 1);
      } else if (e.key === "ArrowRight") {
        setRotationIndex((prev) => prev + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNav = (direction: "left" | "right") => {
    if (direction === "left") {
      setRotationIndex((prev) => prev - 1);
    } else {
      setRotationIndex((prev) => prev + 1);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (wheelTimeout.current) return;
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

  if (projects.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-12 border border-dashed rounded-lg">
        No projects added yet. Add some projects to data/portfolio.json!
      </div>
    );
  }

  const theta = 360 / N;
  const cardWidth = isMobile ? 280 : 360;
  const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / N)) + (isMobile ? 40 : 60);

  const getNormalizedIndex = (index: number) => {
    return ((index % N) + N) % N;
  };
  
  const currentFrontIndex = getNormalizedIndex(rotationIndex);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center touch-pan-y"
        style={{ perspective: "1500px", overflow: "hidden" }}
      >
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ 
            transformStyle: "preserve-3d",
            transform: `translateZ(-${radius}px) rotateY(${rotationIndex * -theta}deg)`,
            transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)"
          }}
        >
          {projects.map((project: Project, index: number) => {
            let angularDistance = Math.abs(getNormalizedIndex(index) - currentFrontIndex);
            if (angularDistance > N / 2) {
              angularDistance = N - angularDistance;
            }
            
            const isActive = angularDistance === 0;
            const opacity = isActive ? 1 : Math.max(0.1, 0.7 - angularDistance * 0.25);
            const scale = isActive ? 1 : Math.max(0.8, 1 - angularDistance * 0.05);
            const zIndex = 50 - angularDistance;
            const projectColor = PROJECT_COLORS[index % PROJECT_COLORS.length];
            
            return (
              <div
                key={project.title}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${index * theta}deg) translateZ(${radius}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  visibility: opacity > 0.1 ? "visible" : "hidden",
                  pointerEvents: angularDistance <= 1 ? "auto" : "none",
                  willChange: angularDistance <= 1 ? "transform, opacity" : "auto",
                  transition: "opacity 0.8s ease, transform 0.8s ease"
                }}
              >
                <ProjectCard
                  project={project}
                  isActive={isActive}
                  color={projectColor}
                  onClick={() => {
                    if (!isActive) {
                      let diff = index - currentFrontIndex;
                      if (diff > N / 2) diff -= N;
                      if (diff < -N / 2) diff += N;
                      setRotationIndex(prev => prev + diff);
                    }
                  }}
                  className="w-[280px] md:w-[360px] h-[360px] md:h-[440px]"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 mt-8 z-20 relative">
        <button
          onClick={() => handleNav("left")}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/5 transition-colors text-white/50 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <span className="text-sm font-medium text-white/40 tracking-wide uppercase text-[11px] md:text-xs">
          Scroll or use arrow keys to spin
        </span>

        <button
          onClick={() => handleNav("right")}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/5 transition-colors text-white/50 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
