import Image from "next/image";
import Link from "next/link";
import { NeonCard } from "./NeonCard";

export interface Project {
  title: string;
  description: string;
  link?: string;
  image?: string;
  tags?: string[];
  color?: string;
}

interface ProjectCardProps {
  project: Project;
  isActive?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  color?: string;
}

export function ProjectCard({ project, isActive, onClick, style, className = "", color = "#ffffff" }: ProjectCardProps) {
  return (
    <NeonCard
      onClick={onClick}
      color={color}
      isActive={isActive}
      style={style}
      containerClassName={`shrink-0 rounded-[26px] ${className}`}
      innerClassName="rounded-[24px] p-4 md:p-5 flex flex-col justify-between group relative overflow-hidden"
    >
      <div className="flex flex-col h-full relative z-20">
          {/* Site Preview / Image */}
          <div className="w-full aspect-video bg-[#060913] rounded-xl mb-4 overflow-hidden relative flex items-center justify-center group/preview border border-white/5">
            {project.image ? (
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 33vw" 
              />
            ) : (
              <div className="text-muted-foreground/30 font-medium text-sm">No Preview</div>
            )}

            {/* Optional Overlay to catch clicks and open link */}
            {project.link && (
              <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-all duration-500 bg-[#040506]/80 pointer-events-none">
                <Link href={project.link} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white text-black rounded-full text-sm font-semibold shadow-xl pointer-events-auto hover:scale-105 transition-transform duration-300">
                  Visit Site
                </Link>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-grow flex flex-col">
            <h3 className="font-bold text-lg md:text-xl mb-1.5 text-white/90 group-hover:text-white transition-colors">{project.title}</h3>
            <p className="text-left text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Footer of Card (Tags & Arrow) */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 w-full">
            <div className="flex flex-wrap content-start gap-1.5 pr-2 overflow-hidden h-[24px] sm:h-[26px]">
              {project.tags?.slice(0, 2).map((tag: string, tagIndex: number) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-medium text-white/70 rounded-full whitespace-nowrap shrink-0"
                  title={tag}
                >
                  {tag}
                </span>
              ))}
              {project.tags && project.tags.length > 2 && (
                <span
                  className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-medium text-white/70 rounded-full whitespace-nowrap shrink-0"
                  title={project.tags.slice(2).join(", ")}
                >
                  +{project.tags.length - 2}
                </span>
              )}
            </div>

            {project.link && (
              <Link href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`} className="shrink-0">
                <button className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all duration-300 text-white/70 group-hover:border-white/30 hover:-rotate-12">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6"/>
                    <path d="M10 14 21 3"/>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  </svg>
                </button>
              </Link>
            )}
          </div>
        </div>
    </NeonCard>
  );
}
