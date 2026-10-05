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
  const defaultContainerClass = children ? "" : "w-full max-w-[320px] md:max-w-[240px] rounded-[20px]";
  const mergedContainerClass = containerClassName !== undefined ? containerClassName : defaultContainerClass;
  
  const hoverStyle = isActive ? "cursor-default" : "cursor-pointer hover:-translate-y-2 group-hover:-translate-y-2";
  
  return (
    <div 
      className={`relative isolate overflow-hidden bg-gradient-to-br from-[#141618] to-[#020304] transition-all duration-500 z-20 ${mergedContainerClass} ${className} ${hoverStyle}`} 
      onClick={onClick}
      style={style}
      {...props}
    >
      {/* --- NEON VISUAL EFFECTS --- */}
      {/* Top Left Glow */}
      <div 
        className={`absolute -top-24 -left-24 w-72 h-72 opacity-25 pointer-events-none rounded-full transition-all duration-500 mix-blend-screen`}
        style={color && !gradient ? { background: `radial-gradient(circle, ${color} 0%, transparent 70%)` } : undefined}
      >
        {gradient && <div className={`w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] ${gradient} to-transparent`} />}
      </div>

      {/* Top Right Ambient Glow */}
      <div 
        className={`absolute -top-24 -right-24 w-72 h-72 opacity-15 pointer-events-none rounded-full transition-all duration-500 mix-blend-screen`}
        style={color && !gradient ? { background: `radial-gradient(circle, ${color} 0%, transparent 70%)` } : undefined}
      >
        {gradient && <div className={`w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] ${gradient} to-transparent`} />}
      </div>
      
      {/* Seamless Gradient Border (follows border-radius perfectly) */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-500 z-10 ${(isActive || gradient) ? 'opacity-100' : 'opacity-[0.15]'}`}
        style={{
           borderRadius: 'inherit',
           padding: '1.5px',
           WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
           WebkitMaskComposite: "xor",
           maskComposite: "exclude",
        }}
      >
        <div 
           className="absolute inset-0"
           style={
             color && !gradient 
               ? { background: `linear-gradient(180deg, ${color} 0%, rgba(255,255,255,0.2) 15%, ${color} 50%, transparent 100%)` }
               : undefined
           }
        >
          {gradient && <div className={`w-full h-full bg-linear-to-br ${gradient} to-transparent`} />}
        </div>
      </div>


      {/* --- CONTENT --- */}
      <div className={`relative w-full h-full ${innerClassName} ${!children ? 'px-4 py-3' : ''}`}>
        {children ? (
          children
        ) : (
          <div className="relative flex items-start gap-3">
            <span 
              className={`text-lg md:text-base font-black bg-clip-text text-transparent pt-0.5 ${gradient ? `bg-linear-to-b ${gradient}` : ''}`}
              style={color && !gradient ? { backgroundImage: `linear-gradient(180deg, ${color}, rgba(255,255,255,0.5))` } : undefined}
            >
              {id}
            </span>

            <div className="flex-1">
              <h3 className="text-white font-bold text-xl md:text-lg mb-1 tracking-wide">
                {title}
              </h3>
              <p className="text-left text-gray-300 text-sm md:text-xs leading-relaxed font-light">
                {description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
