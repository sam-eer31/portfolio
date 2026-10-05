"use client";

import { useRef, useState, useEffect } from "react";
import { ProjectCard, Project } from "../cards/ProjectCard";
import { CarouselNavigation } from "./CarouselNavigation";

interface Carousel3DProps {
  projects: Project[];
}

import { PROJECT_COLORS } from "../../lib/constants";

export function Carousel3D({ projects }: Carousel3DProps) {
  const N = projects.length;
  const [rotationIndex, setRotationIndex] = useState(0);
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

  if (projects.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-12 border border-dashed rounded-lg">
        No projects added yet. Add some projects to data/portfolio.json!
      </div>
    );
  }

  const theta = 360 / N;
  const cardWidth = isMobile ? 260 : 320;
  const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / N)) + (isMobile ? 40 : 60);

  const getNormalizedIndex = (index: number) => {
    return ((index % N) + N) % N;
  };
  
  const currentFrontIndex = getNormalizedIndex(rotationIndex);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative w-full h-[380px] md:h-[420px] flex items-center justify-center touch-pan-y"
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
                  transition: "opacity 0.8s ease, transform 0.8s ease"
                }}
              >
                {angularDistance <= 1 ? (
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
                    className="w-[260px] md:w-[320px] h-[340px] md:h-[400px]"
                  />
                ) : (
                  <div className="w-[260px] md:w-[320px] h-[340px] md:h-[400px] rounded-[26px] bg-[#060913]/40 border border-white/5" />
                )}
              </div>
            );
          })}
        </div>
      </div>


      <CarouselNavigation 
        onPrev={() => handleNav("left")}
        onNext={() => handleNav("right")}
        text="Scroll or use arrow keys to spin"
        className="!mt-2 md:!mt-0"
      />
    </div>
  );
}
