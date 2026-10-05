import Image from "next/image";
import { WavyContour } from "../graphics/WavyContour";
import { NeonCard } from "./NeonCard";

interface Skill {
  name: string;
  description: string;
  projects: number;
  color: string;
}

interface SkillCardProps {
  skill: Skill;
  slug: string;
  isActive: boolean;
  style: React.CSSProperties;
  onClick: () => void;
}

export function SkillCard({ skill, slug, isActive, style, onClick }: SkillCardProps) {
  const invertClass = (skill.name === "Next.js" || skill.name === "GitHub" || skill.name === "Flask")
    ? "invert"
    : "";

  return (
    <div
      className={`w-full h-full select-none group transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
      style={style}
    >
      <NeonCard
        onClick={onClick}
        color={skill.color}
        isActive={isActive}
        containerClassName="w-full h-full rounded-[32px]"
        innerClassName="rounded-[30px] flex flex-col items-center p-6 md:p-8"
      >
        {/* Dynamic Wavy Contour Pattern */}
        <WavyContour color={skill.color} isActive={isActive} />

          {/* Centered Content (Logo + Text) */}
          <div className="flex flex-col items-center justify-center flex-grow w-full z-10 mt-2 md:mt-4">
            {/* Icon */}
            <div className="w-14 h-14 md:w-16 md:h-16 mb-4 md:mb-5 flex items-center justify-center drop-shadow-2xl transition-transform duration-300 group-hover:scale-110 bg-[#13151A]/80 rounded-2xl p-2 md:p-3 border border-white/5 relative">
              {slug.startsWith("http") || slug.startsWith("/") ? (
                <img
                  src={slug}
                  alt={skill.name}
                  className={`absolute inset-0 w-full h-full p-2 object-contain ${invertClass}`}
                  draggable={false}
                />
              ) : (
                <Image
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}`}
                  alt={skill.name}
                  fill
                  className={`p-2 object-contain ${invertClass}`}
                  draggable={false}
                  sizes="80px"
                />
              )}
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-center text-center w-full">
              <h3 className={`text-2xl font-bold mb-2 tracking-wide transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/60'}`}>
                {skill.name}
              </h3>
              <p className={`text-sm leading-relaxed px-2 line-clamp-3 transition-colors duration-500 ${isActive ? 'text-muted-foreground' : 'text-muted-foreground/40'}`}>
                {skill.description}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full flex flex-col items-center mt-auto pt-4 z-10 h-8">
            {skill.projects > 0 && (
              <span className={`text-[11px] font-semibold tracking-wider uppercase transition-colors duration-500 ${isActive ? 'text-muted-foreground' : 'text-muted-foreground/40'}`}>
                {skill.projects} projects
              </span>
            )}
          </div>
      </NeonCard>
    </div>
  );
}
