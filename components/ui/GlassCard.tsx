import React from "react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  isActive?: boolean;
  children: React.ReactNode;
  containerClassName?: string;
  innerClassName?: string;
}

export function GlassCard({
  color = "#ffffff",
  isActive = false,
  children,
  containerClassName = "",
  innerClassName = "",
  className = "",
  onClick,
  style,
  ...props
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] p-[1.5px] ${isActive ? 'cursor-default' : 'cursor-pointer'} ${containerClassName} ${className}`}
      style={{
        ...style,
        background: isActive
          ? `linear-gradient(180deg, ${color} 0%, ${color}40 100%)`
          : `linear-gradient(180deg, ${color}40 0%, rgba(255,255,255,0.03) 100%)`,
        boxShadow: isActive
          ? `0 0 25px 0px ${color}40, 0 20px 40px -15px ${color}40`
          : '0 10px 30px -10px rgba(0,0,0,0.8)',
      }}
      {...props}
    >
      <div 
        className={`w-full h-full relative overflow-hidden ${innerClassName}`}
        style={{ background: "linear-gradient(135deg, #141618 0%, #020304 100%)" }}
      >
        {/* Subtle top highlight */}
        <div
          className="absolute top-0 inset-x-0 h-[1.5px] z-10 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}${isActive ? 'ff' : '40'}, transparent)`
          }}
        />
        {/* Ambient Radial Glow */}
        <div
          className="absolute top-0 w-full h-48 z-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 10%, ${color}${isActive ? '25' : '05'} 0%, transparent 70%)`
          }}
        />
        
        {children}
      </div>
    </div>
  );
}
