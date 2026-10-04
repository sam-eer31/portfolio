import React from 'react';

export interface AboutBadgeProps {
  badge: {
    sub: string;
    label: string;
    color: string;
    bg: string;
    icon: React.ReactNode;
  };
  className?: string;
}

export function Badge({ badge, className = "" }: AboutBadgeProps) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-[20px] bg-[#0A0D18] border border-white/5 transition-colors hover:bg-white/5 ${className}`}>
      <div className={`p-2 rounded-xl ${badge.bg} ${badge.color}`}>
        {badge.icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] text-muted-foreground leading-tight">{badge.sub}</span>
        <span className="text-sm font-medium text-white/90 leading-tight">{badge.label}</span>
      </div>
    </div>
  );
}

export const badgeData = [
  {
    sub: "Good",
    label: "Coffee",
    color: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" x2="6" y1="2" y2="4" /><line x1="10" x2="10" y1="2" y2="4" /><line x1="14" x2="14" y1="2" y2="4" />
      </svg>
    )
  },
  {
    sub: "Clean",
    label: "Code",
    color: "text-[#3B82F6]",
    bg: "bg-[#3B82F6]/10",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    )
  },
  {
    sub: "Curious",
    label: "Mindset",
    color: "text-[#EAB308]",
    bg: "bg-[#EAB308]/10",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" />
        <path d="M9 18h6" /><path d="M10 22h4" />
      </svg>
    )
  },
  {
    sub: "Open to",
    label: "Opportunities",
    color: "text-[#F97316]",
    bg: "bg-[#F97316]/10",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
];
