import Image from "next/image";
import { WavyContour } from "./WavyContour";

interface Skill {
  name: string;
  description: string;
  proficiency: number;
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
      onClick={onClick}
      className={`absolute top-1/2 left-1/2 w-[260px] md:w-[320px] rounded-[32px] select-none group transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
      style={style}
    >
      <div
        className="w-full h-[320px] md:h-[380px] rounded-[32px] p-[1.5px] overflow-hidden relative transition-all duration-500"
        style={{
          background: isActive
            ? `linear-gradient(180deg, ${skill.color} 0%, ${skill.color}40 100%)`
            : `linear-gradient(180deg, ${skill.color}40 0%, rgba(255,255,255,0.03) 100%)`,
          boxShadow: isActive
            ? `0 0 25px 0px ${skill.color}40, 0 20px 40px -15px ${skill.color}40`
            : '0 10px 30px -10px rgba(0,0,0,0.8)',
        }}
      >
        {/* Inner Card Body */}
        <div 
          className="w-full h-full rounded-[30px] flex flex-col items-center p-6 md:p-8 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #141618 0%, #020304 100%)" }}
        >

          {/* Dynamic Wavy Contour Pattern */}
          <WavyContour color={skill.color} isActive={isActive} />

          {/* Subtle Radial Glow Behind Icon */}
          <div
            className="absolute top-0 w-full h-48 z-0 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 20%, ${skill.color}${isActive ? '25' : '05'} 0%, transparent 70%)`
            }}
          />

          {/* Top Edge Inner Highlight */}
          <div
            className="absolute top-0 inset-x-0 h-[1.5px] z-10 transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, ${skill.color}${isActive ? 'ff' : '40'}, transparent)`
            }}
          />

          {/* Centered Content (Logo + Text) */}
          <div className="flex flex-col items-center justify-center flex-grow w-full z-10 mt-2 md:mt-4">
            {/* Icon */}
            <div className="w-14 h-14 md:w-16 md:h-16 mb-4 md:mb-5 flex items-center justify-center drop-shadow-2xl transition-transform duration-300 group-hover:scale-110 bg-[#13151A]/80 rounded-2xl p-2 md:p-3 border border-white/5 relative">
              <Image
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}`}
                alt={skill.name}
                fill
                className={`p-2 object-contain ${invertClass}`}
                draggable={false}
                sizes="80px"
              />
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

          {/* Proficiency & Footer */}
          <div className="w-full flex flex-col items-center mt-auto pt-4 z-10">
            <div className="flex gap-1.5 mb-4">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className="h-1.5 w-5 rounded-full shadow-sm transition-colors duration-500"
                  style={{
                    backgroundColor: level <= skill.proficiency
                      ? skill.color
                      : 'rgba(255,255,255,0.1)',
                    opacity: isActive ? 1 : 0.4
                  }}
                />
              ))}
            </div>
            <span className={`text-[11px] font-semibold tracking-wider uppercase transition-colors duration-500 ${isActive ? 'text-muted-foreground' : 'text-muted-foreground/40'}`}>
              {skill.projects} projects
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
