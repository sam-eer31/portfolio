import React from 'react';

export interface NeonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Option A: Content (replaces standard GlassCard usage)
  children?: React.ReactNode;
  
  // Option B: Text Banner (used in Interest section)
  id?: string;
  title?: string;
  description?: string;
  
  // Styling
  color?: string; // Hex color (used by SkillCard/ProjectCard)
  gradient?: string; // Tailwind class like "from-purple-500" (used by InterestCard)
  isActive?: boolean; // Hover state lock
  
  // Sizing/Layout
  containerClassName?: string;
  innerClassName?: string;
}

export function NeonCard({ 
  id, title, description, 
  children,
  color, gradient, isActive = false, 
  containerClassName, innerClassName = "", className = "", 
  onClick, style, ...props 
}: NeonCardProps) {

  // If no containerClassName is provided, assume it's the default banner size.
  // Otherwise, use the classes passed by ProjectCard/SkillCard to scale it up.
  const defaultContainerClass = children ? "" : "w-full max-w-[240px] rounded-[20px]";
  const mergedContainerClass = containerClassName !== undefined ? containerClassName : defaultContainerClass;
  
  const hoverStyle = isActive ? "cursor-default" : "cursor-pointer hover:-translate-y-2 group-hover:-translate-y-2";
  
  return (
    <div 
      className={`relative overflow-hidden bg-linear-to-br from-[#141618] to-[#020304] transition-all duration-500 z-20 ${mergedContainerClass} ${className} ${hoverStyle}`} 
      onClick={onClick}
      style={style}
      {...props}
    >
      {/* --- NEON VISUAL EFFECTS --- */}
      {/* Corner Glow */}
      <div 
        className={`absolute -top-12 -left-12 w-32 h-32 opacity-30 pointer-events-none rounded-full transition-all duration-500`}
        style={color && !gradient ? { background: `radial-gradient(circle, ${color} 0%, transparent 70%)` } : undefined}
      >
        {gradient && <div className={`w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] ${gradient} to-transparent`} />}
      </div>
      
      {/* Top Border Highlight */}
      <div 
        className={`absolute inset-x-0 top-0 h-[1.5px] opacity-50 pointer-events-none transition-all duration-500`}
        style={color && !gradient ? { background: `linear-gradient(90deg, ${color}, transparent)` } : undefined}
      >
        {gradient && <div className={`w-full h-full bg-linear-to-r ${gradient} to-transparent`} />}
      </div>
      
      {/* Left Border Highlight */}
      <div 
        className={`absolute inset-y-0 left-0 w-[1.5px] opacity-30 pointer-events-none transition-all duration-500`}
        style={color && !gradient ? { background: `linear-gradient(180deg, ${color}, transparent)` } : undefined}
      >
        {gradient && <div className={`w-full h-full bg-linear-to-b ${gradient} to-transparent`} />}
      </div>


      {/* --- CONTENT --- */}
      <div className={`relative w-full h-full ${innerClassName} ${!children ? 'px-4 py-3' : ''}`}>
        {children ? (
          children
        ) : (
          <div className="relative flex items-start gap-3">
            <span 
              className={`text-sm md:text-base font-black bg-clip-text text-transparent pt-0.5 ${gradient ? `bg-linear-to-b ${gradient}` : ''}`}
              style={color && !gradient ? { backgroundImage: `linear-gradient(180deg, ${color}, rgba(255,255,255,0.5))` } : undefined}
            >
              {id}
            </span>

            <div className="flex-1">
              <h3 className="text-white font-bold text-base md:text-lg mb-1 tracking-wide">
                {title}
              </h3>
              <p className="text-gray-300 text-[11px] md:text-xs leading-relaxed font-light">
                {description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
